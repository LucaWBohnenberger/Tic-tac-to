let name1 = "Player 1";
let name2 = "Player 2";
let status1 = 0;
let status2 = 0;
let turno = true;
let jogo = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let vs;
let player;
let count = 0;


const start = document.querySelector('form button[type="submit"]');
const cells = document.querySelectorAll('main div button');
let body = document.querySelector('body');

start.addEventListener('click', (e) => {
    e.preventDefault();
    name1 = document.querySelector('form input[name="name1"]').value;
    name2 = document.querySelector('form input[name="name2"]').value;
    iniciar();
});

function iniciar() {
    document.querySelector('form').style.display = "none";

    // Criação do elemento <h2> com o texto vs
    const vs = document.createElement('h2');
    vs.innerText = `${name1} vs ${name2}`;

    // Criação do elemento <h3> com o texto do jogador atual
    player = document.createElement('h3');
    player.innerText = `${name1} starts`;

    let status = document.querySelectorAll('main div p');
    status[0].innerText = `${name1}: ${status1}`;
    status[1].innerText = `${name2}: ${status2}`;

    // Adição dos elementos ao header
    document.querySelector('header').append(vs, document.createElement('br'), player);
    document.querySelector('main').style.display = "flex";

    turno = true;
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.innerText === "") {
            if (turno) {
                cell.innerText = "X";
                cell.style.color = '#ff7b7b';
                turno = false;
                count++;
                player.innerText = `${name2}'s turn`;  // Atualiza o texto do player corretamente
            } else {
                cell.innerText = "O";
                cell.style.color = '#7fc8f8';
                turno = true;
                count++;
                player.innerText = `${name1}'s turn`;  // Atualiza o texto do player corretamente
            }
            atulizar();
        }
    });
});

function atulizar() {
    jogo = [
        [cells[0].innerText, cells[1].innerText, cells[2].innerText],
        [cells[3].innerText, cells[4].innerText, cells[5].innerText],
        [cells[6].innerText, cells[7].innerText, cells[8].innerText]
    ];

    verificar();
}

function verificar() {
    let vencedor = "";
    let forma = ""
    let line = 0;

    // Verifica se há um vencedor
    for (let i = 0; i < 3; i++) {
        if (jogo[i][0] === jogo[i][1] && jogo[i][0] === jogo[i][2] && jogo[i][0] !== "") {
            vencedor = jogo[i][0];
            forma = "horizontal";
            line = i;
        }
        if (jogo[0][i] === jogo[1][i] && jogo[0][i] === jogo[2][i] && jogo[0][i] !== "") {
            vencedor = jogo[0][i];
            forma = "vertical";
            line = i;
        }
    }
    if (jogo[0][0] === jogo[1][1] && jogo[0][0] === jogo[2][2] && jogo[0][0] !== "") {
        vencedor = jogo[0][0];
        forma = "diagonal_1";
    }
    if (jogo[0][2] === jogo[1][1] && jogo[0][2] === jogo[2][0] && jogo[0][2] !== "") {
        vencedor = jogo[0][2];
        forma = "diagonal_2";
    }

    // Verifica se há um empate
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (jogo[i][j] === "") {
                empate = false;
            }
        }
    }

    if (vencedor !== "") {
        if (vencedor === "X") {
            status1++;
        } else {
            status2++;
        }
        if (vencedor === "X") {
            player.innerText = `${name1} wins!`;
        }
        else {
            player.innerText = `${name2} wins!`;
        }

        if (forma == "horizontal") {
            for (let i = 0; i < 3; i++) {
                cells[line + i].style.backgroundColor = "#90f790";
            }
        }
        if (forma == "vertical") {
            for (let i = 0; i < 3; i++) {
                cells[line + i * 3].style.backgroundColor = "#90f790";
            }

        }

        if (forma == "diagonal_1") {
            for (let i = 0; i < 3; i++) {
                if (jogo[i][i] == vencedor) {
                    cells[i * 4].style.backgroundColor = "#90f790";
                }
            }
        }

        if (forma == "diagonal_2") {
            for (let i = 0; i < 3; i++) {
                cells[i * 2 + 2].style.backgroundColor = "#90f790";
            }
        }


        cells.forEach(cell => cell.disabled = true);
        jogarNovamente();
    }

    if (count == 9 && vencedor == "") {
        player.innerText = "It's a tie!";
        cells.forEach(cell => {
            cell.style.backgroundColor = "yellow";
            cell.disabled = true;
            jogarNovamente();
        });
    }
}

function change() {
    if (body.dataset.theme === "light") {
        body.dataset.theme = "dark";
        document.documentElement.style.setProperty('--cor-principal', '#49d649');
        document.documentElement.style.setProperty('--cor-secundaria', '#f2f2f2');
        document.documentElement.style.setProperty('--cor-fundo', '#2e2e2e ');
    } else {
        body.dataset.theme = "light";
        document.documentElement.style.setProperty('--cor-principal', '#34a853');
        document.documentElement.style.setProperty('--cor-secundaria', '#9e9e9e');
        document.documentElement.style.setProperty('--cor-fundo', '#f2f2f2');
    }
}

function jogarNovamente() {
    const button = document.createElement('button');
    button.classList.add('play-again');
    button.innerText = "Play again";
    button.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.innerText = "";
            cell.style.backgroundColor = "var(--cor-fundo)";
            cell.disabled = false;
        });
        player.innerText = `${name1} starts`;
        let status = document.querySelectorAll('main div p');
        status[0].innerText = `${name1}: ${status1}`;
        status[1].innerText = `${name2}: ${status2}`;
        count = 0;
    });
    body.appendChild(button);
}
