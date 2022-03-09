function dijkstra(g, v_start, v_end) {

    var dijkstra_visited = []

    console.log(v_start.name)
    console.log(v_end.name)

    let curr_g = [];
    let line = [];

    start_idx = getIndexFromVertex(v_start)

    for (var j = 0; j < g.matrix[start_idx].length; j++) {
        line.push([g.matrix[start_idx][j], canv.verteces[start_idx].name])
    }
    curr_g.push(line)
    console.log('initial curr_g', curr_g)
    dijkstra_visited.push(v_start.name)

    for (var i = 0; i < g.matrix.length - 2; i++) {
        let smol = [Infinity, dijkstra_visited[dijkstra_visited.lenth - 1]]
        for (var j = 0; j < g.matrix[0].length; j++) {

            if (curr_g[curr_g.length - 1][j][0] < smol[0] && !dijkstra_visited.includes(canv.verteces[j].name)) {
            // if (curr_g[curr_g.length - 1][j][0] < smol[0]) {
                smol = [curr_g[curr_g.length - 1][j][0], canv.verteces[j].name]
            }

        }
        console.log('smol', smol)
        if (typeof smol[1] !== 'undefined' && !dijkstra_visited.includes(smol[1])) {
            console.log('inserting', smol[1], 'into dijkstra_visited...')
            dijkstra_visited.push(smol[1])
            line = []
            for (var k = 0; k < g.matrix[0].length; k++) {
                // if no connection
                if (g.matrix[getIndexFromvName(smol[1])][k] == Infinity) {

                    // then carry over 
                    console.log('carry over inf', [curr_g[curr_g.length - 1][k][0], curr_g[curr_g.length - 1][k][1]])
                    line.push([curr_g[curr_g.length - 1][k][0], curr_g[curr_g.length - 1][k][1]])

                }

                //if connection
                else {

                    // starting node with itself
                    if (g.matrix[getIndexFromvName(smol[1])][k] == 0) {

                        // carry over 
                        console.log('carry over', [curr_g[curr_g.length - 1][k][0], curr_g[curr_g.length - 1][k][1]])
                        line.push([curr_g[curr_g.length - 1][k][0], curr_g[curr_g.length - 1][k][1]])

                    }
                    // previous way is shorter
                    else if (curr_g[curr_g.length - 1][k][0] < Number(g.matrix[getIndexFromvName(smol[1])][k]) + Number(smol[0])) {

                        // carry over 
                        console.log('carry over', [curr_g[curr_g.length - 1][k][0], curr_g[curr_g.length - 1][k][1]])
                        line.push([curr_g[curr_g.length - 1][k][0], curr_g[curr_g.length - 1][k][1]])
                    }
                    // current node with itself
                    else if (curr_g[curr_g.length - 1][k][0] == 0) {

                        // carry over 
                        console.log('carry over', [curr_g[curr_g.length - 1][k][0], curr_g[curr_g.length - 1][k][1]])
                        line.push([curr_g[curr_g.length - 1][k][0], curr_g[curr_g.length - 1][k][1]])
                    }

                    else {
                        // add previous smol
                        console.log('new path', [Number(g.matrix[getIndexFromvName(smol[1])][k]) + Number(smol[0]), smol[1]])
                        line.push([Number(g.matrix[getIndexFromvName(smol[1])][k]) + Number(smol[0]), smol[1]])
                    }
                }
            }
            console.log('line', line)
            // out.set(line)
            curr_g.push(line)
        }

        else if (dijkstra_visited.includes(v_end.name)) {
            dijkstra_success = false;
            dijkstraPath(v_start, v_end, curr_g);
            break;
        }

        else {
            out.set('No Path Found')
            dijkstra_success = false;
            break;
        }
    }

    out.setTable(curr_g);

    if (dijkstra_success){
        dijkstraPath(v_start, v_end, curr_g)
    }
}

function dijkstraPath(v_start, v_end, curr_g) {

    let line = curr_g[curr_g.length-1];
    let start_idx = getIndexFromVertex(v_start);
    let end_idx = getIndexFromVertex(v_end);


    console.log("#", curr_g[curr_g.length-1])
    console.log("##", curr_g[curr_g.length-1][getIndexFromVertex(v_end)])
    console.log("###", curr_g[curr_g.length-1][getIndexFromVertex(v_end)][0])
    // console.log("#", curr_g[curr_g.length-1][getIndexFromVertex(v_end)[0]])

    if (curr_g[curr_g.length-1][getIndexFromVertex(v_end)][0] === Infinity)
        {
            out.set("No Path Found")
            return;
        }

    let v = v_end;
    path = [];

    while (v != v_start){
        path.push(v.name)
        v = getVertex(line[getIndexFromVertex(v)][1])
    }
    path.push(v.name);
    path = path.reverse();

    out.set("Path: " + path)
}