class Canvas {

    constructor(context) {
        this.c = context;
        this.verteces = [];
        this.edges = [];
        this.operations = []
        this.curr_vertex = 0
    }

    addVertex(x, y) {

        if (this.verteces.length >= 26){
            return;
        }

        for (let i = 0; i < this.verteces.length; i++) {
            const ver = this.verteces[i];
            if (x >= ver.x - 2*r && x <= ver.x + 2*r && y >= ver.y - 2*r && y <= ver.y + 2*r){
                return;
            }
        }

        var char = String.fromCharCode(65 + this.curr_vertex);
        var v = new Vertex(x, y, char);
        this.curr_vertex++;

        this.verteces.push(v);
        this.operations.push(0);
        this.draw();
    }

    addEdge(e) {

        for (let index = 0; index < this.edges.length; index++) {
            const edge = this.edges[index];
            if ((edge.v1 == e.v1 && edge.v2 == e.v2) || (edge.v1 == e.v2 && edge.v2 == e.v1)) {
                return;
            }
        }
        this.edges.push(e);
        this.operations.push(1);
        this.draw();
    }

    draw() {
        this.c.clearRect(0, 0, canvas.width, canvas.height);
        this.verteces.forEach(v => {
            v.draw();
        });

        this.edges.forEach(e => {
            e.draw();
        });
    }

    clearEdges() {
        this.edges = [];
        this.draw();
    }

    cancel() {
        if (this.operations[this.operations.length - 1] == 0) {
            this.verteces.pop();
            this.operations.pop();
            this.curr_vertex--;
        }
        else if (this.operations[this.operations.length - 1] == 1) {
            this.edges.pop();
            this.operations.pop();
        }
        this.draw();
    }

    getClosestVertex(x,y){
        for (let i = 0; i < this.verteces.length; i++) {
            const ver = this.verteces[i];
            if (x >= ver.x - r && x <= ver.x + r && y >= ver.y - r && y <= ver.y + r){
                return ver;
            }
        }
        return null;
    }

    getVertexByName(name) {
        for (let i = 0; i < this.verteces.length; i++) {
            const ver = this.verteces[i];
            if (ver.name === name){
                return ver;
            }
        }
        return null;
    }
}