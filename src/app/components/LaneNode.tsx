import type { NodeProps } from '@xyflow/react';

type LaneNodeData = {
  label: string;
};

export function LaneNode({ data, width, height }: NodeProps<LaneNodeData>) {
  return (
    <div className="">
      <div className="flex">
        <div className='flex items-center p-10 w-[200px] font-bold text-gray-500 border-b-2 border-b-gray-300 bg-[#00000015]'>
          <p className='text-[20px]'>
            {data.label}
          </p>
        </div>

        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            border: '1px solid #e1e1e1',
          }}
        >
        </div>
      </div>
    </div>
  );
}