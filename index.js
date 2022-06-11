var cyOrg;
var cyMax;
var cyMin;
var cyPath;
window.addEventListener('DOMContentLoaded', function () {
    let graphSet = [
        [1, 2],
        [2, 3],
        [1, 4],
        [2, 5],
        [3, 5],
        [3, 7],
        [4, 5],
        [5, 6],
        [6, 7],
        [6, 8],
        [7, 8]
    ];

    KarciDSet(graphSet);
});

function KarciDSet(graphSet) {
    console.time('Execution Time');
    const nList = [];
    const eList = [];
    /////////// Create Nodes  
    for (let i = 0; i < graphSet.length; i++) {
        for (let j = 0; j < graphSet[i].length; j++) {
            const nodeId = graphSet[i][j];
            if (!isNodeAdded(nodeId)) {
                const node = new GraphNode(nodeId.toString(), nodeId);
                nList.push(node);
            }
        }
    }
    /////////// Create Edges
    for (let i = 0; i < graphSet.length; i++) {
        let nodeId1 = graphSet[i][0];
        let nodeId2 = graphSet[i][1];
        var n1 = nList.filter(el => {
            return el._id == nodeId1
        })[0];
        var n2 = nList.filter(el => {
            return el._id == nodeId2
        })[0];

        const edge = new GraphEdge("e" + (i + 1), i + 1, n1, n2);
        eList.push(edge);

    }

    function isNodeAdded(nodeId) {
        let result = false;
        for (let k = 0; k < nList.length; k++) {
            if (nList[k]._id == nodeId) {
                result = true;
            }
        }
        return result;
    }

    var gt = new GraphTree(nList, eList);

    maxtree = gt.CreateMaxTree();
    mintree = gt.CreateMinTree();

    gt.Cutter(maxtree, true);

    var html = "";

    //// Show edge status information after KMax step
    document.getElementById("EtkinDugumlerKMax").innerHTML = html;
    for (let k = (eList.length - 1); k >= 0; k--) {
        const element = eList[k];
        html += "Edge: " + element._label + " -- Cut Count: " + element._cutCount + " -- node1: " + element._node1._label + " -- node2: " + element._node2._label + "&#13;&#10;";
    }
    document.getElementById("EtkinDugumlerKMax").innerHTML = html;
    /////////////////////////////////////////////////////////////////////////////////////

    gt.Cutter(mintree, false);
    html = "";

    //// Show edge status information after KMin step
    document.getElementById("EtkinDugumlerKMin").innerHTML = html;
    for (let k = (eList.length - 1); k >= 0; k--) {
        const element = eList[k];
        html += "Edge: " + element._label + " -- Cut Count: " + element._cutCount + " -- node1: " + element._node1._label + " -- node2: " + element._node2._label + "&#13;&#10;";
    }
    document.getElementById("EtkinDugumlerKMin").innerHTML = html;
    /////////////////////////////////////////////////////////////////////////////////////

    var finder = new PathFinder(nList, eList);
    var path = finder.Find();
    console.timeEnd('Execution Time');

    ///// Prapare Drawing Data 
    var nodesList = [];
    nList.forEach(element => {
        nodesList.push({ data: { id: element._label, label: element._label } });
    });

    var edgeListOrg = [];  // For original Graph
    var edgeListMax = [];  // For KMax Tree
    var edgeListMin = [];  // For KMin Tree


    for (let j = 0; j < eList.length; j++) {
        const edge = eList[j];
        edgeListOrg.push({ data: { id: edge._label, source: edge._node1._label, target: edge._node2._label } });
    }


    for (let i = 1; i < maxtree.length; i++) {
        const row = maxtree[i];
        for (let j = 0; j < row.length; j++) {
            const node = row[j];
            edgeListMax.push({ data: { id: node._maxParentNodeEdge._label, source: node._maxParentNode._label, target: node._label } });
        }
    }

    for (let i = 1; i < mintree.length; i++) {
        const row2 = mintree[i];
        for (let j = 0; j < row2.length; j++) {
            const node = row2[j];
            edgeListMin.push({ data: { id: node._minParentNodeEdge._label, source: node._minParentNode._label, target: node._label } });
        }
    }

    ////////Draw path
    ///// Prapare Drawing Data 
    var pathNodesList = [];
    var pathEdgeList = [];
    for (let k = 0; k < path.length; k++) {
        const p = path[k];

        if (k == 0)
            pathNodesList.push({ data: { id: p._label, label: p._label, first: true } });
        else
            pathNodesList.push({ data: { id: p._label, label: p._label, first: false } });

    }





    var oldNode = null;
    for (let j = 0; j < path.length; j++) {
        const pt = path[j];
        if (j > 0) {
            pathEdgeList.push({ data: { source: oldNode, target: pt._label } });
        }
        oldNode = pt._label;
    }

    firstNode = path[0];
    lastNode = path[path.length - 1];

    for (let t = 0; t < firstNode._neighbours.length; t++) {
        const neighbour = firstNode._neighbours[t];
        if(neighbour._id == lastNode._id)
        {
            pathEdgeList.push({ data: { source: path[path.length - 1]._label, target: path[0]._label } });
        }
    }
    
    //////////////////////////////
    /////Draw Org Graph
    cyOrg = cytoscape({
        container: document.getElementById('cyOrg'),

        boxSelectionEnabled: false,
        autounselectify: true,
      
        layout: {
            name: 'avsdf'
        },

        style: [
            {
                selector: 'node',

                style: {
                    'background-color': '#11479e',
                    'color': "#FFFFFF",
                    'label': 'data(id)',
                    'text-halign': 'center',
                    'text-valign': 'center',
                    'width': '15px',
                    'height': '15px',
                    'font-size': 10
                },
                classes: 'center-center'
            },

            {
                selector: 'edge',
                style: {
                    'width': 2,
                    'line-color': '#9dbaea',
                    'label': 'data(id)',
                    'color': '#000',
                    'z-index': 1000,
                    'font-size': 10,
                    'font-weight': 'bold',
                }
            }
        ],

        elements: {
            nodes: nodesList,
            edges: edgeListOrg
        }
    });

    /////Draw KMax Tree
    cyMax = cytoscape({
        container: document.getElementById('cyMax'),

        boxSelectionEnabled: false,
        autounselectify: true,
        
        layout: {
            name: 'dagre'
        },

        style: [
            {
                selector: 'node',

                style: {
                    'background-color': '#11479e',
                    'color': "#FFFFFF",
                    'label': 'data(id)',
                    'text-halign': 'center',
                    'text-valign': 'center',
                    'width': '15px',
                    'height': '15px',
                    'font-size': 10
                },
                classes: 'center-center'
            },

            {
                selector: 'edge',
                style: {
                    'width': 2,
                    'target-arrow-shape': 'triangle',
                    'line-color': '#9dbaea',
                    'target-arrow-color': '#9dbaea',
                    'curve-style': 'bezier',
                    'label': 'data(id)',
                    'color': '#000',
                    'z-index': 1000,
                    'font-size': 10,
                    'font-weight': 'bold',
                }
            }
        ],

        elements: {
            nodes: nodesList,
            edges: edgeListMax
        }
    });

     /////Draw KMin Tree
    cyMin = cytoscape({
        container: document.getElementById('cyMin'),

        boxSelectionEnabled: false,
        autounselectify: true,
 

        layout: {
            name: 'dagre'
        },

        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#11479e',
                    'color': "#FFFFFF",
                    'label': 'data(id)',
                    'text-halign': 'center',
                    'text-valign': 'center',
                    'width': '15px',
                    'height': '15px',
                    'font-size': 10
                },
                classes: 'center-center'
            },

            {
                selector: 'edge',
                style: {
                    'width': 2,
                    'target-arrow-shape': 'triangle',
                    'line-color': '#9dbaea',
                    'target-arrow-color': '#9dbaea',
                    'curve-style': 'bezier',
                    'label': 'data(id)',
                    'color': '#000',
                    'z-index': 1000,
                    'font-size': 10,
                    'font-weight': 'bold',
                }
            }
        ],

        elements: {
            nodes: nodesList,
            edges: edgeListMin
        }
    });
    /////Draw Hamilton Cycle
    cyPath = cytoscape({
        container: document.getElementById('cyPath'),

        boxSelectionEnabled: false,
        autounselectify: true,


        layout: {
            name: 'avsdf'
        },

        style: [
            {
                selector: 'node',
                style: {
                    "background-color": node => node.data('first') ? '#993131' : '#11479e',
                    'color': "#FFFFFF",
                    'label': 'data(id)',
                    'text-halign': 'center',
                    'text-valign': 'center',
                    'width': '15px',
                    'height': '15px',
                    'font-size': 10
                },
                classes: 'center-center'
            },

            {
                selector: 'edge',
                style: {
                    'width': 2,
                    'target-arrow-shape': 'triangle',
                    'line-color': '#9dbaea',
                    'target-arrow-color': '#9dbaea',
                    'curve-style': 'bezier',
                    'color': '#000',
                    'z-index': 1000,
                    'font-size': 10,
                    'font-weight': 'bold',
                }
            }
        ],

        elements: {
            nodes: pathNodesList,
            edges: pathEdgeList
        }
    });
}


