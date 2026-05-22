'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/components/I18nProvider';

export default function RegisterPage() {
  const { t } = useI18n();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (password !== passwordConfirm) {
      setErrorMsg(t('auth.error_password_mismatch'));
      return;
    }

    const hasSpecials = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (password.length < 8 || !hasSpecials.test(password)) {
      setErrorMsg(t('auth.error_password_validation'));
      return;
    }
    
    if (!email.includes('@')) {
      setErrorMsg(t('auth.error_email_validation'));
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      router.push('/login');
    } catch (err) {
      setErrorMsg(t('auth.error_auth_failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"></div>
        
        <h2 className="text-3xl font-semibold tracking-tight text-white mb-8 text-center">{t('auth.register_heading')}</h2>
        
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-400">{t('auth.email_label')}</label>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email" 
              required 
              placeholder={t('auth.email_placeholder')}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-400">{t('auth.password_label')}</label>
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" 
              required 
              placeholder={t('auth.password_placeholder')}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-400">{t('auth.password_confirm_label')}</label>
            <input 
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type="password" 
              required 
              placeholder={t('auth.password_placeholder')}
              className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>

          {errorMsg && (
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm leading-relaxed">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p>{errorMsg}</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(79,70,229,0.2)]"
          >
            {!isLoading ? (
              <span>{t('auth.submit_register')}</span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
