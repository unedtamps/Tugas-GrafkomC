var torsoId = 0;
var headId = 1;
var head1Id = 1;
var head2Id = 10;
var leftUpperArmId = 2;
var leftLowerArmId = 3;
var rightUpperArmId = 4;
var rightLowerArmId = 5;
var leftUpperLegId = 6;
var leftLowerLegId = 7;
var rightUpperLegId = 8;
var rightLowerLegId = 9;
var rightHandId = 11;
var leftHandId = 12;
var leftFootId = 13;
var rightFootId = 14;
var ballId = 15;

var theta = [0, 0, 0, 0, 0, 0, 180, 0, 180, 0, 0, 0, 0, 0, 0, 0];

function createNode(transform, render, sibling, child) {
  var node = {
    transform: transform,
    render: render,
    sibling: sibling,
    child: child,
  };
  return node;
}

function initNodes(Id) {
  var m = mat4();

  switch (Id) {
    case torsoId:
      m = rotate(theta[torsoId], vec3(0, 1, 0));
      figure[torsoId] = createNode(m, torso, null, headId);
      break;

    case headId:
    case head1Id:
    case head2Id:
      m = translate(0.0, torsoHeight + 0.5 * headHeight, 0.0);
      m = mult(m, rotate(theta[head1Id], vec3(1, 0, 0)));
      m = mult(m, rotate(theta[head2Id], vec3(0, 1, 0)));
      m = mult(m, translate(0.0, -0.5 * headHeight, 0.0));
      figure[headId] = createNode(m, head, leftUpperArmId, null);
      break;

    case leftUpperArmId:
      m = translate(-(torsoWidth + upperArmWidth), 0.9 * torsoHeight, 0.0);
      // m = mult(m, rotate(theta[leftUpperArmId], vec3(1, 0, 0)));
      figure[leftUpperArmId] = createNode(
        m,
        leftUpperArm,
        rightUpperArmId,
        leftLowerArmId,
      );
      break;

    case rightUpperArmId:
      let toOrigin = translate(
        torsoWidth + upperArmWidth - 1.55,
        1 * torsoHeight,
        0.0,
      );
      let rotates = rotate(theta[rightUpperArmId], vec3(1, 1, 0));
      // let backtoOrigin = translate(
      //   -(torsoWidth + upperArmWidth),
      //   -0.9 * torsoHeight,
      //   0.0,
      // );
      m = mult(toOrigin, rotates);

      figure[rightUpperArmId] = createNode(
        m,
        rightUpperArm,
        leftUpperLegId,
        rightLowerArmId,
      );
      break;

    case leftUpperLegId:
      m = translate(-(torsoWidth + upperLegWidth), 0.1 * upperLegHeight, 0.0);
      m = mult(m, rotate(theta[leftUpperLegId], vec3(1, 0, 0)));
      figure[leftUpperLegId] = createNode(
        m,
        leftUpperLeg,
        rightUpperLegId,
        leftLowerLegId,
      );
      break;

    case rightUpperLegId:
      m = translate(torsoWidth + upperLegWidth, 0.1 * upperLegHeight, 0.0);
      m = mult(m, rotate(theta[rightUpperLegId], vec3(1, 0, 0)));
      figure[rightUpperLegId] = createNode(
        m,
        rightUpperLeg,
        null,
        rightLowerLegId,
      );
      break;

    case leftLowerArmId:
      m = translate(0.0, upperArmHeight, 0.0);
      m = mult(m, rotate(theta[leftLowerArmId], vec3(1, 0, 0)));
      figure[leftLowerArmId] = createNode(m, leftLowerArm, null, leftHandId);
      break;

    case rightLowerArmId:
      m = translate(1.55, upperArmHeight, 0.0);
      m = mult(m, rotate(theta[rightLowerArmId], vec3(1, 0, 0)));
      figure[rightLowerArmId] = createNode(m, rightLowerArm, null, rightHandId);
      break;

    case rightHandId:
      m = translate(0.0, handHeight, 0.0);
      m = mult(m, rotate(theta[rightHandId], vec3(1, 0, 0)));
      figure[rightHandId] = createNode(m, rightHand, null, ballId);
      break;

    case leftHandId:
      m = translate(0.0, handHeight, 0.0);
      m = mult(m, rotate(theta[leftHandId], vec3(1, 0, 0)));
      figure[leftHandId] = createNode(m, leftHand, null, null);
      break;

    case ballId:
      m = translate(0.0, ballHeight, 0.0);
      m = mult(m, rotate(theta[ballId], vec3(1, 0, 0)));
      figure[ballId] = createNode(m, ballNode, null, null);
      break;

    case rightFootId:
      m = translate(0.0, footHeight, 0.0);
      m = mult(m, rotate(theta[rightFootId], vec3(1, 0, 0)));
      figure[rightFootId] = createNode(m, rightFoot, null, null);
      break;

    case leftFootId:
      m = translate(0.0, footHeight, 0.0);
      m = mult(m, rotate(theta[leftFootId], vec3(1, 0, 0)));
      figure[leftFootId] = createNode(m, leftFoot, null, null);
      break;

    case leftLowerLegId:
      m = translate(0.0, upperLegHeight, 0.0);
      m = mult(m, rotate(theta[leftLowerLegId], vec3(1, 0, 0)));
      figure[leftLowerLegId] = createNode(m, leftLowerLeg, null, leftFootId);
      break;

    case rightLowerLegId:
      m = translate(0.0, upperLegHeight, 0.0);
      m = mult(m, rotate(theta[rightLowerLegId], vec3(1, 0, 0)));
      figure[rightLowerLegId] = createNode(m, rightLowerLeg, null, rightFootId);
      break;
  }
}
