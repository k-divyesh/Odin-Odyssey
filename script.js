// Logic
var HAND_SIGNS = ["Rock", "Paper", "Scissor"];
function getComputerChoice() {
    return HAND_SIGNS[Math.floor(Math.random() * 3)];
}
function getPlayerChoice() {
    return playerChoice;
}
function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    } else if (
        (playerChoice === "Rock" && computerChoice === "Scissor") ||
        (playerChoice === "Paper" && computerChoice === "Rock") ||
        (playerChoice === "Scissor" && computerChoice === "Paper")
    ) {
        return "You Win! "
            .concat(playerChoice, " beats ")
            .concat(computerChoice);
    } else {
        return "You Lose! "
            .concat(computerChoice, " beats ")
            .concat(playerChoice);
    }
}
var total_score = 0;
var round_count = 1;
function game() {
    if (round_count > 5) {
        decideWinner(total_score);
        return;
    }
    var round = playRound(getPlayerChoice(), getComputerChoice());
    display_round_result(round, round_count);
    var result = round.slice(4, 7);
    var round_score;
    if (result == "Win") {
        round_score = 1;
    } else if (result == "Los") {
        round_score = -1;
    } else {
        round_score = 0;
    }
    if (round_count == 5) {
        round_count += 1;
        decideWinner(total_score);
        return;
    }
    round_count += 1;
    total_score += round_score;
    update_total_score(round_score);
}
function decideWinner(score) {
    var game_result;
    if (score < 0) {
        game_result = "computer won, player lost";
    } else if (score == 0) {
        game_result = "it's a tie";
    } else {
        game_result = "player won, computer lost";
    }
    display_game_result(game_result);
}
// DOM Manipulation
var buttonNodes = document.querySelectorAll("button");
//@ts-ignore
var buttons = Array.from(buttonNodes);
var playerChoice;
buttons.forEach(function (button) {
    button.onclick = function () {
        buttons.forEach(function (button) {
            button.style.border = "2px solid black";
        });
        playerChoice = button.innerText.slice(0, -3);
        button.style.border = "2px solid green";
        game();
    };
});
function display_round_result(result, round_num) {
    var element = document.querySelector("#result");
    element.innerHTML = "(".concat(round_num.toString(), "/5) ").concat(result);
}
function update_total_score(roundScore) {
    var player_score = document.querySelector("#player_score");
    var comp_score = document.querySelector("#comp_score");
    if (roundScore > 0) {
        player_score.innerHTML = (
            parseInt(player_score.innerHTML) + roundScore
        ).toString();
    } else if (roundScore < 0) {
        comp_score.innerHTML = (
            parseInt(comp_score.innerHTML) + Math.abs(roundScore)
        ).toString();
    }
}
var gameResult = document.querySelector(".game-result");
function display_game_result(result) {
    gameResult.innerHTML = '<h1 class="result">'.concat(
        result,
        '</h1><button onclick="location.reload()">restart</button>'
    );
    gameResult === null || gameResult === void 0
        ? void 0
        : gameResult.classList.remove("hidden");
}
