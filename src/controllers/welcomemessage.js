import WelcomeMessage from "../models/welcome-message";

function saveWelcomeMessage(message) {
    return WelcomeMessage.create(message);
}

function getWelcomeMessage() {
    return WelcomeMessage.all();
}

export default {
    saveWelcomeMessage,
    getWelcomeMessage
};
