precision highp float;

uniform float uTime;
uniform float uSize;

void main() {
  vec2 pos = gl_FragCoord.xy / uSize;
  
  float t = uTime / 5.0;

  float circleCount = 7.0;
  float radius = 0.4;

  vec2 uv = fract(pos * circleCount);

  float speed = 0.2 + pos.x / 3.0;
  float dist = length(uv - vec2(0.5, 0.5) + vec2(sin(t*speed), cos(t*speed)) * 0.3);
  float color = smoothstep(radius + 0.01, radius - 0.01, dist);

  float speed2 = 0.6 + pos.y / 2.2;
  float dist2 = length(uv - vec2(0.5, 0.5) + vec2(sin(t*speed2), cos(t*speed2)) * 0.3);
  float green = smoothstep(radius + 0.01, radius - 0.01, dist2);

  float speed3 = 1.0 + pos.x / 2.5;
  float dist3 = length(uv - vec2(0.5, 0.5) + vec2(sin(t*speed3), cos(t*speed3)) * 0.3);
  float blue = smoothstep(radius + 0.01, radius - 0.01, dist3);

  gl_FragColor = vec4(0.2 + color, 0.1+ green, 0.4+blue, 1.0);
}
