'use strict';

const elementaryTask = class elementaryTask
{
	constructor(descritpion)
	{
		this._description = descritpion;
	}

	getDescription()
	{
		return(this._description);
	}

	isEqual(task)
	{
		return(this._description === task._description);
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
		this._list.forEach(element => {
			// créer un élément <li> courant
			let li = document.createElement('LI');
			// créer un noeud texte à partir de la description de la tache
			let txt = document.createTextNode(element._description);
			// Ajoute le noeud texte au noeud li 
			li.appendChild(txt);
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
		return(this);
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

	//----------- Event Listener

	//Trouve le noeud du bouton (#AddTaskButton) de la page Html
	let button = document.querySelector('#AddTaskButton');

	//Ecoute le noeud boutton
	button.addEventListener('click',function(){
		//Recupere la valeur du champs texte
		let content = document.querySelector('#taskDescription').value;

		//Créer une tache a partire de la valeur précedement recuperé
		let task = new elementaryTask(content);

		//Ajout de la tache à la liste
		todo.addTask(task);

		// Réinitialisation du contenu du noeud
		display.innerHTML = "";

		//Rafraichissement de l'affichage
		display.appendChild(todo.HtmlToDoList());
	})
});