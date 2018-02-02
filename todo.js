'use strict';

const elementaryTask = class elementaryTask
{
	constructor(descritpion)
	{
		this._description = descritpion;
		this._done = false;
	}

	getDescription()
	{
		return(this._description);
	}

	isEqual(task)
	{
		return(this._description === task._description);
	}

	isDone()
	{
		return(this._done);
	}

	done()
	{
		this._done = true;
	}

}

const toDo = class toDo
{
	constructor()
	{
		this._list = []
	}

	getToDoList()
	{
		return(this._list)
	}

	HtmlToDoList()
	{	
		//Créer un noeud <ul>
		let node = document.createElement('UL');
		//Pour chaque tache de la liste
		const that = this;
		this._list.forEach(element => {
			//Créer un bouton
			let btn = document.createElement('BUTTON');
			// Texte du bouton
			btn.innerText = "X";
			//Ecouteur du bouton sur le clic
			btn.addEventListener('click',function()
			{
				//Suppression de la tache
				that.removeTask(element);
			});
			// créer un élément <li> courant
			let li = document.createElement('LI');
			// créer un noeud texte à partir de la description de la tache
			let txt = document.createTextNode(element._description+' - Terminé ? : '+element._done);
			// Ajoute le noeud texte au noeud li 
			li.appendChild(txt);
			li.appendChild(btn);
			// Ajoute le noeud txt+li au noeud ul
			node.appendChild(li)
		});
		return(node);
	}

	containsTask(task)
	{
		return(Array.prototype.includes(task,this._list));
	}

	addTask(task)
	{
		if(!this.containsTask(task))
		{
			this._list.push(task);
		}
		return(this);
	}

	removeTask(task)
	{
		if(this._list.includes(task))
		{
			this._list.splice(this._list.indexOf(task),1);
		}
		this.refreshDisplay();
		return(this);
	}

	refreshDisplay()
	{
		let display = document.querySelector('#toDoDisplay');
		display.innerHTML = "";
		display.appendChild(this.HtmlToDoList());
	}

	getNthTask(n)
	{
		return(this._list[n]);
	}

}

document.addEventListener('DOMContentLoaded',function(){
	//Initialisation de la TodoList
	let todo = new toDo();

	//Création d'une tache de base
	const task1 = new elementaryTask('Tondre la pelouse');

	//Ajout de cette tache à la liste
	todo.addTask(task1);

	//Sélection de la zone d'affichage de la toDoList
	let display = document.querySelector('#toDoDisplay');

	//Affichage de la liste
	display.appendChild(todo.HtmlToDoList());

	//----------- Add Task Event Listener

	//Trouve le noeud du bouton (#AddTaskButton) de la page Html
	let button = document.querySelector('#AddTaskButton');

	//Ecoute le noeud boutton
	button.addEventListener('click',function(){
		//Recupere la valeur du champs texte
		let content = document.querySelector('#taskDescription');

		//Créer une tache a partire de la valeur précedement recuperé
		let task = new elementaryTask(content.value);

		//Ajout de la tache à la liste
		todo.addTask(task);

		//Rafraichissement affichage
		todo.refreshDisplay();

		//Vide le champs de saisi de tache
		content.value = "";
	});	
});