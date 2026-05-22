<template>
  <div class="min-h-screen bg-[#09090b] p-6 md:p-12 font-sans selection:bg-zinc-800">
    <div class="max-w-7xl mx-auto space-y-8">
      
      <!-- Dashboard Header -->
      <header class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-zinc-800/80">
        <div>
          <h1 class="text-3xl font-semibold tracking-tight text-white mb-2">{{ $t('dashboard.overview_title') }}</h1>
          <p class="text-zinc-500">{{ $t('dashboard.active_containers') }}</p>
        </div>
        
        <button 
          @click="triggerBackup" 
          :disabled="isBackingUp"
          class="inline-flex items-center justify-center gap-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
        >
          <svg v-if="isBackingUp" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span>{{ $t('dashboard.trigger_s3_backup') }}</span>
        </button>
      </header>

      <!-- Global Notifications -->
      <div v-if="notification" :class="[
        'p-4 rounded-xl border flex items-center justify-between transition-all',
        notification.type === 'error' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
      ]">
        <p class="font-medium text-sm">{{ notification.text }}</p>
        <button @click="notification = null" class="opacity-70 hover:opacity-100">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Container Grid Component -->
      <ContainerList @view-logs="openLogs" @notify="showNotification" />

      <!-- Slide-over Logs Interface -->
      <LogViewer 
        :is-open="isLogsOpen" 
        :container-id="activeContainerId" 
        @close="isLogsOpen = false" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import apiClient from '../api/client';
import ContainerList from '../components/ContainerList.vue';
import LogViewer from '../components/LogViewer.vue';

const { t } = useI18n();

const isBackingUp = ref(false);
const notification = ref(null);
const isLogsOpen = ref(false);
const activeContainerId = ref(null);

const showNotification = (msg) => {
  notification.value = msg;
  setTimeout(() => {
    notification.value = null;
  }, 5000); // Auto-dismiss
};

const triggerBackup = async () => {
  isBackingUp.value = true;
  try {
    await apiClient.post('/system/admin/backup');
    showNotification({ type: 'success', text: t('dashboard.backup_success') });
  } catch (err) {
    if (err.response?.status === 403) {
      showNotification({ type: 'error', text: t('dashboard.error_access_denied') });
    } else {
      showNotification({ type: 'error', text: err.response?.data?.error || 'Backup trigger failed' });
    }
  } finally {
    isBackingUp.value = false;
  }
};

const openLogs = (id) => {
  activeContainerId.value = id;
  isLogsOpen.value = true;
};
</script>
