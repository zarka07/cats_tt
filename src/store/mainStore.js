import { defineStore } from 'pinia'

export const MAINstore = defineStore('mainStore',{
  state: ()=> {
    return{
      currentTab: "Girlpet",
    }
  },
})
