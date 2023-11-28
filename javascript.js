const HAND_SIGNS = ["rock", "paper", "scissor"];

function getComputerChoice() {
    return HAND_SIGNS[Math.floor(Math.random() * 3)];
}

function getPlayerChoice() {
    return prompt("enter-rock/paper/scissor: ").trim().toLowerCase();
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissor") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissor" && computerChoice === "paper")
    ) {
        return `You Win! ${playerChoice} beats ${computerChoice}`;
    } else {
        return `You Lose! ${computerChoice} beats ${playerChoice}`;
    }
}

function game() {
    let total_score = 0;
    let round_count = 0;

    while (round_count < 5) {
        let round = playRound(getPlayerChoice(), getComputerChoice());
        let result = round.slice(4, 7);

        let round_score;
        if (result == "Win") {
            round_score = 1;
        } else if (result == "Los") {
            round_score = -1;
        } else {
            round_score = 0;
        }

        total_score += round_score;

        round_count += 1;
    }

    let game_result;

    if (total_score < 0) {
        game_result = "computer won, player lost";
    } else if (total_score == 0) {
        game_result = "it's a tie";
    } else {
        game_result = "player won, computer lost";
    }

    return game_result;
}
