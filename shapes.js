var red = vec4(1, 0, 0, 1);
var brown = vec4(1, 1, 1, 1);
var white = vec4(1, 1, 1, 1);
var black = vec4(0, 0, 0, 1);
var blue = vec4(0, 0, 1, 1);
var pointsArray = [];
var colors = [];
var texCoord = [vec2(0, 0), vec2(0, 1), vec2(1, 1), vec2(1, 0)];
var texCoordsArray = [vec2(0, 0)];
let normalsArray = [];

function createCube(col) {
  var vertices = [
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, -0.5, -0.5, 1.0),
    vec4(-0.5, 0.5, -0.5, 1.0),
    vec4(0.5, 0.5, -0.5, 1.0),
    vec4(0.5, -0.5, -0.5, 1.0),
  ];

  pointsArray = [];
  colors = [];
  texCoordsArray = [];
  normalsArray = [];
  quad(1, 0, 3, 2, vertices, col);
  quad(2, 3, 7, 6, vertices, col);
  quad(3, 0, 4, 7, vertices, col);
  quad(6, 5, 1, 2, vertices, col);
  quad(4, 5, 6, 7, vertices, col);
  quad(5, 4, 0, 1, vertices, col);
}

// function quad(a, b, c, d, vertices) {
//   pointsArray.push(vertices[a]);
//   colors.push(black);
//   texCoordsArray.push(texCoord[0]);

//   pointsArray.push(vertices[b]);
//   colors.push(black);
//   texCoordsArray.push(texCoord[1]);

//   pointsArray.push(vertices[c]);
//   colors.push(black);
//   texCoordsArray.push(texCoord[2]);

//   pointsArray.push(vertices[d]);
//   colors.push(black);
//   texCoordsArray.push(texCoord[0]);
// }
//

function quad(a, b, c, d, vertices, col) {
  var t1 = subtract(vertices[b], vertices[a]);
  var t2 = subtract(vertices[c], vertices[b]);
  var normal = cross(t1, t2);
  normal = vec3(normal);
  pointsArray.push(vertices[a]);
  colors.push(col);
  texCoordsArray.push(texCoord[0]);
  normalsArray.push(normal);
  pointsArray.push(vertices[b]);
  colors.push(col);
  texCoordsArray.push(texCoord[1]);
  normalsArray.push(normal);
  pointsArray.push(vertices[c]);
  colors.push(col);
  texCoordsArray.push(texCoord[2]);
  normalsArray.push(normal);
  pointsArray.push(vertices[d]);
  colors.push(col);
  normalsArray.push(normal);
  texCoordsArray.push(texCoord[3]);
}

// function quad(a, b, c, d, vertices, col) {
//   const indicies = [a, b, c, a, c, d];
//   var t1 = subtract(vertices[b], vertices[a]);
//   var t2 = subtract(vertices[c], vertices[b]);
//   var normal = cross(t1, t2);
//   normal = vec3(normal);
//   for (let i = 0; i < indicies.length; i++) {
//     pointsArray.push(vertices[indicies[i]]);
//     colors.push(col);
//     texCoordsArray.push(texCoord[i % 4]);
//     normalsArray.push(normal);
//   }
// }

// function quad(a, b, c, d, vertices, col) {
//   var t1 = subtract(vertices[b], vertices[a]);
//   var t2 = subtract(vertices[c], vertices[b]);
//   var normal = cross(t1, t2);
//   normal = vec3(normal);

//   pointsArray.push(vertices[a]);
//   colors.push(col);
//   texCoordsArray.push(texCoord[0]);
//   normalsArray.push(normal);

//   pointsArray.push(vertices[b]);
//   colors.push(col);
//   texCoordsArray.push(texCoord[1]);
//   normalsArray.push(normal);

//   pointsArray.push(vertices[c]);
//   colors.push(col);
//   texCoordsArray.push(texCoord[2]);
//   normalsArray.push(normal);

//   pointsArray.push(vertices[a]);
//   colors.push(col);
//   texCoordsArray.push(texCoord[3]);
//   normalsArray.push(normal);

//   pointsArray.push(vertices[c]);
//   colors.push(col);
//   texCoordsArray.push(texCoord[0]);
//   normalsArray.push(normal);

//   pointsArray.push(vertices[d]);
//   colors.push(col);
//   texCoordsArray.push(texCoord[1]);
//   normalsArray.push(normal);
// }

