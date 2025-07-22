'use client'

import { useState, useCallback, useEffect } from 'react';
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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from '../components/CustomNode';
import { LaneNode } from '../components/LaneNode';
import { type Lane, type Step, type Connection } from '@/app/interfaces'
import StepCaption from '../components/StepCaption';
import EditStep from '../components/EditStep';

const COLUMN_WIDTH = 300;
const LANE_HEADER_HEIGHT = 30;
const PROCESS_NODE_HEIGHT = 130;
const LANE_HEIGHT = LANE_HEADER_HEIGHT + PROCESS_NODE_HEIGHT * 2;
const LANE_VERTICAL_PADDING = 80;


export default function Page() {
    const [dataStep, setDataStep] = useState<Step[]>([])
    const [lanes, setLanes] = useState<Lane[]>([])
    const [steps, setSteps] = useState<Step[]>([])
    const [connections, setConnections] = useState<Connection[]>([])

    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    
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
                type: 'lane',
                position: { x: 0, y: index * LANE_HEIGHT },
                data: { label: lane.name },
                style: {
                    zIndex: -1,
                    width: TOTAL_LANE_WIDTH,
                    height: LANE_HEIGHT,
                },
                draggable: false,
                selectable: false,
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
                    position: {
                        x: (step.columnIndex + 0.90) * COLUMN_WIDTH,
                        y: (laneIndex * LANE_HEIGHT) + LANE_HEADER_HEIGHT,
                    },
                    data: {
                        ...step,
                        technologies: technologiesArray,
                        onSave: handleStepUpdate,
                        id: step.id
                    },
                    draggable: false,
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
