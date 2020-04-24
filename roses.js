window.addEventListener('load', function () {
    document.getElementById("rose1").value = "11-11-10-10";
    document.getElementById("rose2").value = "11-11-10-10";
});

function cross(gene1, gene2) {
    genes = [];
    for (var allele1 of gene1) {
        for (var allele2 of gene2) {
            var newGene = allele1+allele2;
            var newGene = ((newGene == "01") ? '10' : newGene);
            genes.push(newGene);
        }
    }
    return genes;
}

function getColor(genome) {
    genes = genome.split('-');

    if (genes[0] != '00') {
        if (genes[0] == '11' && genes[1] == '11' && genes[2] == '00' && genes[3] == '00') {
            return 'blue';
        }
        else if (genes[3] == '11') {
            return 'pink';
        }
        else if (genes[3] == '00') {
            if (genes[1] != '00') {
                return 'orange';
            }
            else {
                return 'black';
            }
        }
        else {
            return 'red';
        }
    }
    else {
        if (genes[1] != '00') {
            return 'yellow';
        }
        else {
            if (genes[2] != '00') {
                return 'white';
            }
            else {
                return 'purple';
            }
        }
    }
}

function makeBBs() {
    var rose1vals = document.getElementById("rose1").value.split('-');
    var rose2vals = document.getElementById("rose2").value.split('-');
    var rose1 = {r:rose1vals[0], y:rose1vals[1], w:rose1vals[2], s:rose1vals[3]};
    var rose2 = {r:rose2vals[0], y:rose2vals[1], w:rose2vals[2], s:rose2vals[3]};
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
    
    results = [];
    for (var BB of BBs) {
        if (BB in results) {
            results[BB] += 1;
        }
        else {
            results[BB] = 1;
        }
    }

    for (var [genome, count] of Object.entries(results)) {
        results[genome] = (count/BBs.length)*100;
    }

    var sorted = Object.keys(results).map(function(key) {
        return [key, results[key]];
    });
  
    sorted.sort(function(first, second) {
        return second[1] - first[1];
    });

    var output = "<table>";
    for (var [genome, odds] of sorted) {
        var color = getColor(genome);
        output += '<tr><td class="genome">'+genome+' </td><td class="percent">: '+odds+"% ("+color+")</td></tr>";
    }
    output += "</table>";
    
    console.log(BBs);
    document.getElementById("output").innerHTML = output;
}