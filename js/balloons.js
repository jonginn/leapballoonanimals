var interval = 0;
var handsLength = 0;
var isBalloonBeingMade = false;
var balloonSuccess = false;
var timeBallooning = 0;
var balloonbg = null;

var sound = document.getElementById('balloon-noise');
var successSound = document.getElementById('success-noise');

// The code for this is ridiculously simple and probably not very good.

$(document).ready(function() {

	Leap.loop(function(frame) {
		if (frame.hands === undefined ) { 
	      var handsLength = 0 
	    } else {
	      var handsLength = frame.hands.length;
	    }

	    if (interval++ % 24 == 0) {
		    $(".numberOfHands").text(handsLength);
		}

		// if interval is under a certain amount warn the user they haven't finished

		if((balloonSuccess == false) && (handsLength >= 2) && (isBalloonBeingMade == false)){
			isBalloonBeingMade = true;
			$("#making").show();
			sound.loop = true;
			sound.play();
			// play random balloon noises
		}

		if((isBalloonBeingMade == true) && (handsLength == 0) && (balloonSuccess == false)){

			var numRand = Math.floor(Math.random()*5);

			balloonbg = "url('img/balloons/"+numRand+".jpg')";
			$("#success").css('background-image', balloonbg);
			$("#success").fadeIn();
			$("#making").hide();
			sound.pause();
			successSound.loop = false;
			successSound.play()
			balloonSuccess = true;
		}

		 // Further things to add:
		 // * Timer for making
		 // * Better pictures
		 // * Failure state? Messages to keep going?
		 // * After completion allow for a new balloon
		 // * Google Images pull
		 // * Animation thing


	});

});