'use strict'
// @ts-check
const dom = {
    userMessageTemplate : document.querySelector("#user-message-template"),
    aiMessageTemplate : document.querySelector("#ai-message-template"),
    inputFormEl : document.querySelector("#user-input-form"),
    inputEl : document.querySelector("#user-message-input"),
    chatContainerEl : document.querySelector(".chat-container")
}

const history = [];

/**
 * @param {string} userMessage
 */
function createUserMessage(userMessage){
    if(dom.userMessageTemplate && dom.chatContainerEl){
        const templateCopy = document.importNode(dom.userMessageTemplate.content, true);
        const textMessage = templateCopy.querySelector("p");
        textMessage.textContent = userMessage;
        dom.chatContainerEl.appendChild(templateCopy);
    }
}
function createAiMessage(aiMessage){
    if(dom.aiMessageTemplate && dom.chatContainerEl){
        const templateCopy = document.importNode(dom.aiMessageTemplate.content, true);
        const textMessage = templateCopy.querySelector("p");
        textMessage.textContent = aiMessage;
        dom.chatContainerEl.appendChild(templateCopy);
    }
}

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
        const responseText = data.content[0].text;
        history.push(responseText);
        createUserMessage(message);
        createAiMessage(responseText);
        return responseText;
    }
    )
    .catch(error => {
        console.log(error);
    })
}

function userSubmitHandler(event) {
    event.preventDefault();
    if(inputEl){
        const userMessage = inputEl.value;

        // Sanifica il valore
    }
}
function validateString(string){
    const validatedString  = string.trim();
    if(validatedString === ""){
        return [false, null];
    }
    return [true, validatedString]
}