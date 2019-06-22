precision highp float;

uniform float uTime;

void main() {
  float x = gl_FragCoord.x;
  float y = gl_FragCoord.y;
  float nx = x / 512.0 + 0.5;
  float ny = y / 512.0 + 0.5;

  // float time = uTime;
  float st = uTime/40.0;

//
  float c = sin( ((ny*ny-sin(st*0.1))*(nx/ny-0.3*cos(st*0.05))*2.95 +st*0.2)*80.0 );

  gl_FragColor = vec4(c*0.5, 0.0 , c*(1.0+sin(st))*0.2, 1.0);
}
