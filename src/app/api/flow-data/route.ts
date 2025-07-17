import { db } from "../../../db/db";
import { connections, lanes, steps } from '../../../db/schemas'
import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log('Fetching lanes...');
        const lanesData = await db.select().from(lanes);
        console.log('Lanes:', lanesData);

        console.log('Fetching steps...');
        const stepsData = await db.select().from(steps);
        console.log('Steps:', stepsData);

        console.log('Fetching connections...');
        const connectionsData = await db.select().from(connections);
        console.log('Connections:', connectionsData);

        return NextResponse.json({
            lanes: lanesData,
            steps: stepsData,
            connections: connectionsData,
        });
    } catch (error) {
        console.error('Failed to fetch flow data:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    const {  title, description, time, color, technologies } = body;

    const newStep = { 
        title: title, 
        description: description, 
        time: time, 
        color: color, 
        technologies: technologies
    };
    
    return new Response(JSON.stringify(newStep),{
        status: 201,
        headers: {'Content-Type': 'application/json'}
    });
}
