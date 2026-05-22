<template>
  <div class="min-h-screen flex items-center justify-center bg-zinc-950 p-6 font-sans">
    <div class="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
      <!-- Decorative background glow -->
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"></div>
      
      <h2 class="text-3xl font-semibold tracking-tight text-white mb-8 text-center">{{ $t('auth.register_heading') }}</h2>
      
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-zinc-400">{{ $t('auth.email_label') }}</label>
          <input 
            v-model="email" 
            type="email" 
            required 
            :placeholder="$t('auth.email_placeholder')"
            class="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-zinc-400">{{ $t('auth.password_label') }}</label>
          <input 
            v-model="password" 
            type="password" 
            required 
            :placeholder="$t('auth.password_placeholder')"
            class="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-zinc-400">{{ $t('auth.password_confirm_label') }}</label>
          <input 
            v-model="passwordConfirm" 
            type="password" 
            required 
            :placeholder="$t('auth.password_placeholder')"
            class="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </div>

        <div v-if="errorMsg" class="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm leading-relaxed">
          <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p>{{ errorMsg }}</p>
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(79,70,229,0.2)]"
        >
          <span v-if="!isLoading">{{ $t('auth.submit_register') }}</span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const errorMsg = ref('');
const isLoading = ref(false);

const handleRegister = async () => {
  errorMsg.value = '';
  
  if (password.value !== passwordConfirm.value) {
    errorMsg.value = t('auth.error_password_mismatch');
    return;
  }

  // Very basic check matching the dictionary's stated policy
  const hasSpecials = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (password.value.length < 8 || !hasSpecials.test(password.value)) {
    errorMsg.value = t('auth.error_password_validation');
    return;
  }
  
  if (!email.value.includes('@')) {
    errorMsg.value = t('auth.error_email_validation');
    return;
  }

  isLoading.value = true;
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    });
    
    if (!res.ok) {
      throw new Error('Registration failed');
    }
    
    // Simulate successful navigation or auto-login step
    const data = await res.json();
    console.log(data.message);

  } catch (err) {
    errorMsg.value = t('auth.error_auth_failed');
  } finally {
    isLoading.value = false;
  }
};
</script>
