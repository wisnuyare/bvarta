import React, { useState } from 'react';

interface FileUploaderProps {
  onFileUpload: (geoJSONData: any) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      readGeoJSONFile(selectedFile);
    }
  };

  const readGeoJSONFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const geoJSONData = JSON.parse(event.target.result as string);
        onFileUpload(geoJSONData);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input
        type="file"
        accept=".geojson"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploader;