<template>
  <search-panel :show="showSearch" @search="this.search = $event"></search-panel>
  <div class="content-row">
    <Loader v-if="this.mainStore.loading" />
    <div class="current-content" v-else>
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
              <div class="_middle">
                <div class="__text">{{ item.name }}</div>
              </div>
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
                @click="this.mainStore.breedsCurrentPage--"
                :style="
                  this.breedsCurrentPage != 1
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
                @click="this.mainStore.breedsCurrentPage++"
                class="page next-page"
                :style="
                  this.mainStore.breedsCurrentPage < pages.length
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
</template>

<script>
import Loader from "../components/Loader.vue";
import { MAINstore } from "../store/mainStore";
import getBreeds from "../api/getBreeds";
import getBreed from "../api/getBreed";
import SearchPanel from "../components/SearchPanel.vue";
export default {
  mixins: [getBreeds, getBreed],
  name: "tab-breeds",
  components: { Loader, SearchPanel },
  setup() {
    const mainStore = MAINstore();
    return {
      mainStore,
    };
  },
  data() {
    return {
      showSearch: true,
      search: "",
      currentSorting: "desc",
      visibleHover: null,
      prevPageDisabled: true,
      nextPageDisabled: Boolean,
      showMasonry: true,
      currentBreed: {},
      selectedBreed: {},
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
      this.$router.go(-1);
    },

    goBackToManosry() {
      this.showMasonry = true;
      this.currentBreed = "";
    },

    setPages() {
      this.pages = [];
      this.breedsCount = Object.keys(this.breedsByTitle).length;
      let numberOfPages = Math.ceil(this.breedsCount / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(breeds) {
      let page = this.breedsCurrentPage;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return breeds.slice(from, to);
    },
  },
  watch: {
    breedsCurrentPage() {
      this.prevPageDisabled = this.breedsCurrentPage == 1 ? true : false;
      this.nextPageDisabled = this.breedsCurrentPage < this.pages.length ? false : true;
    },
    currentLimit() {
      this.loadBreeds();
    },
    currentBreed() {
      if (this.currentBreed === "") {
        this.showMasonry = true;
      } else {
        this.loadBreed(this.currentBreed.id);
        this.showMasonry = false;
      }
    },
    breeds() {
      this.setPages();
    },
  },
  computed: {
    breeds() {
      return this.mainStore.breeds;
    },
    nextPageDisabled() {
      return this.breedsCurrentPage < this.pages.length ? false : true;
    },
    breedsByTitle() {
      return this.sortedBreeds.filter(
        (item) => item.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
      );
    },
    showBreeds() {
      return this.mainStore.showBreeds;
    },
    breedsCurrentPage() {
      return this.mainStore.breedsCurrentPage;
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
@import url("../css/search-panel-with-icons.css");
@import url("../css/back-button.css");
@import url("../css/manosry-wall.css");
@import url("../css/pagination.css");
@import url("../css/tabs.css");

div.tab-name {
  margin-left: 0 !important;
}

.current-tab {
  justify-content: space-between;
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

button.sort {
  background-repeat: no-repeat;
  background-position: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
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

.container-image {
  position: relative;
  width: 180px;
  height: 100%;
  border-radius: 10px;
}

.current-breed-tab {
  display: flex;
  justify-content: flex-start;
}

.selected-breed-image {
  margin-top: 10px;
  width: 100%;
  height: auto;
  border-radius: 10px;
  border-color: transparent;
}

.breed-name {
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

._middle {
  background-color: rgba(255, 134, 142, 0.6);
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border-color: transparent;
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

.__text {
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

.container-image:hover ._middle {
  opacity: 1;
}
</style>
