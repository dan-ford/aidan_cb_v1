const API_GATEWAY_URL = "https://3ve3wf359b.execute-api.eu-west-2.amazonaws.com/dev";

const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const userMessageInput = document.getElementById("user-message");

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userMessage = userMessageInput.value;
  if (!userMessage) return;

  // Display the user's message in the chat window
  chatMessages.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
  userMessageInput.value = "";

  // Send the message to the Lambda function
  const response = await fetch(API_GATEWAY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: userMessage }),
  });

  if (response.ok) {
    const data = await response.json();
    chatMessages.innerHTML += `<p><strong>Bot:</strong> ${data.body}</p>`;
  } else {
    console.error("Error:", response.status, response.statusText);
  }
});