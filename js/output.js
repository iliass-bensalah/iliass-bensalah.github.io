class Output {
    constructor() {
        this.str = "";
        this.lineBreak = "<br>";
    }

    set(data) {
        this.str = this.str + this.lineBreak + data
    }

    reset() {
        this.str = "";
    }

    setTable(m) {
        var tbl = "<table>";
        var has_header = false;
        m.forEach(row => {
            if (!has_header){
                tbl = tbl + "<tr>";
                for (var i = 0; i< row.length; i++){
                    tbl = tbl + "<th>" + canv.verteces[i].name +  "</th>"
                }
                tbl = tbl + "</tr>"
                has_header = true;
            }
            tbl = tbl + "<tr>";
            row.forEach(col => {
                tbl = tbl + "<td>" + col +  "</td>"
            })
            tbl = tbl + "</tr>"
        });
        tbl = tbl + "</table>";
        this.str = this.str + tbl
    }

    print() {
        this.str = this.str.replaceAll("Infinity", "∞")
        document.getElementById("output").innerHTML = this.str;
    }
}