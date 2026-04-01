"use client";

import React, { useEffect, useState } from "react";
import { useTopbar } from "@/contexts/TopbarContext";
import { useChatStore } from "@/store/chatStore";
import { HiOutlineFolder, HiOutlinePlus, HiOutlineFolderOpen } from "react-icons/hi2";
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import Link from "next/link";

export default function ProjectsView() {
    const { setTitle, setSubtitle, setIsEditable } = useTopbar();
    const { projects, createProject } = useChatStore();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [newProjectName, setNewProjectName] = useState("");

    useEffect(() => {
        setTitle("Projects");
        setSubtitle("Manage and group your chat sessions.");
        setIsEditable(false);
    }, [setTitle, setSubtitle, setIsEditable]);

    const handleCreateProject = () => {
        if (newProjectName.trim()) {
            createProject(newProjectName.trim());
            setNewProjectName("");
            onOpenChange(); // Close modal
        }
    };

    return (
        <div className="flex-1 w-full bg-white relative flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto w-full no-scrollbar pb-10">
                <main className="w-full max-w-[900px] mx-auto pt-6 px-4 md:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">Your Projects</h1>
                            <p className="text-sm text-slate-500 mt-1">Organize your chats into dedicated workspaces.</p>
                        </div>
                        <Button
                            color="primary"
                            startContent={<HiOutlinePlus size={18} className="stroke-[2px]" />}
                            onClick={onOpen}
                            className="bg-violet-600 font-medium text-[13px] h-10 px-4 shadow-sm"
                        >
                            New Project
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project) => (
                            <Link href={`/projects/${project.id}`} key={project.id} className="block group">
                                <div className="bg-white border border-slate-200/60 rounded-2xl p-5 hover:border-violet-300 hover:shadow-[0_8px_30px_rgb(124,58,237,0.06)] transition-all duration-300 h-full flex flex-col">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 group-hover:bg-violet-100 group-hover:scale-110 transition-all">
                                            <HiOutlineFolderOpen size={20} className="stroke-[2px]" />
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-slate-800 text-[15px] mb-1 group-hover:text-violet-700 transition-colors">
                                        {project.name}
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-auto pt-4">
                                        Created {new Date(project.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </Link>
                        ))}

                        {projects.length === 0 && (
                            <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400 mb-4">
                                    <HiOutlineFolder size={24} />
                                </div>
                                <h3 className="text-[15px] font-semibold text-slate-700 mb-1">No projects yet</h3>
                                <p className="text-[13px] text-slate-400 max-w-[250px] text-center mb-4">
                                    Create a project to start grouping your related chat sessions together.
                                </p>
                                <Button
                                    variant="flat"
                                    color="primary"
                                    onClick={onOpen}
                                    className="font-medium text-[13px] bg-violet-50 text-violet-600"
                                >
                                    Create first project
                                </Button>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[15px] font-bold">Create New Project</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Project Name"
                                    placeholder="Enter project name..."
                                    variant="bordered"
                                    value={newProjectName}
                                    onChange={(e) => setNewProjectName(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleCreateProject();
                                        }
                                    }}
                                    classNames={{
                                        input: "text-[13px] font-medium",
                                        inputWrapper: "border-slate-200 shadow-none hover:border-slate-300 focus-within:!border-violet-500 rounded-xl",
                                        label: "text-slate-500 font-medium"
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose} className="font-medium text-[13px]">
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={handleCreateProject} className="bg-violet-600 font-medium text-[13px] shadow-sm">
                                    Create
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
