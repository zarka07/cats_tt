<template>
  <search-panel></search-panel>
  <router-view/>
</template>

<script>

import { MAINstore } from "../store/mainStore";
import SearchPanel from '../components/SearchPanel.vue';
export default {
  setup() {
    const mainStore = MAINstore();
    return {
      mainStore,
    };
  },
  name: "HomeView",
  components: { SearchPanel },
  data() {
    return {
      
    };
  },
  methods:{
    
  }
  
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap");

.container {
  height: 100vh;
  width: 100vw;
  margin: 0;
  max-width: 1400px;
  overflow: none;
}

</style>
