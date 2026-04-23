
const history = [];

function askClaude(message){

    const userMessage = {
        role: "user",
        content: message
    }

    history.pushState(userMessage);
}