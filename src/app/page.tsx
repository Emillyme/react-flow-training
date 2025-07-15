"use client";
import { useState, useCallback } from 'react';

import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, BackgroundVariant, Position } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import LabeledGroupNodeDemo from '@/components/LabeledGroupNodeDemo';

const nodeTypes = {
  labeledGroupNode: LabeledGroupNodeDemo,
};
 
const conditional = false;
const defaultNodes: Node[] = [

  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Group Node" },
    width: 1000,
    height: 200,
    type: "labeledGroupNode",
    draggable: false,
    selectable: false
  },
  {
    id: "2",
    position: { x: 200, y: 50 },
    data: { label: "Node" },
    sourcePosition: Position.Right,
    type: "default",
    parentId: "1",
    draggable: conditional ? false : true,
    selectable: conditional ? false : true
  },
  {
    id: "3",
    position: { x: 400, y: 50 },
    data: { label: "Node" },
    targetPosition: Position.Left,
    type: "default",
    parentId: "1",
    draggable: conditional ? false : true,
    selectable: conditional ? false : true
  },
  {
    id: "5",
    position: { x: 200, y: 250 },
    data: { label: "Group Node" },
    width: 380,
    height: 200,
    type: "labeledGroupNode",
  },
];

const defaultEdge = [
  {
    id: '1',
    source: '2',
    target: '3'
  }
]
 

export default function Home() {

  // const [nodes, setNodes] = useState(initialNodes);
  // const [edges, setEdges] = useState(initialEdges);
  
  // const onNodesChange = useCallback(
  //   (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
  //   [],
  // );
  // const onEdgesChange = useCallback(
  //   (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
  //   [],
  // );

  return (
    <div className="w-screen h-screen">
      <ReactFlow nodeTypes={nodeTypes} defaultNodes={defaultNodes} edges={defaultEdge}>
        <Background/>
        <Controls />
      </ReactFlow>
    </div>
    
  );
}
