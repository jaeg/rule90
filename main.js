var canvas = document.getElementById("main");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
var ctx = canvas.getContext("2d");

var width = 640;
var height = 480;
var tileSize = 32;

var engine = {
  world: [], //0 - dead 1 - wire 2 - head 3 - tail
  running: false,
  init: function() {
    for (var x = 0; x < width/tileSize; x++) {
      this.world[x] = [];
      for (var y = 0; y < height/tileSize; y++) {
        this.world[x][y] = 0;
      }
    }
  },
  update: function() {
    for (var y = height/tileSize - 1; y > 0; y--) {
      for (var x = 0; x < width/tileSize; x++) {
        a = 0
        b = 0
        if (x > 0) {
          a = this.world[x-1][y]
        }
        
        if (x < this.world.length -1) {
          b = this.world[x+1][y]
        }
        
        if ((!a && b) || (a && !b)) {
          this.world[x][y - 1] = 1;
        }
      }
    }

  },
  draw: function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var x = 0; x < this.world.length; x++) {
      for (var y = 0; y < this.world[x].length; y++) {
        if (this.world[x][y] === 0) {
          ctx.fillStyle = 'black';
          ctx.fillRect(x * tileSize,y * tileSize,tileSize,tileSize);
        }
        else if (this.world[x][y] === 1) {
          ctx.fillStyle = 'blue';
          ctx.fillRect(x * tileSize,y * tileSize,tileSize,tileSize);
        }
        else if (this.world[x][y] === 2) {
          ctx.fillStyle = 'red';
          ctx.fillRect(x * tileSize,y * tileSize,tileSize,tileSize);
        }
        else if (this.world[x][y] === 3) {
          ctx.fillStyle = 'yellow';
          ctx.fillRect(x * tileSize,y * tileSize,tileSize,tileSize);
        } 
        else {
          console.log(this.world[x][y])
        }
      }
    }
    
  }
}

function onClick(event) {
  var x = event.offsetX;
  var y = event.offsetY;
  
  var cellX = Math.floor(x / tileSize);
  var cellY = Math.floor(y / tileSize);
  
  if (engine.world[cellX][cellY] === 0) {
    engine.world[cellX][cellY]  = 1
    return;
  }
  
  if (engine.world[cellX][cellY] === 1) {
    engine.world[cellX][cellY]  = 0
    return;
  } 
}


function update() {
  engine.update();
  //setTimeout(update, 300);
}

function draw() {
  engine.draw();
  window.requestAnimationFrame(draw);
}

engine.init()
draw()
update()
