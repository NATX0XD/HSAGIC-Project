"use client";

import React, { useState } from "react";
import { Input, Button, Divider, Alert } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    HiOutlineEnvelope,
    HiOutlineLockClosed,
    HiOutlineArrowRight,
    HiOutlineEye,
    HiOutlineEyeSlash,
} from "react-icons/hi2";

export default function LoginView() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        document.cookie = `d2d-auth-token=mock-jwt-token-${Date.now()}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;

        setIsLoading(false);

        const params = new URLSearchParams(window.location.search);
        const callbackUrl = params.get("callbackUrl") || "/";
        router.push(callbackUrl);
        router.refresh();
    };

    const inputWrapperClass = [
        "h-12 rounded-xl",
        "border-2 border-slate-200 bg-slate-50",
        "shadow-sm",
        "hover:border-violet-400 hover:bg-white",
        "group-data-[focus=true]:border-violet-500 group-data-[focus=true]:bg-white",
        "group-data-[focus=true]:ring-4 group-data-[focus=true]:ring-violet-500/20",
        "transition-all duration-300 ease-out",
    ].join(" ");

    const inputClass = "text-sm font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal !outline-none focus:!outline-none focus:!ring-0 !border-none !shadow-none";

    return (
        <div className="flex flex-col w-full">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-3">
                    Welcome back
                </h2>
                <p className="text-base text-slate-500 font-medium">
                    Sign in to access your AI workspace
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
                {error && (
                    <Alert
                        color="danger"
                        variant="flat"
                        title={error}
                        classNames={{
                            base: "rounded-xl border border-danger-200 bg-danger-50 text-danger-900 p-4 shadow-sm",
                            title: "text-sm flex items-center gap-2 font-medium"
                        }}
                    />
                )}

                <div className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2.5 flex flex-col items-start w-full">
                        <label className="text-sm font-semibold text-slate-700 ml-1">
                            Email Address
                        </label>
                        <Input
                            type="email"
                            variant="bordered"
                            value={email}
                            onValueChange={setEmail}
                            placeholder="you@company.com"
                            startContent={
                                <HiOutlineEnvelope size={20} className="text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                            }
                            classNames={{
                                inputWrapper: inputWrapperClass,
                                input: inputClass,
                                base: "w-full"
                            }}
                        />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2.5 flex flex-col items-start w-full">
                        <label className="text-sm font-semibold text-slate-700 ml-1">
                            Password
                        </label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            variant="bordered"
                            value={password}
                            onValueChange={setPassword}
                            placeholder="Enter your password"
                            startContent={
                                <HiOutlineLockClosed size={20} className="text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                            }
                            endContent={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <HiOutlineEyeSlash size={18} /> : <HiOutlineEye size={18} />}
                                </button>
                            }
                            classNames={{
                                inputWrapper: inputWrapperClass,
                                input: inputClass,
                                base: "w-full"
                            }}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end -mt-2">
                    <Link
                        href="#"
                        className="text-sm font-semibold text-violet-600 hover:text-violet-700 hover:underline underline-offset-4 transition-all duration-200"
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl h-12 text-base shadow-[0_4px_14px_0_rgba(124,58,237,0.39)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.23)] hover:-translate-y-0.5 transition-all duration-300 transform active:scale-[0.98]"
                    endContent={!isLoading ? <HiOutlineArrowRight size={18} className="ml-1" /> : null}
                >
                    Sign In
                </Button>
            </form>

            <Divider className="my-8 bg-slate-200" />

            <div className="text-center">
                <p className="text-sm font-medium text-slate-500">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="font-bold text-violet-600 hover:text-violet-700 hover:underline underline-offset-4 transition-all duration-200 ml-1"
                    >
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    );
}
