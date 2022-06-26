const capitalizeSentence = (sentence: string): string => {
  if (!sentence) {
    throw new Error('Sentence must not be empty string.');
  }

  return sentence
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(' ');
};

export default capitalizeSentence;
