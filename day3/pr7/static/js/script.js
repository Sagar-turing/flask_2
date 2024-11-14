document.addEventListener("DOMContentLoaded", function() {
    const textToType = document.getElementById("text-to-type").textContent;
    const userInput = document.getElementById("user-input");
    const result = document.getElementById("result");
    const startTime = new Date().getTime();
    let timer;

    function updateTimer() {
        const elapsedTime = new Date().getTime() - startTime;
        const seconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(seconds / 60);
        document.getElementById("timer").textContent = `Time: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }

    userInput.addEventListener("input", function() {
        clearInterval(timer);
        const typedText = userInput.value;
        updateTimer();
        timer = setInterval(updateTimer, 1000);

        if (typedText === textToType) {
            result.textContent = "Great job! You typed it perfectly!";
            result.style.color = "green";
            clearInterval(timer);
        } else if (typedText === textToType.slice(0, typedText.length)) {
            result.textContent = "Keep going!";
            result.style.color = "blue";
        } else {
            result.textContent = "Oops! There's an error.";
            result.style.color = "red";
        }
    });

    userInput.addEventListener("focus", startTimer);
    userInput.addEventListener("blur", stopTimer);

    function startTimer() {
        updateTimer();
        timer = setInterval(updateTimer, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }
});