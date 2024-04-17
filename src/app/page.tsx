'use client'
import React, { useState } from 'react';
import FileUploader from './component/fileUploader';
import Header from './component/header';
import dynamic from 'next/dynamic';

const DynamicMapVisualize = dynamic(() => import('./component/mapVisualize'), {
  ssr: false,
});


const PageComponent: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File | null>(null);
  const handleGeoJSONUpload = (geoJSONData: any) => {
    setUploadedFiles(geoJSONData);
    console.log(geoJSONData, Date.now())
  };

  return (
    <div>
      <Header />
      {uploadedFiles ? (
        <DynamicMapVisualize geoJSONData={uploadedFiles} />
      ) : (
        <FileUploader onFileUpload={handleGeoJSONUpload} />
      )}
    </div>
  );
};

export default PageComponent;