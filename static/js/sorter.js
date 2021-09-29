// get list of entries
var mycookie = Cookies.get('entries')
var options = JSON.parse(mycookie);

// make dictionary of entries as keys and set values to 0
var res = options.reduce((acc,curr)=> (acc[curr]=0, acc), {});
var dict_length = Object.keys(res).length



globalThis.list1;
list1 = Object.keys(res);
document.getElementById("leftBtn").innerHTML = list1[0];
document.getElementById("rightBtn").innerHTML = list1[1];


// Selecting left button
function getLeft(){
    // decrease value by -1 for second option
    res[list1[0]] = res[list1[0]] + 0;
    res[list1[1]] = res[list1[1]] - 1;

    // get value of first object
    var sameVal = res[list1[0]]

    // list 2 will have keys for additional items with value of the first option (referenced option)
    var list2 = []
    for(var key in res) {
        if(res[key] === sameVal) {
            list2.push(key)
        }
    }
    // rank remainder of objects with same value against the first option
    list1 = list2

    // continue
    theRest();
}

// Selecting right button
function getRight(){
    // increase value by +1 for second option
    res[list1[0]] = res[list1[0]] + 0;
    res[list1[1]] = res[list1[1]] + 1;

    // get value of first object
    var sameVal = res[list1[0]]

    // list 2 will have keys for additional items with value of the first option (referenced option)
    var list2 = []
    for(var key in res) {
        if(res[key] === sameVal) {
            list2.push(key)
        }
    }

    // rank remainder of objects with same value against the first option
    list1 = list2

    // continue
    theRest();
}

function theRest(){
    // check if all keys with similar values have been ranked
    if (list1.length > 1){
        document.getElementById("leftBtn").innerHTML = list1[0];
        document.getElementById("rightBtn").innerHTML = list1[1];
    }
    else{
        //Make dictionary with values (rank) as the keys and keys (entries) as the values
        duplicate();
        //Get list of current ranks in ascending order
        totalV();
        // End function if each entry has own rank
        ownRank();
        // Get keys of lowest duplicated value
        lowestDuplicate();
        //Adjust dictionary values that aren't being ranked so they aren't reranked in reference to this round's changes
        adjust();
        // Keys of lowest duplicate value will be compared next round
        list1 = duplicatesK;
        document.getElementById("leftBtn").innerHTML = list1[0];
        document.getElementById("rightBtn").innerHTML = list1[1];
    }
}

//Make dictionary with values (rank) as the keys and keys (entries) as the values
function duplicate(){
    globalThis.duplicates
    duplicates = {}
    for (var key in res) {
        if (res.hasOwnProperty(key)){

            if (!(res[key] in duplicates)){
                duplicates[res[key]] = [key];
            }
            else{
                duplicates[res[key]].push(key);
            }
        }
    }
}


//Get list of current ranks in ascending order
function totalV(){
    globalThis.totalValues
    totalValues = []
    for (var key in duplicates){
        totalValues.push(key);
    }
    totalValues.sort();
}

// End function if each entry has own rank
function ownRank(){
    if (dict_length == totalValues.length){
        var results = JSON.stringify(res)
        Cookies.set('results', results)
        location.href = 'results';
    }
}

// Get keys of lowest duplicated value
function lowestDuplicate(){
    globalThis.duplicatesK;
    
    for (var k in duplicates) {
        if (duplicates.hasOwnProperty(k)){

            for (i = 0; i < totalValues.length; i++){
                if (duplicates[k].length > 1 && k == totalValues[i]){

                    for (var key in duplicates) {
                        if (duplicates.hasOwnProperty(key)){

                            if (key==k){
                                duplicatesK = duplicates[key];
                                break;
                            }
                        }
                    }
                }
                else{
                    //pass
                }
            }
        }
    }
}


//Adjust dictionary values that aren't being ranked so they aren't reranked in reference to this round's changes
function adjust(){
    var lowestValue = res[duplicatesK[0]];
    for (var key in res) {
        if (res.hasOwnProperty(key)){

            if (res[key] > lowestValue){
                res[key] = res[key] + 1;
            }
            else if (res[key] < lowestValue){
                res[key] = res[key] - 1;
            }
            else{
                //pass
            }
        }
    }
}