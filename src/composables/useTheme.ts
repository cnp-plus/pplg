import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Sun, Moon, Monitor } from 'lucide-vue-next';

export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'pplg-theme';
const THEME_ORDER: ThemeMode[] = ['system', 'light', 'dark'];

const themeMode = ref<ThemeMode>('system');
let mediaQuery: MediaQueryList | null = null;

function getSystemPrefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyThemeClass() {
  const effective =
    themeMode.value === 'system'
      ? (getSystemPrefersDark() ? 'dark' : 'light')
      : themeMode.value;

  document.documentElement.classList.toggle('dark', effective === 'dark');
}

function handleSystemChange() {
  if (themeMode.value === 'system') {
    applyThemeClass();
  }
}

function persistAndApply(mode: ThemeMode) {
  themeMode.value = mode;
  try { localStorage.setItem(STORAGE_KEY, mode); } catch { /* noop */ }
  applyThemeClass();
}

function cycle() {
  const idx = THEME_ORDER.indexOf(themeMode.value);
  persistAndApply(THEME_ORDER[(idx + 1) % THEME_ORDER.length]);
}

const currentIcon = computed(() => {
  switch (themeMode.value) {
    case 'light': return Sun;
    case 'dark': return Moon;
    case 'system': return Monitor;
  }
});

const currentLabel = computed(() => {
  switch (themeMode.value) {
    case 'light': return 'Mode terang';
    case 'dark': return 'Mode gelap';
    case 'system': return 'Ikut sistem';
  }
});

const currentAriaLabel = computed(() => {
  switch (themeMode.value) {
    case 'light': return 'Tema terang aktif. Klik untuk beralih ke mode gelap';
    case 'dark': return 'Tema gelap aktif. Klik untuk beralih ke mode sistem';
    case 'system': return 'Mengikuti tema sistem. Klik untuk beralih ke mode terang';
  }
});

export function useTheme() {
  onMounted(() => {
    // Read persisted preference (default = 'system')
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (stored && THEME_ORDER.includes(stored)) {
        themeMode.value = stored;
      }
    } catch { /* noop */ }

    applyThemeClass();

    // Live-follow system changes when mode is 'system'
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemChange);
  });

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', handleSystemChange);
  });

  return { themeMode, cycle, currentIcon, currentLabel, currentAriaLabel };
}
