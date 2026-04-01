"use client";

import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Avatar } from "@heroui/react";
import { HiOutlineCamera } from "react-icons/hi2";
import { UserProfile } from "@/store/chatStore";

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    userProfile: UserProfile;
    onSave: (profile: Partial<UserProfile>) => void;
}

export function ProfileModal({ isOpen, onClose, userProfile, onSave }: ProfileModalProps) {
    const [displayName, setDisplayName] = useState(userProfile.displayName || "");
    const [username, setUsername] = useState(userProfile.username || "");

    useEffect(() => {
        if (isOpen) {
            // Sync with current store state when opened
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDisplayName(userProfile.displayName);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUsername(userProfile.username);
        }
    }, [isOpen, userProfile.displayName, userProfile.username]);

    const handleSave = () => {
        if (displayName.trim() && username.trim()) {
            onSave({
                displayName: displayName.trim(),
                username: username.trim()
            });
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} size="sm" classNames={{
            base: "bg-white text-slate-900 border border-slate-100 shadow-xl rounded-2xl",
            header: "border-b-0 pb-0 pt-5 px-6",
            body: "py-4 px-6",
            footer: "border-t-0 py-4 px-6",
            closeButton: "hover:bg-slate-100 active:bg-slate-200 text-slate-400"
        }}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-[18px] font-semibold text-slate-900">
                            Edit profile
                        </ModalHeader>
                        <ModalBody className="flex flex-col items-center">

                            {/* Avatar Section */}
                            <div className="relative mt-2 mb-6 cursor-pointer group">
                                <Avatar
                                    name={displayName.charAt(0).toUpperCase()}
                                    className="w-24 h-24 text-2xl bg-[#7c8fb5] text-white"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full border border-slate-200 shadow-sm text-slate-500 group-hover:bg-slate-50 transition-colors">
                                    <HiOutlineCamera size={16} />
                                </div>
                            </div>

                            {/* Inputs */}
                            <div className="w-full space-y-4">
                                <Input
                                    label="Display name"
                                    labelPlacement="outside"
                                    placeholder="Enter your name"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    classNames={{
                                        label: "text-[13px] font-semibold text-slate-700 mb-1",
                                        input: "text-[14px] text-slate-900 placeholder:text-slate-400",
                                        inputWrapper: "bg-white border border-slate-200 hover:border-slate-300 focus-within:!border-violet-600 group-data-[focus=true]:border-violet-600 rounded-xl shadow-sm transition-colors",
                                    }}
                                />
                                <Input
                                    label="Username"
                                    labelPlacement="outside"
                                    placeholder="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    classNames={{
                                        label: "text-[13px] font-semibold text-slate-700 mb-1",
                                        input: "text-[14px] text-slate-900 placeholder:text-slate-400",
                                        inputWrapper: "bg-white border border-slate-200 hover:border-slate-300 focus-within:!border-violet-600 group-data-[focus=true]:border-violet-600 rounded-xl shadow-sm transition-colors",
                                    }}
                                />
                            </div>

                            <p className="text-[12px] text-slate-500 text-center mt-6 leading-relaxed px-2">
                                Your profile helps people recognize you. Your name and username are also used in the HSAGIC app.
                            </p>

                        </ModalBody>
                        <ModalFooter className="flex justify-end gap-2 mt-2">
                            <Button
                                variant="flat"
                                onPress={onClose}
                                className="font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full px-5"
                            >
                                Cancel
                            </Button>
                            <Button
                                onPress={handleSave}
                                isDisabled={!displayName.trim() || !username.trim()}
                                className="font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full px-6"
                            >
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
