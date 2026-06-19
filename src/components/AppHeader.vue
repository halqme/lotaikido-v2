<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <RouterLink class="logo-wrap" to="/">
        <div class="logo-text">
          <span class="logo-title"> 合気道 技ジェネレータ </span>
        </div>
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 0.85rem 1.25rem;
  background: #fff;
  border-bottom: 1px solid #d4cec6;
}

.header-inner {
  display: flex;
  align-items: center;
}

.logo-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: inherit;
}

.logo-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #1a1a2e;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 4px;
  flex-shrink: 0;
  font-family:
    Noto Serif JP,
    serif;
  letter-spacing: 0;
}

.logo-text {
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
}

.logo-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: 0.03em;
  line-height: 1.2;
}

.logo-sub {
  font-size: 0.7rem;
  color: #999;
  letter-spacing: 0.08em;
}
</style>
