'use client'

import { useState, useCallback, useEffect, useRef } from 'react';
import {
    ReactFlow,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    type Node,
    type Edge,
    Background,
    Controls,
    Position,
    Panel,
    OnNodeDrag,
    useReactFlow,
    ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from '../components/CustomNode';
import { LaneNode } from '../components/LaneNode';
import { type Lane, type Step, type Connection, LaneNodeData } from '@/app/interfaces'
import StepCaption from '../components/StepCaption';
import EditStep from '../components/EditStep';

const COLUMN_WIDTH = 300;
const LANE_HEADER_HEIGHT = 30;
const PROCESS_NODE_HEIGHT = 130;
const LANE_HEIGHT = LANE_HEADER_HEIGHT + PROCESS_NODE_HEIGHT * 2;
const LANE_VERTICAL_PADDING = 80;


const Flow =()=> {
    const [dataStep, setDataStep] = useState<Step[]>([])
    const [lanes, setLanes] = useState<Lane[]>([])
    const [steps, setSteps] = useState<Step[]>([])
    const [connections, setConnections] = useState<Connection[]>([])

    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    const overlappingNodeRef = useRef<Node | null>(null);
    const dragStartNodeRef = useRef<Record<string , Node>>({});
    const { getIntersectingNodes } = useReactFlow();
    
    const nodeTypes = {
        custom: CustomNode,
        lane: LaneNode
    }

    // Callback is called only when the setNodes changes
    const handleStepUpdate = useCallback((updatedStep: Step) => {
        setNodes((currentNodes) => 
            currentNodes.map((node) => {
                if (node.id === updatedStep.id){
                    return{
                        ...node,
                        data: {
                            ...node.data,
                            ...updatedStep,
                        },
                    };
                }
                return node;
            })
        )
    }, [setNodes])

    useEffect(() => {
        async function handleFlowData() {
            const res = await fetch('/api/flow-data');
            const data = await res.json();

            setDataStep(data);
            setLanes(data.lanes);
            setSteps(data.steps);
            setConnections(data.connections);

            const laneIdToIndex = new Map(data.lanes.map((lane: any, index: any) => [lane.id, index]));
            const maxColumnIndex = Math.max(...data.steps.map((step: any) => step.columnIndex));
            const TOTAL_LANE_WIDTH = ((maxColumnIndex + 2) * COLUMN_WIDTH) + LANE_VERTICAL_PADDING;

            const laneNodes: Node[] = data.lanes.map((lane: any, index: any) => ({
                id: lane.id,
                position: { x: 0, y: index * LANE_HEIGHT },
                data: { label: lane.name },
                type: "lane",
                style: {
                    zIndex: -1,
                    width: TOTAL_LANE_WIDTH,
                    height: LANE_HEIGHT,
                },
              
                draggable: true,
                selectable: true,
            }));

            const stepNodes: Node[] = data.steps.map((step: any) => {
                const laneIndex = Number(laneIdToIndex.get(step.laneId)) ?? 0;
                const technologiesArray = (step.technologies || '')
                    .split(',')
                    .map((t: string) => t.trim())
                    .filter(Boolean);

                return {
                    id: step.id,
                    sourcePosition: Position.Left,
                    targetPosition: Position.Right,
                    type: 'custom',
                    parentId: step.laneId,
                    position: {
                        x: (step.columnIndex + 0.90) * COLUMN_WIDTH,
                        y: LANE_HEADER_HEIGHT,
                    },
                    data: {
                        ...step,
                        technologies: technologiesArray,
                        onSave: handleStepUpdate,
                        id: step.id
                    },
                    draggable: true,
                    selectable: true,
                };
            });

            const edgeList: Edge[] = data.connections.map((conn: any) => {
                const edge: Edge = {
                    id: conn.start,
                    source: conn.start,
                    target: conn.end,
                    label: conn.label,
                };

                if (conn.lineStyle === 'dashed') {
                    edge.animated = true;
                    edge.style = {
                        stroke: 'red',
                    };
                }

                return edge;
            });

            setNodes([...laneNodes, ...stepNodes]);
            setEdges(edgeList);
        }

        handleFlowData();
    }, []);


    const edgeOptions = {
        type: 'step',
        style: {
            stroke: 'gray',
        },
    };

    const connectionLineStyle = { stroke: 'red' }

    const onNoderag: OnNodeDrag = (evt, dragNode)=>{
        const overlappingNode = getIntersectingNodes(dragNode)?.[0];
        overlappingNodeRef.current = overlappingNode;

        if(!dragStartNodeRef.current[dragNode.id]){
            const original = nodes.find(n => n.id === dragNode.id);
            if(original){
                dragStartNodeRef.current[dragNode.id] = {...original}
            }
        }
    }

    const onNodeDragStop: OnNodeDrag = (evt, dragNode)=>{

        if(!overlappingNodeRef?.current || (overlappingNodeRef?.current?.type !== "lane") && dragNode?.parentId){
            setNodes(prevNodes=>{
                return prevNodes.map(node=>{
                    const original = dragStartNodeRef.current[dragNode.id];

                    if(node.id === dragNode.id && original){
                        return {...node, position: original.position, parentId: original.parentId}
                    }

                    return node;
                })
            })
        }
        if(overlappingNodeRef?.current?.type === "lane"){
            setNodes(prevNodes=>prevNodes.map(node=>{

                const { x , y } = overlappingNodeRef?.current?.position || { x: 0, y: 0 };
                const { x: dragX, y: dragY} = dragNode?.position || { x: 0, y: 0 };

                let position;

                if(!node.parentId){
                    position = { x: dragX - x, y: dragY - y };
                }else if(node.parentId && node?.parentId !== overlappingNodeRef?.current?.id){
                    const prevBoard = prevNodes?.find(node => node?.id === dragNode?.parentId);
                    const { x: prevBoardX, y: prevBoardY } = prevBoard?.position || { x: 0, y: 0 };
                    position = { x: dragX + prevBoardX - x, y: dragY + prevBoardY - y };
                }
                if(node.id === dragNode?.id){

                    dragStartNodeRef.current[dragNode.id] ={
                        ...node,
                        ...((!dragNode?.parentId || dragNode?.parentId !== overlappingNodeRef?.current?.id) && {position}),
                        parentId: overlappingNodeRef?.current?.id
                    }
                    return {...node, parentId: overlappingNodeRef?.current?.id, ...((!dragNode?.parentId || dragNode?.parentId !== overlappingNodeRef?.current?.id) && {position})}
                }

                return node;
            }))
        }
    }

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [setNodes],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [setEdges],
    );

    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [setEdges],
    );

    return (
        <div className='h-screen w-screen'>
            <div className="">

            </div>
            
                <ReactFlow
                    onNodeDrag={onNoderag}
                    onNodeDragStop={onNodeDragStop}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    connectionLineStyle={connectionLineStyle}
                    defaultEdgeOptions={edgeOptions}
                    nodeTypes={nodeTypes}
                    fitView
                >
                    <Background />
                    <Panel position='top-right'>
                        <StepCaption />
                    </Panel>
                    <Controls />
                </ReactFlow>
            
        </div>
    );
}

export default function Page(){
    return(
        <ReactFlowProvider>
            <Flow/>
        </ReactFlowProvider>
    )
}
