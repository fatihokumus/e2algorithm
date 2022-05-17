

class GraphNode {
    
    _id; // sıralama için
    _label;
    _maxParentNode; // ağacı oluşturmak için
    _minParentNode; // ağacı oluşturmak için
    _maxChildren; // ağacı oluşturmak için
    _minChildren; // ağacı oluşturmak için
    _degree; // düğüm derecesi
    _maxLevel; // ağaçtaki seviyesi
    _minLevel; // ağaçtaki seviyesi
    _queeIndex; // Kuyruktaki sırası (ağaca girme sırası)
    _maxParentNodeEdge; //Ağaca girdikten sonra ata düğümle yaptığı kenar bağlantısı (hızlı ulaşmak için)
    _minParentNodeEdge; //Ağaca girdikten sonra ata düğümle yaptığı kenar bağlantısı (hızlı ulaşmak için)
    _isInTree; // ağaca girmişse tekrar bakmamak için
    _neighbours;

    constructor(label, id) {
        this._label = label;
        this._id = id;
        this._isInTree = false;
        this._degree = 0;
        this._maxLevel =0;
        this._minLevel =0;
        this._maxChildren =[];
        this._minChildren =[];
        this._neighbours =[];
    }
    
    increaseDegree() {
        if(this._degree == undefined || this._degree == null)
        {
            this._degree = 0;
        }
        this._degree++;
    }

    decreaseDegree() {
        if(this._degree == undefined || this._degree == null)
        {
            this._degree = 0;
        }
        else
        {
            this._degree--;
        }
            
    }

    copy()
    {
        let data = new GraphNode();
        
        for (var attr in this) {
            if (this.hasOwnProperty(attr)) data[attr] = this[attr];
        }

        return data;

    }
  
  }
