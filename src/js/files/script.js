// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js';
// Підключення списку активних модулів
import { flsModules } from './modules.js';

import Swiper from 'swiper';
import { EffectFade, Pagination } from 'swiper/modules';

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
		document.addEventListener('click', (e) => {
			if (e.target.closest('.header__cart-btn')) {
				openCart();
			} else if (!e.target.closest('.cart__body') || e.target.closest('.cart__close-btn')) {
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

function initSpecialPopupShow() {
	const block = document.querySelector('.products');
	const popup = document.querySelector('#popup');

	function openPopup() {
		flsModules.popup.open('#popup');

		document.removeEventListener('scroll', scrollHandler);
	}

	function scrollHandler(e) {
		const blockPositionY = block.getBoundingClientRect().top;

		if (blockPositionY - 200 < 0) {
			openPopup();
		}
	}

	if (block && popup) {
		document.addEventListener('scroll', scrollHandler);
	}
}

function hideInstagramWidgetBranding() {
	const branding = document.querySelector('.elfsight-app-26bdb88f-8b1a-4b24-b4dd-177aa578bba4 > a');

	if (branding) {
		branding.style = 'display:none';
	}
}

document.addEventListener('DOMContentLoaded', () => {
	initCart();
	initCustomSelect('');
	initSpecialPopupShow();

	setTimeout(() => {
		hideInstagramWidgetBranding();
	}, 2000);
});
