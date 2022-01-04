
var _currentObject;
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
        root._level = 0;
        root._parentNode = null;
        treeList[0] = [root];  // ilk elemanın  da dizi olması için
        
        this._maxNodeList.splice(this._maxNodeList.findIndex(v => v._id == root._id), 1); // ağaca eklediğimizi diziden çıkarıyoruz
       

        tempQuee.push(root);
        var i = 0;
        var parentNode = root;

        while(this._maxNodeList.length>0)
        {
            i = parentNode._level + 1;
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
                        child._parentNode = parentNode;
                        child._level = i;
                        child._queeIndex = qi;
                        child._isInTree = true;
                        child._parentNodeEdge = edge;
                        child._degree--;
                        treeList[i].push(child);
                        tempQuee.push(child);
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
                    
                    
                    this._maxNodeList.splice(this._maxNodeList.findIndex(v => v._id == objId), 1); // ağaca eklediğimizi diziden çıkarıyoruz
                    qi++;
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
        root._level = 0;
        root._parentNode = null;
        treeList[0] = [root];  // ilk elemanın  da dizi olması için
        
        this._minNodeList.splice(this._minNodeList.findIndex(v => v._id == root._id), 1); // ağaca eklediğimizi diziden çıkarıyoruz
       

        tempQuee.push(root);
        var i = 0;
        var parentNode = root;

        while(this._minNodeList.length>0)
        {
            i = parentNode._level + 1;
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
                        child._parentNode = parentNode;
                        child._level = i;
                        child._queeIndex = qi;
                        child._isInTree = true;
                        child._parentNodeEdge = edge;
                        child._degree--;
                        treeList[i].push(child);
                        tempQuee.push(child);
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
                    
                    
                    this._minNodeList.splice(this._minNodeList.findIndex(v => v._id == objId), 1); // ağaca eklediğimizi diziden çıkarıyoruz
                    qi++;
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
        for (let s = i-1; s >= 0; s--) {
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
                l= element._level;
            }
            else if(element._degree == i)
            {
                if(element._level < l)
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

        let i = tempQuee.length;

        for (let s = i-1; s >= 0; s--) {
            const element = tempQuee[s];
            if(element._degree < i)
            {
                result = element;
                i= element._degree;
                l= element._level;
            }
            else if(element._degree == i)
            {
                if(element._level < l)
                {
                    result = element;
                    i= element._degree;
                }
            }
        }

        return result;
    }
    
  }
