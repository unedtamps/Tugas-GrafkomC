var red = vec4(1, 0, 0, 1);
var green = vec4(0, 1, 0, 1);
var black = vec4(0, 0, 0, 1);
var pointsArray = [];
var colors = [];

function createCube() {
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
  quad(1, 0, 3, 2, vertices);
  quad(2, 3, 7, 6, vertices);
  quad(3, 0, 4, 7, vertices);
  quad(6, 5, 1, 2, vertices);
  quad(4, 5, 6, 7, vertices);
  quad(5, 4, 0, 1, vertices);
}

function quad(a, b, c, d, vertices) {
  pointsArray.push(vertices[a]);
  colors.push(black);
  pointsArray.push(vertices[b]);
  colors.push(black);
  pointsArray.push(vertices[c]);
  colors.push(black);
  pointsArray.push(vertices[d]);
  colors.push(black);
}

function createCylinder(col) {
  pointsArray = [];
  colors = [];
  var CYLINDER_DIV = 40; // Lower divisions to make debugging easier
  var i, ai, si, ci;
  var vertices = [],
    indices = [];

  var height = 1.0; // Height of the cylinder
  var radius = 1.0; // Radius of the cylinder

  // Top circle center (north pole equivalent)
  vertices.push(vec4(0, height / 2, 0, 1.0)); // Top center vertex

  // Generate vertices for the top circle
  for (i = 0; i <= CYLINDER_DIV; i++) {
    ai = (i * 2 * Math.PI) / CYLINDER_DIV;
    si = Math.sin(ai);
    ci = Math.cos(ai);
    vertices.push(vec4(radius * ci, height / 2, radius * si, 1.0));
  }

  // Bottom circle center (south pole equivalent)
  vertices.push(vec4(0, -height / 2, 0, 1.0)); // Bottom center vertex

  // Generate vertices for the bottom circle
  for (i = 0; i <= CYLINDER_DIV; i++) {
    ai = (i * 2 * Math.PI) / CYLINDER_DIV;
    si = Math.sin(ai);
    ci = Math.cos(ai);
    vertices.push(vec4(radius * ci, -height / 2, radius * si, 1.0));
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
  }

  // Bottom circle indices (fan from bottom center)
  var bottomCenterIndex = bottomCircleOffset - 1;
  for (i = bottomCircleOffset; i < vertices.length - 1; i++) {
    indices.push(bottomCenterIndex, i, i + 1); // Connect bottom center to bottom circle vertices
  }

  // Optional color generation logic
  //
  // var vertexColors = [
  //   vec4(0.0, 0.0, 0.0, 1.0), // black
  //   vec4(1.0, 0.0, 0.0, 1.0), // red
  //   vec4(1.0, 1.0, 0.0, 1.0), // yellow
  //   vec4(0.0, 1.0, 0.0, 1.0), // green
  //   vec4(0.0, 0.0, 1.0, 1.0), // blue
  //   vec4(0.5, 0.0, 0.0, 1.0), // dark red
  //   vec4(1.0, 0.0, 1.0, 1.0), // magenta
  //   vec4(0.0, 1.0, 1.0, 1.0), // cyan
  //   vec4(0.5, 1.0, 1.0, 1.0), // white
  //   vec4(0.5, 0.5, 0.0, 1.0), // olive
  //   vec4(0.0, 0.5, 0.0, 1.0), // dark green
  //   vec4(0.0, 0.0, 0.5, 1.0), // dark blue
  //   vec4(0.5, 0.0, 0.5, 1.0), // purple
  //   vec4(0.0, 0.5, 0.5, 1.0), // teal
  //   vec4(0.5, 0.5, 0.5, 1.0), // gray
  //   vec4(1.0, 0.5, 0.0, 1.0), // orange
  //   vec4(0.5, 1.0, 0.0, 1.0), // lime
  //   vec4(0.0, 1.0, 0.5, 1.0), // aqua
  //   vec4(1.0, 0.0, 0.5, 1.0), // pink
  //   vec4(0.5, 0.0, 1.0, 1.0), // violet
  // ];

  // vertexColors = vertexColors
  //   .map((value) => ({ value, sort: Math.random() }))
  //   .sort((a, b) => a.sort - b.sort)
  //   .map(({ value }) => value);

  for (let i = 0; i < indices.length; i++) {
    const index = indices[i];
    pointsArray.push(vertices[index]);
    colors.push(col);
  }
}

function createSphere(col) {
  pointsArray = [];
  colors = [];
  var SPHERE_DIV = 40; // Lower divisions to make debugging easier
  var i, ai, si, ci;
  var j, aj, sj, cj;
  var p1, p2;
  var vertices = [],
    indices = [];

  var scale = 0.5; // Scaling factor

  // Add north pole
  vertices.push(vec4(0, scale * 1, 0, 1.0)); // Scale the y-coordinate

  // Generate vertices for the sphere body
  for (j = 1; j < SPHERE_DIV; j++) {
    aj = (j * Math.PI) / SPHERE_DIV;
    sj = Math.sin(aj);
    cj = Math.cos(aj);
    for (i = 0; i <= SPHERE_DIV; i++) {
      ai = (i * 2 * Math.PI) / SPHERE_DIV;
      si = Math.sin(ai);
      ci = Math.cos(ai);
      vertices.push(vec4(scale * si * sj, scale * cj, scale * ci * sj, 1.0)); // Scale all coordinates
    }
  }

  // // Add south pole
  vertices.push(vec4(0, scale * -1, 0, 1.0)); // Scale the y-coordinate

  // Top hemisphere (north pole)
  for (i = 0; i < SPHERE_DIV; i++) {
    indices.push(0, i + 1, i + 2); // Connect north pole to first row
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
    indices.push(southPoleIndex, lastRowOffset + i, lastRowOffset + i + 1); // Connect last row to south pole
  }

  var vertexColors = [
    vec4(0.0, 0.0, 0.0, 1.0), // black
    vec4(1.0, 0.0, 0.0, 1.0), // red
    vec4(1.0, 1.0, 0.0, 1.0), // yellow
    vec4(0.0, 1.0, 0.0, 1.0), // green
    vec4(0.0, 0.0, 1.0, 1.0), // blue
    vec4(0.5, 0.0, 0.0, 1.0), // dark red
    vec4(1.0, 0.0, 1.0, 1.0), // magenta
    vec4(0.0, 1.0, 1.0, 1.0), // cyan
    vec4(0.5, 0.5, 0.0, 1.0), // olive
    vec4(0.0, 0.5, 0.0, 1.0), // dark green
    vec4(0.0, 0.0, 0.5, 1.0), // dark blue
    vec4(0.5, 0.0, 0.5, 1.0), // purple
    vec4(0.0, 0.5, 0.5, 1.0), // teal
    vec4(0.5, 0.5, 0.5, 1.0), // gray
    vec4(1.0, 0.5, 0.0, 1.0), // orange
    vec4(0.5, 1.0, 0.0, 1.0), // lime
    vec4(0.0, 1.0, 0.5, 1.0), // aqua
    vec4(1.0, 0.0, 0.5, 1.0), // pink
    vec4(0.5, 0.0, 1.0, 1.0), // violet
  ];

  vertexColors = vertexColors
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  colors = [];
  const colorChangeInterval = indices.length / 2;

  for (let i = 0; i < indices.length; i++) {
    const index = indices[i];
    pointsArray.push(vertices[index]);
    // const colorIndex =
    //   Math.floor(i / colorChangeInterval) % vertexColors.length;
    colors.push(col);
  }
}
