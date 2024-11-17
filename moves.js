var topologi = {
  torso: { x: 0, y: 0, z: 0 },
  head: { x: 0, y: 0, z: 0 },
  head1: { x: 0, y: 0, z: 0 },
  head2: { x: 0, y: 0, z: 0 },
  leftUpperArm: { x: 300, y: 0, z: 0 },
  leftLowerArm: { x: 0, y: 0, z: 0 },
  rightUpperArm: { x: 180, y: 180, z: 315 },
  rightLowerArm: { x: 0, y: 0, z: 0 },
  leftUpperLeg: { x: 180, y: 0, z: 0 },
  leftLowerLeg: { x: 0, y: 0, z: 0 },
  rightUpperLeg: { x: 180, y: 0, z: 0 },
  rightLowerLeg: { x: 0, y: 0, z: 0 },
  rightHand: { x: 0, y: 0, z: 0 },
  leftHand: { x: 0, y: 0, z: 0 },
  leftFoot: { x: 0, y: 0, z: 0 },
  rightFoot: { x: 0, y: 0, z: 0 },
  ball: { x: 0, y: 0, z: 0 },
};

function multAll(m) {
  var result = mat4();
  for (let i = 0; i < m.length; i++) {
    result = mult(result, m[i]);
  }
  return result;
}

var moves = {
  torso: multAll([rotate(topologi.torso.y, vec3(0, 1, 0))]),
  head: multAll([
    translate(0.0, torsoHeight + 0.5 * headHeight, 0.0),
    rotate(topologi.head1.x, vec3(1, 0, 0)),
    rotate(topologi.head2.y, vec3(0, 1, 0)),
    translate(0.0, -0.5 * headHeight, 0.0),
  ]),
  leftUpperArm: multAll([
    translate(
      -(torsoWidth + upperArmWidth) + armLegTranslate,
      0.9 * torsoHeight,
      0.0,
    ),
    rotate(topologi.leftUpperArm.x, vec3(1, 0, 0)),
    rotateY(topologi.leftUpperArm.y),
  ]),
  rightUpperArm: multAll([
    translate(
      torsoWidth + upperArmWidth - armLegTranslate,
      0.9 * torsoHeight,
      0.0,
    ),
    rotate(topologi.rightUpperArm.x, vec3(1, 1, 0)),
    rotate(topologi.rightUpperArm.z, vec3(0, 0, 1)),
  ]),
  leftUpperLeg: multAll([
    translate(
      -(torsoWidth + upperLegWidth) + armLegTranslate,
      0.1 * upperLegHeight,
      0.0,
    ),
    rotate(topologi.leftUpperLeg.x, vec3(1, 0, 0)),
  ]),
  rightUpperLeg: multAll([
    translate(
      torsoWidth + upperLegWidth - armLegTranslate,
      0.1 * upperLegHeight,
      0.0,
    ),
    rotate(topologi.rightUpperLeg.x, vec3(1, 0, 0)),
  ]),
  leftLowerArm: multAll([
    translate(0, upperArmHeight, 0.0),
    rotate(topologi.leftLowerArm.x, vec3(1, 0, 0)),
  ]),
  rightLowerArm: multAll([
    translate(0, upperArmHeight, 0.0),
    rotate(topologi.rightLowerArm.x, vec3(1, 0, 0)),
  ]),
  rightHand: multAll([
    translate(0.0, handHeight, 0.0),
    rotate(topologi.rightHand.x, vec3(1, 0, 0)),
  ]),
  leftHand: multAll([
    translate(0.0, handHeight, 0.0),
    rotate(topologi.leftHand.x, vec3(1, 0, 0)),
  ]),
  ball: multAll([
    translate(0.0, ballHeight, 0.0),
    rotate(topologi.ball.x, vec3(1, 0, 0)),
  ]),
  rightFoot: multAll([
    translate(0.0, footHeight, 0.0),
    rotate(topologi.rightFoot.x, vec3(1, 0, 0)),
  ]),
  leftFoot: multAll([
    translate(0.0, footHeight, 0.0),
    rotate(topologi.leftFoot.x, vec3(1, 0, 0)),
  ]),
  leftLowerLeg: multAll([
    translate(0.0, upperLegHeight, 0.0),
    rotate(topologi.leftLowerLeg.x, vec3(1, 0, 0)),
  ]),
  rightLowerLeg: multAll([
    translate(0.0, upperLegHeight, 0.0),
    rotate(topologi.rightLowerLeg.x, vec3(1, 0, 0)),
  ]),
};
var dir = 1;

function rightArmRotate() {
  if (topologi.rightUpperArm.z >= 315) {
    dir = -1;
  } else if (topologi.rightUpperArm.z <= 300) {
    dir = 1;
  }

  if (dir == -1) {
    topologi.rightUpperArm.z -= 1.2;
  } else {
    topologi.rightUpperArm.z += 1.2;
  }

  moves.rightUpperArm = multAll([
    translate(
      torsoWidth + upperArmWidth - armLegTranslate,
      0.9 * torsoHeight,
      0.0,
    ),
    rotate(topologi.rightUpperArm.y, vec3(1, 1, 0)),
    rotate(topologi.rightUpperArm.z, vec3(0, 0, 1)),
  ]);
  initNodes(rightUpperArmId);
}
function torsoRotae() {
  topologi.torso.y += 5;
  moves.torso = multAll([rotate(topologi.torso.y, vec3(0, 1, 0))]);
  // initNodes(torsoId);
}

var ballmoveY = -0.5;
var balldir = 1;

function ballMove() {
  if (ballmoveY >= -0.5) {
    balldir = -1;
  } else if (ballmoveY <= -3) {
    balldir = 1;
  }

  balldir == 1 ? (ballmoveY += 0.2) : (ballmoveY -= 0.2);

  topologi.ball.x += 4;
  topologi.ball.y += 4;
  moves.ball = multAll([
    translate(4.7, ballmoveY, 0),
    // rotate(topologi.ball.x, vec3(1, 1, 0)),
    rotate(topologi.ball.x, vec3(1, 0, 1)),
  ]);
  initNodes(ballId);
}
