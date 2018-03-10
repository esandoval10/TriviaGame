var moviesShuffled = [],
    correctGuess = 0,
    movieIndex = 0,
    wrongGuess = 0,
    unanswered = 0,
    currentMovie = " ",
    answerData = " ",
    inputStatus = false;


var game = {
    movies : [
        moana = {
            question: "Which two Disney characters made a special appearance in Moana",
            choices: ["Flounder & Olaf", "Sebastian & Olaf", "Pongo & Flounder", "Timon & Pumba"],
            answer: "Flounder & Olaf",
            image: "<img src='assets/images/moana.gif'  class='movieImage' alt='header'>",
        },
        frozen = {
            question: "In Frozen, which Disney princess visits Arendelle for coronation day",
            choices: ["Rapunzel", "Aurora", "Belle", "Tiara"],
            answer: "Rapunzel",
            image: "<img src='assets/images/frozen.gif'  class='movieImage' alt='header'>",
        },
        dalmatians = {
            question: "What is the name of the owner of Pongo in 101 Dalmatians?",
            choices: ["Roger", "Anita", "James", "Horace"],
            answer: "Roger",
            image: "<img src='assets/images/dalmatians.gif'  class='movieImage' alt='header'>",
        },
        pinocchio = {
            question: "When Gepetto ventures out to find Pinocchio he is eatean by which animal?",
            choices: ["Whale", "Lion", "Shark", "Alligator"],
            answer: "Whale",
            image: "<img src='assets/images/pinocchio.gif'  class='movieImage' alt='header'>",
        },
        dumbo = {
            question: "How many words does Dumbo say throughout the movie?",
            choices: ["None", "One", "Three", "Five"],
            answer: "None",
            image: "<img src='assets/images/dumbo.gif'  class='movieImage' alt='header'>",
        },
        aladdin = {
            question: "In Aladdin, according to Prince Ali's song, which animals are not part of Ali's animal collection?",
            choices: ["75 Golden Camels", "95 White Persian Monkeys", "53 Purple Peacocks", "45 Red Parrots"],
            answer: "45 Red Parrots",
            image: "<img src='assets/images/aladdin.gif'  class='movieImage' alt='header'>",
        },
        bambi = {
            question: "How many spots does Bambi have on each side?",
            choices: ["Four", "Three", "Eight", "Six"],
            answer: "Eight",
            image: "<img src='assets/images/bambi.gif'  class='movieImage' alt='header'>",
        },
        lionKing = {
            question: "What does Rafiki mean in Swahili?",
            choices: ["Friend", "Wise", "Monkey", "Strange"],
            answer: "Friend",
            image: "<img src='assets/images/lionKing.gif'  class='movieImage' alt='header'>",
        },
        cinderella = {
            question: "In Cinderella, How many birds come to wake up Cinderella?",
            choices: ["Three", "Four", "Two", "One"],
            answer: "Two",
            image: "<img src='assets/images/cinderella.gif'  class='movieImage' alt='header'>",
        },
        mermaid = {
            question: "In the little mermaid, what's the name of Ariel's oldest sister?",
            choices: ["Attina", "Adella", "Aquata", "Arista"],
            answer: "Attina",
            image: "<img src='assets/images/mermaid.gif'  class='movieImage' alt='header'>",
        },
    ],

// Starts the game var currentMovie

    startGame : function(){
        this.shuffleMovies(moviesShuffled);
        currentMovie = moviesShuffled[movieIndex];
        // console.log(currentMovie);
        timer.startTimer();
        this.displayQuestion();
        movieIndex ++;
    },
    
// Shuffles Movies array at Start of game

    shuffleMovies : function(moviesToShuffle){
        for (shuffle = 0; shuffle < this.movies.length; shuffle ++){
            moviesToShuffle.push(this.movies[shuffle]);
        }
        moviesToShuffle = this.shuffleArrays(moviesToShuffle);
        return(moviesToShuffle);
    },

    shuffleChoices : function(choicesToShuffle){
        choicesToShuffle = this.shuffleArrays(choicesToShuffle);
        return(choicesToShuffle);
    },

    displayQuestion : function(){
        var displayQuestion = $("#question"),
            questionParagraph = $("<h1>");
        questionParagraph.text(currentMovie.question);
        displayQuestion.append(questionParagraph);
        var randomChoices = this.shuffleChoices(currentMovie.choices);
        // console.log(randomChoices);
        answerData = currentMovie.answer;
        // console.log("Answer: " + answerData);
        this.fillChoices(randomChoices); 
        
    },

    fillChoices: function(currentChoices){

        for (var i = 0; i < currentChoices.length; i++) {

            var choice = currentChoices[i];
            // console.log(choice);

            var displayChoice = $("#answers"),
            choiceDiv = $("<div>");
            choiceButton = $("<button>")
            choiceButton.addClass("btn btn-info btn-lg btn-block choiceBttn");
            choiceButton.text(choice);
            choiceDiv.append(choiceButton);
            displayChoice.append(choiceDiv);

            if(choice === answerData){
                choiceButton.attr("data-name", answerData);
            }
            else{
                choiceButton.attr("data-name", "wrong");
            }
        }

    },

// Displays the Next Question

    nextQuestion : function (){

        $("#question").empty();
        $("#answers").empty();
        $("#message").empty();
        $("#caption").empty();
        $("#image").empty();

        document.getElementById('message').style.display = "none";
        document.getElementById('caption').style.display = "none";
        document.getElementById('image').style.display = "none";
        document.getElementById('answers').style.display = "block";
        document.getElementById('question').style.display = "block";

        if (movieIndex < 10){
        currentMovie = moviesShuffled[movieIndex];
        // console.log(currentMovie);
        this.displayQuestion();
        movieIndex ++;
        timer.reset();
        }
        else {
            game.showResults();
        }
    },

// Display the Image and result of users selection

    displayImage : function (message){
        document.getElementById('question').style.display = "none";
        document.getElementById('answers').style.display = "none";
        document.getElementById('message').style.display = "block";
        document.getElementById('image').style.display = "block";

        var displayMessage = $("#message"),
            messageDiv = $("<div>");
            messageDiv.text(message);
            displayMessage.append(messageDiv);

        var displayImage = $("#image"),
            imageDiv = $("<div>");
            imageDiv.html(currentMovie.image);
            imageDiv.addClass("movieImg");
            displayImage.append(imageDiv);

        if(message === "Out of Time!" || message === "Wrong!"){
            document.getElementById('caption').style.display = "block";

            var displayCaption = $("#caption"),
            captionDiv = $("<div>");
            captionDiv.text("The correct answer was: " + answerData);
            captionDiv.addClass("captionImg");
            displayCaption.append(captionDiv);
        };
    },

// shuffles any array

    shuffleArrays : function(array){
            var counter = array.length;
        
            // While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                var index = Math.floor(Math.random() * counter);
        
                // Decrease counter by 1
                counter--;
        
                // And swap the last element with it
                var temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
        
            return array;
    },

// checks if user clicked he right or wrong answer

    rightOrWrong : function (click){
        if (click != "wrong"){
            correctGuess ++;
            return true;
        }
        else{
            wrongGuess ++;
            return false
        }
    },

// Shows Results Page

    showResults : function(){
        document.getElementById('gamePg').style.display = "none";
        document.getElementById('resultsPg').style.display = "block";

        var displayCorrect = $("#correct"),
            correctDiv = $("<div>");
            correctDiv.text("Correct: " + correctGuess);
            displayCorrect.append(correctDiv);

        var displayIncorrect = $("#incorrect"),
            incorrectDiv = $("<div>");
            incorrectDiv.text("Wrong: " + wrongGuess );
            displayIncorrect.append(incorrectDiv);

        var displayUnanswered = $("#unanswered"),
            unansweredDiv = $("<div>");
            unansweredDiv.text("Unanswered: " + unanswered);
            displayUnanswered.append(unansweredDiv);
        // console.log("Unanswered: " + unanswered + " Wrong: " + wrongGuess + " Correct: " + correctGuess);



    },

    // resets game values

    restartGame : function(){
        var moviesShuffled = [],
            correctGuess = 0,
            movieIndex = 0,
            wrongGuess = 0,
            unanswered = 0,
            currentMovie = " ",
            answerData = " ",
            inputStatus = false;

        document.getElementById('gamePg').style.display = "block";
        document.getElementById('resultsPg').style.display = "none";

        this.startGame();
    }
};

