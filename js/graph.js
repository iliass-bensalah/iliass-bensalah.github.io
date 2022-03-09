class Graph {
    constructor(v_array) {
        this.matrix = [];
        for (var i = 0; i < v_array.length; i++) {
            var neighbors = getNeighbors(v_array[i])
            var line = []
            for (var j = 0; j < v_array.length; j++) {
                var found = false
                if (i == j) {
                    line.push(0)
                }
                else {
                    for (var k = 0; k < neighbors.length; k++) {
                        if (neighbors[k].includes(v_array[j])) {
                            line.push(neighbors[k][1])
                            found = true
                        }
                    }
                    if (!found) {
                        line.push(Infinity)
                    }
                }
            }
            this.matrix.push(line)
        }
        console.log(this.matrix)
        out.setTable(this.matrix)
    }
}