import { NextResponse } from "next/server";
import DbService from "@/services/DbService"


export async function GET() {
    const response = await DbService.getDevs()

    return NextResponse.json(response.data);
}