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
  switch (Id) {
    case torsoId:
      figure[torsoId] = createNode(moves.torso, torso, null, headId);
      break;

    case headId:
      figure[headId] = createNode(moves.head, head, leftUpperArmId, null);
      break;

    case leftUpperArmId:
      figure[leftUpperArmId] = createNode(
        moves.leftUpperArm,
        leftUpperArm,
        rightUpperArmId,
        leftLowerArmId,
      );
      break;

    case rightUpperArmId:
      figure[rightUpperArmId] = createNode(
        moves.rightUpperArm,
        rightUpperArm,
        leftUpperLegId,
        rightLowerArmId,
      );
      break;

    case leftUpperLegId:
      figure[leftUpperLegId] = createNode(
        moves.leftUpperLeg,
        leftUpperLeg,
        rightUpperLegId,
        leftLowerLegId,
      );
      break;

    case rightUpperLegId:
      figure[rightUpperLegId] = createNode(
        moves.rightUpperLeg,
        rightUpperLeg,
        null,
        rightLowerLegId,
      );
      break;

    case leftLowerArmId:
      figure[leftLowerArmId] = createNode(
        moves.leftLowerArm,
        leftLowerArm,
        null,
        leftHandId,
      );
      break;

    case rightLowerArmId:
      figure[rightLowerArmId] = createNode(
        moves.rightLowerArm,
        rightLowerArm,
        null,
        rightHandId,
      );
      break;

    case rightHandId:
      figure[rightHandId] = createNode(moves.rightHand, rightHand, null, null);
      break;

    case leftHandId:
      figure[leftHandId] = createNode(moves.leftHand, leftHand, null, null);
      break;

    case ballId:
      figure[ballId] = createNode(moves.ball, ballNode, null, null);
      break;

    case rightFootId:
      figure[rightFootId] = createNode(moves.rightFoot, rightFoot, null, null);
      break;

    case leftFootId:
      figure[leftFootId] = createNode(moves.leftFoot, leftFoot, null, null);
      break;

    case leftLowerLegId:
      figure[leftLowerLegId] = createNode(
        moves.leftLowerLeg,
        leftLowerLeg,
        null,
        leftFootId,
      );
      break;

    case rightLowerLegId:
      figure[rightLowerLegId] = createNode(
        moves.rightLowerLeg,
        rightLowerLeg,
        null,
        rightFootId,
      );
      break;
  }
}
