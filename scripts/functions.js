const dom = {
    userMessageTemplate = document.querySelector("#user-message-template"),
    aiMessageTemplate = document.querySelector("#ai-message-template"),
    inputFormEl = document.querySelector("#user-input-form"),
    inputEl = document.querySelector("#user-message-input"),
    chatContainerEl = document.querySelector(".chat-container")
}

const history = [];

/*
function askClaude(message){

    const userMessage = {
        role: "user",
        content: message
    }

    history.push(userMessage);
    const body = JSON.stringify({
            "max_tokens": 1024,
            "model": CLAUDE_MODEL,
            "messages": history
        });

    let claudeResponse = fetch(CLAUDE_API_URL, 
    {
        method:"POST",
        headers: claudeHeader,
        body: body
    })
    .then(response => {
        return response.json();
    })
    .then(data =>
    {
        console.log(data);
    }
    )
    .catch(error => {
        console.log(error);
    })
}

askClaude("Ciao Claude");
*/