"use strict";

var canvas;
var gl;
var program;
var numPositions = 10000;

var projectionMatrix;
var modelViewMatrix;
var modelViewMatrixLoc;
var projectionMatrixLoc;

// projection
var phi = 0;
var radius = 40;
var near = 4.0;
var far = 100;
var fovy = 45;
var aspect;

var numNodes = 15;
var numAngles = 11;
var angle = 0;

// var theta = [0, 0, 0, 0, 0, 0, 180, 0, 180, 0, 0];

var numVertices = 24;

var stack = [];

var figure = [];

for (var i = 0; i < numNodes; i++)
  figure[i] = createNode(null, null, null, null);

var vBuffer;
var modelViewLoc;

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

  (projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix")),
    (modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix"));

  for (i = 0; i < numNodes; i++) initNodes(i);
  render();
}

function createBuffer() {
  vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

  var positionLoc = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLoc);

  var colBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  var colorLoc = gl.getAttribLocation(program, "aColor");
  gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(colorLoc);
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
}
