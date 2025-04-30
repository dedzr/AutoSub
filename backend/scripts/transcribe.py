import whisper
import sys

model = whisper.load_model(sys.argv[3])
result = model.transcribe(sys.argv[1], fp16=False)



# Proper timestamp formatter
def format_time(seconds: float) -> str:
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds - int(seconds)) * 1000)
    return f"{hours:02}:{minutes:02}:{secs:02},{millis:03}"

# Write to SRT
with open(sys.argv[2], "w", encoding="utf-8") as srt_file:
    for index, segment in enumerate(result["segments"], start=1):
        start_time = format_time(segment["start"])
        end_time = format_time(segment["end"])
        text = segment["text"].strip()

        srt_file.write(f"{index}\n")
        srt_file.write(f"{start_time} --> {end_time}\n")
        srt_file.write(f"{text}\n\n")

with open(sys.argv[2].replace(".srt", ".txt"), "w", encoding="utf-8") as txt_file:
    for segment in result["segments"]:
        txt_file.write(segment["text"].strip() + "\n")


