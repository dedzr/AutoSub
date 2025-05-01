# AutoSub

AI Subtitle Generator is a web and CLI application that allows users to upload video or audio files and generate subtitles using AI-powered transcription. The backend leverages Whisper (a speech-to-text model) for transcription, and the frontend is built with React to offer a smooth user experience.

## Features

-   Upload video or audio files for subtitle generation.
-   Supports multiple file formats including MP4, MOV, MKV, AVI, WAV, and MP3.
-   AI-powered transcription using Whisper.
-   Generated subtitles available for download in SRT format.
-   Responsive and user-friendly UI.
-   **CLI functionality** for generating subtitles from audio and video files directly from the command line.

## Tech Stack

### Frontend

-   React
-   React Dropzone for file uploads
-   Styled-components for styling
-   React Toastify for notifications

### Backend

-   Node.js (Express)
-   Multer for file handling
-   Python for Whisper model integration
-   FFmpeg for audio extraction from video

### Docker

-   Multi-stage Dockerfile for building the client and backend in a single image.

## Getting Started

### Prerequisites

-   Node.js (>= 18.x)
-   Python (>= 3.10)
-   FFmpeg
-   Docker (optional, for containerization)

### Local Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/ai-subtitle-generator.git
    cd ai-subtitle-generator
    ```

2. **Install frontend dependencies:**

    ```bash
    cd frontend
    npm install
    ```

3. **Install backend dependencies:**

    ```bash
    cd ../backend
    npm install
    ```

4. **Run the application locally:**

    To run the application in development mode, you can use the following command:

    ```bash
    npm run deploy-local
    ```

    This will build the frontend, copy the build files to the backend directory, and start the server.

5. **Access the app in your browser:**

    Once the server is up, navigate to `http://localhost:8080` to start using the app.

### Docker Setup

To run the application using Docker, follow these steps:

1. **Build the Docker image:**

    ```bash
    docker build -t ai-subtitle-generator .
    ```

2. **Run the Docker container:**

    ```bash
    docker run -p 8080:8080 ai-subtitle-generator
    ```

3. **Access the app in your browser:**

    Navigate to `http://localhost:8080` to use the app.

## CLI Usage

In addition to the web interface, this app supports a **Command Line Interface (CLI)** for generating subtitles. The CLI allows you to specify the input type (audio or video) and the model to use for transcription.

### Available Commands

#### Generate Subtitles (CLI)

Use the following command to generate subtitles for an audio or video file.

```bash
node index.js -i <audio|video> -m <base|medium|small|tiny>
```

## Example Commands

-   For audio input using the "base" model:

```
node index.js -i audio -m base

```

-   For audio input using the "small" model:

```
node index.js -i audio -m small

```

## CLI Workflow

-   The video and audio files must be placed in the appropriate folders for the CLI to process them:

-   Audio files should be placed in the backend/audios folder.

-   Video files should be placed in the backend/videos folder.

-   If an invalid model is provided, an error will prompt you to choose from: base, medium, small, tiny.

-   If an invalid input type is given, an error will prompt you to choose between: audio, video.

-   If everything is valid, the corresponding processing function (audioProcessing or videoProcessing) will run and generate subtitles.

## API Endpoints

## POST /api/generate

-   Description: Upload a video or audio file, and receive a subtitle file in SRT format.

-   Request Body:

-   file (multipart/form-data): The video or audio file to process.

-   Response:

-   Success: The generated subtitle file (SRT) will be downloaded.

-   Error: If the file format is invalid or too large, an error message will be returned.
