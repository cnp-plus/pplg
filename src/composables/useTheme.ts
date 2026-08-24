import { ref } from "vue";

/**
 * Tema biner (terang/gelap) tanpa opsi "system".
 *
 * - Kunjungan pertama (tanpa preferensi tersimpan): mengikuti
 *   `prefers-color-scheme` — kelas `.dark` dipasang skrip inline di <head>.
 * - Begitu pengguna men-toggle, pilihannya disimpan di localStorage
 *   (`pplg-theme`) dan mengalahkan preferensi sistem.
 */
export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "pplg-theme";

/** Mode aktif saat ini (reaktif; diturunkan dari DOM oleh skrip inline <head>). */
export const themeMode = ref<ThemeMode>(
  typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
    ? "dark"
    : "light",
);

function persist(mode: ThemeMode): void {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    /* noop */
  }
}

/** Ganti terang <-> gelap, terapkan ke DOM, dan simpan pilihan pengguna. */
export function toggleTheme(): void {
  const next: ThemeMode = themeMode.value === "dark" ? "light" : "dark";
  themeMode.value = next;
  document.documentElement.classList.toggle("dark", next === "dark");
  persist(next);
}
