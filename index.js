"use strict";

var canvas;
var gl;
var program;
var numPositions = 10000;

var projectionMatrix;
var modelViewMatrix;
var modelViewMatrixLoc;
var projectionMatrixLoc;
var nMatrix, nMatrixLoc;

// projection
var phi = 0;
var radius = 40;
var near = 4.0;
var far = 50;
var fovy = 45;
var aspect;

var numNodes = 16;
var numAngles = 11;
var angle = 0;

var numVertices = 24;

var stack = [];

var figure = [];

for (var i = 0; i < numNodes; i++)
  figure[i] = createNode(null, null, null, null);

var vBuffer;
var modelViewLoc;

var lightPosition = vec4(0.5, 0.5, 0, 0.0);
var lightAmbient = vec4(0.3, 0.4, 1.0, 1.0); // Neutral ambient lighting
var lightDiffuse = vec4(0.2, 1, 1, 1.0);
var lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);
var materialAmbient = vec4(1.0, 0.0, 1.0, 1.0);
var materialDiffuse = vec4(1.0, 0.8, 1.0, 1.0);
var materialSpecular = vec4(1.0, 1.0, 1.0, 1.0);
var materialShininess = 20.0;

var ambientProduct = mult(lightAmbient, materialAmbient);
var diffuseProduct = mult(lightDiffuse, materialDiffuse);
var specularProduct = mult(lightSpecular, materialSpecular);

var ambientProductLoc;
var diffuseProductLoc;
var uSpecularProductLoc;
var uLightPositionLoc;
var materialShininessLoc;

// lighting

function configureTexture(image) {
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  // Use linear filtering to make sure the texture scales smoothly
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR_MIPMAP_LINEAR,
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  gl.uniform1i(gl.getUniformLocation(program, "uTexMap"), 0);
}

init();

function traverse(Id) {
  if (Id == null) return;
  stack.push(modelViewMatrix);
  modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);
  figure[Id].render(gl, modelViewMatrixLoc, modelViewMatrix);
  if (figure[Id].child != null) traverse(figure[Id].child);
  modelViewMatrix = stack.pop();
  if (figure[Id].sibling != null) traverse(figure[Id].sibling);
}

function init() {
  canvas = document.getElementById("gl-canvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  aspect = canvas.width / canvas.height;
  gl = canvas.getContext("webgl2");
  if (!gl) {
    alert("WebGL 2.0 isn't available");
  }
  gl.enable(gl.DEPTH_TEST);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  program = initShaders(gl, "vertex-shader", "fragment-shader");

  gl.useProgram(program);

  nMatrixLoc = gl.getUniformLocation(program, "uNormalMatrix");

  (projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix")),
    (modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix"));

  ambientProductLoc = gl.getUniformLocation(program, "uAmbientProduct");
  diffuseProductLoc = gl.getUniformLocation(program, "uDiffuseProduct");
  uSpecularProductLoc = gl.getUniformLocation(program, "uSpecularProduct");
  uLightPositionLoc = gl.getUniformLocation(program, "uLightPosition");
  materialShininessLoc = gl.getUniformLocation(program, "uShininess");

  gl.uniform4fv(ambientProductLoc, flatten(ambientProduct));
  gl.uniform4fv(diffuseProductLoc, flatten(diffuseProduct));
  gl.uniform4fv(uSpecularProductLoc, flatten(specularProduct));
  gl.uniform4fv(uLightPositionLoc, flatten(lightPosition));
  gl.uniform1f(materialShininessLoc, materialShininess);

  image.onload = function () {
    configureTexture(image);
  };
  image.src = "skin.jpg";
  configureTexture(image);
  for (i = 0; i < numNodes; i++) initNodes(i);
  render();
}

function createBuffer() {
  var nBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);

  var colBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  var colorLoc = gl.getAttribLocation(program, "aColor");
  gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(colorLoc);

  vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

  var aNormalLoc = gl.getAttribLocation(program, "aNormal");
  gl.vertexAttribPointer(aNormalLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aNormalLoc);

  var positionLoc = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLoc);

  var tBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW);

  var texCoordLoc = gl.getAttribLocation(program, "aTexCoord");
  gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(texCoordLoc);
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  Transformer();
  theta[torsoId] += 3;

  initNodes(torsoId);

  traverse(torsoId);
  requestAnimationFrame(render);
}

function Transformer() {
  const eye = vec3(
    radius * Math.sin(0) * Math.cos(phi),
    radius * Math.sin(0) * Math.sin(phi),
    radius * Math.cos(0),
  );
  const at = vec3(0.0, 0.0, 0.0); // Look at the center (the object)
  const up = vec3(0.0, 1.0, 0.0); // Up is in the Y direction
  modelViewMatrix = lookAt(eye, at, up);
  projectionMatrix = perspective(fovy, aspect, near, far);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
  gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

  // nMatrix = normalMatrix(modelViewMatrix, true);
  // gl.uniformMatrix3fv(nMatrixLoc, false, flatten(nMatrix));
  nMatrix = normalMatrix(modelViewMatrix, true);
  gl.uniformMatrix3fv(nMatrixLoc, false, flatten(nMatrix));
}
