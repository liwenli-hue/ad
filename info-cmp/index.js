/**
 * 1. 父元素(获取数据)
 * 2. 渲染元素（渲染）
 * 3. 监听事件
 * 4. 给父元素添加class
 */

var info = {
  el: null, // 初始时，声明一个父元素为null
  infoList: [], // 初识时，给数据赋值为一个空数组
  index: 0, // 现在显示的页数索引
  init: function (options) {
    // 初始化函数，在次函数内做一系列初始化操作，获取数据、渲染页面、监听事件等等
    this.initData(options);
    this.render();
    this.handle();
  },
  initData: function (options) {
    // 初始化数据，将info对象中el、infoList赋值为传递过来的参数
    this.el = this.addElClass(options.el);
    this.infoList = this.changeInfoPlay(options.infoList);
  },
  addElClass: function (el) {
    // 给父元素el添加class，以该class为父级写该组件的样式
    el.classList.add('_recommend-box');
    return el;
  },
  changeInfoPlay: function (infoList) {
    // 更改数组中的每一个对象内的play属性，若play小于10000，则不处理，反之，对其进行处理
    var length = infoList.length;
    for (var i = 0; i < length; i++) {
      var info = infoList[i];
      var play = info.play;
      if (play > 10000) {
        play = (play / 10000).toFixed(1) + '万';
      }
      info.play = play;
    }
    return infoList;
  },
  render: function () {
    // 渲染函数，利用数据渲染页面
    this.el.innerHTML = `
      <div class="btn btn--prev">&lt;</div>
      <div class="btn btn--next">&gt;</div>
      ${this.renderVideoReco()}
    `;
  },
  renderVideoReco: function () {
    // 一次性渲染多个video-reo盒子
    var template = '';   // 声明一个模板为一个空串
    var start = this.index * 8;     // for循环的起始值
    var end = (this.index + 1) * 8;   // for循环的终止值

    for (var i = start; i < end; i++) {
      var info = this.infoList[i];  // 数组中的每一项
      template += `
        <div class="video-reco video-reco--${i % 4}">
          <div class="info-box">
            <a 
                href="${info.url}" 
                class="video-href"
                target="_blank"
            >
                <div class="mask"></div>
                <img 
                    src="${info.poster}"
                    alt="${info.title}" 
                    class="poster"
                />
                <div class="info">
                    <p class="title">${info.title}</p>
                    <p class="up">up ${info.up}</p>
                    <p class="play">${info.play}播放</p>
                </div>
            </a>
          </div>
          <div class="watch">
            <div class="mess">稍后再看</div>
          </div>
        </div>
      `;
    }
    return template;
  },
  handle: function () {
    var self = this;   // 声明一个变量self为this，即为info

    this.el.onclick = function (e) {
      var dom = e.target; // 获取触发事件的dom元素

      // 利用查看元素class列表的方式，来确定元素是不是为某一个我们需要的元素
      var isPrevBtn = dom.classList.contains('btn--prev');  // 判断该元素是否为prev按钮
      var isNextBtn = dom.classList.contains('btn--next');  // 判断该元素是否为next按钮
      var isWatch = dom.classList.contains('watch');  // 判断该元素是否为观看按钮

      if (isPrevBtn) {
        self.handlePrevBtn();
      } else if (isNextBtn) {
        self.handleNextBtn();
      } else if (isWatch) {
        self.handleWatch();
      }
    }
  },
  handlePrevBtn: function () {
    // 点击prev按钮时执行的事件
    // 让页数减一
    this.index--;
    this.checkIndex();  // 检查index的数值是否合法
    this.render();  // 渲染页面
  },
  handleNextBtn: function () {
    // 点击prev按钮时执行的事件
    // 让页数加一
    this.index++;
    this.checkIndex(); // 检查index的数值是否合法
    this.render(); // 渲染页面
  },
  handleWatch: function () {
    // 点击观看按钮时执行的事件
    alert('知道了，一会再看~');
  },
  checkIndex: function () {
    // 检查index
    var minIndex = 0; // 声明一个最小页数索引为0
    var maxIndex = this.infoList.length / 8 - 1;  // 声明一个最大页数索引，该索引由数据的长度获得

    if (this.index < minIndex) {
      // 若索引小于最小索引，则设置为最大索引
      this.index = maxIndex;
    } else if (this.index > maxIndex) {
      // 若索引大于最大索引，则设置为最大索引
      this.index = minIndex;
    }
  }
}