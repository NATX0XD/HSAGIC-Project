"use client";

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    isDanger?: boolean;
}

export function ConfirmModal({
    isOpen,
    onClose,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    isDanger = false,
}: ConfirmModalProps) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} size="sm">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-[18px] font-semibold text-slate-800">
                            {title}
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-[14px] text-slate-500">
                                {description}
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose} className="font-medium text-slate-600">
                                {cancelText}
                            </Button>
                            <Button
                                color={isDanger ? "danger" : "primary"}
                                onPress={() => {
                                    onConfirm();
                                    onClose();
                                }}
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
