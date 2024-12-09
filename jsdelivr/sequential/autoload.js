// 注意：live2d_path 参数应使用绝对路径
// const live2d_path =
//   "https://fastly.jsdelivr.net/gh/nagaame/live2d-widget@latest/";

const live2d_path = "https://code.kuokuo.io/live2d-api/";

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
  return new Promise((resolve, reject) => {
    let tag;
    if (type === "css") {
      tag = document.createElement("link");
      tag.rel = "stylesheet";
      tag.href = url;
    } else if (type === "js") {
      tag = document.createElement("script");
      tag.src = url;
    }
    if (tag) {
      tag.onload = () => resolve(url);
      tag.onerror = () => reject(url);
      document.head.appendChild(tag);
    }
  });
}

// Cubism SDK 依赖项
const cubismCorePath =
  "https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js";
const frameworkPath =
  "https://cdn.jsdelivr.net/gh/Live2D/CubismWebFramework@latest/dist/live2dcubismframework.min.js";
const rendererPath =
  "https://cdn.jsdelivr.net/gh/Live2D/CubismWebFramework@latest/dist/live2dcubismrenderer.min.js";

if (screen.width >= 768) {
  // 首先加载 Cubism SDK 核心库
  Promise.all([
    loadExternalResource(cubismCorePath, "js"),
    loadExternalResource(frameworkPath, "js"),
    loadExternalResource(rendererPath, "js"),
    loadExternalResource(
      live2d_path + "jsdelivr/sequential/waifu-tips.js",
      "js",
    ),
  ])
    .then(() => {
      // 初始化 Cubism SDK
      Live2DCubismCore.startUp();

      // 初始化 widget
      initWidget({
        waifuPath: live2d_path + "waifu-tips.json",
        cdnPath: live2d_path,
        modelPath: "AS02/as02.model3.json", // 指定Cubism 3.0模型
        tools: [
          "hitokoto",
          "switch-model",
          "switch-texture",
          "photo",
          "info",
          "quit",
        ],
        // 渲染设置
        settings: {
          version: 3, // 指定使用Cubism 3.0
          width: 800,
          height: 800,
          scale: 1,
          position: "right",
        },
      });
    })
    .catch((err) => {
      console.error("Failed to load Live2D components:", err);
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
