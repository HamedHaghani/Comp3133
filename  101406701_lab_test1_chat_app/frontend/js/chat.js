const socket = io("http://localhost:3000");


const logsDiv = document.getElementById("event-log");

const logEvent = (message) => {
    const logEntry = document.createElement("p");
    logEntry.classList.add("log-entry");
    logEntry.textContent = message;
    logsDiv.appendChild(logEntry);
    logsDiv.scrollTop = logsDiv.scrollHeight;
};

document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    if (!username) {
        alert("Please log in first!");
        window.location.href = "login.html";
        return;
    }
    document.getElementById("username").innerText = username;

   
    socket.emit("set-username", username);
    logEvent(`User ${username} connected.`);

  
    document.getElementById("joinRoomBtn").addEventListener("click", joinRoom);
    document.getElementById("sendMessageBtn").addEventListener("click", sendMessage);
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("username"); 
        alert("You have been logged out.");
        window.location.href = "login.html"; 
    });
    
    document.getElementById("messageInput").addEventListener("input", () => {
        if (!currentRoom) return;
        socket.emit("typing", { username: localStorage.getItem("username"), room: currentRoom });
    });
    

    socket.on("typing", (username) => {
        document.getElementById("typingIndicator").innerText = `${username} is typing...`;
        setTimeout(() => {
            document.getElementById("typingIndicator").innerText = "";
        }, 2000); 
    });
    document.getElementById("leaveRoomBtn").addEventListener("click", leaveRoom);
    document.getElementById("startPrivateChatBtn").addEventListener("click", startPrivateChat);

});

let currentRoom = null;


function joinRoom() {
    const room = document.getElementById("roomSelect").value;
    if (currentRoom) {
        alert(`You already joined: ${currentRoom}. Refresh the page to change rooms.`);
        return;
    }

    currentRoom = room;
    socket.emit("joinRoom", { username: localStorage.getItem("username"), room });
    logEvent(`Joined room: ${room}`);
}


function sendMessage() {
    if (!currentRoom) {
        alert("You must join a room first!");
        return;
    }

    const message = document.getElementById("messageInput").value;
    const username = localStorage.getItem("username");

    if (!message.trim()) return;

    socket.emit("chat-message", { from_user: username, room: currentRoom, message });
    logEvent(`Message sent: ${message}`);
    document.getElementById("messageInput").value = "";
}


function leaveRoom() {
    if (!currentRoom) {
        alert("You are not in any room!");
        return;
    }

    socket.emit("leaveRoom", { username: localStorage.getItem("username"), room: currentRoom });
    logEvent(`Left room: ${currentRoom}`);
    currentRoom = null;
}


socket.on("chat-message", ({ from_user, message }) => {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<p><strong>${from_user}:</strong> ${message}</p>`;
    logEvent(`New message from ${from_user}: ${message}`);
});


socket.on("joined-room", ({ username, room }) => {
    logEvent(`${username} joined room: ${room}`);
});


socket.on("error-message", (msg) => {
    alert(msg);
    logEvent(`Error: ${msg}`);
});


function startPrivateChat() {
    const to_user = document.getElementById("privateUser").value;
    const from_user = localStorage.getItem("username");

    if (!to_user) {
        alert("Please enter a username to chat privately.");
        return;
    }

    const privateRoom = `private-${from_user}-${to_user}`;
    socket.emit("start-private-chat", { from_user, to_user });

    logEvent(`Started private chat with ${to_user}`);
    alert(`You are now chatting privately with ${to_user}`);

    
    socket.emit("joinRoom", privateRoom);
}



function sendPrivateMessage() {
    const to_user = document.getElementById("privateUser").value;
    const from_user = localStorage.getItem("username");
    const message = document.getElementById("messageInput").value;

    if (!to_user || !message.trim()) return;

    socket.emit("private-message", { from_user, to_user, message });
    logEvent(`Private message sent to ${to_user}: ${message}`);
    document.getElementById("messageInput").value = "";
}


socket.on("private-message", ({ from_user, message }) => {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<p><strong>Private from ${from_user}:</strong> ${message}</p>`;
    logEvent(`New private message from ${from_user}: ${message}`);
});

