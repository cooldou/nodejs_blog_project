<template>
  <div class="article">
    <div class="wrapper">
      <h1 class="title">文章列表</h1>
      <div class="content">
        <el-button class="addBtn" size="mini" type="primary" @click="handleAdd">新增+</el-button>
        <el-table :data="articleList" border stripe>
          <el-table-column prop="title" label="标题" width="300">
          </el-table-column>
          <el-table-column label="日期" width="300">
            <template slot-scope="{row}">
              <i class="el-icon-time"></i>
              <span style="margin-left:10px">{{ row.create_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row}" class="">
              <el-button size="mini" type="primary" @click="handleLook(row)">查看</el-button>
              <el-button size="mini" type="success" @click="handleEdit(row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Article",
    data () {
      return {
        articleList: []
      }
    },
    methods: {
      handleLook (row) {
        let id = row.id
        // window.open('#/detail/' + id)
        this.$router.push(`details/${id}`)
      },
      handleAdd () {
        this.$router.push({ name: 'articleAdd' })
      },
      handleEdit (row) {
        let id = row.id
        this.$router.push(`/article/edit/${id}`)
      },
      handleDelete (row) {
        let id = row.id
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('api/article/delete', {
            article_id: id
          }).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getMyList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      getMyList () {
        this.$axios.get('api/article/myList').then(res => {
          if (res.code === 0) {
            let result = res.data
            this.articleList = result.filter((item) => { return item.status === 0 })
          }
        })
      }
    },
    created () {
      this.getMyList()
    }
  }
</script>

<style lang="scss" scoped>
  .article {
    min-height: calc(100vh - 206px);
    .title {
      margin: 30px 0;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
    }
    .content {
      .addBtn {
        float: right;
        margin-bottom: 20px;
      }
    }
    /deep/ .el-table {
      .cell {
        text-align: center;
      }
    }
  }
</style>