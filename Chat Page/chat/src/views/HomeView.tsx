"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ChatInput from "@/components/ChatInput";
import QuickPrompts from "@/components/QuickPrompts";
import ChatArea from "@/components/ChatArea";
import { useTopbar } from "@/contexts/TopbarContext";
import { useChatStore } from "@/store/chatStore";

function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
}

export default function HomeView() {
    const greeting = getGreeting();

    const {
        sessions,
        activeSessionId,
        createSession,
        addMessage,
        updateMessage,
        updateSessionTitle
    } = useChatStore();

    const activeSession = sessions.find(s => s.id === activeSessionId);
    const messages = activeSession?.messages || [];
    const activeSessionTitle = activeSession?.title;

    const { title: topbarTitle, setTitle, setSubtitle, setIsEditable, setOnTitleChange } = useTopbar();

    // 1. Sync store -> topbar
    useEffect(() => {
        if (activeSessionId && activeSessionTitle) {
            setTitle(activeSessionTitle);
        } else {
            setTitle("New Chat");
        }
        setSubtitle("Turn text into detailed images.");
        setIsEditable(true);

        const handler = (newTitle: string) => {
            if (activeSessionId) {
                updateSessionTitle(activeSessionId, newTitle);
            }
        };
        setOnTitleChange(() => handler);

        return () => {
            setIsEditable(false);
            setOnTitleChange(undefined);
        };
    }, [activeSessionId, activeSessionTitle, setTitle, setSubtitle, setIsEditable, setOnTitleChange, updateSessionTitle]);

    const handleSend = (text: string, attachmentUrl?: string) => {
        let currentId = activeSessionId;

        // Auto-create persistent session on first message if none active
        if (!currentId) {
            // Pick a smart default title from the first prompt
            const defaultTitle = text.slice(0, 30) || "New Chat";
            currentId = createSession(defaultTitle);
        }

        // 1. Add User Message
        const userMsgId = Date.now().toString();
        const userMsg = { id: userMsgId, role: "user" as const, content: text, attachment: attachmentUrl };
        addMessage(currentId, userMsg);

        // 2. Add AI Placeholder Message
        setTimeout(() => {
            const aiMsgId = (Date.now() + 1).toString();
            const aiMsg = { id: aiMsgId, role: "ai" as const, content: "ไม่มีคำตอบไปก่อน" };
            addMessage(currentId!, aiMsg);
        }, 300);
    };

    const handleEditMessage = (id: string, newContent: string) => {
        if (!activeSessionId) return;

        // This will slice subsequent messages and append the edited one inside the store
        updateMessage(activeSessionId, id, newContent);

        // Simulate a new AI response to this edited message
        setTimeout(() => {
            const aiMsgId = (Date.now() + 1).toString();
            addMessage(activeSessionId, { id: aiMsgId, role: "ai" as const, content: "ไม่มีคำตอบไปก่อน" });
        }, 300);
    };

    const hasMessages = messages.length > 0;

    return (
        <div className={`flex flex-col items-center p-4 relative ${hasMessages ? "justify-start h-full" : "justify-center min-h-full"}`}>

            {!hasMessages ? (
                <>
                    {/* Greeting (Only show when no messages) */}
                    <div className="text-center mb-12 animate-fade-in w-full max-w-[700px]">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                            {greeting}, User{" "}
                            <motion.span
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                                className="inline-block"
                            >
                                ✨
                            </motion.span>
                        </h1>
                        <p className="text-lg text-slate-500 max-w-md mx-auto leading-relaxed font-medium">
                            Choose a prompt below or write your own to start
                            <br />
                            chatting with{" "}
                            <span className="font-bold text-violet-600">AI</span>
                        </p>
                    </div>

                    {/* Chat Area Container (Initial State) */}
                    <div className="w-full max-w-[700px] flex flex-col gap-8 pb-10">
                        <ChatInput onSend={handleSend} />
                        <QuickPrompts />
                    </div>
                </>
            ) : (
                <>
                    {/* Chat Thread */}
                    <div className="w-full flex-1 overflow-y-auto pt-4 pb-4 px-2 no-scrollbar">
                        <ChatArea messages={messages} onEditMessage={handleEditMessage} />
                    </div>

                    {/* Pinned Input */}
                    <div className="w-full max-w-[800px] mx-auto pb-6 pt-2 shrink-0 bg-white z-10">
                        <ChatInput onSend={handleSend} variant="compact" />
                    </div>
                </>
            )}

        </div>
    );
}
