var randomBackgrounds = ['backgrounds/arwenaragorn.jpg',
                         'backgrounds/argonath.jpg',
                         'backgrounds/rivendell1.jpg',
                         'backgrounds/rivendell2.jpg',
                         'backgrounds/minastirith.jpg'
                        ];

$(document).ready(function() {
  // Load ramdom background
  document.body.style.backgroundImage = "url(" + randomBackgrounds[getRandomInt(0, randomBackgrounds.length)] + ")";
});