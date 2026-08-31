precision highp float;

uniform float uTime;

void main() {
  float x = gl_FragCoord.x;
  float y = gl_FragCoord.y;
  float time = -uTime;
  float tek = mod((y / 2.0 + sin((x) / 6.0)) + cos(y / 20.0) * 3.0 + cos(x / 20.0 + time / 20.0) * 1.4 - time / 2.0, 35.0) / 15.0;

  // base blue color
  vec3 blue = vec3(0.5, 0.7, 0.9);
  vec3 white = vec3(1.0, 1.0, 1.0);
  vec3 yellow = vec3(1.0, 0.8, 0.5);
  
  float bgMask = clamp((sin(x/30.0) + cos(0.7 + y / 70.0) * 12.0 + 1.0) / .8, 0.0, 1.0);
  float bgMask2 = clamp((sin(x/30.0) + cos(0.65 + y / 70.0) * 3.0 + 1.0) / .8, 0.0, 1.0);
  vec3 beach = (yellow * bgMask) + (blue * (1.0 - bgMask));

  // float bigWave = 1.0 - min(1.0, mod((y / 2.0 + sin((x) / 6.0)) + cos(y / 10.0) * 3.0 + cos(x / 20.0 + time / 20.0) * 1.4 - time / 1.0, 35.0) / 15.0);
  float bigWave = sin(y / 14.0);

  float blop = 1.0 - min(1.0, mod((y / 2.0 + sin(x / 5.0)) + cos(y / 20.0) * 3.0 + cos(x / 20.0 + time / 20.0) * 1.4 - time / 2.0 - 2.0, 35.0) / 5.0);
 
  gl_FragColor = vec4(white * bigWave * (1.0 - bgMask2) * 0.5 + white * blop * (1.0 - bgMask2) * 0.0 + beach * 0.0, 1.0);

  // gl_FragColor = vec4(white * blop, 1.0);

}
