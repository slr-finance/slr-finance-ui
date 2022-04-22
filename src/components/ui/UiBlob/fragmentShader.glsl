varying vec2 vUv;
varying float vDistort;

uniform float uTime;
uniform float uHue;
uniform vec3 uColor;
uniform vec3 uColor1;
uniform float uAlpha;

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}   

void main() {
  float distort = vDistort * 4.0;

  vec3 brightness = vec3(0.5, 0.5, 0.5);
  vec3 contrast = vec3(0.5, 0.5, 0.5);
  vec3 oscilation = vec3(1.0, 1.0, 1.0);
  vec3 phase = vec3(0.0, 0.1, 0.2);

  vec3 color = mix(uColor, uColor1, distort);

  if (vUv.y > 0.5) {
    gl_FragColor = vec4(color, uAlpha);
  } else {
    gl_FragColor = vec4(mix(vec3(0.), color, vUv.y *2.), uAlpha);
  }
}