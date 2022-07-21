<template>
  <div class="container-gallery">
    
    <div class="row form-row">
      <form class="search-form">
        <input type="text" placeholder="Search for breeds by name" v-model="search" />
        <div class="search-submit"></div>
      </form>
      <button class="links smile-button" type="button"></button>
      <button class="links heart-button" type="button"></button>
      <button class="links nosmile-button" type="button"></button>
    </div>

    <div class="row content-row">
      <Loader v-if="!this.mainStore.loading" />
      <div v-else>
      <div class="current-tab">
        <button type="submit" class="back-button" value="" @click="goBack()"></button>
        <div class="tab-name">GALLERY</div>
        <button type="button" class="upload-button" @click="this.mainStore.showModal=true">UPLOAD</button>
      </div>

      <div class="filters">
        <div class="filters-row-st">
          
          <form class="order-list">
            <label for="Order">ORDER</label>
            <select
              class="selectOrder"
              aria-label="Order"
              v-model="currentOrder"
              title="Order"
              name="Order"
              id="order"
            >
              <option v-for="item in orders" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </form>
          
          <form class="type-list">
            <label for="Type">TYPE</label>
            <select
              class="selectType"
              aria-label="Type"
              v-model="currentType"
              title="Type"
              name="Type"
              id="type"
            >
              <option v-for="item in types" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </form>
        </div>

        <div class="filters-row-nd">
          <form class="breed-list">
            <label for="Breed" style="width:93%">BREED</label>
            <select
              class="selectBreed"
              aria-label="Breed"
              v-model="currentBreed"
              title="Breed"
              name="Breed"
              id="breed"
            >
              <option v-for="item in breeds" :key="item" :value="item">
                {{ item.name }}
              </option>
            </select>
          </form>

          <form class="limit-list">
            <label for="Limit">LIMIT</label>
            <select
              class="selectLimit"
              aria-label="Limit"
              v-model="currentLimit"
              title="Limit"
              name="Limit"
              id="limit"
            >
              <option v-for="item in limits" :key="item" :value="item.value">
                {{ item.text }}{{item.value}}
              </option>
            </select>
          </form>
          <button type="button" class="reload-button"></button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MAINstore } from "../store/mainStore";
import Loader from '../components/Loader.vue';

