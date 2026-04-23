const dom = {
    userMessageTemplate : document.querySelector("#user-message-template"),
    aiMessageTemplate : document.querySelector("#ai-message-template"),
    inputFormEl : document.querySelector("#user-input-form"),
    inputEl : document.querySelector("#user-message-input"),
    chatContainerEl : document.querySelector(".chat-container"),
    buttonEl : document.querySelector("#send-button"),
    loaderEl : document.querySelector(".loader")
};

dom.inputFormEl.addEventListener("submit", userSubmitHandler);