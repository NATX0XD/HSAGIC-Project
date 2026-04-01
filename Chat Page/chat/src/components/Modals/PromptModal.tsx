"use client";

import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";

interface PromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    initialValue?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: (value: string) => void;
}

export function PromptModal({
    isOpen,
    onClose,
    title,
    description,
    initialValue = "",
    confirmText = "Save",
    cancelText = "Cancel",
    onConfirm,
}: PromptModalProps) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setValue(initialValue);
        }
    }, [isOpen, initialValue]);

    const handleSubmit = () => {
        if (value.trim()) {
            onConfirm(value.trim());
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} size="md">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-[18px] font-semibold text-slate-800">
                            {title}
                        </ModalHeader>
                        <ModalBody>
                            {description && (
                                <p className="text-[14px] text-slate-500 mb-2">
                                    {description}
                                </p>
                            )}
                            <Input
                                autoFocus
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSubmit();
                                    }
                                }}
                                classNames={{
                                    input: "text-[15px] font-medium text-slate-700",
                                    inputWrapper: "bg-slate-100/50 border border-slate-200 hover:border-slate-300 focus-within:!border-violet-500 rounded-xl transition-all",
                                }}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose} className="font-medium text-slate-600">
                                {cancelText}
                            </Button>
                            <Button
                                color="primary"
                                onPress={handleSubmit}
                                isDisabled={!value.trim()}
                                className="font-medium"
                            >
                                {confirmText}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
