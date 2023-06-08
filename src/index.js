const state = {
    increaseTempControl: null,
    decreaseTempControl: null,
    tempValue: 72,
    tempColor: null,
}

const handleTempColor = (tempValue) => {
    if (tempValue >= 80) state.tempColor = "red"; 
    else if (tempValue >= 70 && tempValue < 80) state.tempColor = "orange";
    else if (tempValue >= 60 && tempValue < 70) state.tempColor = "yellow";
    else if (tempValue >= 50 && tempValue < 60) state.tempColor = "green";
    else if (tempValue < 50) state.tempColor = "teal";
}

const handleTempUpdate = () => {
    handleTempColor(state.tempValue);
    document.getElementById("tempValue").style.color = state.tempColor;
    document.getElementById("tempValue").innerHTML = state.tempValue;
}

const handleTempBtnClick = (direction) => {
    if (direction === "up") {
        state.tempValue += 1; 
    }
    else if (direction === "down") {
        state.tempValue -= 1;
    }
    handleTempUpdate();
}

const loadControls = () => {
    state.increaseTempControl = document.getElementById("increaseTempControl");
    state.decreaseTempControl = document.getElementById("decreaseTempControl");
    handleTempUpdate();
}


const registerEvents = () => {
    state.increaseTempControl.addEventListener("click", () => {
        handleTempBtnClick("up");
    })
    state.decreaseTempControl.addEventListener("click", () => {
        handleTempBtnClick("down");
    })
}
const onLoad = () => {
    loadControls();
    registerEvents();
}
onLoad();