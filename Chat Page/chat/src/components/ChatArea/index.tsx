"use client";

import React, { useEffect, useRef } from "react";
import ChatMessage, { MessageProps } from "./ChatMessage";

interface ChatAreaProps {
    messages: Omit<MessageProps, "isEditable" | "onEdit">[];
    onEditMessage: (id: string, newContent: string) => void;
}

export default function ChatArea({ messages, onEditMessage }: ChatAreaProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Figure out which user messages are in the last 2 user messages
    const userMessageIds = messages
        .filter((m) => m.role === "user")
        .map((m) => m.id);

    const editableMessageIds = new Set(userMessageIds.slice(-2)); // Take the last 2

    return (
        <div className="flex flex-col w-full max-w-[800px] mx-auto pb-32 animate-fade-in pt-8">
            {messages.map((msg) => (
                <ChatMessage
                    key={msg.id}
                    id={msg.id}
                    role={msg.role}
                    content={msg.content}
                    isEditable={msg.role === "user" && editableMessageIds.has(msg.id)}
                    onEdit={onEditMessage}
                />
            ))}
            <div ref={bottomRef} className="h-4" />
        </div>
    );
}
