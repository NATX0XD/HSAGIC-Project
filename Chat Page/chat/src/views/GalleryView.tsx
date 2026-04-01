"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@heroui/react";
import { HiOutlineMagnifyingGlass, HiOutlinePhoto } from "react-icons/hi2";
import { useMedia } from "@/hooks/useMedia";
import MediaGrid from "@/components/MediaGrid";
import { useTopbar } from "@/contexts/TopbarContext";

export default function GalleryView() {
    const [searchQuery, setSearchQuery] = useState("");
    const { items, isLoading } = useMedia();
    const { setTitle, setSubtitle } = useTopbar();

    useEffect(() => {
        setTitle("Gallery");
        setSubtitle("View and preview images uploaded in previous chats");
    }, [setTitle, setSubtitle]);

    // Filter only images
    const images = items.filter(item => item.type === "image");

    // Search filter
    const filteredImages = images.filter(img =>
        img.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto w-full px-6 py-8">
            <div className="max-w-[1200px] mx-auto w-full">
                {/* Toolbar */}
                <div className="flex items-center gap-4 mb-6">
                    <Input
                        placeholder="Search images by name..."
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                        startContent={<HiOutlineMagnifyingGlass className="text-slate-400" size={18} />}
                        classNames={{
                            base: "max-w-md",
                            inputWrapper: "bg-white border border-slate-200 shadow-sm rounded-full",
                        }}
                    />
                </div>

                {/* Media Grid */}
                <MediaGrid
                    items={filteredImages}
                    isLoading={isLoading}
                    emptyIcon={<HiOutlinePhoto size={32} />}
                    emptyTitle="No images found"
                    emptyMessage="We couldn't find any images matching your search."
                />

            </div>
        </div>
    );
}
