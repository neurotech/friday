const crelns = require("crelns");
const svg = crelns.bind(null, "http://www.w3.org/2000/svg");

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function getStop(colour) {
  return [
    svg("stop", { offset: "40%", "stop-color": "rgb(0,0,0)" }),
    svg("stop", { offset: "90%", "stop-color": `${colour}` }),
    svg("stop", { offset: "95%", "stop-color": `${colour}` }),
    svg("stop", { offset: "100%", "stop-color": "rgb(255,255,255)" })
  ];
}

function getAnimate(id, speed) {
  var delay = getRandomFloat(0.5, 3.5);

  return svg("animate", {
    attributeType: "XML",
    attributeName: "x",
    from: "0",
    to: "750",
    begin: `${delay}s`,
    dur: `${speed}s`,
    repeatCount: "indefinite",
    id: `rect-${id}`
  });
}

function getGradient(id, colour) {
  return svg("linearGradient", { id: `gradient-${id}`, x1: "0%", y1: "0%", x2: "100%", y2: "0%" }, getStop(colour));
}

function getRect(id, speed) {
  var verticalPosition = getRandomInt(10, 70);

  return svg(
    "rect",
    {
      x: "-40",
      y: verticalPosition,
      width: (1 / speed) * 50,
      height: 1,
      fill: `url('#gradient-${id}')`
    },
    getAnimate(id, speed)
  );
}

module.exports = function createStars() {
  var gradients = [];
  var rects = [];
  var count = getRandomInt(10, 33);
  var speeds = ["slow", "medium", "fast"];
  const palette = [
    "rgb(80, 119, 243)",
    "rgb(60, 96, 209)",
    "rgb(255, 0, 139)",
    "rgb(250, 20, 89)",
    "rgb(255, 240, 33)",
    "rgb(255, 149, 61)",
    "rgb(43, 255, 191)",
    "rgb(0, 184, 148)",
    "rgb(162, 155, 254)",
    "rgb(108, 92, 231)"
  ];

  for (var i = 1; i < count; i++) {
    var speed = speeds[Math.floor(Math.random() * speeds.length)];
    var speedNumber = 1;

    if (speed === "slow") {
      speedNumber = getRandomFloat(7, 9);
    }
    if (speed === "medium") {
      speedNumber = getRandomFloat(3, 6.5);
    }
    if (speed === "fast") {
      speedNumber = getRandomFloat(1.5, 2.5);
    }

    gradients.push(getGradient(i, palette[Math.floor(Math.random() * palette.length)]));

    rects.push(getRect(i, speedNumber));
  }

  var stars = svg("svg", { class: "pocket-dimension-stars" }, svg("defs", gradients), rects);

  return stars;
};
