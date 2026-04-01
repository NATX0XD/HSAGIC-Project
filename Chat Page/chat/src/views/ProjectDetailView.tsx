"use client";

import React, { useEffect, useState } from "react";
import { useTopbar } from "@/contexts/TopbarContext";
import { useChatStore } from "@/store/chatStore";
import { HiOutlineFolderOpen, HiOutlineMicrophone, HiOutlinePlus, HiOutlineSparkles, HiOutlinePaperClip } from "react-icons/hi2";
import { SiSlack, SiGoogledrive } from "react-icons/si";
import { Button, Input, Tabs, Tab } from "@heroui/react";
import { useRouter } from "next/navigation";

interface ProjectDetailViewProps {
    projectId: string;
}

export default function ProjectDetailView({ projectId }: ProjectDetailViewProps) {
    const router = useRouter();
    const { setTitle, setSubtitle, setIsEditable } = useTopbar();
    const { projects, sessions, createSession, setActiveSession } = useChatStore();

    const [newChatPrompt, setNewChatPrompt] = useState("");

    const project = projects.find(p => p.id === projectId);
    const projectSessions = sessions.filter(s => s.projectId === projectId);

    useEffect(() => {
        if (project) {
            setTitle(project.name);
            setSubtitle("Manage project chats and sources.");
        } else {
            setTitle("Project Not Found");
            setSubtitle("This project may have been deleted.");
        }
        setIsEditable(false);
    }, [project, setTitle, setSubtitle, setIsEditable]);

    if (!project) {
        return (
            <div className="flex-1 w-full bg-slate-50 flex flex-col items-center justify-center">
                <p className="text-slate-500 font-medium">Project not found.</p>
                <Button
                    color="primary"
                    variant="flat"
                    className="mt-4 bg-violet-100 text-violet-700 font-medium text-[13px]"
                    onClick={() => router.push('/projects')}
                >
                    Back to Projects
                </Button>
            </div>
        );
    }

    const handleCreateProjectChat = () => {
        if (newChatPrompt.trim()) {
            // Generate a smart title based on the prompt initially
            const title = newChatPrompt.slice(0, 30) + (newChatPrompt.length > 30 ? "..." : "");
            const newId = createSession(title);

            // Move it to this project immediately
            useChatStore.getState().moveSessionToProject(newId, projectId);

            // We should ideally add the message right away too
            useChatStore.getState().addMessage(newId, {
                id: crypto.randomUUID(),
                role: "user",
                content: newChatPrompt.trim()
            });

            setActiveSession(newId);
            router.push("/");
        }
    };

    return (
        <div className="flex-1 w-full bg-white relative flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto w-full no-scrollbar pb-10">
                <main className="w-full max-w-[760px] mx-auto pt-10 px-4 md:px-8">

                    {/* Header matching screenshot styling */}
                    <div className="flex items-center gap-4 mb-8">
                        <HiOutlineFolderOpen size={28} className="text-slate-700 stroke-[1.5px]" />
                        <h1 className="text-[28px] font-medium text-slate-800 tracking-tight">{project.name}</h1>
                    </div>

                    {/* Search / New Chat Bar */}
                    <div className="mb-8">
                        <Input
                            placeholder={`New chat in ${project.name}`}
                            value={newChatPrompt}
                            onChange={(e) => setNewChatPrompt(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleCreateProjectChat()}
                            startContent={<HiOutlinePlus size={18} className="text-slate-400 mr-1" />}
                            endContent={
                                <div className="flex items-center gap-1">
                                    <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
                                        <HiOutlineMicrophone size={18} />
                                    </button>
                                    <button className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-100/80 hover:bg-slate-200/80 text-slate-500 transition-colors">
                                        <HiOutlineSparkles size={16} />
                                    </button>
                                </div>
                            }
                            classNames={{
                                input: "text-[15px] font-medium placeholder:text-slate-400/80 text-slate-700",
                                inputWrapper: "h-14 px-4 bg-white border border-slate-200/80 shadow-[0_2px_12px_rgb(0,0,0,0.03)] hover:border-slate-300 focus-within:!border-violet-500 rounded-[16px] transition-all",
                            }}
                        />
                    </div>

                    {/* Tabs area */}
                    <Tabs
                        aria-label="Project Sections"
                        variant="underlined"
                        classNames={{
                            tabList: "gap-6 w-full relative rounded-none border-b border-slate-200/60 p-0",
                            cursor: "w-full bg-slate-800",
                            tab: "max-w-fit px-0 h-10 -mb-px",
                            tabContent: "group-data-[selected=true]:text-slate-800 group-data-[selected=true]:font-medium text-slate-500 text-[14px]"
                        }}
                    >
                        <Tab key="chats" title="Chats">
                            <div className="pt-2">
                                {projectSessions.length === 0 ? (
                                    <div className="py-12 text-center text-slate-400 text-[14px]">
                                        No chats in this project yet. Start a new chat above.
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        {projectSessions.map((session, idx) => (
                                            <div
                                                key={session.id}
                                                onClick={() => {
                                                    setActiveSession(session.id);
                                                    router.push("/");
                                                }}
                                                className={`
                                                    group flex items-center justify-between py-5 cursor-pointer transition-colors
                                                    ${idx !== projectSessions.length - 1 ? 'border-b border-slate-100' : ''}
                                                `}
                                            >
                                                <div className="flex flex-col gap-0.5 max-w-[70%]">
                                                    <h3 className="text-[14px] font-medium text-slate-700 group-hover:text-slate-900 transition-colors truncate">
                                                        {session.title}
                                                    </h3>
                                                    {session.messages.length > 0 && (
                                                        <p className="text-[13px] text-slate-500 truncate mt-0.5">
                                                            {session.messages[0].content}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-[12px] text-slate-400 shrink-0">
                                                    {new Date(session.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Tab>
                        <Tab key="sources" title="Sources">
                            <div className="pt-6 w-full pb-10">
                                <div className="border border-dashed border-slate-200/80 rounded-2xl flex flex-col items-center justify-center py-20 px-4 text-center">
                                    <div className="flex gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-[10px] bg-slate-900 flex items-center justify-center shadow-sm">
                                            <SiSlack size={18} className="text-[#E01E5A]" />
                                        </div>
                                        <div className="w-10 h-10 rounded-[10px] bg-slate-900 flex items-center justify-center shadow-sm">
                                            <SiGoogledrive size={18} className="text-[#1FA463]" />
                                        </div>
                                        <div className="w-10 h-10 rounded-[10px] bg-slate-900 flex items-center justify-center shadow-sm">
                                            <HiOutlinePaperClip size={18} className="text-white transform -rotate-45" />
                                        </div>
                                    </div>
                                    <h2 className="text-[17px] font-semibold text-slate-800 mb-2">Give HSAGIC more context</h2>
                                    <p className="text-[14px] text-slate-500 max-w-[420px] mb-8 leading-relaxed">
                                        Upload sources, link drives, or connect apps like Slack to give HSAGIC deeper context about your project.
                                    </p>
                                    <Button
                                        className="bg-white text-slate-800 font-medium px-6 shadow-sm border border-slate-200 rounded-full hover:bg-slate-50"
                                        onPress={() => {
                                            const input = document.createElement("input");
                                            input.type = "file";
                                            input.multiple = true;
                                            input.click();
                                        }}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>

                </main>
            </div>
        </div>
    );
}
