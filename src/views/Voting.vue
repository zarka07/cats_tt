<template>
  <!-- <div class="container-voting"> -->
    <search-panel></search-panel>
    <div class="content-row">
      <div class="current-content">
        <button type="submit" class="back-button" value="" @click="goBack()"></button>
        <div class="tab-name"><span>VOTING</span></div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
import SearchPanel from "../components/SearchPanel.vue";
import { MAINstore } from "../store/mainStore";
export default {
  components: { SearchPanel },
  setup() {
    const mainStore = MAINstore();
    return {
      mainStore,
    };
  },
  name: "tab-voting",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@200&display=swap");
/* .container-voting {
  height: 85vh;
  width: 100%;
} */

.form-control {
  color: #1d1d1d;
}

.content-row {
  margin-top: 10px;
  width: 100%;
  min-height: 85vh;
  background-color: #fff;
  border-radius: 10px;
  padding: 0;
  display: flex;
}

.current-content{
padding: 10px;
display: flex;
align-items: flex-start;
justify-content: flex-start;
}

button.back-button {
  background-image: url("../assets/arrow-left.svg");
  color: #ff868e;
  background-color: #fbe0dc;
  border-radius: 10px;
  border-color: transparent;
  position: relative;
  width: 30px;
  height: 30px;
  padding: 0;
  background-repeat: no-repeat;
  background-position: center;
  margin-right:10px;
}

button.back-button:hover {
  background-color: #ff868e;
  background-image: url("../assets/arrow-left-hover.svg");
}

div.tab-name {
  text-align: center;
  background-color: #ff868e;
  border-radius: 10px;
  height: 30px;
  width: 140px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Jost", sans-serif;
  font-weight: 500;
  font-size: 15px;
}
</style>
