window.addEventListener('load', function () {
    document.getElementById("rose1").value = "11-11-10-10";
    document.getElementById("rose2").value = "11-11-10-10";
});

function cross(pair1, pair2) {
    combinations = [];
    for (var gene1 of pair1) {
        for (var gene2 of pair2) {
            var newPair = gene1+gene2;
            var newPair = ((newPair == "01") ? '10' : newPair);
            combinations.push(newPair);
        }
    }
    return combinations;
}

function makeBBs() {
    var rose1vals = document.getElementById("rose1").value.split('-');
    var rose2vals = document.getElementById("rose2").value.split('-');
    var rose1 = {r:rose1vals[0], y:rose1vals[1], w:rose1vals[2], s:rose1vals[3]};
    var rose2 = {r:rose2vals[0], y:rose2vals[1], w:rose2vals[2], s:rose2vals[3]};
    //var rose2 = {r:"00", y:"00", w:"10", s:"00"};
    var roseBB = {r:cross(rose1.r, rose2.r), y:cross(rose1.y, rose2.y), w:cross(rose1.w, rose2.w), s:cross(rose1.s, rose2.s)};
    
    var BBs = [];
    for (var r of roseBB.r) {
        for (var y of roseBB.y) {
            for (var w of roseBB.w) {
                for (var s of roseBB.s) {
                    var genes = r+'-'+y+'-'+w+'-'+s;
                    BBs.push(genes);
                    output += genes+"<br>";
                }
            }
        }
    }
    
    results = {};
    for (var BB of BBs) {
        if (BB in results) {
            results[BB] += 1;
        }
        else {
            results[BB] = 1;
        }
    }
    
    var output = "";
    for (var [key, value] of Object.entries(results)) {
        output += key+" : "+(value/BBs.length)*100+"%</br>";
    }
    
    console.log(BBs);
    document.getElementById("output").innerHTML = output;
}