const API_BASE_URL = 'http://localhost:3000/';
const textOutput = document.getElementById('text');
const commandInput = document.getElementById('commandPrompt');

const state = {
    commands: [],
    currentCommand: null,
};

async function focusCommandInput() {
    commandInput.focus();
}

async function fetchData(route) {
    try {
        const response = await fetch(API_BASE_URL + route);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hiba a fetch során:', error);
        throw error;
    }
}

async function getCommands() {
    try {
        if (state.commands.length === 0) {
            const data = await fetchData("commands");
            state.commands = data.map(x => x = Object.values(x)[0]);
        }
        return state.commands;
    } catch (error) {
        console.error('Hiba a parancsok lekérése során:', error);
        return [];
    }
}

async function showTextForCommand(command) {
    const data = await fetchData(command);
    textOutput.innerHTML = `<pre>${data.Text}</pre>`;
    state.currentCommand = command;
}

async function handleCommandKeyPress(event) {
    if (event.key === "Enter") {
        let command = String(commandInput.value).toLowerCase();

        const commands = await getCommands();

        if (command && commands.includes(command)) {
            await showTextForCommand(command)
            commandInput.value = "";
        } else {
            commandInput.value = "";
        }
    }
}

(async () => {
    window.addEventListener('click', focusCommandInput);
    window.addEventListener('touchstart', focusCommandInput);
    window.addEventListener('load', async () => {
        await showTextForCommand("main");
        focusCommandInput();
    });

    commandInput.addEventListener('keypress', handleCommandKeyPress);
})();