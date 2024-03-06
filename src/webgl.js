import redWaves from "./redWaves.glsl";
import waves from "./waves.glsl";
import funky from "./funky.glsl";

// List of all the fragment shaders
const shaders = [funky, redWaves, waves];

// Pick a random shader
let shaderIndex = Math.floor(Math.random() * shaders.length);

// Just a fullscreen square
const vertices = new Float32Array([-1, -1, 1, 1, -1, 1, -1, -1, 1, -1, 1, 1]);

// Setup canvas
const canvasSize = 256;
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
canvas.width = canvasSize;
canvas.height = canvasSize;

// Reset view
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

// Simple vertex shader for the 2d square that will be fullscreen
const vertex = `
attribute vec2 aVertexPosition;

void main() {
gl_Position = vec4(aVertexPosition, 0.0, 1.0);
}
`;

function createProgram(fragmentShader) {
  // Vertex shader stuff
  const vs = gl.createShader(gl.VERTEX_SHADER);
  const fragment = shaders[shaderIndex];
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
  if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) console.log(gl.getShaderInfoLog(vs));
  if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) console.log(gl.getShaderInfoLog(fs));
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) console.log(gl.getProgramInfoLog(program));

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

  return program
}

let program = createProgram(shaders[shaderIndex])

let time = 0;
const loop = () => {
  time++;
  gl.uniform1f(program.uTime, time);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  setTimeout(loop, 50);
};
loop();

canvas.onclick = () => {
  shaderIndex = (shaderIndex + 1) % shaders.length;
  program = createProgram(shaders[shaderIndex])
}
