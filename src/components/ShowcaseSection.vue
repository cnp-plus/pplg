<script setup lang="ts">
import { achievementsData } from '../data/classData';
import { Trophy } from 'lucide-vue-next';
</script>

<template>
  <section id="prestasi" class="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-800/40 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700/50">
    <div class="max-w-6xl mx-auto px-6 sm:px-8">
      
      <!-- Section Header -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        <div class="lg:col-span-5 space-y-3">
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
            Prestasi Kelas
          </h2>
        </div>
        <div class="lg:col-span-7">
          <p class="text-neutral-600 dark:text-neutral-400 text-base">
            Rekam jejang kompetisi dan penghargaan yang diraih oleh siswa PPLG 1 di tingkat kota hingga nasional.
          </p>
        </div>
      </div>

      <!-- Achievements Ledger -->
      <div class="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/60 rounded-lg p-8">
        <div class="flex items-center gap-3 mb-10 pb-4 border-b border-neutral-100 dark:border-neutral-700/60">
          <Trophy class="w-6 h-6 text-primary-700 dark:text-primary-300" />
          <h3 class="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-mono uppercase tracking-tight">Rekam Jejak Prestasi</h3>
        </div>

        <div class="space-y-8">
          <div
            v-for="ach in achievementsData"
            :key="ach.id"
            class="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-neutral-100 dark:border-neutral-700/60 pb-6 last:border-0 last:pb-0"
          >
            <div class="space-y-1">
              <div class="flex items-center gap-3 flex-wrap">
                <span class="text-xs font-mono font-bold text-primary-700 dark:text-primary-300">{{ ach.year }}</span>
                <h4 class="font-bold text-neutral-900 dark:text-neutral-100 text-base">{{ ach.title }}</h4>
              </div>
              <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ ach.event }}</p>
            </div>
            <div class="text-right">
              <div class="text-xs font-mono text-neutral-900 dark:text-neutral-100 font-bold uppercase">{{ ach.rank }}</div>
              <p class="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">Oleh: {{ ach.recipients.join(', ') }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
