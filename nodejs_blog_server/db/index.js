const dbOption = require('./config')
const mysql = require('mysql')

//创建连接池
const pool = mysql.createPool(dbOption)

function query(sql, params) {
  return new Promise((resolve,reject) => {
    //获取连接
    pool.getConnection((err,conn) => {
      if(err) {
        reject(err)
        return
      } 
      //执行 sql语句
      conn.query(sql, params, (err,res) => {
        //释放连接
        conn.release() 
        if(err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  })
}

module.exports = query