// Import stylesheets
import './style.css';

(() => {
  const app: HTMLDivElement = document.querySelector('#app')!;

  const squares = Array(9).fill('');
  const patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let winner: null | string = null;
  let player = 'X';

  const result = () => {
    const squaresHtml = document.querySelectorAll('.square');
    squaresHtml.forEach((square) => {
      square.classList.add('noClick');
    });
    const title = document.createElement('h1');
    title.innerText = `Player Win: ${player}`;
    app.prepend(title);
  };

  const calculationWinner = () => {
    patterns.forEach(([a, b, c]) => {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        winner = squares[a];
      return;
    });
  };

  const reset = () => {
    squares.fill('');
    player = 'X';
    winner = null;
    const title = document.querySelector('h1');
    if (title) title.remove();
    renderSquare();
  };

  const squareEvent = (e: Event, index: number) => {
    const squareTarget = e.target as HTMLDivElement;
    squareTarget.classList.add(player);
    squares[index] = player;
    calculationWinner();
    if (winner !== null) {
      result();
      return;
    }
    player = player === 'X' ? 'O' : 'X';
  };

  const renderSquare = () => {
    const table: HTMLDivElement = document.querySelector('#table')!;
    if (table.childElementCount > 0) {
      table.innerHTML = ``;
    }
    squares.forEach((_, index) => {
      const squareHTML = document.createElement('div');
      squareHTML.classList.add('square');
      squareHTML.addEventListener('click', (e) => squareEvent(e, index));
      table.appendChild(squareHTML);
    });
  };

  const renderTable = (app: HTMLDivElement) => {
    app.innerHTML = `
    <div id="table"></div>
  `;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Reset';
    btn.addEventListener('click', reset);
    app.appendChild(btn);
    renderSquare();
  };

  renderTable(app);
})();
