var playerPiece
var obstacles = []

// need to create player piece with hitpoints, add property in the item constructor

function startGame () {
  playerPiece = new Item(10, 10, 'white', 10, 120)
  myGamePiece = new Item(30, 30, "smiley.gif", 10, 120, "image")
  playerPiece.gravity = 0.05
  gameMap.start()
}

var gameMap = {
  canvas: document.createElement('canvas'),
  start: function () {
    this.canvas.width = 480
    this.canvas.height = 270
    this.context = this.canvas.getContext('2d')
    this.canvas.style = 'position:absolute; left: 45%; width: 560px; margin-left: -200px; margin-top: 50px'
    document.body.insertBefore(this.canvas, document.body.childNodes[0])
    this.frameNo = 0
    this.interval = setInterval(updateGame, 20)
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

function Item (width, height, color, x, y, type) {
  this.type = type
  this.width = width
  this.height = height
  this.speedX = 0
  this.speedY = 0
  this.x = x
  this.y = y
  this.gravity = 0
  this.gravitySpeed = 0
  this.update = function () {
    ctx = gameMap.context
    if (this.type === "text") {
        ctx.font = this.width + " " + this.height
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y)
    } else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    } // create arc option and image option for later use
  }
  this.newPos = function () {
    this.gravitySpeed += this.gravity
    this.x += this.speedX
    this.y += this.speedY + this.gravitySpeed
    this.hitBottom()
  }
  this.hitBottom = function() {
    var bottom = gameMap.canvas.height - this.height
    if (this.y > bottom) {
      this.y = bottom
      this.gravitySpeed = 0
    }
  }
    // default for collide should be true. to do - add minus playerPiece hit points when collide
  this.collision = function(item) {
        var playerLeft = this.x;
        var playerRight = this.x + (this.width);
        var playerTop = this.y;
        var playerBottom = this.y + (this.height);
        var itemLeft = item.x;
        var itemRight = item.x + (item.width);
        var itemTop = item.y;
        var itemBottom = item.y + (item.height);
        var collide = true;
        if ((playerBottom < itemTop) || (playerTop > itemBottom) || (playerRight < itemLeft) || (playerLeft > itemRight)) {
            collide = false
        }
      return collide
    }
}

function updateGame () {
  var x, height, gap, minHeight, maxHeight, minGap, maxGap
  for (var i = 0; i < obstacles.length; i += 1) {
    if (playerPiece.collision(obstacles[i])) {
      return
    }
  }
    gameMap.clear()
    gameMap.frameNo += 1
    if (gameMap.frameNo == 1 || interval(150)) {
        x = gameMap.canvas.width
        minHeight = 60
        maxHeight = 170
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight)
        minGap = 20
        maxGap = 80
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap)
        obstacles.push(new Item(10, height, 'white', x, 0))
        obstacles.push(new Item(10, x - height - gap, 'white', x, height + gap))
    }
    for (i = 0; i < obstacles.length; i += 1) {
        obstacles[i].x += -1
        obstacles[i].update()
    }
    playerPiece.newPos()
    playerPiece.update()
}

function interval (n) {
  if ((gameMap.frameNo / n) % 1 === 0) {
    return true
  }
  return false
}

function accelerate(n) {
    playerPiece.gravity = n;
}

startGame ()
