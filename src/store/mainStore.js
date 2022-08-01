import { defineStore } from 'pinia'

export const MAINstore = defineStore('mainStore',{
  state: ()=> {
    return{
      breedsCurrentPage: 1,
      galleryCurrentPage: 1,
      loading: false,
      showBreeds: true,
      showImages:true,
      showModal: false,
      breeds:[],
      images:[],
      favorites:[],
      likes:[],
      dislikes:[],
      actions:[],
    }
  },
})
