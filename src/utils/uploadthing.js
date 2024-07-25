import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";
import { ourFileRouter } from "@/app/api/fileUpload/core";
const UploadButton = generateUploadButton();
const UploadDropzone = generateUploadDropzone();

export { UploadButton, UploadDropzone };
