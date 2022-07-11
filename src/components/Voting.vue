<template>
  <div class="container-voting">
    <search-panel></search-panel>
    <div class="row content-row">
      <button type="submit" class="back-button" value="" @click="goBack()"></button>
      <div class="tab-name"><span>VOTING</span></div>
    </div>
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
      console.log(this.mainStore.currentTab);
      this.mainStore.currentTab = "Girlpet";
      this.$router.go(0);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@200&display=swap");
.container-voting {
  /* display: block; */
  padding: 20px 0 !important;
  height: 90vh;
  width: 100%;
}

.row {
  width: auto;
}

.input-group {
  width: 50%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
}

.form-control {
  color: #1d1d1d;
}

.content-row {
  margin-top: 10px;
  width: 104%;
  height: 80vh;
  background-color: #fff;
  border-radius: 10px;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
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
  margin: 10px 0 0 12px;
}

button.back-button:hover {
  background-color: #ff868e;
  background-image: url("../assets/arrow-left-hover.svg");
}

div.tab-name {
  margin-top: 10px;
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
