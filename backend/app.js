const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const { videoProcessing, audioProcessing } = require("./processing");
const morgan = require("morgan");
require("dotenv").config();

const videosDir = path.join(__dirname, "videos");
const audiosDir = path.join(__dirname, "audios");
const outputDir = path.join(__dirname, "output");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, videosDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const app = express();
const PORT = process.env.PORT;
const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100 MB max
    },
});
app.use(morgan("dev"));
app.use(cors());

app.use(express.static(path.join(__dirname, "build")));

app.post("/api/generate", upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).send("no file uploaded");

    const fileType = req.file.mimetype.split("/")[0];
    const model = "tiny";

    const filenameWithoutExt = path.parse(req.file.originalname).name;
    const uploadedFilePath = path.join(videosDir, req.file.originalname);
    const audioFilePath = path.join(audiosDir, `${filenameWithoutExt}.wav`);
    const srtFilePath = path.join(outputDir, `${filenameWithoutExt}.srt`);
    const txtFilePath = path.join(outputDir, `${filenameWithoutExt}.txt`);

    const cleanup = () => {
        [uploadedFilePath, audioFilePath, srtFilePath, txtFilePath].forEach(
            (file) => {
                if (fs.existsSync(file)) {
                    fs.unlink(file, (err) => {
                        if (err) console.error("❌ Error deleting file:", file);
                        else console.log("🧹 Deleted file:", file);
                    });
                }
            }
        );
    };

    const onComplete = (err) => {
        if (err) {
            console.error("❌ Processing error:", err);
            cleanup();
            return res.status(500).send("Internal processing error.");
        }

        // Send the SRT file only when it's ready
        res.sendFile(srtFilePath, (err) => {
            if (err) {
                console.error("❌ Error sending file:", err);
                res.status(500).send("Error sending file.");
            } else {
                console.log(`✅ Sent file: ${srtFilePath}`);
                cleanup(); // Clean up after sending
            }
        });
    };

    // Start processing
    if (fileType === "video") {
        videoProcessing(model, "single", req.file.originalname, onComplete);
    } else if (fileType === "audio") {
        audioProcessing(model, "single", req.file.originalname, onComplete);
    } else {
        fs.unlinkSync(uploadedFilePath);
        return res.status(400).send("Invalid file type");
    }
});

app.use((err, req, res, next) => {
    if (err.code === "LIMIT_FILE_SIZE") {
        return res
            .status(413)
            .json({ error: "File too large. Max size is 100MB." });
    }

    if (err.code == "LIMIT_UNEXPECTED_FILE") {
        return res
            .status(400)
            .json({ error: "unexpected file format / too many files" });
    }

    console.error("❌ Unexpected error:", err);
    res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, () => {
    console.log("server started at", PORT);
});
