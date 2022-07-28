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
    async loadBreeds() {
      try {
        axios.defaults.headers.common["x-api-key"] =
          "bbf7ce2f-68fc-4879-8dda-4139a8c2823b";
        let response = await axios.get("https://api.thecatapi.com/v1/breeds");
        this.mainStore.breeds = response.data.filter(item => {
          return item.hasOwnProperty('image')
        })
        return this.mainStore.breeds;
      } catch (error) {
        console.log(error);
      }
    },
  }
}