const apiUrl = "https://3ve3wf359b.execute-api.eu-west-2.amazonaws.com/dev";
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const micButton = document.getElementById("mic-button");

function appendMessage(text, sender) {
    const message = document.createElement("div");
    message.className = `chat-message ${sender}`;
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendButton.addEventListener("click", async () => {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage(message, "me");
    userInput.value = "";

    const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ body: message }),
        headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    const chatbotResponse = data.response;
    appendMessage(chatbotResponse, "aidan");
    speak(chatbotResponse);
});

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendButton.click();
    }
});

micButton.addEventListener("click", () => {
    if (!("webkitSpeechRecognition" in window)) {
        alert("Speech recognition is not supported in your browser.");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.addEventListener("result", (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
    });

    recognition.start();
});

function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

