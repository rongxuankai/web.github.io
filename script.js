// script.js

// 显示消息到聊天框
function displayMessage(sender, message) {
    var chatBox = document.getElementById('chat-box');
    var messageElement = document.createElement('div');
    messageElement.textContent = sender + ': ' + message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // 滚动到底部
  }
  
  // 发送消息到服务器
  function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
      displayMessage('You', userInput);
      fetchKimiAPI(userInput);
      document.getElementById('user-input').value = '';
    }
  }
  
  // 调用Kimi智能助手API
  function fetchKimiAPI(input) {
    var xhr = new XMLHttpRequest();
    // 使用您的API密钥
    var apiKey = 'sk-YgNfLYlVzXobWZH9lHwbzoXnOC0SOcSpPiHGNk5tpm5oQxpb';
    xhr.open('POST', 'https://api.moonshot.cn/v1/chat/completions', true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var data = JSON.stringify({
      model: "moonshot-v1-8k", // 指定模型，如果有需要
      messages: [
        {
          "role": "system",
          "content": "You are an AI developed by Moonshot AI, and you can communicate in both Chinese and English."
              },
        {
          "role": "user",
          "content": input
              }
          ]
    });
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.choices) {
          displayMessage('Kimi', response.choices[0].message.content);
        } else {
          displayMessage('Kimi', 'Failed to get a response. Please try again later.');
        }
      } else if (xhr.status !== 200) {
        displayMessage('Kimi', 'Failed to get a response. Please try again later.');
      }
    };
    xhr.send(data);
  }
  
  // 监听回车键提交
  document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  });
  
  // 初始化页面时自动聚焦到输入框
  window.onload = function() {
    document.getElementById('user-input').focus();
  }