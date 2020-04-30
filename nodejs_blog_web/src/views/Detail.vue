<template>
  <div class="blog-content-box">
    <div class="wrapper">
      <div class="back">
        <el-button size="mini" @click="goBack">返回</el-button>
      </div>
      <h1 class="title">{{blog_detail.title}}</h1>
      <div class="time">
        <span class="date"><i class="iconfont icon-date"></i>{{blog_detail.create_time}}</span>
      </div>
      <div class="detail">
        <mavon-editor v-model="blog_detail.content" defaultOpen="preview" :toolbarsFlag="false" :subfield="false" />
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
        blog_detail: {}
      }
    },
    methods: {
      getDetail (id) {
        this.$axios.get(`api/article/detail?article_id=${id}`).then(res => {
          if (res.code === 0) {
            this.blog_detail = res.data
          }
        })
      },
      goBack () {
        this.$router.go(-1)
      },
    },
    created () {
      let id = this.$route.params.id
      this.getDetail(id)
    }
  }
</script>

<style lang="scss" scoped>
  .blog-content-box {
    min-height: calc(100vh - 206px);
    .wrapper {
      position: relative;
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
      .back {
        position: absolute;
        top: 20px;
        left: 20px;
      }
    }
  }
</style>