<template>
  <div class="main-body">
    <!-- 로그인 섹션 -->
    <section class="login">
      <button href="#" class="login__btn">로그인</button>
    </section>
    <!-- 컨텐트 섹션 -->
    <section class="content">
      <!-- 네브 바 -->
      <div class="content__navbar">
        <div class="navbar__sorts">
          <span class="navbar__sorts__asc" @click="changeOrder(`asc`)">
            <span class="dot-asc"></span>오름차순
          </span>
          <span class="navbar__sorts__desc" @click="changeOrder(`desc`)">
            <span class="dot-desc"></span>내림차순
          </span>
        </div>
        <button class="navbar__filter__btn" @click="onModal">
          필터
        </button>
      </div>
      <!-- 카드 섹션 -->
      <section class="cards" 
      v-for="(item, idx) in list"
      :key="idx"
      :item="list[idx]"
      @click="onDetail(item.id)"
      >
        <div v-if="!item.img">
          <div class="card__header">
            <div class="card__category">{{item.category_id}}</div>
            <div class="card__id">{{item.id}}</div>
          </div>
          <div class="card__body">
            <div class="card__body__header">
              <div class="body__user-id">{{item.user_id}}</div>
              <div class="body__created-at">
                created_at({{item.created_at | dateFilter}})
              </div>
            </div>
            <div class="card__body__main">
              <div class="main__title">{{item.title}}</div>
              <div class="main__content">{{item.contents}}</div>
            </div>
          </div>
        </div>
        <section class="ads" v-else>
          <div class="ads__header">sponsored</div>
            <div class="ads__body">
              <img v-bind:src="(item.img, `https://cdn.comento.kr/assignment/${item.img}`)" 
              class="ads__img" alt="ads-img"
              />
              <div class="ads__description">
                <div class="ads__description__title">{{item.title}}</div>
                <div class="ads__description__content">{{item.contents}}</div>
              </div>
          </div>
        </section>
      </section>
      <section class="loading" v-if="onLoading">
        글을 불러오는 중입니다 잠시만 기다려주세요 !
      </section>
    </section>
  </div>
</template>

<script>
import router from "@/router/index.js"

export default {
  name: "main",
  // 데이터
  data() {
    return {
      isMain: false,
    }
  },
  // 메서드
  methods: {
    onDetail(id) {
      // 세부 글 정보로 이동
      router.push(`/detail/${id}`)
    },
    onModal() {
      // 모달 활성화
      this.$store.dispatch("ON_MODAL")
      this.$emit('onFilter')
    },
    loadMore() {
      // 리스트 호출
      this.loading = true
      this.$store.dispatch("GET_LIST")
      this.loading = false
    },
    orderAsc () {
      // Mount될 시, 기본적으로 오름 차순 정렬 & 버튼 활성화 css 추가
      this.$store.dispatch("ORD_EDIT", 'asc')
      const asc = document.querySelector(".navbar__sorts__asc")
      const dot = document.querySelector(".dot-asc")
      asc.style.color = "#2DB400"
      dot.style.backgroundColor = "#2DB400"
    },
    changeOrder(val) {
      // 오름차순, 내림차순 이벤트와 효과 추가
      this.$store.dispatch("RE_ORDER")
      this.$store.dispatch("ORD_EDIT", val)
      this.$store.dispatch("GET_LIST")
      const asc = document.querySelector(".navbar__sorts__asc")
      const dotAsc = document.querySelector(".dot-asc")
      const desc = document.querySelector(".navbar__sorts__desc")
      const dotDesc = document.querySelector(".dot-desc")
      if (val === 'asc') {
        //오름차순 일 때,
        asc.style.color = "#2DB400"
        dotAsc.style.backgroundColor = "#2DB400"
        // 선택되지 않은 차순 초기화
        desc.style.color = "lightslategrey"
        dotDesc.style.backgroundColor = "lightslategrey"
      } else {
        // 내림차순 일 때,
        desc.style.color = "#2DB400"
        dotDesc.style.backgroundColor = "#2DB400"
        // 선택되지 않은 차순 초기화
        asc.style.color = "lightslategrey"
        dotAsc.style.backgroundColor = "lightslategrey"
      }
    },
  },
  watch: {
    category() {
      this.$store.dispatch("GET_LIST")
    },
  },
  computed: {
    list() {
      return this.$store.getters.getTotal
    },
    order() {
      return this.$store.getters.getOrder
    },
    category() {
      return this.$store.getters.getCategory
    },
    onLoading() {
      return this.$store.getters.getLoading
    },
  },
  mounted() {
    // 오름 차순 기본값 설정
    this.orderAsc()
    // 메인 피드에서만 하겠금
    this.isMain = true
    // 스크롤이 밑으로 가면 감지
    window.addEventListener('scroll', () => {
      // 스크롤 이벤트로 'infinite-loading'구현
      const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
      if(clientHeight + scrollTop >= scrollHeight - 5 && this.isMain) {
		    if (this.$store.getters.getLoading === false)
        this.loadMore();
	    }
    })
    // 시작하자마자 리스트 호출
    this.loadMore()
  },
  filters: {
    dateFilter: function(date) {
        // 날짜 필터링
        return date.substring(0,10)
      }
    },
  destroyed() {
    //페이지 전환시 스크롤 이벤트 중지
    this.isMain = false
    // 뷰엑스 저장된 글 초기화
    this.$store.dispatch("RE_ORDER")
    
  }
}
</script>

