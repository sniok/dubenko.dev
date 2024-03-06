function e(e){return e&&e.__esModule?e.default:e}var o={};o="precision highp float;\n#define GLSLIFY 1\n\nuniform float uTime;\nuniform float uSize;\n\nvoid main() {\n  float x = gl_FragCoord.x;\n  float y = gl_FragCoord.y;\n  float nx = x / uSize + 0.5;\n  float ny = y / uSize + 0.5;\n\n  // float time = uTime;\n  float st = uTime / 5.0;\n\n//\n  float c = sin(((ny * ny - sin(st * 0.1)) * (nx / ny - 0.3 * cos(st * 0.05)) * 2.95 + st * 0.2) * 80.0);\n\n  gl_FragColor = vec4(c * 0.5, 0.0, c * (1.0 + sin(st)) * 0.2, 1.0);\n}\n";var n={};n="precision highp float;\n#define GLSLIFY 1\n\nuniform float uTime;\n\nvoid main() {\n  float x = gl_FragCoord.x;\n  float y = gl_FragCoord.y;\n  float time = uTime;\n  float tek = mod((y / 2.0 + sin((x) / 6.0)) + cos(y / 20.0) * 3.0 + cos(x / 20.0 + time / 20.0) * 1.4 - time / 2.0, 35.0) / 15.0;\n  gl_FragColor = vec4(tek * 0.4, 0.1, 2.0 - tek * 0.5, 1.0);\n}\n";const t=[e("precision highp float;\n#define GLSLIFY 1\n\nuniform float uTime;\nuniform float uSize;\n\nvoid main() {\n  vec2 pos = gl_FragCoord.xy / uSize;\n  float x = pos.x;\n  float y = pos.y;\n  float t = uTime / 15.0;\n\n  float faq = uSize / 3.5;\n\n  float circles1 = sin(sin(t + 0.0) * 1.0 + x * faq) + cos(cos(t + 0.0) * 1.0 + y * faq);\n  float circles2 = sin(sin(t + 3.1) * 4.0 + x * faq) + cos(cos(t + 3.14) * 4.0 + y * faq);\n  float circles3 = sin(sin(t + 0.0) * 4.0 + x * faq) + cos(cos(t + 0.0) * 4.0 + y * faq);\n\n  gl_FragColor = vec4(circles1, circles2, circles3, 1.0);\n}\n"),e(o),e(n)];let i=Math.floor(Math.random()*t.length);const a=new Float32Array([-1,-1,1,1,-1,1,-1,-1,1,-1,1,1]),r=document.getElementById("canvas"),l=r.getContext("webgl");r.width=256,r.height=256,l.viewport(0,0,r.width,r.height),l.clearColor(0,0,0,1),l.clear(l.COLOR_BUFFER_BIT);const f=`
attribute vec2 aVertexPosition;

void main() {
gl_Position = vec4(aVertexPosition, 0.0, 1.0);
}
`;function c(e){let o=l.createShader(l.VERTEX_SHADER);t[i],l.shaderSource(o,f),l.compileShader(o);let n=l.createShader(l.FRAGMENT_SHADER);l.shaderSource(n,e),l.compileShader(n);let r=l.createProgram();l.attachShader(r,o),l.attachShader(r,n),l.linkProgram(r);let c=l.createBuffer();return l.bindBuffer(l.ARRAY_BUFFER,c),l.bufferData(l.ARRAY_BUFFER,a,l.STATIC_DRAW),l.useProgram(r),l.getShaderParameter(o,l.COMPILE_STATUS)||console.log(l.getShaderInfoLog(o)),l.getShaderParameter(n,l.COMPILE_STATUS)||console.log(l.getShaderInfoLog(n)),l.getProgramParameter(r,l.LINK_STATUS)||console.log(l.getProgramInfoLog(r)),r.uTime=l.getUniformLocation(r,"uTime"),l.uniform1f(r.uTime,1),r.uSize=l.getUniformLocation(r,"uSize"),l.uniform1f(r.uSize,256),r.aVertexPosition=l.getAttribLocation(r,"aVertexPosition"),l.enableVertexAttribArray(r.aVertexPosition),l.vertexAttribPointer(r.aVertexPosition,2,l.FLOAT,!1,0,0),r}let s=c(t[i]),g=0;const m=()=>{g++,l.uniform1f(s.uTime,g),l.drawArrays(l.TRIANGLES,0,6),setTimeout(m,50)};m(),r.onclick=()=>{i=(i+1)%t.length,s=c(t[i])};
//# sourceMappingURL=index.04899a50.js.map
