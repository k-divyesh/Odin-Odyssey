// Logic
const HAND_SIGNS: string[] = ["Rock", "Paper", "Scissor"];

function getComputerChoice(): string {
    return HAND_SIGNS[Math.floor(Math.random() * 3)];
}

function getPlayerChoice(): string {
    return playerChoice;
}

function playRound(playerChoice: string, computerChoice: string): string {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    } else if (
        (playerChoice === "Rock" && computerChoice === "Scissor") ||
        (playerChoice === "Paper" && computerChoice === "Rock") ||
        (playerChoice === "Scissor" && computerChoice === "Paper")
    ) {
        return `You Win! ${playerChoice} beats ${computerChoice}`;
    } else {
        return `You Lose! ${computerChoice} beats ${playerChoice}`;
    }
}

let total_score: number = 0;
let round_count: number = 1;

function game(): void {
    if (round_count > 5) {
        decideWinner(total_score);
        return;
    }

    let round: string = playRound(getPlayerChoice(), getComputerChoice());
    display_round_result(round, round_count);

    let result: string = round.slice(4, 7);

    let round_score: number;
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

function decideWinner(score: number): void {
    let game_result: string;
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

let buttonNodes: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll("button");

//@ts-ignore
let buttons = Array.from(buttonNodes);

var playerChoice: string;
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

function display_round_result(result: string, round_num: number): void {
    let element = document.querySelector("#result");
    element!.innerHTML = `(${round_num.toString()}/5) ${result}`;
}

function update_total_score(roundScore: number): void {
    let player_score = document.querySelector("#player_score");
    let comp_score = document.querySelector("#comp_score");

    if (roundScore > 0) {
        player_score!.innerHTML = (
            parseInt(player_score!.innerHTML) + roundScore
        ).toString();
    } else if (roundScore < 0) {
        comp_score!.innerHTML = (
            parseInt(comp_score!.innerHTML) + Math.abs(roundScore)
        ).toString();
    }
}

let gameResult: Element | null = document.querySelector(".game-result");
function display_game_result(result: string): void {
    gameResult!.innerHTML = `<h1 class="result">${result}</h1><button onclick="location.reload()">restart</button>`;
    gameResult?.classList.remove("hidden");
}
