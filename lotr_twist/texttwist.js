
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var randomBackgrounds = ["http://www.themarysue.com/wp-content/uploads/2014/09/the-return-of-the-king.jpg",
                         "http://orig02.deviantart.net/c98d/f/2012/028/d/a/lord_of_the_rings_painting_study_by_ejdc-d4nulxc.jpg",
                         "http://images8.alphacoders.com/434/434811.jpg",
                         "http://40.media.tumblr.com/tumblr_mahmtfwotG1rgmu4ro1_1280.jpg",
                         "http://static-3.nexusmods.com/15/images/101/547124-1330747376.jpg",
                         "http://www.hdwallpaperscool.com/wp-content/uploads/2015/01/gandalf-the-lord-of-the-rings-widescreen-high-resolution-wallpaper-for-deskop-background-download-lord-of-the-ring-images-free.jpg",
                         "http://static.comicvine.com/uploads/original/11120/111204187/4501676-22j79a.jpg"
                        ]
$(document).ready(function() {
  // Load ramdom background
  document.body.style.backgroundImage = "url(" + randomBackgrounds[getRandomInt(0, randomBackgrounds.length)] + ")";
  var selectedText = textTwistLibrary[getRandomInt(0, textTwistLibrary.length)];
  var validWords = selectedText.words.split(" ");

  // Populate page
  $(".letters").text(selectedText.letters);
  $(".answers").text(selectedText.words.replace(/[a-z]/g, "-"));

  var revealAnswer = function(index) {
    var words = $(".answers").text().split(" ");
    // Replace hidden word with real word
    words[index] = validWords[index];
    $(".answers").text(words.join(" "));

    // Clear out input form
    $(".lettersField").val("");
  };

  var checkAnswer = function(answer) {
    for (var i = 0; i < validWords.length; i++) {
      if (validWords[i] === answer) {
        return i;
      }
    }
    return -1;
  };

  $(".lettersField").on("keyup", function(e) {
    if (e.keyCode == 13) {
      var submittedAnswer = $(e.currentTarget).val();
      var indexOfWord = checkAnswer(submittedAnswer);
      if (indexOfWord >= 0) {
        revealAnswer(indexOfWord);
      } else {
        console.log("not found");
      }
    }
  });
});