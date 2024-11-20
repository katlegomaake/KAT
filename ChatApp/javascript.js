let userNickname = "";
let typingTimeout;

const messagesDiv = document.getElementById("messages");
const typingIndicator = document.getElementById("typing-indicator");

// Simulate receiving a message
function mockReceiveMessage() {
  const mockMessages = [
    { user: "Alice", message: "Hello everyone! 😊", timestamp: new Date() },
    { user: "Bob", message: "Hi Alice!", timestamp: new Date() },
  ];

  mockMessages.forEach(({ user, message, timestamp }) => {
    displayMessage(user, message, timestamp, false);
  });
}

// Join the chat
function joinChat() {
  const nicknameInput = document.getElementById("nickname");
  if (!nicknameInput.value) {
    alert("Please enter a nickname!");
    return;
  }
  userNickname = nicknameInput.value;
  document.getElementById("user-name").textContent = userNickname;
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("chat-screen").classList.remove("hidden");
  mockReceiveMessage();
}

// Display a message
function displayMessage(user, message, timestamp, isUser) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isUser ? "user" : "other"}`;
  messageDiv.innerHTML = `<strong>${user}</strong> <span>(${formatTime(timestamp)})</span>: ${message}`;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll
}

// Format time
function formatTime(timestamp) {
  const hours = timestamp.getHours().toString().padStart(2, "0");
  const minutes = timestamp.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Show typing indicator
function showTyping() {
  typingIndicator.classList.remove("hidden");
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    typingIndicator.classList.add("hidden");
  }, 1000);
}

// Send a message
function sendMessage() {
  const messageInput = document.getElementById("message-input");
  if (!messageInput.value.trim()) {
    return;
  }
  const message = messageInput.value;
  displayMessage(userNickname, message, new Date(), true);
  messageInput.value = "";
  simulateOtherUserTyping();
}

// Simulate another user typing and sending a message
function simulateOtherUserTyping() {
  setTimeout(() => {
    typingIndicator.classList.remove("hidden");
    setTimeout(() => {
      typingIndicator.classList.add("hidden");
      displayMessage("OtherUser", "This is a reply! 😄", new Date(), false);
    }, 2000);
  }, 1000);
}
