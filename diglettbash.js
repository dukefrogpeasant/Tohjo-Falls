// Minimal playable Diglett Bash (Gopher Bash) port for HTML5 Canvas
// Only basic gameplay, no sound/images yet

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("diglettbash-canvas");
    const ctx = canvas.getContext("2d");
    const width = 400, height = 430;
    canvas.width = width;
    canvas.height = height;

    let score = 0, level = 1, tries = 5;
    let maxScorePerLevel = 100, maxLevel = 6;
    let delay = 1200, frameRate = 50;
    let isHit = false, keepGoing = true, gameStart = false;
    let rx = 0, ry = 0;
    let gopherPoints = 10;
    let gopherVisible = false;
    let gopherTimeout;

    function drawBoard() {
        ctx.clearRect(0, 0, width, height);
        // Draw 4x4 holes
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                ctx.fillStyle = "#8B5A2B";
                ctx.beginPath();
                ctx.arc(50 + x * 100, 50 + y * 100, 40, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        // Draw gopher
        if (gopherVisible) {
            ctx.fillStyle = "#ba6036ff";
            ctx.beginPath();
            ctx.arc(rx + 50, ry + 50, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#f70404ff";
            ctx.fillRect(rx + 40, ry + 40, 20, 10); // eyes
        }
        // Draw stats
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 400, 400, 30);
        ctx.fillStyle = "#000";
        ctx.font = "16px Times New Roman";
        ctx.fillText(`Score ${score}   Level ${level}   Tries ${tries}`, 10, 420);
        // Draw start/stop button
        ctx.fillStyle = "#ccc";
        ctx.fillRect(300, 400, 50, 30);
        ctx.fillStyle = "#000";
        ctx.fillText(gameStart ? "Stop" : "Start", 305, 420);
    }

    function randomX() {
        return Math.floor(Math.random() * 4) * 100;
    }
    function randomY() {
        return Math.floor(Math.random() * 4) * 100;
    }

    function showGopher() {
        rx = randomX();
        ry = randomY();
        gopherVisible = true;
        drawBoard();
        gopherTimeout = setTimeout(() => {
            if (!isHit) badHit();
            gopherVisible = false;
            drawBoard();
            if (keepGoing && gameStart) setTimeout(showGopher, delay);
        }, delay);
    }

    function goodHit() {
        score += gopherPoints;
        if (score >= maxScorePerLevel) {
            maxScorePerLevel += 100;
            level++;
            if (level > maxLevel) {
                youWin();
                return;
            }
            delay = level > 4 ? 350 : delay - 200;
            frameRate = Math.max(10, frameRate - 5);
        }
        isHit = false;
        gopherVisible = false;
        drawBoard();
        if (keepGoing && gameStart) setTimeout(showGopher, delay);
    }

    function badHit() {
        tries--;
        if (tries <= 0) {
            gameOver();
            return;
        }
        isHit = false;
        gopherVisible = false;
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
        delay = 1200;
        frameRate = 50;
        isHit = false;
        keepGoing = true;
        gameStart = false;
        gopherVisible = false;
        drawBoard();
    }

    canvas.addEventListener("mousedown", function (e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        // Start button
        if (mouseX >= 300 && mouseX <= 350 && mouseY >= 400 && mouseY <= 430 && !gameStart) {
            resetGame();
            gameStart = true;
            keepGoing = true;
            setTimeout(showGopher, 1000);
            return;
        }
        // Stop button
        if (mouseX >= 300 && mouseX <= 350 && mouseY >= 400 && mouseY <= 430 && gameStart) {
            gameStart = false;
            keepGoing = false;
            clearTimeout(gopherTimeout);
            drawBoard();
            return;
        }
        // Hit gopher
        if (gameStart && gopherVisible && mouseX >= rx + 13 && mouseX <= rx + 87 && mouseY >= ry + 9 && mouseY <= ry + 73) {
            isHit = true;
            goodHit();
        }
    });

    drawBoard();
});
