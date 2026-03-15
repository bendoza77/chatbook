import { useTranslation } from "react-i18next";

const avatarColors = [
    { gradient: "from-indigo-500 to-violet-600", ring: "ring-indigo-200 dark:ring-indigo-500/20" },
    { gradient: "from-cyan-500 to-blue-600",     ring: "ring-cyan-200 dark:ring-cyan-500/20" },
    { gradient: "from-emerald-500 to-teal-600",  ring: "ring-emerald-200 dark:ring-emerald-500/20" },
    { gradient: "from-orange-500 to-red-500",    ring: "ring-orange-200 dark:ring-orange-500/20" },
    { gradient: "from-pink-500 to-rose-600",     ring: "ring-pink-200 dark:ring-pink-500/20" },
    { gradient: "from-amber-500 to-orange-600",  ring: "ring-amber-200 dark:ring-amber-500/20" },
];

const getColor = (name = "") => avatarColors[(name.charCodeAt(0) || 0) % avatarColors.length];

const User = ({ el = {} }) => {
    const { t } = useTranslation();
    const color = getColor(el.name);
    const initials = (el.name || "?").slice(0, 2).toUpperCase();

    return (
        <div className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm p-5 hover:border-indigo-200 dark:hover:border-indigo-500/20 hover:shadow-md transition-all duration-250 card-lift">
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${color.gradient} flex items-center justify-center text-white font-bold text-base shadow-md ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ${color.ring} group-hover:scale-105 transition-transform duration-200`}>
                    {initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white truncate">{el.name || "N/A"}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{el.email || "N/A"}</p>
                </div>
            </div>

            {/* Verified badge */}
            <div className="mt-4 flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    el.isVerified
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                }`}>
                    {el.isVerified ? (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <circle cx="12" cy="12" r="9" />
                        </svg>
                    )}
                    {el.isVerified ? t("users.verified") : t("users.notVerified")}
                </span>

                <div className={`w-2 h-2 rounded-full ${el.isVerified ? "bg-emerald-400" : "bg-slate-300 dark:bg-slate-600"}`} />
            </div>
        </div>
    );
};

export default User;
