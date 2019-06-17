import "typeface-montserrat";
import "typeface-open-sans";
import "./style.css";

const scene = {
  width: 512,
  height: 512
};

let ctxRef = undefined;
const getCtx = () => {
  if (!ctxRef) {
    const canvas = document.getElementById("canvas");
    canvas.width = scene.width;
    canvas.height = scene.height;
    ctxRef = canvas.getContext("2d");
  }
  return ctxRef;
};

const { PI } = Math;

const range = size => [...Array(size)].map((_, i) => i);

const render = time => {
  const ctx = getCtx();
  ctx.clearRect(0, 0, scene.width, scene.height);

  ctx.strokeStyle = "#404";
  ctx.lineWidth = 4;
  const circle = (x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * PI);
    ctx.fill();
  };

  const s = c => {
    ctx.fillStyle = c;
  };

  const shsv = (h, c, v) =>
    (ctx.fillStyle = "hsl(" + h + "," + c + "%," + v + "%)");

  for (let i = 0; i < 256; i++) {
    for (let j = 0; j < 128; j++) {
      const size = 2;
      const x = i * size;
      const y = j * size;

      // const road = (x / y + time * 2) % 23 > 10 ? 50 : 0;
      // const road =
      //   (((x * x * x) / 100 / y + time * 20) / 20) % 23 > 10 ? 50 : 0;

      const road =
        ((Math.cos(time / 5) / 2 + Math.sin((y * x + time * 100) / 800)) *
          100) %
          100 >
        50
          ? 50
          : 0;

      shsv(
        time % 360,
        50 - road,
        50
        // 50 + Math.cos(y / 25) * Math.sin((x + y) / 10) * 5
      );
      // s("blue");
      // if (Math.sin(x) > 0 && Math.sin(y) > 0) {
      //   s("red");
      // }
      ctx.fillRect(x, y, size, size);
    }
  }
  // ctx.beginPath();
  // ctx.moveTo(10, 10);
  // ctx.lineTo(200, 200);
  // ctx.stroke();

  // range(200).map(l => {
  //   const x = 50 + l + Math.cos(l / 10) * 100;
  //   const y = 50 + l;
  //   circle(x, y, 1);
  // });

  // const r = 10;
  // const d = 2 * r;
  // for (let i = 0; i < 20; i++) {
  //   ctx.beginPath();
  //   for (let step = 0; step < 20; step++) {
  //     const x = i * 2.71 * r + step * d;
  //     const y = step * d;
  //     ctx.arc(x, y, r, -0.5 * PI, 0);
  //     ctx.arc(x + 2 * r, y, r, PI, 0.5 * PI, true);
  //   }
  //   ctx.stroke();
  // }
};

let time = 0;
const loop = () => {
  time++;
  render(time);
  setTimeout(loop, 50);
  // requestAnimationFrame(loop);
};
loop();
