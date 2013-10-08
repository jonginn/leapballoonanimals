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

		// RESET
		function reset(){
			if((isBalloonBeingMade == true) && (handsLength == 0) && (balloonSuccess == true)){
				$("#success").hide();
				$("#video").fadeIn();
				$("#making").hide();
				isBalloonBeingMade = false;
				balloonSuccess = false;
			}
		}

		// if interval is under a certain amount warn the user they haven't finished

		if((balloonSuccess == false) && (handsLength >= 2) && (isBalloonBeingMade == false)){
			isBalloonBeingMade = true;
			$("#video").hide();
			$("#making").show();
			$("#onehand").hide();
			$("#twohands").fadeIn('fast');
			sound.loop = true;
			sound.play();
			// play random balloon noises
		} else if((balloonSuccess == false) && (handsLength == 1) && (isBalloonBeingMade == false)){
			$("#onehand").fadeIn('fast');
			$("#video").hide();
			$("#twohands").hide();
		}

		if((isBalloonBeingMade == true) && (handsLength == 0) && (balloonSuccess == false)){

			var numRand = Math.floor(Math.random()*5);

			balloonbg = "url('img/balloons/"+numRand+".jpg')";
			$("#success").css('background-image', balloonbg);
			$("#success").fadeIn();
			$("#making").hide();
			$("#twohands").hide();
			sound.pause();
			successSound.loop = false;
			successSound.play()
			balloonSuccess = true;

			setTimeout(function() {   //calls click event after a certain time
			   reset();
			}, 5000);
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