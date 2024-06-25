/**
 * @name Ring Everyone
 * @version 1.0
 * @description ring everyone in the gc you are in with just a button
 * @author ceomrmatrix
 * @source https://github.com/ceomrmatrix/ringeveryone/blob/main/RingEveryone.plugin.js
 * @updateUrl https://github.com/ceomrmatrix/ringeveryone/raw/main/RingEveryone.plugin.js
 */

module.exports = class RingEveryone {
    start() {
        this.addButton();
    }

    addButton() {
        const chatBar = document.querySelector('.chat-3bRxxu form');
        if (!chatBar) return;

        const button = document.createElement('button');
        button.className = 'ring-button';
        button.style.backgroundImage = 'url(https://raw.githubusercontent.com/ceomrmatrix/ringeveryone/main/ringeveryone.png)';
        button.style.backgroundSize = 'cover';
        button.style.width = '24px';
        button.style.height = '24px';
        button.style.marginRight = '8px';
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

        chatBar.appendChild(button);
    }

    stop() {}
};
