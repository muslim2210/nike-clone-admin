import React, { useState } from "react";

import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const [preview, setPreview] = useState("");
  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Upload Foto Product
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="flex flex-col justify-center">
          {preview ? (
            <div>
              <img className="mx-auto h-40 w-40" src={preview} alt="Preview" />
            </div>
          ) : (
            <svg
              className="mx-auto h-30 w-30 text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <CldUploadWidget uploadPreset="yxfumdqb">
            {({ open }) => {
              return (
                <button
                  onClick={() => open()}
                  className="text-white py-2 bg-primaryRed px-4 rounded-full flex items-center max-w-[200px] mx-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Image
                </button>
              );
            }}
          </CldUploadWidget>

          <p className="text-xs leading-5 mt-4 text-gray-600">
            PNG, JPG, JPEG up to 2MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
