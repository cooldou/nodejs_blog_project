<template>
  <div class="article-edit">
    <div class="wrapper">
      <div class="back">
        <el-button size="mini" @click="goBack">返回</el-button>
      </div>
      <div class="edit_title">标题</div>
      <el-input v-model="title" placeholder="请输入标题文章标题"></el-input>
      <div class="edit_title">文章内容 (Markdown编辑器)</div>
      <div class="markdown">
        <mavon-editor v-model="content"></mavon-editor>
      </div>
      <div class="save_btn">
        <el-button v-if="this.$route.params.id" size="mini" type="primary" @click="save">保存</el-button>
        <el-button v-else size="mini" type="primary" @click="publish">发表</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ArticleEdit',
    data () {
      return {
        title: '',
        content: '',
        article_id: null
      }
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      },
      publish () {
        this.$axios.post('api/article/add', {
          title: this.title,
          content: this.content
        }).then(res => {
          if (res.code === 0) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$router.push({
              name: 'article'
            })
          }
        }).catch(e => {
          console.log(e)
        })
      },
      save () {
        this.$axios.post('api/article/update', {
          title: this.title,
          content: this.content,
          article_id: this.article_id
        }).then(res => {
          if (res.code === 0) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.goBack()
          }
        })
      },
      getDetail (id) {
        this.$axios.get(`api/article/detail?article_id=${id}`).then(res => {
          if (res.code === 0) {
            this.title = res.data.title
            this.content = res.data.content
          }
        })
      },
    },
    created () {
      if (this.$route.params.id) {
        this.article_id = this.$route.params.id
        this.getDetail(this.article_id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .article-edit {
    min-height: calc(100vh - 206px);
    margin: 30px auto;
    background-color: #fff;
    padding: 40px;
    font-size: 16px;
    .wrapper {
      .back {
        text-align: right;
        margin-bottom: 40px;
      }
      .edit_title {
        margin: 20px 0;
        font-weight: 700;
      }
      .save_btn {
        margin: 40px 0;
      }
    }
  }
</style>