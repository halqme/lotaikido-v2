<script setup lang="ts">
defineProps<{
  rank: number;
  filter: string;
  count: number;
  sortEnabled: boolean;
  rankOptions: { value: number; label: string }[];
  filterOptions: { value: string; label: string }[];
}>();

const emit = defineEmits<{
  "update:rank": [value: number];
  "update:filter": [value: string];
  "update:count": [value: number];
  "update:sortEnabled": [value: boolean];
  shuffle: [];
}>();
</script>

<template>
  <section class="form">
    <!-- フィルター群 -->
    <div class="filters">
      <div class="filter-group">
        <select
          id="rank"
          aria-label="級・段位"
          class="sel"
          :value="rank"
          @change="emit('update:rank', Number(($event.target as HTMLSelectElement).value))"
        >
          <option v-for="o in rankOptions" :key="o.value" :value="o.value">
            {{ o.label }}
          </option>
        </select>
        <select
          aria-label="フィルター"
          class="sel sel-sm"
          :value="filter"
          @change="emit('update:filter', ($event.target as HTMLSelectElement).value)"
        >
          <option v-for="o in filterOptions" :key="o.value" :value="o.value">
            {{ o.label }}
          </option>
        </select>
      </div>
      <div class="filter-group">
        <input
          id="count"
          aria-label="表示件数"
          class="num"
          max="50"
          min="1"
          type="number"
          :value="count"
          @input="emit('update:count', Number(($event.target as HTMLInputElement).value) || 10)"
        />
        <span class="unit"> 件 </span>
      </div>
      <label class="check">
        <input
          type="checkbox"
          :checked="sortEnabled"
          @change="emit('update:sortEnabled', ($event.target as HTMLInputElement).checked)"
        />
        ソート
      </label>
      <button class="btn-shuffle" @click="emit('shuffle')">
        <svg height="1em" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg">
          <!-- Icon from Remix Icon by Remix Design - https://github.com/Remix-Design/RemixIcon/blob/master/License -->
          <path
            d="M18 17.883V16l5 3l-5 3v-2.09a9 9 0 0 1-6.997-5.365L11 14.54l-.003.006A9 9 0 0 1 2.725 20H2v-2h.725a7 7 0 0 0 6.434-4.243L9.912 12l-.753-1.757A7 7 0 0 0 2.725 6H2V4h.725a9 9 0 0 1 8.272 5.455L11 9.46l.003-.006A9 9 0 0 1 18 4.09V2l5 3l-5 3V6.117a7 7 0 0 0-5.159 4.126L12.088 12l.753 1.757A7 7 0 0 0 18 17.883"
            fill="currentColor"
          />
        </svg>
        シャッフル
      </button>
    </div>
  </section>
</template>

<style scoped>
.form {
  border-bottom: 1px solid #d4cec6;
}

.filters {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
  padding: 0.85rem 1.25rem;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sel {
  appearance: none;
  padding: 0.35rem 1.8rem 0.35rem 0.5rem;
  border: 1.5px solid #ddd5cc;
  border-radius: 6px;
  font-size: 0.88rem;
  background: #fff
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%23666' d='M5 7L1 3h8z'/%3E%3C/svg%3E")
    right 0.4rem center / 10px no-repeat;
  cursor: pointer;
  min-width: 60px;
}

.sel:focus {
  outline: none;
  border-color: #c0392b;
}

.sel-sm {
  min-width: 60px;
}

.num {
  width: 75px;
  padding: 0.35rem 0.4rem;
  border: 1.5px solid #ddd5cc;
  border-radius: 6px;
  font-size: 0.88rem;
  text-align: center;
}

.num:focus {
  outline: none;
  border-color: #c0392b;
}

.unit {
  font-size: 0.82rem;
  color: #999;
}

.check {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: #555;
  cursor: pointer;
  white-space: nowrap;
}

.check input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #c0392b;
}

.btn-shuffle {
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 50px;
  font-size: 0.88rem;
  font-weight: 600;
  color: #fff;
  background: #c0392b;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-shuffle:hover {
  opacity: 0.85;
}
</style>
