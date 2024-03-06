precision highp float;

uniform float uTime;
uniform float uSize;

void main() {
  vec2 pos = gl_FragCoord.xy / uSize;
  float x = pos.x;
  float y = pos.y;
  float t = uTime / 15.0;

  float faq = uSize / 3.5;

  float circles1 = sin(sin(t + 0.0) * 1.0 + x * faq) + cos(cos(t + 0.0) * 1.0 + y * faq);
  float circles2 = sin(sin(t + 3.1) * 4.0 + x * faq) + cos(cos(t + 3.14) * 4.0 + y * faq);
  float circles3 = sin(sin(t + 0.0) * 4.0 + x * faq) + cos(cos(t + 0.0) * 4.0 + y * faq);

  gl_FragColor = vec4(circles1, circles2, circles3, 1.0);
}
