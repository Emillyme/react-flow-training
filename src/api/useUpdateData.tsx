import { useMutation, useQuery } from "@tanstack/react-query";
import { Node, ReactFlowJsonObject, Edge } from "@xyflow/react";
import axios from "axios";


export async function saveUpdate(nodes: Node[]){
    const response = await axios.post('http://localhost:7000/data',{
        nodes
    })

    console.log(response)
}

export async function getData(){
    try{
        const response = await axios.get('http://localhost:7000/data');
        return response.data;
    }catch(error){
        console.error(error)
        return;
    }
   
   
}