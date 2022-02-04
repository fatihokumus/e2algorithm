
var _currentObject;
var _currentIdList = [];
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

    CreateMaxTree()
    {
        var treeList = [];
        var tempQuee = [];
        var root = this.GetMaxDegreeNode();
        root._maxLevel = 0;
        root._maxParentNode = null;
        treeList[0] = [root];  // ilk elemanın  da dizi olması için
        
        this._maxNodeList.splice(this._maxNodeList.findIndex(v => v._id == root._id), 1); // ağaca eklediğimizi diziden çıkarıyoruz
        

        tempQuee.push(root);
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
                var childEdges = this._edgeList.filter(function (el) {
                    var row = el._node1._id == _currentObject._id || el._node2._id == _currentObject._id;
                    return row;
                });
                
    
                tempQuee.splice(tempQuee.findIndex(v => v._id == parentNode._id), 1); // temp listeden açacağımız dalı çıkarıyoruz
    
                var qi = 0;
                childEdges.forEach(edge => {
                    var child;
                    var objId;
                    if(edge._node1._id== _currentObject._id)
                    {
                        objId = edge._node2._id;
                    }
                    else
                    {
                        objId = edge._node1._id;
                    }

                    child = this._maxNodeList.filter(function (el) {
                        return el._id == objId ;
                    })[0];


                    if(child != undefined || child != null) // eğer bulunamadıysa ağaçta değildir o zaman ekleyebiliriz
                    {
                        edge._isMaxChord = false;
                        child._maxParentNode = parentNode;
                        parentNode._maxChildren.push(child);
                        child._maxLevel = i;
                        child._queeIndex = qi;
                        child._isInTree = true;
                        child._maxParentNodeEdge = edge;
                        child._degree--;
                        treeList[i].push(child);
                        tempQuee.push(child);
                        this._maxNodeList.splice(this._maxNodeList.findIndex(v => v._id == objId), 1); // ağaca eklediğimizi diziden çıkarıyoruz
                        qi++;
                    }
                    else 
                    {
                        // eğer komşu daha önce ağaca eklendiyse derecesini azaltalım
                        treeList.forEach(element => {
                            var filteredTreeObject = element.filter(function (el) {
                                return el._id == objId;
                            });
                            if(filteredTreeObject!= undefined && filteredTreeObject != null && filteredTreeObject.length>0)
                            {
                                filteredTreeObject[0]._degree--;
                            }
                        });
                        

                        // eğer komşu daha önce temp liste eklendiyse derecesini azaltalım
                        var filteredTempObject = tempQuee.filter(function (el) {
                            return el._id == objId;
                        });
                        if(filteredTempObject!= undefined && filteredTempObject != null && filteredTempObject.length>0)
                        {
                            filteredTempObject[0]._degree--;
                        }
                        
                    }
                    
                });
    
                parentNode = this.GetMaxDegreeNodeFromTemp(tempQuee);
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
                var childEdges = this._edgeList.filter(function (el) {
                    var row = el._node1._id == _currentObject._id || el._node2._id == _currentObject._id;
                    return row;
                });
                
    
                tempQuee.splice(tempQuee.findIndex(v => v._id == parentNode._id), 1); // temp listeden açacağımız dalı çıkarıyoruz
    
                var qi = 0;
                childEdges.forEach(edge => {
                    var child;
                    var objId;
                    if(edge._node1._id== _currentObject._id)
                    {
                        objId = edge._node2._id;
                    }
                    else
                    {
                        objId = edge._node1._id;
                    }

                    child = this._minNodeList.filter(function (el) {
                        return el._id == objId ;
                    })[0];


                    if(child != undefined || child != null) // eğer bulunamadıysa ağaçta değildir o zaman ekleyebiliriz
                    {
                        edge._isMinChord = false;
                        child._minParentNode = parentNode;
                        parentNode._minChildren.push(child);
                        child._minLevel = i;
                        child._queeIndex = qi;
                        child._isInTree = true;
                        child._minParentNodeEdge = edge;
                        child._degree--;
                        treeList[i].push(child);
                        tempQuee.push(child);
                        
                        this._minNodeList.splice(this._minNodeList.findIndex(v => v._id == objId), 1); // ağaca eklediğimizi diziden çıkarıyoruz
                        qi++;
                    }
                    else 
                    {
                        // eğer komşu daha önce ağaca eklendiyse derecesini azaltalım
                        treeList.forEach(element => {
                            var filteredTreeObject = element.filter(function (el) {
                                return el._id == objId;
                            });
                            if(filteredTreeObject!= undefined && filteredTreeObject != null && filteredTreeObject.length>0)
                            {
                                filteredTreeObject[0]._degree--;
                            }
                        });
                        

                        // eğer komşu daha önce tenp liste eklendiyse derecesini azaltalım
                        var filteredTempObject = tempQuee.filter(function (el) {
                            return el._id == objId;
                        });
                        if(filteredTempObject!= undefined && filteredTempObject != null && filteredTempObject.length>0)
                        {
                            filteredTempObject[0]._degree--;
                        }
                        
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
        let i=0;
        let l=0;
        tempQuee.forEach(element => {
            if(element._degree > i)
            {
                result = element;
                i= element._degree;
                l= element._maxLevel;
            }
            else if(element._degree == i)
            {
                if(element._maxLevel < l)
                {
                    result = element;
                    i= element._degree;
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

        for (let s = 0; s < i; s++) {
            const element = tempQuee[s];
            if(element._degree < i)
            {
                result = element;
                i= element._degree;
                l= element._minLevel;
            }
            else if(element._degree == i)
            {
                if(element._minLevel < l)
                {
                    result = element;
                    i= element._degree;
                }
            }
        }

        return result;
    }

    Cutter(tree, isMax)
    {
        //// tree deki yaprakları bul
        //// yaprakların tüm edgeleri kesilecek
        //// 
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
                            // if(el._id == 11)
                            // {
                            //     console.log("tt");
                            // }
                        }
                        return row;
                    });
                });
            }
            else
            {
                level.forEach(node => {
                    _currentNode = node;
                    
                    // if(_currentNode._id == 9)
                    // {
                    //     console.log("tt");
                    // }

                    

                    _currentNestedList = this.GetNestedSet(tree, _currentNode, isMax);


                  

                    if(_currentNestedList != undefined && _currentNestedList != null && _currentNestedList.length > 0)
                    {

                        //// Dalın parenti ile olan bağını koparmak için
                        if(isMax)
                        {
                            // if( _currentNode._maxParentNodeEdge._id == 10)
                            // {
                            //     console.log("tt");
                            // }
                            _currentNode._maxParentNodeEdge._cutCount++;
                        }
                        else
                        {
                            // if( _currentNode._minParentNodeEdge._id == 10)
                            // {
                            //     console.log("tt");
                            // }
                            _currentNode._minParentNodeEdge._cutCount++;
                        }

                        /// Dalın kirişlerini koparmak için
                        var edges = this._edgeList.filter(function (el) {
                            var row = el._node1._id == _currentNode._id || el._node2._id == _currentNode._id;
                            return row;
                        });

                        for (let t = 0; t < edges.length; t++) {
                            const ed = edges[t];
    
                            // if(ed._id == 11)
                            // {
                            //     console.log("tt");
                            // }

                            
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
                                            // if(el._id == 11)
                                            // {
                                            //     console.log("tt");
                                            // }
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
                                // if(el._id == 11)
                                // {
                                //     console.log("tt");
                                // }
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

        if(node._id == 8)
        {
            console.log("tt");
        }
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
