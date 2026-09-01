precision highp float;

uniform float uTime;
uniform float uSize;

void main() {

  float x = gl_FragCoord.x;
  float y = gl_FragCoord.y;

  float nx = x / uSize;
  float ny = y / uSize;

  float time = -uTime;
  float tek = mod((y / 2.0 + sin((x) / 6.0)) + cos(y / 20.0) * 3.0 + cos(x / 20.0 + time / 20.0) * 1.4 - time / 2.0, 35.0) / 15.0;

  // base blue color
  vec3 blue = vec3(0.5, 0.7, 0.9);
  vec3 white = vec3(1.0, 1.0, 1.0);
  vec3 yellow = vec3(1.0, 0.8, 0.5);
  
  float bgMask = clamp((sin(x/30.0) + cos(0.7 + y / 70.0) * 12.0 + 1.0) / .8, 0.0, 1.0);
  float bgMask2 = clamp((sin(x/30.0) * 0.8 + cos(0.8 + y / 75.0) * 12.0 + 0.2) / .8, 0.0, 1.0);
  vec3 beach = ((1.0 + sin(ny * 8.3 * nx * 2.2) / 5.0) * yellow * bgMask) + (blue * (1.0 - bgMask));

  float bigWave = 1.0 - min(1.0, mod((y / 2.0 + sin((x) / 8.0)) + cos(y / 13.0) * (1.0 - ny) * 5.0 + cos(x / 20.0 + time / 20.0) * 1.4 - time / 1.0, 42.0) / 30.0);

  gl_FragColor = vec4(white * bigWave * (1.0 - bgMask2) * 0.6 + beach * 0.9, 1.0);

  // gl_FragColor = vec4(white * bigWave, 1.0);

}
