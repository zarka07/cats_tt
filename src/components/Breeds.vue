<template>
  <div class="container-voting">
    <search-panel></search-panel>

    <div class="row content-row">
      <Loader v-if="this.mainStore.loading" />
      <div v-else>
        <div class="current-tab" v-show="showMasonry">
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
                v-model="perPage"
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

            <button type="button" class="sort sort-up" @click="currentSorting = 'asc'"></button>
            <button type="button" class="sort sort-down" @click="currentSorting = 'desc'"></button>
        </div>

        <div class="wall" v-if="showMasonry">
          <masonry-wall
            :items="sortedBreeds"
            :ssr-columns="3"
            :column-width="180"
            :gap="8"
          >
            <template #default="{ item }">
              <div class="image">
                <img
                  @mouseover="() => (visibleHover = item.id)"
                  @mouseleave="() => (visibleHover = null)"
                  :src="item.image.url"
                  :alt="item.id"
                  :style="{
                    width: 180 + 'px',
                    height: 'auto',
                    borderRadius: 10 + 'px',
                  }"
                />
                <div v-if="visibleHover == item.id" class="description">
                  <div class="hover-breed-name">{{ item.name }}</div>
                </div>

                <!--  -->
              </div>
            </template>
          </masonry-wall>

          <nav class="breeds-nav" aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <button
                  :disabled="prevPageDisabled"
                  type="button"
                  class="page prev-page"
                  @click="this.mainStore.currentPage--"
                  :style="
                    this.mainStore.currentPage != 1
                      ? { backgroundColor: '#FBE0DC' }
                      : { backgroundColor: '#F8F8F7' }
                  "
                >
                  Prev
                </button>
              </li>

              <li class="page-item">
                <button
                  :disabled="nextPageDisabled"
                  type="button"
                  @click="this.mainStore.currentPage++"
                  class="page next-page"
                  :style="
                    this.mainStore.currentPage < pages.length
                      ? { backgroundColor: '#FBE0DC' }
                      : { backgroundColor: '#F8F8F7' }
                  "
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div class="selected-breed" v-else>
          <div class="current-breed-tab">
            <button type="submit" class="back-button" value="" @click="goBackToManosry()"></button>
            <div class="breed-name"><span>BREEDS</span></div>
              <div class="breed-id">
                {{selectedBreed.breeds[0].name}}
              </div>
          </div>
          <img class="selected-breed-image" :src="selectedBreed.url" :alt="selectedBreed.id" />
          <div class="current-breed-description">
            <h4 class="description-breed-name">{{selectedBreed.breeds[0].name}}</h4>
            <h6 class="description-breed-country">{{selectedBreed.breeds[0].origin}}</h6>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
