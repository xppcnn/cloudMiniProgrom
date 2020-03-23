// miniprogram/pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  getMovieList: function() {
    wx.showLoading({
      title: '正在加载数据。。。',
    })
    wx.cloud.callFunction({
      name: 'movieList',
      data: {
        start: this.data.list.length,
        count: 5,
      }
    }).then(res => {
      console.log(JSON.parse(res.result).subjects)
      this.setData({
        // list: this.data.list.concat(JSON.parse(res.result).subjects),
        list: [...this.data.list, ...(JSON.parse(res.result).subjects)],
      })
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      }
    )
  },
  
  goToComment: function(e) {
    const movieId = e.target.dataset.movieid;
    wx.navigateTo({
      url: `../comment/comment?movieid=${movieId}`,
    })
    console.log(movieId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovieList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getMovieList();
  },

})