var intervalId;
var clockRunning = false;
var timeMessage = "Out of Time!";

timer = {
    time : 10,
    count : function(){
        var timeLeft = timer.time--;
        if (timeLeft != 0 ){
            $("#timer").html("Seconds Left: " + timeLeft);
        }
        else{
            timer.stopTimer();
            unanswered++;
            game.displayImage(timeMessage)
            setTimeout(function(){
                game.nextQuestion(); }, 5000);
        }
        
    },

    stopTimer : function(){
        clearInterval(intervalId);
            clockRunning = false;
    },
    startTimer : function(){
        if(!clockRunning){
        intervalId = setInterval(timer.count, 1000);
        clockRunning = true;  
        }   
    },
    reset : function(){
        timer.time = 10;
        $("#timer").html("Seconds Left: " + timer.time);
        timer.startTimer();
    }
};

function showGamePg() { 
    document.getElementById('startPg').style.display = "none";
    document.getElementById('gamePg').style.display = "block";
    game.startGame();
  } 

$(document).on('click', '.choiceBttn', function() {
    timer.stopTimer();
    userInput = $(this).data('name');
    // console.log(userInput);
    inputStatus = game.rightOrWrong(userInput);
    // console.log(inputStatus);
    if (inputStatus){
        var message = "Correct!" 
        game.displayImage(message)
        setTimeout(function(){
            game.nextQuestion(); }, 5000);
    }
    else if(inputStatus === false){
        var message = "Wrong!"
        game.displayImage(message)
        setTimeout(function(){
            game.nextQuestion(); }, 5000);
    };
    
});

// $(document).on('click', '.reset', function(){

// });