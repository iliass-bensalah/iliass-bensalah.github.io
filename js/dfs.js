function depthFirstSearch(g, v_start, v_end) {

    // DFS
    // start and get to next node
    // memorize previous node
    // memorize dead ends
    // backtrack and avoid dead ends
    // each backtrack means dead end


    // procedure DFS(G, v) is
    // label v as discovered
    // for all directed edges from v to w that are in G.adjacentEdges(v) do
    //     if vertex w is not labeled as discovered then
    //         recursively call DFS(G, w)

    var idx = getIndexFromVertex(v_start);

    discovered.push(v_start);
    out.set("Discovered node: " + v_start.name);
    for (var i = 0; i < g.matrix[idx].length; i++) {

        if (g.matrix[idx][i] == 0 && idx == i) {
            continue;
        }
        else if (g.matrix[idx][i] == Infinity) {
            continue;
        }
        else if (found) {
            break;
        }
        else {
            var char = String.fromCharCode(65 + i);
            var v = getVertex(char);
            if (!discovered.includes(v)) {
                v.parent = v_start
                depthFirstSearch(g, v, v_end)
            }
            if (v == v_end) {
                found = true
            }

        }
    }
}

function dfsPath(v_end) {
    var str = "Path: ";
    var path = [];
    while (v_end.parent != null) {
        path.push(v_end.name);
        v_end = v_end.parent;
    }
    path.push(v_end.name);
    for (var i = path.length - 1; i >= 0; i--) {
        str = str + " " + path[i];
    }
    out.set(str);
}

function resetDFS(){
    discovered = [];
}