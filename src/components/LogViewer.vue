<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex justify-end">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close"></div>
    <div class="relative w-full max-w-3xl bg-zinc-950 border-l border-zinc-800 h-full flex flex-col shadow-2xl transform transition-transform">
      <div class="flex items-center justify-between p-6 border-b border-zinc-800/80 bg-zinc-900/50">
        <h3 class="text-lg font-medium text-white flex items-center gap-3">
          <svg class="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          {{ $t('dashboard.logs_title') }}
        </h3>
        <button @click="close" class="text-zinc-500 hover:text-white transition-colors">
          <span class="sr-only">{{ $t('dashboard.close_action') }}</span>
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed text-zinc-400 bg-[#09090b]">
        <div v-if="isLoading" class="flex justify-center items-center h-full">
          <svg class="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <pre v-else class="whitespace-pre-wrap break-words">{{ logs }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import apiClient from '../api/client';

const props = defineProps({
  containerId: String,
  isOpen: Boolean
});

const emit = defineEmits(['close']);
const logs = ref('');
const isLoading = ref(false);

const close = () => {
  emit('close');
};

const fetchLogs = async () => {
  if (!props.containerId) return;
  isLoading.value = true;
  logs.value = '';
  try {
    const res = await apiClient.get(`/system/containers/${props.containerId}/logs`);
    logs.value = res.data.logs || '';
  } catch (err) {
    logs.value = err.response?.data?.error || 'Failed to fetch daemon logs...';
  } finally {
    isLoading.value = false;
  }
};

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    fetchLogs();
  }
});
</script>