function readTextFile() {
    var file = document.getElementById("file");
    readText(file);
}


var reader; //GLOBAL File Reader object for demo purpose only

/**
 * Check for the various File API support.
 */
function checkFileAPI() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        reader = new FileReader();
        return true;
    } else {
        alert('The File APIs are not fully supported by your browser. Fallback required.');
        return false;
    }
}

/**
 * read text input
 */
function readText(filePath) {
    var output = "";
    if (filePath.files && filePath.files[0]) {
        reader.onload = function (e) {
            output = e.target.result;
            KarciDSet(GetGraphSetFromText(output));
        };
        reader.readAsText(filePath.files[0]);
    }
    else if (ActiveXObject && filePath) {
        try {
            reader = new ActiveXObject("Scripting.FileSystemObject");
            var file = reader.OpenTextFile(filePath, 1);
            output = file.ReadAll();
            file.Close();
            console.log(output);
        } catch (e) {
            alert(e);
        }
    }
    else {
        return false;
    }
    return true;
}


function RunText() {
    var textGraph = document.getElementById("textGraph");
    KarciDSet(GetGraphSetFromText(textGraph.value));
}

function GetGraphSetFromText(text) {
    let graphSet = [];
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].includes(',')) {
            var nodes = lines[i].split(',');
            graphEl = [];
            for (let j = 0; j < nodes.length; j++) {
                const nodeText = nodes[j];
                var node = nodeText.replaceAll(" ", "").replaceAll('\r', '');
                graphEl.push(parseInt(node));
            }
            graphSet.push(graphEl);
        }
    }

    return graphSet;
} 

