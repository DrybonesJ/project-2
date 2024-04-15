document.addEventListener("DOMContentLoaded", function () {
    const retryButton = document.getElementById('retry-btn');
    const triviaForm = document.getElementById('trivia-form');

    retryButton.addEventListener('click', function () {
        triviaForm.reset(); // Reset all input fields
        const inputFields = triviaForm.querySelectorAll('input[type="text"]');
        inputFields.forEach(function (input) {
            input.style.backgroundColor = ''; // Reset background color
        });
    });

    const submitButton = document.getElementById('submit-btn');

    submitButton.addEventListener('click', function () {
        let score = 0;
        const wrongAnswers = [];

        triviaForm.querySelectorAll('.question').forEach(function (question) {
            const input = question.querySelector('input[type="text"]');
            const answer = input.value.trim().toLowerCase();
            const correctAnswerSpan = question.querySelector('.correct-answer');

            if (answer === correctAnswerSpan.textContent.toLowerCase().replace('correct answer: ', '')) {
                input.style.backgroundColor = '#00ff00'; // Green
                score++;
            } else {
                input.style.backgroundColor = '#ff0000'; // Red
                wrongAnswers.push(correctAnswerSpan.textContent);
            }
        });

        let message;
        if (score >= 8) {
            message = "You are 1st Team All NBA";
        } else if (score >= 5) {
            message = "Pretty good, rotational player";
        } else {
            message = "Need some studying up, rookie";
        }

        alert(`Your score: ${score}/10\n${message}`);

        wrongAnswers.forEach(function (answer) {
            const question = document.querySelector(`.correct-answer:not(.hidden):contains("${answer}")`).closest('.question');
            const input = question.querySelector('input[type="text"]');
            input.value = answer.split(':')[1].trim(); // Set the input value to the correct answer
            input.style.backgroundColor = '#00ff00'; // Green
        });

        submitButton.style.display = 'none';
        retryButton.style.display = 'inline-block';
    });

    const hintButtons = document.querySelectorAll('.hint-btn');

    hintButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const team = button.dataset.team;
            alert(`Hint: Played for ${team}. `);
            // You can add code to show the team's logo image here
        });
    });

    window.onload = function () {
        var video = document.getElementById("youtube-video");
        video.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    };


});
