(() => {
  const boardEl = document.getElementById("ttt-board");
  const turnEl = document.getElementById("ttt-turn");
  const scoreEl = document.getElementById("ttt-score");
  const msgEl = document.getElementById("ttt-message");
  const restartBtn = document.getElementById("ttt-restart");
  const resetScoreBtn = document.getElementById("ttt-reset-score");

  let board, current, active;
  let score = { X: 0, O: 0, D: 0 };

  const wins = [
    [0,1,2],[3,4,5],[6,7,8],  // rows
    [0,3,6],[1,4,7],[2,5,8],  // cols
    [0,4,8],[2,4,6]           // diagonals
  ];

  function init(){
    board = Array(9).fill("");
    current = "X";
    active = true;
    msgEl.textContent = "";
    msgEl.className = "message";
    render();
    updateTurn();
  }

  function render(){
    boardEl.innerHTML = "";
    board.forEach((val, i) => {
      const cell = document.createElement("button");
      cell.className = "cell";
      cell.textContent = val;
      cell.addEventListener("click", () => play(i));
      boardEl.appendChild(cell);
    });
  }

  function updateTurn(){
    turnEl.textContent = active ? `Turno: ${current}` : "Ronda terminada";
    scoreEl.textContent = `X: ${score.X} | O: ${score.O} | Empates: ${score.D}`;
  }

  function play(i){
    if(!active || board[i]) return;
    board[i] = current;
    render();

    const winnerInfo = checkWinner();
    if(winnerInfo){
      active = false;
      highlightWin(winnerInfo.line);
      score[winnerInfo.player]++;
      msgEl.textContent = `¡Gana ${winnerInfo.player}!`;
      msgEl.classList.add("win");
      updateTurn();
      return;
    }

    if(board.every(c => c !== "")){
      active = false;
      score.D++;
      msgEl.textContent = "Empate";
      updateTurn();
      return;
    }

    current = current === "X" ? "O" : "X";
    updateTurn();
  }

  function checkWinner(){
    for(const line of wins){
      const [a,b,c] = line;
      if(board[a] && board[a] === board[b] && board[a] === board[c]){
        return { player: board[a], line };
      }
    }
    return null;
  }

  function highlightWin(line){
    const cells = [...boardEl.children];
    line.forEach(i => cells[i].classList.add("win"));
  }

  restartBtn.addEventListener("click", init);
  resetScoreBtn.addEventListener("click", () => {
    score = {X:0,O:0,D:0};
    init();
  });

  init();
})();