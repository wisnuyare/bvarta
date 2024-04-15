'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Header component with SSR disabled
const DynamicMapVisualize = dynamic(() => import('./component/mapVisualize'), {
  ssr: false,
});

const DynamicFileUploader = dynamic(() => import('./component/fileUploader'), {
  ssr: false,
});

const MyComponent: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File | null>(null);
  const handleGeoJSONUpload = (geoJSONData: any) => {
    // Do something with the uploaded GeoJSON data
    setUploadedFiles(geoJSONData);
  };

  return (
    <div>
      <h1>Upload GeoJSON File</h1>
      <DynamicFileUploader onFileUpload={handleGeoJSONUpload} />
      <DynamicMapVisualize geoJSONData={uploadedFiles}/>
    </div>
  );
};

export default MyComponent;