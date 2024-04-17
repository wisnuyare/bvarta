import React from 'react';

interface FileUploaderProps {
  onFileUpload: (geoJSONData: any) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      readGeoJSONFile(selectedFile);
    }
  };

  const readGeoJSONFile = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const geoJSONData = JSON.parse(event.target.result as string);
          onFileUpload(geoJSONData);
          resolve();
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.readAsText(file);
    });
  };

  return (
    <div>
      <input
        type="file"
        accept=".geojson"
        onChange={handleFileChange}
        data-testid="file-input"
      />
    </div>
  );
};

export default FileUploader;