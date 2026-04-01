"use client";

import React from "react";
import { Popover, PopoverTrigger, PopoverContent, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Switch } from "@heroui/react";
import { HiOutlineCog6Tooth, HiLanguage, HiOutlineDocumentText, HiOutlineClock, HiOutlineChevronDown } from "react-icons/hi2";

interface SettingsPopoverProps {
    outputLang: Set<string>;
    setOutputLang: (keys: Set<string>) => void;
    detailLevel: Set<string>;
    setDetailLevel: (keys: Set<string>) => void;
    includeHistory: boolean;
    setIncludeHistory: (val: boolean) => void;
}

export default function SettingsPopover({
    outputLang,
    setOutputLang,
    detailLevel,
    setDetailLevel,
    includeHistory,
    setIncludeHistory
}: SettingsPopoverProps) {
    return (
        <Popover placement="bottom-end" showArrow offset={8} classNames={{ base: "bg-white py-2 px-1 w-[260px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200 rounded-2xl", content: "bg-white" }}>
            <PopoverTrigger>
                <button
                    className="flex items-center justify-center bg-white border border-slate-200/80 shadow-[0_1px_2px_rgb(0,0,0,0.02)] text-slate-400 hover:text-slate-700 hover:bg-slate-50 h-[38px] w-[38px] min-w-[38px] rounded-[12px] transition-colors"
                >
                    <HiOutlineCog6Tooth size={18} />
                </button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-2 py-3 w-full flex flex-col gap-6">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                        <div className="bg-violet-100 text-violet-600 p-1.5 rounded-lg">
                            <HiOutlineCog6Tooth size={16} />
                        </div>
                        <h3 className="text-[14px] font-bold text-slate-800">Chat Settings</h3>
                    </div>

                    <div className="flex flex-col gap-4">
                        {/* Language */}
                        <div className="flex items-center justify-between relative group">
                            <span className="text-[13px] font-medium text-slate-600 flex items-center gap-2">
                                <HiLanguage size={16} className="text-slate-400" /> Language
                            </span>
                            <Dropdown classNames={{ content: "min-w-[120px] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-slate-200 rounded-2xl" }}>
                                <DropdownTrigger>
                                    <button className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-700 bg-slate-50 border border-slate-200/60 hover:bg-slate-100 px-3 py-1.5 rounded-[10px] transition-colors outline-none focus:outline-none">
                                        {Array.from(outputLang)[0]}
                                        <HiOutlineChevronDown size={12} className="text-slate-400 group-hover:text-slate-600" />
                                    </button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    selectionMode="single"
                                    selectedKeys={outputLang}
                                    onSelectionChange={(keys) => setOutputLang(keys as Set<string>)}
                                    itemClasses={{ base: "outline-none data-[focus-visible=true]:outline-none" }}
                                >
                                    <DropdownItem key="English" className="font-medium text-[13px]">English</DropdownItem>
                                    <DropdownItem key="Thai" className="font-medium text-[13px]">Thai</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>

                        {/* Detail Level */}
                        <div className="flex items-center justify-between relative group">
                            <span className="text-[13px] font-medium text-slate-600 flex items-center gap-2">
                                <HiOutlineDocumentText size={16} className="text-slate-400" /> Level
                            </span>
                            <Dropdown classNames={{ content: "min-w-[140px] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-slate-200 rounded-2xl" }}>
                                <DropdownTrigger>
                                    <button className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-700 bg-slate-50 border border-slate-200/60 hover:bg-slate-100 px-3 py-1.5 rounded-[10px] transition-colors outline-none focus:outline-none">
                                        {Array.from(detailLevel)[0]}
                                        <HiOutlineChevronDown size={12} className="text-slate-400 group-hover:text-slate-600" />
                                    </button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    selectionMode="single"
                                    selectedKeys={detailLevel}
                                    onSelectionChange={(keys) => setDetailLevel(keys as Set<string>)}
                                    itemClasses={{ base: "outline-none data-[focus-visible=true]:outline-none" }}
                                >
                                    <DropdownItem key="Concise" className="font-medium text-[13px]">Concise</DropdownItem>
                                    <DropdownItem key="Detailed" className="font-medium text-[13px]">Detailed</DropdownItem>
                                    <DropdownItem key="Legal Complete" className="font-medium text-[13px]">Legal Complete</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>

                        {/* Switch */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <span className="text-[13px] font-medium text-slate-600 flex items-center gap-2">
                                <HiOutlineClock size={16} className="text-slate-400" /> History Context
                            </span>
                            <Switch size="sm" color="secondary" isSelected={includeHistory} onValueChange={setIncludeHistory} classNames={{ wrapper: "shadow-sm" }} />
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
