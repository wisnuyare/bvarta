import React from 'react';

interface FileUploaderProps {
  onFileUpload: (geoJSONData: any) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch('api/', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          console.log('error')
          throw new Error('Upload failed');
        }
        await readGeoJSONFile(selectedFile);
      } catch (error) {
        console.error('Upload error:', error);
        // toast.error('An error occurred during upload');
      }
    }
  };

  const readGeoJSONFile = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const geoJSONData = JSON.parse(event.target.result as string);
          console.log(Date.now(), geoJSONData)
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
    <div className="flex justify-center items-center">
      <div className="mx-auto px-4 py-8">
        <input
          type="file"
          accept=".geojson"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-md p-2"
          data-testid="file-input"
        />
      </div>
    </div>
  );
};

export default FileUploader;