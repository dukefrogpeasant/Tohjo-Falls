// Minimal playable Diglett Bash (Gopher Bash) port for HTML5 Canvas

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("diglettbash-canvas");
    const ctx = canvas.getContext("2d");
    const width = 400, height = 430;
    canvas.width = width;
    canvas.height = height;

    let score = 0, level = 1, tries = 5;
    let maxScorePerLevel = 100, maxLevel = 6;
    const levelDelays = [1200, 1000, 900, 800, 700, 650];
    let delay = levelDelays[0], frameRate = 20;
    let isHit = false, keepGoing = true, gameStart = false;
    let rx = 0, ry = 0;
    let gopherPoints = 10;
    let gopherVisible = false;
    let gopherTimeout;
    const assets = {
        hole: null,
        gopherPics: [],
        gopherHurt: [],
        startStop: null,
        sounds: {}
    };
    let imagesLoaded = false;
    let assetLoadPromises = [];

    function loadImage(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = src;
        });
    }
    function loadAudio(src) {
        return new Promise((resolve) => {
            try {
                const a = new Audio(src);
                a.oncanplaythrough = () => resolve(a);
                a.onerror = () => resolve(null);
                // start loading
                a.load();
            } catch (e) {
                resolve(null);
            }
        });
    }

    // Try to load assets used by the Java applet; if they don't exist, fall back
    function preloadAssets() {
        // adjust filetype if needed
        assetLoadPromises.push(loadImage("Diglett/hole.gif").then(img => assets.hole = img));
        assetLoadPromises.push(loadImage("Diglett/diglett1.png").then(img => assets.gopherPics[0] = img));
        assetLoadPromises.push(loadImage("Diglett/diglett2.png").then(img => assets.gopherPics[1] = img));
        assetLoadPromises.push(loadImage("Diglett/diglett3.png").then(img => assets.gopherPics[2] = img));
        assetLoadPromises.push(loadImage("Diglett/hole.png").then(img => assets.gopherPics[3] = img)); // final frame
        assetLoadPromises.push(loadImage("Diglett/hurt1.gif").then(img => assets.gopherHurt[0] = img));
        assetLoadPromises.push(loadImage("Diglett/hurt2.gif").then(img => assets.gopherHurt[1] = img));
        assetLoadPromises.push(loadImage("Diglett/hurt3.gif").then(img => assets.gopherHurt[2] = img));
        assetLoadPromises.push(loadImage("Diglett/hole.gif").then(img => assets.gopherHurt[3] = img));
        assetLoadPromises.push(loadImage("Diglett/ss.jpg").then(img => assets.startStop = img));
        // sounds same as above adjust filetype if need be
        assetLoadPromises.push(loadAudio("Diglett/ow.au").then(a => assets.sounds.ouch = a));
        assetLoadPromises.push(loadAudio("Diglett/bang.au").then(a => assets.sounds.bang = a));
        assetLoadPromises.push(loadAudio("Diglett/gup.au").then(a => assets.sounds.gup = a));
        assetLoadPromises.push(loadAudio("Diglett/gdown.au").then(a => assets.sounds.gdown = a));
        assetLoadPromises.push(loadAudio("Diglett/laugh.au").then(a => assets.sounds.laugh = a));

        return Promise.all(assetLoadPromises).then(() => {
            imagesLoaded = !!(assets.hole || assets.gopherPics[0]);
        });
    }

    // grid and drawing helpers
    const cellSize = 100;
    function drawBoard() {
        ctx.clearRect(0, 0, width, height);
        // Draw 4x4 holes
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                const px = x * cellSize;
                const py = y * cellSize;
                if (imagesLoaded && assets.hole) {
                    ctx.drawImage(assets.hole, px, py, cellSize, cellSize);
                } else {
                    ctx.fillStyle = "#8B5A2B";
                    ctx.beginPath();
                    ctx.arc(px + 50, py + 50, 40, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
        // Draw gopher if visible (use sprite if available)
        if (gopherVisible) {
            const px = rx, py = ry;
            if (imagesLoaded && currentGopherFrameImg) {
                ctx.drawImage(currentGopherFrameImg, px, py, cellSize, cellSize);
            } else {
                ctx.fillStyle = "#ba6036ff";
                ctx.beginPath();
                ctx.arc(px + 50, py + 50, 30, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "#f70404ff";
                ctx.fillRect(px + 40, py + 40, 20, 10); // eyes
            }
        }
        // Draw stats area
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 400, 400, 30);
        ctx.fillStyle = "#000";
        ctx.font = "16px Times New Roman";
        ctx.fillText(`Score ${score}   Level ${level}   Tries ${tries}`, 10, 420);
        // Draw start/stop button area
        if (imagesLoaded && assets.startStop) {
            ctx.drawImage(assets.startStop, 300, 400, 50, 30);
        } else {
            ctx.fillStyle = "#ccc";
            ctx.fillRect(300, 400, 50, 30);
            ctx.fillStyle = "#000";
            ctx.fillText(gameStart ? "Stop" : "Start", 305, 420);
        }
    }

    // Animation frame currently displayed for gopher; used by drawBoard
    let currentGopherFrameImg = null;

    function randomX() {
        return Math.floor(Math.random() * 4) * cellSize;
    }
    function randomY() {
        return Math.floor(Math.random() * 4) * cellSize;
    }

    // play sound helper
    function playSound(s) {
        try {
            if (s && typeof s.currentTime === "number") {
                s.currentTime = 0;
                s.play();
            }
        } catch (e) { /* ignore */ }
    }

    // Sequence: gopherUp (frames), wait, gopherDown (frames) unless hit
    async function showGopher() {
        if (!keepGoing || !gameStart) return;
        rx = randomX();
        ry = randomY();
        isHit = false;
        gopherVisible = true;

        // animate up: use gopherPics frames 0..2 then frame 3 as fully up (if present)
        await gopherUp(rx, ry);

        // if still visible and not hit, pause for delay
        if (!isHit && gopherVisible) {
            // stay visible for delay (but allow hit during this time)
            await sleep(delay);
        }

        // if hit already handled by goodHit; if not, animate down and handle badHit
        if (!isHit && gopherVisible) {
            await gopherDown(rx, ry);
        }

        gopherVisible = false;
        currentGopherFrameImg = null;
        drawBoard();

        if (keepGoing && gameStart) {
            // small pause before next pop
            gopherTimeout = setTimeout(showGopher, 200);
        }
    }

    function sleep(ms) {
        return new Promise(resolve => {
            const t = setTimeout(() => resolve(), ms);
        });
    }

    // animate up frames
    async function gopherUp(upX, upY) {
        const frames = imagesLoaded && assets.gopherPics.length ? assets.gopherPics : null;
        // frames expected: [gopher1, gopher2, gopher3, hole-like]
        for (let i = 0; i < 3; i++) {
            if (isHit) return;
            currentGopherFrameImg = frames && frames[i] ? frames[i] : null;
            gopherVisible = true;
            drawBoard();
            // play "gup" sound on first frame if available
            if (i === 0) playSound(assets.sounds.gup);
            await sleep(frameRate);
        }
        // show final up frame (index 3) if exists
        currentGopherFrameImg = frames && frames[3] ? frames[3] : currentGopherFrameImg;
        drawBoard();
        if (!isHit) {
            // stay for 'delay' occurs in showGopher
        }
    }

    async function gopherDown(downX, downY) {
        const frames = imagesLoaded && assets.gopherPics.length ? assets.gopherPics : null;
        // reverse frames for down: indices 2,1,0 then hole
        if (!isHit) {
            if (frames && frames[2]) {
                currentGopherFrameImg = frames[2];
                drawBoard();
                await sleep(frameRate);
                if (isHit) return;
            }
            if (frames && frames[1]) {
                currentGopherFrameImg = frames[1];
                drawBoard();
                await sleep(frameRate);
                if (isHit) return;
            }
            if (frames && frames[0]) {
                currentGopherFrameImg = frames[0];
                drawBoard();
                await sleep(frameRate);
                if (isHit) return;
            }
            // fully down -> bad hit (miss)
            isHit = false;
            badHit();
        }
    }

    // Hurt animation
    async function gopherHit(hurtX, hurtY) {
        const frames = imagesLoaded && assets.gopherHurt.length ? assets.gopherHurt : null;
        if (frames) {
            for (let i = 0; i < frames.length; i++) {
                currentGopherFrameImg = frames[i];
                drawBoard();
                await sleep(150);
            }
        } else {
            // simple flash if no hurt sprites
            for (let i = 0; i < 4; i++) {
                ctx.fillStyle = i % 2 ? "yellow" : "#ba6036ff";
                ctx.fillRect(hurtX + 10, hurtY + 10, 80, 80);
                await sleep(150);
                drawBoard();
            }
        }
    }

    function goodHit() {
        // play hit sound
        playSound(assets.sounds.bang);
        score += gopherPoints;
        // animate hurt
        gopherHit(rx, ry);
        if (score >= maxScorePerLevel) {
            maxScorePerLevel += 100;
            level++;
            if (level > maxLevel) {
                youWin();
                return;
            }
            delay = levelDelays[Math.min(level - 1, levelDelays.length - 1)];
            frameRate = Math.max(10, frameRate - 3);
        }
        isHit = false;
        gopherVisible = false;
        currentGopherFrameImg = null;
        drawBoard();
        if (keepGoing && gameStart) setTimeout(showGopher, delay);
    }

    function badHit() {
        // play gdown sound
        playSound(assets.sounds.gdown);
        tries--;
        if (tries <= 0) {
            gameOver();
            return;
        }
        isHit = false;
        gopherVisible = false;
        currentGopherFrameImg = null;
        drawBoard();
        if (keepGoing && gameStart) setTimeout(showGopher, delay);
    }

    function gameOver() {
        keepGoing = false;
        gameStart = false;
        drawBoard();
        ctx.font = "30px Times New Roman";
        ctx.fillStyle = "yellow";
        ctx.fillText("DIGLETTS RUINED", 20, 150);
        ctx.fillText("YOUR YARD!", 100, 200);
        ctx.fillText("GAME OVER", 100, 250);
        playSound(assets.sounds.laugh);
    }

    function youWin() {
        keepGoing = false;
        gameStart = false;
        drawBoard();
        ctx.font = "30px Times New Roman";
        ctx.fillStyle = "red";
        ctx.fillText("YOU WIN!", 130, 210);
    }

    function resetGame() {
        score = 0;
        level = 1;
        maxScorePerLevel = 100;
        tries = 5;
        delay = levelDelays[0];
        frameRate = 50;
        isHit = false;
        keepGoing = true;
        gameStart = false;
        gopherVisible = false;
        currentGopherFrameImg = null;
        clearTimeout(gopherTimeout);
        drawBoard();
    }

    canvas.addEventListener("mousedown", function (e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        // Start/Stop button (same area used)
        if (mouseX >= 300 && mouseX <= 350 && mouseY >= 400 && mouseY <= 430) {
            if (!gameStart) {
                resetGame();
                gameStart = true;
                keepGoing = true;
                // ensure assets start loading (async)
                preloadAssets().then(() => {
                    setTimeout(showGopher, 1000);
                });
                return;
            } else {
                gameStart = false;
                keepGoing = false;
                clearTimeout(gopherTimeout);
                drawBoard();
                return;
            }
        }
        // Hit gopher
        if (gameStart && gopherVisible && mouseX >= rx + 13 && mouseX <= rx + 87 && mouseY >= ry + 9 && mouseY <= ry + 73) {
            isHit = true;
            // mark visible false to stop further down animation
            gopherVisible = false;
            playSound(assets.sounds.ouch);
            // run hurt sequence then apply scoring
            gopherHit(rx, ry).then(() => {
                score += gopherPoints;
                // level progression logic (mirror Java)
                if (score >= maxScorePerLevel) {
                    maxScorePerLevel += 100;
                    level++;
                    if (level > maxLevel) {
                        youWin();
                        return;
                    }
                    delay = levelDelays[Math.min(level - 1, levelDelays.length - 1)];
                    frameRate = Math.max(10, frameRate - 3);
                }
                isHit = false;
                currentGopherFrameImg = null;
                drawBoard();
                if (keepGoing && gameStart) setTimeout(showGopher, delay);
            });
        }
    });

    // initial preload attempt (non-blocking) and draw
    preloadAssets().then(() => drawBoard()).catch(() => drawBoard());
    drawBoard();
});