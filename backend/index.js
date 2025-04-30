const commandInit = require("./commands");
const { audioProcessing, videoProcessing } = require("./processing");

const options = commandInit();

const model = options.model || "base";

const input = options.input || "video";

const possibleModels = ["base", "medium", "small", "tiny"];

const possibleInputs = ["audio", "video"];

if (!possibleModels.includes(model)) {
    console.log(
        "Invalid model. Please choose from: base, medium, small, tiny."
    );
    process.exit(1);
}

if (!possibleInputs.includes(input)) {
    console.log("Invalid input. Please choose from: audio, video.");
    process.exit(1);
}

if (input === "audio") {
    audioProcessing(model);
} else if (input === "video") {
    videoProcessing(model);
}
