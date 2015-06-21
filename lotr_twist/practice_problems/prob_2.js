function isValidAnswer(words, answer) {
  for (var i = 0; i < words.length; i++) {
    if (words[i] === answer) {
      return true;
    }
  }
  return false;
}