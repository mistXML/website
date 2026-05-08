function makeDraggable(windowId, handleId) {
    const win = document.getElementById(windowId);
    const handle = document.getElementById(handleId);
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;
    handle.addEventListener("mousedown", (e) => { //we holdinggg
        e.preventDefault();
        dragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
    });
    document.addEventListener("mouseup", () => { //we AINT holding
        dragging = false;
    });
    document.addEventListener("mousemove", (e) => { //we 
        if (!dragging) return;
        win.style.left = (e.clientX - offsetX) + "px";
        win.style.top  = (e.clientY - offsetY) + "px";
    });
}

let clicked = 0;
let history = [];
let historyCount = 0;

function wobblyEdit() {
    const title = document.getElementById("top");
    let currentWobble = getComputedStyle(document.documentElement).getPropertyValue('--wobble');

    // silly little extraction of number since it NEEDS to be a string n + 'deg' ...
    currentWobble = Number(currentWobble.substring(0, currentWobble.indexOf('d')) * 1.05);

    clicked++;

    if (clicked == 10) {
        myWindow = window.open("", "myWindow", "width=200, height=100").close();
        clicked = 0;
    }

    document.documentElement.style.setProperty('--wobble', currentWobble + 'deg');

    // if you find this, tell me 'artisan decorative roman mosaics'
}

document.getElementById('cmd').addEventListener('keydown', (e) => {
    let code = e.keyCode;

    // we want stuff to happen when enter is pressed...
    if (code === 13) { 
        const pastCommand = document.createElement('div');
        const command = document.getElementById('cmd').value;
        const result = document.createElement('div');
        history.push(command);
        historyCount = history.length;

        pastCommand.textContent = '[vael@vaels.net] $ ' + command;

        switch (command) {
            case 'clear':
                const list = document.getElementById('cli');

                while (list.hasChildNodes()) {
                    if (list.firstChild.id == 'prompt')
                        break;

                    list.removeChild(list.firstChild);
                }

                document.getElementById('cmd').value = "";
                return;
            case "help":
                result.textContent = 'clear';
                break;
            default:
                result.textContent = 'vsh: command not found: ' + command;

        }

        document.getElementById('cli').insertBefore(pastCommand, document.getElementById('prompt'));
        document.getElementById('cli').insertBefore(result, document.getElementById('prompt'));
        document.getElementById('cmd').value = "";
    } else if (code === 38) {
        e.preventDefault();
        if (historyCount-1 < 0 || history.length == 0) {
            return;
        }

        historyCount--;
        console.log(historyCount);
        document.getElementById('cmd').value = history[historyCount];
        
    } else if (code == 40) {
        if (historyCount >= history.length || history.length == 0) {
            document.getElementById('cmd').value = "";
            return;
        }

        historyCount++;
        console.log(historyCount);
        document.getElementById('cmd').value = history[history.length - historyCount];
    }

});