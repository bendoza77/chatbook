import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

const Nav = () => {
    const { user, logout } = useAuth();
    const { t } = useTranslation();
    const location = useLocation();
    const isAuthenticated = Object.keys(user).length > 0;
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = isAuthenticated
        ? [
            { to: "/", label: t("nav.home") },
            { to: "/profile", label: t("nav.profile") },
            { to: "/posts", label: t("nav.posts") },
            { to: "/users", label: t("nav.users") },
          ]
        : [
            { to: "/", label: t("nav.home") },
            { to: "/login", label: t("nav.login") },
          ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 glass-light dark:glass border-b border-slate-200/50 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md group-hover:shadow-indigo-400/40 transition-shadow duration-300">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <span className="text-lg font-bold gradient-text">ChatBook</span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive(link.to)
                                        ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop right actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <LanguageSwitcher />
                        <ThemeToggle />

                        {!isAuthenticated && (
                            <Link
                                to="/signup"
                                className="btn-primary text-sm px-4 py-2"
                            >
                                {t("nav.signup")}
                            </Link>
                        )}

                        {isAuthenticated && (
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                {t("nav.logout")}
                            </button>
                        )}
                    </div>

                    {/* Mobile right */}
                    <div className="flex items-center gap-2 md:hidden">
                        <LanguageSwitcher />
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                {mobileOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                }
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden border-t border-slate-200/60 dark:border-white/5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl"
                    >
                        <nav className="px-4 py-3 space-y-1">
                            {navLinks.map(link => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                        isActive(link.to)
                                            ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="pt-2 border-t border-slate-200/60 dark:border-white/5 space-y-1">
                                {!isAuthenticated && (
                                    <Link
                                        to="/signup"
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                                    >
                                        {t("nav.signup")}
                                    </Link>
                                )}
                                {isAuthenticated && (
                                    <button
                                        onClick={() => { logout(); setMobileOpen(false); }}
                                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                    >
                                        {t("nav.logout")}
                                    </button>
                                )}
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Nav;
