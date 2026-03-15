import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const { t } = useTranslation();

    useEffect(() => { document.title = "ChatBook | Sign In"; }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { userEmail, userPassword } = e.target;
        login({ email: userEmail.value, password: userPassword.value });
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
                style={{ background: "linear-gradient(135deg, #020617 0%, #0f0720 40%, #09122b 70%, #020a1a 100%)" }}
            >
                {/* Blobs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="animate-blob absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />
                    <div className="animate-blob delay-2000 absolute bottom-1/3 right-1/4 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl" />
                    <div className="animate-blob delay-4000 absolute bottom-1/4 left-1/3 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl" />
                </div>

                {/* Grid */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }}
                />

                {/* Logo */}
                <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
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
                        <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Welcome back</p>
                        <h2 className="text-5xl font-black text-white leading-tight mb-6">
                            Great to see<br />
                            <span className="gradient-text">you again.</span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                            Sign in to continue sharing moments and connecting with your community.
                        </p>
                    </motion.div>

                    {/* Floating card decoration */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-12 animate-float"
                    >
                        <div className="glass rounded-2xl p-5 max-w-xs">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm">A</div>
                                <div>
                                    <p className="text-white text-sm font-semibold">Alex Johnson</p>
                                    <p className="text-slate-400 text-xs">Just posted a photo</p>
                                </div>
                            </div>
                            <div className="w-full h-20 rounded-xl bg-gradient-to-br from-indigo-500/30 to-violet-500/30 border border-white/5" />
                            <div className="flex items-center gap-3 mt-3">
                                <div className="flex items-center gap-1 text-slate-400 text-xs">
                                    <svg className="w-3.5 h-3.5 text-rose-400" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
                                    24 likes
                                </div>
                                <div className="w-1 h-1 rounded-full bg-slate-600" />
                                <span className="text-slate-500 text-xs">2 min ago</span>
                            </div>
                        </div>
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
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t("login.title")}</h1>
                        <p className="text-slate-500 dark:text-slate-400">{t("login.subtitle")}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                            <div className="relative">
                                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <input
                                    type="email"
                                    name="userEmail"
                                    placeholder={t("login.emailPlaceholder")}
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
                                    name="userPassword"
                                    placeholder={t("login.passwordPlaceholder")}
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
                            {t("login.submit")}
                        </motion.button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {t("login.noAccount")}{" "}
                            <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                                {t("login.signupLink")}
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Login;
