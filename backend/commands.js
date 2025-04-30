const { program } = require("commander");

function commandInit() {
    program
        .name("AI SUBTITLE GENERATOR")
        .description("CLI FOR AI SUBTITLE GENERATOR")
        .version("1.0.0");

    program
        .option(
            "-i,--input <audio|video>",
            "Type of the input(audio or video only)"
        )
        .option(
            "-m,--model <base | medium | small | tiny>",
            "Type of the model"
        );

    program.parse();

    return program.opts();
}

module.exports = commandInit;
