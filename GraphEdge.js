class GraphEdge {
    _id; // sıralama için
    _label;
    _node1;
    _node2; 
    _isChord; // kiriş mi
    _cutCount; // kesme sayısı

    constructor(label, node1, node2) {
        this._label = label;
        this._node1 = node1;
        this._node2 = node2;
    }
  }

  module.exports = GraphEdge