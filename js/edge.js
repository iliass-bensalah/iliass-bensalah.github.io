class Edge {

    constructor(v1, v2, weight = 1) {
        this.v1 = v1;
        this.v2 = v2;
        this.weight = weight;
    }

    draw() {
        c.lineWidth = 1;
        c.font = '20px serif';
        c.fillText(this.weight, Math.round(this.v1.x + this.v2.x) / 2 + 15, (this.v1.y + this.v2.y) / 2 - 15);
        c.beginPath();
        c.moveTo(this.v1.x, this.v1.y);
        c.lineTo(this.v2.x, this.v2.y);
        c.strokeStyle = "black";
        c.lineWidth = 2;
        c.stroke();
    }
}