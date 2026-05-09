<script setup lang="ts">
import type { WazaType } from "@/utils/types";

defineProps<{
  techniques: WazaType[];
}>();

function toRank(rank: number): string {
  if (rank >= 1) return `${rank}級`;
  if (rank <= -1) {
    const k = ["", "初", "二", "三", "四", "五", "六", "七", "八", "九"];
    return `${k[Math.abs(rank)]}段`;
  }
  return "不明";
}
</script>

<template>
  <div class="table-wrap">
    <p v-if="techniques.length === 0" class="empty">条件に一致する技がありません</p>
    <table v-else>
      <thead>
        <tr>
          <th>#</th>
          <th>技</th>
          <th>級段</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(t, i) in techniques" :key="t.id">
          <td class="td-num">{{ i + 1 }}</td>
          <td class="td-waza">
            <span class="w-in">{{ t.waza_in }}</span>
            <span class="w-out">{{ t.waza_out }}</span>
          </td>
          <td class="td-rank">{{ toRank(t.rank) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrap {
  overflow-x: auto;
  padding: 0.75rem 0.75rem 1.25rem;
}

.empty {
  text-align: center;
  padding: 3rem 1rem;
  color: #999;
  font-size: 0.9rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  background: #ffffff80;
}

table th {
  background: #f0ece7;
  color: #666;
  font-weight: 600;
  font-size: 0.8rem;
  text-align: left;
  padding: 0.55rem 0.85rem;
  border-bottom: 1px solid #d4cec6;
  white-space: nowrap;
}

table td {
  padding: 0.65rem 0.85rem;
  border-bottom: 1px solid #ede8e2;
  vertical-align: middle;
}

table tbody tr:last-child td {
  border-bottom: none;
}

.td-num {
  color: #aaa;
  text-align: center;
  width: 44px;
  font-feature-settings: "tnum";
}

.td-waza {
  min-width: 0;
}

.w-in {
  color: #333;
}

.w-out {
  color: #333;
  font-weight: 600;
  margin-left: 0.3rem;
}

.td-rank {
  text-align: center;
  white-space: nowrap;
  font-size: 0.85rem;
  color: #666;
}
</style>
