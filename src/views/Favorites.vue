<template>
  <div class="container-favorites">
    <search-panel></search-panel>
    <div class="content-row">
      <div class="current-content">
        <button type="submit" class="back-button" value="" @click="goBack()"></button>
        <div class="tab-name"><span>FAVORITES</span></div>
      </div>
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
  name: "tab-favorites",
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
.container-favorites {
  height: 85vh;
  width: 100%;
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
  width: 100%;
  height: 85vh;
  background-color: #fff;
  border-radius: 10px;
  padding: 0;
  display: flex;
  /* justify-content: flex-start; */
  gap: 10px;
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
