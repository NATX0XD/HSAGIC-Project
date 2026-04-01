"use client";

import React, { useState } from "react";
import { Modal, ModalContent, ModalBody, Button, Switch, Select, SelectItem, Divider } from "@heroui/react";
import {
    HiOutlineCog6Tooth,
    HiOutlineBell,
    HiOutlinePaintBrush,
    HiOutlineSquares2X2,
    HiOutlineCircleStack,
    HiOutlineKey,
    HiOutlineUserGroup,
    HiOutlineUser
} from "react-icons/hi2";
import { useChatStore, UserSettings } from "@/store/chatStore";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type TabType = "General" | "Notifications" | "Personalization" | "Apps" | "Data controls" | "Security" | "Parental controls" | "Account";

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const { userSettings, updateUserSettings } = useChatStore();
    const [activeTab, setActiveTab] = useState<TabType>("General");

    const tabs: { id: TabType; icon: React.ReactNode; label: string }[] = [
        { id: "General", icon: <HiOutlineCog6Tooth size={18} />, label: "General" },
        { id: "Notifications", icon: <HiOutlineBell size={18} />, label: "Notifications" },
        { id: "Personalization", icon: <HiOutlinePaintBrush size={18} />, label: "Personalization" },
        { id: "Apps", icon: <HiOutlineSquares2X2 size={18} />, label: "Apps" },
        { id: "Data controls", icon: <HiOutlineCircleStack size={18} />, label: "Data controls" },
        { id: "Security", icon: <HiOutlineKey size={18} />, label: "Security" },
        { id: "Parental controls", icon: <HiOutlineUserGroup size={18} />, label: "Parental controls" },
        { id: "Account", icon: <HiOutlineUser size={18} />, label: "Account" },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            size="4xl"
            classNames={{
                base: "bg-white text-slate-900 shadow-2xl rounded-2xl overflow-hidden h-[600px] max-h-[85vh]",
                body: "p-0",
                closeButton: "hover:bg-slate-100 active:bg-slate-200 text-slate-400 z-50 absolute right-4 top-4"
            }}
        >
            <ModalContent>
                {() => (
                    <ModalBody className="flex flex-row h-full">

                        {/* Left Sidebar */}
                        <div className="w-[240px] bg-[#fdfdfd] border-r border-slate-100 flex flex-col h-full py-2">
                            <div className="px-3 mb-2 pt-14">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-semibold transition-colors mb-0.5
                                            ${activeTab === tab.id
                                                ? "bg-slate-100 text-slate-900"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                            }
                                        `}
                                    >
                                        <span className={activeTab === tab.id ? "text-slate-700" : "text-slate-400"}>
                                            {tab.icon}
                                        </span>
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Content Area */}
                        <div className="flex-1 flex flex-col h-full overflow-hidden">
                            <div className="flex-shrink-0 px-8 pt-8 pb-4">
                                <h2 className="text-[20px] font-bold text-slate-900">{activeTab}</h2>
                            </div>

                            <div className="flex-1 overflow-y-auto px-8 pb-8 no-scrollbar">
                                {/* TAB CONTENT */}
                                {activeTab === "General" && (
                                    <div className="flex flex-col gap-6 w-full max-w-2xl">
                                        {/* Appearance */}
                                        <div className="flex items-center justify-between py-1">
                                            <span className="text-[14px] font-medium text-slate-700">Appearance</span>
                                            <Select
                                                size="sm"
                                                variant="bordered"
                                                selectedKeys={[userSettings.general.appearance]}
                                                onSelectionChange={(keys) => updateUserSettings("general", { appearance: Array.from(keys)[0] as UserSettings['general']['appearance'] })}
                                                classNames={{
                                                    base: "w-32",
                                                    trigger: "bg-white border-slate-200 shadow-sm rounded-lg hover:border-slate-300 focus-within:!border-violet-600",
                                                    value: "text-[13px] font-medium text-slate-800"
                                                }}
                                            >
                                                <SelectItem key="System" textValue="System">System</SelectItem>
                                                <SelectItem key="Light" textValue="Light">Light</SelectItem>
                                                <SelectItem key="Dark" textValue="Dark">Dark</SelectItem>
                                            </Select>
                                        </div>
                                        <Divider className="bg-slate-100" />

                                        {/* Accent Color */}
                                        <div className="flex items-center justify-between py-1">
                                            <span className="text-[14px] font-medium text-slate-700">Accent color</span>
                                            <Select
                                                size="sm"
                                                variant="bordered"
                                                selectedKeys={[userSettings.general.accentColor]}
                                                onSelectionChange={(keys) => updateUserSettings("general", { accentColor: Array.from(keys)[0] as string })}
                                                classNames={{
                                                    base: "w-32",
                                                    trigger: "bg-white border-slate-200 shadow-sm rounded-lg hover:border-slate-300 focus-within:!border-violet-600",
                                                    value: "text-[13px] font-medium text-slate-800"
                                                }}
                                            >
                                                <SelectItem key="Default" textValue="Default">Default</SelectItem>
                                                <SelectItem key="Blue" textValue="Blue">Blue</SelectItem>
                                                <SelectItem key="Violet" textValue="Violet">Violet</SelectItem>
                                            </Select>
                                        </div>
                                        <Divider className="bg-slate-100" />

                                        {/* Language */}
                                        <div className="flex items-center justify-between py-1">
                                            <span className="text-[14px] font-medium text-slate-700">Language</span>
                                            <Select
                                                size="sm"
                                                variant="bordered"
                                                selectedKeys={[userSettings.general.language]}
                                                onSelectionChange={(keys) => updateUserSettings("general", { language: Array.from(keys)[0] as string })}
                                                classNames={{
                                                    base: "w-40",
                                                    trigger: "bg-white border-slate-200 shadow-sm rounded-lg hover:border-slate-300 focus-within:!border-violet-600",
                                                    value: "text-[13px] font-medium text-slate-800"
                                                }}
                                            >
                                                <SelectItem key="Auto-detect" textValue="Auto-detect">Auto-detect</SelectItem>
                                                <SelectItem key="English" textValue="English">English</SelectItem>
                                                <SelectItem key="Thai" textValue="Thai">Thai</SelectItem>
                                            </Select>
                                        </div>
                                        <Divider className="bg-slate-100" />

                                        {/* Spoken Language */}
                                        <div className="flex items-center justify-between py-1">
                                            <div className="flex flex-col gap-1 pr-6">
                                                <span className="text-[14px] font-medium text-slate-700">Spoken language</span>
                                                <span className="text-[12px] text-slate-500 leading-snug">For best results, select the language you mainly speak. If it's not listed, it may still be supported via auto-detection.</span>
                                            </div>
                                            <Select
                                                size="sm"
                                                variant="bordered"
                                                selectedKeys={[userSettings.general.spokenLanguage]}
                                                onSelectionChange={(keys) => updateUserSettings("general", { spokenLanguage: Array.from(keys)[0] as string })}
                                                classNames={{
                                                    base: "w-40 flex-shrink-0",
                                                    trigger: "bg-white border-slate-200 shadow-sm rounded-lg hover:border-slate-300 focus-within:!border-violet-600",
                                                    value: "text-[13px] font-medium text-slate-800"
                                                }}
                                            >
                                                <SelectItem key="Auto-detect" textValue="Auto-detect">Auto-detect</SelectItem>
                                                <SelectItem key="English" textValue="English">English</SelectItem>
                                            </Select>
                                        </div>
                                        <Divider className="bg-slate-100" />

                                        {/* Voice */}
                                        <div className="flex items-center justify-between py-1">
                                            <span className="text-[14px] font-medium text-slate-700">Voice</span>
                                            <div className="flex items-center gap-3">
                                                <Button size="sm" variant="bordered" className="bg-white border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 rounded-full h-8 px-4 shadow-sm">
                                                    Play
                                                </Button>
                                                <Select
                                                    size="sm"
                                                    variant="bordered"
                                                    selectedKeys={[userSettings.general.voice]}
                                                    onSelectionChange={(keys) => updateUserSettings("general", { voice: Array.from(keys)[0] as string })}
                                                    classNames={{
                                                        base: "w-32",
                                                        trigger: "bg-white border-slate-200 shadow-sm rounded-lg hover:border-slate-300 focus-within:!border-violet-600",
                                                        value: "text-[13px] font-medium text-slate-800"
                                                    }}
                                                >
                                                    <SelectItem key="Ember" textValue="Ember">Ember</SelectItem>
                                                    <SelectItem key="Breeze" textValue="Breeze">Breeze</SelectItem>
                                                    <SelectItem key="Juniper" textValue="Juniper">Juniper</SelectItem>
                                                </Select>
                                            </div>
                                        </div>

                                    </div>
                                )}

                                {/* Notifications Tab */}
                                {activeTab === "Notifications" && (
                                    <div className="flex flex-col gap-6 w-full max-w-2xl">

                                        {/* Responses */}
                                        <div className="flex items-center justify-between py-1">
                                            <div className="flex flex-col gap-1 pr-6">
                                                <span className="text-[14px] font-medium text-slate-700">Responses</span>
                                                <span className="text-[12px] text-slate-500 leading-snug">Get notified when HSAGIC responds to requests that take time, like research or image generation.</span>
                                            </div>
                                            <Select
                                                size="sm" variant="bordered"
                                                selectedKeys={[userSettings.notifications.responses]}
                                                onSelectionChange={(keys) => updateUserSettings("notifications", { responses: Array.from(keys)[0] as any })}
                                                classNames={{ base: "w-36 flex-shrink-0", trigger: "bg-white border-slate-200 shadow-sm rounded-lg hover:border-slate-300 focus-within:!border-violet-600", value: "text-[13px] font-medium text-slate-800" }}
                                            >
                                                <SelectItem key="Push" textValue="Push">Push</SelectItem>
                                                <SelectItem key="Email" textValue="Email">Email</SelectItem>
                                                <SelectItem key="Push, Email" textValue="Push, Email">Push, Email</SelectItem>
                                                <SelectItem key="Off" textValue="Off">Off</SelectItem>
                                            </Select>
                                        </div>
                                        <Divider className="bg-slate-100" />

                                        {/* Group chats */}
                                        <div className="flex items-center justify-between py-1">
                                            <div className="flex flex-col gap-1 pr-6">
                                                <span className="text-[14px] font-medium text-slate-700">Group chats</span>
                                                <span className="text-[12px] text-slate-500 leading-snug">You'll receive notifications for new messages from group chats.</span>
                                            </div>
                                            <Select
                                                size="sm" variant="bordered"
                                                selectedKeys={[userSettings.notifications.groupChats]}
                                                onSelectionChange={(keys) => updateUserSettings("notifications", { groupChats: Array.from(keys)[0] as any })}
                                                classNames={{ base: "w-36 flex-shrink-0", trigger: "bg-white border-slate-200 shadow-sm rounded-lg hover:border-slate-300 focus-within:!border-violet-600", value: "text-[13px] font-medium text-slate-800" }}
                                            >
                                                <SelectItem key="Push" textValue="Push">Push</SelectItem>
                                                <SelectItem key="Email" textValue="Email">Email</SelectItem>
                                                <SelectItem key="Push, Email" textValue="Push, Email">Push, Email</SelectItem>
                                                <SelectItem key="Off" textValue="Off">Off</SelectItem>
                                            </Select>
                                        </div>
                                        <Divider className="bg-slate-100" />

                                        {/* Tasks */}
                                        <div className="flex items-center justify-between py-1">
                                            <div className="flex flex-col gap-1 pr-6">
                                                <span className="text-[14px] font-medium text-slate-700">Tasks</span>
                                                <span className="text-[12px] text-slate-500 leading-snug">Get notified when tasks you've created have updates.<br /><a href="#" className="underline text-slate-500 hover:text-slate-700">Manage tasks</a></span>
                                            </div>
                                            <Select
                                                size="sm" variant="bordered"
                                                selectedKeys={[userSettings.notifications.tasks]}
                                                onSelectionChange={(keys) => updateUserSettings("notifications", { tasks: Array.from(keys)[0] as any })}
                                                classNames={{ base: "w-36 flex-shrink-0", trigger: "bg-white border-slate-200 shadow-sm rounded-lg hover:border-slate-300 focus-within:!border-violet-600", value: "text-[13px] font-medium text-slate-800" }}
                                            >
                                                <SelectItem key="Push" textValue="Push">Push</SelectItem>
                                                <SelectItem key="Email" textValue="Email">Email</SelectItem>
                                                <SelectItem key="Push, Email" textValue="Push, Email">Push, Email</SelectItem>
                                                <SelectItem key="Off" textValue="Off">Off</SelectItem>
                                            </Select>
                                        </div>
                                        <Divider className="bg-slate-100" />

                                        {/* Projects */}
                                        <div className="flex items-center justify-between py-1">
                                            <div className="flex flex-col gap-1 pr-6">
                                                <span className="text-[14px] font-medium text-slate-700">Projects</span>
                                                <span className="text-[12px] text-slate-500 leading-snug">Get notified when you receive an email invitation to a shared project.</span>
                                            </div>
                                            <Select
                                                size="sm" variant="bordered"
                                                selectedKeys={[userSettings.notifications.projects]}
                                                onSelectionChange={(keys) => updateUserSettings("notifications", { projects: Array.from(keys)[0] as any })}
                                                classNames={{ base: "w-36 flex-shrink-0", trigger: "bg-white border-slate-200 shadow-sm rounded-lg hover:border-slate-300 focus-within:!border-violet-600", value: "text-[13px] font-medium text-slate-800" }}
                                            >
                                                <SelectItem key="Push" textValue="Push">Push</SelectItem>
                                                <SelectItem key="Email" textValue="Email">Email</SelectItem>
                                                <SelectItem key="Push, Email" textValue="Push, Email">Push, Email</SelectItem>
                                                <SelectItem key="Off" textValue="Off">Off</SelectItem>
                                            </Select>
                                        </div>
                                        <Divider className="bg-slate-100" />

                                        {/* Recommendations */}
                                        <div className="flex items-center justify-between py-1">
                                            <div className="flex flex-col gap-1 pr-6">
                                                <span className="text-[14px] font-medium text-slate-700">Recommendations</span>
                                                <span className="text-[12px] text-slate-500 leading-snug">Stay in the loop on new tools, tips, and features from HSAGIC.</span>
                                            </div>
                                            <Select
                                                size="sm" variant="bordered"
                                                selectedKeys={[userSettings.notifications.recommendations]}
                                                onSelectionChange={(keys) => updateUserSettings("notifications", { recommendations: Array.from(keys)[0] as any })}
                                                classNames={{ base: "w-36 flex-shrink-0", trigger: "bg-white border-slate-200 shadow-sm rounded-lg hover:border-slate-300 focus-within:!border-violet-600", value: "text-[13px] font-medium text-slate-800" }}
                                            >
                                                <SelectItem key="Push" textValue="Push">Push</SelectItem>
                                                <SelectItem key="Email" textValue="Email">Email</SelectItem>
                                                <SelectItem key="Push, Email" textValue="Push, Email">Push, Email</SelectItem>
                                                <SelectItem key="Off" textValue="Off">Off</SelectItem>
                                            </Select>
                                        </div>
                                        <Divider className="bg-slate-100" />

                                        {/* Usage */}
                                        <div className="flex items-center justify-between py-1">
                                            <div className="flex flex-col gap-1 pr-6">
                                                <span className="text-[14px] font-medium text-slate-700">Usage</span>
                                                <span className="text-[12px] text-slate-500 leading-snug">We'll notify you when limits reset for features like image creation.</span>
                                            </div>
                                            <Select
                                                size="sm" variant="bordered"
                                                selectedKeys={[userSettings.notifications.usage]}
                                                onSelectionChange={(keys) => updateUserSettings("notifications", { usage: Array.from(keys)[0] as any })}
                                                classNames={{ base: "w-36 flex-shrink-0", trigger: "bg-white border-slate-200 shadow-sm rounded-lg hover:border-slate-300 focus-within:!border-violet-600", value: "text-[13px] font-medium text-slate-800" }}
                                            >
                                                <SelectItem key="Push" textValue="Push">Push</SelectItem>
                                                <SelectItem key="Email" textValue="Email">Email</SelectItem>
                                                <SelectItem key="Push, Email" textValue="Push, Email">Push, Email</SelectItem>
                                                <SelectItem key="Off" textValue="Off">Off</SelectItem>
                                            </Select>
                                        </div>
                                    </div>
                                )}

                                {/* Data Controls Tab */}
                                {activeTab === "Data controls" && (
                                    <div className="flex flex-col gap-6 w-full max-w-2xl">

                                        {/* Improve model for everyone */}
                                        <div className="flex items-center justify-between py-1">
                                            <span className="text-[14px] font-medium text-slate-700">Improve the model for everyone</span>
                                            <Switch
                                                size="sm"
                                                isSelected={userSettings.dataControls.improveModel}
                                                onValueChange={(val) => updateUserSettings("dataControls", { improveModel: val })}
                                                classNames={{
                                                    wrapper: "group-data-[selected=true]:bg-violet-600"
                                                }}
                                            />
                                        </div>
                                        <Divider className="bg-slate-100" />

                                        {/* Shared links */}
                                        <div className="flex items-center justify-between py-1">
                                            <span className="text-[14px] font-medium text-slate-700">Shared links</span>
                                            <Button size="sm" variant="bordered" className="bg-white border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 rounded-full h-8 px-4 shadow-sm">
                                                Manage
                                            </Button>
                                        </div>
                                        <Divider className="bg-slate-100" />

                                        {/* Archived chats */}
                                        <div className="flex items-center justify-between py-1">
                                            <span className="text-[14px] font-medium text-slate-700">Archived chats</span>
                                            <Button size="sm" variant="bordered" className="bg-white border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 rounded-full h-8 px-4 shadow-sm">
                                                Manage
                                            </Button>
                                        </div>
                                        <Divider className="bg-slate-100" />

                                        {/* Archive all chats */}
                                        <div className="flex items-center justify-between py-1">
                                            <span className="text-[14px] font-medium text-slate-700">Archive all chats</span>
                                            <Button size="sm" variant="bordered" className="bg-white border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 rounded-full h-8 px-4 shadow-sm">
                                                Archive all
                                            </Button>
                                        </div>
                                        <Divider className="bg-slate-100" />

                                        {/* Delete all chats */}
                                        <div className="flex items-center justify-between py-1">
                                            <span className="text-[14px] font-medium text-slate-700">Delete all chats</span>
                                            <Button size="sm" variant="bordered" className="bg-white border-red-200 hover:bg-red-50 text-red-600 font-semibold rounded-full h-8 px-4 shadow-sm">
                                                Delete all
                                            </Button>
                                        </div>
                                        <Divider className="bg-slate-100" />

                                        {/* Export data */}
                                        <div className="flex items-center justify-between py-1">
                                            <span className="text-[14px] font-medium text-slate-700">Export data</span>
                                            <Button size="sm" variant="bordered" className="bg-white border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 rounded-full h-8 px-4 shadow-sm">
                                                Export
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Security Tab */}
                                {activeTab === "Security" && (
                                    <div className="flex flex-col gap-6 w-full max-w-2xl">

                                        {/* Password */}
                                        <div className="flex items-center justify-between py-1 hover:bg-slate-50 -mx-4 px-4 rounded-xl cursor-pointer transition-colors group">
                                            <span className="text-[14px] font-medium text-slate-700">Password</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[12px] font-medium text-slate-500 tracking-widest mt-1">******</span>
                                                <span className="text-slate-400 group-hover:text-slate-600">›</span>
                                            </div>
                                        </div>
                                        <Divider className="bg-slate-100" />

                                        {/* Passkeys */}
                                        <div className="flex items-center justify-between py-1 hover:bg-slate-50 -mx-4 px-4 rounded-xl cursor-pointer transition-colors group">
                                            <div className="flex flex-col gap-1 pr-6 pb-2">
                                                <span className="text-[14px] font-medium text-slate-700">Passkeys</span>
                                                <span className="text-[12px] text-slate-500 leading-snug">Passkeys are secure and protect your account with multi-factor authentication. They don't require any extra steps.</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[13px] font-semibold text-slate-600">Add</span>
                                                <span className="text-slate-400 group-hover:text-slate-600">›</span>
                                            </div>
                                        </div>
                                        <Divider className="bg-slate-100" />

                                        {/* MFA Container */}
                                        <div className="pt-2">
                                            <h3 className="text-[15px] font-bold text-slate-900 mb-4">Multi-factor authentication (MFA)</h3>

                                            <Button variant="flat" className="w-full bg-slate-100 hover:bg-slate-200 font-semibold text-slate-800 rounded-xl justify-start px-4 h-12 mb-6">
                                                <HiOutlineUserGroup className="mr-2" size={18} /> Add another method to prevent lockouts
                                            </Button>

                                            <div className="flex flex-col gap-6">
                                                {/* Authenticator app */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col pr-6">
                                                        <span className="text-[14px] font-medium text-slate-700">Authenticator app</span>
                                                        <span className="text-[12px] text-slate-500 leading-snug mt-0.5">Use one-time codes from an authenticator app.</span>
                                                    </div>
                                                    <Switch
                                                        size="sm"
                                                        isSelected={userSettings.security.authenticatorApp}
                                                        onValueChange={(val) => updateUserSettings("security", { authenticatorApp: val })}
                                                        classNames={{ wrapper: "group-data-[selected=true]:bg-violet-600" }}
                                                    />
                                                </div>

                                                {/* Text message */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col pr-6">
                                                        <span className="text-[14px] font-medium text-slate-700">Text message</span>
                                                        <span className="text-[12px] text-slate-500 leading-snug mt-0.5">Get 6-digit verification codes by SMS or WhatsApp based on your country code</span>
                                                    </div>
                                                    <Switch
                                                        size="sm"
                                                        isSelected={userSettings.security.textMessage}
                                                        onValueChange={(val) => updateUserSettings("security", { textMessage: val })}
                                                        classNames={{ wrapper: "group-data-[selected=true]:bg-violet-600" }}
                                                    />
                                                </div>

                                                {/* Trusted Devices */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col pr-6">
                                                        <span className="text-[14px] font-medium text-slate-700">Trusted Devices</span>
                                                        <span className="text-[12px] text-slate-500 leading-snug mt-0.5">When you sign in on another device, it will be added here and can automatically receive device prompts for signing in.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Divider className="bg-slate-100 mt-2" />

                                        {/* Log out of this device */}
                                        <div className="flex items-center justify-between py-1">
                                            <span className="text-[14px] font-medium text-slate-700">Log out of this device</span>
                                            <Button size="sm" variant="bordered" className="bg-white border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 rounded-full h-8 px-4 shadow-sm">
                                                Log out
                                            </Button>
                                        </div>
                                        <Divider className="bg-slate-100" />

                                        {/* Log out of all devices */}
                                        <div className="flex items-center justify-between py-1">
                                            <span className="text-[14px] font-medium text-slate-700">Log out of all devices</span>
                                            <Button size="sm" variant="bordered" className="bg-white border-red-200 hover:bg-red-50 text-red-600 font-semibold rounded-full h-8 px-4 shadow-sm">
                                                Log out all
                                            </Button>
                                        </div>


                                    </div>
                                )}

                                {/* Placeholder for other tabs while building */}
                                {activeTab !== "General" && activeTab !== "Notifications" && activeTab !== "Data controls" && activeTab !== "Security" && (
                                    <div className="flex flex-col gap-6 w-full max-w-2xl py-4">
                                        <p className="text-[14px] text-slate-500">Settings for {activeTab} are coming soon...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </ModalBody>
                )}
            </ModalContent>
        </Modal>
    );
}
