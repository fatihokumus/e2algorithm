
var _maxCount;
var _currentNode;
var _currentOtherNode;
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
        var maxDegreeEdge;
        var maxDegreeOtherNode;

        for (let i = 0; i < maxEdges.length; i++) {
            const element = maxEdges[i];

            if(element._node1._degree > maxDegree)
            {
                maxDegree = element._node1._degree;
                maxDegreeNode = element._node1;
                maxDegreeEdge = element;
                maxDegreeOtherNode = element._node2;
            }
            if(element._node2._degree > maxDegree)
            {
                maxDegree = element._node2._degree;
                maxDegreeNode = element._node2;
                maxDegreeEdge = element;
                maxDegreeOtherNode = element._node1;
                
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

        var edgeList = this._edgeList.filter(function (el) {
            var row = el._node1._id == _currentNode._id || el._node2._id == _currentNode._id;
            return row;
        });

        for (let i = 0; i < edgeList.length; i++) {
            const element = edgeList[i];

            _currentOtherNode = null;
            if(element._node1.id == node._id)
            {
                _currentOtherNode = element._node2;
            }
            else
            {
                _currentOtherNode = element._node1;
            }

            var isIncludePath = this._path.filter(function(el)
            {
                return el._id == _currentOtherNode._id;
            }).length > 0;

            if(isIncludePath == false)
            {
                this._nodeList.filter(function(el){
                    if(el._id == _currentOtherNode._id)
                    {
                        el._degree--;
                    }
                    return 0;
                })[0];
            }
            
            
        }



    }

    GetMinDegreeNeighbour()
    {
        var edgeList = this._edgeList.filter(function (el) {
            var row = el._node1._id == _currentNode._id || el._node2._id == _currentNode._id;
            return row;
        });

        var minDegree = this._orgNodeList.length;
        var isNodeExist = false;
        for (let i = 0; i < edgeList.length; i++) {
            const element = edgeList[i];

            _currentOtherNode = null;
            if(element._node1._id == _currentNode._id)
            {
                _currentOtherNode = element._node2;
            }
            else
            {
                _currentOtherNode = element._node1;
            }

            var isIncludePath = this._path.filter(function(el)
            {
                return el._id == _currentOtherNode._id;
            }).length > 0;

            if(isIncludePath == false)
            {
                if(_currentOtherNode._degree < minDegree)
                {
                    minDegree = _currentOtherNode._degree;
                    _currentNode = _currentOtherNode;
                    isNodeExist = true;
                }
                
            }
            
            
        }

        return isNodeExist;

    }
    
  }
