// Adding Socket.io-client and readline module
const io = require("socket.io-client");
const readline = require("readline");

// Create a new connection to the chat server
var socket = io("https://repl-chat-app.codeguyty.repl.co");

// Creating a console interface using readline module
const chat_interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// To remember the user's chat handle and message they send
var chat_handle = "";
var message_to_send = "";

// When we sucessfully connect to the chat server / When the server broadcasts messages to us
socket.on("connect", function(){
  get_chat_handle();
  socket.on("broadcast", display_message);
});

// Gets the user's name, so we can introduce and prepend each message with their name
function get_chat_handle() {
  chat_interface.question(`Hello! What's your handle? `,
    function(answer) {
      chat_handle = answer;
      socket.emit("message", chat_handle + ' has entered the chat');
      chat();
    }
  );
}

// Waits for a new message to send
function chat() {
  chat_interface.question(chat_handle + ": ", 
    function(message) {
      message_to_send = chat_handle + ": ", message;
      socket.emit("message", message_to_send);
      chat();
  });
}

// Handles an incoming message, and checks to see that it is not the one we sent.
// Shows it on the console if it is from another user.
function display_message(message) {
  if (message_to_send != message) {
    console.log("\n" + message);
    chat();
  }
}
