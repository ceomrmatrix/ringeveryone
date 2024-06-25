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
            const chatHeader = document.querySelector('.chatHeader-3paBcX'); // Update this selector if needed
            if (chatHeader) {
                console.log('Chat header found, adding button...');
                const button = document.createElement('button');
                button.className = 'ring-button';
                button.textContent = 'Ring Everyone';
                button.onclick = () => {
                    console.log('Button clicked');
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
