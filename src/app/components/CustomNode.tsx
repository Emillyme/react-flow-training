'use client'

import React, { memo, useState } from 'react'; // Não precisa do useState se não estiver usando
import { Handle, Position } from '@xyflow/react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import type { Step } from '../interfaces';
import EditStep from './EditStep';
import { ScrollArea } from '@/components/ui/scroll-area';

type CustomNodeData = Step & {
    onSave: (updatedStep: Step) => void;
};

type CustomNodeProps = {
    data: CustomNodeData;
};

function CustomNode({ data }: CustomNodeProps) {
    const { color, description, order, technologies = [], time, title, onSave } = data;
    const [selectedStep, setSelectedStep] = useState<Step | null>(null)

    const trucatedText = description.slice(0, 50)
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div
                    tabIndex={0}
                    role="button"
                    className={`flex justify-between flex-col rounded pb-3 w-[200px] h-[200px] shadow-md bg-white border-t-8`}
                    style={{ borderTopColor: color }}
                    onClick={() => setSelectedStep(data)}
                >
                    <div className="">
                        <div className="flex px-4 py-1 border-b-[1px] border-b-gray-200">
                            <div className="flex justify-between w-full h-fit">
                                <p className='text-xs font-bold text-gray-500'>
                                    {order}
                                </p>
                                <p className='text-xs font-bold text-gray-500'>
                                    {time}
                                </p>
                            </div>
                        </div>
                        <div className="px-3 py-2">
                            <h1 className='font-bold text-base mb-1'>{title}</h1>
                            <p className='text-xs text-gray-600 leading-snug'>{trucatedText}... <br /><span className='text-blue-400 hover:underline'>Read more</span></p>
                        </div>
                    </div>
                    <div className="flex flex-wrap px-3 gap-1">
                        {technologies.filter(Boolean).map((tech) => {
                            const cleanedTech = tech.replace(/[\[\]"]/g, '').trim();

                            return (
                                <span
                                    key={tech.replace(/[\[\]"]/g, '')}
                                    className='flex items-center bg-blue-100 text-blue-800 py-1 px-2 text-[10px] font-medium'
                                >
                                    {cleanedTech}
                                </span>
                            )
                        })}
                    </div>
                    <Handle
                        type="target"
                        position={Position.Left}
                        className="w-56 !bg-teal-500"
                    />
                    <Handle
                        type="source"
                        position={Position.Right}
                        className="w-56 !bg-teal-500"
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] h-fit" >
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-[20px]" style={{ color: color }}>{title}</h4>
                            <EditStep data={data} onSave={onSave}/>
                        </div>
                        <div className="text-muted-foreground text-[17px]">
                            <ScrollArea className="h-[200px] w-fit">
                                {description}
                            </ScrollArea>
                        </div>

                        <div className="flex flex-wrap gap-1 pt-5">
                            {technologies.filter(Boolean).map((tech) => {
                                const cleanedTech = tech.replace(/[\[\]"]/g, '').trim();

                                return (
                                    <span
                                        key={tech.replace(/[\[\]"]/g, '')}
                                        className='flex items-center bg-blue-100 text-blue-800 py-1 px-2 text-[15px] font-medium'
                                    >
                                        {cleanedTech}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default memo(CustomNode);