<script setup lang="ts">
import { classLeaders, divisionsData } from '../data/classData';
</script>

<template>
  <section id="struktur" class="py-20 lg:py-28 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700/50">
    <div class="max-w-6xl mx-auto px-6 sm:px-8">
      
      <!-- Section Header -->
      <div class="max-w-3xl mb-16 space-y-3">
        <span class="text-xs font-mono uppercase tracking-widest text-primary-700 dark:text-primary-300 font-bold">02 / Organisasi Kelas</span>
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
          Struktur Pengurus & Divisi Teknis
        </h2>
        <p class="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg">
          Pengurus kelas mengoordinasikan administrasi harian, sementara divisi teknis memimpin kelompok belajar pemrograman.
        </p>
      </div>

      <!-- Clean Editorial Org Ledger (Replacing uniform avatar cards) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        
        <!-- Left: Officers Table / List -->
        <div class="lg:col-span-7 space-y-6">
          <h3 class="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-mono border-b border-neutral-200 dark:border-neutral-700/60 pb-2">
            Pengurus Harian Kelas
          </h3>

          <div class="divide-y divide-neutral-200 dark:divide-neutral-700/60">
            <div
              v-for="leader in classLeaders"
              :key="leader.role"
              class="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <span class="text-xs font-mono font-bold text-primary-700 dark:text-primary-300 uppercase block sm:inline sm:mr-3">
                  {{ leader.role }}:
                </span>
                <span class="font-bold text-neutral-900 dark:text-neutral-100 text-base">{{ leader.name }}</span>
              </div>
              <div class="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                Fokus: <span class="text-neutral-800 dark:text-neutral-200">{{ leader.focus }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Summary Note -->
        <div class="lg:col-span-5 bg-neutral-50 dark:bg-neutral-800 p-8 rounded-lg border border-neutral-200 dark:border-neutral-700/60 space-y-4">
          <h4 class="font-bold text-neutral-900 dark:text-neutral-100 text-base">Koordinasi & Tanggung Jawab</h4>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Setiap pengurus dipilih melalui musyawarah kelas untuk memastikan kelancaran kegiatan belajar mengajar di laboratorium, pemeliharaan inventaris perangkat, serta penjadwalan piket kebersihan studio.
          </p>
          <div class="pt-4 border-t border-neutral-200 dark:border-neutral-700/60 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            Masa Bakti: 2025 – 2026
          </div>
        </div>

      </div>

      <!-- Technical Divisions Section -->
      <div>
        <h3 class="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-mono border-b border-neutral-200 dark:border-neutral-700/60 pb-2 mb-8">
          Divisi Spesialisasi Koding & Projek
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="div in divisionsData"
            :key="div.id"
            class="bg-neutral-50 dark:bg-neutral-800 p-6 sm:p-8 rounded-lg border border-neutral-200 dark:border-neutral-700/60 flex flex-col justify-between space-y-6"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-primary-700 dark:text-primary-300">{{ div.code }}</span>
                <span class="text-xs font-mono text-neutral-500 dark:text-neutral-400">{{ div.membersCount }} Anggota</span>
              </div>

              <div>
                <h4 class="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">{{ div.name }}</h4>
                <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {{ div.description }}
                </p>
              </div>

              <div class="space-y-1 pt-2 border-t border-neutral-200 dark:border-neutral-700/60">
                <p class="text-xs font-bold text-neutral-800 dark:text-neutral-200">Koordinator: {{ div.lead }}</p>
                <p class="text-xs text-neutral-600 dark:text-neutral-400">Projek: {{ div.currentProject }}</p>
              </div>
            </div>

            <div class="pt-4 border-t border-neutral-200 dark:border-neutral-700/60">
              <span class="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 block mb-2">Stack Utama:</span>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="st in div.stack"
                  :key="st"
                  class="px-2 py-0.5 rounded text-[11px] font-mono bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600"
                >
                  {{ st }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
