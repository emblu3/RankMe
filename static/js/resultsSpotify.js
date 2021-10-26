//get Spotify list
var mycookie = Cookies.get('entries')
var options = JSON.parse(mycookie);


//Add table rows and columns according to the number and rank of entries
$('.tableBody2').each(function(key, el){
    for ( var i = 1; i < options.length+1; i++ ) {
        $(this).append('<tr class="bodyRow2"><td>' + '#' + i + '</td><td class="optSpotify"></td></tr>');
    }
});

//Add entries to table
let cells2 = document.querySelectorAll('.optSpotify');
for (let i = 0; i < cells2.length; ++i) {
    cells2[i].innerHTML = options[i];
}

// animate table display
$("table .bodyRow2").hide();
$("table .bodyRow2").each(function(index){
    $(this).delay(index*250).show(500);
});


var maxHeight2 = 0;

// loop through and keep track of biggest height
$(".bodyRow2").each(function(index) {
    if($(this).height() > maxHeight2) {
        maxHeight2 = $(this).height();
    };
});


// set all elements to the biggest height
$(".bodyRow2 td").height(maxHeight2+20);
$(".bodyRow td").height(maxHeight2+20);



