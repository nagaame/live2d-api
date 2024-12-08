// 注意：live2d_path 参数应使用绝对路径
// const live2d_path =
//   "https://fastly.jsdelivr.net/gh/nagaame/live2d-widget@latest/";

const live2d_path = 'https://cdn.jsdelivr.net/gh/nagaame/live2d-api@latest/';

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
  return new Promise((resolve, reject) => {
    let tag;
    if (type === 'css') {
      tag = document.createElement('link');
      tag.rel = 'stylesheet';
      tag.href = url;
    } else if (type === 'js') {
      tag = document.createElement('script');
      tag.src = url;
    }
    if (tag) {
      tag.onload = () => resolve(url);
      tag.onerror = () => reject(url);
      document.head.appendChild(tag);
    }
  });
}

// 加载必要的JS文件
if (screen.width >= 768) {
  Promise.all([
    loadExternalResource(live2d_path + 'live2d.min.js', 'js'),
    loadExternalResource(live2d_path + 'jsdelivr/sequential/waifu-tips.js', 'js'),
  ]).then(() => {
    initWidget({
      waifuPath: live2d_path + 'waifu-tips.json',
      cdnPath: live2d_path,
      
      // 指定加载特定模型
      modelPath: 'AS02/as02.model3.json', // 指定模型配置文件路径
      
      tools: [
        'hitokoto',
        'switch-texture',
        'photo',
        'info',
        'quit'
      ],
    });
  });
}

console.log(`
  く__,.ヘヽ.        /  ,ー､ 〉
           ＼ ', !-─‐-i  /  /´
           ／｀ｰ'       L/／｀ヽ､
         /   ／,   /|   ,   ,       ',
       ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
        ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
          !,/7 '0'     ´0iソ|    |
          |.从"    _     ,,,, / |./    |
          ﾚ'| i＞.､,,__  _,.イ /   .i   |
            ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
              | |/i 〈|/   i  ,.ﾍ |  i  |
             .|/ /  ｉ：    ﾍ!    ＼  |
              kヽ>､ﾊ    _,.ﾍ､    /､!
              !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
              ﾚ'ヽL__|___i,___,ンﾚ|ノ
                  ﾄ-,/  |___./
                  'ｰ'    !_,.:
`);
