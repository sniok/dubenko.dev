import redWaves from "./redWaves.glsl";
import waves from "./waves.glsl";
import funky from "./funky.glsl";
import bluewaves from "./bluewaves.glsl";
import circles from "./circles.glsl";

// List of all the fragment shaders
const shaders = [funky, redWaves, waves, bluewaves, circles];

// Pick a random shader
let shaderIndex = Math.floor(Math.random() * shaders.length);

// Just a fullscreen square
const vertices = new Float32Array([-1, -1, 1, 1, -1, 1, -1, -1, 1, -1, 1, 1]);

// Simple vertex shader for the 2d square that will be fullscreen
const vertex = `
attribute vec2 aVertexPosition;

void main() {
gl_Position = vec4(aVertexPosition, 0.0, 1.0);
}
`;

// Setup canvas
const canvasSize = 256;
const canvas1 = document.getElementById("canvas1");
const gl1 = canvas1.getContext("webgl");
canvas1.width = canvasSize;
canvas1.height = canvasSize;

// Canvas 2
const canvas2 = document.getElementById("canvas2");
const gl2 = canvas2.getContext("webgl");
canvas2.width = canvasSize;
canvas2.height = canvasSize;

function createProgram(gl, fragmentShader) {
  // Reset view
  gl.viewport(0, 0, canvasSize, canvasSize);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Vertex shader stuff
  const vs = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vs, vertex);
  gl.compileShader(vs);

  // Fragment shader stuff
  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fs, fragmentShader);
  gl.compileShader(fs);

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  // Pass our glorious square into a buffer
  const vbuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // Load the programm
  gl.useProgram(program);

  // Show errors if any
  if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS))
    console.log(gl.getShaderInfoLog(vs));
  if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS))
    console.log(gl.getShaderInfoLog(fs));
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    console.log(gl.getProgramInfoLog(program));

  // Init time uniform
  program.uTime = gl.getUniformLocation(program, "uTime");
  gl.uniform1f(program.uTime, 1.0);

  // size uniform
  program.uSize = gl.getUniformLocation(program, "uSize");
  gl.uniform1f(program.uSize, canvasSize);

  // eh?
  program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
  gl.enableVertexAttribArray(program.aVertexPosition);
  gl.vertexAttribPointer(program.aVertexPosition, 2, gl.FLOAT, false, 0, 0);

  return (timestamp) => {
    // Load the programm
    gl.useProgram(program);
    gl.uniform1f(program.uTime, timestamp / 80);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}

const state = {
  gl: gl1,
  render: createProgram(gl1, shaders[shaderIndex]),
}

const loop = (timestamp) => {
  state.render(timestamp);
  requestAnimationFrame(loop);
};
loop();

const onClick = () => {
  shaderIndex = (shaderIndex + 1) % shaders.length;
  const newGl = state.gl === gl1 ? gl2 : gl1;
  const currentCanvas = state.gl === gl1 ? canvas1 : canvas2;
  const newCanvas = state.gl === gl1 ? canvas2 : canvas1;
  createProgram(newGl, shaders[shaderIndex])
  state.render = createProgram(newGl, shaders[shaderIndex]);
  state.gl = newGl;

  newCanvas.style.transform = `translateX(128px)`;
  currentCanvas.style.transform = `translateX(-128px)`;

  setTimeout(() => {
    currentCanvas.style.boxShadow = 'none';
    currentCanvas.style.zIndex = 0;
    currentCanvas.style.transform = `translateX(0px)`;
    newCanvas.style.transform = `translateX(0px)`;
    newCanvas.style.zIndex = 1
    newCanvas.style.boxShadow = null;

  }, 200)
};

const stage = document.getElementById("stage");
stage.onclick = onClick;
