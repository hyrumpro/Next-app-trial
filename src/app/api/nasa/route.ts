import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const apiKey = process.env.NASA_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key is missing' }, { status: 400 });
    }

    const endpoint = date
        ? `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
        : `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=10`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch data from NASA API: ${errorData.error.message}`);
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching data from NASA API:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}