'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';
import HowItWorks from '@/components/HowItWorks';

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

      {/* NEW SECTIONS: Security, Workflows, Disaster Recovery */}
      <section className="w-full max-w-7xl mx-auto px-6 pb-20 md:pb-32">
        <div className="space-y-24">
          {/* Security First */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                RBAC Engine
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">{t('landing.section_security_title')}</h2>
              <p className="text-lg text-zinc-400 leading-relaxed">{t('landing.section_security_desc')}</p>
            </div>
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl rounded-full opacity-50"></div>
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs">Dev</div>
                      <div><div className="h-4 w-24 bg-zinc-800 rounded mb-2"></div><div className="h-3 w-32 bg-zinc-800/50 rounded"></div></div>
                    </div>
                    <div className="px-2 py-1 rounded text-xs border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">Read-Only</div>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs">SRE</div>
                      <div><div className="h-4 w-20 bg-zinc-800 rounded mb-2"></div><div className="h-3 w-28 bg-zinc-800/50 rounded"></div></div>
                    </div>
                    <div className="px-2 py-1 rounded text-xs border border-indigo-500/30 text-indigo-400 bg-indigo-500/10">Admin</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Automate Workflows */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                CI/CD Webhooks
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">{t('landing.section_workflows_title')}</h2>
              <p className="text-lg text-zinc-400 leading-relaxed">{t('landing.section_workflows_desc')}</p>
            </div>
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl rounded-full opacity-50"></div>
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl font-mono text-sm">
                <div className="text-zinc-500 mb-2">// GitHub Action snippet</div>
                <div className="text-zinc-300">
                  <span className="text-pink-400">steps:</span><br/>
                  &nbsp;&nbsp;<span className="text-pink-400">- name:</span> Deploy to Panel<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">run:</span> curl -X POST \<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://panel.internal/webhook/deploy \<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-H <span className="text-yellow-300">"Auth: Bearer $TKN"</span>
                </div>
              </div>
            </div>
          </div>

          {/* Disaster Recovery */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                S3 Snapshots
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">{t('landing.section_disaster_title')}</h2>
              <p className="text-lg text-zinc-400 leading-relaxed">{t('landing.section_disaster_desc')}</p>
            </div>
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-3xl rounded-full opacity-50"></div>
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl flex items-center justify-center h-48">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  </div>
                  <div className="text-white font-medium">Syncing to aws-backup-bucket</div>
                  <div className="text-zinc-500 text-sm mt-1">2.4 GB / 3.1 GB</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compare Section */}
      <section className="w-full max-w-7xl mx-auto px-6 pb-20 md:pb-32">
        <h2 className="text-3xl font-semibold text-white mb-12 text-center tracking-tight">{t('landing.section_compare_title')}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-indigo-900/20 border border-indigo-500/30 p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-medium text-white">{t('landing.compare_us')}</h3>
            </div>
            <p className="text-zinc-300 leading-relaxed text-lg">{t('landing.compare_us_desc')}</p>
          </div>
          <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
              <h3 className="text-2xl font-medium text-zinc-400">{t('landing.compare_them')}</h3>
            </div>
            <p className="text-zinc-500 leading-relaxed text-lg">{t('landing.compare_them_desc')}</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full max-w-7xl mx-auto px-6 pb-20 md:pb-32">
        <h2 className="text-3xl font-semibold text-white mb-12 text-center tracking-tight">{t('landing.section_testimonials_title')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800/50 p-8 rounded-2xl">
            <div className="text-indigo-400 mb-4 h-8">
              <svg className="w-8 h-8 opacity-50" fill="currentColor" viewBox="0 0 32 32"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8c3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
            </div>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">{t('landing.testimonial_1_quote')}</p>
            <div className="text-zinc-500 font-medium">{t('landing.testimonial_1_author')}</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/50 p-8 rounded-2xl">
            <div className="text-emerald-400 mb-4 h-8">
              <svg className="w-8 h-8 opacity-50" fill="currentColor" viewBox="0 0 32 32"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8c3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"></path></svg>
            </div>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">{t('landing.testimonial_2_quote')}</p>
            <div className="text-zinc-500 font-medium">{t('landing.testimonial_2_author')}</div>
          </div>
        </div>
      </section>
      
      <HowItWorks />

      <footer className="w-full max-w-7xl px-6 py-8 border-t border-zinc-800/50 text-center text-sm text-zinc-500">
        <p>{t('landing.footer_copyright')}</p>
      </footer>
    </div>
  );
}
