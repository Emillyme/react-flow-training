import { db } from "../../../db/db";
import { connections, lanes, steps } from '../../../db/schemas'
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const lanesData = await db.select().from(lanes);
        console.log('Lanes:', lanesData);

        const stepsData = await db.select().from(steps);
        console.log('Steps:', stepsData);

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