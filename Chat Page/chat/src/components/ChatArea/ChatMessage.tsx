"use client";

import React, { useState, useEffect } from "react";
import { Avatar, Modal, ModalContent, useDisclosure } from "@heroui/react";
import { HiOutlinePencilSquare, HiOutlineCheck, HiOutlineXMark } from "react-icons/hi2";
import { FiCpu } from "react-icons/fi";

export interface MessageProps {
    id: string;
    role: "user" | "ai";
    content: string;
    isEditable?: boolean;
    attachment?: string;
    onEdit?: (id: string, newContent: string) => void;
}

export default function ChatMessage({ id, role, content, isEditable, attachment, onEdit }: MessageProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(content);

    // Typing effect state for AI
    const [displayedContent, setDisplayedContent] = useState(role === "ai" ? "" : content);

    const isUser = role === "user";

    // Simulate typing effect for AI messages
    useEffect(() => {
        if (role === "ai") {
            let i = 0;
            setDisplayedContent(""); // reset on new content
            const interval = setInterval(() => {
                setDisplayedContent(content.substring(0, i + 1));
                i++;
                if (i >= content.length) {
                    clearInterval(interval);
                }
            }, 30); // 30ms per character
            return () => clearInterval(interval);
        } else {
            setDisplayedContent(content);
        }
    }, [content, role]);

    const handleSave = () => {
        if (!editContent.trim()) return;
        onEdit?.(id, editContent);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditContent(content);
        setIsEditing(false);
    };

    return (
        <div className={`flex w-full gap-4 ${isUser ? "flex-row-reverse" : "flex-row"} mb-6 group animate-fade-in`}>
            {/* Avatar */}
            <div className="shrink-0 flex items-start mt-1">
                {isUser ? (
                    <Avatar
                        isBordered
                        radius="full"
                        size="md"
                        color="secondary"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        className="shadow-sm ring-2 ring-white"
                    />
                ) : (
                    <div className="h-10 w-10 min-w-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md ring-2 ring-white">
                        <FiCpu size={20} />
                    </div>
                )}
            </div>

            {/* Message Bubble Column */}
            <div className={`flex flex-col gap-1.5 max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>

                {/* Name / Role Label - optional */}
                <div className="text-[12px] font-bold text-slate-400 px-1">
                    {isUser ? "You" : "HSAGIC"}
                </div>

                {/* The Bubble content */}
                {isEditing ? (
                    <div className="w-full min-w-[300px] flex flex-col gap-2 bg-white border border-slate-200 shadow-sm rounded-2xl p-3 animate-fade-in">
                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            rows={3}
                            autoFocus
                            className="w-full text-[14.5px] text-slate-800 leading-relaxed outline-none resize-none bg-transparent placeholder:text-slate-400"
                        />
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                            <button
                                onClick={handleCancel}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[13px] font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                            >
                                <HiOutlineXMark size={14} /> Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!editContent.trim() || editContent === content}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-[13px] font-semibold text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-50 transition-colors shadow-sm"
                            >
                                <HiOutlineCheck size={14} /> Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="relative group/bubble">
                        <div
                            className={`
                                relative px-4 py-3 shadow-[0_2px_8px_rgb(0,0,0,0.02)] border text-[14.5px] leading-[1.6]
                                ${isUser
                                    ? "bg-slate-900 text-white border-slate-800 rounded-l-[18px] rounded-br-[4px] rounded-tr-[18px]"
                                    : "bg-white text-slate-800 border-slate-200/60 rounded-r-[18px] rounded-bl-[4px] rounded-tl-[18px]"
                                }
                            `}
                        >
                            {/* Attachment rendering */}
                            {attachment && (
                                <div className="mb-3">
                                    <button
                                        className="text-left w-full focus:outline-none"
                                        onClick={onOpen}
                                    >
                                        <img
                                            src={attachment}
                                            alt="User Attachment"
                                            className="max-w-[280px] w-full max-h-[250px] object-cover rounded-xl shadow-sm border border-slate-700/50 cursor-pointer hover:opacity-90 transition-opacity"
                                        />
                                    </button>
                                </div>
                            )}

                            {/* Blinking cursor effect for AI while typing */}
                            {displayedContent}
                            {role === "ai" && displayedContent.length < content.length && (
                                <span className="opacity-50 animate-pulse ml-[2px]">|</span>
                            )}
                        </div>

                        {/* Edit Button overlay for User messages */}
                        {isUser && isEditable && !isEditing && (
                            <div className="absolute top-1/2 -translate-y-1/2 -left-10 opacity-0 group-hover/bubble:opacity-100 transition-opacity">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-1.5 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-violet-600 hover:border-violet-200 shadow-sm transition-colors"
                                    title="Edit Message"
                                >
                                    <HiOutlinePencilSquare size={14} />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Image Zoom Modal */}
            {attachment && (
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    size="4xl"
                    backdrop="blur"
                    classNames={{
                        base: "bg-transparent shadow-none border-none",
                        closeButton: "top-4 right-4 z-50 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 h-10 w-10 flex items-center justify-center transition-colors"
                    }}
                >
                    <ModalContent>
                        {() => (
                            <div className="w-full flex items-center justify-center p-4">
                                <img
                                    src={attachment}
                                    alt="Zoomed Attachment"
                                    className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl ring-1 ring-white/20"
                                />
                            </div>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </div>
    );
}
