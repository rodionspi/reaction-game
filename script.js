const start = document.querySelector('.start'),
      table = document.querySelector('.table'),
      text = document.querySelector('.text'),
      timer = document.querySelector('.timer'),
      restart = document.querySelector('.restart'),
      intervalFunction = () => {
        if (time > 0) {
            time -= 1;
            timer.innerHTML = "Времени осталось:" + time;
        } else{
            timer.innerHTML = `Вам удалось дойти до ${num_of_cells - 1} уровня`;
            currNum = 0;
            clearInterval(intervalId); 
        }
      };

let tds = [],
    currNum = 1,
    counter = 0,
    time = 75,
    num_of_cells = 2,
    size = 100,
    intervalId;

timer.innerHTML = "Времени осталось:" + time;

function createTable() {
    tds=[];
    currNum = 1;
    counter = 0;
    for(let i=0; i < num_of_cells; i++) {
        const tr = document.createElement('tr');
        for(let j=0; j < num_of_cells; j++) {
            const td = document.createElement('td');
            tds.push(td);
            td.style.color = `rgb(${randomInterval(1, 255)}, ${randomInterval(1, 255)}, ${randomInterval(1, 255)})`;
            td.style.fontSize = randomInterval(15, 35) + 'px';
            td.addEventListener('click', colorChange);
            td.style.height = `${size / (num_of_cells * 2)}%`;
            td.style.width = `${size / (num_of_cells * 2)}%`;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let arr = shuffle(num_of_cells**2);
    for (let i = 0; i<num_of_cells**2; i++) {
        tds[i].innerHTML = arr[i];
        tds[i].style.backgroundColor = 'white'
    }
}

createTable();

restart.addEventListener('click', restartGame);
start.addEventListener('click', startGame);

function startGame() {
    restart.style.display = 'block';
    intervalId = setInterval(intervalFunction, 1000);
    table.style.display = 'table';
    timer.style.display = 'inline-block';
    text.parentElement.removeChild(text);
    start.parentElement.removeChild(start);
};

function randomInterval(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

function restartGame() {
    table.innerHTML = '';
    num_of_cells = 2;
    time = 75;
    clearInterval(intervalId);
    intervalId = setInterval(intervalFunction, 1000);
    timer.innerHTML = "Времени осталось:" + time;
    createTable();
}

function shuffle(num) {
    let array = [];
    for(let i = 1; i<=num; i++) array.push(i);
    array.sort(() => Math.random() - 0.5);
    return array;
};

function colorChange() {
    if (this.innerHTML == currNum) {
        this.style.backgroundColor = 'red';
        currNum += 1
        counter++;
        if (counter === num_of_cells**2) {
            table.innerHTML = '';
            num_of_cells += 1;
            createTable();
        }
    }
};