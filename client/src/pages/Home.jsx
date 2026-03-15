import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const features = [
    {
        gradient: "from-indigo-500 to-violet-600",
        glow: "rgba(99,102,241,0.25)",
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
        key: "chat",
        descKey: "chatDesc",
    },
    {
        gradient: "from-violet-500 to-fuchsia-600",
        glow: "rgba(139,92,246,0.25)",
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        key: "groups",
        descKey: "groupsDesc",
    },
    {
        gradient: "from-cyan-500 to-blue-600",
        glow: "rgba(6,182,212,0.25)",
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
        key: "secure",
        descKey: "secureDesc",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const Home = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const isAuthenticated = Object.keys(user).length > 0;

    useEffect(() => { document.title = "ChatBook | Home"; }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">

                {/* Animated mesh bg */}
                <div className="absolute inset-0 -z-10 mesh-gradient-dark dark:mesh-gradient-dark light:mesh-gradient-light">
                    <div className="absolute inset-0 bg-slate-50/95 dark:bg-transparent" />
                </div>

                {/* Blob decorations */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="animate-blob delay-0 absolute top-1/4 -left-20 w-[480px] h-[480px] bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-3xl" />
                    <div className="animate-blob delay-2000 absolute top-1/3 -right-20 w-[400px] h-[400px] bg-violet-500/20 dark:bg-violet-500/10 rounded-full blur-3xl" />
                    <div className="animate-blob delay-4000 absolute bottom-1/4 left-1/2 w-[360px] h-[360px] bg-cyan-500/15 dark:bg-cyan-500/8 rounded-full blur-3xl" />
                </div>

                {/* Grid overlay */}
                <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.06]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
                        backgroundSize: "48px 48px"
                    }}
                />

                <div className="relative text-center px-4 max-w-5xl mx-auto py-24">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        The modern social platform
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-6xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tight text-slate-900 dark:text-white mb-6"
                    >
                        Connect.{" "}
                        <span className="gradient-text">Share.</span>
                        <br />
                        Inspire.
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        {t("home.subtitle")}
                    </motion.p>

                    {/* CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        {isAuthenticated ? (
                            <>
                                <Link to="/posts">
                                    <motion.button
                                        whileHover={{ scale: 1.04, y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="btn-primary px-7 py-3.5 text-base shadow-lg shadow-indigo-500/30"
                                    >
                                        Browse Posts
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </motion.button>
                                </Link>
                                <Link to="/profile">
                                    <motion.button
                                        whileHover={{ scale: 1.04, y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="px-7 py-3.5 text-base font-semibold rounded-xl border-2 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-500/30 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all duration-200"
                                    >
                                        My Profile
                                    </motion.button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/signup">
                                    <motion.button
                                        whileHover={{ scale: 1.04, y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="btn-primary px-7 py-3.5 text-base shadow-lg shadow-indigo-500/30"
                                    >
                                        Get Started — it's free
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </motion.button>
                                </Link>
                                <Link to="/login">
                                    <motion.button
                                        whileHover={{ scale: 1.04, y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="px-7 py-3.5 text-base font-semibold rounded-xl border-2 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-500/30 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all duration-200"
                                    >
                                        Sign In
                                    </motion.button>
                                </Link>
                            </>
                        )}
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 dark:text-slate-600"
                    >
                        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── Features ─────────────────────────────────────────── */}
            <section className="py-24 px-4 bg-white dark:bg-slate-900">
                <div className="max-w-6xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3">Why ChatBook</p>
                        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">
                            Everything you need to{" "}
                            <span className="gradient-text">connect</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {features.map((f) => (
                            <motion.div
                                key={f.key}
                                variants={itemVariants}
                                whileHover={{ y: -6 }}
                                className="group relative rounded-2xl p-8 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 overflow-hidden cursor-default transition-all duration-300 hover:border-indigo-200 dark:hover:border-indigo-500/20"
                            >
                                {/* Hover glow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                                    style={{ background: `radial-gradient(circle at 30% 40%, ${f.glow}, transparent 70%)` }}
                                />

                                <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {f.icon}
                                </div>

                                <h3 className="relative text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {t(`home.${f.key}`)}
                                </h3>
                                <p className="relative text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {t(`home.${f.descKey}`)}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Bottom CTA ───────────────────────────────────────── */}
            {!isAuthenticated && (
                <section className="py-24 px-4 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-0 right-0 h-px gradient-divider" />
                    </div>
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-5">
                                Ready to join the community?
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
                                Create your free account in seconds and start sharing with the world.
                            </p>
                            <Link to="/signup">
                                <motion.button
                                    whileHover={{ scale: 1.04, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="btn-primary px-8 py-4 text-base shadow-xl shadow-indigo-500/25 pulse-glow"
                                >
                                    Create Free Account
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            )}
        </motion.div>
    );
};

export default Home;
