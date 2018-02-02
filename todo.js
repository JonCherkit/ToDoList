'use strict';

const elementaryTask = class elementaryTask
{
	constructor(descritpion,status = false)
	{
		this._description = descritpion;
		this._done = status;
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

class toDoIterable extends toDo
{
	[Symbol.iterator]()
	{
		let index = -1
		let data = this.getToDoList();

		return{next: ()=>({value:data[++index],done:index<=data.length})};
	}

	getTaskByStatus(status)
	{	
		console.log(status);
		//Ecrase l'affichage déjà présent
		let display = document.querySelector('#toDoDisplay');
		display.innerHTML = "";
		//Créer un noeud <ul>
		let node = document.createElement('UL');
		for(let element of this._list)
		{
			if(element._done == status)
			{
				// créer un élément <li>
				let li = document.createElement('LI');
				// créer un noeud texte à partir de la description de la tache
				let txt = document.createTextNode(element._description+' - Terminé ? : '+element._done);
				// Ajoute le noeud texte au noeud li 
				li.appendChild(txt);
				// Ajoute le noeud txt+li au noeud ul
				node.appendChild(li);
			}
		}
		display.appendChild(node);
		// console.log(node);
	}
}

document.addEventListener('DOMContentLoaded',function(){
	//Initialisation de la TodoList
	let todo = new toDoIterable();

	//Création de taches
	const task1 = new elementaryTask('Tondre la pelouse');
	const task2 = new elementaryTask('Ramoner la cheminée',true);
	const task3 = new elementaryTask('Prendre une pause (15mn)',true);
	const task4 = new elementaryTask('épilier la tortue');

	//Ajout des taches à la liste
	todo.addTask(task1);
	todo.addTask(task2);
	todo.addTask(task3);
	todo.addTask(task4);

	//Sélection de la zone d'affichage de la toDoList
	let display = document.querySelector('#toDoDisplay');

	//Affichage de la liste
	display.appendChild(todo.HtmlToDoList());

	//----------- Add Task Event Listener

	//Trouve le noeud du bouton (#AddTaskButton) de la page Html
	let button = document.querySelector('#AddTaskButton');

	//Ecoute le noeud boutton 'Add'
	button.addEventListener('click',function(){
		//Recupere le noeud du champs texte
		let content = document.querySelector('#taskDescription');

		//Créer une tache a partire de la valeur précedement recuperé
		let task = new elementaryTask(content.value);

		//Ajout de la tache à la liste
		todo.addTask(task);

		//Rafraichissement affichage
		todo.refreshDisplay();

		//Vide le champs de saisie
		content.value = "";

	});

	//Ecoute le noeud boutton 'unAchieved'
	document.querySelector('#unAchievedButton').addEventListener('click',() => todo.getTaskByStatus(false));
	//Ecoute le noeud boutton 'achievedButton'
	document.querySelector('#achievedButton').addEventListener('click',() => todo.getTaskByStatus(true));
	//Ecoute le noeud boutton 'displayAllButton'
	document.querySelector('#displayAllButton').addEventListener('click',() => todo.refreshDisplay());
});