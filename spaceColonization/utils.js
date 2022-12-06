function Utils() {
    this.nodes = [];

    this.GenerateNodes = function(n) {
        for (var i = 0; i < n; i++) {
            this.nodes.push(new Node());
          }
          return this.nodes;
    }
}