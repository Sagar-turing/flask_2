document.addEventListener("DOMContentLoaded", function() {
    const textToType = document.getElementById("text-to-type").textContent;
    const userInput = document.getElementById("user-input");
    const result = document.getElementById("result");
    const resetButton = document.getElementById("reset-button");
    const typingSpeedElement = document.getElementById("typing-speed");
    let startTime;
    let charCount = 0;

    const calculateTypingSpeed = () => {
        const elapsedTime = (Date.now() - startTime) / 1000; // seconds
        const speed = Math.round((charCount / elapsedTime) || 0);
        typingSpeedElement.textContent = `${speed} WPM`;
    };

    userInput.addEventListener("input", function() {
        const typedText = userInput.value;
        charCount = typedText.length;
        if (typedText === textToType) {
            userInput.value = "";
            alert("Great job! You typed it perfectly!");
            result.style.color = "green";
            resetTypingTest();
        } else if (typedText === textToType.slice(0, typedText.length)) {
            result.textContent = "Keep going!";
            result.style.color = "blue";
        } else {
            result.textContent = "Oops! There's an error.";
            result.style.color = "red";
        }
    });

    userInput.addEventListener("keypress", function() {
        if (!startTime) {
            startTime = Date.now();
            resetButton.disabled = false;
        }
    });

    resetButton.addEventListener("click", function() {
        userInput.value = "";
        result.textContent = "";
        startTime = null;
        charCount = 0;
        typingSpeedElement.textContent = "0 WPM";
        userInput.focus();
    });

    function resetTypingTest() {
        userInput.value = "";
        result.textContent = "";
        startTime = null;
        charCount = 0;
        typingSpeedElement.textContent = "0 WPM";
        userInput.focus();
    }

    // Update typing speed every second
    setInterval(calculateTypingSpeed, 1000);
});