<template>
   <div class="container">
     <common-header></common-header>
     <router-view></router-view>
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

</style>