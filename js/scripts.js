/*!
* Start Bootstrap - Landing Page v6.0.0 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

function getInput(){
    var inputArtist = document.getElementById("formArtist").value;
    var inputAlbum = document.getElementById("formAlbum").value;

    console.log("entered: " + inputArtist + " " + inputAlbum);

    searchAlbum(inputArtist, inputAlbum);
}

function searchAlbum(inputArtist, inputAlbum){
    var request = new XMLHttpRequest();

    var myKey = "45674465b4b2e65311b563669f931ebc";
    var url = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key="+ myKey +
    "&artist="+ inputArtist +"&album=" + inputAlbum + "&format=json";

    request.open('GET', url);

    request.onload = function(){
        var data = JSON.parse(this.response);

        if(request.status >= 200 &&request.status < 400){
            var albumName = data.album.name;
            var albumArtist = data.album.artist;
            var albumImage = data.album.image[3]["#text"];
            var albumListeners = data.album.listeners;
            var albumPlaycount = data.album.playcount;
            var albumDate = data.album.wiki.published;
            var albumSummary = data.album.wiki.summary;
            averageColor(albumImage);
            var displayLink = "url('"+ albumImage +"')";

            var info = "Listeners: " + albumListeners + "<br>" + 
            "Playcount: " + albumPlaycount + "<br>" +
            "Published: " + albumDate + "<br><br>" + 
            albumSummary + "<br>";
            
            document.getElementById("displayAlbumImage").style.backgroundImage = displayLink;
            document.getElementById("displayAlbumImage").style.display = 'inline';
            document.getElementById("resultTitle").innerHTML = albumName + " by " + albumArtist;
            document.getElementById("resultInfo").innerHTML = info;

            console.log(albumImage);
        }else{
            console.log("error");
        }

    }

    request.send();
} 

function averageColor(albumImage) {
    const fac = new FastAverageColor();
    fac.getColorAsync(albumImage)
        .then(color => {
            console.log('Average color', color.hex);
            document.getElementById("headBackground").style.backgroundColor = color.hex;
            document.getElementById("button-submit").style.backgroundColor = 'black';
            document.getElementById("button-submit").style.borderColor = 'black';
            document.getElementById("button-signIn").style.backgroundColor = 'black';
            document.getElementById("button-signIn").style.borderColor = 'black';
        })
        .catch(e => {
            console.log(e);
        });
    /*var img = new Image();
    img.src = albumImage;
    img.crossOrigin = "Anonymous";
    var demo = new FastAverageColor();
    var myColor = demo.getColor(img);
    console.log(myColor.hex);*/
}
