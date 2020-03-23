//index.js
const app = getApp()

//初始化数据库
const db = wx.cloud.database();
Page({
  data: {
    images: [],
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

  // 上传图片
  handleUpload: function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.cloud.uploadFile({
            cloudPath: new Date().getTime() + '.png',  //云服务器上的路径
            filePath: tempFilePaths[0],
            success: res => {
              console.log(res)
              db.collection("images").add({
                data: {
                  fileId: res.fileID,
                }
              })
              .then(res => console.log(res))
              .catch(err => console.log(err))
            }
        })
      }
    })
  },

  //获取图片
  getFile: function() {
    // 先登录获取
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      db.collection('images').where({
        _openid: res.result.openid
      }).get().then(res1 => {
        console.log(res1)
        this.setData({
          images: res1.data,
        })
      })
    })
  }
})
