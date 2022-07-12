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
          <option value="" selected>All Breeds:</option>
          <option v-for="item in breeds" :key="item" :value="item">
            {{ item.name }}
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

      <button type="button" class="sort sort-up" @click="order = 'desc'"></button>
      <button type="button" class="sort sort-down" @click="order = 'asc'"></button>

      <div class="wall" v-if="showMasonry">
        <masonry-wall
          :items="displayedBreeds"
          :ssr-columns="3"
          :column-width="180"
          :gap="8"
        >
          <template #default="{ item }">
            <img
              :src="item.image.url"
              alt="cat"
              :style="{
                width: 180 + 'px',
                height: 'auto',
                borderRadius: 10 + 'px',
              }"
            />
          </template>
        </masonry-wall>

        <nav class="breeds-nav" aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <button
              
                type="button"
                class="page prev-page"
                @click="this.mainStore.currentPage--"
                :style="(this.mainStore.currentPage != 1)?{backgroundColor:'#FBE0DC'}:{backgroundColor:'#F8F8F7'}"
              >
                Prev
              </button>
            </li>
            
            <li class="page-item">
              <button
                
                type="button"
                @click="this.mainStore.currentPage++"
                class="page next-page"
                :style="(this.mainStore.currentPage < pages.length)?{backgroundColor:'#FBE0DC'}:{backgroundColor:'#F8F8F7'}"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div v-else>
        <img :src="selectedBreed.url" :alt="selectedBreed.id" />
      </div>
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
      showMasonry: true,
      currentBreed: {},
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
      perPage: 10,
      pages: [],
    };
  },
  created() {
    this.loadBreeds();
  },
  methods: {
    goBack() {
      this.mainStore.currentTab = "Girlpet";
      this.$router.go(0);
    },

    async loadBreeds() {
      try {
        axios.defaults.headers.common["x-api-key"] =
          "bbf7ce2f-68fc-4879-8dda-4139a8c2823b"; // Replace this with your API Key
        let response = await axios.get("https://api.thecatapi.com/v1/breeds");
        this.breeds = response.data; // the response is an Array, so just use the first item as the Image
        console.log(this.breeds);
      } catch (error) {
        console.log(err);
      }
    },

    async loadBreed() {
      let id = this.currentBreed.id;
      try {
        axios.defaults.headers.common["x-api-key"] =
          "bbf7ce2f-68fc-4879-8dda-4139a8c2823b"; // Replace this with your API Key
        let response = await axios.get(
          `https://api.thecatapi.com/v1/images/search?breed_ids=${id}`
        );
        this.selectedBreed = response.data[0]; // the response is an Array, so just use the first item as the Image
        //this.selectedBreed = breed[0];
        console.log("here", this.selectedBreed);
      } catch (error) {
        console.log(err);
      }
    },

    setPages() {
      let numberOfPages = Math.ceil(this.breeds.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(breeds) {
      let page = this.mainStore.currentPage;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return breeds.slice(from, to);
    },
  },
  watch: {
    currentLimit() {
      this.loadBreeds();
    },
    currentBreed() {
      if (this.currentBreed === "") {
        this.loadBreeds();
        this.showMasonry = true;
      } else {
        this.loadBreed();
        this.showMasonry = false;
      }
    },
    breeds() {
      this.setPages();
    },
  },
  computed: {
    displayedBreeds() {
      return this.paginate(this.breeds);
    },
    sortedProducts() {
      if (this.products.length > 0) {
        let productsArray = this.products.slice(0);
        function compare(a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          return 0;
        }
        return productsArray.sort(compare);
      }
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

nav.breeds-nav {
  display: inline-block;
}

button.page {
  margin:0 10px 0 10px;
  background: #fbe0dc;
  color: #ff868e;
  font-family: "Jost", sans-serif;
  font-weight: 500;
  font-size: 12px;
  font-weight: 500;
  padding: 0.2rem 0.5rem;
  background-repeat: no-repeat;
  width: 90px;
  height: 30px;
  border-radius: 10px;
  border-color: transparent;
}

button.next-page {
  background-image: url("../assets/next-shevron.svg");
  background-position: 65px;
  text-align:left;
  padding-left:25px;
}

button.prev-page {
  background-image: url("../assets/prev-shevron.svg");
  background-position: 15px;
  text-align:right;
  padding-right:25px;
}

.offset {
  width: 500px !important;
  margin: 20px auto;
}

.pagination {
  align-items: center;
  justify-content: center;
  padding-left: 0;
  margin: 10px 0 0 0;
}
</style>
