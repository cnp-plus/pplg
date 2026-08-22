<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import type { InstagramFeed } from "../data/types";
import { activitiesData, classConfig } from "../data/classData";
import { ArrowUpRight, Play, Copy } from "lucide-vue-next";
import feedData from "../data/instagram.json";
import { useScrollReveal } from "../composables/useReveal";

const feed = feedData as InstagramFeed;
const posts = computed(() => feed.posts);
const hasPosts = computed(() => posts.value.length > 0);

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

function formatDate(iso: string): string {
  const d = new Date(iso);
  const day = d.getDate();
  const month = d.toLocaleString("id-ID", { month: "short" });
  return `${day} ${month}`;
}

function snippet(caption: string, max = 90): string {
  if (caption.length <= max) return caption;
  return caption.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function mediaIcon(type: string) {
  if (type === "VIDEO") return Play;
  if (type === "CAROUSEL_ALBUM") return Copy;
  return null;
}

const igHandle = computed(() => {
  const url = classConfig.socials.instagram;
  const match = url.match(/instagram\.com\/([^/]+)/);
  return match ? `@${match[1]}` : "@pplg1";
});
</script>

<template>
  <section
    id="kegiatan"
    ref="sectionRef"
    class="py-20 lg:py-28 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700/50"
  >
    <div class="max-w-6xl mx-auto px-6 sm:px-8">
      <!-- Section Header -->
      <div data-reveal class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        <div class="lg:col-span-5 space-y-3">
          <h2
            class="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100"
          >
            Kegiatan Terakhir di Instagram
          </h2>
        </div>
        <div class="lg:col-span-7">
          <p class="text-neutral-600 dark:text-neutral-400 text-base">
            Postingan diperbarui otomatis dari instagram
            <a
              :href="classConfig.socials.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary-700 dark:text-primary-300 hover:underline"
              >{{ igHandle }}</a
            >.
          </p>
        </div>
      </div>

      <!-- Instagram Feed Grid -->
      <div
        v-if="hasPosts"
        class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
      >
        <a
          v-for="post in posts"
          :key="post.id"
          data-reveal
          :href="post.permalink"
          target="_blank"
          rel="noopener noreferrer"
          class="group block focus:outline-none focus:ring-2 focus:ring-primary-700 dark:focus:ring-primary-300 rounded-lg"
          :aria-label="`Buka postingan Instagram: ${snippet(post.caption, 50)}`"
        >
          <!-- Image tile -->
          <div
            class="relative aspect-square overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/60"
          >
            <img
              :src="post.mediaUrl"
              :alt="snippet(post.caption, 80)"
              class="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-105 group-hover:brightness-110"
              loading="lazy"
            />

            <!-- Media type indicator -->
            <div
              v-if="mediaIcon(post.mediaType)"
              class="absolute top-2 left-2 w-6 h-6 rounded bg-black/40 flex items-center justify-center"
            >
              <component
                :is="mediaIcon(post.mediaType)"
                class="w-3.5 h-3.5 text-white"
              />
            </div>

            <!-- Arrow cue -->
            <div
              class="absolute top-2 right-2 w-6 h-6 rounded bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ArrowUpRight class="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          <!-- Caption below tile -->
          <div class="mt-3 space-y-1">
            <time
              class="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider"
              :datetime="post.timestamp"
            >
              {{ formatDate(post.timestamp) }}
            </time>
            <p
              class="text-sm text-neutral-700 dark:text-neutral-300 leading-snug line-clamp-2 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-200"
            >
              {{ snippet(post.caption) }}
            </p>
          </div>
        </a>
      </div>

      <!-- Fallback: Editorial Timeline -->
      <div v-else class="space-y-1">
        <div
          v-for="act in activitiesData"
          :key="act.id"
          data-reveal
          class="group flex flex-col md:flex-row gap-6 md:gap-12 py-10 border-t border-neutral-200 dark:border-neutral-700/60 first:border-0"
        >
          <!-- Date Column -->
          <div class="md:w-32 shrink-0">
            <span
              class="text-xs font-mono font-bold text-neutral-400 dark:text-neutral-500 block uppercase tracking-wider"
              >{{ act.date.split(" ").slice(1).join(" ") }}</span
            >
            <span
              class="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 block leading-none mt-1"
              >{{ act.date.split(" ")[0] }}</span
            >
          </div>

          <!-- Content Column -->
          <div class="flex-1 space-y-4">
            <div class="space-y-1">
              <span
                class="text-[10px] font-mono font-bold text-primary-700 dark:text-primary-300 uppercase tracking-widest"
                >{{ act.badge }}</span
              >
              <h3
                class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors"
              >
                {{ act.title }}
              </h3>
            </div>
            <p
              class="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-2xl"
            >
              {{ act.description }}
            </p>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="tg in act.tags"
                :key="tg"
                class="text-[11px] font-mono text-neutral-400 dark:text-neutral-500"
                >#{{ tg.toUpperCase() }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
