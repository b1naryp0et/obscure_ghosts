$(window).ready (function () {
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";

  // When the user clicks on the button, open the modal
  // btn.onclick = function() {
  // 	modal.style.display = "block";
  // }

  // when the user clicks on <span> (x), close the modal
  // span.onclick = function() {
  // 	modal.style.display = "none";
  // }

  //make sure you have lower case "o"
  //let sound = document.getElementById("opening");
  //sound.currentTime = 0;
  //sound.loop = true; //if you want it to restart playing automatically when it ends
  //sound.play();

  var that = this;
  setTimeout(function() {
    modal.style.display = "none";
  }, 5000);

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  // var player = document.getElementById("opening");
  // player.play;
});
