precision highp float;

uniform float uTime;

void main() {
  float x = gl_FragCoord.x;
  float y = gl_FragCoord.y;
  float time = uTime;
  float tek = mod((y/2.0+sin((x)/6.0)) + cos(y/20.0)*3.0 + cos(x/20.0 + time/20.0)*1.4 - time/2.0, 35.0) / 15.0;
  gl_FragColor = vec4(tek*0.4, 0.1, 2.0 - tek*0.5, 1.0);
}
