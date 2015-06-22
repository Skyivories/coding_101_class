// Select a random text-twist word
var selectedText = textTwistLibrary[getRandomInt(0, textTwistLibrary.length)];
var validWords = selectedText.words.split(" ");

// Helper functions ------------------------------------------------------------

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function revealAnswer(submittedAnswer) {
  var index = getIndexOfWord(submittedAnswer);
  var words = $(".answers").text().split(" ");
  // Replace hidden word with real word
  words[index] = validWords[index];
  $(".answers").text(words.join(" "));

  // Clear out input form
  $(".lettersField").val("");
}

// Given a string, return a new string with the characters in a random order
function randomizeCharacters(word) {
  var charArray = word.split("");
  var n = charArray.length;
  for(var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = charArray[i];
      charArray[i] = charArray[j];
      charArray[j] = tmp;
  }
  $(".letters").text(charArray.join(""));
}

function getIndexOfWord(answer) {
  for (var i = 0; i < validWords.length; i++) {
    if (validWords[i] === answer) {
      return i;
    }
  }
  return -1;
}

function showAllAnswers() {
  $(".answers").text(selectedText.words);
  $(".showAllAnswers").hide();
}

// Render letters and answers on page ------------------------------------------

$(document).ready(function() {
  // Add letters to page
  $(".letters").text(selectedText.letters);
  $(".answers").text(selectedText.words.replace(/[a-z]/g, "-"));

  $(".lettersField").on("keyup", function(e) {
    // Enter key functionality
    if (e.keyCode == 13) {
      var submittedAnswer = $(e.currentTarget).val();
      if (isValidAnswer(validWords, submittedAnswer)) {
        revealAnswer(submittedAnswer);
      } else {
        $(".lettersField").val("");
      }
      $(".letters").text(selectedText.letters);
    }
  });

  $(".showAllAnswers").on("click", showAllAnswers);

  $(".lettersField").on("keydown", function(e) {
    // On backspace, put character back in letters display
    if (e.keyCode == 8) {
      var length = $(".lettersField").val().length;
      var lastChar = $(".lettersField").val().substring(length-1, length);
      $(".letters").text($(".letters").text() + lastChar);
    } else {
      // Check that the input is only valid letters. If the letters are valid,
      // remove them from the letters display
      var charCode = e.keyCode;
      var charStr = String.fromCharCode(charCode).toLowerCase();
      if ($(".letters").text().indexOf(charStr) < 0) {
        return false;
      } else {
        var newLetters = $(".letters").text().replace(charStr, "");
        $(".letters").text(newLetters);
      }
    }
  });
});

// Space bar randomizes letters
$(document).on("keyup", function(e) {
  if (e.keyCode == 32) {
    var word = $(".letters").text();
    randomizeCharacters(word);
  }
})