<template>
  <div>
    <header class="header">[제출일] 한승엽</header>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>

export default {

}
</script>

<style>
:root {
  --header-padding: 0.6rem;
  --base-width: 76vw;
  --base-border-radius: 5px;

  --login-width: 280px;
  --login-btn-color: #2DB400;
  --login-text-color: #eeeeee;
  --navbar-opacity: 0.5;
  
  --content-width: 100%;
  --content-header-color: lightslategrey;
  --cards-border: 2px solid lightgrey;
  --cards-padding: 18px 24px;
  --cards-title-font-size: 2rem;
  --cards-title-font-weight: 600;
  --cards-content-margin-top: 25px;

  
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
