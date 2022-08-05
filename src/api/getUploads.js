import axios from "axios";
import { MAINstore } from "../store/mainStore";
export default {
    setup() {
        const mainStore = MAINstore();
        return {
            mainStore,
            uploads:[]
        }
    },
    methods: {
        async loadUploads() {
            this.mainStore.loading = true;
            try {
                axios.defaults.headers.common["x-api-key"] =
                    "bbf7ce2f-68fc-4879-8dda-4139a8c2823b";
                let response = await axios.get(
                    `https://api.thecatapi.com/v1/images/?limit=10&page=0&sub_id=user1`
                );
                this.uploads = response.data;
                console.log(this.uploads)
                this.mainStore.loading = false;
            } catch (error) {
                console.log(error);
            }
        },
    }
}