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
        <button class="navbar__filter__btn">필터</button>
      </div>
      <!-- 카드 섹션 -->
      <section class="cards" v-for="(item, idx) in list"
      :key="item.id"
      :item="list[idx]">

        <div class="card__header">
          <div class="card__category">{{item.category_id}}</div>
          <div class="card__id">{{item.id}}</div>
        </div>
        <div class="card__body">
          <div class="card__body__header">
            <div class="body__user-id">{{item.user_id}}</div>
            <div class="body__created-at">created_at({{item.created_at | dateFilter}})</div>
          </div>
          <div class="card__body__main">
            <div class="main__title">{{item.title}}</div>
            <div class="main__content">{{item.contents}}</div>
          </div>
        </div>

      </section>

      <section class="ads">

        <div class="ads__header">sponsored</div>
          <div class="ads__body">
            <img src="../assets/logo.png" class="ads__img" alt="ads-img">
            <div class="ads__description">
              <div class="ads__description__title">title titletitlet title title title titletitle title title title title title title title title</div>
              <div class="ads__description__content">content ccontent content content contentontent content content content content content content content content content content content content content</div>
          </div>
        </div>
        
      </section>
    <!-- infinite loading -->
    <!-- <infinite-loading
      @infinite="infiniteHandler"
      ref="infiniteLoading"
    >
      <div slot="no-more">목록의 끝입니다 :)</div>
      <div slot="no-results">목록이 비어있습니다 :(</div>
    </infinite-loading> -->

    </section>
  </div>
</template>

<script>
// import InfiniteLoading from "vue-infinite-loading";
import axios from "axios"

const SERVER_URL = `https://problem.comento.kr`

export default {
  name: "main",
  components: {
    // InfiniteLoading,
  },
  data() {
    return {
      mainList: [],
      list: [],
      filter: '',
      page: 1,
      order: '',
      limit: 10,
      category: [1,2,3],
    }
  },
  methods: {
    infiniteHandler($state) {
      axios({
        method: "get",
        url: `${SERVER_URL}/api/list`,
        params: {
          page: this.page,
          ord: this.order,
          category: this.category,
          limit: this.limit,
        },
      })
      .then((res) => {
        // console.log(res)
        // console.log(this.list)
        setTimeout(() => {
          if (res.data.total > this.limit || res.data.last_page > this.page) {
            let data = res.data.data
            for (let key in data) {
              this.list.push(data[key])
            }
            this.limit += 10
            this.page += 1
            $state.loaded()
          } else {
            $state.complete()
          }
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
      this.$store.dispatch("GET_ADS", this.page, this.limit)
    },

    orderAsc () {
      this.order = "asc"
      const asc = document.querySelector(".navbar__sorts__asc")
      const dot = document.querySelector(".dot-asc")
      asc.style.color = "#2DB400"
      dot.style.backgroundColor = "#2DB400"
    },
    
    changeOrder(val) {
      this.order = val;
      const asc = document.querySelector(".navbar__sorts__asc")
      const dotAsc = document.querySelector(".dot-asc")
      const desc = document.querySelector(".navbar__sorts__desc")
      const dotDesc = document.querySelector(".dot-desc")
      if (val === 'asc') {
        asc.style.color = "#2DB400"
        dotAsc.style.backgroundColor = "#2DB400"
        // 다른 차순 초기화
        desc.style.color = "lightslategrey"
        dotDesc.style.backgroundColor = "lightslategrey"
      } else {
        desc.style.color = "#2DB400"
        dotDesc.style.backgroundColor = "#2DB400"
        // 다른 차순 초기화
        asc.style.color = "lightslategrey"
        dotAsc.style.backgroundColor = "lightslategrey"
      }
    },
  },
  watch: {
    order() {
      this.list = []
      this.limit = 10
      this.page = 1
      this.$refs.infiniteLoading.stateChanger.reset();
    }
  },
  mounted() {
    this.orderAsc()
  },
  filters: {
    dateFilter: function(date) {
        return date.substring(0,9)
      }
    },
}
</script>

<style>
  .main-body {
    width: var(--base-width);
    margin: 5vh auto 3vh auto;
    display: flex;
    justify-content: space-between;
  }
  .login {
    width: var(--login-width);
    margin-right: 5%;
  }
  /* 로그인 */
  .login__btn {
    font-size: 20px;
    height: 64px;
    width: 100%;
    background-color: var(--login-btn-color);
    border: none;
    border-radius: 5px;
    color: var(--login-text-color);
    }
    /* 컨텐트 */
  .content {
    width: var(--content-width);
  }
  /* 네브바 */
  .content__navbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .navbar__sorts__asc {
    color: var(--content-header-color);
  }
  .navbar__sorts__desc {
    color: var(--content-header-color);
  }
  .navbar__sorts__asc.active,
  .navbar__sorts__desc.active,
  .dot-asc.active,
  .dot-desc.active {
    color: var(--login-btn-color);
  }
  .navbar__sorts__desc {
    margin-right: 10px;
  }
  .dot-asc {
    height: 12px;
    width: 12px;
    background-color: var(--content-header-color);
    border-radius: 50%;
    display: inline-block;
    margin-right: 6px;
  }
  .dot-desc {
    height: 12px;
    width: 12px;
    background-color: var(--content-header-color);
    border-radius: 50%;
    display: inline-block;
    margin-right: 6px;
  }
  .navbar__filter__btn {
    opacity: var(--navbar-opacity);
  }
  /* 카드 */
  .cards{
    border: var(--cards-border);
    border-radius: var(--base-border-radius);
    padding: var(--cards-padding);
    margin-bottom: 20px;
  }
  .card__header {
    display: flex;
    justify-content: space-between;
    padding: var(--header-padding);
    border-bottom: var(--cards-border);
    color: var(--content-header-color);
  }
  
  .card__body {
    padding: var(--header-padding);
  }
  .card__body__header {
    display: flex;
    margin-bottom: var(--header-padding);
  }
  .body__user-id {
    border-right: var(--cards-border);
    padding-right: var(--header-padding);
    color: var(--login-btn-color);
  }
  .body__created-at {
    padding-left: var(--header-padding);
  }

  .card__body__main {
    margin-top: var(--cards-content-margin-top);
  }
  .main__title {
    font-size: var(--cards-title-font-size);
    font-weight: var(--cards-title-font-weight);
    margin-bottom: 0.6em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    /* line-height: 1.2; */
    display: -webkit-box;
    height: 1.3em;
    text-align: left;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .main__content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.3;
    display: -webkit-box;
    height: 1.3em;
    text-align: left;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  /* ads */
  .ads {
    padding: var(--header-padding);
    border: var(--cards-border);
    border-radius: var(--base-border-radius);
  }

  .ads__header {
    color: var(--content-header-color);
    padding: var(--header-padding);
  }
  
  .ads__body {
    display: flex;
    padding: var(--header-padding);
  }
  .ads__img {
    display: block;
    width: 15em;
    margin-right: 3%;
    max-height: 160px;
  }
  .ads__description {
    width: 66%;
  }
  .ads__description__title {
    font-size: var(--cards-title-font-size);
    font-weight: var(--cards-title-font-weight);

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    /* line-height: 1.2; */
    display: -webkit-box;
    height: 2.6em;
    text-align: left;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .ads__description__content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.2em;
    display: -webkit-box;
    height: 4.8em;
    text-align: left;
    word-wrap: break-word;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  @media screen and (max-width: 768px) {
    .login {
      display: none;
    }
    .body__created-at {
      display: none;
    }
    .ads__body {
      flex-direction: column;
    }
    .ads__img {
      width: 100%;
    }
    .ads__description {
      width: 100%;
    }
    .ads__description__content {
      -webkit-line-clamp: 2;
      height: 2.4em;
    }
  }

</style>