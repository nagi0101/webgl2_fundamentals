
const vertexShaderSource = `#version 300 es
    in vec4 a_position;
    in vec4 a_color;

    uniform vec2 u_resolution;
    uniform mat4 u_matrix;
    uniform float u_fudgeFactor;

    out vec4 v_color;

    void main() {
        vec4 position = u_matrix * a_position;
        float zToDivideBy =  1.0 + position.z * u_fudgeFactor;

        gl_Position = vec4(position.xyz, zToDivideBy);
        
        // 프래그먼트 쉐이더로 색상을 전달합니다.
        v_color = a_color;
    }
`;

const fragmentShaderSource = `#version 300 es
    precision highp float;

    in vec4 v_color;

    out vec4 outColor;

    void main() {
        outColor = v_color;
    }
`;

function main() {
    const canvas = document.querySelector('#c');

    const gl = canvas.getContext('webgl2');
    if(!gl){
        alert('WebGL2 not supported!');
    }

    const m4 = twgl.m4;
    m4.projection = function(width, height, depth){
      const projectionMatrix =  m4.multiply(
        m4.translation(v3.create(-1, 1, 0)),
        m4.scaling(v3.create(2/width, -2/height, 1/depth))
      );
      return projectionMatrix;
    };
    const v3 = twgl.v3;

    const programInfo = twgl.createProgramInfo(gl, [vertexShaderSource, fragmentShaderSource]);
    const bufferDatas = {
        a_position : {
            numComponents : 3,
            data: new Float32Array([
                // left column front
                0,   0,  0,
                0, 150,  0,
                30,   0,  0,
                0, 150,  0,
                30, 150,  0,
                30,   0,  0,
      
                // top rung front
                30,   0,  0,
                30,  30,  0,
                100,   0,  0,
                30,  30,  0,
                100,  30,  0,
                100,   0,  0,
      
                // middle rung front
                30,  60,  0,
                30,  90,  0,
                67,  60,  0,
                30,  90,  0,
                67,  90,  0,
                67,  60,  0,
      
                // left column back
                  0,   0,  30,
                 30,   0,  30,
                  0, 150,  30,
                  0, 150,  30,
                 30,   0,  30,
                 30, 150,  30,
      
                // top rung back
                 30,   0,  30,
                100,   0,  30,
                 30,  30,  30,
                 30,  30,  30,
                100,   0,  30,
                100,  30,  30,
      
                // middle rung back
                 30,  60,  30,
                 67,  60,  30,
                 30,  90,  30,
                 30,  90,  30,
                 67,  60,  30,
                 67,  90,  30,
      
                // top
                  0,   0,   0,
                100,   0,   0,
                100,   0,  30,
                  0,   0,   0,
                100,   0,  30,
                  0,   0,  30,
      
                // top rung right
                100,   0,   0,
                100,  30,   0,
                100,  30,  30,
                100,   0,   0,
                100,  30,  30,
                100,   0,  30,
      
                // under top rung
                30,   30,   0,
                30,   30,  30,
                100,  30,  30,
                30,   30,   0,
                100,  30,  30,
                100,  30,   0,
      
                // between top rung and middle
                30,   30,   0,
                30,   60,  30,
                30,   30,  30,
                30,   30,   0,
                30,   60,   0,
                30,   60,  30,
      
                // top of middle rung
                30,   60,   0,
                67,   60,  30,
                30,   60,  30,
                30,   60,   0,
                67,   60,   0,
                67,   60,  30,
      
                // right of middle rung
                67,   60,   0,
                67,   90,  30,
                67,   60,  30,
                67,   60,   0,
                67,   90,   0,
                67,   90,  30,
      
                // bottom of middle rung.
                30,   90,   0,
                30,   90,  30,
                67,   90,  30,
                30,   90,   0,
                67,   90,  30,
                67,   90,   0,
      
                // right of bottom
                30,   90,   0,
                30,  150,  30,
                30,   90,  30,
                30,   90,   0,
                30,  150,   0,
                30,  150,  30,
      
                // bottom
                0,   150,   0,
                0,   150,  30,
                30,  150,  30,
                0,   150,   0,
                30,  150,  30,
                30,  150,   0,
      
                // left side
                0,   0,   0,
                0,   0,  30,
                0, 150,  30,
                0,   0,   0,
                0, 150,  30,
                0, 150,   0,
            ]),
        },
        a_color : {
            numComponents: 3,
            data: new Uint8Array([
                // left column front
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
      
                // top rung front
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
      
                // middle rung front
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
      
                // left column back
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
      
                // top rung back
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
      
                // middle rung back
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
      
                // top
              70, 200, 210,
              70, 200, 210,
              70, 200, 210,
              70, 200, 210,
              70, 200, 210,
              70, 200, 210,
      
                // top rung right
              200, 200, 70,
              200, 200, 70,
              200, 200, 70,
              200, 200, 70,
              200, 200, 70,
              200, 200, 70,
      
                // under top rung
              210, 100, 70,
              210, 100, 70,
              210, 100, 70,
              210, 100, 70,
              210, 100, 70,
              210, 100, 70,
      
                // between top rung and middle
              210, 160, 70,
              210, 160, 70,
              210, 160, 70,
              210, 160, 70,
              210, 160, 70,
              210, 160, 70,
      
                // top of middle rung
              70, 180, 210,
              70, 180, 210,
              70, 180, 210,
              70, 180, 210,
              70, 180, 210,
              70, 180, 210,
      
                // right of middle rung
              100, 70, 210,
              100, 70, 210,
              100, 70, 210,
              100, 70, 210,
              100, 70, 210,
              100, 70, 210,
      
                // bottom of middle rung.
              76, 210, 100,
              76, 210, 100,
              76, 210, 100,
              76, 210, 100,
              76, 210, 100,
              76, 210, 100,
      
                // right of bottom
              140, 210, 80,
              140, 210, 80,
              140, 210, 80,
              140, 210, 80,
              140, 210, 80,
              140, 210, 80,
      
                // bottom
              90, 130, 110,
              90, 130, 110,
              90, 130, 110,
              90, 130, 110,
              90, 130, 110,
              90, 130, 110,
      
                // left side
              160, 160, 220,
              160, 160, 220,
              160, 160, 220,
              160, 160, 220,
              160, 160, 220,
              160, 160, 220,
            ]),
        },
    };
    
    const bufferInfo = twgl.createBufferInfoFromArrays(gl, bufferDatas);
    let resolution = [gl.canvas.width, gl.canvas.height]
    let fieldOfViewRadians = 45.0 * Math.PI / 180.0;
    let cameraAngleRadians = 45.0 * Math.PI / 180.0;
    const aspect = resolution[0] / resolution[1];
    const near = 0.1;
    const far = 2000.0;      
    const translation = v3.create(0, 0, 0);
    const scale = v3.create(1, 1, 1);
    const rotation = [degToRad(40), degToRad(25), degToRad(325)];
    
    render();
    
    function render(deltaTime) {
      const numFs = 5;
      const radius = 200;

      twgl.resizeCanvasToDisplaySize(gl.canvas);
      resolution = [gl.canvas.width, gl.canvas.height];
      gl.viewport(0, 0, resolution[0], resolution[1]);
      
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.clear(gl.DEPTH_BUFFER_BIT);

      gl.enable(gl.CULL_FACE);
      gl.enable(gl.DEPTH_TEST);

      // let matrix = m4.create();
      const perspectiveMatrix = m4.perspective(fieldOfViewRadians, aspect, near, far);
      // const translationMatrix = m4.translation(translation);
      // const rotationXMatrix = m4.rotationX(rotation[0]);
      // const rotationYMatrix = m4.rotationY(rotation[1]);
      // const rotationZMatrix = m4.rotationZ(rotation[2]);
      // let rotationMatrix = m4.multiply(rotationXMatrix, rotationYMatrix);
      // rotationMatrix = m4.multiply(rotationMatrix, rotationZMatrix);
      // const scaleMatrix = m4.scaling(scale);
      let cameraMatrix = m4.rotationY(cameraAngleRadians);
      cameraMatrix = m4.translate(cameraMatrix, v3.create(0, 50, radius * 2));
      const viewMatrix = m4.inverse(cameraMatrix);
      const viewProjectionMatrix = m4.multiply(perspectiveMatrix, viewMatrix);
      // matrix = perspectiveMatrix;
      // matrix = m4.multiply(matrix, translationMatrix);;
      // matrix = m4.multiply(matrix, rotationMatrix);
      // matrix = m4.multiply(matrix, scaleMatrix);

      const uniforms = {
        u_resolution: resolution,
        u_fudgeFactor: 1,
      };

      gl.useProgram(programInfo.program);
      
      twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
      // twgl.setUniforms(programInfo, uniforms);
      // twgl.drawBufferInfo(gl, bufferInfo);

      for(let i = 0; i < numFs; i++) {
        const angle = i * (2 * Math.PI / numFs);

        const matrix = m4.translate(
          viewProjectionMatrix, 
          v3.create(
            Math.cos(angle) * radius,
            0,
            Math.sin(angle) * radius
          ));
        uniforms.u_matrix = matrix;
        twgl.setUniforms(programInfo, uniforms);
        twgl.drawBufferInfo(gl, bufferInfo);
      }
    };

    function radToDeg(r) {
        return r * 180 / Math.PI;
      }
    
      function degToRad(d) {
        return d * Math.PI / 180;
      }

    // Setup a ui.
    // webglLessonsUI.setupSlider("#fieldOfView", {value: radToDeg(fieldOfViewRadians), slide: updateFieldOfView, min: 1, max:179 });
    // webglLessonsUI.setupSlider("#x",      {value: translation[0], slide: updatePosition(0), max: gl.canvas.width });
    // webglLessonsUI.setupSlider("#y",      {value: translation[1], slide: updatePosition(1), max: gl.canvas.height});
    // webglLessonsUI.setupSlider("#z",      {value: translation[2], slide: updatePosition(2), min: -1000, max: 0});
    // webglLessonsUI.setupSlider("#angleX", {value: radToDeg(rotation[0]), slide: updateRotation(0), max: 360});
    // webglLessonsUI.setupSlider("#angleY", {value: radToDeg(rotation[1]), slide: updateRotation(1), max: 360});
    // webglLessonsUI.setupSlider("#angleZ", {value: radToDeg(rotation[2]), slide: updateRotation(2), max: 360});
    // webglLessonsUI.setupSlider("#scaleX", {value: scale[0], slide: updateScale(0), min: -5, max: 5, step: 0.01, precision: 2});
    // webglLessonsUI.setupSlider("#scaleY", {value: scale[1], slide: updateScale(1), min: -5, max: 5, step: 0.01, precision: 2});
    // webglLessonsUI.setupSlider("#scaleZ", {value: scale[2], slide: updateScale(2), min: -5, max: 5, step: 0.01, precision: 2});
    webglLessonsUI.setupSlider("#cameraAngle", {value: radToDeg(cameraAngleRadians), slide: updateCameraAngle, min: -360, max: 360});

    function updateCameraAngle(event, ui) {
      cameraAngleRadians = degToRad(ui.value);
      render();
    }

    function updateFieldOfView(event, ui) {
      fieldOfViewRadians = degToRad(ui.value);
      render();
    }

    function updatePosition(index) {
    return function(event, ui) {
        translation[index] = ui.value;
        render();
    };
    }

    function updateRotation(index) {
    return function(event, ui) {
        const angleInDegrees = ui.value;
        const angleInRadians = degToRad(angleInDegrees);
        rotation[index] = angleInRadians;
        render();
    };
    }

    function updateScale(index) {
    return function(event, ui) {
        scale[index] = ui.value;
        render();
    };
    }
}


main();