<template>
  <div class="home">
    <div class="wrapper">
      <div class="main">
        <blog-list :data="data"></blog-list>
      </div>
    </div>
  </div>
</template>

<script>
  import BlogList from '@/components/BlogList.vue'
  export default {
    name: 'Home',
    components: {
      BlogList
    },
    data () {
      return {
        data: []
      }
    },

    methods: {
      getAllList () {
        this.$axios.get('api/article/allList').then(res => {
          if (res.code === 0) {
            this.data = res.data
          }
        })
      }
    },

    created () {
      this.getAllList()
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    min-height: calc(100vh - 206px);
    .main {
      margin: 0 20px;
      padding: 20px;
      background-color: #f8f8f8;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4),
        0 0 30px rgba(10, 10, 0, 0.1) inset;
    }
  }
</style>
