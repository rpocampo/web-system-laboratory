const playername = document.getElementById('playername');
const team = document.getElementById('team');
const addBtn = document.getElementById('addBtn');
const ul = document.getElementById('nbaplayers');


addBtn.addEventListener('click', ()=>{
    const newplayername = playername.value;
    const newteam = team.value;

    const span = document.createElement('span');
    const small = document.createElement('small');

    const div = document.createElement('div');
   
    const button = document.createElement('button');

    span.innerHTML = newplayername;
    small.innerHTML = newteam;

    div.classList.add('Player');

    button.classList.add('delete');

    div.append(span);
    div.append(small);
    button.append(span);
    button.append(small);

    const li = document.createElement('li');
    li.append(span);
    li.append(small);

    ul.append(li);

    console.log(li);
})

