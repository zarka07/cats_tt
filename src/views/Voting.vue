<template>
  <div class="content-row">
    <Loader v-if="this.mainStore.loading" />
    <div class="current-content" v-else>
      <div class="current-tab">
        <button type="submit" class="back-button" value="" @click="goBack()"></button>
        <div class="tab-name">VOTING</div>
      </div>
      <div class="randomEl" v-if="url">
        <div class="">
          <img class="randomImg" :src="url" :alt="alt" />
        </div>
        <div class="vote-buttons">
          <button type="button" class="green-button" @click="addToLikes(getRandomCat())"></button>
          <button type="button" class="red-button" @click="addToFavorites(getRandomCat())"></button>
          <button type="button" class="yellow-button" @click="addToDislikes(getRandomCat())"></button>
        </div>
      </div>
      <div class="noFavorites" v-else>No item found</div>
    </div>
  </div>
</template>

<script>
import { MAINstore } from "../store/mainStore";
import Loader from "../components/Loader.vue";
import getBreeds from "../api/getBreeds";
export default {
  mixins: [getBreeds],
  components:{ Loader },
  setup() {
    const mainStore = MAINstore();
    return {
      mainStore,
    };
  },
  data() {
    return {
      url: "",
      alt: "",
    };
  },
  name: "tab-voting",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getRandomCat() {
      let j, temp;
      let arr = this.mainStore.breeds;
      for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      this.url = arr[0].image.url;
      this.alt = arr[0].image.id;
      return arr[0]
    },
    addToLikes(item){
      for (var i = 0; i < this.mainStore.likes.length; i++) {
        if (this.mainStore.likes[i] === item) {
          return false;
        }
      }
      this.mainStore.likes.push(item);
      this.getRandomCat();
    },
    addToFavorites(item){
      for (var i = 0; i < this.mainStore.favorites.length; i++) {
        if (this.mainStore.favorites[i] === item) {
          return false;
        }
      }
      this.mainStore.favorites.push(item);
      this.getRandomCat();
    },
    addToDislikes(url){
      for (var i = 0; i < this.mainStore.dislikes.length; i++) {
        if (this.mainStore.dislikes[i] === item) {
          return false;
        }
      }
      this.mainStore.dislikes.push(url);
      this.getRandomCat();
    },
  },
  mounted() {
    this.loadBreeds();
    this.getRandomCat();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@200&display=swap");
@import url("../css/back-button.css");

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
  justify-content: space-evenly;
}

.current-content {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  /* display: flex;
  align-items: flex-start;
  justify-content: flex-start; */
}

.current-tab {
  display: flex;
}

div.tab-name {
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

.randomEl {
  width: auto;
  height: auto;
  border-radius: 20px;
  margin-top: 10px;
  position: relative;
}

.randomImg {
  width: 100%;
  border-radius: 20px;
}

.vote-buttons {
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: auto;
  height: auto;
  background-color: #fff;
  border-radius: 20px;
  border: 4px solid #fff;
  top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
}

.green-button{
  background-image: url("../assets/smile-active.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-color: #97EAB9;
  border: 4px solid #97EAB9;
  border-radius: 20px 0 0 20px;
  width:60px;
  height:60px;
}

.green-button:hover{
  background-color: #35e37e;
}

.red-button{
  background-image: url("../assets/heart-active.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-color: #FF868E;
  border: 4px solid #FF868E;
  width:60px;
  height:60px;
}

.red-button:hover{
  background-color: #fb202e;
}

.yellow-button{
  background-image: url("../assets/nosmile-active.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-color: #FFD280;
  border: 4px solid #FFD280;
  border-radius: 0 20px 20px 0;
width:60px;
  height:60px;
}

.yellow-button:hover{
  background-color: #f5a510;
}

.noFavorites {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #f8f8f7;
  color: #8c8c8c;
  font-family: "Jost", sans-serif;
  font-weight: 400;
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left:10px;
  border-radius: 10px;
}
</style>
