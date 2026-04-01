import React, { useState } from "react";
import { Card, CardBody, Skeleton, Modal, ModalContent, useDisclosure, Button } from "@heroui/react";
import { HiOutlineDocumentText, HiOutlineXMark } from "react-icons/hi2";
import { TbFileSpreadsheet, TbFileZip } from "react-icons/tb";
import { MediaItem } from "@/hooks/useMedia";

interface MediaGridProps {
    items: MediaItem[];
    isLoading: boolean;
    emptyIcon?: React.ReactNode;
    emptyTitle?: string;
    emptyMessage?: string;
}

export default function MediaGrid({
    items,
    isLoading,
    emptyIcon = <HiOutlineDocumentText size={32} />,
    emptyTitle = "No items found",
    emptyMessage = "We couldn't find any items to display here."
}: MediaGridProps) {
    const { isOpen: isImageOpen, onOpen: onImageOpen, onClose: onImageClose } = useDisclosure();
    const { isOpen: isDocOpen, onOpen: onDocOpen, onClose: onDocClose } = useDisclosure();

    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

    const getDocumentIcon = (type: string) => {
        switch (type) {
            case "pdf": return <HiOutlineDocumentText className="text-blue-500" size={28} />;
            case "spreadsheet": return <TbFileSpreadsheet className="text-green-500" size={28} />;
            case "archive": return <TbFileZip className="text-orange-500" size={28} />;
            default: return <HiOutlineDocumentText className="text-slate-500" size={28} />;
        }
    };

    const handleItemClick = (item: MediaItem) => {
        setSelectedItem(item);
        if (item.type === "image" && item.previewUrl) {
            onImageOpen();
        } else {
            // For now, documents just show a placeholder modal since we don't have real PDFs to render in iframe
            onDocOpen();
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-8">
                {isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                        <Card key={i} shadow="none" classNames={{ base: "rounded-[24px] border border-slate-100" }}>
                            <CardBody className="p-4 flex flex-row items-center gap-4">
                                <Skeleton className="rounded-xl w-14 h-14" />
                                <div className="flex-grow space-y-2">
                                    <Skeleton className="h-4 w-3/4 rounded-lg" />
                                    <Skeleton className="h-3 w-1/2 rounded-lg" />
                                </div>
                            </CardBody>
                        </Card>
                    ))
                ) : items.length > 0 ? (
                    items.map((item) => (
                        <Card
                            key={item.id}
                            isPressable
                            onPress={() => handleItemClick(item)}
                            shadow="none"
                            classNames={{ base: "rounded-[24px] border border-slate-200/80 bg-white hover:border-violet-300 hover:shadow-[0_8px_30px_rgba(124,58,237,0.08)] transition-all duration-300 group hover:-translate-y-1" }}
                        >
                            <CardBody className="p-4 flex flex-row items-center gap-4 cursor-pointer overflow-hidden">
                                <div className="h-14 w-14 min-w-[56px] rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden relative group-hover:bg-violet-50 group-hover:border-violet-100 transition-colors shadow-sm">
                                    {item.type === "image" && item.previewUrl ? (
                                        <img src={item.previewUrl} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        getDocumentIcon(item.type)
                                    )}
                                </div>
                                <div className="flex flex-col flex-grow min-w-0 text-left">
                                    <p className="text-sm font-semibold text-slate-800 truncate" title={item.name}>{item.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[11px] font-medium text-slate-500">{item.date}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span className="text-[11px] font-medium text-slate-500">{item.size}</span>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                        <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
                            {emptyIcon}
                        </div>
                        <h3 className="text-lg font-bold text-slate-700">{emptyTitle}</h3>
                        <p className="text-sm font-medium text-slate-500 mt-1 max-w-sm">
                            {emptyMessage}
                        </p>
                    </div>
                )}
            </div>

            {/* Image Zoom Modal */}
            <Modal isOpen={isImageOpen} onClose={onImageClose} size="4xl" classNames={{ base: "bg-transparent shadow-none", backdrop: "bg-black/80 backdrop-blur-sm" }}>
                <ModalContent>
                    {(onClose) => (
                        <div className="relative flex items-center justify-center min-h-[50vh]">
                            <Button
                                isIconOnly
                                radius="full"
                                size="sm"
                                variant="flat"
                                onPress={onClose}
                                className="absolute top-0 right-0 z-50 bg-black/50 text-white hover:bg-black/70 backdrop-blur-md"
                            >
                                <HiOutlineXMark size={20} />
                            </Button>
                            {selectedItem?.previewUrl && (
                                <img
                                    src={selectedItem.previewUrl}
                                    alt={selectedItem.name}
                                    className="max-w-full max-h-[85vh] object-contain rounded-xl"
                                />
                            )}
                        </div>
                    )}
                </ModalContent>
            </Modal>

            {/* Document Preview Modal (Mockup) */}
            <Modal isOpen={isDocOpen} onClose={onDocClose} size="2xl" classNames={{ base: "bg-white", backdrop: "bg-slate-900/40 backdrop-blur-sm" }}>
                <ModalContent>
                    {(onClose) => (
                        <div className="p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
                            <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                                {selectedItem && getDocumentIcon(selectedItem.type)}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{selectedItem?.name}</h3>
                            <p className="text-sm text-slate-500 mb-6">
                                {selectedItem?.size} • Uploaded on {selectedItem?.date}
                            </p>
                            <div className="flex gap-3">
                                <Button color="secondary" variant="flat" onPress={onClose}>
                                    Close Preview
                                </Button>
                                <Button color="secondary" className="shadow-sm">
                                    Download File
                                </Button>
                            </div>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
