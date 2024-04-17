import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FileUploader from '../src/app/component/fileUploader';

describe('FileUploader component', () => {
  it('calls onFileUpload prop with correct data when a file is selected', async () => {
    const onFileUploadMock = jest.fn();
    const { getByTestId } = render(<FileUploader onFileUpload={onFileUploadMock} />);
    const file = new File(['{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[0,0]}}]}'], 'test.geojson', { type: 'application/json' });
    const input = getByTestId('file-input');

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(onFileUploadMock).toHaveBeenCalledWith({
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [0, 0]
          }
        }]
      });
    });
  });

  it('does not call onFileUpload prop when no file is selected', async () => {
    const onFileUploadMock = jest.fn();
    const { getByTestId } = render(<FileUploader onFileUpload={onFileUploadMock} />);
    const input = getByTestId('file-input');

    fireEvent.change(input, { target: { files: [] } });

    // Ensure that onFileUploadMock is not called after a short delay
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(onFileUploadMock).not.toHaveBeenCalled();
  });
});
