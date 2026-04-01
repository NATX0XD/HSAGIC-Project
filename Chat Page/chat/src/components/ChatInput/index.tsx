"use client";

import React, { useState, useRef } from "react";
import {
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Textarea,
    useDisclosure
} from "@heroui/react";
import {
    HiOutlinePaperClip,
    HiOutlinePaperAirplane,
    HiOutlineCog6Tooth,
    HiOutlineBookOpen,
    HiOutlinePhoto,
    HiOutlineChevronDown,
    HiOutlineXMark
} from "react-icons/hi2";
import { TbWand } from "react-icons/tb";
import SettingsPopover from "./SettingsPopover";
import PromptLibraryModal from "./PromptLibraryModal";

const randomPrompts = [
    "What is the HS code for lithium-ion batteries?",
    "Calculate import tax for electronics to the EU.",
    "How to classify mixed auto parts?",
    "Explain the customs procedure for returning defective goods.",
    "What are the documentation requirements for exporting textiles?",
    "Determine the origin criteria for a manufactured good under USMCA.",
];

const models = [
    { key: "gpt4", label: "GPT-4", icon: "" },
    { key: "claude", label: "Claude 3", icon: "" },
    { key: "gemini", label: "Gemini Pro", icon: "" },
    { key: "hsagic", label: "HSAGIC Pro", icon: "" },
];

