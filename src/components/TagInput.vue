<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  modelValue: string[];
  type: "positive" | "negative";
  placeholder?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string[]];
}>();

const inputText = ref("");

const accentColor = props.type === "positive" ? "#b8860b" : "#a0a0a0";

function addTag() {
  const t = inputText.value.trim();
  if (!t || props.modelValue.includes(t)) return;
  emit("update:modelValue", [...props.modelValue, t]);
  inputText.value = "";
}

function removeTag(k: string) {
  emit(
    "update:modelValue",
    props.modelValue.filter((x) => x !== k),
  );
}

function onKey(e: KeyboardEvent) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTag();
  }
}
</script>

<template>
  <div class="tag-input" :style="{ '--c': accentColor }">
    <div class="tag-row">
      <input
        v-model="inputText"
        class="tag-field"
        type="text"
        :placeholder="placeholder || 'Enterで追加'"
        @keydown="onKey"
      />
    </div>
    <div v-if="modelValue.length" class="tags">
      <button
        v-for="tag in modelValue"
        :key="tag"
        class="tag-chip"
        :title="'クリックで削除'"
        @click="removeTag(tag)"
      >
        <span>
          {{ tag }}
        </span>
        <span class="chip-remove">
          <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
            <!-- Icon from Remix Icon by Remix Design - https://github.com/Remix-Design/RemixIcon/blob/master/License -->
            <path
              d="m12 10.587l4.95-4.95l1.414 1.414l-4.95 4.95l4.95 4.95l-1.415 1.414l-4.95-4.95l-4.949 4.95l-1.414-1.415l4.95-4.95l-4.95-4.95L7.05 5.638z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.tag-input {
  padding: 0.65rem 1rem;
  border-bottom: 1px solid #d4cec6;
}

.tag-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.tag-label {
  font-size: 0.82rem;
  color: #888;
  white-space: nowrap;
  min-width: 32px;
}

.tag-field {
  flex: 1;
  padding: 0.4rem 0.6rem;
  border: 1.5px solid #ddd5cc;
  border-radius: 6px;
  font-size: 0.88rem;
  min-width: 0;
}

.tag-field:focus {
  outline: none;
  border-color: var(--c);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.5rem;
}

.tag-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.5rem 0.2rem 0.6rem;
  border: 1.5px solid var(--c);
  border-radius: 20px;
  font-size: 0.82rem;
  background: color-mix(in srgb, var(--c) 8%, transparent);
  color: #444;
  cursor: pointer;
  transition: background 0.15s;
  line-height: 1.3;
}

.tag-chip:hover {
  background: color-mix(in srgb, var(--c) 18%, transparent);
}

.chip-remove {
  font-size: 1rem;
  line-height: 1;
  color: var(--c);
  opacity: 0.7;
}

.tag-chip:hover .chip-remove {
  opacity: 1;
}
</style>
