'use strict'
// @ts-check

const history = [];

/**
 * @param {string} userMessage
 */
function createUserMessage(userMessage) {
    if (dom.userMessageTemplate && dom.chatContainerEl) {
        const templateCopy = document.importNode(dom.userMessageTemplate.content, true);
        const textMessage = templateCopy.querySelector("p");
        textMessage.textContent = userMessage;
        dom.chatContainerEl.appendChild(templateCopy);
    }
}
function createAiMessage(aiMessage) {
    if (dom.aiMessageTemplate && dom.chatContainerEl) {
        const templateCopy = document.importNode(dom.aiMessageTemplate.content, true);
        const textMessage = templateCopy.querySelector("p");
        textMessage.textContent = aiMessage;
        dom.chatContainerEl.appendChild(templateCopy);
    }
}

function askClaude(message) {

    dom.buttonEl.disabled = true;
    dom.loaderEl.classList.remove("d-none");
    const userMessage = {
        role: "user",
        content: message
    }
    history.push(userMessage);
    const options = {
        method: "POST",
        headers: claudeHeader,
        body: JSON.stringify(
            {
                "max_tokens": 1024,
                "model": CLAUDE_MODEL,
                "messages": history
            }
        )
    }
    return fetch(CLAUDE_API_URL, options)
        .then(response => {
            return response.json();
    
        })
        .then(data => {
            const responseText = data.content[0].text;
            history.push({
                role: "assistant",
                content: responseText
            });
            createUserMessage(message);
            createAiMessage(responseText);
        }
        )
        .catch(error => {
            createAiMessage(error.stack);
            throw new Error;
        })
}

function userSubmitHandler(event) {
    event.preventDefault();
    if (dom.inputEl) {
        const userMessage = dom.inputEl.value;

        const [messageSuccess, messageValue] = validateString(userMessage);
        if (!messageSuccess) {
            return;
        }
        askClaude(messageValue)
            .then(response => {
                dom.loaderEl.classList.add("d-none");
                dom.buttonEl.disabled = false;
                dom.inputEl.value = "";
            })
            .catch(error => {
                console.log(error);
            })


    }
}
function validateString(string) {
    const validatedString = string.trim();
    if (validatedString === "") {
        return [false, null];
    }
    return [true, validatedString]
}

