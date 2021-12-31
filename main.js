


const GraphNode = require('../Graf/GraphNode.js');
const GraphEdge = require('../Graf/GraphEdge.js');


var gList = [];
var a  = new GraphNode("a");
var b  = new GraphNode("b");
var c  = new GraphNode("c");
var d  = new GraphNode("d");
var e  = new GraphNode("e");

gList.push(a);
gList.push(b);
gList.push(c);
gList.push(d);
gList.push(e);

var e1 = new GraphEdge("1", a, b);

console.log(gList);