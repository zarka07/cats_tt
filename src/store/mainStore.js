import { defineStore } from 'pinia'

export const MAINstore = defineStore('mainStore',{
  state: ()=> {
    return{
      currentPage: 1,
      loading: false,
      showBreeds: true,
      showImages:true,
      showModal: false,
      breeds:[],
      images:[],
      favorites:[],
      likes:[],
      dislikes:[],
    }
  },
})
