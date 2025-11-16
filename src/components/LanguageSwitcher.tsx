import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'fr', name: t('lang.fr') },
    { code: 'ar', name: t('lang.ar') },
  ];

  return (
    <div className="flex items-center gap-2 rounded-full bg-slate-800 p-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${
            i18n.language === lang.code
              ? 'bg-purple-500 text-white'
              : 'text-slate-300 hover:bg-slate-700'
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
