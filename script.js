class Wrapper {
    constructor(buttonName){
        this.buttonName = buttonName;
    }

    renderWrapper(){
        let wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        return document.body.appendChild(wrapper)
    }

    renderForm(){
        const form = document.createElement('form');
        form.className = 'message-form';
        
        const textarea = document.createElement('textarea');
        textarea.className = 'message-text';
        textarea.name = 'userMessage';
        textarea.placeholder = 'Type your text...';

        const button = document.createElement('button');
        button.className = 'message-send';
        button.type = 'button';
        button.innerText = this.buttonName

        const label = document.createElement('label');
        label.innerText = " To stop chat with bot put 'By'"

        form.appendChild(textarea);
        form.appendChild(button);
        form.appendChild(label);

        return document.body.appendChild(form)
    }
}
let botAnswer = true;
let wrap = new Wrapper('SEND');
let wrapper = wrap.renderWrapper();
let form = wrap.renderForm();

//----------------
const sendButton = form.querySelector('.message-send');
sendButton.addEventListener('click', async () => { 
    await startChat();
})

document.addEventListener('keydown', enterPressed);
//----------------------

function random(min, max){
   return Math.floor(Math.random() * (max - min) + min);
}

function timeout(message, time = 0){
    return new Promise(done => {
        setTimeout(() => done(message), time*1000)
    })
};

function getUserMessage(){
    let mes = document.querySelector('.message-text')
    return mes.value;
};

function getBotMessage(){
    const responseIndex = random(0,responses.length - 1);
    const response = responses[responseIndex]

    const time = random(1,2);
    
    return timeout(response, time)
};

function showMessage(text, className){
    const message = document.createElement('div');
    message.classList.add('message', className);
    message.innerText = text;

    wrapper.appendChild(message);
    wrapper.scrollTop = wrapper.scrollHeight;
};

async function startChat(){
    const newUserMessage = getUserMessage();

    if(!newUserMessage){
        return;
    }

    showMessage(newUserMessage, 'user-message')
    form.elements.userMessage.value = "";

    const userMessages = document.getElementsByClassName('user-message')
    const lastUserMessage = userMessages[userMessages.length - 1].innerText;

    if(lastUserMessage.toLowerCase() === 'by'){
        botAnswer = false;
        showMessage('Actually, not really intresting with you', 'bot-message');
        return;
    };
    if(botAnswer == true){
    const newBotMessage = await getBotMessage();
    showMessage(newBotMessage, 'bot-message');}

};

async function enterPressed(event){
    if(event.code == 'Enter'){
        event.preventDefault();
        await startChat();
    }
};

const responses = [
    'hello nigga',
    'How is your life?',
    'Tell me the truth',
    '...you are really strange guy',
    'Some intresting situation',
    'I\'m so sorry',
    'I like you',
    'What could you tell me about BTC',
    'Let change thema',
]