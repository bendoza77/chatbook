import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("language", lng);
    };

    return (
        <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-white/5 rounded-lg p-0.5">
            {["en", "ka"].map((lng) => (
                <button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wide transition-all duration-200 ${
                        i18n.language === lng
                            ? "bg-white dark:bg-white/10 text-indigo-600 dark:text-indigo-400 shadow-sm"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    }`}
                >
                    {lng}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
