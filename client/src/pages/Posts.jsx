import { useEffect } from "react";
import Post from "../components/Post";
import { usePost } from "../context/PostContext";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Posts = () => {
    const { posts, getPosts, page } = usePost();
    const { t } = useTranslation();

    useEffect(() => {
        getPosts();
    }, [page]);

    useEffect(() => { document.title = "ChatBook | Posts"; }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors"
        >
            <div className="max-w-2xl mx-auto px-4 py-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-8"
                >
                    <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-1">Discover</p>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t("posts.title")}</h1>
                </motion.div>

                {/* Feed */}
                {posts.length > 0 ? (
                    <div className="space-y-5">
                        {posts.map((el, i) => (
                            <motion.div
                                key={el._id || el.id}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: 0.04 * i, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                                <Post el={el} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center py-24"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-500/10 dark:to-violet-500/10 flex items-center justify-center mx-auto mb-5">
                            <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">No posts yet</h3>
                        <p className="text-slate-500 dark:text-slate-500 text-sm">Be the first to share something!</p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default Posts;
