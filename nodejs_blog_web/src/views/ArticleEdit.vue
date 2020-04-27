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
        <el-button size="mini" type="primary" @click="save">保存</el-button>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ArticleEdit',
    data () {
      return {}
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      },
      save () {

      }
    },
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