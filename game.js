
        var myGamePiece;
        function startGame() {
            myGamePiece = new component(30, 30, "red", 225, 225);
            myGameArea.start();
        }
        var myGameArea = {
            openTiles: [2],
            openCount: 0,
            canvas: document.createElement("canvas"),
            start: function () {
                this.canvas.width = 400;
                this.canvas.height = 400;
                this.context = this.canvas.getContext("2d");
                document.body.insertBefore(this.canvas, document.body.childNodes[0]);
                this.frameNo = 0;
                //this.interval = setInterval(updateGameArea, 20);
                this.canvas.addEventListener("click", onCanvasClick, false);
                updateGameArea();
            },
            stop: function () {
                clearInterval(this.interval);
            },
            clear: function () {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }
        let images = [
            'Apple.png'
            , 'Banana.png'
            , 'blackberry.png'
            , 'coconut.png'
            , 'Grapes.png'
            , 'Grapes2.png'
            , 'GreenApple.png'
            , 'Kivi.png'
            , 'Orange.png'
            , 'Orange2.png'
            , 'Papaya.png'
            , 'Pears.png'
            , 'Pineapple.png'
            , 'RedBerry.png'
            , 'Straberry.png'
            , 'WaterMellon.png'
        ]
        function loadAndDrawImage(counter, tiles, name, ctx, x, y) {
            var imagePath = './' + name;
            var img = new Image();   // Create new img element            
            img.onclick = function () {
                alert(img.name);
            };
            img.style.border.color = 'black';
            img.style.border.width = 2;
            img.src = imagePath;//'./fruits.png';
            //img.src = './fruits.png';

            img.onload = function () {
                ctx.drawImage(img, x, y, 47, 47);
                ctx.fillStyle = 'blue';
                ctx.fillRect(x, y, 47, 47);
            };

            var tile = new Tile(counter, x, y, img, 50, 50);
            tile.imageSrc = imagePath;
            tiles.push(tile);
        }

        function component(width, height, color, x, y, type) {
            this.type = type;
            this.width = width;
            this.height = height;
            this.speed = 1;
            this.angle = 0;
            this.x = x;
            this.y = y;
            this.tiles = [];


            this.update = function () {
                ctx = myGameArea.context;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.fillStyle = color;
                ctx.canvas.addEventListener("check", this.check);
                var counter = 0;
                for (var i = 0; i < 8; i++) {
                    for (var j = 0; j < 8; j++) {
                        counter++;
                        loadAndDrawImage(counter, this.tiles, images[((i + 1) * (j + 1)) % 16], ctx, i * 50, j * 50);
                    }
                }   
                ctx.restore();
            }
            this.updatePartial = function (tile) {
                if (tile.clickable) {
                    // myGameArea.openCount++;
                    // ctx.clearRect(tile.x, tile.y, 47, 47);
                    // ctx.canvas.dispatchEvent(new CustomEvent("check"));
                    


                    tile.img.src = tile.imageSrc;
                    var loaded = false;
                    tile.clickable=false;
                    myGameArea.openCount++;
                    //myGameArea.openCount = myGameArea.openCount % 3;
                    myGameArea.openTiles[myGameArea.openCount - 1] = tile;
                    tile.img.onload = function () {
                        ctx.drawImage(tile.img, tile.x, tile.y, 47, 47);
                            console.log("Image clicked{0}",tile.imageSrc);
                            setTimeout(()=>{console.log("wait for image to load",tile.imageSrc);},500);
                            loaded=true;
                        ctx.canvas.dispatchEvent(new CustomEvent("check"));
                    };
                }
            }
            this.check = function () {
                if (myGameArea.openCount == 2) {
				//tile=myGameArea.openTiles[1];
                    if (myGameArea.openTiles[0].imageSrc != myGameArea.openTiles[1].imageSrc) {
                        tile = myGameArea.openTiles[0];
                        ctx.fillStyle = 'blue';
                        ctx.fillRect(tile.x, tile.y, 47, 47);
                        tile = myGameArea.openTiles[1];
                        ctx.fillStyle = 'blue';
                        ctx.fillRect(tile.x, tile.y, 47, 47);
                    }
                    else {
                        tile = myGameArea.openTiles[0];
                        tile.clickable = false;
						//tile.display=none;
                        tile = myGameArea.openTiles[1];
                        tile.clickable = false;
						//tile.display=none;
                    }
                    //this.reset();
                    myGameArea.openCount = 0;
                }
            }
            this.reset = function () {
                this.openTiles = [2];
            }
        }

        function getCursorPosition(e) {
            var x;
            var y;
            if (e.pageX != undefined && e.pageY != undefined) {
                x = e.pageX;
                y = e.pageY;
            }
            else {
                x = e.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
                y = e.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
            }
            x -= myGameArea.canvas.offsetLeft;
            y -= myGameArea.canvas.offsetTop;

            return [x, y];
        }

        function onCanvasClick(e) {
            let pos = getCursorPosition(e);
            var x = Math.ceil(pos[0] / 50);
            var y = Math.ceil(pos[1] / 50);

            var ele = x == 1 ? y : y + (x - 1) * 8;
            ele = ele - 1;
            var t = myGamePiece.tiles[ele];
            myGamePiece.updatePartial(t);
        }

        function updateGameArea() {
            //myGameArea.clear();
            //myGamePiece.newPos();
            myGamePiece.update();
        }
        function Tile(id, x, y, img, height, width) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.img = img;
            this.imageSrc = "";
            this.height = height;
            this.width = width;
            this.clickable = true;
        }   