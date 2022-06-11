
var _maxCount;
var _currentNode; // seçilen düğüm
var _cNode; // Seçilen düğüme komşu düğüm
class PathFinder {
    _orgNodeList;
    _nodeList;
    _edgeList;
    _path;

    constructor(nodeList, edgeList) {
        this._edgeList = edgeList;
        this._orgNodeList = nodeList;
        this._nodeList = [];
        this._path = [];
        nodeList.forEach(obj => {
            var copy = obj.copy();
            this._nodeList.push(copy);
        });
    }

    Find()
    {
        // Maksimum cutCount a sahip olan kenarlar listelenecek
        // Bu listede degree si maksimum olan düğüme sahip kenar seçilecek
        // Derecesi en yüksek olan noddan kenarın diğer düğümüne doğru yol başlayacak
        // Her gidilen düğümden komşuları içinde derecesi düşük olan seçilerek işleme devam edilecek

        _maxCount = 0;
        for (let i = 0; i < this._edgeList.length; i++) {
            const element = this._edgeList[i];
            if(element._cutCount> _maxCount)
            {
                _maxCount = element._cutCount;
            }
        }

        var maxEdges = this._edgeList.filter(function (el) {
            return el._cutCount == _maxCount;
        });

        var maxDegree = 0;
        var maxDegreeNode;
        var maxDegreeEdge = 0;
        var maxDegreeOtherNode;

        for (let i = 0; i < maxEdges.length; i++) {
            
            const edge = maxEdges[i];

            // Eğer en önemli kenarın iki ucundaki düğüm de aynı dereceye sahipse komşuları ile yaptığı kenarlardaki toplam ağırlığı yüksek olan seçilir.
            if((edge._node1._degree == edge._node2._degree) && (edge._node1._degree > maxDegree || edge._node2._degree > maxDegree))
            {
                var node1Weight = this.GetNodeImportantce(edge._node1);
                
                var node2Weight = this.GetNodeImportantce(edge._node2);
                
                if(node1Weight >= node2Weight)
                {
                    maxDegree = edge._node1._degree;
                    maxDegreeNode = edge._node1;
                    maxDegreeEdge = edge;
                    maxDegreeOtherNode = edge._node2;
                }
                else
                {
                    maxDegree = edge._node2._degree;
                    maxDegreeNode = edge._node2;
                    maxDegreeEdge = edge;
                    maxDegreeOtherNode = edge._node1;
                    
                }
            }
            else
            {
                if(edge._node1._degree > maxDegree)
                {
                    maxDegree = edge._node1._degree;
                    maxDegreeNode = edge._node1;
                    maxDegreeEdge = edge;
                    maxDegreeOtherNode = edge._node2;
                }
                if(edge._node2._degree > maxDegree)
                {
                    maxDegree = edge._node2._degree;
                    maxDegreeNode = edge._node2;
                    maxDegreeEdge = edge;
                    maxDegreeOtherNode = edge._node1;
                    
                }
            }
           
        }


        _currentNode = maxDegreeNode;
        this.AddPath();
        
        _currentNode = maxDegreeOtherNode;
        this.AddPath();

        var isNodeExist = true;
        while (isNodeExist) {
            isNodeExist = this.GetMinDegreeNeighbour();
            if(isNodeExist)
            {
                this.AddPath();
            }
        }

        return this._path;
    }

    AddPath()
    {
       var node = this._nodeList.filter(function(el){
            return el._id == _currentNode._id;
        })[0];

        this._path.push(node);

        this.DecreaseNeighboursDegree(node);

        // var edgeList = this._edgeList.filter(function (el) {
        //     var row = el._node1._id == _currentNode._id || el._node2._id == _currentNode._id;
        //     return row;
        // });

        // for (let i = 0; i < edgeList.length; i++) {
        //     const element = edgeList[i];

        //     _cNode = null;
        //     if(element._node1.id == node._id)
        //     {
        //         _cNode = element._node2;
        //     }
        //     else
        //     {
        //         _cNode = element._node1;
        //     }

        //     var isIncludePath = this._path.filter(function(el)
        //     {
        //         return el._id == _cNode._id;
        //     }).length > 0;

        //     if(isIncludePath == false)
        //     {
        //         var decrease = this._nodeList.filter(function(el){
        //             if(el._id == _cNode._id)
        //             {
        //                 el._degree--;
        //             }
        //             return 0;
        //         });
        //     }
        // }
    }

    GetMinDegreeNeighbour()
    {
        var edgeList = this._edgeList.filter(function (el) {
            var row = el._node1._id == _currentNode._id || el._node2._id == _currentNode._id;
            return row;
        });

        var minDegree = this._orgNodeList.length; // Başlangıç değeri olabilecek en yüksek sayı
        var maxImportance = minDegree * minDegree; // Başlangıç değeri olabilecek en yüksek sayı
        var isNodeExist = false;
        var findedNode;
        var findedEdge;
        for (let i = 0; i < edgeList.length; i++) {
            const element = edgeList[i];

            _cNode = null;
            if(element._node1._id == _currentNode._id)
            {
                _cNode = element._node2;
            }
            else
            {
                _cNode = element._node1;
            }

            var isIncludePath = this._path.filter(function(el)
            {
                return el._id == _cNode._id;
            }).length > 0;

            if(isIncludePath == false)
            {
                var fNode = this._nodeList.filter(function(el){
                    return el._id == _cNode._id;
                })[0];
                 var nodeImportance =   this.GetNodeImportantce(_cNode);

                if(fNode._degree < minDegree)
                {
                    minDegree = fNode._degree;
                    findedNode = fNode;
                    findedEdge = element;
                    maxImportance = nodeImportance;
                    isNodeExist = true;
                }
                else if(fNode._degree == minDegree)
                {
                    if(nodeImportance < maxImportance)
                    {
                        findedNode = fNode;
                        findedEdge = element;
                        maxImportance = nodeImportance;
                        isNodeExist = true;
                    }
                }

                // if(nodeImportance < maxImportance)
                // {
                //      findedNode = fNode;
                //      findedEdge = element;
                //      maxImportance = nodeImportance;
                //      isNodeExist = true;
                // }
                //  else if(nodeImportance == maxImportance)
                // {
                //     if(fNode._degree < minDegree)
                //     {
                //         minDegree = fNode._degree;
                //         findedNode = fNode;
                //         findedEdge = element;
                //         maxImportance = nodeImportance;
                //         isNodeExist = true;
                //     }
                // }
            }
        }

        _currentNode = findedNode;
        if(findedEdge != undefined && findedEdge!= null)
            findedEdge._isInPath = true;

        return isNodeExist;

    }

    GetNodeImportantce(node)
    {
        var importance = 0;
        for (let j = 0; j < node._neighbours.length; j++) {
            const neighbour = node._neighbours[j];
            var findedge = this._edgeList.filter(function (nl) {
                return ((nl._node1._id == node._id && nl._node2._id == neighbour._id) || (nl._node2._id == node._id && nl._node1._id == neighbour._id));
            });

            if(findedge[0]._isInPath == false)
                importance += findedge[0]._cutCount;
        }
        return importance;
    }

    DecreaseNeighboursDegree(node)
    {
        for (let j = 0; j < node._neighbours.length; j++) {
            const element = node._neighbours[j];
           

            var nodeFinded = this._nodeList.filter(function(el){
                return el._id == element._id;
            })[0];

            nodeFinded._degree--;
        }
    }
    
  }
