'use strict'
let options = [
	{title: 'Modal #1', mainText: 'Lorem ipsum dolor sit amet.', id: '1', closing: false},
	{title: 'Modal #2', mainText: 'Lorem ipsum dolor sit amet, consectetur.', id: '2', closing: false},
	{title: 'Modal #3', mainText: 'Lorem ipsum dolor sit.', id: '3', closing: false},
	{title: 'Modal #4', mainText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas.', id: '4', closing: false},
]

class Modal{
	constructor(bttn, params){
		this.bttn = bttn;
		this.closing = params.closing;
		this.params = params;
	}

	createModal(){
		let myModal = document.createElement('div');
		myModal.classList.add('modal');
		myModal.insertAdjacentHTML('afterBegin', `
			<div class="modal-overlay">
				<div class="modal-window">
					<div class="modal__header">
						<p>${this.params.title}</p>
						<button class="modal__header__exit" data-close=${this.params.id}>&#10006;</button>
					</div>
					<div class="modal__main-text">
						<p>${this.params.mainText}</p>
					</div>
					<div class="modal__buttons">
						<button class="modal__buttons__agree">Ok</button>
						<button class="modal__buttons__disagree" data-close=${this.params.id}>Cancel</button>
					</div>
				</div>
			</div>
			`);
		document.body.append(myModal);
		return myModal;
	}

	openModal(){
		this.bttn.addEventListener('click', () => {
			if (this.closing === false) {
				const newModal = this.createModal();
				setTimeout(function(){
					newModal.classList.add('open');
				}, 100);
			}
		})
	}

	closeModal(){
		document.addEventListener('click', (e) => {
			if (e.target.dataset.close === this.params.id){
				this.closing = true;
				document.querySelector('.modal').classList.remove('open');
				setTimeout(this.destroyModal.bind(this), 500);
			}
		})
	}

	destroyModal(){
		document.querySelector('.modal').remove();
		this.closing = false;
	}
}


window.addEventListener('DOMContentLoaded', function(){
	const mainBttns = document.querySelectorAll('.entry-menu');

	let myModal0, myModal1, myModal2, myModal3,
		modalWindows = [myModal0, myModal1, myModal2, myModal3];

	modalWindows.forEach(function(element, index){
		element = new Modal (mainBttns[index], options[index]);
		element.openModal();
		element.closeModal();
	});
	
});