window.onload = function () {

  //5 e 6
  let addTaskButton = document.getElementById('criar-tarefa');
  function addTask() {
      const input = document.getElementById('texto-tarefa');
      if (input.value === '') {
        alert('Insira uma tarefa!');
      } else {
      const taskList = document.getElementById('lista-tarefas');
      const task = document.createElement('li');
      task.className = 'task-item';
      task.innerHTML = input.value;
      taskList.appendChild(task);
      input.value = '';
      }
    }
    addTaskButton.addEventListener('click', addTask); 
    
  //7, 8, 9
  //Aplicando event bubbling (Amigo de turma Thalles me mostrou e ensinou como funciona!)
  //Link: https://gomakethings.com/attaching-multiple-elements-to-a-single-event-listener-in-vanilla-js/
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('task-item')) {
      clickedTask(event);
    };
    if (event.target.id === 'apaga-tudo') {
      deleteTasks();
    }
    if (event.target.id === 'remover-finalizados') {
      removeCompletedTasks();
    }
    if (event.target.id === 'salvar-tarefas') {
      saveTasksLS();
    }
    if (event.target.id === 'mover-cima') {
      upper();
    }
    if (event.target.id === 'mover-baixo') {
      downer();
    }
    if (event.target.id === 'remover-selecionado') {
      removeTaskSelected();
    }
  })

  document.addEventListener('dblclick', function (event) {
    if (event.target.classList.contains('task-item')) {
      completedTasks(event);
    }
  })


  //8
  function clickedTask(event) {
    const tasks = document.getElementsByClassName('task-item');
    const greyTask = event.target;
    for (let i = 0; i < tasks.length; i += 1) {
      tasks[i].classList.remove('selected');    
    }
    if (greyTask.classList.contains('selected')) {
      greyTask.classList.add('selected');
    } else {
      greyTask.classList.add('selected');
    }
  }

  //9
  function completedTasks(event) {
    const completedTask = event.target;
    if (completedTask.classList.contains('completed')) {
      completedTask.classList.remove('completed');
    } else {
      completedTask.classList.add('completed');
    }
  }
  //10
  const cleanButton = document.createElement('button');
  cleanButton.id = 'apaga-tudo';
  cleanButton.innerHTML = 'Apagar tudo!';
  document.body.appendChild(cleanButton); 

  function deleteTasks() {
    const tasks = document.querySelectorAll('.task-item');
    for (let i = 0; i < tasks.length; i += 1) {
      tasks[i].remove();
    } 
  }
  //11
  const removeButton = document.createElement('button');
  removeButton.id = 'remover-finalizados';
  removeButton.innerHTML = 'Remover tarefas cumpridas!';
  document.body.appendChild(removeButton);

  function removeCompletedTasks() {
    const tasks = document.querySelectorAll('.task-item');
    for (let i = 0; i < tasks.length; i += 1) {
      if (tasks[i].classList.contains('completed')) {
        tasks[i].remove();
      }
    }
  }
  //BONUS
  //12 
  const saveTasks = document.createElement('button');
  saveTasks.id = 'salvar-tarefas';
  saveTasks.innerHTML = 'Salvar tarefas!';
  document.body.appendChild(saveTasks);
  
  function saveTasksLS() {
    let ol = document.querySelector('#lista-tarefas');
    localStorage.setItem('tasks', ol.innerHTML);      
  }
  function inicialize() {
    if (localStorage.getItem('tasks') != undefined) {
      let ol = document.querySelector('#lista-tarefas');
      ol.innerHTML = localStorage.getItem('tasks');
    }
  }
  inicialize();

  //13
  const upButton = document.createElement('button');
  upButton.id = 'mover-cima';
  upButton.innerHTML = 'Mover para cima!';
  document.body.appendChild(upButton);
  
  function upper() {
    let ol = document.querySelector('#lista-tarefas');
    let taskUp = document.querySelector('.selected');
    if (ol.firstChild != taskUp && taskUp != null) {
      ol.insertBefore(taskUp, taskUp.previousSibling); // insertBefore ---> https://developer.mozilla.org/pt-BR/docs/Web/API/Node/insertBefore
    }
  }

  const downButton = document.createElement('button');
  downButton.id = 'mover-baixo';
  downButton.innerHTML = 'Mover para baixo!';
  document.body.appendChild(downButton);

  function downer() {
    let ol = document.querySelector('#lista-tarefas');
    let taskDown = document.querySelector('.selected');
    if (ol.lastChild != taskDown && taskDown != null) {
      ol.insertBefore(taskDown.nextSibling, taskDown);
    }
  }
  //14
  const removeTask = document.createElement('button');
  removeTask.id = 'remover-selecionado';
  removeTask.innerHTML = 'Remover tarefa!';
  document.body.appendChild(removeTask);

  function removeTaskSelected () {
    let task = document.querySelector('.selected');
    task.remove();
  }
}