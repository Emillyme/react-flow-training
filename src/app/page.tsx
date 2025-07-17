"use client";
import { useState, useCallback, useRef, useEffect } from 'react';

import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, BackgroundVariant, Position, ReactFlowProvider, useReactFlow, useNodesState, type Edge, type Node, OnNodeDrag, ReactFlowInstance, Panel } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import LabeledGroupNodeDemo from '@/components/LabeledGroupNodeDemo';
import { getData, saveUpdate } from '@/api/useUpdateData';
import { useData } from '@/api/useData';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnMount: false,
//       refetchOnWindowFocus: false,
//       refetchOnReconnect: false,
//       retry: 0,
//     },
//   },
// });

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
    position: { x: 200, y: 250 },
    data: { label: "Group Node" },
    width: 380,
    height: 200,
    type: "labeledGroupNode",
  },
  {
    id: "3",
    position: { x: 200, y: 50 },
    data: { label: "Node1" },
    sourcePosition: Position.Right,
    type: "default",
    // E ISSO AQUI QUE DFINE A RELACAO DE PARENTE CARALHOOOOOOOOOOOOO
    
  },
  {
    id: "4",
    position: { x: 400, y: 50 },
    data: { label: "Node2" },
    targetPosition: Position.Left,
    type: "default",
    draggable: conditional ? false : true,
    selectable: conditional ? false : true
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
  const overlappingNodeRef = useRef<Node | null>(null);
  
  
  const onNodeDrag: OnNodeDrag = (evt, dragNode) =>{
    const overlappingNode = getIntersectingNodes(dragNode)?.[0];
    overlappingNodeRef.current = overlappingNode;
    // console.log(overlappingNode)

    setNodes(prevNodes => prevNodes.map(node =>{
      if(node.id === dragNode.id){
        return {
          ...node,
        }
      }
  
      return node;
    }))
  }

  const onNodeDragStop: OnNodeDrag = (evt, dragNode) =>{
    if(overlappingNodeRef?.current?.type === "labeledGroupNode"){
      setNodes(prevNodes=>prevNodes.map(node=>{
        if(node.id===dragNode?.id){
          // console.log({...node, parentId: overlappingNodeRef?.current?.id})
          return{...node, parentId: overlappingNodeRef?.current?.id, }
        }
        
        return node;
      }))
      
    }
    
  }

  // para utilizar metodos da instancia
  // const [ rfInstance , setRfInstance ] = useState<ReactFlowInstance<Node, Edge> | null>(null);


  const onSave = () =>{
    saveUpdate(nodes)
  }


  // // testando a atualizacao das nodes
  useEffect(() =>{
   async function fetchData(){
    const res = await getData()
    console.log(res)
    const nodes = res.data.nodes;
    
    
    if(nodes){
      console.log("nodes", nodes)
      setNodes(nodes)
    }
   }
    
   fetchData()
  },[])

  return (
    <div className="w-screen h-screen">
      <ReactFlow nodeTypes={nodeTypes} nodes = {nodes} onNodesChange={onNodesChange} onNodeDrag={onNodeDrag} onNodeDragStop={onNodeDragStop}>
        <Background/>
        <Panel>
          <button onClick={onSave}>
            save
          </button>
        </Panel>
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
