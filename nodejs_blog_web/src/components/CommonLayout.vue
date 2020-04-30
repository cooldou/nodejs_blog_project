<template>
  <div class="container">
    <common-header></common-header>
    <router-view class="body"></router-view>
    <common-footer></common-footer>
  </div>
</template>

<script>
  import CommonHeader from '@/components/CommonHeader'
  import CommonFooter from '@/components/CommonFooter'
  export default {
    name: "CommonLayout",
    components: {
      CommonHeader,
      CommonFooter
    }
  }
</script>

<style lang="scss">
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .body {
      flex: 1;
      overflow: auto;
    }
  }
</style>