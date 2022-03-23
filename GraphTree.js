
var _currentObject;
var _currentIdList = [];
var _currentChildren = [];
var _currentNode = [];
var _currentOtherNode;
var _currentNestedNode;
var _currentNestedList = [];

class GraphTree {
    _orgNodeList;
    _maxNodeList = [];
    _minNodeList = [];
    _edgeList;
    
    constructor(nodeList, edgeList) {
        this._edgeList = edgeList;
        this._orgNodeList = nodeList;
        nodeList.forEach(obj => {
            var copy = obj.copy();
            this._maxNodeList.push(copy);
            this._minNodeList.push(copy);
        });
    }

    DecreaseNeighboursDegreeForKMax(node, treeList)
    {
        node._neighbours.forEach(neighbour => {
            var objId = neighbour._id;
            var isNodeFounded = false;
            var child = this._maxNodeList.filter(function (el) {
                if(el._id == objId)  
                {
                    el._degree--;
                    isNodeFounded = true;
                }
            })[0];

            if(isNodeFounded == false)
            {
                treeList.forEach(element => {
                    var filteredTreeObject = element.filter(function (el) {
                        return el._id == objId;
                    });
                    if(filteredTreeObject!= undefined && filteredTreeObject != null && filteredTreeObject.length>0)
                    {
                        filteredTreeObject[0]._degree--;
                    }
                });
            }
        });
    }

    DecreaseNeighboursDegreeForKMin(node, treeList)
    {
        node._neighbours.forEach(neighbour => {
            var objId = neighbour._id;
            var isNodeFounded = false;
            var child = this._minNodeList.filter(function (el) {
                if(el._id == objId)  
                {
                    el._degree--;
                }
            })[0];

            if(isNodeFounded == false)
            {
                treeList.forEach(element => {
                    var filteredTreeObject = element.filter(function (el) {
                        return el._id == objId;
                    });
                    if(filteredTreeObject!= undefined && filteredTreeObject != null && filteredTreeObject.length>0)
                    {
                        filteredTreeObject[0]._degree--;
                    }
                });
            }
        });
    }

    CreateMaxTree()
    {
        var treeList = [];
        var tempQuee = [];
        var tempQuee2 = [];
        var root = this.GetMaxDegreeNode();
        root._maxLevel = 0;
        root._maxParentNode = null;
        treeList[0] = [root];  // ilk elemanın  da dizi olması için
        this.DecreaseNeighboursDegreeForKMax(root, treeList);

        
        this._maxNodeList.splice(this._maxNodeList.findIndex(v => v._id == root._id), 1); // ağaca eklediğimizi diziden çıkarıyoruz
        

        tempQuee.push(root);
        tempQuee2.push(root);
        var i = 0;
        var parentNode = root;

        while(this._maxNodeList.length>0)
        {
            i = parentNode._maxLevel + 1;
            if(treeList[i] == undefined || treeList[i] == null || treeList[i].length == 0)
            {
                treeList[i] = [];
            }

            var filteredObject = this._orgNodeList.filter(function (el) {
                return el._id == parentNode._id;
            });

            _currentObject = null;
            if(filteredObject!= undefined && filteredObject != null && filteredObject.length > 0)
            {
                _currentObject = filteredObject[0];
            }

            if(_currentObject != null)
            {
                // var childEdges = this._edgeList.filter(function (el) {
                //     var row = el._node1._id == _currentObject._id || el._node2._id == _currentObject._id;
                //     return row;
                // });
                
    
                tempQuee.splice(tempQuee.findIndex(v => v._id == parentNode._id), 1); // temp listeden açacağımız dalı çıkarıyoruz
    
                var qi = 0;

                _currentChildren = [];
                _currentObject._neighbours.forEach(neighbour => {
                    var child;
                    var objId = neighbour._id;
                    

                    child = this._maxNodeList.filter(function (el) {
                        return el._id == objId ;
                    })[0];


                    if(child != undefined || child != null) // eğer bulunamadıysa ağaçta değildir o zaman ekleyebiliriz
                    {
                        if(child._id == 37)
                        {
                            console.log("debe");
                        }
                        child._maxParentNode = parentNode;
                        parentNode._maxChildren.push(child);
                        child._maxLevel = i;
                        child._queeIndex = qi;
                        child._isInTree = true;

                        var edge = this._edgeList.filter(function (el) {
                            var row = (el._node1._id == _currentObject._id && el._node2._id == child._id) || (el._node1._id == child._id && el._node2._id == _currentObject._id);
                            return row;
                        });

                        child._maxParentNodeEdge = edge[0];
                        edge._isMaxChord = false;

                        this.DecreaseNeighboursDegreeForKMax(child, treeList);
                        treeList[i].push(child);
                        tempQuee.push(child);
                        tempQuee2.push(child);
                        this._maxNodeList.splice(this._maxNodeList.findIndex(v => v._id == objId), 1); // ağaca eklediğimizi diziden çıkarıyoruz
                        qi++;
                    }
                });

               
    
                if(_currentObject._label == '70')
                {
                    console.log("test");
                }
                parentNode = this.GetMaxDegreeNodeFromTemp(tempQuee);
                if(parentNode == undefined || parentNode == null)
                {
                    console.log("test");
                }
            }
            
        }

        return treeList;
    }


