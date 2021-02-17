let allStars = [
  "LeBron James",
  "Giannis Antetokounmpo",
  "Kevin Durant",
  "Stephen Curry",
  "Kyrie Irving",
  "Joel Embiid",
  "Kawhi Leonard",
  "Paul George",
  "James Harden",
  "Kemba Walker",
  "Khris Middleton",
  "Anthony Davis",
  "Nikola Jokic",
  "Klay Thompson",
  "Ben Simmons",
  "Damian Lillard",
  "Blake Griffin",
  "Russell Westbrook",
  "D'Angelo Russell",
  "LaMarcus Aldridge",
  "Nikola Vucevic",
  "Karl-Anthony Towns",
  "Kyle Lowry",
  "Bradley Beal",
  "Dwyane Wade",
  "Dirk Nowitzki",
];

let firstHalf = [
  "ATL",
  "BOS",
  "BRK",
  "CHI",
  "CHO",
  "CLE",
  "DAL",
  "DEN",
  "DET",
  "GSW",
  "HOU",
  "IND",
  "LAC",
  "LAL",
  "MEM"
];

let secondHalf = [
  "MIA",
  "MIL",
  "MIN",
  "NOP",
  "NYK",
  "OKC",
  "ORL",
  "PHI",
  "PHO",
  "POR",
  "SAC",
  "SAS",
  "TOR",
  "UTA",
  "WAS"
];

// let leftSideCss =
//   let rightSideCss = "<div id='positioner'><div id='profile'> <center><h2>"
//     let leftSideCssAllStar =
//     let rightSideCssAllStar = "<div id='positioner-all-star'><div id='profile-all-star'> <center><h2 id='all-star-name'>"

Array.prototype.getUnique = function () {
  var o = {},
    a = [],
    i,
    e;
  for (i = 0; (e = this[i]); i++) {
    o[e] = 1;
  }
  for (e in o) {
    a.push(e);
  }
  return a;
};

let currFGper, curr3Pper, currFTper;

