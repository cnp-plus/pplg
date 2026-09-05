<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import HeroSection from "./components/HeroSection.vue";
import AboutSection from "./components/AboutSection.vue";
import StructureSection from "./components/StructureSection.vue";
import AchievementsSection from "./components/AchievementsSection.vue";
import ActivitiesSection from "./components/ActivitiesSection.vue";
import FooterSection from "./components/FooterSection.vue";
</script>

<template>
  <div
    class="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-sans antialiased selection:bg-primary-100 dark:selection:bg-primary-900 selection:text-primary-900 dark:selection:text-primary-100"
  >
    <!-- Clean, Sticky Navigation -->
    <Navbar />

    <!-- Main Content Flow -->
    <main>
      <HeroSection />
      <AboutSection />
      <StructureSection />
      <AchievementsSection />
      <ActivitiesSection />
    </main>

    <FooterSection />
  </div>
</template>
