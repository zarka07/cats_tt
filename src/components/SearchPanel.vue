<template>
  <div class="row form-row">
    <form>
      <input type="text" placeholder="Search for breeds by name" />
      <input type="submit" value="" />
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
.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

form {
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

input[type="submit"] {
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

input[type="submit"]:hover {
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
</style>
