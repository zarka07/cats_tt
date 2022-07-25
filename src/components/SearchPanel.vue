<template>
  <div class="form-row">
    <form class="search-form">
      <input type="text" placeholder="Search for breeds by name" />
      <div class="search-submit"></div>
    </form>
    <button class="links smile-button" type="button" @click="toLikes()"></button>
    <button class="links heart-button" type="button" @click="toFav()"></button>
    <button class="links nosmile-button" type="button" @click="toDislikes()"></button>
  </div>
</template>

<script>
export default {
  name: "search-panel",
  methods:{
    toLikes(){
      console.log('here')
      this.$router.push('likes')
    },
    toFav(){
      this.$router.push('favorites')
    },
    toDislikes(){
      this.$router.push('dislikes')
    }
  }
};
</script>

<style scoped>
@import url("../css/search-panel-with-icons.css");

</style>
