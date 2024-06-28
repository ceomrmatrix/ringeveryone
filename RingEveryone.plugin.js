/**
 * @name Ring Everyone
 * @version 1.4
 * @description ring everyone in the group chat with just a button
 * @author ceomrmatrix
 * @source https://github.com/ceomrmatrix/ringeveryone/blob/main/RingEveryone.plugin.js
 * @updateUrl https://github.com/ceomrmatrix/ringeveryone/raw/main/RingEveryone.plugin.js
 */

module.exports = class RingEveryone {
    start() {
        this.loadSettings();
        setTimeout(() => this.addButton(), 1000); // Wait 1 second before trying to add the button
    }

    loadSettings() {
        this.settings = BdApi.Data.load("RingEveryone", "settings") || {};
        if (!this.settings.imageUrl) {
            this.settings.imageUrl = "https://raw.githubusercontent.com/ceomrmatrix/ringeveryone/main/ringeveryone.png";
            BdApi.Data.save("RingEveryone", "settings", this.settings);
        }
    }

    addButton() {
        console.log(document.body.innerHTML); // Log the DOM structure for debugging

        const findButtonContainer = () => {
            const selectors = [
                '.expression-picker-chat-input-button',
                '.channelTextArea-',
                '[class*="channelTextArea-"]',
                '[class*="buttons-"]'
            ];

            for (const selector of selectors) {
                const element = document.querySelector(selector);
                if (element) return element;
            }

            return null;
        };

        const insertButton = () => {
            const container = findButtonContainer();
            if (!container) {
                console.error("Failed to find button container");
                return false;
            }

            const button = document.createElement('div');
            button.className = 'ring-everyone-button';
            button.style.backgroundImage = `url(${this.settings.imageUrl})`;
            button.style.backgroundSize = 'cover';
            button.style.width = '24px';
            button.style.height = '24px';
            button.style.cursor = 'pointer';
            button.style.marginLeft = '8px';
            button.style.marginRight = '8px';
            button.onclick = this.ringEveryone;

            if (container.firstChild) {
                container.insertBefore(button, container.firstChild);
            } else {
                container.appendChild(button);
            }

            return true;
        };

        if (!insertButton()) {
            const observer = new MutationObserver((mutations, obs) => {
                if (insertButton()) {
                    obs.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            this.observer = observer;
        }
    }

    ringEveryone = () => {
        const channelId = this.getCurrentChannelId();
        if (!channelId) {
            console.error("Failed to get current channel ID");
            return;
        }

        const callMembers = this.getCallMembers(channelId);
        if (callMembers.length === 0) {
            console.log("No members in call to ring");
            return;
        }

        console.log('Ringing users:', callMembers);

        callMembers.forEach(userId => {
            this.ringUser(channelId, userId);
        });
    }

    getCurrentChannelId() {
        // This method needs to be implemented
        console.error("getCurrentChannelId method not implemented");
        return null;
    }

    getCallMembers(channelId) {
        // This method needs to be implemented
        console.error("getCallMembers method not implemented");
        return [];
    }

    ringUser(channelId, userId) {
        // This method needs to be implemented
        console.error("ringUser method not implemented");
    }

    stop() {
        if (this.observer) {
            this.observer.disconnect();
        }
        const button = document.querySelector('.ring-everyone-button');
        if (button) {
            button.remove();
        }
    }
};
