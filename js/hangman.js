(() => {
  const categoryEl = document.getElementById("hm-category");
  const livesEl = document.getElementById("hm-lives");
  const wordEl = document.getElementById("hm-word");
  const lettersEl = document.getElementById("hm-letters");
  const msgEl = document.getElementById("hm-message");
  const newBtn = document.getElementById("hm-newword");

  const parts = [
    document.getElementById("hm-head"),
    document.getElementById("hm-body"),
    document.getElementById("hm-arm-left"),
    document.getElementById("hm-arm-right"),
    document.getElementById("hm-leg-left"),
    document.getElementById("hm-leg-right")
  ];

  const words = [
    {cat:"Tecnología", list:["JAVASCRIPT","COMPUTADORA","SERVIDOR","ALGORITMO","INTERNET"]},
    {cat:"Animales", list:["BASSET","JAGUAR","TORTUGA","CONEJO","DELFIN"]},
    {cat:"Guatemala", list:["ATITLAN","PANAJACHEL","QUETZAL","ANTIGUA","PETEN"]}
  ];

  let secret = "";
  let display = [];
  let used = new Set();
  let lives = 6;
  let active = true;

  function randomWord(){
    const group = words[Math.floor(Math.random()*words.length)];
    const w = group.list[Math.floor(Math.random()*group.list.length)];
    categoryEl.textContent = group.cat;
    return w;
  }

  function init(){
    secret = randomWord();
    display = Array(secret.length).fill("_");
    used.clear();
    lives = 6;
    active = true;
    msgEl.textContent = "";
    msgEl.className = "message";

    parts.forEach(p => p.classList.add("hidden"));

    renderWord();
    renderLetters();
    updateLives();
  }

  function renderWord(){
    wordEl.textContent = display.join(" ");
  }

  function renderLetters(){
    lettersEl.innerHTML = "";
    const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    [...alphabet].forEach(ch => {
      const btn = document.createElement("button");
      btn.className = "letter-btn";
      btn.textContent = ch;
      btn.disabled = used.has(ch) || !active;
      btn.addEventListener("click", () => guess(ch));
      lettersEl.appendChild(btn);
    });
  }

  function updateLives(){
    livesEl.textContent = lives;
  }

  function guess(ch){
    if(!active || used.has(ch)) return;
    used.add(ch);

    if(secret.includes(ch)){
      for(let i=0;i<secret.length;i++){
        if(secret[i] === ch) display[i] = ch;
      }
      renderWord();
      if(display.join("") === secret){
        active = false;
        msgEl.textContent = `¡Ganaste! La palabra era ${secret} 🎉`;
        msgEl.classList.add("win");
      }
    } else {
      lives--;
      updateDrawing();
      updateLives();
      if(lives === 0){
        active = false;
        msgEl.textContent = `Perdiste La palabra era ${secret}`;
        msgEl.classList.add("lose");
        display = secret.split("");
        renderWord();
      }
    }

    renderLetters();
  }

  function updateDrawing(){
    const shown = 6 - lives;
    if(parts[shown-1]) parts[shown-1].classList.remove("hidden");
  }

  newBtn.addEventListener("click", init);
  init();
})();