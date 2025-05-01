// src/components/FileUpload.js
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled, { keyframes } from "styled-components";
import { toast } from "react-toastify";
import Dropzone from "./Dropzone";
import FileList from "./FileList";
import ActionButton from "./ActionButton";
import LoadingSpinner from "./Loader";
import DownloadButton from "./DownloadButton";

import { API_URL, MAX_FILE_SIZE } from "../config/contansts";
import validateFileType from "../utils/validateFile";

// Smooth fade-in effect for UI elements
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Container for the page
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f7f8fa;
    font-family: "Segoe UI", sans-serif;
    animation: ${fadeIn} 1s ease;
    padding: 20px;
    flex-direction: column;
`;

// Card with a subtle hover effect
const UploadCard = styled.div`
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0px 15px 45px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 100%;
    max-width: 600px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

// Title with a clean modern font
const Title = styled.h2`
    font-size: 28px;
    font-weight: 600;
    color: #343a40;
    margin-bottom: 20px;
    text-transform: uppercase;

    @media (max-width: 768px) {
        font-size: 24px;
    }
`;

// Subtitle for clarity with softer tone
const Subtitle = styled.p`
    font-size: 16px;
    color: #6c757d;
    margin-bottom: 30px;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [subtitleFile, setSubtitleFile] = useState(null);
    const [subtitleUrl, setSubtitleUrl] = useState(null);

    useEffect(() => {
        let subtitleUrl;
        if (subtitleFile) {
            subtitleUrl = URL.createObjectURL(subtitleFile);
            setSubtitleUrl(subtitleUrl);
        }
        return () => URL.revokeObjectURL(subtitleUrl);
    }, [subtitleFile]);

    const onDrop = (acceptedFiles) => {
        const largeFile = acceptedFiles.find(
            (file) => file.size > MAX_FILE_SIZE
        );
        if (largeFile) {
            toast.error("File size is too large. Maximum size is 10MB");
            return;
        }
        if (acceptedFiles.length > 1) {
            toast.error("You can only upload one file at a time.");
            return;
        }

        const validFiles = acceptedFiles.filter(validateFileType);

        if (validFiles.length > 0) {
            setFiles([validFiles[0]]);
            toast.success(`${validFiles.length} file uploaded successfully!`);
        } else {
            toast.error(
                "No valid files uploaded. Please upload only valid MP4, MOV, MKV, AVI, WAV, or MP3 files."
            );
        }
    };

    const fetchSubtitle = async () => {
        if (!files[0]) {
            toast.error("Please upload a file first.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("file", files[0]);

        try {
            const response = await fetch(`${API_URL}/api/generate`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to generate subtitles.");
            }

            const subtitleBlob = await response.blob();
            setSubtitleFile(subtitleBlob);
            toast.success("Subtitle generated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate subtitle.");
        } finally {
            setLoading(false);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: ".mp4, .mov, .mkv, .avi, .wav, .mp3",
        multiple: true,
    });

    return (
        <Container>
            <UploadCard>
                <Title>AI Subtitle Generator</Title>
                <Subtitle>
                    Upload your media file to generate subtitles with ease.
                </Subtitle>

                <Dropzone {...getRootProps()}>
                    <input id="file-upload-input" {...getInputProps()} />
                    Drag & Drop or Click to Select a File
                </Dropzone>

                {files.length > 0 && (
                    <FileList>
                        <strong>File:</strong> {files[0].name}
                        <br />
                        <strong>Size:</strong>{" "}
                        {(files[0].size / 1024 / 1024).toFixed(2)} MB
                    </FileList>
                )}

                <ActionButton
                    onClick={fetchSubtitle}
                    disabled={loading || files.length === 0}
                >
                    {loading ? "Generating..." : "Generate Subtitles"}
                </ActionButton>

                {loading && <LoadingSpinner />}

                {subtitleFile && !loading && (
                    <DownloadButton
                        href={subtitleUrl}
                        download={`${files[0].name}.srt`}
                    >
                        Download Subtitles
                    </DownloadButton>
                )}
            </UploadCard>
        </Container>
    );
};

export default FileUpload;
