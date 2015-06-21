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
    } else {
      // Check that the input is only valid letters
      var regex = RegExp("[" + selectedText.letters + "]+");
      var newInputVal = $(".lettersField").val().match(regex);
      $(".lettersField").val(newInputVal);
      // If a user types a valid character, remove it from the letters display
      var charCode = e.keyCode;
      var charStr = String.fromCharCode(charCode).toLowerCase();
      if ($(".letters").text().indexOf(charStr) >= 0) {
        var newLetters = $(".letters").text().replace(charStr, "");
        $(".letters").text(newLetters);
      }
    }
  });
});

$(document).on("keyup", function(e) {
  if (e.keyCode == 32) {
    var word = $(".letters").text();
    randomizeCharacters(word);
  }
})