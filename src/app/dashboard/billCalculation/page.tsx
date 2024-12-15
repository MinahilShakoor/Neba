'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Image, Upload } from '@phosphor-icons/react';
import axios from 'axios'; // Import axios

export default function Page(): React.JSX.Element {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [calculatedBill, setCalculatedBill] = React.useState<number | null>(null);
  const [uploadMessage, setUploadMessage] = React.useState<string>('');
  const [loading, setLoading] = React.useState(false); // To manage loading state

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setUploadMessage('');
    setCalculatedBill(null);
  };

  const handleFileUpload = async (): Promise<void> => {
    if (!selectedFile) {
      setUploadMessage('Please upload a valid image file.');
      return;
    }

    setLoading(true);
    setUploadMessage('Processing image...');
    try {
      // Prepare FormData to send the file
      const formData = new FormData();
      formData.append('image', selectedFile);

      // Send the image to ChatGPT API for processing
      const response = await axios.post('YOUR_CHATGPT_API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const meterReading = response.data.meterReading; // assuming the API returns a field 'meterReading'
      if (meterReading) {
        // Calculate the bill based on meter reading
        const bill = calculateBill(meterReading);
        setCalculatedBill(bill);
        setUploadMessage('Bill calculated successfully!');
      } else {
        setUploadMessage('Failed to read meter reading from the image.');
      }
    } catch (error) {
      console.error('Error processing image:', error); // Log the error
      setUploadMessage('Failed to process the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateBill = (reading: number): number => {
    // Implement your own calculation logic based on the meter reading
    // Example: Assuming a rate per unit and a base charge
    const ratePerUnit = 5; // e.g., 5 PKR per unit
    const baseCharge = 100; // e.g., base charge of 100 PKR
    return reading * ratePerUnit + baseCharge;
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Calculate Your Bill</Typography>
        </Stack>
      </Stack>
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Typography variant="body1">Upload an image of your meter reading</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="upload-image"
            />
            <label htmlFor="upload-image">
              <Button variant="outlined" component="span" startIcon={<Image fontSize="var(--icon-fontSize-md)" />}>
                Choose Image
              </Button>
            </label>
            {selectedFile && <Typography variant="body2">Selected File: {selectedFile.name}</Typography>}
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Upload fontSize="var(--icon-fontSize-md)" />}
            onClick={handleFileUpload}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Upload & Calculate'}
          </Button>
        </CardActions>
      </Card>
      {uploadMessage && (
        <Typography variant="body2" color="textSecondary">
          {uploadMessage}
        </Typography>
      )}
      {calculatedBill !== null && (
        <Typography variant="h6">Your Calculated Bill: PKR {calculatedBill.toFixed(2)}</Typography>
      )}
    </Stack>
  );
}
