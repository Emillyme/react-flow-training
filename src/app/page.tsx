"use client";
import { useState, useCallback, useRef, useEffect } from 'react';

import { ReactFlow, Background, Controls, applyEdgeChanges, applyNodeChanges, BackgroundVariant, Position, ReactFlowProvider, useReactFlow, useNodesState, type Edge, type Node, OnNodeDrag, ReactFlowInstance, Panel } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import LabeledGroupNodeDemo from '@/components/LabeledGroupNodeDemo';
import { getData, saveUpdate } from '@/api/useUpdateData';


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
    source: '3',
    target: '4'
  }
]
 

const BasicFlow = () =>{
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes); // nodes do array default
  const { getIntersectingNodes } = useReactFlow();
  const overlappingNodeRef = useRef<Node | null>(null);
  const dragStartNodeRef = useRef<Record<string, Node>>({});

  
  const onNodeDrag: OnNodeDrag = (evt, dragNode) =>{
    const overlappingNode = getIntersectingNodes(dragNode)?.[0];
    overlappingNodeRef.current = overlappingNode;



    if(!dragStartNodeRef.current[dragNode.id]){
      const original = nodes.find(n => n.id === dragNode.id);
      if(original){
        dragStartNodeRef.current[dragNode.id] = {...original};
      }
    }
    
    // setNodes(prevNodes => prevNodes.map(node =>{
    //   if(node.id === dragNode.id){
        
    //     return {
    //       ...node,
    //     }
    //   }
  
    //   return node;
    // }))
    console.log("on Drag: ", nodes)
  }

  const onNodeDragStop: OnNodeDrag = (evt, dragNode) =>{

    

    if(!overlappingNodeRef?.current || (overlappingNodeRef?.current?.type !== "labeledGroupNode") && dragNode?.parentId){
      setNodes(prevNodes=>{

        const board = prevNodes?.find(prevNode=>prevNode.id === dragNode?.parentId)
    
        return prevNodes.map(node=>{
          const original = dragStartNodeRef.current[dragNode.id];

          if(node.id === dragNode.id && original){

            // const { x , y } = board?.position || {x:0,y:0} 
            // const {x:dragX, y:dragY} = dragNode?.position || {x:0,y:0}

            // const position = {x:dragX + x, y:dragY + y}
            
            return {...node, position: original.position, parentId: original.parentId}
          }
          return node;
        })

      })
    }

    // if the overlapped node is of the type labeledGroupNode
    if(overlappingNodeRef?.current?.type === "labeledGroupNode"){

      // map the previous state nodes
      setNodes(prevNodes=>prevNodes.map(node=>{

        // makes the child node relative to the parent
        const {x,y} = overlappingNodeRef?.current?.position || {x: 0, y: 0};
        const {x:dragX, y:dragY} = dragNode?.position || {x: 0, y: 0};

        let position;
        
        if(!node.parentId){
          position = {x: dragX - x, y: dragY - y};
        }else if(node.parentId && node?.parentId !== overlappingNodeRef?.current?.id){
          const prevBoard = prevNodes?.find(node=>node?.id === dragNode?.parentId)
          const {x:prevBoardX, y:prevBoardY} = prevBoard?.position || {x: 0, y: 0};
          position = {x:dragX + prevBoardX - x, y:dragY + prevBoardY - y}
        }
        

        // if the previous state node id is equals to the node that you are dragging
        if(node.id===dragNode?.id){

          dragStartNodeRef.current[dragNode.id] = {
            ...node,
            ...((!dragNode?.parentId || dragNode?.parentId !== overlappingNodeRef?.current?.id) && {position}),
            parentId: overlappingNodeRef?.current?.id
          }
          
          // add the parent id in the node and return a new state
          return{...node, parentId: overlappingNodeRef?.current?.id, ...((!dragNode?.parentId || dragNode?.parentId !== overlappingNodeRef?.current?.id) && {position})}
        }
        
        // return the another nodes not modified
        return node;
      }))
      
    }

    console.log("stop dragging: ", nodes)
    
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
    const nodes = res?.data.nodes;
    
    
    if(nodes){
      console.log("nodes", nodes)
      setNodes(nodes)
    }
   }
    
   fetchData()
  },[])

  return (
    <div className="w-screen h-screen">
      <ReactFlow nodeTypes={nodeTypes} nodes = {nodes}  onNodesChange={onNodesChange} onNodeDrag={onNodeDrag} onNodeDragStop={onNodeDragStop}>
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
