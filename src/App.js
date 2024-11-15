import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import { initializeIcons } from '@fluentui/font-icons-mdl2';
import Vocabulary from './components/Vocabulary';
import Quiz from './components/Quiz';
import { Button, Divider } from '@fluentui/react-components';
import ImportTopic from './components/ImportTopic';

// initializeIcons();

function App() {
  function downloadJSONFile(data, filename = 'topics.json') {
    const jsonString = localStorage.getItem('topics') || [];

    const blob = new Blob([jsonString], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    link.click();
  }

  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>English Learning App</h1>
        <nav
          style={
            {
              // display: 'flex',
              // justifyContent: '',
              // alignContent: '',
            }
          }
        >
          <Link to="/">
            <Button
              style={{ marginRight: 6, marginTop: 6 }}
              appearance="primary"
            >
              Vocabulary
            </Button>
          </Link>
          <Link to="/quiz">
            <Button
              appearance="primary"
              style={{ marginRight: 6, marginTop: 6 }}
            >
              Quiz
            </Button>
          </Link>
          {/* <Divider vertical style={{ height: '100%' }}>
            Text
          </Divider> */}
          <Button
            style={{ marginRight: 6, marginTop: 6 }}
            onClick={downloadJSONFile}
          >
            Export
          </Button>

          <ImportTopic />
        </nav>
        <Routes>
          <Route path="/" element={<Vocabulary />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
