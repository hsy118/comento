<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__nav">
        <!-- 나가기 버튼 영역 -->
        <a @click="exitModal">X</a> 
      </div>
      <!-- 타이틀 -->
      <div class="modal__header">필터</div>
      <ul class="modal__body">
        <!-- 카테고리 리스트 -->
        <li>
            <input type="checkbox" id="cat1" value="1" v-model="checkedList">
            <label for="cat1">category_name : 1</label> 
        </li>
        <li> 
            <input type="checkbox" id="cat2" value="2" v-model="checkedList">
            <label for="cat2">category_name : 2</label> 
        </li>
        <li> 
            <input type="checkbox" id="cat3" value="3" v-model="checkedList">
            <label for="cat3">category_name : 3</label> 
        </li>
      </ul>
      <div class="modal__footer">
        <!-- 버튼영역 -->
          <a class="modal__btn" @click="onSubmit">저장하기</a>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      checkedList: [],
    }
  },
  methods:{
    exitModal() {
      // 모달 종료
      this.$store.dispatch("OFF_MODAL")
    },
    onSubmit() {
      // 필터 내용 전송
      let filteredList = this.checkedList
      if (this.checkedList.length === 0) {
        filteredList = ['1', '2', '3']
      }
      this.$store.dispatch("CATEGORY_EDIT", filteredList)
      this.$store.dispatch("OFF_MODAL")
    },
  },
  computed: {
    category() {
      return this.$store.getters.get_filteredList
    },
  },
  watch: {
  },

}
</script>
<style lang="scss">
$module : 'modal';
$padding: 1.5em;
$green: #2DB400;

.#{$module} {
  background-color: rgba(0,0,0,.7);
  top: 0; right: 0; bottom: 0; left: 0;
  position: fixed;
  overflow: auto;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &__content{
    width: 22em;
    background: #fff;
    padding: $padding;
    .modal__nav{
      display: flex;
      flex-direction: row-reverse;
      width: 100%;
      &:hover {
        cursor: pointer;
      }
      a {
        text-decoration:  none;
      }
    }
    .modal__header {
      font-weight: 700;
      font-size: 1.5rem;
    }
    .modal__body {
      list-style: none;
      padding-left: 0;
      li {
        padding: 3px 0;
      }
    }
    .modal__footer {
      display: flex;
      flex-direction: row-reverse;
      padding-right: 20px;
    }
    .modal__btn {
      padding: 10px 18px;
      background-color: $green;
      border-radius: 5px;
      color: #fff;
      box-shadow: 0.5 0.5 grey;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .modal__content {
    width: 75%;
    .modal__footer {
      .modal__btn {
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
