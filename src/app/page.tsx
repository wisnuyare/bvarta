'use client'
import React, { useState } from 'react';
import FileUploader from './component/fileUploader';
import dynamic from 'next/dynamic';

const DynamicMapVisualize = dynamic(() => import('./component/mapVisualize'), {
  ssr: false,
});


const MyComponent: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File | null>(null);
  const handleGeoJSONUpload = (geoJSONData: any) => {
    setUploadedFiles(geoJSONData);
  };

  return (
    <div>
      <h1>Upload GeoJSON File</h1>
      <FileUploader onFileUpload={handleGeoJSONUpload} />
      <DynamicMapVisualize geoJSONData={uploadedFiles}/>
    </div>
  );
};

export default MyComponent;