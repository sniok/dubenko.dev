import redWaves from "./redWaves.glsl";
import waves from "./waves.glsl";

const shaders = [redWaves, waves];

const vertices = new Float32Array([-1, -1, 1, 1, -1, 1, -1, -1, 1, -1, 1, 1]);

const scene = {
  width: 512,
  height: 512
};

const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");
canvas.width = scene.width;
canvas.height = scene.height;

gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertex = `
attribute vec2 aVertexPosition;

void main() {
gl_Position = vec4(aVertexPosition, 0.0, 1.0);
}
`;
const fragment = shaders[Math.floor(Math.random() * shaders.length)];

const vs = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vs, vertex);
gl.compileShader(vs);

const fs = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fs, fragment);
gl.compileShader(fs);

const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);

const vbuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

gl.useProgram(program);

if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS))
  console.log(gl.getShaderInfoLog(vs));

if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS))
  console.log(gl.getShaderInfoLog(fs));

if (!gl.getProgramParameter(program, gl.LINK_STATUS))
  console.log(gl.getProgramInfoLog(program));

// piu
program.uColor = gl.getUniformLocation(program, "uTime");
gl.uniform1f(program.uColor, 1.0);

// pow
program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
gl.enableVertexAttribArray(program.aVertexPosition);
gl.vertexAttribPointer(program.aVertexPosition, 2, gl.FLOAT, false, 0, 0);

let time = 0;
const loop = () => {
  time++;
  gl.uniform1f(program.uColor, time);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  setTimeout(loop, 50);
};
loop();
