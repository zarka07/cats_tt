<template>
  <div class="container">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div class="row">
      <div class="left">
        <div class="logo">
          <img src="../assets/Group20.svg" alt="logo" /><span class="logo-name"
            ><b>PetsPaw</b></span
          >
        </div>
        <div class="main-content">
          <div class="hi">Hi intern!</div>
          <div class="welcome">Welcome to MI 2022 Front-end test</div>
          <div class="lets-start">Lets start using The Cat API</div>
          <div class="cards">
            <div
              v-for="tab in tabs"
              :key="tab"
              :class="['cart', { active: currentTab === tab.tabName }]"
              @click="currentTab = tab.tabName"
            >
              <img :src="tab.tabImg" alt="image" /><br />
              <button type="button" class="api-button">{{ tab.tabName }}</button>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <keep-alive>
          <component v-bind:is="currentTabComponent" class="tab"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import girlpet from "../components/Girl-pet.vue";
import voting from "../components/Voting.vue";
import breeds from "../components/Breeds.vue";
import gallery from "../components/Gallery.vue";
import { MAINstore } from "../store/mainStore";
export default {
  setup(){
    const mainStore = MAINstore();
    return{
      mainStore,
    }
  },
  name: "HomeView",
  components: { girlpet, voting, breeds, gallery },
  data() {
    return {
      currentTab: this.mainStore.currentTab,
      tabs: [
        { tabName: "Voting", tabImg: require("../assets/Group106.svg") },
        { tabName: "Breeds", tabImg: require("../assets/MaskGroup.svg") },
        { tabName: "Gallery", tabImg: require("../assets/MaskGroup1.svg") },
      ],
    };
  },
  computed: {
    currentTabComponent: function () {
      console.log(this.currentTab)
      return this.currentTab.toLowerCase();
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap");
.container {
  height: 100vh;
  width:100vw;
}
.row {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  margin:0;
}
.left {
  box-sizing: border-box;
  width: 50%;
  padding-top:30px;
  position: fixed;
  left:0;
  top:0;
}

.logo {
  width: 95px;
  height: 24px;
  margin-left: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

span .logo-name {
  color: #1d1d1d;
}

.main-content {
  margin: 80px;
  text-align: left;
}

.hi {
  font-family: "Jost";
  font-style: normal;
  font-weight: 500;
  font-size: 44px;
  line-height: 58px;
  margin: 0;
}

.welcome {
  margin: 0;
  font-family: "Jost";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 29px;
  color: #8c8c8c;
}

.lets-start {
  color: #1d1d1d;
  font-family: "Jost";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  margin-top: 25px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
}

button.api-button {
  background-color: #fff;
  width: 138px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #fff;
  color: #ff868e;
  font-family: "Jost";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 5px;
  margin-top:10px;
}

button.api-button:hover {
  background-color: #fbe0dc;
}

button.api-button:active {
  background-color: #ff868e;
}

.right {
  box-sizing: border-box;
  width: 50%;
  padding: 0;
  height: 100vh;
}
</style>
