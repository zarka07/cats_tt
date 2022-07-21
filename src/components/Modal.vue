<template>
  <div
    class="modal"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="row">
          <div class="left"></div>
          <div class="right">
            <div class="block">
              <button type="button" @click="this.mainStore.showModal = false" class="close-button"></button>
            </div>
            <h2 class="upload-text">Upload a .jpg or .png Cat Image</h2>
            <h6 class="upload-text-description">Any uploads must comply with the <a class="upload-guidelines">upload guidelines</a> or face deletion.</h6>

            

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MAINstore } from "../store/mainStore";
export default {
  name: "modal-component",
  setup(){
    const mainStore = MAINstore();
    return{
      mainStore,
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap");
.modal {
  display: block;
  opacity: 0.8;
  display: flex;
  justify-content: center;
}

.modal-dialog {
  max-width: 1400px;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.modal-content {
  height: 100%;
  background-color: rgba(29, 29, 29, 0.6);
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.left {
  width: 47%;
}

.right {
  width: 49%;
  background-color: #f8f8f7 !important;
  border-color: transparent;
  height: auto;
  border-radius: 20px;
  margin: 20px;
}

div.block {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
}

button.close-button {
  width: 30px;
  height: 30px;
  background-image: url("../assets/close.svg");
  background-repeat: no-repeat;
  background-color: #fff;
  background-position: center;
  border-color: transparent;
  border-radius: 10px;
}

.upload-text {
  font-family: "Jost";
  font-style: normal;
  font-weight: 500;
  color:#1D1D1D;
}

.upload-text-description{
  font-family: "Jost";
  font-style: normal;
  font-weight: 500;
  color: #8C8C8C;
}

a.upload-guidelines{
  color: #FF868E;
  text-decoration: none;
}
/* ._modal{
width:100vw;
  height:100vh;
  text-align: center;
  background-color: rgba(29, 29, 29, 0.6);
  opacity: .8;
  overflow:hidden;
} */
</style>
