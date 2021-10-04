// get ranked dictionary of entries
var rescookie = Cookies.get('results')
var res = JSON.parse(rescookie);
// make list of keys from highest value to lowest 
var result = Object.keys(res).sort(function(a, b) {
    return res[b] - res[a];
})

//Add table rows and columns according to the number and rank of entries
$('.tableBody').each(function(key, el){
    for ( var i = 1; i < result.length+1; i++ ) {
        $(this).append('<tr class="bodyRow"><td>' + '#' + i + '</td><td class="option"></td></tr>');
    }
});

//Add entries to table
let cells = document.querySelectorAll('.option');
for (let i = 0; i < cells.length; ++i) {
    cells[i].innerHTML = result[i];
}

