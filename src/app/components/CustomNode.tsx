'use client'

import React, { memo, useState } from 'react'; // Não precisa do useState se não estiver usando
import { Handle, Position } from '@xyflow/react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import type { Step } from '../interfaces';
import { SquarePen } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type CustomNodeProps = {
    data: Step;
};

function CustomNode({ data }: CustomNodeProps) {
    const { color, description, order, technologies = [], time, title } = data;
    const [editStepOpen, setEditStepOpen] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const trucatedText = description.slice(0, 50)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div
                    tabIndex={0}
                    role="button"
                    className={`flex justify-between flex-col pb-3 w-[200px] h-[200px] shadow-md bg-white border-t-8`}
                    style={{ borderTopColor: color }}
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
                        position={Position.Top}
                        className="w-16 !bg-teal-500"
                    />
                    <Handle
                        type="source"
                        position={Position.Bottom}
                        className="w-16 !bg-teal-500"
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] h-fit" >
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold text-[20px]" style={{ color: color }}>{title}</h4>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <SquarePen className="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-800" />
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Edit Step</DialogTitle>
                                        <DialogDescription>
                                            Here you can edit the step information
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Input type='text' placeholder='exemploo' />
                                    <Input type='text' placeholder='exemploo' />
                                    <Textarea />
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button className='rounded-none ' variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button className='rounded-none bg-blue-500 hover:bg-blue-700' type="submit">Save changes</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            {description}
                        </p>

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