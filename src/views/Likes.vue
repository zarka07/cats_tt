<template>
  <div class="content-row">
    <Loader v-if="this.mainStore.loading" />
    <div class="current-content" v-else>
      <div class="current-tab">
        <button type="submit" class="back-button" value="" @click="goBack()"></button>
        <div class="tab-name">LIKES</div>
      </div>

      <div class="wall" v-if="this.mainStore.likes.length != 0">
        <masonry-wall
          :items="this.mainStore.likes"
          :ssr-columns="3"
          :column-width="180"
          :gap="8"
        >
          <template #default="{ item }">
            <div class="container-image">
              <img class="_image" v-if="item" :src="item.image.url" :alt="item.id" />
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
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@200&display=swap");
@import url("../css/back-button.css");
@import url("../css/manosry-wall.css");
.content-row {
  margin-top: 10px;
  width: 100%;
  height: 85vh;
  background-color: #fff;
  border-radius: 10px;
  padding: 0;
  display: flex;
  /* gap: 10px; */
}

.current-content {
  padding: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width:100%;
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
  margin-right: 10px;
}

button.back-button:hover {
  background-color: #ff868e;
  background-image: url("../assets/arrow-left-hover.svg");
}

div.tab-name {
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

.middle {
  align-items: center !important;
}

._text {
  background-image: url("../assets/like-heart.svg");
  background-position: center;
  background-repeat: no-repeat;
  height: 40px;
  width: 40px;
  color: #ff868e;
  margin-bottom: 0 !important;
  border-color: transparent;
}

._text:hover {
  background-image: url("../assets/delete-heart.svg");
}

.unset {
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
