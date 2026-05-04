"use client";

import React, { useState } from "react";
import { Chip, Button } from "@heroui/react";
import { HiOutlineArrowPath } from "react-icons/hi2";

interface Prompt {
    label: string;
    query: string;
}

const prompts: Prompt[] = [
    {
        label: "Write Code",
        query: "Help me write a React component for a dashboard",
    },
    {
        label: "Summarize Text",
        query: "Can you summarize this long article for me?",
    },
    {
        label: "Brainstorm Ideas",
        query: "Help me brainstorm 5 marketing ideas for my startup",
    },
    {
        label: "Draft Email",
        query: "Draft a professional email to a potential client",
    },
    {
        label: "Fix Bugs",
        query: "Help me debug this JavaScript error",
    },
    {
        label: "Plan Schedule",
        query: "Create a study plan for learning Python in 30 days",
    },
    {
        label: "Creative Story",
        query: "Write a short science fiction story about Mars",
    },
];

export default function QuickPrompts() {
    const [displayedPrompts, setDisplayedPrompts] = useState(prompts.slice(0, 4));

    const handleRefresh = () => {
        const shuffled = [...prompts].sort(() => Math.random() - 0.5);
        setDisplayedPrompts(shuffled.slice(0, 4));
    };

    return (
        <div className="w-full max-w-[680px] mx-auto mt-8 animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-col mb-4 px-1">
                <h3 className="text-[13px] font-bold text-slate-700 tracking-[0.05em] uppercase mb-4 pl-1">
                    Quick promts
                </h3>
            </div>

            {/* Prompt Pills using standard button/outline styling like reference */}
            <div className="flex flex-wrap gap-2.5 mb-5 px-1">
                {displayedPrompts.map((prompt) => (
                    <button
                        key={prompt.label}
                        className="bg-white border border-slate-200/80 text-slate-500 hover:border-slate-300 hover:text-slate-700 hover:bg-slate-50/50 shadow-[0_1px_2px_rgb(0,0,0,0.01)] transition-all duration-200 text-[13px] font-medium px-4 py-2 rounded-[12px] cursor-pointer"
                    >
                        {prompt.label}
                    </button>
                ))}
            </div>

            {/* Refresh Link */}
            <div className="px-1 flex items-center">
                <Button
                    variant="light"
                    size="sm"
                    startContent={<HiOutlineArrowPath size={14} className="stroke-[2px]" />}
                    onClick={handleRefresh}
                    className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 font-medium text-[13px] h-8 px-2 min-w-0 transition-all rounded-lg"
                >
                    Refresh promts
                </Button>
            </div>
        </div>
    );
}