    CreateMinTree()
    {
        var treeList = [];
        var tempQuee = [];
        var root = this.GetMinDegreeNode();
        root._minLevel = 0;
        root._minParentNode = null;
        treeList[0] = [root];  // ilk elemanın  da dizi olması için
        this.DecreaseNeighboursDegreeForKMin(root, treeList);

        this._minNodeList.splice(this._minNodeList.findIndex(v => v._id == root._id), 1); // ağaca eklediğimizi diziden çıkarıyoruz
       

        tempQuee.push(root);
        var i = 0;
        var parentNode = root;

        while(this._minNodeList.length>0)
        {
            i = parentNode._minLevel + 1;
            if(treeList[i] == undefined || treeList[i] == null || treeList[i].length == 0)
            {
                treeList[i] = [];
            }

            var filteredObject = this._orgNodeList.filter(function (el) {
                return el._id == parentNode._id;
            });

            _currentObject = null;
            if(filteredObject!= undefined && filteredObject != null && filteredObject.length > 0)
            {
                _currentObject = filteredObject[0];
            }

            if(_currentObject != null)
            {
                tempQuee.splice(tempQuee.findIndex(v => v._id == parentNode._id), 1); // temp listeden açacağımız dalı çıkarıyoruz
    
                var qi = 0;

                _currentObject._neighbours.forEach(neighbour => {
                    var child;
                    var objId = neighbour._id;

                    child = this._minNodeList.filter(function (el) {
                        return el._id == objId ;
                    })[0];


                    if(child != undefined || child != null) // eğer bulunamadıysa ağaçta değildir o zaman ekleyebiliriz
                    {
                        child._minParentNode = parentNode;
                        parentNode._minChildren.push(child);
                        child._minLevel = i;
                        child._queeIndex = qi;
                        child._isInTree = true;

                        var edge = this._edgeList.filter(function (el) {
                            var row = (el._node1._id == _currentObject._id && el._node2._id == child._id) || (el._node1._id == child._id && el._node2._id == _currentObject._id);
                            return row;
                        });

                        child._minParentNodeEdge = edge[0];
                        edge._isMinChord = false;
                        
                        this.DecreaseNeighboursDegreeForKMin(child, treeList);
                        treeList[i].push(child);
                        tempQuee.push(child);
                        
                        this._minNodeList.splice(this._minNodeList.findIndex(v => v._id == objId), 1); // ağaca eklediğimizi diziden çıkarıyoruz
                        qi++;
                    }
                });
    
                parentNode = this.GetMinDegreeNodeFromTemp(tempQuee);
            }
            
        }

        return treeList;
    }

    GetMaxDegreeNode()
    {
        let result;
        let i=0;
        this._maxNodeList.forEach(element => {
            if(element._degree > i)
            {
                result = element;
                i= element._degree;
            }
        });
        return result;
    }

    GetMinDegreeNode()
    {
        let result;
        let i = this._minNodeList.length;
        for (let s = 0; s < i; s++) {
            const element = this._minNodeList[s];
            if(element._degree < i)
            {
                result = element;
                i = element._degree;
            }
        }
        return result;
    }

    GetMaxDegreeNodeFromTemp(tempQuee)
    {
        let result;
        let i=-100;
        let l=0;
        let id=0;
        tempQuee.forEach(element => {
            if(element._degree > i)
            {
                result = element;
                i= element._degree;
                l= element._maxLevel;
                id = element._id;
            }
            else if(element._degree == i)
            {
                if(element._maxLevel < l)
                {
                    result = element;
                    i= element._degree;
                    l= element._maxLevel;
                    id = element._id;
                }
                else if(element._maxLevel == l)
                {
                    if(element._id < id)
                    {
                        result = element;
                        i= element._degree;
                        l= element._maxLevel;
                        id = element._id;
                    }
                }
            }
        });
        return result;
    }

