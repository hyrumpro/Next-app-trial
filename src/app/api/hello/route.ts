// app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server';

type User = {
    id: number;
    name: string;
};

const users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
];

export async function GET(request: NextRequest) {
    const url = new URL(request.url);

    if (url.pathname === '/api/hello') {
        return NextResponse.json({ message: 'Hello from Next.js!' });
    }

    if (url.pathname === '/api/users') { // Add the leading slash
        return NextResponse.json(users);
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