// fetch("data/nba.json")
fetch("data/statistics.json")
  .then((res) => res.json())
  .then((json) => {
     let diameter = window.innerWidth;
     let width = 946;
     let heightRatio = (946 / window.innerHeight);
     let height = window.innerHeight * heightRatio;
     console.log(window.innerHeight, window.innerWidth);
     if (window.innerHeight >= 946) {
        console.log("checking")
        height = window.innerHeight
     }
    // let diameter = window.innerWidth;
    // let width = diameter;
    // let height = window.innerHeight;
    // console.log(window.innerWidth, window.innerHeight);

    // let margin = { top: 220, right: 120, bottom: 220, left: 120 };
    // width = width,
    // height = height;

    let i = 0,
      duration = 300,
      root;

    ///

    //
    let twentyNineTeen = json;

    //DISTANCE BETWEN CLUSTERS
    let tree = d3.layout
      .tree()
      .size([360, diameter / 2 - 80])
      .separation(function (a, b) {
        return (a.parent === b.parent ? 1.5 : 2.7) / a.depth;
      });

    let diagonal = d3.svg.diagonal.radial().projection(function (d) {
      return [d.y, (d.x / 180) * Math.PI];
    });

    let svg = d3
      .select("body")
      .append("svg")
      .attr("class", "radial-tree")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    // .on('mouseover', function(d, i){
    //     tip.show(d,i);
    // });
    root = twentyNineTeen;
    root.x0 = 0;
    root.y0 = 0;

    var tip = d3.tip().attr("class", "d3-tip");
    tip
      .offset(function (d) {
        //   console.log('x', d.x);
        //   console.log('y', d.y);
        //   return [0,0]
        return [-d.x, -d.x];
      })
      .html(function (d) {
        if (d.name.length > 3) {
          d["FG%"]
            ? (currFGper = (100 * parseFloat(d["FG%"])).toFixed(2))
            : (currFGper = 0.0);
          d["FT%"]
            ? (currFTper = (100 * parseFloat(d["FT%"])).toFixed(2))
            : (currFTper = 0.0);
          d["3P%"]
            ? (curr3Pper = (100 * parseFloat(d["3P%"])).toFixed(2))
            : (curr3Pper = 0.0);
          if (allStars.includes(d.name)) {
            if (firstHalf.includes(d.Tm)) {
              return (
                "<div id='positioner-all-star-left'><div id=all-star-wrapper-left><div id='profile-all-star'> <center><h2 id='all-star-name'>" +
                d.name +
                "</h2></center>" +
                d.img +
                "<div id='stats-all-star'>" +
                "<div id='stats-left-all-star'>" +
                "<div>" +
                "PTS - " +
                d.PTS +
                "</div>" +
                "<div>" +
                "REB - " +
                d.TRB +
                "</div>" +
                "<div>" +
                "AST - " +
                d.AST +
                "</div>" +
                "<div>" +
                "STL - " +
                d.STL +
                "</div>" +
                "<div>" +
                "BLK - " +
                d.BLK +
                "</div>" +
                "<div>" +
                "TOV - " +
                d.TOV +
                "</div>" +
                "</div>" +
                "<div id='stats-right-all-star'>" +
                "<div>" +
                "FG% - " +
                currFGper +
                "</div>" +
                "<div>" +
                "3P% - " +
                curr3Pper +
                "</div>" +
                "<div>" +
                "FT% - " +
                currFTper +
                "</div>" +
                "<div>" +
                "GP  - " +
                d.G +
                "</div>" +
                "<div>" +
                "MIN - " +
                d.MP +
                "</div>" +
                "<div>" +
                "AGE - " +
                d.Age +
                "</div>" +
                "</div>" +
                "</div>"+
                "</div>"
              );
            }
            else {
              return (
                "<div id='positioner-all-star-right'><div id=all-star-wrapper-right><div id='profile-all-star'> <center><h2 id='all-star-name'>" +
                d.name +
                "</h2></center>" +
                d.img +
                "<div id='stats-all-star'>" +
                "<div id='stats-left-all-star'>" +
                "<div>" +
                "PTS - " +
                d.PTS +
                "</div>" +
                "<div>" +
                "REB - " +
                d.TRB +
                "</div>" +
                "<div>" +
                "AST - " +
                d.AST +
                "</div>" +
                "<div>" +
                "STL - " +
                d.STL +
                "</div>" +
                "<div>" +
                "BLK - " +
                d.BLK +
                "</div>" +
                "<div>" +
                "TOV - " +
                d.TOV +
                "</div>" +
                "</div>" +
                "<div id='stats-right-all-star'>" +
                "<div>" +
                "FG% - " +
                currFGper +
                "</div>" +
                "<div>" +
                "3P% - " +
                curr3Pper +
                "</div>" +
                "<div>" +
                "FT% - " +
                currFTper +
                "</div>" +
                "<div>" +
                "GP  - " +
                d.G +
                "</div>" +
                "<div>" +
                "MIN - " +
                d.MP +
                "</div>" +
                "<div>" +
                "AGE - " +
                d.Age +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>"
              )
            }
          } else {
            if (firstHalf.includes(d.Tm)) {
            return (
              "<div id='positioner-left'><div id='profile'> <center><h2>" +
              d.name +
              "</h2></center>" +
              d.img +
              "<div id='stats'>" +
              "<div id='stats-left'>" +
              "<div>" +
              "PTS - " +
              d.PTS +
              "</div>" +
              "<div>" +
              "REB - " +
              d.TRB +
              "</div>" +
              "<div>" +
              "AST - " +
              d.AST +
              "</div>" +
              "<div>" +
              "STL - " +
              d.STL +
              "</div>" +
              "<div>" +
              "BLK - " +
              d.BLK +
              "</div>" +
              "<div>" +
              "TOV - " +
              d.TOV +
              "</div>" +
              "</div>" +
              "<div id='stats-right'>" +
              "<div>" +
              "FG% - " +
              currFGper +
              "</div>" +
              "<div>" +
              "3P% - " +
              curr3Pper +
              "</div>" +
              "<div>" +
              "FT% - " +
              currFTper +
              "</div>" +
              "<div>" +
              "GP  - " +
              d.G +
              "</div>" +
              "<div>" +
              "MIN - " +
              d.MP +
              "</div>" +
              "<div>" +
              "AGE - " +
              d.Age +
              "</div>" +
              "</div>" +
              "</div>"
            );
            }
            else{
              return (
                "<div id='positioner-right'><div id='profile'> <center><h2>" +
                d.name +
                "</h2></center>" +
                d.img +
                "<div id='stats'>" +
                "<div id='stats-left'>" +
                "<div>" +
                "PTS - " +
                d.PTS +
                "</div>" +
                "<div>" +
                "REB - " +
                d.TRB +
                "</div>" +
                "<div>" +
                "AST - " +
                d.AST +
                "</div>" +
                "<div>" +
                "STL - " +
                d.STL +
                "</div>" +
                "<div>" +
                "BLK - " +
                d.BLK +
                "</div>" +
                "<div>" +
                "TOV - " +
                d.TOV +
                "</div>" +
                "</div>" +
                "<div id='stats-right'>" +
                "<div>" +
                "FG% - " +
                currFGper +
                "</div>" +
                "<div>" +
                "3P% - " +
                curr3Pper +
                "</div>" +
                "<div>" +
                "FT% - " +
                currFTper +
                "</div>" +
                "<div>" +
                "GP  - " +
                d.G +
                "</div>" +
                "<div>" +
                "MIN - " +
                d.MP +
                "</div>" +
                "<div>" +
                "AGE - " +
                d.Age +
                "</div>" +
                "</div>" +
                "</div>"
              );
            }
          }
        }
      });

    svg.call(tip);

    root.children.forEach(collapse); // start with all children collapsed
    update(root);

    d3.select(self.frameElement).style("height", "800px");

    function update(source) {
      // Compute the new tree layout.
      let nodes = tree.nodes(root),
        links = tree.links(nodes);
      let initial = new Set();
      let maxQueue = [];

      nodes.forEach(function (d) {
        if (d.name.length <= 3 && d.name !== "NBA") {
          initial.add(d);
        }
        if (d.name === "NBA") {
          d.y = d.depth * 1;
        } else if (d.parent.name === "NBA") {
          d.y = d.depth * 175;
        } else {
          d.y = d.depth * 125;
        }
      });

      // Update the nodes…
      let node = svg
        .selectAll("g.node")
        .data(nodes, function (d) {
          return d.id || (d.id = ++i);
        })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);

      function handleMouseOver(d, i) {
        // Add interactivity
        // console.log(d)
      }

      function handleMouseOut(d, i) {
        // Use D3 to select element, change color back to normal
        d3.select(this).attr({
          fill: "black",
          // r: 20
        });

        // Select text by id and then remove
        // d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
      }

      // Enter any new nodes at the parent's previous position.
      let nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        //.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
        .on("click", click);

      nodeEnter.append("circle").on("mouseover", function (d) {
        console.log("WHAT");
      });

      nodeEnter
        .append("text")
        .attr("x", 30)
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .attr("transform", function (d) {
          return d.x < 180
            ? "translate(0)"
            : "rotate(180)translate(-" + d.name.length * 8.5 + ")";
        })
        .text(function (d) {
          if (d.depth === 2) {
            let allstarName = "✭" + d.name + "✭";
            return allStars.includes(d.name) ? allstarName : d.name;
          }
        })
        .attr("class", function (d) {
          if (allStars.includes(d.name)) {
            return "all-star";
          } else {
            return "non-all-star";
          }
        })
        .style("fill-opacity", 1e-6);

      var imgs = svg.selectAll("image").data([0]);
      imgs.enter().append("svg:image");

      //Image Attributes
      nodeEnter
        .append("svg:image")
        .attr("x", function (d) {
          if (d.name === "NBA") {
            return -50;
          } else {
            return -25;
          }
        })
        .attr("y", function (d) {
          if (d.name === "NBA") {
            return -50;
          } else {
            return -25;
          }
        })
        .attr("width", function (d) {
          if (d.name === "NBA") {
            return 100;
          } else {
            return 50;
          }
        })
        .attr("height", function (d) {
          if (d.name === "NBA") {
            return 100;
          } else {
            return 50;
          }
        })
        .attr("transform", function (d) {
          let nameArray = [
            "ATL",
            "BOS",
            "BKN",
            "CHA",
            "CHI",
            "CLE",
            "DAL",
            "DEN",
            "DET",
            "GSW",
            "HOU",
            "IND",
            "LAC",
            "LAL",
            "MEM",
            "MIA",
            "MIL",
            "MIN",
            "NO",
            "NYK",
            "OKC",
            "ORL",
            "PHI",
            "PHX",
            "POR",
            "SAC",
            "SAS",
            "TOR",
            "UTH",
            "WAS",
          ];
          if (d.name === "NBA") {
            return "rotate(-90 0 0)";
          }
          const isTeamName = (str) => str.length <= 3;

          if (isTeamName(d.name)) {
            let convertedRotation = 83 - nameArray.indexOf(d.name) * 12;
            return `rotate(${convertedRotation} 0 0)`;
          }
        })
        .attr("xlink:href", function (d) {
          if (d.name === "NBA") {
            return "https://castrstatic-5doxhowepfdd9.stackpathdns.com/portal.sportscastr.com/v1/media/logos/Circle/NBA_Logo.png";
          } else if (d.name.length <= 3) {
            return `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${d.name.toLowerCase()}.png&h=80&w=80&scale=crop`;
          }
        });

      // Transition nodes to their new position.
      let nodeUpdate = node
        .transition()
        .duration(duration)
        .attr("transform", function (d) {
          return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
        });

      //size of node circle
      nodeUpdate
        .select("circle")
        .attr("r", function (d) {
          if (d.depth === 1) {
            return 25;
          } else if (d.depth === 0) {
            return 50;
          } else {
            return 2.5;
          }
        })
        .style("fill", function (d) {
          return d._children
            ? "rgba(167, 167, 167, 0.294)"
            : "rgba(67, 57, 167, 0.694)";
        });
      //  .on("mouseover", function (d) {
      //    var g = d3.select(this); // The node
      //    g.attr('r', 40);
      // })

      nodeUpdate
        .select("text")
        .style("fill-opacity", 1)
        //FLIP WHEN HALF WAY
        .attr("transform", function (d) {
          return d.x < 180
            ? "translate(0)"
            : "rotate(180)translate(-" + (d.name.length + 158) + ")";
        });

      // TODO: appropriate transform
      let nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        //.attr("transform", function(d) { return "diagonal(" + source.y + "," + source.x + ")"; })
        .remove();

      nodeExit.select("circle").attr("r", 1e-6);

      nodeExit.select("text").style("fill-opacity", 1e-6);

      // Update the links…
      let link = svg.selectAll("path.link").data(links, function (d) {
        return d.target.id;
      });

      // Enter any new links at the parent's previous position.
      link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", function (d) {
          let o = { x: source.x0, y: source.y0 };
          return diagonal({ source: o, target: o });
        });

      // Transition links to their new position.
      link.transition().duration(duration).attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link
        .exit()
        .transition()
        .duration(duration)
        .attr("d", function (d) {
          let o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        })
        .remove();

      // Stash the old positions for transition.
      nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    function removeFromCounter(node, queue) {
      let newQueue = [];
      queue.forEach((x) => {
        if (x.name !== node.name) {
          newQueue.push(x);
        }
      });

      return newQueue;
    }

    let counter = [];

    function click(d) {
      height = window.innerHeight * 2;
      counter.getUnique();

      if (d.children) {
        if (d.name.length < 4 && d.name !== "NBA") {
          counter = removeFromCounter(d, counter);
          d._children = d.children;
          d.children = null;
        }
      } else {
        if (d.name.length < 4 && d.name !== "NBA") {
          counter.push(d);
          d.children = d._children;
          d._children = null;
          if (counter.length > 6) {
            collapse(counter.shift());
          }
        }
      }
      if (d.name.length <= 3) {
        update(d);
      }
      update(d);
    }

    // Collapse nodes
    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }
  });
