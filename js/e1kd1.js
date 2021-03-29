google.maps.event.addDomListener(window, 'load', function (){
var options={
componentRestrictions: {country: ['fr','be','lu','gp','re']},
types:['address']
};
var places=new google.maps.places.Autocomplete(document.getElementById('address_search'),options);
});