import SearchPanel from "../components/SearchPanel.vue";
import { MAINstore } from "../store/mainStore";
import axios from "axios";
export default {
  name: "tab-breeds",
  components: { SearchPanel, Loader },
  setup() {
    const mainStore = MAINstore();
    return {
      mainStore,
    };
  },
  data() {
    return {
      currentSorting: "desc",
      visibleHover: null,
      prevPageDisabled: true,
      nextPageDisabled: false,
      showMasonry: true,
      currentBreed: {},
      selectedBreed: {},
      breeds: [],
      limits: [
        { text: "Limit: ", value: 5 },
        { text: "Limit: ", value: 10 },
        { text: "Limit: ", value: 15 },
        { text: "Limit: ", value: 20 },
      ],
      perPage: 5,
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

    goBackToManosry(){
      this.showMasonry = true;
      this.currentBreed = ""
    },

    async loadBreeds() {
      try {
        this.mainStore.loading = true;
        axios.defaults.headers.common["x-api-key"] =
          "bbf7ce2f-68fc-4879-8dda-4139a8c2823b"; // Replace this with your API Key
        let response = await axios.get("https://api.thecatapi.com/v1/breeds");
        this.breeds = response.data; // the response is an Array, so just use the first item as the Image
        this.mainStore.loading = false;
        console.log(this.breeds);
      } catch (error) {
        console.log(err);
      }
    },

    async loadBreed() {
      let id = this.currentBreed.id;
      this.mainStore.loading = true;
      try {
        axios.defaults.headers.common["x-api-key"] =
          "bbf7ce2f-68fc-4879-8dda-4139a8c2823b"; // Replace this with your API Key
        let response = await axios.get(
          `https://api.thecatapi.com/v1/images/search?breed_ids=${id}`
        );
        this.selectedBreed = response.data[0]; // the response is an Array, so just use the first item as the Image
        console.log("here", this.selectedBreed);
        this.mainStore.loading = false;
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
    currentPage() {
      this.prevPageDisabled = this.currentPage == 1 ? true : false;
      this.nextPageDisabled = this.currentPage < this.pages.length ? false : true;
    },
    currentLimit() {
      this.loadBreeds();
    },
    currentBreed() {
      if (this.currentBreed === "") {
        //this.loadBreeds();
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
    showBreeds(){
      return this.mainStore.showBreeds;
    },
    currentPage() {
      return this.mainStore.currentPage;
    },
    displayedBreeds() {
      return this.paginate(this.breeds);
    },
    sortedBreeds() {
      switch (this.currentSorting) {
        case "desc":
          return this.displayedBreeds.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
          });
        case "asc":
          return this.displayedBreeds.sort((a, b) => {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
          });
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
  min-height: 85vh;
  background-color: #fff;
  border-radius: 10px;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  /* align-items: flex-start; */
}

.current-tab{
  display: flex;
  justify-content: space-between;
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
  background-color: #FBE0DC;
  border-radius: 10px;
  height: 30px;
  width: 140px;
  color: #FF868E;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Jost", sans-serif;
  font-weight: 500;
  font-size: 15px;
}

div.tab-name:hover{
  background-color: #ff868e;
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
  position: relative;
}

nav.breeds-nav {
  display: inline-block;
}

button.page {
  margin: 0 10px 0 10px;
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
  text-align: left;
  padding-left: 25px;
}

button.prev-page {
  background-image: url("../assets/prev-shevron.svg");
  background-position: 15px;
  text-align: right;
  padding-right: 25px;
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

.image {
  position: relative;
}

div.description {
  background-color: rgba(255, 134, 142, 0.6);
  width: 180px;
  height: 100%;
  border-radius: 10px;
  position: absolute;
  top: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.current-breed-tab{
  display: flex;
  justify-content:flex-start;
}

.hover-breed-name {
  margin-top: 10px;
  text-align: center;
  background-color: #FFF;
  border-radius: 10px;
  height: 30px;
  width: 140px;
  color: #FF868E;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Jost", sans-serif;
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 10px;
}

.selected-breed-image {
  width:100%;
  height:auto;
  margin-top:10px;
  border-radius: 10px;
  border-color: transparent;
}

.breed-name{
  margin-top: 10px;
  text-align: center;
  background-color: #FBE0DC;
  border-radius: 10px;
  height: 30px;
  width: 140px;
  color: #FF868E;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Jost", sans-serif;
  font-weight: 500;
  font-size: 15px;
  margin-left: 10px;
}

.breed-id{
  margin-top: 10px;
  margin-left: 10px;
  text-align: center;
  background-color: #ff868e;
  border-radius: 10px;
  height: 30px;
  min-width: 50px;
  width: auto;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Jost", sans-serif;
  font-weight: 500;
  font-size: 15px;
  padding:10px;
}

.current-breed-description{
  width:100%;
  height:auto;
  margin-top:10px;
  border-radius: 10px;
  border: 2px solid #FBE0DC;
  font-family: "Jost", sans-serif;
  font-weight: 500;
}

h6.description-breed-country{
  color: #8C8C8C;
}
</style>
