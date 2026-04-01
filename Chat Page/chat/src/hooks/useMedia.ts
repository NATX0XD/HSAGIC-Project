import { useState, useEffect } from "react";

export interface MediaItem {
    id: number;
    name: string;
    size: string;
    date: string;
    type: "pdf" | "spreadsheet" | "image" | "archive" | string;
    previewUrl?: string; // used for images
}

interface UseMediaReturn {
    items: MediaItem[];
    isLoading: boolean;
    error: Error | null;
}

export function useMedia(): UseMediaReturn {
    const [items, setItems] = useState<MediaItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetchMedia = async () => {
            try {
                // Simulate network latency for mockup UI feeling
                const response = await fetch("/api/documents.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch media");
                }
                const data = await response.json();

                setTimeout(() => {
                    if (isMounted) {
                        setItems(data);
                        setIsLoading(false);
                    }
                }, 800);
            } catch (err: any) {
                if (isMounted) {
                    console.error("Failed to load mock data:", err);
                    setError(err);
                    setIsLoading(false);
                }
            }
        };

        fetchMedia();

        return () => {
            isMounted = false;
        };
    }, []);

    return { items, isLoading, error };
}
