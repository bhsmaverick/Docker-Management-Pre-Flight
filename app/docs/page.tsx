'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';

export default function DocsPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col items-center pt-32 pb-20">
      <div className="w-full max-w-4xl px-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-zinc-400 hover:text-white transition-colors mb-8">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          {t('docs.title')}
        </h1>
        <p className="text-xl text-zinc-400 leading-relaxed mb-16 pb-8 border-b border-zinc-800">
          {t('docs.intro')}
        </p>

        <div className="space-y-16">
          {/* Getting Started Section */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h2 className="text-2xl font-semibold text-white tracking-tight">{t('docs.getting_started_title')}</h2>
            </div>
            <p className="text-zinc-300 leading-relaxed text-lg mb-6">
              {t('docs.getting_started_content')}
            </p>
          </section>

          {/* Installation Section */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              </div>
              <h2 className="text-2xl font-semibold text-white tracking-tight">{t('docs.installation_title')}</h2>
            </div>
            <ul className="space-y-6">
              <li className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <p className="text-zinc-300 mb-3">{t('docs.installation_step1')}</p>
                <div className="font-mono text-sm bg-black/50 p-4 rounded-lg text-emerald-400 border border-zinc-800">
                  git clone https://github.com/example/docker-panel.git<br/>
                  cd docker-panel
                </div>
              </li>
              <li className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <p className="text-zinc-300 mb-3">{t('docs.installation_step2')}</p>
                <div className="font-mono text-sm bg-black/50 p-4 rounded-lg text-indigo-400 border border-zinc-800">
                  cp .env.example .env<br/>
                  nano .env
                </div>
              </li>
              <li className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <p className="text-zinc-300 mb-3">{t('docs.installation_step3')}</p>
                <div className="font-mono text-sm bg-black/50 p-4 rounded-lg text-orange-400 border border-zinc-800">
                  npm install<br/>
                  npm run build<br/>
                  npm run start
                </div>
              </li>
            </ul>
          </section>

          {/* Usage Section */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h2 className="text-2xl font-semibold text-white tracking-tight">{t('docs.usage_title')}</h2>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
              <p className="text-zinc-300 leading-relaxed text-lg">
                {t('docs.usage_content')}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
