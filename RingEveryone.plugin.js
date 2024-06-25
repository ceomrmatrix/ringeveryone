// ==UserScript==
// @name         Ring Everyone
// @namespace    https://github.com/ceomrmatrix/ringeveryone
// @version      0.1
// @description  ring everyone in a group chat with just a button.
// @author       King Matrix
// @match        https://discord.com/channels/*/messages/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const addButton = () => {
        const toolbar = document.querySelector('.toolbar-2DLt1G');
        if (!toolbar) return;

        const button = document.createElement('button');
        button.className = 'ring-button';
        button.textContent = 'Ring Everyone';
        button.onclick = () => {
            const channel = window.location.pathname.split('/').pop();
            const members = Array.from(document.querySelectorAll('.member-2ZwC-9'));
            const users = members.map(member => member.getAttribute('aria-label').replace('Close Member List Dialog', ''));
            users.forEach(user => {
                fetch(`https://discord.com/api/v9/channels/${channel}/call/ring/${user}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bot ${window.localStorage.token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'content': '',
                        'tts': false
                    })
                });
            });
        };

        toolbar.appendChild(button);
    };

    const observeChat = () => {
        const chat = document.querySelector('.messagesWrapper-1sRNjr');
        if (!chat) return;

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length && mutation.addedNodes[0].classList.contains('channelTextArea-1HTP3F')) {
                    addButton();
                }
            });
        });

        observer.observe(chat, { childList: true, subtree: true });
    };

    observeChat();
})();
