<template>
  <!-- <search-panel></search-panel> -->
  <router-view/>
</template>

<script>

import { MAINstore } from "../store/mainStore";
// import SearchPanel from '../components/SearchPanel.vue';
export default {
  setup() {
    const mainStore = MAINstore();
    return {
      mainStore,
    };
  },
  name: "HomeView",
  // components: { SearchPanel },
};
</script>

