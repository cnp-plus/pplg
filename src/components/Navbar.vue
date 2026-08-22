<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { classConfig, navItems } from '../data/classData';
import { Menu, X } from 'lucide-vue-next';

const isMenuOpen = ref(false);
const isScrolled = ref(false);
const activeSection = ref('');

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;

  const sections = navItems.map(item => item.href.substring(1));
  const scrollPosition = window.scrollY + 120;

  for (const section of sections) {
    const el = document.getElementById(section);
    if (el) {
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeSection.value = section;
        break;
      }
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-all duration-200 border-b"
    :class="[
      isScrolled
        ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-neutral-200 dark:border-neutral-700/50 shadow-sm py-3'
        : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700/50 py-4'
    ]"
  >
    <div class="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
      
      <!-- Clean Brand Identity -->
      <a 
        href="#" 
        class="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-primary-700 rounded"
        aria-label="Beranda PPLG 1"
      >
        <div class="w-9 h-9 bg-primary-700 text-white font-mono font-bold text-sm flex items-center justify-center rounded">
          P1
        </div>
        <div class="flex flex-col">
          <span class="font-mono text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
            {{ classConfig.className }}
          </span>
          <span class="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
            {{ classConfig.schoolName }}
          </span>
        </div>
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-6" aria-label="Navigasi Utama">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-700 rounded px-1 py-0.5"
          :class="[
            activeSection === item.href.substring(1)
              ? 'text-primary-700 dark:text-primary-300 font-semibold'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          ]"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- Mobile Controls -->
      <div class="flex items-center gap-2 md:hidden">
        <button
          type="button"
          @click="toggleMenu"
          class="p-2 rounded text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-700"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Menu navigasi"
        >
          <Menu v-if="!isMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>

    </div>

    <!-- Mobile Drawer -->
    <div
      v-if="isMenuOpen"
      id="mobile-menu"
      class="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700/50 px-6 py-4 shadow-lg space-y-3"
    >
      <a
        v-for="item in navItems"
        :key="item.href"
        :href="item.href"
        @click="closeMenu"
        class="block py-2 text-base font-medium text-neutral-800 dark:text-neutral-200 hover:text-primary-700 dark:hover:text-primary-300 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
      >
        {{ item.label }}
      </a>
    </div>
  </header>
</template>
