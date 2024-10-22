'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type NasaData = {
    title: string;
    url: string;
    explanation: string;
    date: string;
};

async function fetchNasaDataByDate(date: string): Promise<NasaData> {
    const res = await fetch(`http://localhost:3000/api/nasa?date=${date}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

const NasaDetailPage = () => {
    const { date } = useParams();
    const [data, setData] = useState<NasaData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (date) {
            const dateString = Array.isArray(date) ? date[0] : date;
            console.log(`Fetching data for date: ${dateString}`);
            fetchNasaDataByDate(dateString)
                .then((data) => {
                    console.log('Data fetched:', data);
                    setData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setError(error.message);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [date]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>No data found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4 text-center">{data.title}</h1>
            <img src={data.url} alt={data.title} className="w-full h-auto mb-4 rounded" />
            <p className="text-lg">{data.explanation}</p>
            <button onClick={() => window.history.back()} className="text-blue-500 hover:underline">
                Go back
            </button>
        </div>
    );
};

export default NasaDetailPage;