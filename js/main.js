var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth * 0.63;
canvas.height = window.innerHeight * 0.994;
console.log(canvas);
var c = canvas.getContext("2d");

let r = 16;
let out = new Output();
let discovered = [];
let dijkstra_unvisited = [];
let graph = null;
let max_vertex = 26;
let curr_vertex = 0;
let toggleAddVertex = true;
let toggleAddEdge = false;
let inputV1 = false;
let inputV2 = false;
let inputStart = false;
let inputEnd = false;
let found = false
let dijkstra_success = true;
let drag
let new_v1, new_v2;
let canv = new Canvas(c);
let mouseClick = false;
let vInputStart = document.getElementById("v1");
let vInputEnd = document.getElementById("v2");
let vSelStart = document.getElementById("start");
let vSelEnd = document.getElementById("end");

function downListener() {
    new_v1 = null;

    if (window.event.clientX < canvas.width && window.event.clientY < canvas.height){
        mouseClick = true;
        new_v1 = [window.event.clientX, window.event.clientY]
    }
    drag = false
}
document.addEventListener('mousedown', downListener)

function moveListener() {

    drag = true
    if (mouseClick && drag) {
        if (!!new_v1)
        drawProvisoryLine(new_v1);
    }
}

function drawProvisoryLine(v1) {
    canv.draw()
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(v1[0], v1[1]);
    c.lineTo(window.event.clientX, window.event.clientY);
    c.strokeStyle = "gray";
    c.lineWidth = 2;
    c.stroke();

}
document.addEventListener('mousemove', moveListener)

function upListener() {
    if (mouseClick){
        if (!!new_v1){
            let closest_vertex = canv.getClosestVertex(new_v1[0], new_v1[1]);
            if (!!closest_vertex){ 
                if (inputV1){
                    vInputStart.value = closest_vertex.name;
                    inputV1 = false;
                }
                else if (inputV2){
                    vInputEnd.value = closest_vertex.name;
                    inputV2 = false;
                }
                else if (inputStart){
                    vSelStart.value = closest_vertex.name;
                    inputStart = false;
                }
                else if (inputEnd){
                    vSelEnd.value = closest_vertex.name;
                    inputEnd = false;
                }
            }
        }
    }

    mouseClick = false;   

    if (drag && !toggleAddEdge) {
        new_v2 = [window.event.clientX, window.event.clientY]

        if (!!new_v1){

            let v_start = canv.getClosestVertex(new_v1[0], new_v1[1])

            if (!!v_start){
            
                vInputStart.value = v_start.name
                let v_end = canv.getClosestVertex(new_v2[0], new_v2[1])
                if (!!v_end){
                    
                    vInputEnd.value = canv.getClosestVertex(new_v2[0], new_v2[1]).name
                }
        }

        console.log(new_v1);
        console.log(new_v2);

        }
    }
    else if (toggleAddVertex){
        addVertex();
    }

    drag = false;
}
document.addEventListener('mouseup', upListener)

function setV1() {
    inputV1 = true;
    inputV2 = false;
    inputStart = false;
    inputEnd = false;
}

function setV2() {
    inputV1 = false;
    inputV2 = true;
    inputStart = false;
    inputEnd = false;
}

function setStart() {
    inputV1 = false;
    inputV2 = false;
    inputStart = true;
    inputEnd = false;
}

function setEnd() {
    inputV1 = false;
    inputV2 = false;
    inputStart = false;
    inputEnd = true;
}
vInputStart.addEventListener('mousedown', setV1)
vInputEnd.addEventListener('mousedown', setV2)
vSelStart.addEventListener('mousedown', setStart)
vSelEnd.addEventListener('mousedown', setEnd)


function getPath() {
    found = false;
    dijkstra_success = true;
    out.reset();
    var sel_start = document.getElementById("start").value.toUpperCase();
    var sel_end = document.getElementById("end").value.toUpperCase();
    var algo = document.getElementById("algo").value;
    // get the objects
    var v_start = getVertex(sel_start);
    var v_end = getVertex(sel_end);
    g = new Graph(canv.verteces)
    console.log(g)
    if (v_start != null && v_end != null) {
        selectAlgo(algo, v_start, v_end);
    }
    else {
        throw new Error("Node not found")
    }
}

function selectAlgo(algo, v_start, v_end) {
    switch (algo) {
        case 'breadth':
            out.set("BFS");
            breadthFirstSearch(v_start, v_end);
            break;
        case 'dijkstra':
            out.set("Dijkstra");
            dijkstra(g, v_start, v_end);
            break;
        case 'depth':
            out.set("DFS");
            resetDFS();
            depthFirstSearch(g, v_start, v_end);
            if (found) {
                dfsPath(v_end);
            }
            else {
                out.set("No way found");
            }
            break;
        default:
            out.set("Error");
    }
    out.print();
}

function getVertex(str) {
    for (var i = 0; i < canv.verteces.length; i++) {
        if (canv.verteces[i].name == str) {
            return canv.verteces[i]
        }
    }
    return null;
}

function getNeighbors(v) {
    var neighbors = []
    for (var i = 0; i < canv.edges.length; i++) {
        if (v == canv.edges[i].v1) {
            neighbors.push([canv.edges[i].v2, canv.edges[i].weight])
        }
        else if (v == canv.edges[i].v2) {
            neighbors.push([canv.edges[i].v1, canv.edges[i].weight])
        }
    }
    return neighbors
}

function addVertex() {

    if (toggleAddVertex && !!new_v1) {
        canv.addVertex(new_v1[0], new_v1[1]);
    }
}

function toggleVertex() {
    toggleAddVertex = !toggleAddVertex;
    if (toggleAddVertex) {
        document.getElementById("toggle").innerText = "Add Vertex ON"
    }
    else document.getElementById("toggle").innerText = "Add Vertex OFF"
}

function addEdge() {
    var v1_name = document.getElementById("v1").value;
    var v2_name = document.getElementById("v2").value;
    var weight = Number(document.getElementById("weight").value);

    let v1 = canv.getVertexByName(v1_name)
    let v2 = canv.getVertexByName(v2_name)
    
    if (v1 != null && v2 != null && v1 != v2) {
        var edge = new Edge(v1, v2, weight);
        console.log(edge);
        canv.addEdge(edge);
    }
}