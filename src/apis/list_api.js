import axios from 'axios'

const SERVER_URL = `https://problem.comento.kr`

// 글 요청
function requestList(page, ord, category, limit) {
    return axios({
        method: "GET",
        url: `${SERVER_URL}/api/list`,
        params: {
          page,
          ord,
          category,
          limit,
        },
      })
}

// 광고 요청
function requestAds(page, limit) {
    return axios({
        method: "GET",
        url: `${SERVER_URL}/api/ads`,
        params: {
          page,
          limit,
        }
      })
}

//디테일 요청
function requestDetail(itemId) {
  return axios({
    method: "GET",
    url: `${SERVER_URL}/api/view`,
    params: {
      id: itemId
    }
  })
}


export {
    requestList,
    requestAds,
    requestDetail,
}