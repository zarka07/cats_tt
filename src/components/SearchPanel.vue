<template>
  <div class="form-row">
    <form class="search-form">
      <input
        type="text"
        :disabled="!show"
        placeholder="Search for breeds by name"
        v-model="search"
      />
      <div class="search-submit"></div>
    </form>
    <div class="btn-group">
      <button class="links smile-button" type="button" @click="toLikes()"></button>
      <button class="links heart-button" type="button" @click="toFav()"></button>
      <button class="links nosmile-button" type="button" @click="toDislikes()"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-panel",
  props: ["show"],
  emits: ["search"],
  data() {
    return {
      search: "",
    };
  },
  methods: {
    toLikes() {
      this.$router.push("likes");
    },
    toFav() {
      this.$router.push("favorites");
    },
    toDislikes() {
      this.$router.push("dislikes");
    },
  },
  watch: {
    search() {
      this.$emit("search", this.search);
    },
  },
};
</script>

<style scoped>
@import url("../css/search-panel-with-icons.css");
@import url("../css/theme-light.css");
</style>
