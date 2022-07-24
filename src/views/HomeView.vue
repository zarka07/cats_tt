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
          <div class="carts">
            <div
              v-for="tab in tabs"
              :key="tab"
              :class="['cart', { active: currentTab === tab.tabName }]"
              @click="currentTab = tab.tabName"
            >
              <img :src="tab.tabImg" class="cart" alt="cart-image" /><br />
              <button type="button" class="api-button">{{ tab.tabName }}</button>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <router-view></router-view>
        <!-- <keep-alive>
          <component v-bind:is="currentTabComponent" class="tab"></component>
        </keep-alive> -->
      </div>
    </div>
  </div>
  <Modal v-show="this.mainStore.showModal" />
</template>

<script>
import girlpet from "./Girl-pet.vue";
import voting from "./Voting.vue";
import breeds from "./Breeds.vue";
import gallery from "./Gallery.vue";
import Modal from "../components/Modal.vue";
import { MAINstore } from "../store/mainStore";
export default {
  setup() {
    const mainStore = MAINstore();
    return {
      mainStore,
    };
  },
  name: "HomeView",
  components: { girlpet, voting, breeds, gallery, Modal },
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
      return this.currentTab.toLowerCase();
    },
  },
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
.row {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  margin: 0;
}
.left {
  box-sizing: border-box;
  width: 50%;
  padding-top: 20px;
  position: fixed;
  left: 0;
  top: 0;
  /* overflow-y:auto; */
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
  margin: 20px 0 0 70px;
  text-align: left;
}

.hi {
  font-family: "Jost";
  font-style: normal;
  font-weight: 500;
  font-size: 42px;
  line-height: 58px;
  margin: 0;
}

.welcome {
  margin: 0;
  font-family: "Jost";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
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
  margin: 25px 0 15px 0;
}

.carts {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.cart {
  width: 10vw;
  height: auto;
  border: none;
  margin-right: 1.5vw;
}

button.api-button {
  background-color: #fff;
  width: 10vw;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #fff;
  color: #ff868e;
  font-family: "Jost";
  font-style: normal;
  font-weight: 500;
  font-size: 2vh;
  line-height: 16px;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 1.5vh;
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
  padding: 15px 25px 15px 15px;
  height: 99vh;
}

/* ._modal{
  width:100vw;
  height:100vh;
  text-align: center;
  background-color: rgba(29, 29, 29, 0.6);
  opacity: .8;
  overflow:hidden;
} */
</style>
