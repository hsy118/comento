<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__nav">
        <a href="">X</a> 
      </div>
      <div class="modal__header">필터</div>
      <ul class="modal__body">
        <li> 
            <input type="checkbox" id="cat1" value="1" v-model="category">
            <label for="cat1">category_name : 1</label> 
        </li>
        <li> 
            <input type="checkbox" id="cat2" value="2" v-model="category">
            <label for="cat2">category_name : 2</label> 
        </li>
        <li> 
            <input type="checkbox" id="cat3" value="3" v-model="category">
            <label for="cat3">category_name : 3</label> 
        </li>
      </ul>
      <div class="modal__footer">
          <a class="modal__btn" @click="onSubmit">저장하기</a>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      category: [],
    }
  },
  methods:{
    onSubmit() {
      this.$store.dispatch("CATEGORY_EDIT", this.category)
      this.$store.dispatch("OFF_MODAL")
    },
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
      a {
        text-decoration:  none;
      }
    }
    .modal__header {
      font-weight: 700;
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
    }
  }

}
</style>
