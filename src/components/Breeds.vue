<template>
  <div class="container-voting">
    <search-panel></search-panel>
    <div class="row content-row">
      <button type="submit" class="back-button" value="" @click="goBack()"></button>
      <div class="tab-name"><span>BREEDS</span></div>
      <form>
        <select
          class="selectBreed"
          aria-label="All breeds"
          v-model="currentBreed"
          title="All breeds"
          name="Breeds"
          id="breeds"
        >
          <option value="" disabled selected>All Breeds:</option>
          <option v-for="item in breeds" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </form>

      <form style="width: 8vw; margin-left: 5px">
        <select
          class="selectBreed"
          aria-label="Select limit"
          v-model="currentLimit"
          title="Limit"
          name="Limit"
          id="limit"
        >
          <option value="" disabled selected>Limit:</option>
          <option v-for="item in limits" :key="item" :value="item.value">
            {{ item.text }}{{ item.value }}
          </option>
        </select>
      </form>

      <button type="button" class="sort sort-up"></button>
      <button type="button" class="sort sort-down"></button>

      <masonry-wall
        :items="images"
        :ssr-columns="3"
        :column-width="180"
        :gap="8"
        class="wall"
      >
        <template #default="{ item }">
          <img
            :src="item.url"
            alt="cat"
            :style="{
              width: 180 + 'px',
              height: 'auto',
              borderRadius: 10 + 'px',
            }"
          />
          <!-- <img
            v-if="item.width > 180 && item.width <= 300"
            :src="item.url"
            alt="cat"
            :style="{
              width: item.width * 0.6 + 'px',
              height: 'auto',
              borderRadius: 10 + 'px',
            }"
          />
          <img
            v-else-if="item.width > 300 && item.width <= 400"
            :src="item.url"
            alt="cat"
            :style="{
              width: item.width * 0.45 + 'px',
              height: 'auto',
              borderRadius: 10 + 'px',
            }"
          />
          <img
            v-else-if="item.width > 400 && item.width <= 500"
            :src="item.url"
            alt="cat"
            :style="{
              width: item.width * 0.36 + 'px',
              height: 'auto',
              borderRadius: 10 + 'px',
            }"
          />
          <img
            v-else-if="item.width > 500 && item.width <= 600"
            :src="item.url"
            alt="cat"
            :style="{
              width: item.width * 0.3 + 'px',
              height: 'auto',
              borderRadius: 10 + 'px',
            }"
          />
          <img
            v-else-if="item.width > 600 && item.width <= 700"
            :src="item.url"
            alt="cat"
            :style="{
              width: item.width * 0.257 + 'px',
              height: 'auto',
              borderRadius: 10 + 'px',
            }"
          />
          <img
            v-else-if="item.width > 700 && item.width <= 800"
            :src="item.url"
            alt="cat"
            :style="{
              width: item.width * 0.225 + 'px',
              height: 'auto',
              borderRadius: 10 + 'px',
            }"
          />
          <img
            v-else-if="item.width > 800 && item.width <= 900"
            :src="item.url"
            alt="cat"
            :style="{
              width: item.width * 0.2 + 'px',
              height: 'auto',
              borderRadius: 10 + 'px',
            }"
          />
          <img
            v-else-if="item.width > 900 && item.width <= 1000"
            :src="item.url"
            alt="cat"
            :style="{
              width: item.width * 0.18 + 'px',
              height: 'auto',
              borderRadius: 10 + 'px',
            }"
          />
          <img
            v-else-if="item.width > 1000 && item.width <= 1100"
            :src="item.url"
            alt="cat"
            :style="{
              width: item.width * 0.163 + 'px',
              height: 'auto',
              borderRadius: 10 + 'px',
            }"
          />
          <img
            v-else-if="item.width > 1100 && item.width <= 1200"
            :src="item.url"
            alt="cat"
            :style="{
              width: item.width * 0.15 + 'px',
              height: 'auto',
              borderRadius: 10 + 'px',
            }"
          />
          <img
            v-else-if="item.width > 1200 && item.width <= 1300"
            :src="item.url"
            alt="cat"
            :style="{
              width: item.width * 0.138 + 'px',
              height: 'auto',
              borderRadius: 10 + 'px',
            }"
          />
          <img
            v-else-if="item.width== 1280"
            :src="item.url"
            alt="cat"
            :style="{
              width: item.width * 0.15 + 'px',
              height: 'auto',
              borderRadius: 10 + 'px',
            }"
          />
          <img
            v-else-if="item.width > 1300 && item.width <= 1500"
            :src="item.url"
            alt="cat"
            :style="{
              width: item.width * 0.12 + 'px',
              height: 'auto',
              borderRadius: 10 + 'px',
            }"
          />
          <img
            v-else-if="item.width > 1500 && item.width < 1700"
            :src="item.url"
            alt="cat"
            :style="{
              width: item.width * 0.1 + 'px',
              height: 'auto',
              borderRadius: 10 + 'px',
            }"
          />
          <img
            v-else-if="item.width > 1700 && item.width < 4000"
            :src="item.url"
            alt="cat"
            :style="{
              width: item.width * 0.05 + 'px',
              height: 'auto',
              borderRadius: 10 + 'px',
            }"
          />
          <img
            v-else
            :src="item.url"
            alt="cat"
            :style="{
              width: item.width * 0.08 + 'px',
              height: 'auto',
              borderRadius: 10 + 'px',
            }"
          /> -->
          <!-- <img :src="item.url" alt="cat" :style="{width: item.width*0.3+'px', height: item.height*0.3+'px', borderRadius:10+'px'}">          -->
        </template>
      </masonry-wall>


      <!-- <button type="button" class="btn" @click="loadNextImage"></button> -->
      <!-- <img v-for="image in images" :key="image.id" :src="image.url" alt="cat" /> -->
    </div>
  </div>
