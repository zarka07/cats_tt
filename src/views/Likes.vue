<template>
  <search-panel :show="showSearch" @search="this.search = $event"></search-panel>
  <div class="_content-row">
    <Loader v-if="this.mainStore.loading" />
    <div class="_current-content" v-else>
      <div class="_current-tab">
        <button type="submit" class="_back-button" value="" @click="goBack()"></button>
        <div class="_tab-name">LIKES</div>
      </div>

      <div class="wall" v-if="this.mainStore.likes.length != 0">
        <masonry-wall
          :items="likesByTitle"
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
      <div class="unset" v-else>No item found</div>
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
  name: "tab-likes",
  data(){
    return{
      showSearch: true,
      search: "",
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    unset(item) {
      const deletable = item;
      for (let i = 0; i < this.mainStore.likes.length; i++) {
        if (this.mainStore.likes[i] === deletable) {
          this.mainStore.likes.splice(i, 1);
          break;
        }
      }
    },
  },
  computed:{
    likesByTitle() {
      return this.mainStore.likes.filter(
        (item) => item.id.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
      );
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@200&display=swap");
@import url("../css/back-button.css");
@import url("../css/manosry-wall.css");
@import url("../css/small-tabs.css");
@import url("../css/theme-light.css");

.unset {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 40px;
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
