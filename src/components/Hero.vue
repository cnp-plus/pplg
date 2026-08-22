<script setup lang="ts">
import { classConfig, statsData } from "../data/classData";
import { ArrowRight } from "lucide-vue-next";
</script>

<template>
  <section
    class="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 pt-16 pb-20 md:pt-24 md:pb-28 border-b border-neutral-200 dark:border-neutral-700/50"
  >
    <div class="max-w-6xl mx-auto px-6 sm:px-8">
      <!-- Editorial Typography Hero -->
      <div class="max-w-4xl space-y-8">
        <!-- Subtle Context Line -->
        <div
          class="flex items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest"
        >
          <span>{{ classConfig.schoolName }}</span>
          <span>/</span>
          <span class="text-primary-700 dark:text-primary-300 font-bold"
            >Angkatan 2024–2027</span
          >
        </div>

        <!-- Headline -->
        <h1
          class="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 leading-[1.08]"
        >
          Pengembangan Perangkat Lunak & Gim
          <span class="text-primary-700 dark:text-primary-300">(PPLG 1)</span>
        </h1>

        <!-- Subtitle -->
        <p
          class="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-2xl"
        >
          {{ classConfig.tagline }} Tempat 36 siswa menempa logika pemrograman,
          membangun arsitektur web & mobile, serta merancang mekanika gim
          interaktif.
        </p>

        <!-- CTA Action Row -->
        <div class="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="#tentang"
            class="inline-flex items-center gap-2 px-6 py-3.5 rounded text-sm font-medium text-white bg-primary-700 hover:bg-primary-900 dark:bg-primary-600 dark:hover:bg-primary-500 transition-colors shadow-sm"
          >
            <span>Kenali Kelas Kami</span>
            <ArrowRight class="w-4 h-4" />
          </a>

          <a
            href="#prestasi"
            class="inline-flex items-center gap-2 px-6 py-3.5 rounded text-sm font-medium text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors border border-neutral-300 dark:border-neutral-600"
          >
            <span>Lihat Prestasi Kami</span>
          </a>
        </div>
      </div>

      <!-- Clean Metrics Ledger (Replacing floating cards) -->
      <div
        class="mt-20 pt-10 border-t border-neutral-200 dark:border-neutral-700/50 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        <div v-for="(stat, idx) in statsData" :key="idx" class="space-y-1">
          <div
            class="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 font-mono tracking-tight"
          >
            {{ stat.value }}
          </div>
          <div
            class="text-sm font-semibold text-neutral-800 dark:text-neutral-200"
          >
            {{ stat.label }}
          </div>
          <div class="text-xs text-neutral-500 dark:text-neutral-400">
            {{ stat.sublabel }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