</template>

<script>
import SearchPanel from "../components/SearchPanel.vue";
import { MAINstore } from "../store/mainStore";
import axios from "axios";
export default {
  name: "tab-breeds",
  components: { SearchPanel },
  setup() {
    const mainStore = MAINstore();
    return {
      mainStore,
    };
  },
  data() {
    return {
      currentBreed: "",
      selectedBreed: {},
      currentLimit: 10,
      showDropdownBreeds: false,
      breeds: [],
      images: [],
      limits: [
        { text: "Limit: ", value: 5 },
        { text: "Limit: ", value: 10 },
        { text: "Limit: ", value: 15 },
        { text: "Limit: ", value: 20 },
      ],
    };
  },
  created() {
    this.loadImages();
    this.loadBreeds();
  },
  methods: {
    goBack() {
      this.mainStore.currentTab = "Girlpet";
      this.$router.go(0);
    },
    async loadImages() {
      try {
        axios.defaults.headers.common["x-api-key"] =
          "bbf7ce2f-68fc-4879-8dda-4139a8c2823b"; // Replace this with your API Key

        let response = await axios.get("https://api.thecatapi.com/v1/images/search", {
          params: { limit: this.currentLimit, size: "thumb" },
        });
        this.images = response.data; // the response is an Array, so just use the first item as the Image

        console.log(this.images);
      } catch (err) {
        console.log(err);
      }
    },

    async loadBreeds() {
      try {
        axios.defaults.headers.common["x-api-key"] =
          "bbf7ce2f-68fc-4879-8dda-4139a8c2823b"; // Replace this with your API Key
        let response = await axios.get("https://api.thecatapi.com/v1/breeds");
        let breeds = response.data; // the response is an Array, so just use the first item as the Image
        for (let i = 0; i < breeds.length; i++) {
          this.breeds.push(breeds[i].name);
        }
      } catch (error) {
        console.log(err);
      }
    },

    // async loadBreed() {
    //   try {
    //     axios.defaults.headers.common["x-api-key"] =
    //       "bbf7ce2f-68fc-4879-8dda-4139a8c2823b"; // Replace this with your API Key
    //     let response = await axios.get(
    //       `https://api.thecatapi.com/v1/breeds/search?q=${this.currentBreed}`
    //     );
    //     let breed = response.data; // the response is an Array, so just use the first item as the Image
    //     console.log(breed);
    //   } catch (error) {
    //     console.log(err);
    //   }
    // },
  },
  watch: {
    currentLimit() {
      this.loadImages();
    },
  },
  computed: {
    calcStyle(height, width) {
      console.log(height, width);
      const _height = height * 0.5;
      const _width = width * 0.5;
      return `height:${_height}px; width:${_width}px`;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@200&display=swap");
.container-voting {
  padding: 20px 0 !important;
  height: 90vh;
  width: 100%;
}

.row {
  width: auto;
}

.content-row {
  margin-top: 10px;
  width: 104%;
  min-height: 80vh;
  background-color: #fff;
  border-radius: 10px;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
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

form {
  position: relative;
  width: 12vw;
  padding: 10px 0;
  height: 30px;
  /* background-color: #FBE0DC; */
}

select {
  width: 100%;
  height: 30px;
  padding-left: 15px;
  padding-right: 15px;
  border: 2px;
  border-color: transparent;
  border-radius: 10px;
  font-family: "Jost", sans-serif;
  font-weight: 400;
  font-size: 13px;
  color: #8c8c8c;
  background-color: #f8f8f7;
}

/* select:hover {
  border: 2px solid #fbe0dc;
}

select:focus {
  border: 2px solid #ff868e;
}

select:checked {
  border: 2px solid #ff868e;
} */

button.sort {
  background-repeat: no-repeat;
  background-position: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  margin-top: 10px;
  border-color: transparent;
}

button.sort-up {
  background-image: url("../assets/sortUp.svg");
}

button.sort-up:hover {
  background-image: url("../assets/sortUp-hover.svg");
}

button.sort-down {
  background-image: url("../assets/sortDown.svg");
}

button.sort-down:hover {
  background-image: url("../assets/sortDown-hover.svg");
}

.wall {
  flex-wrap: wrap;
  margin: 10px 0 10px 0;
}
</style>
