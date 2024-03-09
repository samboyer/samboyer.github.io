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

  const vec2 DISP_UV_SCALE = vec2(200000, 10000);
  const float DISP_SCROLL_SPEED = 0.00002;
  const float DISP_THRESHOLD = 0.01;
  const float INVERT_COL_THRESHOLD = 0.5;
  const vec2 DISP_DIR = vec2(200, 200);

  uniform sampler2D noise;
  uniform float height;
  uniform float timestamp;
  uniform float startTime;

  uniform float cursor_x;
  uniform float cursor_y;
  uniform float cursor_strength;
  uniform float cursor_radius;

  // Do a texture lookup and return as a 1D float.
  float texture2DFloat(sampler2D tex, vec2 uv) {
    vec4 col = texture2D(tex, uv);
    return (col.r / 256.0 + col.g)/256.0 + col.b;
  }

  void main() {
    float opacity = 0.0;
    vec2 uv = gl_FragCoord.xy;

    vec2 uv_to_cursor = gl_FragCoord.xy - vec2(cursor_x, cursor_y);
    float dist_to_cursor = pow(pow(uv_to_cursor.x, 2.0) + pow(uv_to_cursor.y, 2.0),0.5);
    float dist_from_edge = max((cursor_radius-dist_to_cursor)/cursor_radius, 0.0);
    float push_influence = pow(dist_from_edge,0.8)*cursor_strength;
    uv += normalize(uv_to_cursor) * push_influence;
    //gl_FragColor = vec4(push_influence, push_influence, push_influence, 1.0);
    //return;


    // calculate displacement map, and other glitchy effects
    float disp = mod(texture2DFloat(noise, gl_FragCoord.xy/DISP_UV_SCALE)+timestamp*DISP_SCROLL_SPEED, 1.0);
    float should_displace = disp < DISP_THRESHOLD ? 1.0 : 0.0;
    vec4 kind_of_displace = texture2D(noise, gl_FragCoord.xy/DISP_UV_SCALE);

    gl_FragColor = vec4(kind_of_displace.rgb * should_displace,1.0);
    // return;

    float invert_r = kind_of_displace.r < INVERT_COL_THRESHOLD ? should_displace : 0.0;
    float invert_g = kind_of_displace.g < INVERT_COL_THRESHOLD ? should_displace : 0.0;
    float invert_b = kind_of_displace.b < INVERT_COL_THRESHOLD ? should_displace : 0.0;
    opacity += kind_of_displace.a < INVERT_COL_THRESHOLD && should_displace>0.0? 0.1 : 0.0;
    uv += + DISP_DIR * should_displace;

    float scroll_x = disp < DISP_THRESHOLD && kind_of_displace.r<0.5 ? SCROLLSPEED/(kind_of_displace.r*2.0-0.5): 0.0;
    float scroll_y = disp < DISP_THRESHOLD ? (kind_of_displace.r>0.5 ? SCROLLSPEED/(kind_of_displace.g*2.0-1.5) : 0.0) : SCROLLSPEED;
    float scale_adjust = disp < DISP_THRESHOLD ? (kind_of_displace.b-0.5)*7.0 : 0.0;

    // apply looping particle texture
    for(float octave=1.; octave<=NUM_OCTAVES; octave+=1.){
      float texScale=pow(2., 2.*octave + 7.+scale_adjust); //noise tex scale factor

      float pxVal = texture2DFloat(noise,
        (uv + vec2(
          octave*7.47625+timestamp*scroll_x,
          timestamp*scroll_y*octave)
        )/texScale
      );

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

    gl_FragColor = vec4(invert_r, invert_g,invert_b, opacity);
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
  const cursor_x_id = gl.getUniformLocation(program, 'cursor_x');
  const cursor_y_id = gl.getUniformLocation(program, 'cursor_y');
  const cursor_strength_id = gl.getUniformLocation(program, 'cursor_strength');
  const cursor_radius_id = gl.getUniformLocation(program, 'cursor_radius');
  // const samplerId = gl.getUniformLocation(program, 'uSampler');
  const heightId = gl.getUniformLocation(program, 'height');
  gl.uniform1f(heightId, parseInt(canvas.height));
  const startTimeId = gl.getUniformLocation(program, 'startTime');
  var started = false;
  gl.clearColor(1.0,1.0,1.0,0);
  


  //render loop

  var old_x, old_y;
  var new_x, new_y;
  var cursor_scale_width = 0.0;

  const render = (timestamp) => {
    if(glitterInView){
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timestampId, timestamp);
      if(!started){gl.uniform1f(startTimeId, timestamp);started=true;}

      if (new_x!==undefined){
        const dist_moved = Math.pow(Math.pow(new_x-old_x,2)+Math.pow(new_y-old_y,2),0.5);
        cursor_scale_width = (cursor_scale_width+dist_moved)*0.85;
        gl.uniform1f(cursor_strength_id,cursor_scale_width*-0.1);
        gl.uniform1f(cursor_radius_id,cursor_scale_width*2);
        old_x = new_x;
        old_y = new_y;
      }

      gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
    //   window.requestAnimationFrame(render);
      setTimeout(_ => window.requestAnimationFrame(render),25);
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


  document.onmousemove = function(e){
    var rect = canvas.getBoundingClientRect();
    new_x = e.clientX - rect.left;
    new_y = canvas.height-(e.clientY - rect.top);
    if (old_x==undefined){old_x=new_x;old_y=new_y;}

    gl.uniform1f(cursor_x_id, new_x);
    gl.uniform1f(cursor_y_id, new_y);
  }
}

setupGlitter();
