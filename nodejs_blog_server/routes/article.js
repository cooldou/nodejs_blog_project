var express = require('express');
var router = express.Router();
const querySql = require('../db/index')

//新增博客接口 
router.post('/add', async (req, res, next) => {
  let {
    title,
    content
  } = req.body
  let {
    username
  } = req.user

  try {
    let result = await querySql('select id from user where username = ? ', [username])
    let user_id = result[0].id
    if (user_id) {
      await querySql('insert into article(title,content,user_id,create_time) values (?,?,?,NOW())', [title, content, user_id])
      res.send({
        code: 0,
        msg: '发表成功'
      })
    }
  } catch (e) {
    console.log(e)
    next(e)
  }
})

//获取全部博客列表接口 
router.get('/allList', async (req, res, next) => {
  try {
    // let sql = 'select * from article'
    let sql = 'select id,title,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time from article order by create_time desc'
    /**
     * DATE_FORMAT(create_time, "%Y-%m-%d %H:%i:%s") AS create_time
     * 转换时间格式
     */
    let result = await querySql(sql)
    if (result) {
      res.send({
        code: 0,
        msg: '获取成功',
        data: result
      })
    }
  } catch (e) {
    console.log(e)
    next(e)
  }
})

//获取我的博客列表接口 
router.get('/myList', async (req, res, next) => {
  console.log(req.user)
  let {
    id
  } = req.user

  try {
    let sql = 'select id,title,status,content,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time from article  where user_id = ? order by create_time desc'
    let result = await querySql(sql, [id])
    if (result) {
      res.send({
        code: 0,
        msg: '访问成功',
        data: result
      })
    }
  } catch (e) {
    console.log(e)
    next(e)
  }

})

//获取博客详情接口 
router.get('/detail', async (req, res, next) => {
  let article_id = req.query.article_id
  try {
    let sql = 'select content,title,id,DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") AS create_time from article where id = ?'
    let result = await querySql(sql, [article_id])
    if (result) {
      res.send({
        code: 0,
        msg: '获取成功',
        data: result[0]
      })
    }
  } catch (e) {
    console.log(e)
    next(e)
  }
})

// 博客更新接口 
router.post('/update', async (req, res, next) => {
  let {
    id
  } = req.user
  let {
    article_id,
    title,
    content
  } = req.body
  try {
    let sql = 'update article set title=?, content=? where id = ? and user_id = ?'
    let result = await querySql(sql, [title, content, article_id, id])
    if (result.affectedRows) {
      res.send({
        code: 0,
        msg: '更新成功',
        data: null
      })
    }
  } catch (e) {
    console.log(e)
    next(e)
  }
})

// 博客删除 
router.post('/delete', async (req, res, next) => {
  let {
    article_id
  } = req.body
  let {
    id
  } = req.user
  try {
    //软删除
    // let sql = 'update article set status = 1 where id = ? and user_id = ?'
    // let result = await querySql(sql, [article_id, id])

    //彻底删除
    let sql = 'delete from article where id = ? and user_id = ?'    
    let result = await querySql(sql,[article_id,id]) 
    if (result.affectedRows) {
      res.send({
        code: 0,
        msg: '删除成功',
        data: null
      })
    }
  } catch (e) {
    next(e)
  }
})

module.exports = router;