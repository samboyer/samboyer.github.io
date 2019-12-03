const canvas = document.getElementById('canvasGlitter');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
// Get 2d drawing context
const gl = canvas.getContext('webgl');
gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
const vertexCount = 6;
const vertexLocations = [
  // X, Y
  -1.0, -1.0,
   1.0, -1.0,
  -1.0,  1.0,
  -1.0,  1.0,
   1.0, -1.0,
   1.0,  1.0
];

gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array(vertexLocations),
  gl.STATIC_DRAW
);

const program = gl.createProgram();
const buildShader = (type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  gl.attachShader(program, shader);
  return shader;
};

const vertexShader = buildShader(
  gl.VERTEX_SHADER,
  `
attribute vec2 a_position;
void main() {
gl_Position = vec4(a_position, 0.0, 1.0);
}`
);

const fragmentShader = buildShader(
  gl.FRAGMENT_SHADER,
  `
precision highp float;
const float SCROLLSPEED = -0.01;
const float GLITTERSPEED = 100000.0;

uniform sampler2D noise;
uniform float height;
uniform float timestamp;

void main() {
  for(int j=1; j<=5; j+=1){
    float jf = float(j);

    float texScale=pow(2.0, 2.*jf + 6.); //noise tex scale factor
    vec4 col = texture2D(noise, (gl_FragCoord.xy + vec2(jf*7.47625, timestamp*SCROLLSPEED*jf ))/texScale);
    float pxVal = ((col.r-0.5)/ 256.0 + col.g-0.5)/256.0 + col.b; //0-1, 24 bit

    float period = GLITTERSPEED * jf;
    float p = mod(timestamp+pxVal*period*5007.29, period)/period; //loop between 0-1
    float func = (1. - 2.*p);
    float dist = pow(func*func, 128.0)/(2.*jf); //fade based on size
    gl_FragColor += vec4(dist,dist,dist,0.0);
  }
  gl_FragColor*=(1.- gl_FragCoord.y/height * 0.7); //fade based on y coordinate
}`
);

var compiled = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
console.log('Shader compiled successfully: ' + compiled);
var compilationLog = gl.getShaderInfoLog(fragmentShader);
console.log('Shader compiler log: ' + compilationLog);

gl.linkProgram(program);
gl.useProgram(program);
// Detach and delete shaders as they're no longer needed
gl.detachShader(program, vertexShader);
gl.detachShader(program, fragmentShader);
gl.deleteShader(vertexShader);
gl.deleteShader(fragmentShader);
// Add attribute pointer to our vertex locations
const positionLocation = gl.getAttribLocation(program, 'a_position');
gl.enableVertexAttribArray(positionLocation);
const fieldCount = vertexLocations.length / vertexCount;
gl.vertexAttribPointer(
  positionLocation,
  fieldCount,
  gl.FLOAT,
  gl.FALSE,
  fieldCount * Float32Array.BYTES_PER_ELEMENT,
  0
);

const timestampId = gl.getUniformLocation(program, 'timestamp');
const samplerId = gl.getUniformLocation(program, 'uSampler');
const heightId = gl.getUniformLocation(program, 'height');

const render = (timestamp) => {
  // Update timestamp
  gl.uniform1f(timestampId, timestamp);

  // Draw
  gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
  window.requestAnimationFrame(render);
};

window.requestAnimationFrame(render);

 // Tell WebGL we want to affect texture unit 0
 gl.activeTexture(gl.TEXTURE0);
 
var tex = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, tex);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([255, 0, 0, 255])); // red
// Tell the shader we bound the texture to texture unit 0
gl.uniform1i(samplerId, 0);
gl.uniform1f(heightId, parseInt(canvas.height));

var img = new Image();
img.src = "/img/noiseCol.webp";
img.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
}

window.onresize = function() {
  console.log('aaa');
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;
  if (canvas.width != width ||
      canvas.height != height) {
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // in this case just render when the window is resized.
    gl.uniform1f(heightId, parseInt(canvas.height));
    render();
  }
}
