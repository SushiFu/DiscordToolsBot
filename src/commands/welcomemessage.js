import discord from "../server/discord";
import logger from "../server/logger";
import wMsgCtrl from "../controllers/welcomemessage";
import config from "../server/config.js";

discord.onMemberJoin(member => {
    let welcomeRole = config.NEWBIE_ROLE;
    let role = member.guild.roles.get(welcomeRole);
    member.addRole(role)
        .then(guildMember => {
            wMsgCtrl.getWelcomeMessage()
                .then(wMsg => {
                    let welcomeMsg = wMsg[wMsg.length - 1].message;
                    guildMember.send(welcomeMsg)
                        .then(() => {
                            logger.info("Welcome Message sent");
                        })
                        .catch(err => logger.error(err));
                })
                .catch(err => logger.error(err));
        })
        .catch(err => logger.error(err));
});


discord.onCmdChannelMessage(message => {
    if (message.content.startsWith("!wMsgEdit"))
        create(message);
    if (message.content.startsWith("!wMsgGet"))
        get();
});

function create(message) {
    if (message.content.length < 10) {
        discord.sendOnCmdChannel("Ecrit des règles avant de les remplacer ;)");
        return;
    }
    const newWMsg = message.content.replace("!wMsgEdit ", "");
    wMsgCtrl.saveWelcomeMessage(newWMsg)
        .then(wMsg => {
            logger.info("Create new welcome message:", wMsg);
            discord.sendOnCmdChannel("Nouveau message de bienvenue créé \n" + wMsg.message);
        })
        .catch(err => logger.error(err));
}

function get() {
    wMsgCtrl.getWelcomeMessage()
        .then(wMsg => {
            logger.info("Welcome Message: ", wMsg);

            discord.sendOnCmdChannel(wMsg[wMsg.length - 1].message);
        })
        .catch(err => logger.error(err));
}
