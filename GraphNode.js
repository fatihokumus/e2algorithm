

class GraphNode {
    
    _id; // sıralama için
    _label;
    _parentNode; // ağacı oluşturmak için
    _degree; // düğüm derecesi
    _level; // ağaçtaki seviyesi
    _queeIndex; // Kuyruktaki sırası (ağaca girme sırası)
    _parentNodeEdge; //Ağaca girdikten sonra ata düğümle yaptığı kenar bağlantısı (hızlı ulaşmak için)
    _isInTree; // ağaca girmişse tekrar bakmamak için

    constructor(label) {
        this._label = label;
    }
    
    get nestedList() {
        return 0;
    }

    get linkedNodes() {
        return 0;
    }
  
  }


  
  module.exports = GraphNode