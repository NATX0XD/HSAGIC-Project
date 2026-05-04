"use client";

import React, { useState } from "react";
import { Avatar, Tooltip, Popover, PopoverTrigger, PopoverContent, Divider, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@heroui/react";
import {
    HiOutlineChatBubbleLeftRight,
    HiOutlinePhoto,
    HiOutlineDocumentArrowUp,
    HiOutlineFolder,
    HiOutlineClock,
    HiOutlineStar,
    HiOutlineGlobeAlt,
    HiOutlineBell,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog6Tooth,
    HiOutlineChevronRight,
    HiOutlineChevronLeft,
    HiOutlineChevronDoubleLeft,
    HiOutlineSparkles,
    HiOutlinePaintBrush,
    HiOutlineArrowRightOnRectangle,
    HiOutlineChevronUp,
    HiOutlineShare,
    HiOutlinePencil,
    HiOutlineFolderArrowDown,
    HiOutlineMapPin,
    HiMapPin,
    HiOutlineTrash,
    HiOutlineEllipsisHorizontal
} from "react-icons/hi2";
import { TbPackageExport } from "react-icons/tb";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useChatStore } from "@/store/chatStore";
import { ConfirmModal } from "./Modals/ConfirmModal";
import { PromptModal } from "./Modals/PromptModal";
import { ProfileModal } from "./Modals/ProfileModal";
import { SettingsModal } from "./Modals/SettingsModal";

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

interface NavItem {
    icon: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
    expandable?: boolean;
    badge?: number;
}

const createItems: NavItem[] = [
    {
        icon: <span className="font-serif text-lg font-medium leading-none">T</span>,
        label: "New Chat",
        href: "/",
    },
    // { icon: <HiOutlinePhoto size={20} />, label: "Image Analysis" },
    { icon: <HiOutlinePhoto size={20} />, label: "Gallery", href: "/gallery" },
    { icon: <HiOutlineDocumentArrowUp size={20} />, label: "Document Upload", href: "/documents" },
];

const bottomItems: NavItem[] = [
    // { icon: <HiOutlineGlobeAlt size={20} />, label: "Community" },
    { icon: <HiOutlineBell size={20} />, label: "Notifications", badge: 2 },
    { icon: <HiOutlineQuestionMarkCircle size={20} />, label: "Help" },
    { icon: <HiOutlineCog6Tooth size={20} />, label: "Settings" },
];

function NavItemButton({
    item,
    collapsed,
    isActiveOverride,
}: {
    item: NavItem;
    collapsed: boolean;
    isActiveOverride?: boolean;
}) {
    const pathname = usePathname();
    // Consider active if explicit override is provided, OR pathname matches the item href exactly
    const isActive = isActiveOverride !== undefined
        ? isActiveOverride
        : (item.href ? pathname === item.href : false);

    const content = (
        <button
            onClick={item.onClick}
            className={`
                group relative flex w-full items-center rounded-[12px] h-11 transition-all duration-200 cursor-pointer border border-transparent
                ${isActive
                    ? "bg-white text-violet-700 shadow-[0_2px_10px_rgb(0,0,0,0.04)] border-slate-200/60"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                }
                ${collapsed ? "justify-center px-0 gap-0" : "px-3.5 gap-3.5"}
            `}
        >
            <div className={`flex items-center justify-center transition-colors ${isActive ? "text-violet-600" : "text-slate-400 group-hover:text-slate-700"}`}>
                {item.icon}
            </div>

            {!collapsed && (
                <div className="flex flex-1 items-center justify-between min-w-0">
                    <span className={`text-[13px] font-medium truncate ${isActive ? "font-bold text-slate-900" : ""}`}>
                        {item.label}
                    </span>
                    <div className="flex items-center gap-2 ml-2 shrink-0">
                        {item.badge && (
                            <div className="flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-100 px-1.5 text-[11px] font-bold text-violet-600">
                                {item.badge}
                            </div>
                        )}
                        {item.expandable && (
                            <HiOutlineChevronRight size={14} className="text-slate-400 group-hover:text-slate-600" />
                        )}
                    </div>
                </div>
            )}

            {collapsed && item.badge && (
                <div className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-500 text-[9px] font-bold text-white px-1 shadow-sm border-2 border-slate-50">
                    {item.badge}
                </div>
            )}
        </button>
    );

    const wrappedContent = item.href ? (
        <Link href={item.href} className="block w-full">
            {content}
        </Link>
    ) : content;

    // Show tooltip when collapsed
    if (collapsed) {
        return (
            <Tooltip content={item.label} placement="right" delay={200} classNames={{ content: "font-semibold text-xs py-1 px-2" }}>
                {wrappedContent}
            </Tooltip>
        );
    }

    return wrappedContent;
}