<style lang='scss'>
@import '@/assets/scss/main';
  .main-body {
    width: $main-base-width;
    margin: 5vh auto 0 auto;
    display: flex;
    justify-content: space-between;
    /* 로그인 */
    .login {
      width: $login-width;
      margin-right: 5%;
      .login__btn {
        font-size: 20px;
        height: 64px;
        width: 100%;
        background-color: $login-btn-color;
        border: none;
        border-radius: $border-radius;
        color: $btn-text-color;
        box-shadow: 0.5px 0.5px gray;
        }
    }
      /* 컨텐트 */
    .content {
      width: $content-width;
      .content__navbar {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        .navbar__sorts__asc {
          color: $content-header-color;
          &:hover{
            cursor: pointer;
          }
          .dot-asc {
            @include dotLayout;
          }
        }

        .navbar__sorts__desc {
          color: $content-header-color;
          &:hover{
            cursor: pointer;
          }
            .dot-desc {
              @include dotLayout;
            }
        }
        .navbar__filter__btn {
          opacity: $navbar-opacity;
          cursor: pointer;
        }
      }
      // 컨텐츠 카드
      .cards{
        border: $content-border;
        border-radius: $border-radius;
        padding: var(--cards-padding);
        margin-bottom: 20px;
        &:hover {
          cursor: pointer;
        }
        .card__header {
          display: flex;
          justify-content: space-between;
          padding: $main-feed-padding;
          border-bottom: $content-border;
          color: $content-header-color;
        }
        .card__body {
          padding: $main-feed-padding;
          .card__body__header {
            display: flex;
            margin-bottom: $main-feed-padding;
            .body__user-id {
              border-right: $content-border;
              padding-right: $main-feed-padding;
              color: $login-btn-color;
            }
            .body__created-at {
              padding-left: $main-feed-padding;
            }
          }
          .card__body__main {
            margin-top: 20px;
            .main__title {
              @include cardTextStyle;
              font-size: $title-font-size;
              font-weight: $title-font-weight;
              margin-bottom: 0.6em;
            }
            .main__content {
              @include cardTextStyle;
              line-height: 1.3;
            }
          }
        }
        // 광고 카드
        .ads__header {
          color: $content-header-color;
          padding: $main-feed-padding;
          padding-top: 0;
        }
        .ads__body {
          display: flex;
          padding: $main-feed-padding;
          .ads__img {
            display: block;
            width: 300px;
            margin-right: 3%;
            max-height: 175px;
          }
          .ads__description {
            width: 66%;
            .ads__description__title {
              @include adsTextStyle(2);
              font-size: $title-font-size;
              font-weight: $title-font-weight;
              margin-bottom: 0.5em;
            }
            .ads__description__content {
              @include adsTextStyle(4);
              height: 4.8em;
            }
          }
        }
      }
    }
    .loading {
      text-align: center;
    }
  }
  @media screen and (max-width: 768px) {
    .main-body {
      margin: 0;
      width: 93vw;
      .content{
        width: 100%;
      }
        .login {
          display: none;
        }
        .content {
          width: $mobile-content-width;
            .content__navbar {
              padding-left: 2px;
            }
          .cards {
            border-radius: 0;
            border: $mobile-card-border;
            width: $mobile-content-width;
            .card__header {
              border-bottom: $mobile-card-border;
              padding: $mobile-card-padding;
            }
            .body__created-at {
              display: none;
            }
            .ads__body {
              flex-direction: column;
              .ads__img {
                width: 100%;
              }
              .ads__description {
                width: 100%;
                .ads__description__content {
                  -webkit-line-clamp: 2;
                  height: 2.4em;
                }
              }
            }
          }
        }
    }
  }
</style>