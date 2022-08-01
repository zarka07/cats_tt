import axios from "axios";
import { MAINstore } from "../store/mainStore";
export default {
    setup() {
        const mainStore = MAINstore();
        return {
            mainStore,
        }
    },
    methods: {
        async loadBreed(id) {
            this.mainStore.loading = true;
            try {
                axios.defaults.headers.common["x-api-key"] =
                    "bbf7ce2f-68fc-4879-8dda-4139a8c2823b";
                let response = await axios.get(
                    `https://api.thecatapi.com/v1/images/search?breed_ids=${id}`
                );
                this.selectedBreed = response.data[0];
                this.mainStore.loading = false;
            } catch (error) {
                console.log(error);
            }
        },
    }
}