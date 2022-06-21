
var _maxCount;
var _currentNode; // seçilen düğüm
var _currentEdge; // seçilen düğüm
var _cNode; // Seçilen düğüme komşu düğüm
var _firstNode; // ilk düğüm
var minDegree; // Başlangıç değeri olabilecek en yüksek sayı
var maxImportance; // Başlangıç değeri olabilecek en yüksek sayı
var isNodeExist;
var findedNode;
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
        _firstNode = maxDegreeNode;
        this.AddPath();
        
        _currentNode = maxDegreeOtherNode;
        this.AddPath();

        var isNodeExist = true;
        while (isNodeExist) {
            var lastNode = this.CheckLastNode();
            if(lastNode ==null)
                isNodeExist = this.GetMinDegreeNeighbour();
            else
            {
                _currentNode = lastNode;
                isNodeExist = true;
            }
            
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

        node._isInPath = true;
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

    CheckLastNode()
    {
        var countfiltered = this._nodeList.filter(function(element){
            return element._isInPath == false;
        });
        
        if(countfiltered.length == 2)
        {
            var node1= countfiltered[0];

            var node2= countfiltered[1];

            var node1Last = node1._neighbours.some(e => e._id === _firstNode._id);
            
            var node2Last = node2._neighbours.some(e => e._id === _firstNode._id);
            
            if(node1Last == true)
                return node2;
            else if(node2Last == true)    
                return node1;
            else
                return null;

        }
        else
            return null;

    }
    GetMinDegreeNeighbour()
    {
        var edgeList = this._edgeList.filter(function (el) {
            var row = el._node1._id == _currentNode._id || el._node2._id == _currentNode._id;
            return row;
        });


        minDegree = this._orgNodeList.length; // Başlangıç değeri olabilecek en yüksek sayı
        maxImportance = minDegree * minDegree; // Başlangıç değeri olabilecek en yüksek sayı
        isNodeExist = false;

        for (let i = 0; i < edgeList.length; i++) {
            _currentEdge = edgeList[i];

            // var findedEdge = this._edgeList.filter(function (nl) {
            //     return nl._id == _currentEdge._id;
            // })[0];



            _cNode = null;
            if(_currentEdge._node1._id == _currentNode._id)
            {
                _cNode = _currentEdge._node2;
            }
            else
            {
                _cNode = _currentEdge._node1;
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
                    maxImportance = nodeImportance;
                    isNodeExist = true;
                }
                else if(fNode._degree == minDegree)
                {
                    if(nodeImportance < maxImportance)
                    {
                        findedNode = fNode;
                        maxImportance = nodeImportance;
                        isNodeExist = true;
                    }
                }

                // if(nodeImportance < maxImportance)
                // {
                //      findedNode = fNode;
                //      maxImportance = nodeImportance;
                //      isNodeExist = true;
                // }
                //  else if(nodeImportance == maxImportance)
                // {
                //     if(fNode._degree < minDegree)
                //     {
                //         minDegree = fNode._degree;
                //         findedNode = fNode;
                //         maxImportance = nodeImportance;
                //         isNodeExist = true;
                //     }
                // }
            }
        }

        _currentNode = findedNode;
        
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

            // const isInPath = this._path.some(e => e._id === neighbour._id);

            // if(isInPath == false)
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
