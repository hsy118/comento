// import axios from 'axios'

import Vue from 'vue'
import Vuex from 'vuex'

import {requestList, requestAds, requestDetail} from "@/apis/list_api.js"

Vue.use(Vuex)

// const SERVER_URL = `https://problem.comento.kr`
// const IMG_PATH = `https://cdn.comento.kr/assignment`

export default new Vuex.Store({
  state: {
    mainList: [],
    adsList : [],
    conList: [],

    page: 1,
    order: '',
    limit: 10,
    category: ['1','2','3'],
    loading: false,

    conCnt: 0,
    adsCnt: 0,
    adsTime: 1,

    isModal: false,
    filteredList: [],

    detailView: {},
    reply: [],
    
  },
  getters: {
    getAdsList(state) {
      return state.adsList
    },
    getConList(state) {
      return state.conList
    },
    getOrder(state) {
      return state.order
    },
    getTotal(state) {
      return state.mainList
    },
    getLoading(state) {
      return state.loading
    },
    getconCnt(state) {
      return state.conCnt
    },
    getadsCnt(state) {
      return state.adsCnt
    },
    getadsTime(state) {
      return state.adsTime
    },
    getIsModal(state) {
      return state.isModal
    },
    getCategory(state) {
      return state.category
    },
    get_detail(state) {
      return state.detailView
    },
    get_reply(state) {
      return state.reply
    },
    get_filteredList(state) {
      return state.filteredList
    }
  },
  mutations: {
    PUT_ADS(state, ad) {
      state.adsList.push(ad)
    },
    PUT_CONTENTS(state, item) {
      state.conList.push(item)
    },
    START_LOADING(state) {
      state.loading = true
    },
    STOP_LOADING(state) {
      state.loading = false
    },
    ADD_CON(state) {
      state.conCnt += 1
    },
    ADD_ADS(state) {
      state.adsCnt += 1
    },
    ADD_CNT(state) {
      state.adsTime += 1
    },
    PUT_ORDER(state, ord) {
      state.order = ord
    },
    RE_ORDER(state) {
      state.mainList = []
      state.adsList = []
      state.conList = []
      state.page = 1
      state.adsCnt = 0
      state.conCnt = 0
      state.adsTime = 1
    },
    ON_MODAL(state) {
      state.isModal = true
    },
    CATEGORY_EDIT(state, categories) {
      state.category = categories
      state.filteredList = categories
    },
    OFF_MODAL(state) {
      state.isModal = false
    },
    PUT_DETAIL(state, detailView) {
      state.detailView = detailView
    },
    PUT_REPLY(state, reply) {
      state.reply = reply
    },
    OUT_DETAIL(state) {
      state.detailView = {}
      state.reply = []
    }
  },
  // state에서 바로 가져온거 getters로 수정
  actions: {
    CATEGORY_EDIT(context, categories) {
      context.commit("RE_ORDER")
      context.commit("CATEGORY_EDIT", categories)
      console.log(categories)
    },
    OFF_MODAL(context) {
      context.commit("OFF_MODAL")
    },
    ON_MODAL(context) {
      context.commit("ON_MODAL")
    },
    RE_ORDER(context) {
      context.commit("RE_ORDER")
    },
    ORD_EDIT(context, ord) {
      context.commit("PUT_ORDER", ord)
      console.log(ord)
    },
    async GET_LIST(context) {
      // 컨텐츠
      try {
        context.commit('START_LOADING')
        const res = await requestList(
          this.state.page, this.state.order, 
          this.state.category, this.state.limit
        )
        const res2 = await requestAds(this.state.page, this.state.limit)
        setTimeout(() => {
          // contents list
          let data = res.data.data
          for (let key in data) {
            context.commit("PUT_CONTENTS", data[key])
          }
          // ads
          let ads = res2.data.data
          for (let ad in ads) {
            context.commit("PUT_ADS", ads[ad])
          }
          this.state.page += 1
          console.log(res2.data)
          // ads + contents
          const totalList = this.getters.getTotal
          const conList = this.getters.getConList
          const adsList = this.getters.getAdsList
          for (let i = 0; i < 10; i++) {
            if (context.getters.getadsTime % 4 !== 0) {
              totalList.push(conList[this.getters.getconCnt])
              context.commit("ADD_CON")
              context.commit("ADD_CNT")
            } else {
              totalList.push(adsList[this.getters.getadsCnt])
              context.commit("ADD_ADS")
              context.commit("ADD_CNT")
            }
          }
          console.log(totalList)
          context.commit('STOP_LOADING')
        }, 500)
      }
      catch(err) {
        console.log(err)
      }
    },

    async GET_DETAIL(context, itemId) {
      try {
        const res = await requestDetail(itemId)
        console.log(itemId)
        setTimeout(() => {
          const data = res.data.data
          const date = data.created_at.substring(0, 10)
          console.log(data.reply)
          const detailView = {
            title: data[`title`],
            content: data[`contents`],
            created_at: date
          }
          context.commit("PUT_DETAIL", detailView)
          context.commit("PUT_REPLY", data.reply)
        }, 500)
      }
      catch(err) {
        console.log(err)
      }
    },
    OUT_DETAIL(context) {
      context.commit("OUT_DETAIL")
    }
  },
})
