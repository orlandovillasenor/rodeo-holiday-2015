(function($){
   // javascript goes here
   TweenMax.to('#title', 5, {color:'black', opacity:1});
   TweenMax.to('.lead', 5, {opacity:1})
   
   var tl = new TimelineMax();
   
   tl.to('.globe', 1, {scale: 1.1, delay: 2});
   tl.to('.globe', .1, {
       x: -7
     });
     tl.to('.snowglobe-wrap', .1, {
       repeat: 6,
       x: 7,
       yoyo: true,
       delay: .1
     });
     tl.to('.snowglobe-wrap', .1, {
       x: 0,
       //delay: .1 * 4
     });
   tl.addCallback(doTheSnow, 4);
   tl.to('.globe', 1, {scale: 1});
   tl.to('.intro', 2, {top:50, opacity: 1, delay: 1});
   tl.to('.globe', 1, {opacity: 0, delay: 2});
   tl.to('.intro', 1, {opacity: 0});
   tl.to('.merry-christmas', 1, {top:50, opacity: 1, delay: 1});
   tl.to('.from', 1, {top:330, opacity: 1, delay: 1});
   tl.to('.your-friends', 1, {top:400, opacity: 1, delay: 1});
   tl.to('.hat', 1, {bottom:100, opacity: 1, delay: 1});

   //Create Snow   
   function doTheSnow() {
      
   var particleCount = 600;
   var particleMax   = 1000;
   var sky           = document.querySelector('.sky');
   var canvas        = document.createElement('canvas');
   var ctx           = canvas.getContext('2d');
   var width         = sky.clientWidth;
   var height        = sky.clientHeight;
   var i             = 0;
   var active        = false;
   var snowflakes    = [];
   var snowflake;
   
   canvas.style.position = 'absolute';
   canvas.style.left = canvas.style.top = '0';
   
   var Snowflake = function () {
     this.x = 0;
     this.y = 0;
     this.vy = 0;
     this.vx = 0;
     this.r = 0;
   
     this.reset();
   };
   
   Snowflake.prototype.reset = function() {
     this.x = Math.random() * width;
     this.y = Math.random() * -height;
     this.vy = 1 + Math.random() * 3;
     this.vx = 0.5 - Math.random();
     this.r = 1 + Math.random() * 2;
     this.o = 0.5 + Math.random() * 0.5;
   };
   
   function generateSnowFlakes() {
        snowflakes = [];
        for (i = 0; i < particleMax; i++) {
          snowflake = new Snowflake();
          snowflake.reset();
          snowflakes.push(snowflake);
        }
   }
   generateSnowFlakes();
   
   
   
   function update() {
     ctx.clearRect(0, 0, width, height);
   
     if (!active) {      
       return;
     }
   
     for (i = 0; i < particleCount; i++) {
       snowflake = snowflakes[i];
       snowflake.y += snowflake.vy;
       snowflake.x += snowflake.vx;
   
       ctx.globalAlpha = snowflake.o;
       ctx.beginPath();
       ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
       ctx.closePath();
       ctx.fill();
   
       if (snowflake.y > height) {
         snowflake.reset();
       }
     }
   
     requestAnimFrame(update);
   }
   
   function onResize() {
     width = sky.clientWidth;
     height = sky.clientHeight;
     canvas.width = width;
     canvas.height = height;
     ctx.fillStyle = '#FFF';
   
     var wasActive = active;
     active = width > 0;
   
     if (!wasActive && active) {
       requestAnimFrame(update);
     }
   }
   
   // shim layer with setTimeout fallback
   window.requestAnimFrame = (function() {
     return  window.requestAnimationFrame       ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame    ||
             function( callback ){
               window.setTimeout(callback, 1000 / 60);
             };
   })();
   
   onResize();
   window.addEventListener('resize', onResize, false);
   
   sky.appendChild(canvas);
   
   var gui = new dat.GUI();
   gui.add(window, 'particleCount').min(1).max(particleMax).step(1).name('Particles count').onFinishChange(function() {
      
     requestAnimFrame(update);
   });
   
   };
   
   //End Snow

})(jQuery);
