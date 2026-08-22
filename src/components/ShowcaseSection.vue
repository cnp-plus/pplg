<script setup lang="ts">
import { showcaseProjects, achievementsData } from '../data/classData';
import { ArrowUpRight, Github, Trophy } from 'lucide-vue-next';

const getStatusColor = (statusType: string) => {
  switch (statusType) {
    case 'highlight': return 'text-primary-700 border-primary-200 bg-primary-50';
    case 'success': return 'text-accent-success border-accent-success/20 bg-accent-success/5';
    case 'warning': return 'text-accent-warning border-accent-warning/20 bg-accent-warning/5';
    default: return 'text-neutral-500 border-neutral-200 bg-neutral-50';
  }
};
</script>

<template>
  <section id="karya" class="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-800/40 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700/50">
    <div class="max-w-6xl mx-auto px-6 sm:px-8">
      
      <!-- Section Header -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        <div class="lg:col-span-5 space-y-3">
          <span class="text-xs font-mono uppercase tracking-widest text-primary-700 dark:text-primary-300 font-bold">03 / Karya & Prestasi</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
            Showcase Karya & Capaian
          </h2>
        </div>
        <div class="lg:col-span-7">
          <p class="text-neutral-600 dark:text-neutral-400 text-base">
            Kumpulan artefak digital yang dibangun oleh siswa PPLG 1, mulai dari purwarupa aplikasi hingga gim yang telah meraih pengakuan di tingkat kompetisi.
          </p>
        </div>
      </div>

      <!-- Projects: Asymmetric List (Replacing uniform grid) -->
      <div class="space-y-12 mb-24">
        <div
          v-for="project in showcaseProjects"
          :key="project.id"
          class="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-neutral-200 dark:border-neutral-700/60 pb-12 last:border-0"
        >
          <!-- Metadata Column -->
          <div class="lg:col-span-3 space-y-2">
            <span class="text-[10px] font-mono font-bold text-primary-700 dark:text-primary-300 uppercase tracking-widest block">
              {{ project.category }}
            </span>
            <div 
              class="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold border"
              :class="getStatusColor(project.statusType)"
            >
              {{ project.status.toUpperCase() }}
            </div>
          </div>

          <!-- Title & Description Column -->
          <div class="lg:col-span-6 space-y-4">
            <h3 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
              {{ project.title }}
            </h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in project.tags" :key="tag" class="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">#{{ tag }}</span>
            </div>
          </div>

          <!-- Actions Column -->
          <div class="lg:col-span-3 flex lg:justify-end items-center gap-4">
            <a
              v-if="project.repoUrl"
              :href="project.repoUrl"
              target="_blank"
              class="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
              title="GitHub Repository"
            >
              <Github class="w-5 h-5" />
            </a>
            <a
              v-if="project.demoUrl"
              :href="project.demoUrl"
              target="_blank"
              class="inline-flex items-center gap-2 text-xs font-bold text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-100 font-mono"
            >
              LIHAT DEMO
              <ArrowUpRight class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <!-- Achievements Ledger (Replacing card grid) -->
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
