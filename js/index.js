$(document).ready(function() {
  var order, turn = false, count = 0;
  var myDelay = 400;
  var thisDelay = 400;
  var start;
  var vm = new Vue({
  el: '.turn-count',
  data: {
    count: '- -'
  }
})
  var colors = {
    green: "#59cc67",
    red: "#f97266",
    yellow: "#d8e26a",
    blue: "#74a2ed"
};
  var sounds = {
    green: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    red: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    yellow: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    blue: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  }
  
   $('.start').on("click", function(){
    vm.count = 0;
    order = [];
    turn = false;
    nextColor();
  });
  
  function start() {
    //console.log("HERHEHREHR");
    vm.count = 0;
    order = [];
    turn = false;
    nextColor();
  }
  
  function nextColor(){
    vm.count += 1;
    var key = Object.keys(colors)[Math.floor(Math.random() * Object.keys(colors).length)];
    //console.log(key);
    order.push(key);
    if(order.length > 20){
      alert("You Win! Lets Play Again!");
      setTimeout(function(){
        $('.start').click();
      },1000);
    }
    else{
      showOrder();
    }
    //console.log(order);
    
    
  }
  
  function showOrder(){
    start = Date.now();
    //while(start < order.length){
    for(var i = 0; i < order.length; i++){
      var curr = order[i];
      glowOrder(curr, i);

    }

    var actual = Date.now() - start;
        // subtract any extra ms from the delay for the next cycle
    thisDelay = (810) * (order.length);
    setTimeout(function(){
    count = 0;
    turn = true;
    }, thisDelay);
      
    
  }

    $('.button').click(function(){
      //console.log("eeeeee");
      //e.preventDefault();
      if(turn){
        if(order[count] == $(this).attr('id') ){
          //console.log("got it");
          glow($(this).attr('id'));
          count++;
          
        }
        else{
          //wrong order
          console.log("nope");
          highlightWrong($(this).attr('id'));
        }
        if(count == order.length){
          turn = false;
          setTimeout(function(){
    //do what you need here
        //console.log(og);
      nextColor();
        
      }, 500);
          
        }
        
      
      } else{
        console.log("not your turn");
      }
      
    })
  
  function glow(x){
     var color = '.' + x;
      var og = colors[x];
      $(color).css('background-color', x);
      var audio = new Audio(sounds[x]);
      audio.play();
      //$(color).css('background-color', colors[order[i]]);
      //console.log(colors[order[i]]);
      setTimeout(function(){
    //do what you need here
        //console.log(og);
       $(color).css('background-color', og);
        
      }, 400);
  }
  
  function glowOrder(x, t){
    var actual = Date.now() - start;
        // subtract any extra ms from the delay for the next cycle
        thisDelay = (myDelay - (actual - myDelay)) * (t+1);
        start = Date.now();
     var color = '.' + x;
      var og = colors[x];
    setTimeout(function(){
    //do what you need here
        //console.log(og);
       $(color).css('background-color', x);
      var audio = new Audio(sounds[x]);
      audio.play();
        
      }, thisDelay);
      
      //$(color).css('background-color', colors[order[i]]);
      //console.log(colors[order[i]]);
      setTimeout(function(){
    //do what you need here
        //console.log(og);
       $(color).css('background-color', og);
        
      }, thisDelay + 400);
  }

  function highlightWrong(x) {
    //glow, sound buzzer, strict ? yes - start() , no - showOrder() 
    
    //https://www.soundjay.com/button/sounds/button-10.mp3
    turn = false;
    var color = '.' + x;
      var og = colors[x];
      $(color).css('background-color', x);
      var audio = new Audio("https://www.soundjay.com/button/sounds/button-10.mp3");
      audio.play();
      //$(color).css('background-color', colors[order[i]]);
      //console.log(colors[order[i]]);
      setTimeout(function(){
    //do what you need here
        //console.log(og);
       $(color).css('background-color', og);
        console.log($('input[name=switch_2]:checked').val());
        if($('input[name=switch_2]:checked').val() == "no"){
          showOrder();
        } else {
          console.log("restart");
          //start();
          $('.start').click();
        }
      }, 400);
  }
  
  
})