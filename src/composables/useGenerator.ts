import { ref, watch, type Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { wazadata } from "@/utils/data";
import type { WazaType } from "@/utils/types";
import { Random } from "@/utils/random";

export function useGenerator() {
  const route = useRoute();
  const router = useRouter();

  // --- Reactive state ---
  const rank: Ref<number> = ref(5);
  const filter: Ref<string> = ref("under");
  const count: Ref<number> = ref(10);
  const sortEnabled: Ref<boolean> = ref(false);
  const positive: Ref<string[]> = ref([]);
  const negative: Ref<string[]> = ref([]);
  const seed: Ref<number> = ref(0);
  const techniques: Ref<WazaType[]> = ref([]);
  const isInitialized: Ref<boolean> = ref(false);

  // --- Rank options ---
  const rankOptions = [
    { value: 5, label: "5級" },
    { value: 3, label: "3級" },
    { value: 1, label: "1級" },
    { value: -1, label: "初段" },
  ];

  const filterOptions = [
    { value: "under", label: "以下" },
    { value: "only", label: "のみ" },
    { value: "over", label: "以上" },
  ];

  // --- URL param sync ---
  function initFromUrl() {
    const q = route.query;
    rank.value = Number(q.rank) || 5;
    filter.value = (q.filter as string) || "under";
    count.value = Number(q.count) || 10;
    sortEnabled.value = q.sort === "true";
    positive.value = q.positive ? (q.positive as string).split(",") : [];
    negative.value = q.negative ? (q.negative as string).split(",") : [];
    const urlSeed = Number(q.seed);
    seed.value = urlSeed || Math.floor(Math.random() * 1_000_000);
    isInitialized.value = true;
  }

  function syncToUrl() {
    if (!isInitialized.value) return;
    const query: Record<string, string> = {};
    if (rank.value !== 5) query.rank = String(rank.value);
    if (filter.value !== "under") query.filter = filter.value;
    if (count.value !== 10) query.count = String(count.value);
    if (sortEnabled.value) query.sort = "true";
    if (positive.value.length) query.positive = positive.value.join(",");
    if (negative.value.length) query.negative = negative.value.join(",");
    if (seed.value) query.seed = String(seed.value);
    router
      .replace({ query })
      .then(() => {})
      .catch(() => {});
  }

  // --- Core generation ---
  function generate() {
    let filtered = [...wazadata];

    // Rank filter
    if (filter.value === "under") {
      filtered = filtered.filter((w) => w.rank >= rank.value);
    } else if (filter.value === "only") {
      filtered = filtered.filter((w) => w.rank === rank.value);
    } else if (filter.value === "over") {
      filtered = filtered.filter((w) => w.rank <= rank.value);
    }

    // Positive keywords filter
    if (positive.value.length > 0) {
      const inKW = positive.value.filter((k) => wazadata.some((w) => w.waza_in.includes(k)));
      const outKW = positive.value.filter((k) => wazadata.some((w) => w.waza_out.includes(k)));
      filtered = filtered.filter((w) => {
        if (inKW.length === 0) return outKW.some((k) => w.waza_out.includes(k));
        if (outKW.length === 0) return inKW.some((k) => w.waza_in.includes(k));
        return inKW.some((k) => w.waza_in.includes(k)) && outKW.some((k) => w.waza_out.includes(k));
      });
    }

    // Negative keywords filter
    if (negative.value.length > 0) {
      filtered = filtered.filter((w) =>
        negative.value.every((k) => !w.waza_in.includes(k) && !w.waza_out.includes(k)),
      );
    }

    // Randomize with seed
    const random = new Random(seed.value);
    const indices = Array.from({ length: filtered.length }, (_, i) => i);
    const shuffled = random.shuffleArray(indices);
    const randomized = shuffled.map((i) => filtered[i]).filter(Boolean) as WazaType[];

    // Slice to count
    let result = randomized.slice(0, count.value);

    // Sort by ID if enabled
    if (sortEnabled.value) {
      result = [...result].sort((a, b) => a.id - b.id);
    }

    techniques.value = result;

    syncToUrl();
  }

  // --- Actions ---
  function shuffle() {
    seed.value = Math.floor(Math.random() * 1_000_000);
    generate();
  }

  async function share() {
    const url = new URL(window.location.href);
    url.searchParams.set("seed", String(seed.value));
    try {
      await navigator.clipboard.writeText(url.toString());
      return true;
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url.toString();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      return true;
    }
  }

  // --- Watch state changes and regenerate ---
  watch(
    [rank, filter, count, sortEnabled, positive, negative],
    () => {
      if (isInitialized.value) generate();
    },
    { deep: true },
  );

  // --- Init ---
  initFromUrl();
  generate();

  return {
    rank,
    filter,
    count,
    sortEnabled,
    positive,
    negative,
    seed,
    techniques,
    rankOptions,
    filterOptions,
    generate,
    shuffle,
    share,
  };
}
