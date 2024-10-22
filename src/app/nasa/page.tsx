// app/nasa/page.tsx
import React from 'react';
import Link from 'next/link';

type NasaData = {
    title: string;
    url: string;
    explanation: string;
    date: string;
};

async function fetchNasaData(): Promise<NasaData[]> {
    const res = await fetch(`http://localhost:3000/api/nasa`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

const NasaPage = async () => {
    const data = await fetchNasaData();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4 text-center">NASA Astronomy Pictures of the Day</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                        <img src={item.url} alt={item.title} className="w-full h-auto mb-4 rounded" />
                        <p className="text-lg">{item.explanation}</p>
                        <Link href={`/nasa/${item.date}`} legacyBehavior>
                            <a className="text-blue-500 hover:underline">Read more</a>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NasaPage;