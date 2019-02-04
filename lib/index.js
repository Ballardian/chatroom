const batch = 217; // change to your own batch id
const baseUrl = "https://wagon-chat.herokuapp.com/";

// Your turn to code!
// <!-- create a click event
// take the values from the form
// add them to top of page -->
const sendButton = document.querySelector('.btn-primary');
const sendRefresh = document.querySelector('.btn-danger');
const messages = document.querySelector('.list-unstyled');

const handleSend = (event) => {
  const message = document.querySelector('#your-message').value;
  const from = document.querySelector('#your-name').value;
  const time = Date.now() / 1000;
  event.preventDefault();
  const li = document.createElement('li');
  li.innerText = `${message} by ${from} at ${time}`;
  messages.prepend(li);

  const postMessage = { author: `${from}`, content: `${message}` };
  const url = `https://wagon-chat.herokuapp.com/${batch}/messages`;

  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postMessage)
  })
    .then(response => response.json())
    .then((data) => {
      console.log("All saved gurl.");
    });
};

const handleRefresh = (event) => {
  const url = `https://wagon-chat.herokuapp.com/${batch}/messages`;

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      const messageArr = data.messages;
      console.log(messageArr);
      messageArr.forEach((oldMessage) => {
        const oldMessagesLi = document.createElement('li');
        oldMessagesLi.innerText = `${oldMessage.content} by ${oldMessage.author}`;
        messages.prepend(oldMessagesLi);
      });
    });
};

sendButton.addEventListener("click", handleSend);

sendRefresh.addEventListener("click", handleRefresh);
