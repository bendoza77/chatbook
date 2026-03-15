import { useState } from "react";
import { usePost } from "../context/PostContext";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const avatarColors = [
    "from-indigo-500 to-violet-600",
    "from-cyan-500 to-blue-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-red-500",
    "from-pink-500 to-rose-600",
    "from-amber-500 to-orange-600",
];

const getAvatarGradient = (name = "") =>
    avatarColors[(name.charCodeAt(0) || 0) % avatarColors.length];

const Post = ({ el }) => {
    const [toggle, setToggle] = useState(false);
    const { updatePost } = usePost();
    const location = useLocation();
    const { t } = useTranslation();
    const isProfile = location.pathname === "/profile";

    const handleSubmit = (e, postId) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            title: formData.get("title") || el.title,
            content: formData.get("content") || el.content,
        };
        updatePost(data, postId);
        setToggle(false);
    };

    return (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden card-lift">
            <AnimatePresence mode="wait">
                {toggle ? (
                    /* ── Edit form ─────────────────────────── */
                    <motion.form
                        key="edit-form"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        onSubmit={(e) => handleSubmit(e, el._id)}
                        className="p-6 space-y-4"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Edit Post</h3>
                            <button
                                type="button"
                                onClick={() => setToggle(false)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <input
                            type="text"
                            name="title"
                            defaultValue={el.title}
                            placeholder={t("posts.changeTitle")}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-all text-sm"
                        />
                        <textarea
                            name="content"
                            defaultValue={el.content}
                            placeholder={t("posts.content")}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-all text-sm resize-none"
                        />
                        <div className="flex gap-3">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary flex-1 py-2.5 text-sm"
                            >
                                {t("posts.submit")}
                            </motion.button>
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setToggle(false)}
                                className="flex-1 py-2.5 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                {t("posts.cancel")}
                            </motion.button>
                        </div>
                    </motion.form>
                ) : (
                    /* ── Post view ─────────────────────────── */
                    <motion.div
                        key="post-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Image */}
                        {el.postImg && (
                            <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-video">
                                <img
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    src={"http://localhost:3000/uploads/" + el.postImg}
                                    alt={el.title}
                                />
                                {/* Gradient overlay on bottom */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                        )}

                        <div className="p-5">
                            {/* Author row */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarGradient(el.fullName)} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                                    {(el.fullName || "?")[0].toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{el.fullName || "Anonymous"}</p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">Author</p>
                                </div>
                            </div>

                            {/* Content */}
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">{el.title}</h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{el.content}</p>

                            {/* Footer */}
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                                    <svg className="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{el.likeCount ?? 0}</span>
                                    <span className="text-xs text-slate-400">{t("posts.likes")}</span>
                                </div>

                                {isProfile && (
                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        onClick={() => setToggle(true)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        {t("profile.updatePost")}
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Post;
