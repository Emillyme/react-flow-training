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
import { INITIAL_STEPS, INITIAL_LANES, INITIAL_CONNECTIONS } from '../data/fake-data';
import { styleText } from 'util';


// ANOTAÇÕES
// nodes = etapa de cada processo
// handle = ação de interligar o processo
// edge = processo de um para um e sua função.

// const initialNodes: Node[] = [
//     { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
//     { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
// ];

const COLUMN_WIDTH = 250;
const LANE_HEIGHT = 180;

const initialNodes: Node[] = INITIAL_STEPS.map((step) => {
    return {
        id: step.id,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        position: {
            x: step.columnIndex * 400,
            y: step.columnIndex * 0
        },
        data: {
            label: step.title,
            description: step.description,
            technologies: step.technologies,
            color: step.color,
        }
    }
})

// TIPO DE EDGES (type)
// "default" -> Linha curvada interligada       
// "straight" -> linha reta BEM RETA
// "step" -> linha quadrada reta
// "smoothstep" -> linha quadrada reta com rounded
// "simplebezier" -> default ou seja, linha curvada interligada

// const initialEdges: Edge[] = [
//     { id: 'e1-2', source: '1', target: '2' }
// ];

const initialEdges: Edge[] = INITIAL_CONNECTIONS.map((conn) => {
    return{
        id: conn.start,
        source: conn.start,
        target: conn.end,
        label: conn.label
    }

})

const edgeOptions = {
    type: 'step',
    animated: true,
    focusable: true,
    style: {
        stroke: 'blue',
    },
};

const edgeOptionsDot = {
    type: 'step',
    animated: true,
    focusable: true,
    style: {
        stroke: 'gray'
    }
}


export default function Teste() {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const connectionLineStyle = { stroke: 'red' }

    // Função para mover dinamicamente, toda vez que for mvido de posição, vai ser usado um callback parar alterar na instancia
    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [setNodes],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [setEdges],
    );

    // Criar linha para interligar
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
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}
