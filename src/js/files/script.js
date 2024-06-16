// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js';
// Підключення списку активних модулів
import { flsModules } from './modules.js';

function initCart() {
	const cartButton = document.querySelector('.header__cart-btn');
	const cart = document.querySelector('.cart');

	function openCart() {
		document.documentElement.classList.add('lock');
		document.documentElement.classList.add('cart-open');
	}

	function closeCart() {
		document.documentElement.classList.remove('lock');
		document.documentElement.classList.remove('cart-open');
	}

	if (cartButton && cart) {
		cartButton.addEventListener('click', openCart);

		cart.addEventListener('click', (e) => {
			if (!e.target.closest('.cart__body') || e.target.closest('.cart__close-btn')) {
				closeCart();
			}
		});
	}
}

function initCustomSelect(container) {
	container += ' ';
	document.querySelectorAll(container + '.custom-select').forEach(function (select) {
		let classes = select.className,
			id = select.id,
			name = select.name;
		let start_value = select.querySelector('option:checked').textContent;
		let template = '<div class="' + classes + '">';
		template += '<span class="custom-select-trigger _icon-daw-bottom">' + start_value + '</span>';
		template += '<div class="custom-options">';
		select.querySelectorAll('option').forEach(function (option) {
			if (!option.hasAttribute('disabled')) {
				template += '<span class="custom-option ' + option.className + '" data-value="' + option.value + '">' + option.innerHTML + '</span>';
			}
		});
		template += '</div></div>';

		let wrapper = document.createElement('div');
		wrapper.className = 'custom-select-wrapper';
		select.parentNode.insertBefore(wrapper, select);
		wrapper.appendChild(select);
		select.style.display = 'none';
		wrapper.insertAdjacentHTML('beforeend', template);
	});

	document.querySelectorAll(container + '.custom-option:first-of-type').forEach(function (option) {
		option.addEventListener('mouseover', function () {
			this.closest('.custom-options').classList.add('option-hover');
		});
		option.addEventListener('mouseout', function () {
			this.closest('.custom-options').classList.remove('option-hover');
		});
	});

	document.querySelectorAll(container + '.custom-select-trigger').forEach(function (trigger) {
		trigger.addEventListener('click', function (event) {
			document.documentElement.addEventListener(
				'click',
				function () {
					document.querySelectorAll('.custom-select').forEach(function (select) {
						select.classList.remove('opened');
					});
				},
				{ once: true }
			);
			this.closest('.custom-select').classList.toggle('opened');
			event.stopPropagation();
		});
	});

	document.querySelectorAll(container + '.custom-option').forEach(function (option) {
		option.addEventListener('click', function () {
			let select = this.closest('.custom-select-wrapper').querySelector('select');
			select.value = this.getAttribute('data-value');
			this.closest('.custom-options')
				.querySelectorAll('.custom-option')
				.forEach(function (opt) {
					opt.classList.remove('selection');
				});
			this.classList.add('selection');
			this.closest('.custom-select').classList.remove('opened');
			this.closest('.custom-select').querySelector('.custom-select-trigger').textContent = this.textContent;
		});
	});
}

document.addEventListener('DOMContentLoaded', () => {
	initCart();
	initCustomSelect('');
});
