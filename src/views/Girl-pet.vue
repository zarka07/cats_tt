<template>
  <div class="right-part">
    <img class="bg-image" src="../assets/girl-and-pet1.png" alt="girl-and-pet" />
  </div>
</template>

<script>
export default {
  name: "tab-girlpet",
};
</script>

<style scoped>
.right-part {
  background-color: #fbe0dc;
  border-radius: 20px;
  height: 100%;
  position: relative;
}

.bg-image {
  position: absolute;
  right: -1.5vw;
  top: 10vh;
  width: 52vw;
  height: 90%;
}
</style>
