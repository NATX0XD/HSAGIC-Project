"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface TopbarContextType {
    title: string;
    subtitle: string;
    isEditable: boolean;
    setTitle: (title: string) => void;
    setSubtitle: (subtitle: string) => void;
    setIsEditable: (isEditable: boolean) => void;
    onTitleChange?: (newTitle: string) => void;
    setOnTitleChange: (fn: ((newTitle: string) => void) | undefined) => void;
}

const TopbarContext = createContext<TopbarContextType | undefined>(undefined);

export function TopbarProvider({ children }: { children: ReactNode }) {
    const [title, setTitle] = useState("AI Workspace");
    const [subtitle, setSubtitle] = useState("Interact and manage your AI history");
    const [isEditable, setIsEditable] = useState(false);
    const [onTitleChange, setOnTitleChange] = useState<((newTitle: string) => void) | undefined>(undefined);

    return (
        <TopbarContext.Provider value={{ title, subtitle, isEditable, setTitle, setSubtitle, setIsEditable, onTitleChange, setOnTitleChange }}>
            {children}
        </TopbarContext.Provider>
    );
}

export function useTopbar() {
    const context = useContext(TopbarContext);
    if (context === undefined) {
        throw new Error("useTopbar must be used within a TopbarProvider");
    }
    return context;
}
