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
let toggleAddVertex = false;
let found = false
let dijkstra_success = true;
let drag
let new_v1, new_v2;
let canv = new Canvas(c);

function downListener(){
  drag = false
}
document.addEventListener('mousedown', downListener)
function moveListener() {
    if(!drag){
        new_v1 = [window.event.clientX, window.event.clientY]
    }
    drag = true

}
document.addEventListener('mousemove', moveListener)
function upListener(){
  if (drag) {
    
    if (toggleAddVertex) {
        document.getElementById("toggle").innerText = "Add Vertex OFF";
        toggleAddVertex = !toggleAddVertex
    }

    new_v2 = [window.event.clientX, window.event.clientY]
    for(var i = 0; i < canv.verteces.length; i++){
        if (new_v1[0] > canv.verteces[i].x - r && new_v1[0] < canv.verteces[i].x + r && new_v1[1] > canv.verteces[i].y - r && new_v1[1] < canv.verteces[i].y + r){
            document.getElementById("v1").value = canv.verteces[i].name;
        }

        if (new_v2[0] > canv.verteces[i].x - r && new_v2[0] < canv.verteces[i].x + r && new_v2[1] > canv.verteces[i].y - r && new_v2[1] < canv.verteces[i].y + r){
            document.getElementById("v2").value = canv.verteces[i].name;
        }
    }
    console.log(new_v1);
    console.log(new_v2);
  }
}
document.addEventListener('mouseup', upListener)

function getPath() {
    found = false;
    dijkstra_success = true;
    out.reset();
    var s_start = document.getElementById("start").value;
    var s_end = document.getElementById("end").value;
    var algo = document.getElementById("algo").value;
    // get the objects
    var v_start = getVertex(s_start);
    var v_end = getVertex(s_end);
    g = new Graph(canv.verteces)
    console.log(g)
    if (v_start != null && v_end != null) {
        selectAlgo(algo, v_start, v_end);
    }
    else{
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

function getPosition() {
    var x = window.event.clientX;     // Get the horizontal coordinate
    var y = window.event.clientY;     // Get the vertical coordinate

    document.getElementById("vx").value = x;
    document.getElementById("vy").value = y;

    if (toggleAddVertex) {
        var x = Number(document.getElementById("vx").value);
        var y = Number(document.getElementById("vy").value);
        canv.addVertex(x,y);
    }
}

function addVertex() {
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
    console.log("addEdge()", v1, v2, weight);
    v1 = null;
    v2 = null;
    for (var i = 0; i < canv.verteces.length; i++) {
        if (canv.verteces[i].name == v1_name) {
            v1 = canv.verteces[i];
        }
        if (canv.verteces[i].name == v2_name) {
            v2 = canv.verteces[i];
        }
    }
    if (v1 != null && v2 != null && v1 != v2) {
        var edge = new Edge(v1, v2, weight);
        console.log(edge);
        canv.addEdge(edge);
    }
}