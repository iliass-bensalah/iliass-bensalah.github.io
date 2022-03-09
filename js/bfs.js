function breadthFirstSearch(v_start, v_end) {

    // BFS
    var found = false;
    var finished = false;
    var queue = [];
    var marked = [];
    var str = "";
    queue.push(v_start);
    marked.push(v_start);

    while (!found && !finished) {
        // add neighbours of 1st elem to marked and queue
        for (var i = 0; i < canv.edges.length; i++) {
            if (canv.edges[i].v1.name == queue[0].name && !marked.includes(canv.edges[i].v2)) {
                marked.push(canv.edges[i].v2);
                queue.push(canv.edges[i].v2);
                if (canv.edges[i].v2.parent == null) {
                    canv.edges[i].v2.parent = queue[0];
                }
            }
            else if (canv.edges[i].v2.name == queue[0].name && !marked.includes(canv.edges[i].v1)) {
                marked.push(canv.edges[i].v1);
                queue.push(canv.edges[i].v1);
                if (canv.edges[i].v1.parent == null) {
                    canv.edges[i].v1.parent = queue[0];
                }
            }
        }
        // take 1st element off queue
        console.log('queue:');
        printVertexArray(queue);
        str = "Queue:"
        for (var i = 0; i < queue.length; i++) {
            str = str + " " + queue[i].name
        }
        out.set(str)

        str = "Marked:"
        for (var i = 0; i < marked.length; i++) {
            str = str + " " + marked[i].name
        }
        console.log('marked:');
        printVertexArray(marked);
        out.set(str)
        queue.shift();
        // check if target is in queue
        if (queue.includes(v_end)) {
            found = true;
            out.set('Found');
            dfsPath(v_end);
        }
        if (queue.length == 0) {
            finished = true;
            out.set('Not found');
        }
    }
}