"use client";

import React, { useState, useRef } from "react";
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Input,
    Textarea
} from "@heroui/react";
import { HiOutlineBugAnt, HiOutlineBars3, HiOutlinePaperClip, HiXMark, HiPencilSquare } from "react-icons/hi2";

import { useTopbar } from "@/contexts/TopbarContext";

interface TopbarProps {
    onMenuToggle: () => void;
}

export default function Topbar({ onMenuToggle }: TopbarProps) {
    const { title, subtitle, isEditable, setTitle, onTitleChange } = useTopbar();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [titleInput, setTitleInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string>("");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editTitleValue, setEditTitleValue] = useState(title);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync local state when prop changes
    React.useEffect(() => {
        setEditTitleValue(title);
    }, [title]);

    const handleTitleClick = () => {
        if (!isEditable) return;
        setIsEditingTitle(true);
        setTimeout(() => {
            titleInputRef.current?.focus();
            titleInputRef.current?.select();
        }, 0);
    };

    const handleTitleBlur = () => {
        setIsEditingTitle(false);
        if (editTitleValue.trim() !== title && editTitleValue.trim() !== "") {
            const newTitle = editTitleValue.trim();
            setTitle(newTitle);
            if (onTitleChange) {
                onTitleChange(newTitle);
            }
        } else {
            setEditTitleValue(title); // Revert if empty
        }
    };

    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            titleInputRef.current?.blur();
        } else if (e.key === "Escape") {
            setEditTitleValue(title);
            setIsEditingTitle(false);
        }
    };

    // ... existing bug report handlers
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFileError("");
        if (file) {
            if (!file.type.startsWith("image/")) {
                setFileError("Please upload an image file.");
                setSelectedFile(null);
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setFileError("File size exceeds 5MB limit.");
                setSelectedFile(null);
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setFileError("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmitBug = (onClose: () => void) => {
        // Logic to submit the bug report would go here
        console.log("Bug Reported:", { title: titleInput, description: descriptionInput, file: selectedFile });

        // Reset and close
        setTitleInput("");
        setDescriptionInput("");
        handleRemoveFile();
        onClose();
    };

    return (
        <>
            <header className="sticky top-0 z-30 flex items-start justify-between bg-white px-6 pt-6 pb-4 lg:px-8 rounded-t-[20px]">
                {/* Left: Mobile menu + Title */}
                <div className="flex items-start gap-4 flex-1">
                    <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        onPress={onMenuToggle}
                        className="text-slate-500 hover:bg-slate-100 hover:text-slate-900 h-9 w-9 min-w-9 rounded-lg lg:hidden transition-colors mt-1"
                        aria-label="Toggle menu"
                    >
                        <HiOutlineBars3 size={24} />
                    </Button>
                    <div className="flex flex-col flex-1 pl-3 min-w-0 pr-2 overflow-hidden justify-center relative">
                        {isEditingTitle ? (
                            <input
                                ref={titleInputRef}
                                type="text"
                                className="font-semibold text-slate-800 text-[15px] sm:text-[17px] bg-transparent outline-none w-full leading-tight h-[22px]"
                                value={editTitleValue}
                                onChange={(e) => setEditTitleValue(e.target.value)}
                                onBlur={handleTitleBlur}
                                onKeyDown={handleTitleKeyDown}
                            />
                        ) : (
                            <div
                                className={`flex items-center gap-2 -ml-1.5 px-1.5 rounded-md transition-colors ${isEditable ? 'cursor-text hover:bg-slate-100 group' : ''}`}
                                onClick={handleTitleClick}
                            >
                                <span className={`font-semibold text-slate-800 text-[15px] sm:text-[17px] truncate leading-tight flex-shrink`} title={title}>
                                    {title}
                                </span>
                                {isEditable && (
                                    <HiPencilSquare className="text-slate-400 group-hover:text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" size={14} />
                                )}
                            </div>
                        )}
                        <span className="text-[12px] sm:text-sm text-slate-500 truncate leading-tight">
                            {subtitle}
                        </span>
                    </div>
                </div>

                {/* Right: Report Bug */}
                <button
                    onClick={onOpen}
                    className="flex items-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl text-[13px] font-medium h-9 px-3 shadow-[0_2px_8px_rgb(0,0,0,0.02)] transition-all duration-200 active:scale-95"
                >
                    <HiOutlineBugAnt size={14} className="text-slate-400" />
                    Report Bug
                </button>
            </header>

            {/* Report Bug Modal */}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
                backdrop="opaque"
                classNames={{
                    base: "bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200 rounded-2xl",
                    backdrop: "bg-slate-900/60 backdrop-blur-md",
                    header: "border-b border-slate-100 pb-3 pt-5 px-6 bg-white rounded-t-2xl",
                    body: "py-5 px-6 bg-white",
                    footer: "border-t border-slate-100 py-4 px-6 bg-white rounded-b-2xl",
                    closeButton: "hover:bg-slate-100 active:bg-slate-200 transition-colors z-50 text-slate-500 top-4 right-4"
                }}
            >
                <ModalContent className="bg-white">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <h2 className="text-lg font-bold text-slate-900 leading-tight">Report an Issue</h2>
                                <p className="text-[13px] font-normal text-slate-500">
                                    Describe the bug you encountered. We appreciate your feedback!
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-6 w-full pt-2 pb-4">
                                    <div className="flex flex-col gap-2 shrink-0">
                                        <div className="text-[13px] font-semibold text-slate-700 px-1">Issue Title</div>
                                        <Input
                                            placeholder="E.g., Chat input is unclickable"
                                            variant="bordered"
                                            value={titleInput}
                                            onValueChange={setTitleInput}
                                            classNames={{
                                                input: "text-[14px] text-slate-900",
                                                inputWrapper: "border-slate-200 hover:border-violet-300 focus-within:!border-violet-500 shadow-sm"
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 shrink-0">
                                        <div className="text-[13px] font-semibold text-slate-700 px-1">Description</div>
                                        <textarea
                                            placeholder="Please provide steps to reproduce the issue..."
                                            rows={4}
                                            value={descriptionInput}
                                            onChange={(e) => setDescriptionInput(e.target.value)}
                                            className="w-full rounded-[12px] border border-slate-200 bg-white px-3 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 hover:border-violet-300 shadow-sm transition-all resize-none leading-relaxed"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 shrink-0">
                                        <span className="text-[13px] font-semibold text-slate-700">Attach Screenshot (Max 5MB)</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                        />

                                        {!selectedFile ? (
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className={`flex items-center justify-center gap-2 w-full h-12 rounded-[12px] border-2 border-dashed transition-all duration-200 ${fileError ? "border-danger-200 bg-danger-50 text-danger-500 hover:border-danger-300" : "border-slate-200 bg-slate-50 text-slate-500 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 cursor-pointer"
                                                    }`}
                                            >
                                                <HiOutlinePaperClip size={18} className="-rotate-45" />
                                                <span className="text-[14px] font-medium">Click to upload image</span>
                                            </button>
                                        ) : (
                                            <div className="flex items-center justify-between p-3 rounded-[12px] border border-violet-200 bg-violet-50">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="h-8 w-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center shrink-0">
                                                        <HiOutlinePaperClip size={16} />
                                                    </div>
                                                    <div className="flex flex-col truncate">
                                                        <span className="text-[13px] font-semibold text-violet-900 truncate">
                                                            {selectedFile.name}
                                                        </span>
                                                        <span className="text-[11px] text-violet-500">
                                                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={handleRemoveFile}
                                                    className="p-1.5 text-violet-400 hover:text-violet-700 hover:bg-violet-100 rounded-md transition-colors"
                                                >
                                                    <HiXMark size={16} />
                                                </button>
                                            </div>
                                        )}
                                        {fileError && (
                                            <p className="text-[12px] text-danger-500 font-medium mt-1">{fileError}</p>
                                        )}
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    variant="flat"
                                    onPress={onClose}
                                    className="font-medium text-[14px]"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={() => handleSubmitBug(onClose)}
                                    isDisabled={!titleInput.trim() || !descriptionInput.trim()}
                                    className="bg-violet-600 hover:bg-violet-700 text-white font-medium shadow-md text-[14px]"
                                >
                                    Submit Report
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
