import Vue from 'vue'
import Vuex from 'vuex'

import {requestList, requestAds, requestDetail} from "@/apis/list_api.js"

Vue.use(Vuex)
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
    getPage(state) {
      return state.page
    },
    getLimit(state) {
      return state.limit
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
    getDetail(state) {
      return state.detailView
    },
    getReply(state) {
      return state.reply
    },
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
    },
    ADD_PAGE(state) {
      state.page += 1
    },
  },
  actions: {
    CATEGORY_EDIT(context, categories) {
      context.commit("RE_ORDER")
      context.commit("CATEGORY_EDIT", categories)
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
    },
    async GET_LIST(context) {
      // 글과 광고를 요청하고, 메인 피드에 보여줄 내용(컨텐츠3, 광고1)을 처리
      const page = context.getters.getPage
      const order = context.getters.getOrder
      const category = context.getters.getCategory
      const limit = context.getters.getLimit
      // 컨텐츠
      try {
        // 로딩 문구 시작
        context.commit('START_LOADING')
        const res = await requestList(
          page, order, 
          category, limit
        )
        const res2 = await requestAds(page, limit)
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
          context.commit("ADD_PAGE")
          // 컨텐츠 3개 노출 후 광고 1개 삽입
          let totalList = this.getters.getTotal
          let conList = this.getters.getConList
          let adsList = this.getters.getAdsList
            // 컨텐츠의 순서대로 4번째 마다 광고를 삽입 하기 위한 과정
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
          // 로딩 문구 종료
          context.commit('STOP_LOADING')
        }, 500)
      }
      catch(err) {
        console.log(err)
      }
    },

    async GET_DETAIL(context, itemId) {
      // 상세 페이지 정보 조회를 위한 함수
      try {
        const res = await requestDetail(itemId)
        setTimeout(() => {
          const data = res.data.data
          const date = data.created_at.substring(0, 10)
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
      // 디테일 페이지를 나갔을 때,
      context.commit("OUT_DETAIL")
    }
  },
})