function HistoryItem({
    session,
    collapsed,
    isActive,
    onSelect,
    onRename,
    onShare,
    onPin,
    onDelete,
    projects,
    onMoveToProject
}: {
    session: any;
    collapsed: boolean;
    isActive: boolean;
    onSelect: () => void;
    onRename: () => void;
    onShare: () => void;
    onPin: () => void;
    onDelete: () => void;
    projects: any[];
    onMoveToProject: (projectId: string | null) => void;
}) {
    const [menuView, setMenuView] = useState<"main" | "projects">("main");
    const content = (
        <div className="relative group flex items-center w-full">
            <button
                onClick={onSelect}
                className={`
                    flex-1 flex items-center rounded-[12px] h-11 transition-all duration-200 cursor-pointer border border-transparent outline-none
                    ${isActive
                        ? "bg-white text-violet-700 shadow-[0_2px_10px_rgb(0,0,0,0.04)] border-slate-200/60"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50"
                    }
                    ${collapsed ? "justify-center px-0 gap-0" : "px-3.5 gap-3.5"}
                `}
            >
                <div className={`flex items-center justify-center transition-colors ${isActive ? "text-violet-600" : "text-slate-400 group-hover:text-slate-700"}`}>
                    <HiOutlineChatBubbleLeftRight size={18} />
                </div>
                {!collapsed && (
                    <div className="flex flex-1 items-center justify-between min-w-0 pr-6">
                        <span className={`text-[13px] font-medium truncate ${isActive ? "font-bold text-slate-900" : ""}`}>
                            {session.title}
                        </span>
                        {session.isPinned && (
                            <HiMapPin size={12} className="text-violet-500 shrink-0 ml-1" />
                        )}
                    </div>
                )}
            </button>

            {!collapsed && (
                <div className={`absolute right-1.5 flex items-center transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                    <Dropdown placement="bottom-end" classNames={{ content: "min-w-[180px]" }} onOpenChange={(isOpen) => { if (!isOpen) setMenuView("main"); }}>
                        <DropdownTrigger>
                            <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors">
                                <HiOutlineEllipsisHorizontal size={18} />
                            </button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Chat Actions"
                            closeOnSelect={menuView !== "main"}
                            itemClasses={{ base: "rounded-lg text-[13px] font-medium text-slate-700 data-[hover=true]:text-slate-900 data-[hover=true]:bg-slate-100 py-2", title: "text-[13px]" }}
                        >
                            {menuView === "main" ? [
                                <DropdownItem key="share" startContent={<HiOutlineShare size={16} className="text-slate-400" />} onClick={onShare}>Share</DropdownItem>,
                                <DropdownItem key="rename" startContent={<HiOutlinePencil size={16} className="text-slate-400" />} onClick={onRename}>Rename</DropdownItem>,
                                <DropdownItem key="move" startContent={<HiOutlineFolderArrowDown size={16} className="text-slate-400" />} onClick={() => setMenuView("projects")}>Move to project</DropdownItem>,
                                <DropdownItem key="pin" startContent={session.isPinned ? <HiOutlineMapPin size={16} className="text-slate-400" /> : <HiMapPin size={16} className="text-slate-400" />} onClick={onPin}>
                                    {session.isPinned ? "Unpin chat" : "Pin chat"}
                                </DropdownItem>,
                                <DropdownItem key="delete" className="text-danger" color="danger" startContent={<HiOutlineTrash size={16} className="text-danger" />} onClick={onDelete}>Delete</DropdownItem>
                            ] : [
                                <DropdownItem key="back" startContent={<HiOutlineChevronLeft size={16} className="text-slate-400" />} onClick={() => setMenuView("main")} className="border-b border-slate-100 rounded-none pb-2 mb-1">
                                    Back
                                </DropdownItem>,
                                ...projects.map(p => (
                                    <DropdownItem key={`proj-${p.id}`} onClick={() => onMoveToProject(p.id)} className={session.projectId === p.id ? "bg-violet-50 text-violet-700" : ""}>
                                        {p.name} {session.projectId === p.id && "(Current)"}
                                    </DropdownItem>
                                )),
                                <DropdownItem key="remove-proj" className={!session.projectId ? "hidden" : "text-danger mt-1 border-t border-slate-100 rounded-none pt-2"} color="danger" onClick={() => onMoveToProject(null)}>
                                    Remove from project
                                </DropdownItem>
                            ]}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            )}
        </div>
    );

    if (collapsed) {
        return (
            <Tooltip content={session.title} placement="right" delay={200} classNames={{ content: "font-semibold text-xs py-1 px-2" }}>
                {content}
            </Tooltip>
        );
    }

    return content;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { isOpen: isMoveModalOpen, onOpen: onMoveModalOpen, onOpenChange: onMoveModalOpenChange } = useDisclosure();
    const [sessionToMove, setSessionToMove] = useState<string | null>(null);

    // Modal States
    const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();
    const [confirmConfig, setConfirmConfig] = useState<{ title: string; description: string; onConfirm: () => void; isDanger?: boolean; cancelText?: string }>({ title: "", description: "", onConfirm: () => { } });

    const { isOpen: isPromptOpen, onOpen: onPromptOpen, onClose: onPromptClose } = useDisclosure();
    const [promptConfig, setPromptConfig] = useState<{ title: string; description?: string; initialValue: string; onConfirm: (val: string) => void }>({ title: "", initialValue: "", onConfirm: () => { } });

    const [isProjectsOpen, setIsProjectsOpen] = useState(true);
    const [isChatsOpen, setIsChatsOpen] = useState(true);

    const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure();
    const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();

    // Zustand Chat Store
    const { sessions, projects, activeSessionId, userProfile, updateUserProfile, createSession, createProject, setActiveSession, updateSessionTitle, togglePinSession, deleteSession, moveSessionToProject, updateProjectName, deleteProject } = useChatStore();

    // Compute Pinned and Recent
    const pinnedSessions = sessions.filter(s => s.isPinned);
    const recentSessions = sessions.filter(s => !s.isPinned);

    const handleMoveClick = (sessionId: string) => {
        setSessionToMove(sessionId);
        onMoveModalOpen();
    };

    const handleMoveConfirm = (projectId: string | null) => {
        if (sessionToMove) {
            moveSessionToProject(sessionToMove, projectId);
        }
        onMoveModalOpenChange();
    };

    // Map createItems and inject handleNewChat for the New Chat button
    const enhancedCreateItems = createItems.map(item => {
        if (item.label === "New Chat") {
            return {
                ...item,
                onClick: () => {
                    const newId = createSession("New Chat");
                    setActiveSession(newId);
                    router.push("/");
                }
            };
        }
        return item;
    });

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={onToggle}
                />
            )}

            <aside
                className={`
                    fixed left-0 top-0 z-50 h-screen flex flex-col
                    bg-slate-50
                    transition-all duration-300 ease-in-out
                    ${collapsed ? "w-[80px]" : "w-[260px]"}
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0 lg:relative
                `}
            >
                {/* Logo Area */}
                <div className="flex items-center justify-between px-6 pt-8 pb-4">
                    {!collapsed && (
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-violet-200">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" className="fill-violet-500" />
                                    <path d="M2 17L12 22L22 17" className="stroke-violet-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12L12 17L22 12" className="stroke-violet-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="text-[18px] font-bold tracking-tight text-slate-800 uppercase leading-tight">
                                Design <br/> <span className="text-violet-600">to Deploy</span>
                            </span>
                        </div>
                    )}
                    {collapsed && (
                        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-2xl bg-violet-200">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" className="fill-violet-500" />
                                <path d="M2 17L12 22L22 17" className="stroke-violet-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" className="stroke-violet-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    )}
                    {!collapsed && (
                        <button
                            onClick={() => setCollapsed(true)}
                            className="text-slate-400 hover:text-slate-700 hover:bg-slate-200 h-7 w-7 flex items-center justify-center transition-colors rounded-lg"
                        >
                            <HiOutlineChevronDoubleLeft size={16} />
                        </button>
                    )}
                </div>

                {/* Collapsed expand */}
                {collapsed && (
                    <button
                        onClick={() => setCollapsed(false)}
                        className="mx-auto mt-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 h-7 w-7 flex items-center justify-center rotate-180 transition-colors rounded-lg"
                    >
                        <HiOutlineChevronDoubleLeft size={16} />
                    </button>
                )}

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-8 no-scrollbar pb-6 mt-2">
                    {/* CREATE Section */}
                    <div>
                        {!collapsed && (
                            <p className="mb-2.5 px-3.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                Create
                            </p>
                        )}
                        <div className="space-y-1">
                            {enhancedCreateItems.map((item) => (
                                <NavItemButton
                                    key={item.label}
                                    item={item}
                                    collapsed={collapsed}
                                    isActiveOverride={item.label === "New Chat" ? pathname === "/" : undefined}
                                />
                            ))}
                        </div>
                    </div>

                    {/* MAIN / PROJECTS Section */}
                    <div>
                        {!collapsed && (
                            <div
                                className="flex items-center gap-1 mb-2 px-3 cursor-pointer group w-fit"
                                onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                            >
                                <span className="text-[12px] font-bold text-slate-500 group-hover:text-slate-700 transition-colors">Projects</span>
                                {isProjectsOpen ? (
                                    <HiOutlineChevronUp size={12} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                                ) : (
                                    <HiOutlineChevronRight size={12} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                                )}
                            </div>
                        )}
                        <div className="space-y-0.5">
                            {/* New Project Inline Action */}
                            {!collapsed && isProjectsOpen && (
                                <button
                                    onClick={() => {
                                        setPromptConfig({
                                            title: "Create new project",
                                            description: "Enter a name for your new project workspace.",
                                            initialValue: "",
                                            onConfirm: (newName) => {
                                                const id = createProject(newName);
                                                router.push(`/projects/${id}`);
                                            }
                                        });
                                        onPromptOpen();
                                    }}
                                    className="flex items-center justify-between w-full p-2 h-9 rounded-xl cursor-pointer transition-all duration-200 hover:bg-slate-200/50"
                                >
                                    <div className="flex items-center gap-3 w-full">
                                        <span className="flex-shrink-0 text-slate-400">
                                            <HiOutlineFolderArrowDown size={18} className="rotate-180" />
                                        </span>
                                        <span className="truncate flex-1 text-left text-[14px] font-medium text-slate-600 group-hover:text-slate-900">
                                            New project
                                        </span>
                                    </div>
                                </button>
                            )}

                            {/* Projects List */}
                            {projects.length > 0 && !collapsed && isProjectsOpen && (
                                <>
                                    {projects.slice(0, 5).map(project => (
                                        <div key={project.id} className="relative group">
                                            <Link href={`/projects/${project.id}`} className="block">
                                                <div className={`
                                                    flex items-center justify-between w-full p-2 h-9 rounded-xl cursor-pointer transition-all duration-200
                                                    ${pathname === `/projects/${project.id}` ? 'bg-white shadow-[0_2px_10px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/50' : 'hover:bg-slate-200/50'}
                                                `}>
                                                    <div className="flex items-center gap-3 w-full pr-8">
                                                        <span className={`flex-shrink-0 ${pathname === `/projects/${project.id}` ? 'text-violet-600' : 'text-slate-400'}`}>
                                                            <HiOutlineFolder size={18} />
                                                        </span>
                                                        <span className={`truncate flex-1 text-left text-[14px] ${pathname === `/projects/${project.id}` ? 'font-semibold text-slate-900' : 'font-medium text-slate-600 group-hover:text-slate-900'}`}>
                                                            {project.name}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>

                                            <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Dropdown placement="bottom-end" classNames={{ content: "min-w-[170px]" }}>
                                                    <DropdownTrigger>
                                                        <button className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors">
                                                            <HiOutlineEllipsisHorizontal size={16} />
                                                        </button>
                                                    </DropdownTrigger>
                                                    <DropdownMenu aria-label="Project Actions" itemClasses={{ base: "rounded-lg text-[13px] font-medium text-slate-700 data-[hover=true]:text-slate-900 data-[hover=true]:bg-slate-100 py-2", title: "text-[13px]" }}>
                                                        <DropdownItem key="share" startContent={<HiOutlineShare size={16} className="text-slate-400" />} onClick={() => {
                                                            navigator.clipboard.writeText(window.location.origin + `/projects/${project.id}`);
                                                            window.alert("Project link copied to clipboard!");
                                                        }}>
                                                            Share
                                                        </DropdownItem>
                                                        <DropdownItem key="rename" startContent={<HiOutlinePencil size={16} className="text-slate-400" />} onClick={() => {
                                                            setPromptConfig({
                                                                title: "Rename project",
                                                                initialValue: project.name,
                                                                onConfirm: (newName) => updateProjectName(project.id, newName)
                                                            });
                                                            onPromptOpen();
                                                        }}>
                                                            Rename project
                                                        </DropdownItem>
                                                        <DropdownItem key="delete" className="text-danger" color="danger" startContent={<HiOutlineTrash size={16} className="text-danger" />} onClick={() => {
                                                            setConfirmConfig({
                                                                title: "Delete project",
                                                                description: `Are you sure you want to delete "${project.name}"? This action cannot be undone.`,
                                                                isDanger: true,
                                                                onConfirm: () => {
                                                                    deleteProject(project.id);
                                                                    if (pathname === `/projects/${project.id}`) {
                                                                        router.push("/projects");
                                                                    }
                                                                }
                                                            });
                                                            onConfirmOpen();
                                                        }}>
                                                            Delete project
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    ))}
                                    {projects.length > 5 && (
                                        <Link href="/projects" className="block mt-1">
                                            <div className="flex items-center justify-between w-full p-2 h-9 rounded-xl cursor-pointer transition-all duration-200 bg-slate-200/40 hover:bg-slate-200/80">
                                                <div className="flex items-center gap-3 w-full">
                                                    <span className="flex-shrink-0 text-slate-500">
                                                        <HiOutlineEllipsisHorizontal size={18} />
                                                    </span>
                                                    <span className="truncate flex-1 text-left text-[14px] font-semibold text-slate-700">
                                                        More
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    )}
                                </>
                            )}

                            {/* Dynamic History Section from Zustand */}
                            {sessions.length > 0 && (
                                <div className="pt-2">
                                    {!collapsed && (
                                        <div
                                            className="flex items-center gap-1 mb-2 px-3 mt-4 cursor-pointer group w-fit"
                                            onClick={() => setIsChatsOpen(!isChatsOpen)}
                                        >
                                            <span className="text-[12px] font-bold text-slate-500 group-hover:text-slate-700 transition-colors">Your chats</span>
                                            {isChatsOpen ? (
                                                <HiOutlineChevronUp size={12} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                                            ) : (
                                                <HiOutlineChevronRight size={12} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                                            )}
                                        </div>
                                    )}
                                    {isChatsOpen && (
                                        <div className="space-y-0.5 mt-1">
                                            {/* Pinned Sessions */}
                                            {pinnedSessions.map(session => (
                                                <HistoryItem
                                                    key={session.id}
                                                    session={session}
                                                    collapsed={collapsed}
                                                    isActive={activeSessionId === session.id && pathname === "/"}
                                                    onSelect={() => {
                                                        setActiveSession(session.id);
                                                        router.push("/");
                                                    }}
                                                    onMoveToProject={(projectId) => moveSessionToProject(session.id, projectId)}
                                                    projects={projects}
                                                    onRename={() => {
                                                        setPromptConfig({
                                                            title: "Rename chat",
                                                            initialValue: session.title,
                                                            onConfirm: (newName) => updateSessionTitle(session.id, newName)
                                                        });
                                                        onPromptOpen();
                                                    }}
                                                    onShare={() => {
                                                        navigator.clipboard.writeText(window.location.href);
                                                        setConfirmConfig({
                                                            title: "Link Copied",
                                                            description: "Chat link copied to clipboard successfully.",
                                                            onConfirm: () => { },
                                                            cancelText: "" // hide cancel to make it an alert
                                                        });
                                                        onConfirmOpen();
                                                    }}
                                                    onPin={() => togglePinSession(session.id)}
                                                    onDelete={() => {
                                                        setConfirmConfig({
                                                            title: "Delete chat",
                                                            description: `Are you sure you want to delete "${session.title}"?`,
                                                            isDanger: true,
                                                            onConfirm: () => {
                                                                deleteSession(session.id);
                                                                if (activeSessionId === session.id) {
                                                                    router.push("/");
                                                                }
                                                            }
                                                        });
                                                        onConfirmOpen();
                                                    }}
                                                />
                                            ))}

                                            {pinnedSessions.length > 0 && recentSessions.length > 0 && !collapsed && (
                                                <div className="px-4 py-3">
                                                    <div className="border-t border-slate-200/60"></div>
                                                </div>
                                            )}

                                            {/* Recent Sessions */}
                                            {recentSessions.map(session => (
                                                <HistoryItem
                                                    key={session.id}
                                                    session={session}
                                                    collapsed={collapsed}
                                                    isActive={activeSessionId === session.id && pathname === "/"}
                                                    onSelect={() => {
                                                        setActiveSession(session.id);
                                                        router.push("/");
                                                    }}
                                                    onMoveToProject={(projectId) => moveSessionToProject(session.id, projectId)}
                                                    projects={projects}
                                                    onRename={() => {
                                                        setPromptConfig({
                                                            title: "Rename chat",
                                                            initialValue: session.title,
                                                            onConfirm: (newName) => updateSessionTitle(session.id, newName)
                                                        });
                                                        onPromptOpen();
                                                    }}
                                                    onShare={() => {
                                                        navigator.clipboard.writeText(window.location.href);
                                                        setConfirmConfig({
                                                            title: "Link Copied",
                                                            description: "Chat link copied to clipboard successfully.",
                                                            onConfirm: () => { },
                                                            cancelText: "" // hide cancel to make it an alert
                                                        });
                                                        onConfirmOpen();
                                                    }}
                                                    onPin={() => togglePinSession(session.id)}
                                                    onDelete={() => {
                                                        setConfirmConfig({
                                                            title: "Delete chat",
                                                            description: `Are you sure you want to delete "${session.title}"?`,
                                                            isDanger: true,
                                                            onConfirm: () => {
                                                                deleteSession(session.id);
                                                                if (activeSessionId === session.id) {
                                                                    router.push("/");
                                                                }
                                                            }
                                                        });
                                                        onConfirmOpen();
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bottom Section inside scroll to mimic reference spacing nicely */}
                    <div className="pt-6">
                        <div className="space-y-1">
                            {bottomItems.map((item) => (
                                <NavItemButton key={item.label} item={item} collapsed={collapsed} />
                            ))}
                        </div>
                    </div>
                </nav>

                {/* Bottom: User Profile */}
                <div className="px-4 pb-4 pt-2">
                    <Popover
                        placement="top"
                        offset={12}
                        classNames={{
                            content: "w-[240px] p-0 rounded-[24px] border border-slate-200 shadow-[0_16px_48px_rgba(0,0,0,0.12)] bg-white overflow-hidden",
                        }}
                    >
                        <PopoverTrigger>
                            <button
                                className={`
                                    group flex w-full items-center justify-between rounded-2xl p-2
                                    hover:bg-slate-200/50 transition-all duration-200 cursor-pointer text-left
                                    ${collapsed ? "justify-center px-0 hover:bg-transparent" : "gap-2"}
                                `}
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <Avatar
                                        name={userProfile.displayName.charAt(0).toUpperCase()}
                                        size="md"
                                        classNames={{
                                            base: "bg-[#7c8fb5] text-white flex-shrink-0 font-bold uppercase",
                                            name: "text-sm",
                                        }}
                                    />
                                    {!collapsed && (
                                        <div className="flex flex-col min-w-0">
                                            <p className="text-sm font-semibold text-slate-800 truncate">
                                                {userProfile.displayName}
                                            </p>
                                            <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
                                                Free
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {!collapsed && (
                                    <Button
                                        as={Link}
                                        href="/pricing"
                                        size="sm"
                                        variant="bordered"
                                        radius="full"
                                        className="h-7 text-xs font-semibold border-slate-300 text-slate-600 hover:bg-slate-100 px-3 flex-shrink-0 z-10"
                                    >
                                        Upgrade
                                    </Button>
                                )}
                            </button>
                        </PopoverTrigger>

                        <PopoverContent>
                            <div className="flex flex-col w-full py-2">
                                {/* User Info Header */}
                                <div
                                    onClick={onProfileOpen}
                                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors"
                                >
                                    <Avatar
                                        name={userProfile.displayName.charAt(0).toUpperCase()}
                                        size="md"
                                        classNames={{
                                            base: "bg-[#ffdca8] text-[#c95a00] flex-shrink-0 font-bold uppercase",
                                            name: "text-base",
                                        }}
                                    />
                                    <div className="min-w-0 flex flex-col justify-center">
                                        <p className="text-[15px] font-bold text-[#1e293b] truncate leading-tight">{userProfile.displayName}</p>
                                        <p className="text-[13px] font-medium text-[#64748b] truncate mt-0.5">@{userProfile.username}</p>
                                    </div>
                                </div>

                                <div className="px-4 py-1">
                                    <Divider className="bg-slate-100" />
                                </div>

                                {/* Menu Items */}
                                <div className="py-1 px-2">
                                    {[
                                        { icon: <HiOutlineSparkles size={18} className="text-[#64748b]" />, label: "Upgrade plan", href: "/pricing" },
                                        { icon: <HiOutlinePaintBrush size={18} className="text-[#64748b]" />, label: "Personalization" },
                                        { icon: <HiOutlineCog6Tooth size={18} className="text-[#64748b]" />, label: "Settings", action: onSettingsOpen },
                                    ].map((menuItem) => (
                                        menuItem.href ? (
                                            <Link
                                                key={menuItem.label}
                                                href={menuItem.href}
                                                className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-[#334155] hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                                            >
                                                <span className="flex-shrink-0">{menuItem.icon}</span>
                                                {menuItem.label}
                                            </Link>
                                        ) : (
                                            <button
                                                key={menuItem.label}
                                                onClick={menuItem.action}
                                                className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-[#334155] hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                                            >
                                                <span className="flex-shrink-0">{menuItem.icon}</span>
                                                {menuItem.label}
                                            </button>
                                        )
                                    ))}
                                </div>

                                <div className="px-4 py-1">
                                    <Divider className="bg-slate-100" />
                                </div>

                                {/* Help & Log Out */}
                                <div className="py-1 px-2">
                                    <button className="flex w-full items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-[#334155] hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <span className="flex-shrink-0"><HiOutlineQuestionMarkCircle size={18} className="text-[#64748b]" /></span>
                                            Help
                                        </div>
                                        <HiOutlineChevronRight size={14} className="text-[#94a3b8]" />
                                    </button>
                                    <button
                                        onClick={() => router.push("/login")}
                                        className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-[#ef4444] hover:bg-[#fef2f2] transition-colors cursor-pointer"
                                    >
                                        <span className="flex-shrink-0"><HiOutlineArrowRightOnRectangle size={18} /></span>
                                        Log out
                                    </button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Credit Link */}
                <div className="px-6 py-4 mt-auto border-t border-slate-100/50">
                    <a 
                        href="https://design2deploy-site.vercel.app/en" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex flex-col gap-0.5 group"
                    >
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-slate-500 transition-colors">Powered by</span>
                        <span className="text-[12px] font-extrabold text-slate-700 group-hover:text-violet-600 transition-colors">DESIGN TO DEPLOY</span>
                    </a>
                </div>
            </aside>

            {/* Global Modals container */}
            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={onConfirmClose}
                title={confirmConfig.title}
                description={confirmConfig.description}
                onConfirm={confirmConfig.onConfirm}
                isDanger={confirmConfig.isDanger}
                cancelText={confirmConfig.cancelText}
            />
            <PromptModal
                isOpen={isPromptOpen}
                onClose={onPromptClose}
                title={promptConfig.title}
                description={promptConfig.description}
                initialValue={promptConfig.initialValue}
                onConfirm={promptConfig.onConfirm}
            />
            <ProfileModal
                isOpen={isProfileOpen}
                onClose={onProfileClose}
                userProfile={userProfile}
                onSave={updateUserProfile}
            />
            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={onSettingsClose}
            />
        </>
    );
}
