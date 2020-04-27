<template>
  <div class="comment-box">
    <div v-if="isSigIn === 0" class="signInText">登录留言吧~~</div>
    <div v-else class="input-box">
      <div class="input-top">
        <div class="img">
          <img src="" class="avatar" alt="">
          <p class="username">aaaa</p>
        </div>
        <div class="text">
          <textarea class="comment-content" v-model="submitText"></textarea>
        </div>
      </div>
      <div class="input-bottom">
        <a href="javascript:void(0)" @claick="submitCommit" class="submit">发表评论</a>
      </div>
    </div>
    <div class="all-comment">
      <p class="title">全部评论<span class="total">4</span></p>
      <div class="comment-list">
        <div class="comment-item">
          <div class="item-l">
            <div class="img">
              <img class="avatar" src="" alt="">
              <p class="username">dffffff</p>
            </div>
          </div>
          <div class="item-r">
            <div class="comment-content">
              <div class="comment-text">sfsfsfsfsfsf</div>
              <div class="comment-time">
                <span class="date">2020-04-02</span>
              </div>
            </div>
          </div>
        </div>
        <div class="comment-item">
          <div class="item-l">
            <div class="img">
              <img class="avatar" src="" alt="">
              <p class="username">dffffff</p>
            </div>
          </div>
          <div class="item-r">
            <div class="comment-content">
              <div class="comment-text">sfsfsfsfsfsf</div>
              <div class="comment-time">
                <span class="date">2020-04-02</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        submitText: ''
      }
    },

    methods: {
      submitCommit () {

      }
    },

    computed: {
      isSigIn () {
        return this.$store.state.isSignIn
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comment-box {
    padding: 50px 30px;
    box-shadow: 0 0px 3px rgba(0, 0, 0, 0.157), 0 0px 3px rgba(0, 0, 0, 0.227);
    background-color: #fafafa;
    .img {
      width: 100px;
      text-align: center;
      .avatar {
        display: inline-block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid #eee;
        margin-bottom: 20px;
      }
      .username {
        cursor: pointer;
        color: #3b99fc;
        word-break: break-all; //自动换行
      }
    }
    .signInText {
      text-align: center;
      color: #3b99fc;
      font-size: 18px;
      cursor: pointer;
    }
    .input-box {
      .input-top {
        display: flex;
        .text {
          flex: 1;
          textarea {
            width: 98%;
            margin-left: 2%;
            min-height: 90px;
            background-color: #fff;
            border: 1px solid #ddd;
            color: #666;
            font-size: 14px;
            box-sizing: border-box;
            border-radius: 6px;
            transition: all 0.3s;
            padding: 20px;
          }
        }
      }
      .input-bottom {
        margin-top: 20px;
        overflow: hidden;
        .submit {
          float: right;
          display: inline-block;
          width: 100px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border-radius: 6px;
          background-color: rgba(0, 0, 0, 0.2);
          color: #fff;
          &:hover {
            background-color: rgba(0, 129, 255, 0.7);
          }
        }
      }
    }
    .all-comment {
      border-top: 1px solid #eee;
      padding: 30px;
      margin: 30px 0 0 0;
      .title {
        margin-bottom: 50px;
        font-size: 20px;
        font-weight: bold;
        border-left: 4px solid #3b99fc;
        padding-left: 20px;
      }
      .comment-list {
        .comment-item {
          display: flex;
          padding: 20px 0;
          border-bottom: 1px solid #eee;
          .item-l {
            width: 100px;
            text-align: center;
          }
          .item-r {
            flex: 1;
            .comment-content {
              box-sizing: border-box;
              width: 98%;
              margin-left: 2%;
              font-size: 14px;
              color: #666;
              padding: 10px;
              .comment-text {
                min-height: 70px;
              }
              .comment-time {
                text-align: right;
                padding: 10px 0;
                float: right;
              }
            }
          }
        }
      }
    }
  }
</style>