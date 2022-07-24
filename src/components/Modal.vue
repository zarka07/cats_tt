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
              <button
                type="button"
                @click="this.mainStore.showModal = false"
                class="close-button"
              ></button>
            </div>
            <h2 class="upload-text">Upload a .jpg or .png Cat Image</h2>
            <h6 class="upload-text-description">
              Any uploads must comply with the
              <a
                class="upload-guidelines"
                href="https://thecatapi.com/privacy"
                target="_blank"
                >upload guidelines</a
              >
              or face deletion.
            </h6>
            <!-- choose'n'upload -->
            <Loader v-if="this.mainStore.loading"/>
            <div v-else id="upload-container" class="upload-container"
            :style="upload_container_bgc">
                <img class="downloaded-image" @click="pickFile" :src="image_url" v-if="image_file&&!show_success"/>
                <input
                  type="file"
                  style="display: none"
                  ref="image"
                  accept="image/*"
                  @change="onFilePicked"
                />

              <div v-if="!image_url">
                <button
                  class="upload-from-system-button"
                  type="button"
                  v-show="!uploading"
                  @click="pickFile"
                >
                  <span class="upload-text">Click here</span> to upload your file
                </button>
                
                <div v-show="uploading">Uploading</div>
              </div>

              <!-- <div>
                <div v-show="error_message" :value="true" type="error">
                  {{ error_message }}
                </div>
              </div> -->
            </div>
            <!-- end of choose'n'upload -->
            <div class="no-file" v-show="!image_file">No file selected</div>
            <div class="file-name" v-show="image_file" >Image File Name: {{image_name}}</div>
            <div class="upload-success" v-if="show_success">
              <img src="../assets/upload-success.svg" alt="upload-success">
              <div class="upload-success-text">Thanks for the Upload - Cat found!</div>
            </div>
            <div class="upload-success" v-if="show_fail">
              <img src="../assets/upload-failed.svg" alt="upload-failed">
              <div class="upload-success-text">No Cat found - try a different one</div>
            </div>
            <button
                  v-show="image_file && !uploading"
                  class="upload-to-server-button"
                  @click="uploadFile"
                >
                  Upload photo
                </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MAINstore } from "../store/mainStore";
import Loader from '../components/Loader.vue';
import axios from 'axios';
export default {
  name: "modal-component",
  components: { Loader },
  setup() {
    const mainStore = MAINstore();
    return {
      mainStore,
    };
  },
  data() {
    return {
      show_success: false,
      show_fail:false,
      image_name: "",
      image_file: "",
      image_url: "",
      uploading: false,
      uploaded_image: {},
      image_analysis: [],
      headers: [{ text: "Name" }, { text: "Confidence" }],
      error_message: null,
    };
  },
  computed:{
    upload_container_bgc(){
      return this.show_fail?'background-color:#FBE0DC':'background-color:#FFF';
    }
  },
  methods: {
    pickFile() {
      this.error_message = null;
      this.$refs.image.click();
      console.log(this.uploaded_image)
    },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.image_name = files[0].name;
        if (this.image_name.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.image_url = fr.result;
          this.image_file = files[0];
        });
      } else {
        this.image_name = "";
        this.image_file = "";
        this.image_url = "";
      }
    },
    async uploadFile() {
      this.mainStore.loading = true;
      this.show_success = false;
      this.show_fail = false;
      this.uploading = true;
      let formData = new FormData();
      formData.append("file", this.image_file);

      try {
        axios.defaults.headers.common["x-api-key"] =
          "bbf7ce2f-68fc-4879-8dda-4139a8c2823b"; // Replace this with your API Key
        let response = await axios.post(
          "https://api.thecatapi.com/v1/images/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("response data: ", response.data);
        this.uploaded_image = response.data;
        this.uploading = false;
        this.image_file = null;
        this.loadImageAnaylsis(this.uploaded_image.id);
        this.show_success = true;
        this.image_url = "";
        this.mainStore.loading = false;
      } catch (error) {
        this.mainStore.loading = false;
        console.log(error);
        this.error_message = error.response.data.message;
        this.uploading = false;
        this.show_fail = true;
        
      }
    },
    async loadImageAnaylsis(image_id) {
      let response = await axios.get(
        "https://api.thecatapi.com/v1/images/" + image_id + "/analysis"
      ); // Ask for 1 Image, at full resolution

      this.image_analysis = response.data[0].labels;
      console.table("response labels: ", response.data[0].labels);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap");
.modal {
  /* display: block;
  opacity: 0.8; */
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
  min-height: 93vh;
  height:auto;
  border-radius: 20px;
  margin: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

div.block {
  display: flex;
  justify-content: flex-end;
  width: 100%;
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
  color: #1d1d1d;
  font-size: 26px;
}

.upload-text-description {
  font-family: "Jost";
  font-size: 14px;
  font-style: normal;
  color: #8c8c8c;
  width: 95%;
}

a.upload-guidelines {
  color: #ff868e;
  text-decoration: none;
}

.upload-container {
  height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #fbe0dc;
  background-color: #fff;
  border-radius: 20px;
  background-image: url("../assets/image-upload.svg");
  background-position: center;
  background-repeat: no-repeat;
}

.select-img{
  width:inherit;
  height: inherit;
}

.downloaded-image{
  width:auto;
  height:90%;
  border-radius: 10px;
}

.no-file {
  font-family: "Jost";
  font-style: normal;
  font-weight: 500;
  color: #8c8c8c;
  font-size: 18px;
  margin-top: 20px;
}

.file-name{
  margin-top: 20px;
  font-family: "Jost";
  font-style: normal;
  font-weight: 400;
  color: #8C8C8C;
  font-size:16px;
}

.upload-from-system-button {
  border-color: transparent;
  background-color: transparent;
  color: #8c8c8c;
  font-size: 15px;
}

span.upload-text {
  color: #1d1d1d;
  font-size: 18px;
}

.upload-to-server-button{
  background-color: #FF868E;
  color: #FFFFFF;
  width:auto;
  height:30px;
  margin-top: 10px;
  margin-bottom:10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Jost", sans-serif;
  font-weight: 500;
  font-size: 15px;
  border-color: transparent;
  border-radius: 10px;
}

.upload-success{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: "Jost";
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  border-radius:10px;
  background-color: #fff;
  padding: 15px;
}

.upload-success-text{
  margin-left:10px;
}
</style>
