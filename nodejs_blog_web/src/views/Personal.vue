<template>
  <div class="personal">
    <div class="wrapper">
      <div class="content">
        <el-form :model="form" ref="form" label-width="80px">
          <el-form-item label="昵称">
            <el-input v-model="form.nickname" class="nickname"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button>退出登录</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>
<script>
  import imgDefault from '@/assets/logo.jpg'
  export default {
    name: "Personal",
    data () {
      return {
        imageUrl: imgDefault,
        form: {
          nickname: null,
        }
      }
    },
    methods: {
      save () {
        console.log('保存')
      },
      handleAvatarSuccess (res, file) {
        console.log(res, file)
        // this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>
<style lang="scss">
  .personal {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
</style>
<style lang="scss" scoped>
  .personal {
    min-height: calc(100vh - 206px);
    .content {
      width: 40%;
      margin: 0 auto;
      padding: 50px 0;
      .nickname {
        width: 70%;
      }
    }
  }
</style>