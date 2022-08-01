<template>
  <div class="content-row">
    <Loader v-if="this.mainStore.loading" />
    <div class="current-content" v-else>
      <div class="current-tab">
        <button type="submit" class="back-button" value="" @click="goBack()"></button>
        <div class="tab-name"><span>FAVORITES</span></div>
      </div>

      <div class="wall" v-if="this.mainStore.favorites.length != 0">
        <masonry-wall
          :items="this.mainStore.favorites"
          :ssr-columns="3"
          :column-width="180"
          :gap="8"
        >
          <template #default="{ item }">
            <div class="container-image">
              <img class="_image" v-if="item" :src="item.url" :alt="item.id" />
              <div class="middle">
                <button type="button" class="_text" @click="unset(item)"></button>
              </div>
            </div>
          </template>
        </masonry-wall>
      </div>
      <div class="noFavorites" v-else>No item found</div>
    </div>
  </div>
</template>

<script>
import SearchPanel from "../components/SearchPanel.vue";
import Loader from "../components/Loader.vue";
import { MAINstore } from "../store/mainStore";
export default {
  components: { SearchPanel, Loader },
  setup() {
    const mainStore = MAINstore();
    return {
      mainStore,
    };
  },
  name: "tab-favorites",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    unset(item) {
      const deletable = item;
      for (let i = 0; i < this.mainStore.favorites.length; i++) {
        if (this.mainStore.favorites[i] === deletable) {
          this.mainStore.favorites.splice(i, 1);
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@200&display=swap");
@import url("../css/back-button.css");
@import url("../css/manosry-wall.css");
@import url("../css/small-tabs.css");

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
