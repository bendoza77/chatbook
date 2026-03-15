import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Signup = () => {
    const { signup } = useAuth();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    useEffect(() => { document.title = "ChatBook | Sign Up"; }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData);
        setFormData({ name: "", email: "", password: "" });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-[calc(100vh-4rem)] flex"
        >
            {/* ── Left brand panel ───────────────────────── */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
                style={{ background: "linear-gradient(135deg, #0f0720 0%, #09122b 50%, #020617 100%)" }}
            >
                {/* Blobs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="animate-blob absolute top-1/3 left-1/4 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl" />
                    <div className="animate-blob delay-2000 absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />
                    <div className="animate-blob delay-4000 absolute top-1/2 left-1/2 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl" />
                </div>

                {/* Grid */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }}
                />

                {/* Logo */}
                <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold gradient-text">ChatBook</span>
                </div>

                {/* Center content */}
                <div className="relative flex-1 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-4">Join today</p>
                        <h2 className="text-5xl font-black text-white leading-tight mb-6">
                            Start your<br />
                            <span className="gradient-text">journey here.</span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                            Create your account for free and become part of a growing community of creators and storytellers.
                        </p>
                    </motion.div>

                    {/* Stats decoration */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-12 grid grid-cols-3 gap-4"
                    >
                        {[
                            { value: "10K+", label: "Users" },
                            { value: "50K+", label: "Posts" },
                            { value: "100%", label: "Free" },
                        ].map((stat) => (
                            <div key={stat.label} className="glass rounded-xl p-4 text-center">
                                <p className="text-2xl font-black gradient-text">{stat.value}</p>
                                <p className="text-slate-400 text-xs mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="relative text-slate-600 text-xs">
                    © 2025 ChatBook. All rights reserved.
                </div>
            </div>

            {/* ── Right form panel ───────────────────────── */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-slate-950">
                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <span className="text-lg font-bold gradient-text">ChatBook</span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t("signup.title")}</h1>
                        <p className="text-slate-500 dark:text-slate-400">Create your free account and start sharing</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                            <div className="relative">
                                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={t("signup.namePlaceholder")}
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                            <div className="relative">
                                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={t("signup.emailPlaceholder")}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                            <div className="relative">
                                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder={t("signup.passwordPlaceholder")}
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-all duration-200"
                                />
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-primary w-full py-3.5 text-base mt-2 shadow-lg shadow-indigo-500/25"
                        >
                            {t("signup.submit")}
                        </motion.button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Signup;
