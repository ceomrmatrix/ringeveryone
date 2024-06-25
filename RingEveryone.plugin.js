/**
 * @name Ring Everyone
 * @version 1.0
 * @description ring everyone in the group chat with just a button
 * @author ceomrmatrix
 * @source https://github.com/ceomrmatrix/ringeveryone/blob/main/RingEveryone.plugin.js
 * @updateUrl https://github.com/ceomrmatrix/ringeveryone/raw/main/RingEveryone.plugin.js
 */

module.exports = class RingEveryone {
    start() {
        this.addButton();
    }

    addButton() {
        const observer = new MutationObserver((mutations, obs) => {
            const chatHeader = document.querySelector('.chatHeader-3paBcX');
            if (chatHeader) {
                console.log('Chat header found, adding button...');
                const button = document.createElement('button');
                button.className = 'ring-button';
                button.textContent = 'Ring Everyone';
                button.onclick = () => {
                    const channel = window.location.pathname.split('/').pop();
                    const members = Array.from(document.querySelectorAll('.member-2ZwC-9'));
                    const users = members.map(member => member.getAttribute('aria-label').replace('Close Member List Dialog', ''));
                    console.log('Ringing users:', users);
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
                        }).then(response => {
                            if (!response.ok) {
                                console.error('Failed to ring user:', user, response.statusText);
                            }
                        }).catch(error => {
                            console.error('Error ringing user:', user, error);
                        });
                    });
                };

                chatHeader.appendChild(button);
                obs.disconnect(); // Stop observing once the button is added
            } else {
                console.log('Chat header not found.');
            }
        });

        observer.observe(document, {
            childList: true,
            subtree: true
        });
    }

    stop() { }
};
