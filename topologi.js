var torsoHeight = 5.0;
var torsoWidth = 2.0;
var upperArmHeight = 3.0;
var lowerArmHeight = 2.0;
var upperArmWidth = 0.8;
var lowerArmWidth = 0.8;
var upperLegWidth = 0.8;
var lowerLegWidth = 0.8;
var lowerLegHeight = 2.0;
var upperLegHeight = 3.0;
var footHeight = 1.2;
var footWidht = 1.2;
var headHeight = 2.0;
var headWidth = 2.0;
var handWidth = 1.3;
var handHeight = 1.3;
var armLegTranslate = 1.2;

function torso(gl, modelViewMatrixLoc, modelViewMatrix) {
  createCylinder(black);
  createBuffer();
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
  createSphere(black, 0.5);
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
  createCube();
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(armLegTranslate, 0.5 * upperArmHeight, 0.0),
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
  createCube();
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(armLegTranslate, 0.5 * lowerArmHeight, 0.0),
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
  createCube();
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(-armLegTranslate, 0.5 * upperArmHeight, 0.0),
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
  createCube();
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(-armLegTranslate, 0.5 * lowerArmHeight, 0.0),
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
  createCube();
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(armLegTranslate, 0.5 * upperLegHeight, 0.0),
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
  createSphere(black);
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(armLegTranslate, 0.5 * handHeight, 0.0),
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
  createSphere(black);
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(-armLegTranslate, 0.5 * handHeight, 0.0),
  );
  instanceMatrix = mult(
    instanceMatrix,
    scale(handWidth, handHeight, handWidth),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}

function leftLowerLeg(gl, modelViewMatrixLoc, modelViewMatrix) {
  createCube();
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(armLegTranslate, 0.5 * lowerLegHeight, 0.0),
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
  createCube();
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(-armLegTranslate, 0.5 * upperLegHeight, 0.0),
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
  createCube();
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(-armLegTranslate, 0.5 * lowerLegHeight, 0.0),
  );
  instanceMatrix = mult(
    instanceMatrix,
    scale(lowerLegWidth, lowerLegHeight, lowerLegWidth),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}

function rightLowerLeg(gl, modelViewMatrixLoc, modelViewMatrix) {
  createCube();
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(-armLegTranslate, 0.5 * lowerLegHeight, 0.0),
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
  createCube(black);
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(-armLegTranslate, 0.5 * footHeight, 0.0),
  );
  instanceMatrix = mult(
    instanceMatrix,
    scale(footWidht, footHeight, footWidht),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}

function leftFoot(gl, modelViewMatrixLoc, modelViewMatrix) {
  createCube(black);
  createBuffer();
  var instanceMatrix = mult(
    modelViewMatrix,
    translate(armLegTranslate, 0.5 * footHeight, 0.0),
  );
  instanceMatrix = mult(
    instanceMatrix,
    scale(footWidht, footHeight, footWidht),
  );
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
  for (var i = 0; i < 6; i++)
    gl.drawArrays(gl.TRIANGLE_FAN, 4 * i, numPositions);
}
