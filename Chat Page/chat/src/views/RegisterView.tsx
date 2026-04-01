"use client";

import React, { useState } from "react";
import { Input, Button, Divider, Alert } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    HiOutlineUser,
    HiOutlineEnvelope,
    HiOutlineLockClosed,
    HiOutlineArrowRight,
    HiOutlineEye,
    HiOutlineEyeSlash,
} from "react-icons/hi2";

export default function RegisterView() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        document.cookie = `hsagic-auth-token=mock-jwt-token-${Date.now()}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;

        setIsLoading(false);
        router.push("/");
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

    const passwordToggle = (
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            aria-label="Toggle password visibility"
        >
            {showPassword ? <HiOutlineEyeSlash size={18} /> : <HiOutlineEye size={18} />}
        </button>
    );

    return (
        <div className="flex flex-col w-full">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-3">
                    Create account
                </h2>
                <p className="text-base text-slate-500 font-medium">
                    Join HSAGIC for smarter logistics management
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
                    {/* Full Name */}
                    <div className="space-y-2.5 flex flex-col items-start w-full">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                        <Input
                            type="text"
                            variant="bordered"
                            value={name}
                            onValueChange={setName}
                            placeholder="John Doe"
                            startContent={<HiOutlineUser size={20} className="text-slate-400 group-focus-within:text-violet-500 transition-colors" />}
                            classNames={{ inputWrapper: inputWrapperClass, input: inputClass, base: "w-full" }}
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2.5 flex flex-col items-start w-full">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                        <Input
                            type="email"
                            variant="bordered"
                            value={email}
                            onValueChange={setEmail}
                            placeholder="you@company.com"
                            startContent={<HiOutlineEnvelope size={20} className="text-slate-400 group-focus-within:text-violet-500 transition-colors" />}
                            classNames={{ inputWrapper: inputWrapperClass, input: inputClass, base: "w-full" }}
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2.5 flex flex-col items-start w-full">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            variant="bordered"
                            value={password}
                            onValueChange={setPassword}
                            placeholder="At least 6 characters"
                            startContent={<HiOutlineLockClosed size={20} className="text-slate-400 group-focus-within:text-violet-500 transition-colors" />}
                            endContent={passwordToggle}
                            classNames={{ inputWrapper: inputWrapperClass, input: inputClass, base: "w-full" }}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2.5 flex flex-col items-start w-full">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Confirm Password</label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            variant="bordered"
                            value={confirmPassword}
                            onValueChange={setConfirmPassword}
                            placeholder="Re-enter your password"
                            startContent={<HiOutlineLockClosed size={20} className="text-slate-400 group-focus-within:text-violet-500 transition-colors" />}
                            classNames={{ inputWrapper: inputWrapperClass, input: inputClass, base: "w-full" }}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl h-12 text-base shadow-[0_4px_14px_0_rgba(124,58,237,0.39)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.23)] hover:-translate-y-0.5 transition-all duration-300 transform active:scale-[0.98] mt-2"
                    endContent={!isLoading ? <HiOutlineArrowRight size={18} className="ml-1" /> : null}
                >
                    Create Account
                </Button>
            </form>

            <Divider className="my-8 bg-slate-200" />

            <div className="text-center">
                <p className="text-sm font-medium text-slate-500">
                    Already have an account?{" "}
                    <Link href="/login" className="font-bold text-violet-600 hover:text-violet-700 hover:underline underline-offset-4 transition-all duration-200 ml-1">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
