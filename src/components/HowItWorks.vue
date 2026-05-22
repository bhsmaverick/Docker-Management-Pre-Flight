<template>
  <section class="max-w-7xl mx-auto px-6 pb-20 md:pb-32">
    <h2 class="text-3xl font-semibold text-white mb-16 text-center tracking-tight">{{ $t('landing.how_it_works_title') }}</h2>
    
    <div class="relative">
      <!-- Vertical line timeline -->
      <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-zinc-800 border-dashed md:-translate-x-1/2 hidden sm:block"></div>

      <div class="space-y-16">
        <!-- Step 1 -->
        <div class="relative flex flex-col md:flex-row items-center md:justify-between group">
          <div class="md:w-5/12 flex md:justify-end text-left md:text-right pl-20 md:pl-0 w-full">
            <div class="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl hover:border-zinc-700 transition w-full">
              <h3 class="text-xl font-medium text-white mb-3">{{ $t('landing.step_1_title') }}</h3>
              <p class="text-zinc-400 leading-relaxed">{{ $t('landing.step_1_desc') }}</p>
            </div>
          </div>
          <div class="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-zinc-950 border-2 border-indigo-500 flex items-center justify-center text-indigo-400 font-bold z-10 shadow-[0_0_15px_rgba(79,70,229,0.4)] group-hover:bg-indigo-500 group-hover:text-white transition">
            1
          </div>
          <div class="md:w-5/12 hidden md:block"></div>
        </div>

        <!-- Step 2 -->
        <div class="relative flex flex-col md:flex-row items-center md:justify-between group">
          <div class="md:w-5/12 hidden md:block"></div>
          <div class="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-zinc-950 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 font-bold z-10 shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:bg-emerald-500 group-hover:text-white transition">
            2
          </div>
          <div class="md:w-5/12 pl-20 md:pl-0 text-left w-full">
            <div class="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl hover:border-zinc-700 transition w-full">
              <h3 class="text-xl font-medium text-white mb-3">{{ $t('landing.step_2_title') }}</h3>
              <p class="text-zinc-400 leading-relaxed">{{ $t('landing.step_2_desc') }}</p>
            </div>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="relative flex flex-col md:flex-row items-center md:justify-between group">
          <div class="md:w-5/12 flex md:justify-end text-left md:text-right pl-20 md:pl-0 w-full">
            <div class="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl hover:border-zinc-700 transition w-full">
              <h3 class="text-xl font-medium text-white mb-3">{{ $t('landing.step_3_title') }}</h3>
              <p class="text-zinc-400 leading-relaxed">{{ $t('landing.step_3_desc') }}</p>
            </div>
          </div>
          <div class="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-zinc-950 border-2 border-orange-500 flex items-center justify-center text-orange-400 font-bold z-10 shadow-[0_0_15px_rgba(249,115,22,0.4)] group-hover:bg-orange-500 group-hover:text-white transition">
            3
          </div>
          <div class="md:w-5/12 hidden md:block"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
