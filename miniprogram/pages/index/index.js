//index.js
const app = getApp()

//初始化数据库
const db = wx.cloud.database();
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {
  },

  // 插入数据
  handleAdd: function() {
    // 回调函数形式
    // db.collection('user').add({
    //   data: {
    //     name: 'xwl',
    //     age: 24
    //   },
    //   success: (res) => {
    //     console.log(res)
    //   },
    //   fail: err => {
    //     console.log(err)
    //   }
    // })
    // promise形式
    db.collection('user').add({
      data: {
        name: "xjh",
        age: 28
      }
    }).then( res => {
      console.log(res)
    }).catch(err => {
      console.loG(err)
    })
  },

  // 更新数据
  handleUpdate: function(){
    db.collection('user').doc(
      'd4b812005e7859f1001c357e0aed321c'
    ).update({
      data: {
        name: 'xxj'
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
  },

  // 查询数据
  handleSearch: function(){
    db.collection("user").where({
      name: 'xxj'
    }).get().then(res => console.log(res)).catch(err => {console.log(err)})
  },

  //删除数据
  handleDelete: function(){
    db.collection("user")
    .doc('d4b812005e7859f1001c357e0aed321c')
    .remove({
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  // 云函数求和
  handleSum: function(){
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a: 2,
        b: 3
      }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  },

  // 获取用户openId
  getOpenId: function(){
    wx.cloud.callFunction({
      name: 'login'
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  },

  // 批量删除数据

  handleBatchDel: function(){
    wx.cloud.callFunction({
      name: "batchDelete"
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  },
})
