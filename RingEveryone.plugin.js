/**
 * @name Ring Everyone
 * @version 1.0
 * @description Ring everyone in the group chat with just a button
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
            const chatBar = document.querySelector('[class*="buttons-"]'); // Updated selector
            if (chatBar) {
                console.log('Chat bar found, adding button...');
                const button = document.createElement('button');
                button.className = 'ring-button';
                button.textContent = 'Ring Everyone';
                button.style.marginLeft = '10px'; // Adjust spacing as needed
                button.onclick = () => {
                    const channel = window.location.pathname.split('/').pop();
                    const members = Array.from(document.querySelectorAll('[class*="member-"]'));
                    const users = members.map(member => member.getAttribute('aria-label').replace('Close Member List Dialog', ''));
                    console.log('Ringing users:', users);
                    users.forEach(user => {
                        fetch(`https://discord.com/api/v9/channels/${channel}/call/ring/${user}`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bot ${window.localStorage.token.slice(1, -1)}`, // Corrected token retrieval
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

                chatBar.appendChild(button);
                obs.disconnect(); // Stop observing once the button is added
            } else {
                console.log('Chat bar not found.');
            }
        });

        observer.observe(document, {
            childList: true,
            subtree: true
        });
    }

    stop() { }
};