function createCylinder(col) {
  pointsArray = [];
  colors = [];
  normalsArray = [];
  var CYLINDER_DIV = 40; // Lower divisions to make debugging easier
  var i, ai, si, ci;
  var vertices = [],
    indices = [],
    normals = [];

  var height = 1.0; // Height of the cylinder
  var radius = 1.0; // Radius of the cylinder

  // Top circle center (north pole equivalent)
  vertices.push(vec4(0, height / 2, 0, 1.0)); // Top center vertex
  normals.push(vec4(0, 1, 0, 0)); // Normal for the top center

  // Generate vertices and normals for the top circle
  for (i = 0; i <= CYLINDER_DIV; i++) {
    ai = (i * 2 * Math.PI) / CYLINDER_DIV;
    si = Math.sin(ai);
    ci = Math.cos(ai);
    vertices.push(vec4(radius * ci, height / 2, radius * si, 1.0));
    normals.push(vec4(0, 1, 0, 0)); // Normal pointing up for top circle
  }

  // Bottom circle center (south pole equivalent)
  vertices.push(vec4(0, -height / 2, 0, 1.0)); // Bottom center vertex
  normals.push(vec4(0, -1, 0, 0)); // Normal for the bottom center

  // Generate vertices and normals for the bottom circle
  for (i = 0; i <= CYLINDER_DIV; i++) {
    ai = (i * 2 * Math.PI) / CYLINDER_DIV;
    si = Math.sin(ai);
    ci = Math.cos(ai);
    vertices.push(vec4(radius * ci, -height / 2, radius * si, 1.0));
    normals.push(vec4(0, -1, 0, 0)); // Normal pointing down for bottom circle
  }

  // Top circle indices (fan from top center)
  for (i = 1; i <= CYLINDER_DIV; i++) {
    indices.push(0, i, i + 1); // Connect top center to top circle vertices
  }

  // Body of the cylinder (connecting top and bottom circles)
  var bottomCircleOffset = CYLINDER_DIV + 2;
  for (i = 1; i <= CYLINDER_DIV; i++) {
    var p1 = i; // Top circle vertex
    var p2 = bottomCircleOffset + i; // Corresponding bottom circle vertex

    indices.push(p1, p2, p1 + 1);
    indices.push(p1 + 1, p2, p2 + 1);

    // Calculate and normalize side normals
    var sideNormalTop = normalize(
      vec4(vertices[p1][0], 0, vertices[p1][2], 0),
      false,
    );
    var sideNormalBottom = normalize(
      vec4(vertices[p2][0], 0, vertices[p2][2], 0),
      false,
    );

    normals[p1] = sideNormalTop;
    normals[p2] = sideNormalBottom;
  }

  // Bottom circle indices (fan from bottom center)
  var bottomCenterIndex = bottomCircleOffset - 1;
  for (i = bottomCircleOffset; i < vertices.length - 1; i++) {
    indices.push(bottomCenterIndex, i, i + 1); // Connect bottom center to bottom circle vertices
  }

  // Push vertices, colors, and normals to the arrays for rendering
  for (let i = 0; i < indices.length; i++) {
    const index = indices[i];
    pointsArray.push(vertices[index]);
    colors.push(col);
    normalsArray.push(normals[index]);
  }
}

function createSphere(col) {
  pointsArray = [];
  colors = [];
  normalsArray = [];
  var SPHERE_DIV = 40;
  var i, ai, si, ci;
  var j, aj, sj, cj;
  var p1, p2;
  var vertices = [],
    indices = [];

  var scale = 0.5;

  // Add north pole
  vertices.push(vec4(0, scale * 1, 0, 1.0));

  // Generate vertices for the sphere body
  for (j = 1; j < SPHERE_DIV; j++) {
    aj = (j * Math.PI) / SPHERE_DIV;
    sj = Math.sin(aj);
    cj = Math.cos(aj);
    for (i = 0; i <= SPHERE_DIV; i++) {
      ai = (i * 2 * Math.PI) / SPHERE_DIV;
      si = Math.sin(ai);
      ci = Math.cos(ai);
      vertices.push(vec4(scale * si * sj, scale * cj, scale * ci * sj, 1.0));
    }
  }

  // Add south pole
  vertices.push(vec4(0, scale * -1, 0, 1.0));

  // Top hemisphere (north pole)
  for (i = 0; i < SPHERE_DIV; i++) {
    indices.push(0, i + 1, i + 2);
  }

  // Body of the sphere
  for (j = 0; j < SPHERE_DIV - 2; j++) {
    for (i = 0; i < SPHERE_DIV; i++) {
      p1 = j * (SPHERE_DIV + 1) + i + 1;
      p2 = p1 + (SPHERE_DIV + 1);
      indices.push(p1, p2, p1 + 1);
      indices.push(p1 + 1, p2, p2 + 1);
    }
  }

  // Bottom hemisphere (south pole)
  var lastRowOffset = (SPHERE_DIV - 2) * (SPHERE_DIV + 1) + 1;
  var southPoleIndex = vertices.length - 1;
  for (i = 0; i < SPHERE_DIV; i++) {
    indices.push(southPoleIndex, lastRowOffset + i, lastRowOffset + i + 1);
  }

  for (let i = 0; i < indices.length; i++) {
    const index = indices[i];
    pointsArray.push(vertices[index]);
    colors.push(col);

    // Calculate the normal as the normalized position vector (excluding w component)
    const normal = normalize(
      vec3(vertices[index][0], vertices[index][1], vertices[index][2]),
    );
    normalsArray.push(normal);
  }
}
