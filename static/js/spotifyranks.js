// store the entries to transfer to next page
$('#artistLong').on('click', function(){
  var entries = JSON.stringify(artists_long)
  Cookies.set('entries', entries)
});
$('#artistMedium').on('click', function(){
  var entries = JSON.stringify(artists_medium)
  Cookies.set('entries', entries)
});
$('#artistShort').on('click', function(){
  var entries = JSON.stringify(artists_short)
  Cookies.set('entries', entries)
});
$('#songLong').on('click', function(){
  var entries = JSON.stringify(songs_long)
  Cookies.set('entries', entries)
});
$('#songMedium').on('click', function(){
  var entries = JSON.stringify(songs_medium)
  Cookies.set('entries', entries)
});
$('#songShort').on('click', function(){
  var entries = JSON.stringify(songs_short)
  Cookies.set('entries', entries)
});