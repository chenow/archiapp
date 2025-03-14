function fact(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * fact(n - 1);
}

console.log(fact(6));

function applique(f, tab) {
  return tab.map(f);
}

console.log(applique(fact, [1, 2, 3, 4, 5, 6]));

console.log(
  applique(
    function (n) {
      return n + 1;
    },
    [1, 2, 3, 4, 5, 6]
  )
);

function update(messages) {
  const ul = document.getElementById("messages");
  ul.innerHTML = "";
  messages.forEach((message) => {
    const date = new Date(message.createdAt).toLocaleString();
    const newMessageLi = `
    <li>
    <div><strong>${message.pseudo}</strong> : ${message.msg}</div>
    <span>${date}</span>
    </li>
    `;
    ul.innerHTML += newMessageLi;
  });
}

function fetchMessages() {
  const backendUrl = document.getElementById("backend-url").value;
  fetch(`${backendUrl}/msg/getAll`)
    .then((response) => response.json())
    .then((data) => {
      update(data);
    })
    .catch((error) => console.error("Error fetching messages:", error));
}

function postMessage(message) {
  const backendUrl = document.getElementById("backend-url").value;

  fetch(`${backendUrl}/msg/post/${encodeURIComponent(message)}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 0) {
        fetchMessages();
      }
    })
    .catch((error) => console.error(error));
}

document.getElementById("postMessage").addEventListener("click", function () {
  const input = document.getElementById("message");
  postMessage(input.value);
  input.value = "";
});

document.addEventListener("DOMContentLoaded", function () {
  fetchMessages();
});

document.getElementById("refresh").addEventListener("click", function () {
  const ul = document.getElementById("messages");
  ul.innerHTML = "";
  fetchMessages();
});

function toggleStyle() {
  document.body.classList.toggle("dark-mode");
}

document.getElementById("darkModButton").addEventListener("click", toggleStyle);
