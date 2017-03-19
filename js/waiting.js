function cancel(e) {
     e.preventDefault();
     location.href = 'register.html';
 }

 window.onload = function(){
     document.getElementById('progress').className += " progress-bar-wide";
 };

 setTimeout(function(){

     var element = document.getElementById('progress');
     element.className += " progress-bar-success";
     element.classList.remove("active");
     element.classList.remove("progress-bar-striped");
     element.textContent = "Ready";

     document.getElementById('cancel-btn').className += " display-none";

     setTimeout(function(){
         location.href = "game.html";
     }, 1000);
 }, 5000);