var randomBackgrounds = ["http://www.themarysue.com/wp-content/uploads/2014/09/the-return-of-the-king.jpg",
                         "http://orig02.deviantart.net/c98d/f/2012/028/d/a/lord_of_the_rings_painting_study_by_ejdc-d4nulxc.jpg",
                         "http://images8.alphacoders.com/434/434811.jpg",
                         "http://40.media.tumblr.com/tumblr_mahmtfwotG1rgmu4ro1_1280.jpg",
                         "http://static-3.nexusmods.com/15/images/101/547124-1330747376.jpg",
                         "http://www.hdwallpaperscool.com/wp-content/uploads/2015/01/gandalf-the-lord-of-the-rings-widescreen-high-resolution-wallpaper-for-deskop-background-download-lord-of-the-ring-images-free.jpg",
                         "http://static.comicvine.com/uploads/original/11120/111204187/4501676-22j79a.jpg"
                        ]

var selectedText = textTwistLibrary[getRandomInt(0, textTwistLibrary.length)];
var validWords = selectedText.words.split(" ");

// Helper functions ------------------------------------------------------------

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

function revealAnswer(index) {
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
  // Load ramdom background
  document.body.style.backgroundImage = "url(" + randomBackgrounds[getRandomInt(0, randomBackgrounds.length)] + ")";
  // Populate page
  $(".letters").text(selectedText.letters);
  $(".answers").text(selectedText.words.replace(/[a-z]/g, "-"));

  $(".lettersField").on("keyup", function(e) {
    // Enter key functionality
    if (e.keyCode == 13) {
      var submittedAnswer = $(e.currentTarget).val();
      if (isValidAnswer(validWords, submittedAnswer)) {
        var indexOfWord = getIndexOfWord(submittedAnswer);
        revealAnswer(indexOfWord);
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

// Attach listeners ------------------------------------------------------------
$(document).on("keyup", function(e) {
  if (e.keyCode == 32) {
    var word = $(".letters").text();
    randomizeCharacters(word);
  }
})