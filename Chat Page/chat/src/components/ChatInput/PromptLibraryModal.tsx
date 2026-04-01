"use client";

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from "@heroui/react";

interface PromptLibraryModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSelectPrompt: (prompt: string) => void;
}

const libraryCategories = [
    "Basic Search",
    "Tariff Calculation",
    "Invoice Parsing",
    "Customs Documentation",
    "Compliance Check"
];

const libraryContent: Record<string, { title: string; description: string; prompts: string[] }> = {
    "Basic Search": {
        title: "Basic HS Code Search",
        description: "Quickly find the standard 6-digit or country-specific 8/10-digit HS codes for general items.",
        prompts: ["Find the HS code for [Product, e.g., smart watches]", "Classify this item: [Detailed Description]", "What is the tariff chapter for [Category]?"]
    },
    "Tariff Calculation": {
        title: "Tariff Calculation",
        description: "Calculate expected import duties, taxes, and fees based on origin, destination, and product value.",
        prompts: ["Calculate import tax for [Product] from [Country A] to [Country B] valued at [$X]", "What are the ad valorem duties for HS Code [XXXX.XX] into the EU?", "List any anti-dumping duties currently active for [Product] imported to [Country]."]
    },
    "Invoice Parsing": {
        title: "Invoice Parsing",
        description: "Extract line items and match them to HS codes automatically from document text.",
        prompts: ["Please parse this list of items into HS codes: [List]", "Extract the commercial description and suggest HS codes from the attached text.", "Identify potential classification risks in this invoice line item: [Item Description]"]
    },
    "Customs Documentation": {
        title: "Customs Documentation",
        description: "Generate drafts for customs declarations, certificates of origin, and compliance forms.",
        prompts: ["Draft a commercial description for customs entry for [Product]", "What forms are needed to clear [Product] through US Customs?", "Generate a template for a Certificate of Origin for [Country]"]
    },
    "Compliance Check": {
        title: "Compliance Check",
        description: "Check items against restricted lists, quota limits, and regulatory body requirements (FDA, EPA, etc).",
        prompts: ["Are there FDA requirements for importing [Product]?", "Check if [Product/HS Code] is bound by any EU import quotas.", "What are the labeling requirements for [Product] in [Country]?"]
    }
};

export default function PromptLibraryModal({ isOpen, onOpenChange, onSelectPrompt }: PromptLibraryModalProps) {
    const [selectedCategory, setSelectedCategory] = useState("Basic Search");

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="3xl"
            placement="center"
            scrollBehavior="inside"
            backdrop="opaque"
            classNames={{
                base: "bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-slate-200/80 max-h-[80vh] md:h-[540px] rounded-2xl mx-4 sm:mx-6 md:mx-auto max-w-[800px]",
                backdrop: "bg-slate-900/40 backdrop-blur-sm",
                header: "border-b border-slate-100/80 bg-white rounded-t-2xl pb-4",
                body: "bg-white p-0 rounded-b-2xl",
                closeButton: "hover:bg-slate-100 active:bg-slate-200 transition-colors z-50 text-slate-400 hover:text-slate-600 top-4 right-4"
            }}
        >
            <ModalContent className="bg-white">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 pt-5 px-6">
                            <h2 className="text-[18px] font-extrabold text-slate-900 leading-tight tracking-tight">Prompt Library</h2>
                            <p className="text-[13px] font-medium text-slate-500 mt-0.5">
                                Browse predefined templates to get the most accurate logistics answers.
                            </p>
                        </ModalHeader>
                        <ModalBody className="flex flex-row">
                            {/* Left Sidebar */}
                            <div className="w-[200px] border-r border-slate-100/80 bg-slate-50/30 p-4 flex flex-col gap-0.5 overflow-y-auto hidden sm:flex">
                                {libraryCategories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`flex items-center text-left px-3 py-2.5 rounded-[10px] text-[12.5px] font-bold transition-all duration-200 ${selectedCategory === cat ? 'bg-white shadow-[0_1px_3px_rgb(0,0,0,0.04)] border border-slate-200/80 text-violet-700' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/60 border border-transparent'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            {/* Right Content */}
                            <div className="flex-1 p-5 md:p-6 overflow-y-auto">
                                {/* Mobile category select */}
                                <div className="sm:hidden mb-6 flex flex-col gap-1.5">
                                    <span className="text-[12px] font-bold text-slate-400 uppercase">Category</span>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg h-10 px-3 text-[14px] text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500"
                                    >
                                        {libraryCategories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                {libraryContent[selectedCategory] ? (
                                    <div className="flex flex-col gap-6 animate-fade-in pb-4">
                                        <div>
                                            <h3 className="text-[16px] font-bold text-slate-800 mb-1.5">{libraryContent[selectedCategory].title}</h3>
                                            <p className="text-[13px] text-slate-500 font-medium leading-relaxed max-w-[95%]">
                                                {libraryContent[selectedCategory].description}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-2.5">
                                            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-0.5">Templates</h4>
                                            {libraryContent[selectedCategory].prompts.map((prompt, idx) => (
                                                <div key={idx} className="group relative bg-white border border-slate-200/80 rounded-[12px] p-3.5 hover:border-violet-300/80 hover:bg-violet-50/30 hover:shadow-[0_2px_8px_rgba(124,58,237,0.04)] transition-all duration-300">
                                                    <p className="text-[13.5px] text-slate-700 font-medium sm:pr-24 leading-relaxed">{prompt}</p>
                                                    <Button
                                                        size="sm"
                                                        color="primary"
                                                        variant="flat"
                                                        className="mt-3 sm:mt-0 sm:absolute sm:right-3 sm:top-1/2 sm:-translate-y-1/2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 font-bold text-[12px] bg-white border border-slate-200 shadow-[0_1px_2px_rgb(0,0,0,0.02)] text-violet-600 hover:border-violet-200 hover:bg-violet-50 w-full sm:w-auto h-8 px-3 rounded-[8px]"
                                                        onPress={() => {
                                                            onSelectPrompt(prompt);
                                                            onClose();
                                                        }}
                                                    >
                                                        Use Prompt
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                        <p>Select a category to view prompts.</p>
                                    </div>
                                )}
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
