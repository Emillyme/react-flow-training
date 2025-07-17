export interface Lane {
    id: string | number;
    name: string;
}

export interface Step{
    id: string;
    laneId: any;
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