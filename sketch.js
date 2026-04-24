// 全域變數定義
let shapes = [];
let song;
let amplitude;
// 外部定義的二維陣列，做為多邊形頂點的基礎座標
let points = [
  [-3, 5],
  [3, 7],
  [1, 5],
  [2, 4],
  [4, 3],
  [5, 2],
  [6, 2],
  [8, 4],
  [8, -1],
  [6, 0],
  [0, -3],
  [2, -6],
  [-2, -3],
  [-4, -2],
  [-5, -1],
  [-6, 1],
  [-6, 2]
];

function preload() {
  // 在程式開始前預載入外部音樂資源
  song = loadSound('midnight-quirk-255361.mp3');
}

function setup() {
  // 初始化畫布，建立符合視窗大小的畫布
  createCanvas(windowWidth, windowHeight);

  // 初始化 p5.Amplitude 物件
  amplitude = new p5.Amplitude();

  // 循環播放音樂
  // 注意：現代瀏覽器通常需要使用者互動（如點擊）後才能播放音訊
  if (song.isLoaded()) {
    song.loop();
  }

  // 產生統一的形狀點座標（所有魚都一樣）
  let shapePoints = points.map(pt => {
    return {
      // 將每個頂點的 x 與 y 乘上固定倍率 15
      x: pt[0] * 15,
      y: pt[1] * 15
    };
  });

  // 產生 10 個形狀物件
  for (let i = 0; i < 10; i++) {
    let shape = {
      x: random(0, windowWidth), // 初始 X 座標
      y: random(0, windowHeight), // 初始 Y 座標
      dx: random(-3, 3), // X 軸水平移動速度
      dy: random(-3, 3), // Y 軸垂直移動速度
      scale: random(1, 10), // 縮放比例 (雖然 draw 中主要使用音量縮放，但依結構保留此屬性)
      color: color(random(255), random(255), random(255)), // 隨機生成的 RGB 顏色
      points: shapePoints // 統一的頂點座標
    };

    shapes.push(shape);
  }
}

function draw() {
  // 設定背景顏色
  background('#ffcdb2');

  // 設定邊框粗細
  strokeWeight(2);

  // 走訪 shapes 陣列中的每個 shape 進行更新與繪製
  for (let shape of shapes) {
    // 位置更新
    shape.x += shape.dx;
    shape.y += shape.dy;

    // 邊緣反彈檢查
    if (shape.x < 0 || shape.x > windowWidth) {
      shape.dx *= -1;
    }
    if (shape.y < 0 || shape.y > windowHeight) {
      shape.dy *= -1;
    }

    // 設定外觀
    fill(shape.color);
    stroke(shape.color);

    // 座標轉換
    push();
    translate(shape.x, shape.y);

    // 繪製多邊形
    beginShape();
    for (let pt of shape.points) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);

    // 狀態還原
    pop();
  }
}

// 額外加入：點擊滑鼠以確保音訊在瀏覽器限制下能順利播放
function mousePressed() {
  if (song.isLoaded() && !song.isPlaying()) {
    song.loop();
  }
}

// 額外加入：視窗大小改變時調整畫布
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
