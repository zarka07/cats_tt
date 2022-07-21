import { defineStore } from 'pinia'

export const MAINstore = defineStore('mainStore',{
  state: ()=> {
    return{
      currentTab: "Girlpet",
      currentPage: 1,
      loading: true,
      showBreeds: true,
      showModal: false,
    }
  },
})
