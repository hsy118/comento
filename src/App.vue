<template>
  <div>
    <header class="header">[제출일] 한승엽</header>
    <hr>
    <Modal v-show="isModal"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue"

export default {
  data() {
    return {
      filtering: [],
    }
  },
  methods: {

  },
  components: {
    Modal,
  },
  computed:{
    isModal() {
      return this.$store.getters.getIsModal
    },
  },
}
</script>

<style>
:root {
  --header-padding: 0.6rem;
  --base-width: 81vw;
  --base-border-radius: 5px;

  --login-width: 280px;
  --login-btn-color: #2DB400;
  --login-text-color: #eeeeee;
  --navbar-opacity: 0.5;
   
  --content-width: 70%;
  --content-moble-width: 100vw;
  --content-header-color: lightslategrey;
  --cards-border: 2px solid lightgrey;
  --cards-mobile-border: 1px solid lightgrey;
  --cards-padding: 18px 24px;
  --cards-mobile-padding: 6px 4px;
  --cards-title-font-size: 2rem;
  --cards-title-font-weight: 600;
  --cards-content-margin-top: 25px;

  
}
.html{
  padding: 0;
}
.header{
  color:red;
  padding: var(--header-padding);
  display: block;
  width: var(--base-width);
  margin-left: auto;
  margin-right: auto;
}
</style>
