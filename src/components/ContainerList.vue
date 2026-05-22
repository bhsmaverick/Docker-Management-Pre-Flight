<template>
  <div class="space-y-6">
    <div v-if="isLoading" class="flex justify-center py-12">
      <svg class="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <div v-else-if="containers.length === 0" class="text-center py-12 text-zinc-500 border border-zinc-800/50 rounded-2xl border-dashed">
      {{ $t('dashboard.no_containers') }}
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div 
        v-for="container in containers" 
        :key="container.Id"
        class="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 hover:border-zinc-700/80 transition-colors relative overflow-hidden flex flex-col"
      >
        <div class="flex items-start justify-between mb-6">
          <div class="truncate pr-4">
            <h4 class="font-medium text-lg text-white truncate">{{ formatName(container.Names[0]) }}</h4>
            <p class="text-xs font-mono text-zinc-500 mt-1 truncate">{{ container.Image }}</p>
          </div>
          <div class="flex items-center gap-2 px-2.5 py-1.5 rounded-full text-xs font-medium bg-zinc-950 border border-zinc-800">
            <span class="w-2 h-2 rounded-full" :class="container.State === 'running' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500'"></span>
            <span :class="container.State === 'running' ? 'text-emerald-400' : 'text-rose-400'">
              {{ container.State === 'running' ? $t('dashboard.state_running') : $t('dashboard.state_exited') }}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-3 mt-auto pt-5 border-t border-zinc-800/50">
          <button 
            @click="emit('view-logs', container.Id)"
            class="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium py-2.5 rounded-xl transition-colors text-center"
          >
            {{ $t('dashboard.view_system_logs') }}
          </button>
          <button 
            @click="restartContainer(container.Id)"
            :disabled="restartingIds.includes(container.Id)"
            class="flex-1 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 hover:border-indigo-500/40 text-sm font-medium py-2.5 rounded-xl transition-colors text-center flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <svg v-if="restartingIds.includes(container.Id)" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-else>{{ $t('dashboard.restart_container') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import apiClient from '../api/client';

const { t } = useI18n();
const containers = ref([]);
const isLoading = ref(true);
const restartingIds = ref([]);
const emit = defineEmits(['view-logs', 'notify']);

const formatName = (name) => {
  return name ? name.replace(/^\//, '') : 'Unknown';
};

const fetchContainers = async () => {
  try {
    const res = await apiClient.get('/system/containers');
    containers.value = res.data || [];
  } catch (err) {
    emit('notify', { type: 'error', text: t('dashboard.error_connection') });
  } finally {
    isLoading.value = false;
  }
};

const restartContainer = async (id) => {
  restartingIds.value.push(id);
  try {
    await apiClient.post(`/system/admin/restart/${id}`);
    emit('notify', { type: 'success', text: t('dashboard.restart_success_msg') });
    await fetchContainers();
  } catch (err) {
    if (err.response?.status === 403) {
      emit('notify', { type: 'error', text: t('dashboard.error_access_denied') });
    } else {
      emit('notify', { type: 'error', text: err.response?.data?.error || 'Restart failed' });
    }
  } finally {
    restartingIds.value = restartingIds.value.filter(containerId => containerId !== id);
  }
};

onMounted(() => {
  fetchContainers();
});
</script>
