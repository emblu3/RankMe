deleteAllCookies()

// disable start button on load
document.getElementById("startBtn").disabled = true;
var options = [];

// add entries to array 
function addEntry(){

    // must provide an entry
    if (document.getElementById('entryText').value == ''){ 
        window.alert("A blank entry won't work!");
    }
    // add entry to array
    else{
        var entryText = document.getElementById('entryText').value;
        
        // append data to array
        options.push(entryText);
        
        // display entries in browser
        var inval = "";
        for(i = 0; i < options.length; i++){
            inval = inval + options[i] + ", ";
        }
        document.getElementById('inputText').innerHTML = inval 
        
        // reset input field text
        document.getElementById('entryText').value = "";
        
        // focus on input field
        document.getElementById('entryText').focus();
    }
    
    // not allowed to continue until more than 2 entries added
    if (options.length < 2){
        document.getElementById("startBtn").disabled = true;
    }
    // duplicate entries are not allowed
    else if (options[0] == options[1]){
        document.getElementById("startBtn").disabled = true;
        window.alert("It seems you tried to add a duplicate!");
        clearBox('inputText');
    }
    else{
        document.getElementById("startBtn").disabled = false;
    }
}



// Add entries with the ENTER key
//focus on entry field
var input = document.getElementById("entryText");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        // click add button
        document.getElementById("addBtn").click();
    }
});


// clear session storage
function clearBox(elementID){
    document.getElementById(elementID).innerHTML = "";
    sessionStorage.clear();
    options = [];
    document.getElementById("startBtn").disabled = true;
}



function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

// store the entries to transfer to sort page
$('#sortPage').on('click', function(){
    deleteAllCookies()
    var entries = JSON.stringify(options)
    Cookies.set('entries', entries)
});
