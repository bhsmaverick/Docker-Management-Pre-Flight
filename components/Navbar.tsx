'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from './I18nProvider';

export function Navbar() {
  const { lang, setLang, t } = useI18n();
  const currentPath = usePathname();

  const isAuthPage = currentPath === '/login' || currentPath === '/register';
  const isDashboard = currentPath.startsWith('/dashboard');

  return (
    <nav className="absolute top-0 w-full flex items-center justify-between p-6 z-50">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-white font-medium hover:text-indigo-400 transition-colors">
          <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
          Docker Panel
        </Link>
      </div>

      <div className="flex items-center gap-6 text-sm font-medium text-zinc-400">
        {!isDashboard && (
          <Link href="/docs" className="hover:text-white transition-colors">
            {t('docs.title')}
          </Link>
        )}
        {!isDashboard && !isAuthPage && (
          <Link href="/login" className="hover:text-white transition-colors">
            Login
          </Link>
        )}
        {!isDashboard && isAuthPage && currentPath === '/login' && (
          <Link href="/register" className="hover:text-white transition-colors">
            Register
          </Link>
        )}
        {!isDashboard && isAuthPage && currentPath === '/register' && (
          <Link href="/login" className="hover:text-white transition-colors">
            Login
          </Link>
        )}
        {isDashboard && (
          <Link href="/login" className="text-rose-400 hover:text-rose-300 transition-colors">
            Logout
          </Link>
        )}
        
        <div className="h-4 w-px bg-zinc-800"></div>

        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden relative">
          <select 
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="appearance-none bg-transparent text-white px-4 py-1.5 focus:outline-none cursor-pointer pr-10 hover:bg-zinc-800/50 transition-colors uppercase"
          >
            <option value="en" className="bg-zinc-900 text-white">EN</option>
            <option value="es" className="bg-zinc-900 text-white">ES</option>
            <option value="pt" className="bg-zinc-900 text-white">PT</option>
            <option value="de" className="bg-zinc-900 text-white">DE</option>
            <option value="fr" className="bg-zinc-900 text-white">FR</option>
            <option value="ua" className="bg-zinc-900 text-white">UA</option>
            <option value="pl" className="bg-zinc-900 text-white">PL</option>
            <option value="ja" className="bg-zinc-900 text-white">JA</option>
            <option value="ar" className="bg-zinc-900 text-white">AR</option>
            <option value="tr" className="bg-zinc-900 text-white">TR</option>
            <option value="hi" className="bg-zinc-900 text-white">HI</option>
            <option value="it" className="bg-zinc-900 text-white">IT</option>
            <option value="ko" className="bg-zinc-900 text-white">KO</option>
            <option value="id" className="bg-zinc-900 text-white">ID</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
}
