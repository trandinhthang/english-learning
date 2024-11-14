import React, { useState, useEffect } from 'react';
import {
  Input,
  Button,
  SearchBox,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from '@fluentui/react-components';
import { MdOutlineVolumeUp, MdStickyNote2 } from 'react-icons/md';
import { handlePlayAudio } from '../utils';

const Vocabulary = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [newWord, setNewWord] = useState({
    en: '',
    vn: '',
    vowels: '',
    audio: '',
    example: '',
  });
  const [newTopic, setNewTopic] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingWordIndex, setEditingWordIndex] = useState(null); // Store index of word being edited

  useEffect(() => {
    const storedTopics = JSON.parse(localStorage.getItem('topics')) || [];
    setTopics(storedTopics);
  }, []);

  const saveToLocalStorage = (updatedTopics) => {
    localStorage.setItem('topics', JSON.stringify(updatedTopics));
  };

  // Add a new topic
  const handleAddTopic = () => {
    if (newTopic && !topics.some((topic) => topic.name === newTopic)) {
      const updatedTopics = [...topics, { name: newTopic, words: [] }];
      setTopics(updatedTopics);
      setNewTopic('');
      saveToLocalStorage(updatedTopics);
    }
  };

  // Update a topic
  const handleUpdateTopic = (oldTopicName) => {
    const updatedTopicName = prompt(
      'Enter new name for the topic:',
      oldTopicName
    );
    if (updatedTopicName && updatedTopicName !== oldTopicName) {
      const updatedTopics = topics.map((topic) =>
        topic.name === oldTopicName
          ? { ...topic, name: updatedTopicName }
          : topic
      );
      setTopics(updatedTopics);
      saveToLocalStorage(updatedTopics);
    }
  };

  // Delete a topic
  const handleDeleteTopic = (topicToDelete) => {
    const updatedTopics = topics.filter(
      (topic) => topic.name !== topicToDelete
    );
    setTopics(updatedTopics);
    setSelectedTopic(null);
    saveToLocalStorage(updatedTopics);
  };

  // Add a new word to the selected topic
  const handleAddWord = () => {
    if (selectedTopic) {
      const updatedTopics = topics.map((topic) => {
        if (topic.name === selectedTopic) {
          return { ...topic, words: [...topic.words, newWord] };
        }
        return topic;
      });
      setTopics(updatedTopics);
      setNewWord({ en: '', vn: '', vowels: '', audio: '', example: '' });
      saveToLocalStorage(updatedTopics);
    } else {
      alert('Please select a topic to add vocabulary.');
    }
  };

  // Update a word in the selected topic
  const handleUpdateWord = () => {
    if (selectedTopic && editingWordIndex !== null) {
      const updatedTopics = topics.map((topic) => {
        if (topic.name === selectedTopic) {
          const updatedWords = topic.words.map((word, index) =>
            index === editingWordIndex ? { ...word, ...newWord } : word
          );
          return { ...topic, words: updatedWords };
        }
        return topic;
      });
      setTopics(updatedTopics);
      setNewWord({ en: '', vn: '', vowels: '', audio: '', example: '' });
      setEditingWordIndex(null); // Clear the editing state
      saveToLocalStorage(updatedTopics);
    }
  };

  // Delete a word from the selected topic
  const handleDeleteWord = (index) => {
    const updatedTopics = topics.map((topic) => {
      if (topic.name === selectedTopic) {
        const updatedWords = topic.words.filter((_, i) => i !== index);
        return { ...topic, words: updatedWords };
      }
      return topic;
    });
    setTopics(updatedTopics);
    saveToLocalStorage(updatedTopics);
  };

  // Filter words by search term
  const filteredWords =
    topics
      .find((topic) => topic.name === selectedTopic)
      ?.words.filter(
        (word) =>
          word.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
          word.vn.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

  return (
    <div>
      <div>
        <div>
          <h2>Topics</h2>
          <div>
            <Input
              style={{ marginRight: 6, marginTop: 6 }}
              value={newTopic}
              onChange={(_, newValue) => setNewTopic(newValue.value || '')}
            />
            <Button
              onClick={handleAddTopic}
              style={{ marginRight: 6, marginTop: 6 }}
            >
              Add Topic
            </Button>
          </div>
          <div>
            {topics.map((topic, index) => (
              <Button
                style={{ marginRight: 10, marginTop: 10 }}
                shape="circular"
                key={index}
                onClick={() => setSelectedTopic(topic.name)}
              >
                {topic.name} ({topic.words.length})
              </Button>
            ))}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '20px',
          }}
        >
          <div>
            <h2>Vocabulary</h2>
            {selectedTopic && (
              <>
                <div>
                  <Input
                    placeholder="English"
                    value={newWord.en}
                    onChange={(_, newValue) =>
                      setNewWord({ ...newWord, en: newValue.value || '' })
                    }
                    style={{ marginRight: 6, marginTop: 6 }}
                  />

                  <Input
                    placeholder="Vietnamese"
                    value={newWord.vn}
                    onChange={(_, newValue) =>
                      setNewWord({ ...newWord, vn: newValue.value || '' })
                    }
                    style={{ marginRight: 6, marginTop: 6 }}
                  />
                </div>
                <div>
                  {' '}
                  <Input
                    placeholder="Vowels"
                    value={newWord.vowels}
                    onChange={(_, newValue) =>
                      setNewWord({ ...newWord, vowels: newValue.value || '' })
                    }
                    style={{ marginRight: 2, marginTop: 6 }}
                  />{' '}
                  <Input
                    placeholder="Audio Link"
                    value={newWord.audio}
                    onChange={(_, newValue) =>
                      setNewWord({ ...newWord, audio: newValue.value || '' })
                    }
                    style={{ marginRight: 6, marginTop: 6 }}
                  />
                </div>
                <div>
                  {' '}
                  <Textarea
                    placeholder="Example Sentence"
                    value={newWord.example}
                    onChange={(_, newValue) =>
                      setNewWord({ ...newWord, example: newValue.value || '' })
                    }
                    size={'large'}
                    style={{ marginRight: 6, marginTop: 6, width: '99%' }}
                  />
                </div>
                {editingWordIndex !== null ? (
                  <Button
                    style={{ marginRight: 6, marginTop: 6 }}
                    onClick={handleUpdateWord}
                  >
                    Update Word
                  </Button>
                ) : (
                  <Button
                    style={{ marginRight: 6, marginTop: 6 }}
                    onClick={handleAddWord}
                  >
                    Add Word
                  </Button>
                )}
              </>
            )}
          </div>

          <div style={{ marginLeft: '50px' }}>
            <h2>Vocabulary List</h2>

            <div>
              {/* Search and List Words */}
              <SearchBox
                style={{ marginTop: 6, marginRight: 6 }}
                placeholder="Search"
                value={searchTerm}
                onChange={(_, newValue) => setSearchTerm(newValue.value || '')}
              />
            </div>
            {filteredWords.map((word, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '18px 0',
                }}
              >
                <span>
                  {word.en} - {word.vn} - {word.vowels}
                </span>

                {/* Audio Button */}
                {word.audio && (
                  <MdOutlineVolumeUp
                    style={{ marginLeft: 6, marginRight: 6 }}
                    size={24}
                    onClick={() => handlePlayAudio(word.audio)}
                  />
                )}
                <Popover>
                  <PopoverTrigger>
                    <Button
                      size="small"
                      style={{ marginLeft: 6, marginRight: 6 }}
                    >
                      Example
                    </Button>
                  </PopoverTrigger>

                  <PopoverSurface tabIndex={-1}>
                    <pre>{word.example}</pre>
                  </PopoverSurface>
                </Popover>
                <Button
                  size="small"
                  style={{ marginRight: 6 }}
                  onClick={() => {
                    setEditingWordIndex(index);
                    setNewWord(word); // Load the word into the input fields for editing
                  }}
                >
                  Edit
                </Button>
                <Button
                  style={{ marginRight: 6 }}
                  size="small"
                  onClick={() => handleDeleteWord(index)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vocabulary;
