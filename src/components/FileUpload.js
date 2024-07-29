'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { UploadDropzone } from '../../lib/uploadthing';
import { OurFileRouter } from '@/app/api/fileUpload/route';

const FileUpload = ({ onChange, endpoint }) => {
  return (
    <div>
      <UploadDropzone
        endpoint={OurFileRouter[endpoint]}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
          console.log({ res });
        }}
        onUploadError={(error) => {
          toast.error(`${error?.message}`);
        }}
      />
    </div>
  );
};

export { FileUpload };