export default function ChatInput({
    onSend,
    variant = "default"
}: {
    onSend?: (msg: string, attachmentUrl?: string) => void,
    variant?: "default" | "compact"
}) {
    const [message, setMessage] = useState("");
    const [selectedModel, setSelectedModel] = useState("hsagic");

    // Attachment state
    const [attachment, setAttachment] = useState<File | null>(null);
    const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Settings state
    const [outputLang, setOutputLang] = useState(new Set(["English"]));
    const [detailLevel, setDetailLevel] = useState(new Set(["Detailed"]));
    const [includeHistory, setIncludeHistory] = useState(true);

    // Prompt Library state
    const { isOpen: isLibraryOpen, onOpen: onLibraryOpen, onOpenChange: onLibraryOpenChange } = useDisclosure();

    const currentModel = models.find((m) => m.key === selectedModel) || models[3];

    const handleRandomPrompt = () => {
        // eslint-disable-next-line react-hooks/purity
        const randomIndex = Math.floor(Math.random() * randomPrompts.length);
        handleSelectPrompt(randomPrompts[randomIndex]);
    };

    const handleSelectPrompt = (prompt: string) => {
        setMessage(prompt);
        if (textareaRef.current) {
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.style.height = "auto";
                    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
                    textareaRef.current.focus();
                }
            }, 0);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAttachment(file);
            setAttachmentUrl(URL.createObjectURL(file));
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset input so same file can be selected again if removed
        }
    };

    const handleRemoveAttachment = () => {
        if (attachmentUrl) URL.revokeObjectURL(attachmentUrl);
        setAttachment(null);
        setAttachmentUrl(null);
    };

    const handleSubmit = () => {
        if (!message.trim() && !attachmentUrl) return; // Allow sending just an image or just text
        onSend?.(message, attachmentUrl || undefined);
        setMessage("");
        setAttachment(null);
        setAttachmentUrl(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };



    return (
        <div className={`w-full max-w-[700px] mx-auto animate-slide-in-up ${variant === "compact" ? "" : "bg-slate-50/50 border border-slate-200/50 rounded-[28px] p-2.5 shadow-[0_2px_12px_rgb(0,0,0,0.02)]"}`} style={{ animationDelay: "0.2s" }}>

            {/* Header Row (Hidden in compact variant) */}
            {variant !== "compact" && (
                <div className="flex items-center justify-between px-3 py-1.5 mb-2.5">
                    <div className="flex items-center gap-2.5 text-[14px] font-semibold text-slate-800">
                        <TbWand size={18} className="text-violet-500" />
                        <span>Start new chat</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Model Selector */}
                        <Dropdown classNames={{ content: "bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-slate-200 rounded-2xl" }}>
                            <DropdownTrigger>
                                <button
                                    className="flex items-center gap-1.5 bg-white text-slate-700 hover:bg-slate-50 rounded-[14px] font-semibold text-[13px] h-[38px] px-3.5 border border-slate-200/80 shadow-[0_1px_2px_rgb(0,0,0,0.02)] transition-colors"
                                >
                                    <div className="flex flex-col items-center justify-center -space-y-0.5">
                                        <span className="text-[14px] leading-none">{currentModel.icon}</span>
                                        <HiOutlineChevronDown size={11} className="text-slate-400 font-bold" />
                                    </div>
                                    <span className="text-[14px] font-bold">{currentModel.label}</span>
                                </button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Select AI Model"
                                selectionMode="single"
                                selectedKeys={new Set([selectedModel])}
                                onSelectionChange={(keys) => {
                                    const selected = Array.from(keys)[0] as string;
                                    if (selected) setSelectedModel(selected);
                                }}
                                classNames={{ base: "min-w-[150px]" }}
                                itemClasses={{ base: "outline-none data-[focus-visible=true]:outline-none data-[focus-visible=true]:ring-0 data-[focus-visible=true]:ring-offset-0" }}
                            >
                                {models.map((model) => (
                                    <DropdownItem
                                        key={model.key}
                                        startContent={<span className="text-lg opacity-70">{model.icon}</span>}
                                        className="font-medium text-[13px]"
                                        color="secondary"
                                    >
                                        {model.label}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>

                        {/* Settings Icon */}
                        <SettingsPopover
                            outputLang={outputLang}
                            setOutputLang={setOutputLang}
                            detailLevel={detailLevel}
                            setDetailLevel={setDetailLevel}
                            includeHistory={includeHistory}
                            setIncludeHistory={setIncludeHistory}
                        />
                    </div>
                </div>
            )}

            {/* Inner White Card */}
            <div className={`bg-white border rounded-[20px] flex flex-col pt-1 ${variant === "compact" ? "border-slate-300 shadow-[0_4px_24px_rgb(0,0,0,0.06)]" : "border-slate-200/60 shadow-[0_2px_8px_rgb(0,0,0,0.02)]"}`}>

                {/* Attachment Preview Area */}
                {attachmentUrl && (
                    <div className="px-4 pt-3 pb-1 flex">
                        <div className="relative group">
                            <img
                                src={attachmentUrl}
                                alt="Attachment Preview"
                                className="h-16 w-16 object-cover rounded-xl border border-slate-200 shadow-sm"
                            />
                            <button
                                onClick={handleRemoveAttachment}
                                className="absolute -top-2 -right-2 bg-white text-slate-500 hover:text-red-500 rounded-full p-1 shadow-md border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <HiOutlineXMark size={12} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Textarea Area */}
                <div className="relative px-3 pt-2">
                    <Textarea
                        ref={textareaRef}
                        value={message}
                        onValueChange={(val) => {
                            setMessage(val);
                            if (textareaRef.current) {
                                textareaRef.current.style.height = "auto";
                                textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
                            }
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Add prompt instructions"
                        minRows={1}
                        maxRows={6}
                        variant="flat"
                        classNames={{
                            inputWrapper: "bg-transparent hover:!bg-transparent data-[focus=true]:!bg-transparent group-data-[focus=true]:!bg-transparent !shadow-none !border-0 !outline-none data-[focus=true]:!outline-none px-2 py-0 !min-h-0 focus-within:!ring-0 focus-within:!ring-offset-0 ring-0",
                            input: "text-[14px] font-medium text-slate-800 placeholder:text-slate-400 leading-relaxed min-h-[44px] resize-none outline-none focus:outline-none focus:ring-0",
                        }}
                    />
                    {/* Floating clear/wand icon on the right like reference */}
                    <button className="absolute top-2 right-4 flex items-center justify-center text-slate-400 hover:text-violet-600 rounded-[10px] h-8 w-8 min-w-8 transition-colors">
                        <TbWand size={16} className="-rotate-90" />
                    </button>
                </div>

                {/* Bottom Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3.5 py-2.5 border-t border-slate-100/80 gap-3 sm:gap-0">
                    <div className="flex items-center gap-1.5 w-full sm:w-auto">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,.pdf,.xlsx,.xls,.csv,.doc,.docx"
                            className="hidden"
                            onChange={handleFileSelect}
                        />

                        {/* Tools Area mimicking the slider functionality spot */}
                        <div className="flex items-center gap-1 w-full justify-between sm:justify-start">
                            <div className="flex items-center gap-3">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] pl-1">TOOLS</span>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center justify-center text-slate-400 hover:text-violet-600 hover:bg-violet-50 h-[30px] w-[30px] min-w-[30px] rounded-[8px] transition-colors"
                                    >
                                        <HiOutlinePaperClip size={16} className="-rotate-45" />
                                    </button>
                                    <button
                                        className="flex items-center justify-center text-slate-400 hover:text-violet-600 hover:bg-violet-50 h-[30px] w-[30px] min-w-[30px] rounded-[8px] transition-colors"
                                    >
                                        <HiOutlinePhoto size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="sm:hidden block h-px w-full bg-slate-100 mx-3"></div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 ml-auto">
                        {/* Random */}
                        <button
                            onClick={handleRandomPrompt}
                            className={`flex ${variant === "compact" ? "flex-row h-10 w-10 min-w-[40px] rounded-[10px]" : "flex-col h-11 min-w-[64px] px-2.5 rounded-[10px]"} items-center justify-center gap-1 bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-[0_1px_2px_rgb(0,0,0,0.01)] transition-all duration-200`}
                        >
                            <TbWand size={16} className={variant !== "compact" ? "text-slate-500 -rotate-90" : "text-slate-500"} />
                            {variant !== "compact" && <span className="font-bold text-[11px] leading-none">Random</span>}
                        </button>

                        {/* Prompt Library */}
                        <button
                            onClick={onLibraryOpen}
                            className={`flex ${variant === "compact" ? "flex-row h-10 w-10 min-w-[40px] rounded-[10px]" : "flex-col h-11 px-2.5 rounded-[10px]"} items-center justify-center gap-1 bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-[0_1px_2px_rgb(0,0,0,0.01)] transition-all duration-200`}
                        >
                            <HiOutlineBookOpen size={16} className="text-slate-500" />
                            {variant !== "compact" && <span className="font-bold text-[11px] leading-none">Library</span>}
                        </button>

                        {/* Send Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={!message.trim()}
                            className={`transition-all duration-300 flex items-center justify-center ml-1.5 ${variant === "compact" ? "h-10 w-10 min-w-[40px] rounded-[10px]" : "h-11 w-11 min-w-[44px] rounded-[10px]"} ${message.trim()
                                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_4px_14px_0_rgba(124,58,237,0.39)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.23)] hover:-translate-y-0.5 active:scale-95 border-0"
                                : "bg-white text-slate-300 shadow-[0_1px_2px_rgb(0,0,0,0.01)] border border-slate-200/80"
                                }`}
                        >
                            <HiOutlinePaperAirplane size={18} className="translate-x-[1px]" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Prompt Library Modal */}
            <PromptLibraryModal
                isOpen={isLibraryOpen}
                onOpenChange={onLibraryOpenChange}
                onSelectPrompt={handleSelectPrompt}
            />
        </div>
    );
}
