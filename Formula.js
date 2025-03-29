const canvas = document.getElementById("staticCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function generateNoise() {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
        let intensity = Math.random() * 255; // Random black/white pixels
        pixels[i] = pixels[i + 1] = pixels[i + 2] = intensity; // Grayscale
        pixels[i + 3] = 120; // Adjust opacity (higher = more visible noise)
    }

    ctx.putImageData(imageData, 0, 0);
}

function animateNoise() {
    generateNoise();
    requestAnimationFrame(animateNoise); // Smooth infinite animation
}

// Initialize
resizeCanvas();
animateNoise();
window.addEventListener("resize", resizeCanvas);

document.addEventListener("DOMContentLoaded", function () {
    const pInput = document.getElementById("pInput");
    const cInput = document.getElementById("cInput");
    const resultElement = document.getElementById("result");
    const calculateButton = document.querySelector("button");

    function parseFraction(value) {
        if (value.includes("/")) {
            let parts = value.split("/");
            if (parts.length === 2) {
                let numerator = parseFloat(parts[0]);
                let denominator = parseFloat(parts[1]);
                if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
                    return numerator / denominator;
                }
            }
        }
        return parseFloat(value);
    }

    function calculateDP() {
        let P = parseFraction(pInput.value.trim());
        let C = parseFraction(cInput.value.trim());

        if (isNaN(P) || isNaN(C) || P < 0 || P > 1 || C < 0 || C > 1) {
            resultElement.textContent = "Please Enter A Value Between 0 & 1";
            resultElement.style.color = "red";
            return;
        }

        let DP = P * (1 + C - P * C);
        let DPPercentage = (DP * 100).toFixed(2); // Convert to percentage

        resultElement.textContent = `DP(A) = ${DP.toFixed(4)} (${DPPercentage}%)`;
        resultElement.style.color = "white";
    }

    calculateButton.addEventListener("click", calculateDP);
});

document.getElementById("toggle-btn").addEventListener("click", function () {
    let abbrDiv = document.getElementById("abbreviations");
    if (abbrDiv.style.display === "none") {
        abbrDiv.style.display = "block";
        this.textContent = "Hide Abbreviations";
    } else {
        abbrDiv.style.display = "none";
        this.textContent = "Show Abbreviations";
    }
});
