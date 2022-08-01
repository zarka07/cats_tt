<template>
  <search-panel :show="showSearch"></search-panel>
  <div class="content-row">
    <Loader v-if="this.mainStore.loading" />
    <div class="current-content" v-else>
      <div class="current-tab">
        <button type="submit" class="back-button" value="" @click="goBack()"></button>
        <div class="tab-name">GALLERY</div>
        <button
          type="button"
          class="upload-button"
          @click="this.mainStore.showModal = true"
        >
          UPLOAD
        </button>
      </div>

      <div class="filters">
        <div class="filters-row-st">
          <form class="order-list">
            <label for="Order">ORDER</label>
            <select
              class="select"
              aria-label="Order"
              v-model="currentSorting"
              title="Order"
              name="Order"
              id="order"
            >
              <option v-for="item in sorting" :key="item" :value="item.value">
                {{ item.type }}
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
              <option v-for="item in types" :key="item" :value="item.value">
                {{ item.type }}
              </option>
            </select>
          </form>
        </div>

        <div class="filters-row-nd">
          <form class="breed-list">
            <label for="Breed">BREED</label>
            <select
              class="select"
              aria-label="Breed"
              v-model="currentBreed"
              title="Breed"
              name="Breed"
              id="breed"
            >
              <option value="">All breads</option>
              <option v-for="item in breeds" :key="item" :value="item.id">
                {{ item.name }}
              </option>
            </select>
          </form>

          <div class="limit-reload">
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
                  {{ item.type }}{{ item.value }}
                </option>
              </select>
            </form>
            <button type="button" class="reload-button" @click="reload"></button>
          </div>
        </div>
      </div>

      <div class="wall">
        <masonry-wall
          :items="paginatedImages"
          :ssr-columns="3"
          :column-width="180"
          :gap="8"
        >
          <template #default="{ item }">
            <div class="container-image">
              <img class="_image" :src="item.url" :alt="item.id" />
              <div class="middle">
                <button type="button" class="_text" @click="setFavorite(item)"></button>
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
                @click="this.mainStore.galleryCurrentPage--"
                :style="
                  this.galleryCurrentPage != 1
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
                @click="this.mainStore.galleryCurrentPage++"
                class="page next-page"
                :style="
                  this.mainStore.galleryCurrentPage < pages.length
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
    </div>
  </div>
</template>

<script>
import { MAINstore } from "../store/mainStore";
import Loader from "../components/Loader.vue";
import getImages from "../api/getImages";
import getBreeds from "../api/getBreeds";
import SearchPanel from "../components/SearchPanel.vue";
export default {
  mixins: [getImages, getBreeds],
  emits: ["linkTo"],
  name: "tab-gallery",
  components: { Loader, SearchPanel },
  setup() {
    const mainStore = MAINstore();
    return {
      mainStore,
    };
  },
  data() {
    return {
      showSearch: false,
      search: "",
      prevPageDisabled: true,
      nextPageDisabled: Boolean,
      currentSorting: "DESC",
      sorting: [
        { type: "Random", value: "RANDOM" },
        { type: "Desc", value: "DESC" },
        { type: "Asc", value: "ASC" },
      ],
      currentType: "jpg,png",
      types: [
        { type: "All", value: "gif,jpg,png" },
        { type: "Static", value: "jpg,png" },
        { type: "Animated", value: "gif" },
      ],
      currentBreed: "",
      imagesCount: 1,
      currentLimit: 5,
      limits: [
        { type: "Limit: ", value: "5" },
        { type: "Limit: ", value: "10" },
        { type: "Limit: ", value: "15" },
        { type: "Limit: ", value: "20" },
        { type: "Limit: ", value: "50" },
        { type: "Limit: ", value: "100" },
      ],
      pages: [],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    reload() {
      this.loadImages(this.currentBreed, this.currentType, this.currentSorting);
    },
    setFavorite(item) {
      for (var i = 0; i < this.mainStore.favorites.length; i++) {
        if (this.mainStore.favorites[i] === item) {
          return false;
        }
      }
      return this.mainStore.favorites.push(item);
    },

    setPages() {
      this.pages = [];
      this.imagesCount = Object.keys(this.images).length;
      let numberOfPages = Math.ceil(this.imagesCount / this.currentLimit);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(images) {
      let page = this.galleryCurrentPage;
      let perPage = this.currentLimit;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return images.slice(from, to);
    },
  },
  created() {
    this.loadBreeds();
    this.loadImages(
      this.currentBreed,
      this.currentType,
      this.currentSorting,
      this.currentLimit
    );
  },
  mounted() {
    this.setPages();
  },
  computed: {
    breeds() {
      return this.mainStore.breeds;
    },
    images() {
      return this.mainStore.images;
    },
    nextPageDisabled() {
      return this.galleryCurrentPage < this.pages.length ? false : true;
    },
    galleryCurrentPage() {
      return this.mainStore.galleryCurrentPage;
    },
    paginatedImages() {
      return this.paginate(this.images);
    },
    prevShevronDisabled() {
      return "../assets/prev-shevron-disabled.svg";
    },
  },
  watch: {
    // search() {
    //   this.setPages();
    // },
    galleryCurrentPage() {
      this.prevPageDisabled = this.galleryCurrentPage == 1 ? true : false;
      this.nextPageDisabled = this.galleryCurrentPage < this.pages.length ? false : true;
    },
    images() {
      this.setPages();
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@200&display=swap");
@import url("../css/back-button.css");
@import url("../css/manosry-wall.css");
@import url("../css/pagination.css");
@import url("../css/tabs.css");

div.tab-name {
  margin-left: 10px;
}

button.upload-button {
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

button.upload-button:hover {
  color: #fff;
  background-color: #ff868e;
  background-image: url("../assets/upload-hover.svg");
}

.filters {
  background-color: #f8f8f7;
  border-radius: 10px;
  border-color: transparent;
  width: 100%;
  margin-top: 10px;
  padding: 10px;
}

.filters-row-st {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

form.order-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  position: relative;
}

form.type-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}

.filters-row-nd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
}

form.breed-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}

.limit-reload {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
form.limit-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
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

#limit {
  width: 16vw;
  margin-right: 1.6vw;
}

label {
  color: #8c8c8c;
  font-weight: 500;
  font-size: 10px;
  margin-left: 1.5vw;
}

button.reload-button {
  width: 30px;
  height: 30px;
  background-image: url("../assets/reload.svg");
  background-repeat: no-repeat;
  background-color: #fff;
  background-position: center;
  border-color: transparent;
  border-radius: 10px;
  margin: 15px 0 0 0;
}

button.reload-button:hover {
  background-image: url("../assets/reload-hover.svg");
  background-color: #ff868e;
}
</style>
