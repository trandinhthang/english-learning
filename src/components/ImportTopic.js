import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Input,
} from '@fluentui/react-components';

function ImportTopic() {
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError('No file selected.');
      return;
    }

    const reader = new FileReader();

    // Read the file content as text
    reader.readAsText(file);

    reader.onload = (e) => {
      try {
        // Parse the JSON data from the file
        const uploadedData = JSON.parse(e.target.result);

        // Retrieve existing topics from localStorage, or initialize as an empty array
        const existingTopics = JSON.parse(localStorage.getItem('topics')) || [];

        // Append the new topics from the uploaded data
        const updatedTopics = [...existingTopics, ...uploadedData];

        // Save the updated topics array to localStorage
        localStorage.setItem('topics', JSON.stringify(updatedTopics));

        alert('Topics successfully uploaded and appended to localStorage!');
        setError(null); // Reset any previous error
      } catch (err) {
        setError('Invalid JSON file. Please check the file format.');
      }
    };

    reader.onerror = () => {
      setError('Error reading file. Please try again.');
    };
  };

  return (
    <>
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <Button style={{ marginRight: 6, marginTop: 6 }}>Import</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            {/* <DialogTitle>Dialog title</DialogTitle> */}
            <DialogContent>
              <Input
                type="file"
                accept="application/json"
                onChange={handleFileUpload}
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              {/* <Button appearance="primary">Do Something</Button> */}
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
}

export default ImportTopic;
