import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usePost } from "../context/PostContext";
import Post from "../components/Post";
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

const Profile = () => {
    const { user } = useAuth();
    const { createPost, getPosts, posts, deletePost } = usePost();
    const { t } = useTranslation();
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        getPosts(user._id);
    }, [user._id, getPosts]);

    useEffect(() => { document.title = "ChatBook | Profile"; }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", e.target.postTitle.value);
        formData.append("content", e.target.postDes.value);
        formData.append("postImg", e.target.postImg.files[0]);
        createPost(formData);
        e.target.reset();
        setFileName("");
    };

    const handleFileChange = (e) => {
        setFileName(e.target.files[0]?.name || "");
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors"
        >
            <div className="max-w-2xl mx-auto px-4 py-10">

                {/* ── User info card ──────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden mb-6"
                >
                    {/* Top gradient strip */}
                    <div className="h-20 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500" />

                    <div className="px-6 pb-6">
                        {/* Avatar */}
                        <div className={`-mt-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${getAvatarGradient(user.name)} flex items-center justify-center text-white text-3xl font-black shadow-xl border-4 border-white dark:border-slate-900 mb-4`}>
                            {(user.name || "?")[0].toUpperCase()}
                        </div>

                        <div className="flex items-start justify-between flex-wrap gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{user.email}</p>
                            </div>

                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                                user.isVerified
                                    ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                            }`}>
                                {user.isVerified ? (
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                                {user.isVerified ? t("profile.yes") : t("profile.no")} Verified
                            </span>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {posts.length} post{posts.length !== 1 ? "s" : ""} published
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* ── Create post form ────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm p-6 mb-6"
                >
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </span>
                        {t("profile.createPost")}
                    </h2>

                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                        <input
                            type="text"
                            name="postTitle"
                            placeholder={t("profile.postTitle")}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-all duration-200 text-sm"
                        />
                        <textarea
                            name="postDes"
                            placeholder={t("profile.postDescription")}
                            required
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-all duration-200 text-sm resize-none"
                        />

                        {/* Custom file upload */}
                        <label className="relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 group hover:border-indigo-400 dark:hover:border-indigo-500 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 p-6">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            {fileName ? (
                                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{fileName}</p>
                            ) : (
                                <>
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                        Click to upload image
                                    </p>
                                    <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">PNG, JPG, GIF up to 10MB</p>
                                </>
                            )}
                            <input
                                type="file"
                                name="postImg"
                                required
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                            />
                        </label>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-primary w-full py-3 text-sm"
                        >
                            Publish Post
                        </motion.button>
                    </form>
                </motion.div>

                {/* ── Posts list ──────────────────────────────── */}
                {posts.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                            Your Posts
                        </h3>
                        <AnimatePresence>
                            {posts.map((el, i) => (
                                <motion.div
                                    key={el._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.97 }}
                                    transition={{ duration: 0.3, delay: 0.05 * i }}
                                    className="mb-4"
                                >
                                    <Post el={el} />
                                    {el.userId === user._id && (
                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={() => deletePost(el._id)}
                                            className="w-full mt-1 py-2.5 rounded-b-xl text-sm font-semibold flex items-center justify-center gap-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 border border-t-0 border-slate-100 dark:border-white/5 transition-colors duration-200"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            {t("profile.deletePost")}
                                        </motion.button>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {posts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center py-16 text-slate-400 dark:text-slate-600"
                    >
                        <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <p className="text-sm">No posts yet. Create your first post above!</p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default Profile;
