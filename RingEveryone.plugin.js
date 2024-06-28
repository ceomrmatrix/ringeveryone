/**
 * @name Ring Everyone
 * @version 1.7
 * @description ring everyone in the group chat with just a button
 * @author ceomrmatrix
 * @source https://github.com/ceomrmatrix/ringeveryone/blob/main/RingEveryone.plugin.js
 * @updateUrl https://github.com/ceomrmatrix/ringeveryone/raw/main/RingEveryone.plugin.js
 */

module.exports = class RingEveryone {
    start() {
        this.loadSettings();
        this.setupObserver();
    }

    loadSettings() {
        this.settings = BdApi.Data.load("RingEveryone", "settings") || {};
        if (!this.settings.imageUrl) {
            this.settings.imageUrl = "https://raw.githubusercontent.com/ceomrmatrix/ringeveryone/main/ringeveryone.png";
            BdApi.Data.save("RingEveryone", "settings", this.settings);
        }
    }

    findChatBar() {
        const selectors = [
            '.buttons-',
            '[class*="buttons-"]',
            '[class*="channelTextArea-"] [class*="buttons-"]',
            '.channelTextArea-',
            '[class*="channelTextArea-"]',
            '.expression-picker-chat-input-button',
            '[class*="expressionPickerButton-"]'
        ];

        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) return element;
        }

        return null;
    }

    addButton() {
        const container = this.findChatBar();
        if (!container) {
            console.log("failed to find chat bar");
            return;
        }

        if (!document.querySelector('.ring-everyone-button')) {
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

            container.appendChild(button);
            console.log("button added successfully");
        }
    }

    setupObserver() {
        this.observer = new MutationObserver((mutations) => {
            for (let mutation of mutations) {
                if (mutation.type === 'childList') {
                    this.addButton();
                }
            }
        });

        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Initial attempt to add the button
        this.addButton();
    }

    ringEveryone = () => {
        const channelId = this.getCurrentChannelId();
        if (!channelId) {
            console.log("failed to get current channel id");
            return;
        }

        const callMembers = this.getCallMembers();
        if (callMembers.length === 0) {
            console.log("no members in call to ring");
            return;
        }

        console.log('ringing users:', callMembers);

        callMembers.forEach(userId => {
            this.ringUser(channelId, userId);
        });
    }

    getCurrentChannelId() {
        return "1119869145467600936";
    }

    getCallMembers() {
        const memberElements = document.querySelectorAll('.voiceCallWrapper_ .participant_');
        return Array.from(memberElements).map(el => {
            return el.id || el.dataset.userId || '';
        }).filter(id => id !== '');
    }

    ringUser(channelId, userId) {
        console.log(`attempting to ring user ${userId} in channel ${channelId}`);
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
