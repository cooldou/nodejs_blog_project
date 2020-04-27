<template>
  <div class="blog-content-box">
    <div class="wrapper">
      <h1 class="title">nodejs教程</h1>
      <div class="time">
        <span class="date"><i class="iconfont icon-date"></i>2020-03-23</span>
      </div>
      <div class="detail">
        <mavon-editor v-model="content" defaultOpen="preview" :toolbarsFlag="false" :subfield="false" />
      </div>
      <comment></comment>
    </div>
  </div>
</template>

<script>
  import Comment from '@/components/Comment.vue'
  export default {
    name: "Detail",
    components: {
      Comment
    },
    data () {
      return {
        content: 'sdfsdfsfsfsfsfd'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .blog-content-box {
    min-height: calc(100vh - 206px);
    .wrapper {
      padding: 20px;
      background: #f8f8f8;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4),
        0 0 30px rgba(10, 10, 0, 0.1) inset;
      .title {
        text-align: center;
        font-size: 28px;
        font-weight: 500;
      }
      .time {
        margin: 10px 0 40px;
        border-bottom: 1px solid #eee;
        padding-bottom: 20px;
        text-align: center;
        color: #999;
        .iconfont {
          color: #666;
          margin-right: 5px;
        }
      }
    }
  }
</style>