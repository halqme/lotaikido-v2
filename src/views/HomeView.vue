<script setup lang="ts">
import { ref } from "vue";
import { useGenerator } from "@/composables/useGenerator";
import GeneratorForm from "@/components/GeneratorForm.vue";
import TagInput from "@/components/TagInput.vue";
import TechniqueTable from "@/components/TechniqueTable.vue";

const gen = useGenerator();

const copied = ref(false);

async function handleShare() {
  await gen.share();
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<template>
  <div class="home">
    <GeneratorForm
      :rank="gen.rank.value"
      :filter="gen.filter.value"
      :count="gen.count.value"
      :sort-enabled="gen.sortEnabled.value"
      :rank-options="gen.rankOptions"
      :filter-options="gen.filterOptions"
      @update:rank="gen.rank.value = $event"
      @update:filter="gen.filter.value = $event"
      @update:count="gen.count.value = $event"
      @update:sort-enabled="gen.sortEnabled.value = $event"
      @shuffle="gen.shuffle()"
    />

    <TagInput
      :model-value="gen.positive.value"
      type="positive"
      placeholder="包含する技名を入力"
      @update:model-value="gen.positive.value = $event"
    />
    <TagInput
      :model-value="gen.negative.value"
      type="negative"
      placeholder="除外する技名を入力"
      @update:model-value="gen.negative.value = $event"
    />

    <TechniqueTable :techniques="gen.techniques.value" />

    <div class="share-row">
      <button class="btn-share" :class="{ copied }" @click="handleShare">
        {{ copied ? "✓ URLコピー完了" : "🔗 このリストを共有" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.share-row {
  display: flex;
  justify-content: center;
  padding: 0.5rem 1.25rem 1.25rem;
}

.btn-share {
  padding: 0.5rem 1rem;
  border: 1.5px solid #d4cec6;
  border-radius: 6px;
  font-size: 0.88rem;
  background: #fff;
  color: #555;
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s;
}

.btn-share:hover {
  border-color: #c0392b;
  color: #c0392b;
}

.btn-share.copied {
  border-color: #27ae60;
  color: #27ae60;
}
</style>
