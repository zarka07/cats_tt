<template>
  <div class="container">
    <div class="_row">
      <div class="left">
        <div class="logo">
          <img src="./assets/Group20.svg" alt="logo" /><span class="logo-name"
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
              class='cart'
            >
              <img :src="tab.tabImg" class="cart" alt="cart-image" /><br />
              <button type="button" class="api-button">
                <router-link :to="tab.link">{{ tab.tabName }}</router-link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="_container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
  <Modal v-if="this.mainStore.showModal" />
</template>
<script>
import Modal from "../src/components/Modal.vue";
import { MAINstore } from "../src/store/mainStore";
export default {
  setup() {
    const mainStore = MAINstore();
    return {
      mainStore,
    };
  },
  name: "App",
  components: { Modal },
  data() {
    return {
      tabs: [
        {
          tabName: "Voting",
          tabImg: require("../src/assets/Group106.svg"),
          link: { name: "voting" },
        },
        {
          tabName: "Breeds",
          tabImg: require("../src/assets/MaskGroup.svg"),
          link: { name: "breeds" },
        },
        {
          tabName: "Gallery",
          tabImg: require("../src/assets/MaskGroup1.svg"),
          link: { name: "gallery" },
        },
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #f8f8f7;
  width: 100%;
  min-height: 100%;
  overflow: auto;
}

._ {
  height: 85vh;
  width: 100%;
}

a:-webkit-any-link {
  text-decoration: none !important;
  color: #ff868e !important;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.container {
  height: 100vh;
  width: 100vw;
  margin: 0;
  max-width: 1400px!important;
  overflow: none;
}
._row {
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
  color: #ff868e !important;
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
  width: 50% !important;
  padding: 15px 25px 15px 15px;
  height: 99vh;
}
</style>
