"use client";
import { useState, useCallback } from 'react';

import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, BackgroundVariant, Position, ReactFlowProvider, useReactFlow, useNodesState, type Edge, type Node } from "@xyflow/react";
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

  },
  {
    id: "2",
    position: { x: 200, y: 50 },
    data: { label: "Node1" },
    sourcePosition: Position.Right,
    type: "default",
    parentId:"1",// E ISSO AQUI QUE DFINE A RELACAO DE PARENTE CARALHOOOOOOOOOOOOO
    draggable: conditional ? false : true,
    selectable: conditional ? false : true
  },
  {
    id: "3",
    position: { x: 400, y: 50 },
    data: { label: "Node2" },
    targetPosition: Position.Left,
    type: "default",
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
 

const BasicFlow = () =>{
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes); // nodes do array default
  const { getIntersectingNodes } = useReactFlow();

  
  const onNodeDrag = useCallback((_: MouseEvent, node: Node) => { // aparentemente, o "node" e o que estamos clicando
    const intersections = getIntersectingNodes(node).map((n) => n ); // node que esta "embaixo",  a que voce colide
    
    setNodes((ns) =>
      
      ns.map((n) =>(
      {
        ...n,
        // position: intersections[0]?.id.includes(n.id) ?  {x: node.position.x += intersections[0].position.x / 2 , y: node.position.y} : node.position,
        // parentId: intersections[0]?.type === "labeledGroupNode" ? "1" : ''
      })),
    );
    // console.log(intersections[0]?.id)
    // console.log(node.parentId)
    console.log(nodes)
  }, [])

  

  return (
    <div className="w-screen h-screen">
      <ReactFlow nodeTypes={nodeTypes} defaultNodes={nodes} edges={defaultEdge} onNodesChange={onNodesChange} onNodeDrag={onNodeDrag}>
        <Background/>
        <Controls />
      </ReactFlow>
    </div>
    
  );
}

export default function Home(){
  return(
    <ReactFlowProvider>
      <BasicFlow/>
    </ReactFlowProvider>
  )
}
