export const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const handlePlayAudio = (audioUrl) => {
  const audio = new Audio(
    audioUrl ||
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/h/hel/hello/hello__1_gb_2.mp3'
  );
  audio.play().catch((error) => {
    console.error('Audio play failed', error);
  });
};