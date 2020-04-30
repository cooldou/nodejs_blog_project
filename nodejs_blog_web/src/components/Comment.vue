<template>
  <div class="comment-box">
    <div v-if="isSigIn === 0" class="signInText" @click="sigIn">登录留言吧~~</div>
    <div v-else class="input-box">
      <div class="input-top">
        <div class="img">
          <img :src="head_img" class="avatar" alt="">
          <p class="username">{{userName}}</p>
        </div>
        <div class="text">
          <textarea class="comment-content" v-model="submitText"></textarea>
        </div>
      </div>
      <div class="input-bottom">
        <a href="javascript:void(0)" @click="submitCommit" class="submit">发表评论</a>
      </div>
    </div>
    <div class="all-comment">
      <p class="title">全部评论<span class="total">{{this.commentList.length}}</span></p>
      <div class="comment-list">
        <div class="comment-item" v-for="item in commentList" :key="item.id">
          <div class="item-l">
            <div class="img">
              <img class="avatar" :src="item.head_img" alt="">
              <p class="username">{{item.nickname}}</p>
            </div>
          </div>
          <div class="item-r">
            <div class="comment-content">
              <div class="comment-text">{{item.cm_content}}</div>
              <div class="comment-time">
                <span class="date">{{item.create_time}}</span>
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
        submitText: '',
        head_img: '',
        userName: '',
        commentList: [],
        article_id: null
      }
    },

    methods: {
      submitCommit () {
        if (!this.submitText) {
          this.$message({
            message: '请输入评论内容',
            type: 'warning'
          })
        } else {
          this.$axios.post('api/comment/publish', {
            content: this.submitText,
            article_id: this.$route.params.id
          }).then(res => {
            console.log(res)
            if (res.code === 0) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
            }
            this.submitText = ''
            this.getCommentList(this.article_id)
          }).catch(e => {
            console.log(e)
          })
        }
      },
      getUserInfo () {
        return this.$axios.get('api/users/info').then((res) => {
          console.log(res)
          if (res.code === 0) {
            this.userName = res.data.nickname
            this.head_img = res.data.head_img
          } else {
            this.$message({
              msg: res.data.msg,
              type: 'error'
            })
          }
        })
      },
      getCommentList (id) {
        this.$axios.get(`api/comment/list?article_id=${id}`).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.commentList = res.data
          }
        }).catch(e => {
          console.log(e)
        })
      },
      sigIn () {
        this.$router.push({
          path: '/login'        })
      }
    },

    computed: {
      isSigIn () {
        return this.$store.state.isSignIn
      }
    },

    created () {
      if (this.$store.state.isSignIn === 0) {
        this.$message({
          message: '登录后访问体验更好哟~~',
        })
      } else {
        this.getUserInfo()
        if (this.$route.params.id) {
          this.article_id = this.$route.params.id
          this.getCommentList(this.$route.params.id)
        }
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