<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { tags } from '@/store.js';

// Filter options come from the CMS gate (paths.ts) via Search.astro props —
// no config-file tag list.
const props = defineProps<{ options: { label: string; value: string }[] }>();

const selectedTags = useStore(tags);

function toggleTag(tag: string) {
  if (!tag) return;

  if (!selectedTags.value.includes(tag as never)) {
    tags.set([...selectedTags.value, tag] as never[]);
  }
  else {
    let filtered = selectedTags.value.filter(e => e !== tag);
    tags.set([...filtered]);
  }
}
</script>

<template>
  <div class="flex flex-wrap gap-2 mt-4">
    <button
      type="button"
      v-for="option in props.options"
      :key="option.value"
      class="border border-gray-200 rounded-md px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-900 dark:border-gray-600 cursor-pointer select-none text-xs font-semibold"
      :class="selectedTags.includes(option.value) ? 'border-primary-500 dark:border-primary-300' : ''"
      :aria-pressed="selectedTags.includes(option.value)"
      @click="toggleTag(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>