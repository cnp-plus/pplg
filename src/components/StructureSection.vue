<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { gradeStructures } from "../data/classData";
import type { GradeStructure } from "../data/types";
import { IconInstagram } from "./icons/social";
import { useScrollReveal, reRevealGrid } from "../composables/useReveal";

const grades = [12, 11, 10] as const;
const activeGrade = ref<10 | 11 | 12>(12);

const activeStructure = computed<GradeStructure | undefined>(() =>
  gradeStructures.find((g) => g.grade === activeGrade.value),
);

const sectionRef = ref<HTMLElement | null>(null);
const rosterRef = ref<HTMLElement | null>(null);
let io: IntersectionObserver | null = null;

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function gradeLabel(g: number): string {
  return `Kelas ${g}`;
}

// Re-reveal cards on tab switch
watch(activeGrade, () => {
  // Next tick: DOM has updated with new grade's roster
  setTimeout(() => {
    if (rosterRef.value) {
      reRevealGrid(rosterRef.value);
    }
  }, 10);
});

onMounted(() => {
  if (sectionRef.value) {
    io = useScrollReveal(sectionRef.value, {
      selector: '[data-reveal]',
      duration: 400,
      staggerMs: 30,
    });
  }
});

onUnmounted(() => {
  io?.disconnect();
});
</script>

<template>
  <section
    id="struktur"
    ref="sectionRef"
    class="py-20 lg:py-28 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700/50"
  >
    <div class="max-w-6xl mx-auto px-6 sm:px-8">
      <!-- Section Header -->
      <div class="max-w-3xl mb-12 space-y-3">
        <h2
          class="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          Struktur Pengurus & Angkatan
        </h2>
        <p class="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg">
          Wali kelas, struktur kelas dan daftar murid.
        </p>
      </div>

      <!-- Grade Switcher -->
      <div class="mb-12" role="tablist" aria-label="Pilih kelas">
        <div
          class="flex gap-1 border-b border-neutral-200 dark:border-neutral-700/60"
        >
          <button
            v-for="g in grades"
            :key="g"
            role="tab"
            :aria-selected="activeGrade === g"
            :aria-controls="`panel-kelas-${g}`"
            class="px-5 py-3 text-sm font-mono font-semibold tracking-wide transition-colors duration-200 border-b-2 -mb-px"
            :class="[
              activeGrade === g
                ? 'text-primary-700 dark:text-primary-300 border-primary-700 dark:border-primary-300'
                : 'text-neutral-500 dark:text-neutral-400 border-transparent hover:text-neutral-800 dark:hover:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-600',
            ]"
            @click="activeGrade = g"
            @keydown.left.prevent="
              activeGrade =
                grades[Math.min(grades.indexOf(g) + 1, grades.length - 1)]
            "
            @keydown.right.prevent="
              activeGrade = grades[Math.max(grades.indexOf(g) - 1, 0)]
            "
          >
            {{ gradeLabel(g) }}
          </button>
        </div>
      </div>

      <!-- Grade Panel -->
      <div
        v-if="activeStructure"
        :id="`panel-kelas-${activeStructure.grade}`"
        role="tabpanel"
        class="space-y-16"
      >
        <!-- Wali Kelas Cards (Both Semesters Side by Side) -->
        <div data-reveal>
          <h3
            class="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-mono border-b border-neutral-200 dark:border-neutral-700/60 pb-2 mb-6"
          >
            Wali Kelas
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              v-for="wk in activeStructure.waliKelas"
              :key="wk.semester"
              class="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/60 rounded-lg p-6 flex flex-col items-center text-center space-y-3"
            >
              <!-- Avatar -->
              <div
                class="w-16 h-16 rounded-full overflow-hidden bg-primary-700 dark:bg-primary-600 flex items-center justify-center text-white font-bold text-lg shrink-0"
              >
                <img
                  v-if="wk.avatarUrl"
                  :src="wk.avatarUrl"
                  :alt="`Foto ${wk.name}`"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
                <template v-else>{{ initials(wk.name) }}</template>
              </div>
              <!-- Name -->
              <span
                class="font-bold text-neutral-900 dark:text-neutral-100 text-base"
                >{{ wk.name }}</span
              >
              <!-- Subject -->
              <span
                class="text-xs font-mono text-primary-700 dark:text-primary-300"
                >{{ wk.subject }}</span
              >
            </div>
          </div>
        </div>

        <!-- Roster Grid: Officers + Students -->
        <div ref="rosterRef">
          <h3
            class="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-mono border-b border-neutral-200 dark:border-neutral-700/60 pb-2 mb-6"
          >
            Daftar Murid
          </h3>

          <!-- Officer Pair -->
          <div class="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div
              v-for="(officer, i) in activeStructure.officers"
              :key="officer.name"
              data-tab-reveal
              :class="i === 0 ? 'md:col-start-2' : ''"
              class="bg-neutral-50 dark:bg-neutral-800 border border-primary-200 dark:border-primary-700/40 rounded-lg p-4 flex flex-col items-center text-center space-y-3 transition-colors duration-200 hover:border-primary-300 dark:hover:border-primary-600/50"
            >
              <span
                class="text-[10px] font-mono font-bold text-primary-700 dark:text-primary-300 uppercase tracking-widest"
              >
                {{ officer.role }}
              </span>
              <div
                class="w-14 h-14 rounded-full overflow-hidden bg-primary-700 dark:bg-primary-600 flex items-center justify-center text-white font-bold text-base shrink-0"
              >
                <img
                  v-if="officer.avatarUrl"
                  :src="officer.avatarUrl"
                  :alt="`Foto ${officer.name}`"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
                <template v-else>{{ initials(officer.name) }}</template>
              </div>
              <span
                class="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-tight truncate w-full"
                :title="officer.name"
              >
                {{ officer.name }}
              </span>
              <div class="h-5">
                <a
                  v-if="officer.igUsername"
                  :href="`https://instagram.com/${officer.igUsername}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  :aria-label="`Instagram ${officer.name}`"
                >
                  <IconInstagram class="w-3.5 h-3.5" />
                  <span>{{ officer.igUsername }}</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Student Cards -->
          <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div
              v-for="student in activeStructure.students"
              :key="student.name"
              data-tab-reveal
              class="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/60 rounded-lg p-4 flex flex-col items-center text-center space-y-3 transition-colors duration-200 hover:border-neutral-300 dark:hover:border-neutral-500"
            >
              <div
                class="w-14 h-14 rounded-full overflow-hidden bg-neutral-700 dark:bg-neutral-600 flex items-center justify-center text-white font-bold text-base shrink-0"
              >
                <img
                  v-if="student.avatarUrl"
                  :src="student.avatarUrl"
                  :alt="`Foto ${student.name}`"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
                <template v-else>{{ initials(student.name) }}</template>
              </div>
              <span
                class="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-tight truncate w-full"
                :title="student.name"
              >
                {{ student.name }}
              </span>
              <div class="h-5">
                <a
                  v-if="student.igUsername"
                  :href="`https://instagram.com/${student.igUsername}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  :aria-label="`Instagram ${student.name}`"
                >
                  <IconInstagram class="w-3.5 h-3.5" />
                  <span>{{ student.igUsername }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
