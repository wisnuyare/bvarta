'use client'
import React, { useState } from 'react';
import FileUploader from './component/fileUploader';
import MapVisualize from './component/mapVisualize';

const MyComponent: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File | null>(null);
  const handleGeoJSONUpload = (geoJSONData: any) => {
    // Do something with the uploaded GeoJSON data
    setUploadedFiles(geoJSONData);
  };

  return (
    <div>
      <h1>Upload GeoJSON File</h1>
      <FileUploader onFileUpload={handleGeoJSONUpload} />
      <MapVisualize geoJSONData={uploadedFiles}/>
    </div>
  );
};

export default MyComponent;