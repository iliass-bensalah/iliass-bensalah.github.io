function getIndexFromVertex(v) {
    return Number(v.name.charCodeAt(0) - 65)
}

function getIndexFromvName(name) {
    return Number(name.charCodeAt(0) - 65)
}

function printVertexArray(va) {
    for (var i = 0; i < va.length; i++) {
        console.log(va[i].name)
    }
}