/**
 * @name Ring Everyone
 * @version 1.1
 * @description ring everyone in the group chat with just a button
 * @author ceomrmatrix
 * @source https://github.com/ceomrmatrix/ringeveryone/blob/main/RingEveryone.plugin.js
 * @updateUrl https://github.com/ceomrmatrix/ringeveryone/raw/main/RingEveryone.plugin.js
 */

const { Webpack, React } = BdApi;

module.exports = class RingEveryone {
    start() {
        this.addButton();
    }

    addButton() {
        const ChatBarComponent = Webpack.getModule(m => m.type?.displayName === "ChannelTextAreaButtons");
        if (!ChatBarComponent) {
            console.error("Failed to find ChatBarComponent");
            return;
        }

        BdApi.Patcher.after("RingEveryone", ChatBarComponent, "type", (_, __, ret) => {
            const button = React.createElement("button", {
                className: "ring-button",
                onClick: this.ringEveryone,
                style: { marginLeft: '10px' }
            }, "Ring Everyone");

            ret.props.children.push(button);
        });
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
        const channelModule = Webpack.getModule(m => m.getChannelId && m.getVoiceChannelId);
        return channelModule?.getChannelId();
    }

    getCallMembers(channelId) {
        const voiceModule = Webpack.getModule(m => m.getVoiceStates);
        const voiceStates = voiceModule?.getVoiceStates(channelId);
        return Object.keys(voiceStates || {});
    }

    ringUser(channelId, userId) {
        const ringModule = Webpack.getModule(m => m.ring);
        if (!ringModule) {
            console.error("Failed to find ring module");
            return;
        }

        ringModule.ring(channelId, userId).catch(error => {
            console.error(`Failed to ring user ${userId}:`, error);
        });
    }

    stop() {
        BdApi.Patcher.unpatchAll("RingEveryone");
    }
};
