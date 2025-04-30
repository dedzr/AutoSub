const { exec } = require("child_process"); // Use exec instead of execSync
const path = require("path");
const fs = require("fs");

const videosDir = path.join(__dirname, "videos");
const audioDir = path.join(__dirname, "audios");
const outputDir = path.join(__dirname, "output");

// Ensure required directories exist
if (!fs.existsSync(videosDir)) fs.mkdirSync(videosDir, { recursive: true });
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

function videoProcessing(
    model,
    mode = "batch",
    filename = "",
    onComplete = () => {}
) {
    const videoFiles =
        mode === "single"
            ? [path.join(videosDir, filename)]
            : fs
                  .readdirSync(videosDir)
                  .filter((file) => /\.(mp4|mov|mkv|avi)$/i.test(file))
                  .map((file) => path.join(videosDir, file));

    let remaining = videoFiles.length;

    if (remaining === 0) return onComplete(null); // nothing to do

    videoFiles.forEach((videoPath) => {
        const baseName = path.parse(videoPath).name;
        const audioPath = path.join(audioDir, `${baseName}.wav`);
        const outputSRT = path.join(outputDir, `${baseName}.srt`);

        if (fs.existsSync(outputSRT)) {
            console.log(`✅ Subtitle already exists: ${outputSRT}`);
            if (--remaining === 0) onComplete(null);
            return;
        }

        console.log(`\n🎬 Processing video: ${path.basename(videoPath)}`);

        // 1. Extract audio using FFmpeg
        exec(
            `ffmpeg -i "${videoPath}" -vn -acodec pcm_s16le -ar 44100 -ac 2 -y -loglevel quiet "${audioPath}"`,
            (err) => {
                if (err) return onComplete(err);

                console.log(`🎵 Transcribing audio...`);

                // 2. Run the Whisper transcription script
                exec(
                    `python scripts/transcribe.py "${audioPath}" "${outputSRT}" "${model}"`,
                    (err) => {
                        if (err) return onComplete(err);

                        console.log(`✅ Subtitle saved to: ${outputSRT}`);
                        if (--remaining === 0) onComplete(null);
                    }
                );
            }
        );
    });
}

function audioProcessing(
    model,
    mode = "batch",
    filename = "",
    onComplete = () => {}
) {
    const audioFiles =
        mode === "single"
            ? [path.join(audioDir, filename)]
            : fs
                  .readdirSync(audioDir)
                  .filter((file) => /\.(wav|mp3)$/i.test(file))
                  .map((file) => path.join(audioDir, file));

    let remaining = audioFiles.length;

    if (remaining === 0) return onComplete(null);

    audioFiles.forEach((audioPath) => {
        const baseName = path.parse(audioPath).name;
        const outputSRT = path.join(outputDir, `${baseName}.srt`);

        if (fs.existsSync(outputSRT)) {
            console.log(`✅ Subtitle already exists: ${outputSRT}`);
            if (--remaining === 0) onComplete(null);
            return;
        }

        console.log(`\n🎵 Processing audio: ${path.basename(audioPath)}`);
        console.log("⏳ Transcribing...");

        exec(
            `python scripts/transcribe.py "${audioPath}" "${outputSRT}" "${model}"`,
            (err) => {
                if (err) return onComplete(err);

                console.log(`✅ Subtitle saved to: ${outputSRT}`);
                if (--remaining === 0) onComplete(null);
            }
        );
    });
}
module.exports = {
    videoProcessing,
    audioProcessing,
};
