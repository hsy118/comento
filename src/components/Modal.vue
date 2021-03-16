<template>
  <div class="modal-mask">
    <div class="modal">
      <div class="modal__nav">X</div>
      <div class="modal__header">필터</div>
      <ul class="modal__body">
        <li> 
            <input type="checkbox">
            category_name : 1
        </li>
        <li> 
            <input type="checkbox">
            category_name : 2
        </li>
        <li> 
            <input type="checkbox">
            category_name : 3
        </li>
      </ul>
      <div class="modal__footer">
          <a class="modal__btn"></a>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
$module : 'my-modal'
.#{$module} {
  display: flex
  align-items: center
  justify-content: center
  position: fixed
  z-index: 30
  background-color: rgba(0,0,0,.7)
  // top: 0; right: 0; bottom: 0; left: 0;
  position: fixed
  margin: 0
}
</style>

<script>
export default {

}
</script>
