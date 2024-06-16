/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import '../../scss/base/swiper.scss';
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.banners__swiper')) {
		// Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.banners__swiper', {
			// Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Autoplay, EffectFade],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 800,
			loop: true,
			lazy: true,

			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
		});
	}
	if (document.querySelector('.products__swiper')) {
		const sliders = document.querySelectorAll('.products__swiper-area');
		sliders.forEach((elem) => {
			const slider = elem.querySelector('.products__swiper');
			const buttonPrev = elem.querySelector('.swiper-button-prev');
			const buttonNext = elem.querySelector('.swiper-button-next');
			new Swiper(slider, {
				// Вказуємо склас потрібного слайдера
				// Підключаємо модулі слайдера
				// для конкретного випадку
				modules: [Navigation],
				observer: true,
				observeParents: true,
				slidesPerView: 3,
				spaceBetween: 30,
				// centeredSlides: true,
				speed: 800,
				// loop: true,
				lazy: true,

				navigation: {
					prevEl: buttonPrev,
					nextEl: buttonNext,
				},
				breakpoints: {
					0: {
						slidesPerView: 1,
					},
					600: {
						slidesPerView: 2,
						centeredSlides: false,
					},
					992: {
						spaceBetween: 15,
						slidesPerView: 3,
					},
					1100: {
						spaceBetween: 30,
					},
				},
			});
		});
	}
	if (document.querySelector('.reviews__swiper')) {
		new Swiper('.reviews__swiper', {
			// Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [],
			observer: true,
			observeParents: true,
			slidesPerView: 4,
			spaceBetween: 30,
			speed: 800,
			loop: true,
			lazy: true,
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				480: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 15,
					centeredSlides: true,
				},
				992: {
					spaceBetween: 30,
					slidesPerView: 4,
					centeredSlides: false,
				},
			},
		});
	}
	if (document.querySelector('.product-in-popup__slider')) {
		const sliders = document.querySelectorAll('.product-in-popup__slider');
		sliders.forEach((slide) => {
			new Swiper(slide, {
				// Вказуємо склас потрібного слайдера
				// Підключаємо модулі слайдера
				// для конкретного випадку
				modules: [Pagination, EffectFade],
				observer: true,
				observeParents: true,
				slidesPerView: 1,
				speed: 800,
				lazy: true,
				effect: 'fade',
				pagination: {
					el: slide.querySelector('.swiper-pagination'),
					type: 'bullets',
					clickable: true
				},
			});
		});
	}
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false,
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener('load', function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});
