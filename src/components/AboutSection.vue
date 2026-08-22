<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { classConfig, focusAreas } from "../data/classData";
import { BookOpen, MapPin } from "lucide-vue-next";
import { useScrollReveal } from "../composables/useReveal";

const sectionRef = ref<HTMLElement | null>(null);
let io: IntersectionObserver | null = null;

onMounted(() => {
  if (sectionRef.value) {
    io = useScrollReveal(sectionRef.value, {
      selector: '[data-reveal]',
      duration: 400,
      staggerMs: 60,
    });
  }
});

onUnmounted(() => {
  io?.disconnect();
});
</script>

<template>
  <section
    id="tentang"
    ref="sectionRef"
    class="py-20 lg:py-28 bg-neutral-50 dark:bg-neutral-800/40 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700/50"
  >
    <div class="max-w-6xl mx-auto px-6 sm:px-8">
      <!-- Editorial Section Heading -->
      <div
        data-reveal
        class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16"
      >
        <div class="lg:col-span-5 space-y-3">
          <h2
            class="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100"
          >
            Lingkungan Belajar Berbasis Industri
          </h2>
        </div>
        <div class="lg:col-span-7">
          <p
            class="text-neutral-700 dark:text-neutral-300 text-base sm:text-lg leading-relaxed"
          >
            Kurikulum PPLG dirancang selaras dengan kebutuhan industri perangkat
            lunak saat ini. Siswa tidak hanya mempelajari teori algoritma di
            ruang kelas, tetapi juga langsung mempraktikkannya melalui pembuatan
            projek nyata di laboratorium komputer.
          </p>
        </div>
      </div>

      <!-- Editorial Information Grid -->
      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16"
      >
        <!-- School Identity Block -->
        <div
          data-reveal
          class="lg:col-span-6 bg-white dark:bg-neutral-800 p-8 rounded-lg border border-neutral-300 dark:border-neutral-700/60 flex flex-col justify-between space-y-6"
        >
          <div class="space-y-4">
            <div
              class="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase"
            >
              Identitas Kelas
            </div>
            <div>
              <h3
                class="text-2xl font-bold text-neutral-900 dark:text-neutral-100"
              >
                {{ classConfig.className }}
              </h3>
              <p
                class="text-xs font-mono text-primary-700 dark:text-primary-300 mt-1"
              >
                {{ classConfig.academicYear }}
              </p>
            </div>
            <blockquote
              class="text-neutral-700 dark:text-neutral-300 italic border-l-2 border-primary-700 dark:border-primary-400 pl-4 py-1 text-sm sm:text-base"
            >
              "{{ classConfig.tagline }}"
            </blockquote>
          </div>

          <div
            class="pt-6 border-t border-neutral-200 dark:border-neutral-700/60 space-y-2 text-xs font-mono text-neutral-600 dark:text-neutral-400"
          >
            <div class="flex items-center gap-2">
              <BookOpen class="w-4 h-4 text-primary-700 shrink-0" />
              <span>Sekolah: {{ classConfig.schoolName }}</span>
            </div>
            <div class="flex items-center gap-2">
              <MapPin class="w-4 h-4 text-primary-700 shrink-0" />
              <span
                >Lokasi: {{ classConfig.contact.location }} &middot;
                {{ classConfig.room }}</span
              >
            </div>
          </div>
        </div>

        <!-- Specialization Tracks -->
        <div
          data-reveal
          class="lg:col-span-6 bg-white dark:bg-neutral-800 p-8 rounded-lg border border-neutral-300 dark:border-neutral-700/60 flex flex-col justify-between space-y-6"
        >
          <div class="space-y-4">
            <div
              class="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase"
            >
              Tiga Pilar Konsentrasi
            </div>
            <h3
              class="text-xl font-bold text-neutral-900 dark:text-neutral-100"
            >
              Konsentrasi Keahlian
            </h3>

            <div class="space-y-4 pt-2">
              <div
                v-for="focus in focusAreas"
                :key="focus.id"
                class="border-b border-neutral-200 dark:border-neutral-700/60 pb-4 last:border-0 last:pb-0"
              >
                <div class="flex items-center justify-between">
                  <h4
                    class="font-bold text-neutral-900 dark:text-neutral-100 text-base"
                  >
                    {{ focus.title }}
                  </h4>
                  <span
                    class="text-xs font-mono text-primary-700 dark:text-primary-300"
                    >{{ focus.techs.slice(0, 3).join(", ") }}</span
                  >
                </div>
                <p
                  class="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed"
                >
                  {{ focus.description }}
                </p>
              </div>
            </div>
          </div>

          <div
            class="pt-4 border-t border-neutral-200 dark:border-neutral-700/60 text-xs font-mono text-neutral-500 dark:text-neutral-400 flex items-center justify-between"
          >
            <span>Standar Industri Nasional</span>
            <span class="text-accent-success font-semibold"
              >● Terakreditasi A</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
