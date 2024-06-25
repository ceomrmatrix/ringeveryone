//META{"name":"RingEveryoneButton","website":"https://github.com/ceomrmatrix/ringeveryone","source":"https://github.com/ceomrmatrix/ringeveryone/blob/main/RingEveryone.plugin.js"}*//

class RingEveryoneButton {
    getName() {
        return "Ring Everyone Button";
    }

    getDescription() {
        return "Adds a button to ring everyone in the group chat.";
    }

    getVersion() {
        return "0.1";
    }

    getAuthor() {
        return "You";
    }

    start() {
        let buttonHtml = `<button class="ring-everyone-button" style="float:right;margin-right:10px;">Ring Everyone</button>`;
        $(".chat-3bRxxu").prepend(buttonHtml);
        $(".ring-everyone-button").click(this.ringEveryone);
    }

    stop() {
        $(".ring-everyone-button").remove();
    }

    ringEveryone() {
        let channel = $(".channel-2QD9_O").first();
        let channelId = channel.attr("href").split("/").pop();
        let guildId = $(".guildsWrapper-5TJh6A").find(".wrapper-3t9DeA.selected-3s45Ha").attr("id").split("-").pop();
        let token = localStorage.getItem("token").replace(/"/g, "");

        $.ajax({
            type: "POST",
            url: `https://discord.com/api/v10/channels/${channelId}/call/ring`,
            headers: {
                "Authorization": token
            },
            contentType: "application/json",
            data: JSON.stringify({
                recipients: ["everyone"],
                guild_id: guildId,
                kind: "everyone"
            })
        });
    }
}
