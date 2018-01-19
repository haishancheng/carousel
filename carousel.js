function Carousel($ct){
  this.init($ct)
}

Carousel.prototype = {
  init: function($ct){
    this.$ct      = $ct
    this.$imgCt   = this.$ct.find('.img-ct')
    this.$preBtn  = this.$ct.find('.pre')
    this.$nextBtn = this.$ct.find('.next')
    this.$imgs    = this.$ct.find('.img-ct>li')
    this.$bullet  = this.$ct.find('.bullet')
    this.$start   = this.$ct.find('.start-auto-play')
    this.$stop    = this.$ct.find('.stop-auto-play')
    
    this.imgCnt = this.$imgs.length
    this.imgWidth = this.$imgs.width()
    this.$imgCt.width((this.imgCnt + 2) * this.imgWidth)
    this.$imgCt.append(this.$imgs.first().clone())
    this.$imgCt.prepend(this.$imgs.last().clone())
    this.$imgCt.css({left: -this.imgWidth})
    
    this.index = 0
    this.isAnimate = false //用来防止播放中的重复点击

    this.bind()
  },
  bind: function(){
    var _this = this
    this.$preBtn.on('click',function(){
      _this.playPre()
    })
    this.$nextBtn.on('click',function(){
      _this.playNext()
    })
    this.$bullet.on('click','li', function(){
      var bulletIdx = $(this).index()
      _this.$imgCt.animate({
        left: "-" + (_this.imgWidth * (bulletIdx + 1))
      }, function(){
        _this.index = bulletIdx
        _this.setBullet()
        
      })
    })
    this.$start.on('click', function(){
      _this.startAutoPlay()
    })
    this.$stop.on('click', function(){
      _this.stopAutoPlay()
    })
  },
  playPre: function(){
    if(this.isAnimate) return
    this.isAnimate = true
    this.$imgCt.animate({
      left: "+=" + this.imgWidth
    },function(){//动画是异步的，这个也是回调函数，中的this需要保存下来,或者使用bind改变this
      this.index--
      if(this.index === -1){
        this.$imgCt.css({left: -(this.imgCnt * this.imgWidth)})
        this.index = this.imgCnt - 1
      }  
      this.setBullet()
      this.isAnimate = false   
    }.bind(this))
  },
  playNext: function(){
    if(this.isAnimate) return
    this.isAnimate = true
    this.$imgCt.animate({
      left: "-=" + this.imgWidth
    }, function(){
      this.index++
      if(this.index === this.imgCnt){
        this.$imgCt.css({left: -this.imgWidth})
        this.index = 0
      }
      this.setBullet()
      this.isAnimate = false 
    }.bind(this))
  },
  setBullet: function(){
    this.$bullet.find('li').eq(this.index).addClass('active')
                           .siblings().removeClass('active')
  },
  startAutoPlay: function(){
    this.autoPlayTimer = setInterval(function(){
      this.playNext()
    }.bind(this), 1000)
  },
  stopAutoPlay: function(){
    clearInterval(this.autoPlayTimer)
  }
}

new Carousel($('.carousel').eq(0))
new Carousel($('.carousel').eq(1))//这样就能创建多个互不相关的轮播了

// var Carousel = {
//   init: function(){
    
//   },
//   bind: function(){
    
//   }
// }
//这种如果有多个轮播，要重复代码
