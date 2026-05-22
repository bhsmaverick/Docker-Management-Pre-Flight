'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';

export default function LandingPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full max-w-7xl px-6 pt-32 pb-20 md:pt-48 md:pb-32 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
          {t('landing.hero_title')}
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('landing.hero_subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-medium transition-colors border border-indigo-500/50 shadow-[0_0_20px_rgba(79,70,229,0.3)] text-center">
            {t('landing.start_cta')}
          </Link>
          <button className="w-full sm:w-auto bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-white px-8 py-4 rounded-xl font-medium transition-all">
            {t('landing.pricing_cta')}
          </button>
        </div>
      </header>

      <section className="w-full max-w-7xl px-6 pb-20 md:pb-32 flex-grow">
        <h2 className="text-3xl font-semibold text-white mb-12 text-center tracking-tight">{t('landing.features_heading')}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800/50 p-8 rounded-2xl hover:border-zinc-700 transition-colors">
            <div className="h-12 w-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">{t('landing.feature_speed_title')}</h3>
            <p className="text-zinc-400 leading-relaxed">{t('landing.feature_speed_desc')}</p>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800/50 p-8 rounded-2xl hover:border-zinc-700 transition-colors">
            <div className="h-12 w-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">{t('landing.feature_security_title')}</h3>
            <p className="text-zinc-400 leading-relaxed">{t('landing.feature_security_desc')}</p>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800/50 p-8 rounded-2xl hover:border-zinc-700 transition-colors">
            <div className="h-12 w-12 bg-orange-500/10 text-orange-400 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">{t('landing.feature_hosting_title')}</h3>
            <p className="text-zinc-400 leading-relaxed">{t('landing.feature_hosting_desc')}</p>
          </div>
        </div>
      </section>

      <footer className="w-full max-w-7xl px-6 py-8 border-t border-zinc-800/50 text-center text-sm text-zinc-500">
        <p>{t('landing.footer_copyright')}</p>
      </footer>
    </div>
  );
}
