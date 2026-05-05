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

makeDraggable("r-window", "handle");
makeDraggable("l-window", "another-handle");