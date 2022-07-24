import axios from "axios";
import { MAINstore } from "../store/mainStore";
export default {
  setup() {
    const mainStore = MAINstore();
    return {
      mainStore,
    };
  },
  methods: {
    async loadImages(breed_id, mime_type, order, limit = '5',) {
      console.log(breed_id)
      try {
        this.mainStore.loading = true;
        axios.defaults.headers.common["x-api-key"] =
          "bbf7ce2f-68fc-4879-8dda-4139a8c2823b";
        let response = await axios.get(`https://api.thecatapi.com/v1/images/search?mime_types=${mime_type}&order=${order}&limit=${limit}&breed_id=${breed_id}`);
        this.mainStore.images = response.data;
        this.mainStore.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
  }
}