var fullscreen = false;
var fullscreenObj;
var fullscreenCyObj;
function FullScreen(obj, cyObj)
{
    if(cyObj == "cyMin")
    {
        fullscreenCyObj = cyMin;
    }
    else if(cyObj == "cyMax")
    {
        fullscreenCyObj = cyMax;
    }
    else if(cyObj == "cyOrg")
    {
        fullscreenCyObj = cyOrg;
    }
    else if(cyObj == "cyPath")
    {
        fullscreenCyObj = cyPath;
    }
    
    fullscreenObj = document.getElementById(obj);
    if(fullscreen == false)
    {
       
        if(fullscreenObj.requestFullscreen){
            fullscreenObj.requestFullscreen();
        }
        else if(fullscreenObj.mozRequestFullScreen){
            fullscreenObj.mozRequestFullScreen();
        }
        else if(fullscreenObj.webkitRequestFullscreen){
            fullscreenObj.webkitRequestFullscreen();
        }
        else if(fullscreenObj.msRequestFullscreen){
            fullscreenObj.msRequestFullscreen();
        }

        setTimeout(() => {
            fullscreenCyObj.resize();
            fullscreenCyObj.fit();
        }, 100);
        
        fullscreen = true;
    }
    else
    {
        if(document.exitFullscreen){
            document.exitFullscreen();
        }
        else if(document.mozCancelFullScreen){
            document.mozCancelFullScreen();
        }
        else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen();
        }
        else if(document.msExitFullscreen){
            document.msExitFullscreen();
        }

       

        setTimeout(() => {
            fullscreenCyObj.resize();
            fullscreenCyObj.fit();
        }, 100);

        fullscreen = false;

        
    }
    
    
}