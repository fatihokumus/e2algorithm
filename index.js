



/////////// Create Nodes
const nList = [];
const eList = [];


const n1  = new GraphNode("n1", 1);
const n2  = new GraphNode("n2", 2);
const n3  = new GraphNode("n3", 3);
const n4  = new GraphNode("n4", 4);
const n5  = new GraphNode("n5", 5);
const n6  = new GraphNode("n6", 6);
const n7  = new GraphNode("n7", 7);
const n8  = new GraphNode("n8", 8);
const n9  = new GraphNode("n9", 9);
const n10  = new GraphNode("n10", 10);
const n11  = new GraphNode("n11", 11);
const n12  = new GraphNode("n12", 12);


/////////// Create Edges
const e1 = new GraphEdge("e1", 1, n1, n2);
const e2 = new GraphEdge("e2", 2, n1, n4);
const e3 = new GraphEdge("e3", 3, n2, n3);
const e4 = new GraphEdge("e4", 4, n2, n5);
const e5 = new GraphEdge("e5", 5, n3, n6);
const e6 = new GraphEdge("e6", 6, n4, n5);
const e7 = new GraphEdge("e7", 7, n4, n7);
const e8 = new GraphEdge("e8", 8, n5, n6);
const e9 = new GraphEdge("e9", 9, n5, n8);
const e10 = new GraphEdge("e10", 10, n6, n9);
const e11 = new GraphEdge("e11", 11, n7, n8);
const e12 = new GraphEdge("e12", 12, n7, n10);
const e13 = new GraphEdge("e13", 13, n8, n9);
const e14 = new GraphEdge("e14", 14, n8, n11);
const e15 = new GraphEdge("e15", 15, n9, n12);
const e16 = new GraphEdge("e16", 16, n10, n11);
const e17 = new GraphEdge("e17", 17, n11, n12);



// Add nodes to list
nList.push(n1);
nList.push(n2);
nList.push(n3);
nList.push(n4);
nList.push(n5);
nList.push(n6);
nList.push(n7);
nList.push(n8);
nList.push(n9);
nList.push(n10);
nList.push(n11);
nList.push(n12);


// add edges to list
eList.push(e1);
eList.push(e2);
eList.push(e3);
eList.push(e4);
eList.push(e5);
eList.push(e6);
eList.push(e7);
eList.push(e8);
eList.push(e9);
eList.push(e10);
eList.push(e11);
eList.push(e12);
eList.push(e13);
eList.push(e14);
eList.push(e15);
eList.push(e16);
eList.push(e17);


var gt = new GraphTree(nList, eList);

maxtree = gt.CreateMaxTree();
mintree = gt.CreateMinTree();


var node = maxtree[1][3];

var tt = gt.GetNestedSet(maxtree, 1, node);

for (let i = 0; i < maxtree.length; i++)
{
    const level = maxtree[i];
    for (let j = 0; j < level.length; j++) {
        const obj = level[j];
        console.log(obj._label);
        if(obj._parentNode == undefined || obj._parentNode == null)
        {
            console.log("NULL");
        }
        else
        {
            console.log(obj._parentNode._label);
        }
        
    }
}



for (let i = 0; i < mintree.length; i++)
{
    const level = mintree[i];
    for (let j = 0; j < level.length; j++) {
        const obj = level[j];
        console.log(obj._label);
        if(obj._parentNode == undefined || obj._parentNode == null)
        {
            console.log("NULL");
        }
        else
        {
            console.log(obj._parentNode._label);
        }
        
    }
}


