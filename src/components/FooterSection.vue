<script setup lang="ts">
import { ref } from "vue";
import { classConfig } from "../data/classData";
import { Mail, Instagram, Github, CheckCircle2 } from "lucide-vue-next";

const formSubmitted = ref(false);
const formData = ref({
  name: "",
  email: "",
  subject: "Tanya/Kerjasama",
  message: "",
});

const handleSubmit = () => {
  if (!formData.value.name || !formData.value.email || !formData.value.message)
    return;

  // Situs statis tanpa backend: susun email ke pengurus kelas via mailto.
  const subject = encodeURIComponent(
    `[Website PPLG 1] ${formData.value.subject || "Pesan dari website"}`,
  );
  const body = encodeURIComponent(
    `Nama: ${formData.value.name}\nEmail: ${formData.value.email}\n\n${formData.value.message}`,
  );
  window.location.href = `mailto:${classConfig.contact.email}?subject=${subject}&body=${body}`;

  formSubmitted.value = true;
  setTimeout(() => {
    formSubmitted.value = false;
    formData.value = {
      name: "",
      email: "",
      subject: "Tanya/Kerjasama",
      message: "",
    };
  }, 4000);
};

const instagramHandle =
  classConfig.socials.instagram.replace(/\/$/, "").split("/").pop() ?? "";
const githubPath = classConfig.socials.github
  .replace(/^https?:\/\/(www\.)?/, "")
  .replace(/\/$/, "");
</script>

<template>
  <footer
    id="kontak"
    class="bg-neutral-900 text-white pt-24 pb-12 border-t border-neutral-800 dark:border-neutral-700"
  >
    <div class="max-w-6xl mx-auto px-6 sm:px-8">
      <!-- Footer Grid -->
      <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-16 border-b border-neutral-800 dark:border-neutral-700/60"
      >
        <!-- Left: Branding & Contact Info -->
        <div class="lg:col-span-5 space-y-10">
          <div class="space-y-4">
            <div
              class="w-12 h-12 bg-primary-700 text-white font-mono font-bold text-lg flex items-center justify-center rounded"
            >
              P1
            </div>
            <div class="space-y-2">
              <h3 class="text-3xl font-extrabold tracking-tight">
                {{ classConfig.className }}
              </h3>
              <p class="text-sm text-neutral-400 font-mono">
                {{ classConfig.schoolName }}
              </p>
            </div>
          </div>

          <div class="space-y-6">
            <div class="space-y-4 text-sm text-neutral-300">
              <div class="flex items-start gap-4">
                <Mail class="w-5 h-5 text-primary-300 shrink-0" />
                <div class="space-y-1">
                  <span
                    class="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest"
                    >Email</span
                  >
                  <span class="font-medium">{{
                    classConfig.contact.email
                  }}</span>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <Instagram class="w-5 h-5 text-primary-300 shrink-0" />
                <div class="space-y-1">
                  <span
                    class="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest"
                    >Media Sosial</span
                  >
                  <a
                    :href="classConfig.socials.instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-medium hover:text-white transition-colors"
                    >{{ instagramHandle }}</a
                  >
                </div>
              </div>
              <div class="flex items-start gap-4">
                <Github class="w-5 h-5 text-primary-300 shrink-0" />
                <div class="space-y-1">
                  <span
                    class="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest"
                    >Source Code</span
                  >
                  <a
                    :href="classConfig.socials.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-medium hover:text-white transition-colors"
                    >{{ githubPath }}</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Message Form -->
        <div class="lg:col-span-7">
          <div class="mb-8 space-y-2">
            <h4 class="text-xl font-bold font-mono uppercase tracking-tight">
              Hubungi Kami
            </h4>
            <p class="text-sm text-neutral-400">
              Gunakan formulir ini untuk pertanyaan seputar kerjasama atau
              kunjungan industri.
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="space-y-1.5">
                <label
                  class="text-[10px] font-mono text-neutral-500 uppercase tracking-wider"
                  >Nama</label
                >
                <input
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full bg-neutral-800 dark:bg-neutral-800 border-0 border-b border-neutral-700 py-3 text-sm focus:ring-0 focus:border-primary-500 transition-colors placeholder-neutral-600"
                  placeholder="Nama Lengkap"
                />
              </div>
              <div class="space-y-1.5">
                <label
                  class="text-[10px] font-mono text-neutral-500 uppercase tracking-wider"
                  >Email</label
                >
                <input
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full bg-neutral-800 dark:bg-neutral-800 border-0 border-b border-neutral-700 py-3 text-sm focus:ring-0 focus:border-primary-500 transition-colors placeholder-neutral-600"
                  placeholder="alamat@email.com"
                />
              </div>
            </div>

            <div class="space-y-1.5">
              <label
                class="text-[10px] font-mono text-neutral-500 uppercase tracking-wider"
                >Pesan</label
              >
              <textarea
                v-model="formData.message"
                required
                rows="3"
                class="w-full bg-neutral-800 dark:bg-neutral-800 border-0 border-b border-neutral-700 py-3 text-sm focus:ring-0 focus:border-primary-500 transition-colors placeholder-neutral-600"
                placeholder="Tulis pesan Anda..."
              ></textarea>
            </div>

            <div class="flex items-center gap-6">
              <button
                type="submit"
                class="px-8 py-3 bg-white text-neutral-900 text-xs font-mono font-bold hover:bg-primary-100 dark:hover:bg-primary-300 transition-colors"
              >
                KIRIM SEKARANG
              </button>

              <transition
                enter-active-class="transition duration-200"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
              >
                <span
                  v-if="formSubmitted"
                  class="inline-flex items-center gap-2 text-xs font-mono text-accent-success"
                >
                  <CheckCircle2 class="w-4 h-4" />
                  <span>Membuka aplikasi email Anda&hellip;</span>
                </span>
              </transition>
            </div>
          </form>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div
        class="pt-10 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-widest gap-4"
      >
        <div>
          &copy; {{ new Date().getFullYear() }}
          {{ classConfig.className }} &middot;
          {{ classConfig.schoolName.toUpperCase() }}.
        </div>
        <div class="flex items-center gap-6">
          <a href="#" class="hover:text-white transition-colors">UP ↑</a>
          <span>Dibuat Oleh Hasan</span>
        </div>
      </div>
    </div>
  </footer>
</template>
