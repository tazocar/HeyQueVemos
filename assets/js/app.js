$(document).ready(function(){
    $('.carousel').carousel();
    $('.modal').modal();
    $(".button-collapse").sideNav();
});
      
(function (){ //iife una expresion de funcion invocada inmediatamente (function)
    const config = {
    apiKey: "AIzaSyD1gA2Rpy3DO0FGZfeyFaRmGEfIuN4FodQ",
    authDomain: "safe-go.firebaseapp.com",
    databaseURL: "https://safe-go.firebaseio.com",
    projectId: "safe-go",
    storageBucket: "safe-go.appspot.com",
    messagingSenderId: "342295071182"
};

firebase.initializeApp(config);

//const: variable no va a cambiar , puedo agregar cosas // let: variable que si se puede cambiar
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnSalir = document.getElementById('btnSalir');
const btnVolver = document.getElementById('btnVolver');
const txtEmailRegistration = document.getElementById('txtEmailRegistration');
const txtPasswordRegistration = document.getElementById('txtPasswordRegistration');

//agregando evento al btnLogin
btnLogin.addEventListener('click', e => {
    //pasos para obtener correo y contraseña
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const email1 = txtEmailRegistration.value;
    const pass1 = txtPasswordRegistration.value;
    const auth = firebase.auth();
    //para ingresar 
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch( e => console.log(e.menssage));
});


btnVolver.addEventListener('click', e => {
  $('#thirdSection').hide();
  $('#second').show();
});


//pasos para poder afiliarte con correo y contraseña
btnSignUp.addEventListener('click', e => {   
    //pasos para obtener correo y c ontraseña
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const email1 = txtEmailRegistration.value;
    const pass1 = txtPasswordRegistration.value;
    const auth = firebase.auth();
    //para ingresar 
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise//utilizamos promise para que nos termine haga una accion .then
    .catch( e => alert(e.message)); //e variable se puuede llamar como quiera
});


//funcion para activar el boton de salir
btnSalir.addEventListener('click', e => {
  firebase.auth().signOut();
})

// ojo Firebase no verifica si el correo es verdadero o exiiste, debemos hacer un objeto aparte
//agregando en tiempo real la autentificacion

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        $('#firstSection').hide();
        $('#secondSection').hide();
        $('#thirdSection').hide();
        $('#fourthSection').show();
        $('#fifthSection').show();
        $('#sixthSection').show();
    if ($('.modal1').modal) $('#modal1').modal('close'); 
    } else {
        $('#firstSection').show();
        $('#secondSection').show();
        $('#thirdSection').show();
        $('#fourthSection').hide();
        $('#fifthSection').hide();
        $('#sixthSection').hide();
    }
 
});

}())

var map;
var infowindow;

function initMap()
{
// Creamos un mapa con las coordenadas actuales
 navigator.geolocation.getCurrentPosition(function(pos) {

 lat = pos.coords.latitude;
 lon = pos.coords.longitude;

 var myLatlng = new google.maps.LatLng(lat, lon);

 var mapOptions = {
   center: myLatlng,
   zoom: 16,
 };

 map = new google.maps.Map(document.getElementById("map"),  mapOptions); //este es el mapa.

 // Creamos el infowindow que nos dara info del pin
 infowindow = new google.maps.InfoWindow();

 // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
 var request = {
   location: myLatlng,
   radius: 5000,
   types: ['museum','park']
 };

 // Creamos el servicio PlaceService y enviamos la petición.
 var service = new google.maps.places.PlacesService(map);

 service.nearbySearch(request, function(results, status) {
   if (status === google.maps.places.PlacesServiceStatus.OK) {
     for (var i = 0; i < results.length; i++) {
       crearMarcador(results[i]);
     }
   }
 });
});
}

function crearMarcador(place)
{
 // Creamos un marcador
 var marker = new google.maps.Marker({
   map: map,
   position: place.geometry.location
 });

// Asignamos el evento click del marcador para que nos muestre la info
 google.maps.event.addListener(marker, 'click', function() {
   infowindow.setContent(place.name);
   infowindow.open(map, this);
 });
 }