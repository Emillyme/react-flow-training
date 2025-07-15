import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

function CustomNode({ data }) {
    return (
        <div className={`flex justify-between flex-col pb-3 w-[200px] h-[200px] shadow-md bg-white border-t-6 `} style={{ borderTopColor: data.color }}>
            <div className="">
                <div className="flex px-4 py-1 border-b-[0.1px] border-b-gray-300">
                    <div className="flex justify-between w-full border-b-gray-500 h-fit">
                        <p className='text-[12px] font-bold'>
                            {data.order}
                        </p>
                        <p className='text-[12px] font-bold'>
                            {data.time}
                        </p>
                    </div>
                </div>
                <div className="px-2 py-1">
                    <h1 className='font-bold'>{data.label}</h1>
                    <p className='text-[10px]'>{data.description}</p>
                </div>
            </div>
            <div className="flex px-2 gap-2">{data.technologies.map((tech: any) => {
                return (
                    <span
                        key={tech}
                        className='flex items-center bg-gray-100 py-1 px-3 text-[10px]'
                    >
                        {tech}
                    </span>
                )
            })}
            </div>
            <Handle
                type="target"
                position={Position.Top}
                className="w-16 !bg-gray-800"
            />
            <Handle
                type="source"
                position={Position.Bottom}
                className="w-16 !bg-gray-800"
            />
        </div>
    );
}

export default memo(CustomNode);
