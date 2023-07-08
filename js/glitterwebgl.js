function setupGlitter(){
  const canvas = document.getElementById('canvasGlitter');
  canvas.width = canvas.clientWidth; //set concrete dimensions
  canvas.height = canvas.clientHeight;

  const gl = canvas.getContext('webgl');
  gl.viewport(0, 0, canvas.width, canvas.height);

  //make full-viewport rect
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

  //make shader program
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
    void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
  `
  );

  const fragmentShader = buildShader(
    gl.FRAGMENT_SHADER,
    `
  precision highp float;
  const float SCROLLSPEED = -0.01;
  const float GLITTERSPEED = 100000.0;
  const float FADE_IN_DUR = 500.0;
  const float LARGE_FADE_FACTOR = 1.0;
  const float NUM_OCTAVES = 3.0;

  uniform sampler2D noise;
  uniform float height;
  uniform float timestamp;
  uniform float startTime;

  void main() {
    float opacity = 0.0;
    for(float octave=1.; octave<=NUM_OCTAVES; octave+=1.){

      float texScale=pow(2., 2.*octave + 7.); //noise tex scale factor
      vec4 col = texture2D(
        noise,
        (gl_FragCoord.xy + vec2(
          octave*7.47625,
          timestamp*SCROLLSPEED*octave)
        )/texScale
      );

      // Flatten RGB pixel into one number (so we get 24 bits of randomness:))
      float pxVal = ((col.r - 0.5) / 256.0 + col.g - 0.5)/256.0 + col.b;

      float period = GLITTERSPEED * octave;
      float p = mod(timestamp + pxVal * period * 5007.29, period)/period; //loop between 0-1
      float func = (1.0 - 2.0 * p);
      float dist = pow(func * func, 128.0) / (octave * LARGE_FADE_FACTOR); //fade based on size
      opacity += dist;
    }
    opacity *= pow(1.0 - gl_FragCoord.y / height, 0.3); //fade based on y coordinate

    if (timestamp - startTime <= FADE_IN_DUR) {
      opacity *= (timestamp - startTime) / FADE_IN_DUR; //initial fade in
    }
    gl_FragColor = vec4(0.0, 0.0, 0.0, opacity);
  }`
  );

  if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){console.log("Frag shader's dead");}

  gl.linkProgram(program);
  gl.useProgram(program);
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

  //get uniform pointers
  const timestampId = gl.getUniformLocation(program, 'timestamp');
  // const samplerId = gl.getUniformLocation(program, 'uSampler');
  const heightId = gl.getUniformLocation(program, 'height');
  gl.uniform1f(heightId, parseInt(canvas.height));
  const startTimeId = gl.getUniformLocation(program, 'startTime');
  var started = false;
  gl.clearColor(1.0,1.0,1.0,0);
  
  //render loop
  const render = (timestamp) => {
    if(glitterInView){
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timestampId, timestamp);
      if(!started){gl.uniform1f(startTimeId, timestamp);started=true;}
      gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
      window.requestAnimationFrame(render);
    }
    else{
      setTimeout(_ => window.requestAnimationFrame(render),100);
    }
  };

  // Make random noise texture 
  gl.activeTexture(gl.TEXTURE0)
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 512;
  const height = 512;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixels = new Uint8Array(512*512*4);
  for (var i=0;i<pixels.length;i++){
    pixels[i]=Math.floor(Math.random()*255);
  }
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixels,
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

  // Start render loop
  window.requestAnimationFrame(render);

  window.onresize = function() {
    var newWidth = canvas.clientWidth;
    var newHeight = canvas.clientHeight;
    if (canvas.width != newWidth ||
        canvas.height != newHeight) {
      canvas.width = newWidth;
      canvas.height = newHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.uniform1f(heightId, parseInt(canvas.height));
      render(); //just in case
    }
  }
}

setupGlitter();
