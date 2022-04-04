
 window.addEventListener('DOMContentLoaded', function(){

    let  graphSet=[
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
        // // petersen graph
        // const n1  = new GraphNode("n1", 1);
        // const n2  = new GraphNode("n2", 2);
        // const n3  = new GraphNode("n3", 3);
        // const n4  = new GraphNode("n4", 4);
        // const n5  = new GraphNode("n5", 5);
        // const n6  = new GraphNode("n6", 6);
        // const n7  = new GraphNode("n7", 7);
        // const n8  = new GraphNode("n8", 8);
        // const n9  = new GraphNode("n9", 9);
        // const n10  = new GraphNode("n10", 10);


        // /////////// Create Edges
        // const e1 = new GraphEdge("e1", 1, n1, n2);
        // const e2 = new GraphEdge("e2", 2, n1, n3);
        // const e3 = new GraphEdge("e3", 3, n1, n6);
        // const e4 = new GraphEdge("e4", 4, n2, n4);
        // const e5 = new GraphEdge("e5", 5, n2, n7);
        // const e6 = new GraphEdge("e6", 6, n3, n5);
        // const e7 = new GraphEdge("e7", 7, n3, n10);
        // const e8 = new GraphEdge("e8", 8, n4, n8);
        // const e9 = new GraphEdge("e9", 9, n4, n5);
        // const e10 = new GraphEdge("e10", 10, n5, n9);
        // const e11 = new GraphEdge("e11", 11, n6, n8);
        // const e12 = new GraphEdge("e12", 12, n6, n9);
        // const e13 = new GraphEdge("e13", 13, n7, n9);
        // const e14 = new GraphEdge("e14", 14, n7, n10);
        // const e15 = new GraphEdge("e15", 15, n8, n10);



        // // Add nodes to list
        // nList.push(n1);
        // nList.push(n2);
        // nList.push(n3);
        // nList.push(n4);
        // nList.push(n5);
        // nList.push(n6);
        // nList.push(n7);
        // nList.push(n8);
        // nList.push(n9);
        // nList.push(n10);


        // // add edges to list
        // eList.push(e1);
        // eList.push(e2);
        // eList.push(e3);
        // eList.push(e4);
        // eList.push(e5);
        // eList.push(e6);
        // eList.push(e7);
        // eList.push(e8);
        // eList.push(e9);
        // eList.push(e10);
        // eList.push(e11);
        // eList.push(e12);
        // eList.push(e13);
        // eList.push(e14);
        // eList.push(e15);



        /* const n1  = new GraphNode("n1", 1);
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
        eList.push(e17); */

            
        // let graphSet=[
        //     [1, 2],    
        //     [2, 3],
        //     [1, 4],
        //     [2, 5],
        //     [3, 6],
        //     [4, 5],
        //     [4, 7],
        //     [5, 6],
        //     [5, 8],
        //     [6, 9],
        //     [7, 8],
        //     [7, 10],
        //     [8, 9],
        //     [8, 11],
        //     [9, 12],
        //     [10, 11],
        //     [11, 12]
        //     ];
    });
    
    



function KarciDSet(graphSet)
{
    

    
    const nList = [];
    const eList = [];


        
    /////////// Create Nodes  
    for (let i = 0; i < graphSet.length; i++) {
        for (let j = 0; j < graphSet[i].length; j++) {
            const nodeId = graphSet[i][j];   
            if (!isNodeAdded(nodeId)) { 
                const node=new GraphNode(nodeId.toString(),nodeId);       
                nList.push(node);
            }  
        }
    }
    /////////// Create Edges
    for (let i = 0; i < graphSet.length; i++) {
        let nodeId1=graphSet[i][0]; 
        let nodeId2=graphSet[i][1]; 
        var n1=nList.filter(el=>{
            return el._id==nodeId1
        })[0];
        var n2=nList.filter(el=>{
            return el._id==nodeId2
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
    gt.Cutter(mintree, false);


    var finder = new PathFinder(nList, eList);

    var path = finder.Find();




    ///// Prapare Drawing Data 
    var nodesList = [];
    nList.forEach(element => {
        nodesList.push({data: { id: element._label, label: element._label}});
    }); 

    var edgeListMax = [];
    var edgeListMin = [];
    var edgeListOrg = [];


    for (let j = 0; j < eList.length; j++) {
        const edge = eList[j];
        edgeListOrg.push({ data: { id:edge._label, source: edge._node1._label, target: edge._node2._label } });
    }


    for (let i = 1; i < maxtree.length; i++) {
        const row = maxtree[i];
        for (let j = 0; j < row.length; j++) {
            const node = row[j];
            edgeListMax.push({ data: {  id: node._maxParentNodeEdge._label, source: node._maxParentNode._label, target: node._label } });
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
    path.forEach(element => {
        pathNodesList.push({data: { id: element._label, label: element._label}});
    }); 

    var oldNode = null;
    for (let j = 0; j < path.length; j++) {
        const pt = path[j];
        if(j>0)
        {
            pathEdgeList.push({ data: { source: oldNode, target: pt._label } });
        }
        oldNode = pt._label;
    }
    //////////////////////////////
    /////Draw Org Graph
    var cyOrg  = cytoscape({
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
            'background-color': '#3a7ecf',
            'color': "#FFFFFF",
            'label': 'data(id)',
            'text-halign': 'center',
            'text-valign': 'center'
            },
            classes: 'center-center'
        },

        {
            selector: 'edge',
            style: {
            'width': 4,
            'line-color': '#3a7ecf',
            'label': 'data(id)',
            'color': '#cd9d32'
            }
        }
        ],

        elements: {
        nodes: nodesList,
        edges: edgeListOrg
        }
    });

    /////Draw Max Tree
    var cyMax  = cytoscape({
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
            'text-valign': 'center'
            },
            classes: 'center-center'
        },

        {
            selector: 'edge',
            style: {
            'width': 4,
            'target-arrow-shape': 'triangle',
            'line-color': '#9dbaea',
            'target-arrow-color': '#9dbaea',
            'curve-style': 'bezier',
            'label': 'data(id)',
            'color': '#cd9d32'
            }
        }
        ],

        elements: {
        nodes: nodesList,
        edges: edgeListMax
        }
    });


    var cyMin  = cytoscape({
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
            'text-valign': 'center'
            },
            classes: 'center-center'
        },

        {
            selector: 'edge',
            style: {
            'width': 4,
            'target-arrow-shape': 'triangle',
            'line-color': '#9dbaea',
            'target-arrow-color': '#9dbaea',
            'curve-style': 'bezier',
            'label': 'data(id)',
            'color': '#cd9d32'
            }
        }
        ],

        elements: {
        nodes: nodesList,
        edges: edgeListMin
        }
    });

    var cyPath  = cytoscape({
        container: document.getElementById('cyPath'),

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
            'text-valign': 'center'
            },
            classes: 'center-center'
        },

        {
            selector: 'edge',
            style: {
            'width': 4,
            'target-arrow-shape': 'triangle',
            'line-color': '#9dbaea',
            'target-arrow-color': '#9dbaea',
            'curve-style': 'bezier',
            }
        }
        ],

        elements: {
        nodes: pathNodesList,
        edges: pathEdgeList
        }
    });
}


function readTextFile()
{
    var file= document.getElementById("file");
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
    if(filePath.files && filePath.files[0]) {           
        reader.onload = function (e) {
            output = e.target.result;
            KarciDSet(GetGraphSetFromText(output));
        };
        reader.readAsText(filePath.files[0]);
    }
    else if(ActiveXObject && filePath) { 
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


function RunText()
{
    var textGraph = document.getElementById("textGraph");
    KarciDSet(GetGraphSetFromText(textGraph.value));
}

function GetGraphSetFromText(text)
{
    let  graphSet = [];
    var lines = text.split('\n');
    for(var i = 0;i < lines.length;i++){
        if (lines[i].includes(','))
        {
            var nodes = lines[i].split(',');
            graphEl = [];
            for (let j = 0; j < nodes.length; j++) {
                const nodeText = nodes[j];
                var node = nodeText.replaceAll(" ","").replaceAll('\r','');
                graphEl.push(parseInt(node));
            }
            graphSet.push(graphEl);
        }
    }

    return graphSet;
}