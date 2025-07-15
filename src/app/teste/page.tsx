'use client'

import { useState, useCallback } from 'react';
import {
    ReactFlow,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    type Node,
    type Edge,
    type OnConnect,
    type OnNodesChange,
    type OnEdgesChange,
    DefaultEdgeOptions,
    Background,
    Controls,
    Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { INITIAL_STEPS, INITIAL_LANES, INITIAL_CONNECTIONS } from '../../data/fake-data';
import CustomNode from '../components/CustomNode';
import { LaneNode } from '../components/LaneNode';

// ANOTAÇÕES :D
// nodes = etapa de cada processo
// handle = ação de interligar o processo
// edge = processo de um para um e sua função.

const nodeTypes = {
    custom: CustomNode,
    lane: LaneNode
}

const COLUMN_WIDTH = 400; // é a largrura de cada step
const LANE_HEADER_HEIGHT = 50; // é o nome que ta encima da lane
const PROCESS_NODE_HEIGHT = 160; // altura baseada no nodes (os blocos do processo e tals)
const LANE_HEIGHT = LANE_HEADER_HEIGHT + PROCESS_NODE_HEIGHT * 2; // altuara total de cada lane
const LANE_VERTICAL_PADDING = 40; // padding msm

//cria um map, onde ele pega os lanes e faz cada um ter um index
//ficando tipo:
// lane-customer: 0,
// lane-insurer-desk: 1,
// lane-logistics: 2,
// lane-claims-adj: 3,
// lane-finance: 4
// 
const laneIdToIndex = new Map(INITIAL_LANES.map((lane, index) => [lane.id, index]));

// math.max é pra ver qual valor do arrsy é maior
const maxColumnIndex = Math.max(...INITIAL_STEPS.map((step) => step.columnIndex));
const TOTAL_LANE_WIDTH = (maxColumnIndex + 2) * COLUMN_WIDTH;

const laneNodes: Node[] = INITIAL_LANES.map((lane, index) => {
    return {
        id: lane.id,
        type: 'lane', //aq conecta com o component q eu criei
        position: { x: 0, y: index * LANE_HEIGHT },
        data: { label: lane.name },
        style: {
            zIndex: -1,
            width: TOTAL_LANE_WIDTH,
            height: LANE_HEIGHT,
        },
        draggable: false,
        selectable: false
    }
})

const stepNodes: Node[] = INITIAL_STEPS.map((step) => {
    // linha para pegar o index do step e verificar se retorna udefined 
    const laneIndex = laneIdToIndex.get(step.laneId) ?? 0; // o ?? é para verificar se returna como undefined ou n

    return {
        id: step.id,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        type: 'custom',
        position: {
            x: (step.columnIndex + 0.50) * COLUMN_WIDTH, // centraliza um pouco na coluna
            y: (laneIndex * LANE_HEIGHT) + LANE_HEADER_HEIGHT + LANE_VERTICAL_PADDING, // Posiciona abaixo do header da lane e aqui que posiciona CERTINHO ONDE ELE DEVE ESTAR
        },
        data: {
            label: step.title,
            description: step.description,
            technologies: step.technologies,
            color: step.color,
            order: step.order,
            time: step.time
        },
        draggable: false,
        selectable: false
    }
    
})

const initialNodes: Node[] = [...laneNodes, ...stepNodes] //jjunta tudo

const initialEdges: Edge[] = INITIAL_CONNECTIONS.map((conn) => {
    const edge: Edge = {
        id: conn.start,
        source: conn.start,
        target: conn.end,
        label: conn.label
    }

    if (conn.lineStyle == 'dashed') {
        edge.animated = true
        edge.style = {
            stroke: 'red'
        }
    }
    return edge;
})

const edgeOptions = {
    type: 'step',
    style: {
        stroke: 'gray',
    },
};

export default function Page() {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
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
                <Controls />
            </ReactFlow>
        </div>
    );
}
