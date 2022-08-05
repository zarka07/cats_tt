<template>
  <router-view/>
</template>

<script>

import { MAINstore } from "../store/mainStore";
export default {
  setup() {
    const mainStore = MAINstore();
    return {
      mainStore,
    };
  },
  name: "HomeView",
};
</script>