    GetMinDegreeNodeFromTemp(tempQuee)
    {
        let result;
        let l=0;
        let i = this._edgeList.length;
        let id=0;

        for (let s = 0; s < i; s++) {
            const element = tempQuee[s];
            if(element._degree < i)
            {
                result = element;
                i= element._degree;
                l= element._minLevel;
                id = element._id;
            }
            else if(element._degree == i)
            {
                if(element._minLevel < l)
                {
                    result = element;
                    i= element._degree;
                    l= element._maxLevel;
                    id = element._id;
                }
                else if(element._maxLevel == l)
                {
                    if(element._id < id)
                    {
                        result = element;
                        i= element._degree;
                        l= element._maxLevel;
                        id = element._id;
                    }
                }
            }
            
        }

        return result;
    }

    Cutter(tree, isMax)
    {
        _currentNode = null;
        
        for (let i = tree.length -1; i >0; i--) {
            const level = tree[i];

            if(i==tree.length -1) // En alt seviyedekiler yaprak olduğu için alt düğümleri sorgulamaya gerek yok
            {
                level.forEach(node => {
                    _currentNode = node;
                    var edges = this._edgeList.filter(function (el) {
                        var row = el._node1._id == _currentNode._id || el._node2._id == _currentNode._id;
                        if(row)
                        {
                            el._cutCount++;
                        }
                        return row;
                    });
                });
            }
            else
            {
                level.forEach(node => {
                    _currentNode = node;
                    
                    _currentNestedList = this.GetNestedSet(tree, _currentNode, isMax);

                    if(_currentNestedList != undefined && _currentNestedList != null && _currentNestedList.length > 0)
                    {

                        if(isMax)
                        {
                            _currentNode._maxParentNodeEdge._cutCount++;
                        }
                        else
                        {
                            _currentNode._minParentNodeEdge._cutCount++;
                        }

                        /// Dalın kirişlerini koparmak için
                        var edges = this._edgeList.filter(function (el) {
                            var row = el._node1._id == _currentNode._id || el._node2._id == _currentNode._id;
                            return row;
                        });

                        for (let t = 0; t < edges.length; t++) {
                            const ed = edges[t];
    
                            if(isMax)
                            {
                                if(ed._isMaxChord == true)
                                {
                                    ed._cutCount++;
                                }
                            }
                            else
                            {
                                if(ed._isMinChord == true)
                                {
                                    ed._cutCount++;
                                }
                            }
                            
                        }

                        // Dalın çocuklarının kirişlerini koparmak için
                        for (let k = 0; k < _currentNestedList.length; k++) {
                            const _currentNestedNode = _currentNestedList[k];

                            var edgesNestedNode = this._edgeList.filter(function (el) {
                                var row = el._node1._id == _currentNestedNode._id || el._node2._id == _currentNestedNode._id;

                                if(row)
                                {
                                    _currentOtherNode = null;
                                    if(el._node1._id == _currentNestedNode._id )
                                    {
                                        _currentOtherNode = el._node2;
                                    }
                                    else
                                    {
                                        _currentOtherNode = el._node1;
                                    }

                                    if(_currentNode._id != _currentOtherNode._id)
                                    {
                                        var isChord = _currentNestedList.filter(function (n) {
                                            return n._id == _currentOtherNode._id;
                                        });
    
                                        if(isChord == undefined || isChord == null || isChord.length == 0)
                                        {
                                            el._cutCount++;
                                        }
                                    }
                                }

                                return row;
                            });
                            
                        }
                    }
                    else   // yaprak ise
                    {
                        var edges = this._edgeList.filter(function (el) {
                            var row = el._node1._id == _currentNode._id || el._node2._id == _currentNode._id;
                            if(row)
                            {
                                el._cutCount++;
                            }
                            return row;
                        });
                    }
                    
                });
            }

            
        }

    }


    
    GetNestedSet(tree, node, isMax)
    {
        let nodeList = [];
        _currentIdList = [];

        var level =0;
        
        if(isMax)
        {
            node._maxChildren.forEach(element => {
                nodeList.push(element);
                _currentIdList.push(element._id);
            });
            level = node._maxLevel;
        }
        else
        {
            node._minChildren.forEach(element => {
                nodeList.push(element);
                _currentIdList.push(element._id);
            });
            
            level = node._minLevel;
        }
        

        for (let i = level + 2; i < tree.length; i++) {
            const row = tree[i];

            var childNodes = row.filter(function (el) {
                let parentNode = null;
                if(isMax)
                {
                    parentNode = el._maxParentNode;
                }
                else
                {
                    parentNode = el._minParentNode;
                }

                var node = _currentIdList.includes(parentNode._id);
                if(node)
                {
                    _currentIdList.push(el._id);
                    nodeList.push(el);
                }
                return node;
            });
        }
        return nodeList;
    }

    GetNodeFromTree(tree, id)
    {
    for (let i = 0; i < tree.length; i++) {
        const level = tree[i];

        for (let j = 0; j < level.length; j++) {
            const node = level[j];

            if(node._id == id)
            {
                return node;
            }
            
        }
        
    }
    }
    
  }
