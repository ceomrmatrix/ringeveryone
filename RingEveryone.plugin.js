/**
 * @name Ring Everyone
 * @version 1.3
 * @description ring everyone in the group chat with just a button
 * @author ceomrmatrix
 * @source https://github.com/ceomrmatrix/ringeveryone/blob/main/RingEveryone.plugin.js
 * @updateUrl https://github.com/ceomrmatrix/ringeveryone/raw/main/RingEveryone.plugin.js
 */

module.exports = class RingEveryone {
    start() {
        this.loadSettings();
        this.addButton();
    }

    loadSettings() {
        this.settings = BdApi.Data.load("RingEveryone", "settings") || {};
        if (!this.settings.imageUrl) {
            this.settings.imageUrl = "https://raw.githubusercontent.com/ceomrmatrix/ringeveryone/main/ringeveryone.png";
            BdApi.Data.save("RingEveryone", "settings", this.settings);
        }
    }

    addButton() {
        const buttonContainer = document.querySelector('.expression-picker-chat-input-button.buttonContainer-');
        if (!buttonContainer) {
            console.error("Failed to find button container");
            return;
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

        buttonContainer.parentNode.insertBefore(button, buttonContainer);

        // Observe for changes and re-add the button if needed
        this.observer = new MutationObserver(() => {
            if (!document.querySelector('.ring-everyone-button')) {
                this.addButton();
            }
        });
        this.observer.observe(document.body, { childList: true, subtree: true });
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
        // This method needs to be implemented based on Discord's internal structure
        // You might need to use BdApi.Webpack to find the correct module
        console.error("getCurrentChannelId method not implemented");
        return null;
    }

    getCallMembers(channelId) {
        // This method needs to be implemented based on Discord's internal structure
        // You might need to use BdApi.Webpack to find the correct module
        console.error("getCallMembers method not implemented");
        return [];
    }

    ringUser(channelId, userId) {
        // This method needs to be implemented based on Discord's internal structure
        // You might need to use BdApi.Webpack to find the correct module
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
