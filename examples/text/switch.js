var App = (function () {
    var usernameForm, mainContent, saveUsernameBtn, usernameInput, greeting, toggleBtn;
    var isDarkTheme = false;

    function setUpListeners() {
        saveUsernameBtn.addEventListener("click", saveUsername);
        toggleBtn.addEventListener("click", toggleTheme);
    }

    function saveUsername() {
        var username = usernameInput.value.trim();
        if (username) {
            localStorage.setItem("username", username);
            showMainContent(username);
        } else {
            alert("Please enter a valid username.");
        }
    }

    function toggleTheme() {
        isDarkTheme = !isDarkTheme;
        document.body.classList.toggle("dark-theme", isDarkTheme);
        toggleBtn.textContent = isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme";
    }

    function showMainContent(username) {
        usernameForm.classList.add("hidden");
        mainContent.classList.remove("hidden");
        greeting.textContent = `Hello, ${username}`;
    }

    function initialize() {
        usernameForm = document.getElementById("username-form");
        mainContent = document.getElementById("main-content");
        saveUsernameBtn = document.getElementById("save-username-btn");
        usernameInput = document.getElementById("username-input");
        greeting = document.getElementById("greeting");
        toggleBtn = document.getElementById("theme-toggle-btn");

        var storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            showMainContent(storedUsername);
        } else {
            usernameForm.classList.remove("hidden");
        }

        setUpListeners();
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();



// // DOM Elements
// var usernameSetup = document.getElementById('username-setup');
// var mainApp = document.getElementById('main-app');
// var usernameInput = document.getElementById('username');
// var saveUsernameBtn = document.getElementById('save-username');
// // const amountInput = document.getElementById('amount-input');
// // const sendCashBtn = document.getElementById('send-cash');
// var balanceDisplay = document.querySelector('[data-quiet-receive-text-target]');
// var themeBtn = document.getElementById('theme-toggle-btn');

// // Check if username already exists
// const storedUsername = localStorage.getItem('username');
// if (storedUsername) {
//     showMainApp();
// }

// // Save Username
// saveUsernameBtn.addEventListener('click', () => {
//     var username = usernameInput.value.trim();
//     if (!username) {
//         alert("Please enter a valid username.");
//         return;
//     }
//     localStorage.setItem('username', username);
//     showMainApp();
// });

// // Show Main App
// function showMainApp() {
//     usernameSetup.classList.add('hidden');
//     mainApp.classList.remove('hidden');
// }

// // Theme toggle
// var isDarkTheme = false;

// themeBtn.addEventListener("click", () => {
//     isDarkTheme = !isDarkTheme;
//     document.body.classList.toggle("dark-theme", isDarkTheme);
//     toggleBtn.textContent = isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme";
// });

// // // Send Cash Logic
// // sendCashBtn.addEventListener('click', () => {
// //   const payload = parseFloat(amountInput.value.trim());
// //   let currentBalance = parseFloat(balanceDisplay.textContent.replace('$', ''));

// //   if (isNaN(payload) || payload <= 0) {
// //     alert("Please enter a valid amount.");
// //     return;
// //   }

// //   if (payload > currentBalance) {
// //     alert("Insufficient balance.");
// //     return;
// //   }

// //   currentBalance -= payload;
// //   balanceDisplay.textContent = `$${currentBalance.toFixed(2)}`;
// //   amountInput.value = ''; // Clear input field

// //   // Simulate transmitting data with username
// //   const transactionData = {
// //     senderId: localStorage.getItem('username'),
// //     amount: payload
// //   };

// //   console.log("Transaction Sent:", transactionData);

// //   // Simulate receiving
// //   onReceiveTransaction(transactionData);
// // });

// // // Simulate Receiving Transaction
// // function onReceiveTransaction(transaction) {
// //   const currentUsername = localStorage.getItem('username');
// //   if (transaction.senderId === currentUsername) {
// //     console.log("Ignored self-sent transaction.");
// //     return;
// //   }

// //   let currentBalance = parseFloat(balanceDisplay.textContent.replace('$', ''));
// //   currentBalance += transaction.amount;
// //   balanceDisplay.textContent = `$${currentBalance.toFixed(2)}`;
// //   console.log("Transaction Received:", transaction);
// // }