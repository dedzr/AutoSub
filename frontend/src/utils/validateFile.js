import { ALLOWED_FILE_TYPES } from "../config/contansts";
import { toast } from "react-toastify";

const validateFileType = (file) => {
    const fileType = file.type;
    if (!ALLOWED_FILE_TYPES.includes(fileType)) {
        toast.error(
            "Invalid file type. Please upload a valid MP4, MOV, MKV, AVI, WAV, or MP3 file."
        );
        return false;
    }
    return true;
};

export default validateFileType;
