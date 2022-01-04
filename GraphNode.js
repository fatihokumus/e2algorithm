

class GraphNode {
    
    _id; // sıralama için
    _label;
    _parentNode; // ağacı oluşturmak için
    _degree; // düğüm derecesi
    _level; // ağaçtaki seviyesi
    _queeIndex; // Kuyruktaki sırası (ağaca girme sırası)
    _parentNodeEdge; //Ağaca girdikten sonra ata düğümle yaptığı kenar bağlantısı (hızlı ulaşmak için)
    _isInTree; // ağaca girmişse tekrar bakmamak için

    constructor(label, id) {
        this._label = label;
        this._id = id;
        this._isInTree = false;
        this._degree = 0;
        this._level =0;
    }
    
    get nestedList() {
        return 0;
    }

    get linkedNodes() {
        return 0;
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
