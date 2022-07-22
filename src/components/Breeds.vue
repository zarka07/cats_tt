<template>
  <div class="container-breeds">
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
      <Loader v-if="this.mainStore.loading" />
      <div v-else>
        <div class="current-tab" v-show="showMasonry">
          <button type="submit" class="back-button" value="" @click="goBack()"></button>
          <div class="tab-name">BREEDS</div>

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

          <button
            type="button"
            class="sort sort-up"
            @click="currentSorting = 'asc'"
          ></button>
          <button
            type="button"
            class="sort sort-down"
            @click="currentSorting = 'desc'"
          ></button>
        </div>

        <div class="wall" v-if="showMasonry">
          <masonry-wall
            :items="paginatedBreeds"
            :ssr-columns="3"
            :column-width="180"
            :gap="8"
          >
            <template #default="{ item }">
              <div class="container-image">
                <img class="_image" :src="item.image.url" :alt="item.id" />
                <div class="middle">
                  <div class="_text">{{ item.name }}</div>
                </div>
                <!-- :style="{
                    width: 180 + 'px',
                    height: 'auto',
                    borderRadius: 10 + 'px',
                  }" -->
                <!-- @mouseover="() => (visibleHover = item.id)"
                  @mouseleave="() => (visibleHover = null)" v-if="visibleHover == item.id" -->
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
                    this.currentPage != 1
                      ? { backgroundColor: '#FBE0DC' }
                      : { backgroundColor: '#F8F8F7', color: '#8C8C8C' }
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
                      : { backgroundColor: '#F8F8F7', color: '#8C8C8C' }
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
            <button
              type="submit"
              class="back-button"
              value=""
              @click="goBackToManosry()"
            ></button>
            <div class="breed-name">BREEDS</div>
            <div class="breed-id">
              {{ selectedBreed.breeds[0].name }}
            </div>
          </div>
          <img
            class="selected-breed-image"
            :src="selectedBreed.url"
            :alt="selectedBreed.id"
          />
          <div class="current-breed-description">
            <h4 class="description-breed-name">{{ selectedBreed.breeds[0].name }}</h4>
            <!-- <h6 class="description-breed-country">{{selectedBreed.breeds[0].origin}}</h6> -->
            <div class="description-row">
              <div class="col-5">
                <div><b>Temperament:</b></div>
                <div>
                  <span>{{ selectedBreed.breeds[0].temperament }}</span>
                </div>
              </div>
              <div class="col-5">
                <div>
                  <b>Origin: </b><span>{{ selectedBreed.breeds[0].origin }}</span>
                </div>
                <div>
                  <b>Weight: </b
                  ><span>{{ selectedBreed.breeds[0].weight.metric }} kgs</span>
                </div>
                <div>
                  <b>Life span: </b
                  ><span>{{ selectedBreed.breeds[0].life_span }} years</span>
                </div>
              </div>
            </div>
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
      search: "",
      currentSorting: "desc",
      visibleHover: null,
      prevPageDisabled: true,
      nextPageDisabled: Boolean,
      showMasonry: true,
      currentBreed: {},
      selectedBreed: {},
      breeds: [],
      breedsCount: 1,
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
  mounted() {
    this.setPages();
  },
  methods: {
    goBack() {
      this.mainStore.currentTab = "Girlpet";
      this.$router.go(0);
    },

    goBackToManosry() {
      this.showMasonry = true;
      this.currentBreed = "";
    },

    async loadBreeds() {
      try {
        this.mainStore.loading = true;
        axios.defaults.headers.common["x-api-key"] =
          "bbf7ce2f-68fc-4879-8dda-4139a8c2823b"; // Replace this with your API Key
        let response = await axios.get("https://api.thecatapi.com/v1/breeds");
        this.breeds = response.data; // the response is an Array, so just use the first item as the Image
        this.mainStore.loading = false;
      } catch (error) {
        console.log(error);
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
        this.mainStore.loading = false;
      } catch (error) {
        console.log(error);
      }
    },

    setPages() {
      this.pages = [];
      this.breedsCount = Object.keys(this.breedsByTitle).length;
      let numberOfPages = Math.ceil(this.breedsCount / this.perPage);
      console.log("breeds count: ", this.breedsCount);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(breeds) {
      let page = this.currentPage;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return breeds.slice(from, to);
    },
  },
  watch: {
    search() {
      this.setPages();
    },
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
    nextPageDisabled() {
      return this.currentPage < this.pages.length ? false : true;
    },
    breedsByTitle() {
      return this.sortedBreeds.filter(
        (item) => item.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
      );
    },
    showBreeds() {
      return this.mainStore.showBreeds;
    },
    currentPage() {
      return this.mainStore.currentPage;
    },
    paginatedBreeds() {
      return this.paginate(this.breedsByTitle);
    },
    sortedBreeds() {
      switch (this.currentSorting) {
        case "desc":
          return this.breeds.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
          });
        case "asc":
          return this.breeds.sort((a, b) => {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
          });
      }
    },
    prevShevronDisabled() {
      return "../assets/prev-shevron-disabled.svg";
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@200&display=swap");
.container-voting {
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
  position: relative;
}

.masonry-wall {
  min-height: 68vh;
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

button.next-page:hover {
  background-image: url("../assets/next-shevron-hover.svg");
  background-position: 60px;
  text-align: left;
  padding-left: 25px;
  color: #fff;
  background-color: #ff868e !important;
}

button.next-page:disabled {
  background-image: url("../assets/next-shevron-disabled.svg") !important;
  background-position: 60px;
}

button.prev-page {
  background-image: url("../assets/prev-shevron.svg");
  background-position: 15px;
  text-align: right;
  padding-right: 25px;
}

button.prev-page:hover {
  background-image: url("../assets/prev-shevron-hover.svg");
  background-position: 12px;
  text-align: right;
  padding-left: 25px;
  color: #fff;
  background-color: #ff868e !important;
}

button.prev-page:disabled {
  background-image: url("../assets/prev-shevron-disabled.svg") !important;
  background-position: 10px;
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

.container-image {
  position: relative;
  width: 180px;
  height: 100%;
  border-radius: 10px;
}

img._image {
  opacity: 1;
  display: block;
  transition: 0.5s ease;
  backface-visibility: hidden;
  width: 180px;
  height: auto;
  border-radius: 10px;
}

.middle {
  background-color: rgba(255, 134, 142, 0.6);
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.container-image:hover ._image {
  opacity: 0.3;
  color: #ff868e;
}

.container-image:hover .middle {
  opacity: 1;
}

._text {
  background-color: #fff;
  border-radius: 10px;
  min-height: 30px;
  height: auto;
  width: 140px;
  color: #ff868e;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Jost", sans-serif;
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 15px;
}

.current-breed-tab {
  display: flex;
  justify-content: flex-start;
}

.selected-breed-image {
  width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 10px;
  border-color: transparent;
}

.breed-name {
  margin-top: 10px;
  text-align: center;
  background-color: #fbe0dc;
  border-radius: 10px;
  height: 30px;
  width: 140px;
  color: #ff868e;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Jost", sans-serif;
  font-weight: 500;
  font-size: 15px;
  margin-left: 10px;
}

.breed-id {
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
  padding: 10px;
}

.current-breed-description {
  width: 100%;
  min-height: 150px;
  height: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 10px;
  border: 2px solid #fbe0dc;
  font-family: "Jost", sans-serif;
  font-weight: 500;
  position: relative;
}

h4.description-breed-name {
  position: absolute;
  left: 22%;
  top: -18px;
  background-color: #fff;
  border: 2px solid transparent;
  width: 300px;
}

h6.description-breed-country {
  color: #1d1d1d;
}

.description-row {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 50px;
}

.col-5 {
  text-align: left;
  font-size: 14px;
}

span {
  color: #8c8c8c;
}
</style>
