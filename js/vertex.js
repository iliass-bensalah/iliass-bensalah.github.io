class Vertex {

    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.parent = null;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, r, 0, Math.PI * 2, false);
        c.lineWidth = 1;
        c.stroke();
        console.log(this.x, this.y, r, this.name)
        c.strokeStyle = 'black';
        c.font = '10px serif';
        c.fillText(this.name, this.x - 3, this.y + 3);
    }
}