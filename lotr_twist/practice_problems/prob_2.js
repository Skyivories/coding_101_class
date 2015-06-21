var checkAnswer = function(words, answer) {
  for (var i = 0; i < words.length; i++) {
    if (words[i] === answer) {
      return i;
    }
  }
  return -1;
};

//