export enum NodeTypes {
    Group = "group",
}

export type LaneNodeData = {
    id?: string;
    position?: {x: number, y: number};
    label?: string;
    width?: number;
    height?: number;
    type?: NodeTypes;
}

export interface Lane {
    id: string | number;
    name: string;
}

export interface Step{
    id: string;
    laneId: any; // this will be the parentId
    columnIndex: number;
    title: string;
    description: string;
    order: number;
    time: string;
    color: string;
    technologies: string[];
}

export interface Connection{
    start: string;
    end: string;
    label: string;
    lineStyle?: string;
}