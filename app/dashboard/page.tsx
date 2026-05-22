'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/components/I18nProvider';

export default function DashboardPage() {
  const { t } = useI18n();
  const router = useRouter();
  
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  // Fake state since no real Go API
  const [containers, setContainers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('docker_panel_jwt');
    if (!token) {
      router.push('/login');
      return;
    }
    
    // Simulate API fetch delay
    setTimeout(() => {
      setContainers([
        { Id: 'f87a32ae', Names: ['/redis-cache'], Image: 'redis:alpine', State: 'running' },
        { Id: 'b45c92f1', Names: ['/postgres-db'], Image: 'postgres:15', State: 'running' },
        { Id: 'd1901a1e', Names: ['/nginx-proxy'], Image: 'nginx:latest', State: 'exited' }
      ]);
      setIsLoading(false);
    }, 1000);
  }, [router]);

  const showNotification = (msg: {type: 'success' | 'error', text: string}) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  const triggerBackup = async () => {
    setIsBackingUp(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      showNotification({ type: 'success', text: t('dashboard.backup_success') });
    } catch (err) {
      showNotification({ type: 'error', text: 'Backup failed' });
    } finally {
      setIsBackingUp(false);
    }
  };

  const formatName = (name: string) => name ? name.replace(/^\//, '') : 'Unknown';

  return (
    <div className="min-h-screen pt-24 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-zinc-800/80">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">{t('dashboard.overview_title')}</h1>
            <p className="text-zinc-500">{t('dashboard.active_containers')}</p>
          </div>
          
          <button 
            onClick={triggerBackup} 
            disabled={isBackingUp}
            className="inline-flex items-center justify-center gap-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
          >
            {isBackingUp ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            )}
            <span>{t('dashboard.trigger_s3_backup')}</span>
          </button>
        </header>

        {notification && (
          <div className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
            notification.type === 'error' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          }`}>
            <p className="font-medium text-sm">{notification.text}</p>
            <button onClick={() => setNotification(null)} className="opacity-70 hover:opacity-100">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : containers.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 border border-zinc-800/50 rounded-2xl border-dashed">
              {t('dashboard.no_containers')}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {containers.map(container => (
                <div key={container.Id} className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 hover:border-zinc-700/80 transition-colors relative overflow-hidden flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="truncate pr-4">
                      <h4 className="font-medium text-lg text-white truncate">{formatName(container.Names[0])}</h4>
                      <p className="text-xs font-mono text-zinc-500 mt-1 truncate">{container.Image}</p>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-full text-xs font-medium bg-zinc-950 border border-zinc-800">
                      <span className={`w-2 h-2 rounded-full ${container.State === 'running' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500'}`}></span>
                      <span className={container.State === 'running' ? 'text-emerald-400' : 'text-rose-400'}>
                        {container.State === 'running' ? t('dashboard.state_running') : t('dashboard.state_exited')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-auto pt-5 border-t border-zinc-800/50">
                    <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium py-2.5 rounded-xl transition-colors text-center">
                      {t('dashboard.view_system_logs')}
                    </button>
                    <button className="flex-1 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 hover:border-indigo-500/40 text-sm font-medium py-2.5 rounded-xl transition-colors text-center flex items-center justify-center gap-2">
                       <span>{t('dashboard.restart_container')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
