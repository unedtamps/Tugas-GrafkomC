var torsoHeight = 5.0;
var torsoWidth = 2.0;
var upperArmHeight = 2.5;
var lowerArmHeight = 3.0;
var upperArmWidth = 1.1;
var lowerArmWidth = 0.8;
var upperLegWidth = 1.2;
var lowerLegWidth = 0.8;
var lowerLegHeight = 4.0;
var upperLegHeight = 3.0;
var footHeight = 1.2;
var footWidht = 1.2;
var headHeight = 2.0;
var headWidth = 2.0;
var handWidth = 1.3;
var handHeight = 1.3;
var ballHeight = 2.5;
var ballWidth = 2.5;
var armLegTranslate = 1.6;

function imageTex(imageName) {
  var newImage = new Image();
  newImage.src = imageName;
  configureTexture(newImage);
}

function torso(gl, modelViewMatrixLoc, modelViewMatrix) {
  createCylinder(black);
  createBuffer();
  imageTex("skin.jpg");
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(0.0, 0.5 * torsoHeight, 0.0),
  );
  instanceMatrix = mult(
    instanceMatrix,
    scale(torsoWidth, torsoHeight, torsoWidth),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}

function head(gl, modelViewMatrixLoc, modelViewMatrix) {
  createSphere(brown);
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(0.0, 1 * headHeight, 0.0),
  );
  instanceMatrix = mult(
    instanceMatrix,
    scale(headWidth, headHeight, headWidth),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}

function leftUpperArm(gl, modelViewMatrixLoc, modelViewMatrix) {
  createCube(black);
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(0, 0.5 * upperArmHeight, 0.0),
  );
  instanceMatrix = mult(
    instanceMatrix,
    scale(upperArmWidth, upperArmHeight, upperArmWidth),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}

function leftLowerArm(gl, modelViewMatrixLoc, modelViewMatrix) {
  createCube(brown);
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(0, 0.5 * lowerArmHeight, 0.0),
  );
  instanceMatrix = mult(
    instanceMatrix,
    scale(lowerArmWidth, lowerArmHeight, lowerArmWidth),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}

function rightUpperArm(gl, modelViewMatrixLoc, modelViewMatrix) {
  createCube(black);
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(0, 0.5 * upperArmHeight, 0.0),
  );
  instanceMatrix = mult(
    instanceMatrix,
    scale(upperArmWidth, upperArmHeight, upperArmWidth),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}

function rightLowerArm(gl, modelViewMatrixLoc, modelViewMatrix) {
  createCube(brown);
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(0, 0.5 * lowerArmHeight, 0.0),
  );
  instanceMatrix = mult(
    instanceMatrix,
    scale(lowerArmWidth, lowerArmHeight, lowerArmWidth),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}

function leftUpperLeg(gl, modelViewMatrixLoc, modelViewMatrix) {
  createCube(blue);
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(0, 0.5 * upperLegHeight, 0.0),
  );
  instanceMatrix = mult(
    instanceMatrix,
    scale(upperLegWidth, upperLegHeight, upperLegWidth),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}

function leftHand(gl, modelViewMatrixLoc, modelViewMatrix) {
  createSphere(brown);
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(0, 0.5 * handHeight, 0.0),
  );
  instanceMatrix = mult(
    instanceMatrix,
    scale(handWidth, handHeight, handWidth),
  );

  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}

function rightHand(gl, modelViewMatrixLoc, modelViewMatrix) {
  createSphere(brown);
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(0, 0.5 * handHeight, 0.0),
  );
  instanceMatrix = mult(
    instanceMatrix,
    scale(handWidth, handHeight, handWidth),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}

function ballNode(gl, modelViewMatrixLoc, modelViewMatrix) {
  createSphere(white);
  createBuffer();
  imageTex("ball.jpg");
  var instanceMatrix = mult(modelViewMatrix, translate(0, 0, 0.0));
  instanceMatrix = mult(
    instanceMatrix,
    scale(ballWidth, ballHeight, ballWidth),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
  // imageTex("skin.jpg");
}

function leftLowerLeg(gl, modelViewMatrixLoc, modelViewMatrix) {
  createCube(brown);
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(0, 0.5 * lowerLegHeight, 0.0),
  );
  instanceMatrix = mult(
    instanceMatrix,
    scale(lowerLegWidth, lowerLegHeight, lowerLegWidth),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}

function rightUpperLeg(gl, modelViewMatrixLoc, modelViewMatrix) {
  createCube(blue);
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(0, 0.5 * upperLegHeight, 0.0),
  );
  instanceMatrix = mult(
    instanceMatrix,
    scale(upperLegWidth, upperLegHeight, upperLegWidth),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}

function rightLowerLeg(gl, modelViewMatrixLoc, modelViewMatrix) {
  createCube(brown);
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(0, 0.5 * lowerLegHeight, 0.0),
  );
  instanceMatrix = mult(
    instanceMatrix,
    scale(lowerLegWidth, lowerLegHeight, lowerLegWidth),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}

function rightFoot(gl, modelViewMatrixLoc, modelViewMatrix) {
  createCube(tosca);
  createBuffer();
  var instanceMatrix = mult(modelViewMatrix, translate(0, 2 * footHeight, 0.0));
  instanceMatrix = mult(
    instanceMatrix,
    scale(footWidht, footHeight, footWidht),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}

// }

function leftFoot(gl, modelViewMatrixLoc, modelViewMatrix) {
  createCube(tosca);
  createBuffer();
  var instanceMatrix = mult(modelViewMatrix, translate(0, 2 * footHeight, 0.0));
  instanceMatrix = mult(
    instanceMatrix,
    scale(footWidht, footHeight, footWidht),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}
