var maxUpperLegPos = 250;
var maxLowerLegPos = 285;
var minUpperLegPos = 180;
var minLowerLegPos = 0;

var topologi = {
  torso: { x: 0, y: 0, z: 0 },
  head: { x: 0, y: 0, z: 0 },
  head1: { x: 0, y: 0, z: 0 },
  head2: { x: 0, y: 0, z: 0 },
  leftUpperArm: { x: 180, y: 0, z: 210 },
  leftLowerArm: { x: 20, y: 0, z: 90 },
  rightUpperArm: { x: 180, y: 180, z: 310 },
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
    // rotate(topologi.head1.x, vec3(1, 0, 0)),
    // rotate(topologi.head2.y, vec3(0, 1, 0)),
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
    rotate(topologi.leftLowerArm.z, vec3(0, 0, 1)),
  ]),
  rightLowerArm: multAll([
    translate(0, upperArmHeight, 0.0),
    rotate(topologi.rightLowerArm.x, vec3(1, 0, 0)),
    rotate(topologi.rightLowerArm.z, vec3(0, 0, 1)),
    rotate(topologi.rightLowerArm.y, vec3(1, 1, 0)),
  ]),
  rightHand: multAll([
    translate(0, handHeight * 1.8, 0.0),
    rotate(topologi.rightHand.x, vec3(1, 0, 0)),
  ]),
  leftHand: multAll([
    translate(0.0, handHeight * 1.8, 0.0),
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

function rightUpperArmMoves() {
  if (topologi.rightUpperArm.z >= 320) {
    dir = -1;
  } else if (topologi.rightUpperArm.z <= 290) {
    dir = 1;
  }

  if (dir == -1) {
    topologi.rightUpperArm.z -= 1.55;
  } else {
    topologi.rightUpperArm.z += 1.55;
  }

  moves.rightUpperArm = multAll([
    translate(
      torsoWidth + upperArmWidth - armLegTranslate,
      0.9 * torsoHeight,
      0.8,
    ),
    rotate(topologi.rightUpperArm.y, vec3(1, 1, 0)),
    rotate(topologi.rightUpperArm.z, vec3(0, 0, 1)),
  ]);
  initNodes(rightUpperArmId);
}

function leftArmMoves() {
  moves.leftUpperArm = multAll([
    translate(
      -(torsoWidth + upperArmWidth) + armLegTranslate,
      0.9 * torsoHeight,
      0.8,
    ),
    rotate(topologi.leftUpperArm.x, vec3(1, 1, 0)),
    rotateY(topologi.leftUpperArm.y),
    rotate(topologi.leftUpperArm.z, vec3(0, 0, 1)),
  ]);
  initNodes(leftUpperArmId);
}

// function rightLowerArmMoves() {
//   if (topologi.rightLowerArm.z >= 345) {
//     dir = -1;
//   } else if (topologi.rightLowerArm.z <= 330) {
//     dir = 1;
//   }

//   if (dir == -1) {
//     topologi.rightLowerArm.z -= 0.9;
//   } else {
//     topologi.rightLowerArm.z += 0.9;
//   }

//   moves.rightLowerArm = multAll([
//     translate(0, upperArmHeight, 0.0),
//     rotate(topologi.rightLowerArm.x, vec3(1, 0, 0)),
//     rotate(topologi.rightLowerArm.z, vec3(0, 0, 1)),
//   ]);
//   initNodes(rightLowerArmId);
// }

var torsoMove = 0;
var torsodir = 1;
function torsoRotae() {
  if (torsoMove >= 15) {
    torsodir = -1;
  } else if (torsoMove <= 0) {
    torsodir = 1;
  }

  torsodir == 1 ? (torsoMove += 0.1) : (torsoMove -= 0.1);
  // topologi.torso.y += 1;
  moves.torso = multAll([
    translate(0, 0, torsoMove),
    rotate(topologi.torso.y, vec3(0, 1, 0)),
  ]);
  initNodes(torsoId);
}

var ballmoveY = -5;
var balldirZ = 1;
var ballmoveZ = 1.3;
var balldir = 1;

function ballMove() {
  if (ballmoveY >= -5) {
    balldir = -1;
  } else if (ballmoveY <= -11) {
    balldir = 1;
  }
  if (ballmoveZ >= 15) {
    balldirZ = -1;
  } else if (ballmoveZ <= 1.3) {
    balldirZ = 1;
  }
  balldir == 1 ? (ballmoveY += 0.32) : (ballmoveY -= 0.32);
  balldirZ == 1 ? (ballmoveZ += 0.1) : (ballmoveZ -= 0.1);

  topologi.ball.x += 4;
  moves.ball = multAll([
    translate(4, ballmoveY, 1.3),
    rotate(topologi.ball.x, vec3(1, 0, 0)),
    rotate(topologi.ball.z, vec3(0, 0, 1)),
  ]);
  initNodes(ballId);
}

var legindex = 0;
var legtrans = 0;

var changeLeg = 0;
var direction = 1; // 1 for increasing, -1 for decreasing

function moveLeg() {
  if (changeLeg === 0) {
    topologi.leftUpperLeg.x += direction * 6;
    topologi.leftLowerLeg.x -= direction * 6;

    if (topologi.leftUpperLeg.x >= maxUpperLegPos && direction === 1) {
      direction = -1; // Start decreasing
    } else if (topologi.leftUpperLeg.x <= minUpperLegPos && direction === -1) {
      direction = 1; // Start increasing the other leg
      changeLeg = 1;
    }

    moves.leftUpperLeg = multAll([
      translate(
        -(torsoWidth + upperLegWidth) + armLegTranslate,
        0.1 * upperLegHeight,
        0.0 + legtrans,
      ),
      rotate(topologi.leftUpperLeg.x, vec3(1, 0, 0)),
    ]);
    moves.leftLowerLeg = multAll([
      translate(0.0, upperLegHeight, 0.0),
      rotate(topologi.leftLowerLeg.x, vec3(1, 0, 0)),
    ]);
  } else if (changeLeg === 1) {
    topologi.rightUpperLeg.x += direction * 6;
    topologi.rightLowerLeg.x -= direction * 6;

    if (topologi.rightUpperLeg.x >= maxUpperLegPos && direction === 1) {
      direction = -1; // Start decreasing
    } else if (topologi.rightUpperLeg.x <= minUpperLegPos && direction === -1) {
      direction = 1; // Start increasing the other leg
      changeLeg = 0;
    }

    moves.rightUpperLeg = multAll([
      translate(
        torsoWidth + upperLegWidth - armLegTranslate,
        0.1 * upperLegHeight,
        0.0,
      ),
      rotate(topologi.rightUpperLeg.x, vec3(1, 0, 0)),
    ]);
    moves.rightLowerLeg = multAll([
      translate(0.0, upperLegHeight, 0.0),
      rotate(topologi.rightLowerLeg.x, vec3(1, 0, 0)),
    ]);
  }
  initNodes(leftUpperLegId);
  initNodes(leftLowerLegId);
  initNodes(rightUpperLegId);
  initNodes(rightLowerLegId);
}
