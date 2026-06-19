<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <footer class="footer">
    <p>
      &copy; 2026
      <a href="https://github.com/halqme/" rel="noopener" target="_blank"> 0w0.foo </a>
      <span class="sep"> | </span>
      <RouterLink to="/eula"> 利用規約 </RouterLink>
      <span class="sep"> | </span>
      <a href="https://github.com/halqme/lotaikido-v2" rel="noopener" target="_blank"> GitHub </a>
    </p>
  </footer>
</template>

<style scoped>
.footer {
  padding: 1.5rem 1.25rem;
  text-align: center;
  border-top: 1px solid #d4cec6;
}

.footer p {
  font-size: 0.8rem;
  color: #999;
  font-family: monospace;
}

.footer a {
  color: #999;
  text-decoration: none;
}

.footer a:hover {
  color: #c0392b;
}

.sep {
  margin: 0 0.4rem;
}
</style>
