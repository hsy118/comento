<template>
  <div>
    <header class="header">[제출일: 2020-03-19] 한승엽</header>
    <hr>
    <Modal v-show="isModal"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue"

export default {
  components: {
    Modal,
  },
  computed:{
    isModal() {
      // 모달 트리거
      return this.$store.getters.getIsModal
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/main';

.header{
  padding: $main-feed-padding;
  display: block;
  width: $main-base-width;
  margin-left: auto;
  margin-right: auto;
}
</style>