import axios from 'axios'
export default {
  name: "tab-gallery",
  components:{ Loader, },
  setup() {
    const mainStore = MAINstore();
    return {
      mainStore,
    };
  },
  data() {
    return {
      search:'',
      orders: ["Random", "Desc", "Asc"],
      currentOrder: "",
      types: ["All", "Static", "Animated"],
      currentType: "",
      breeds:[],
      currentBreed:{},
      limits: [
        { text: "Limit: ", value: 5 },
        { text: "Limit: ", value: 10 },
        { text: "Limit: ", value: 15 },
        { text: "Limit: ", value: 20 },
      ],
      currentLimit:null,
    };
  },
  methods: {
    goBack() {
      this.mainStore.currentTab = "Girlpet";
      this.$router.go(0);
    },
    async loadBreeds() {
      try {
        this.mainStore.loading = true;
        axios.defaults.headers.common["x-api-key"] =
          "bbf7ce2f-68fc-4879-8dda-4139a8c2823b"; // Replace this with your API Key
        let response = await axios.get("https://api.thecatapi.com/v1/breeds");
        this.breeds = response.data; // the response is an Array, so just use the first item as the Image
        this.mainStore.loading = false;
        console.log('breeds: ',this.breeds);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted(){
    //this.loadBreeds();
  },
  computed:{
    showModal(){
      return this.mainStore.showModal;
    }
  }

};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@200&display=swap");
.container-gallery {
  padding: 20px 0 !important;
  height: 90vh;
  width: 100%;
}

.row {
  width: auto;
}

.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

form.search-form {
  position: relative;
  width: 33vw;
  padding: 0;
  height: 40px;
}

input[type="text"] {
  position: relative;
  width: 100%;
  height: 40px;
  padding-left: 15px;
  border-color: transparent;
  border-radius: 10px;
  font-family: "Jost", sans-serif;
  font-weight: 200;
  color: #1d1d1d;
}

input[type="text"]:hover {
  border: 2px solid #fbe0dc;
}

input[type="text"]:focus {
  border: 2px solid #ff868e;
  outline: #ff868e;
}

.search-submit {
  position: absolute;
  right: 0.5vw;
  top: 5px;
  width: 30px;
  height: 30px;
  background-image: url("../assets/search.svg");
  background-repeat: no-repeat;
  background-color: #fbe0dc;
  background-position: center;
  border-color: transparent;
  border-radius: 10px;
}

.search-submit:hover {
  background-color: #ff868e;
  background-image: url("../assets/search-hover.svg");
}

button.links {
  background-color: #fff;
  border-radius: 10px;
  border-color: transparent;
  position: relative;
  width: 40px;
  height: 40px;
  padding: 0;
  background-repeat: no-repeat;
  background-position: center;
}

button.links:hover {
  background-color: #fbe0dc;
}

button.links:active {
  background-color: #ff868e;
}

.smile-button {
  background-image: url("../assets/smile-hover.svg");
}

.smile-button:active {
  background-image: url("../assets/smile-active.svg");
}

.heart-button {
  background-image: url("../assets/heart-hover.svg");
}

.heart-button:active {
  background-image: url("../assets/heart-active.svg");
}

.nosmile-button {
  background-image: url("../assets/nosmile-hover.svg");
}

.nosmile-button:active {
  background-image: url("../assets/nosmile-active.svg");
}

.content-row {
  margin-top: 10px;
  width: 104%;
  min-height: 85vh;
  background-color: #fff;
  border-radius: 10px;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  /* align-items: flex-start; */
}

.current-tab {
  display: flex;
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
  margin-top: 10px;
}

button.back-button:hover {
  background-color: #ff868e;
  background-image: url("../assets/arrow-left-hover.svg");
}

div.tab-name {
  margin-top: 10px;
  margin-left: 10px;
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

button.upload-button {
  margin-top: 10px;
  margin-left: auto;
  background-color: #fbe0dc;
  color: #ff868e;
  border-radius: 10px;
  border-color: transparent;
  position: relative;
  height: 30px;
  width: 140px;
  background-image: url("../assets/upload.svg");
  background-repeat: no-repeat;
  background-position: 25px;
  font-family: "Jost";
  font-weight: 500;
  font-size: 13px;
  text-align: right;
  padding-right: 25px;
}

.filters {
  background-color: #f8f8f7;
  border-radius: 10px;
  border-color: transparent;
  width: 100%;
  padding: 0;
  margin-top: 10px;
  padding-bottom: 10px;
}

.filters-row-st {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 15px;
}

.filters-row-nd {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

select {
  width: 20vw;
  height: 30px;
  border: 2px;
  border-color: transparent;
  border-radius: 10px;
  font-family: "Jost", sans-serif;
  font-weight: 400;
  font-size: 13px;
  color: #1d1d1d;
  background-color: #fff;
}

select.selectBreed {
  width: 20vw;
  height: 30px;
  border: 2px;
  border-color: transparent;
  border-radius: 10px;
  font-family: "Jost", sans-serif;
  font-weight: 400;
  font-size: 13px;
  color: #1d1d1d;
  background-color: #fff;
}

select.selectLimit{
  width: 16vw;
  height: 30px;
  border: 2px;
  border-color: transparent;
  border-radius: 10px;
  font-family: "Jost", sans-serif;
  font-weight: 400;
  font-size: 13px;
  color: #1d1d1d;
  background-color: #fff;
}

label {
  color: #8c8c8c;
  font-weight: 500;
  font-size: 10px;
  width:85%;
  text-align: left;
}

form.breed-list{
  width:20vw;
  margin-left:14px;
}

form.limit-list{
  width:16vw;
}

button.reload-button{
  width: 30px;
  height: 30px;
  background-image: url("../assets/reload.svg");
  background-repeat: no-repeat;
  background-color: #FFF;
  background-position: center;
  border-color: transparent;
  border-radius: 10px;
  margin:23px 10px 0 0;
}

</style>
