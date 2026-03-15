import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import User from "../components/User";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const Users = () => {
    const [name, setName] = useState("");
    const { getUsers, users } = useUser();
    const { t } = useTranslation();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => { document.title = "ChatBook | Users"; }, []);

    const filtered = users.filter(el => `${el.name}`.toLowerCase().startsWith(name.toLowerCase()));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors"
        >
            <div className="max-w-5xl mx-auto px-4 py-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-8"
                >
                    <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-1">Community</p>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t("users.title")}</h1>
                </motion.div>

                {/* Search bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="relative mb-8"
                >
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t("users.searchPlaceholder")}
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 shadow-sm transition-all duration-200"
                    />
                    {name && (
                        <button
                            onClick={() => setName("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </motion.div>

                {/* Results count */}
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {filtered.length} {filtered.length === 1 ? "member" : "members"}{name ? ` matching "${name}"` : ""}
                    </h2>
                </div>

                {/* Grid */}
                {filtered.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        {filtered.map((el) => (
                            <motion.div key={el._id || el.id} variants={itemVariants}>
                                <User el={el} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <p className="text-slate-500 dark:text-slate-500 text-sm">No users found</p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default Users;
