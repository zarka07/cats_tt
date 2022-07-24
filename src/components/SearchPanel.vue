<template>
  <div class="form-row">
    <form class="search-form">
      <input type="text" placeholder="Search for breeds by name" />
      <div class="search-submit"></div>
    </form>
    <button class="links smile-button" type="button"></button>
    <button class="links heart-button" type="button"></button>
    <button class="links nosmile-button" type="button"></button>
  </div>
</template>

<script>
export default {
  name: "search-panel",
};
</script>

<style scoped>
@import url("../css/search-panel-with-icons.css");
</style>
