var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
}

function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});

function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

window.addEventListener("load", function () {
	if (document.querySelector('.wrapper')) {
		setTimeout(function () {
			document.querySelector('.wrapper').classList.add('_loaded');
		}, 0);
	}
});

let unlock = true;

//=================
//Menu
let iconMenu = document.querySelector(".header__burger");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".header__menu");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".header__burger");
	let menuBody = document.querySelector(".header__menu");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
// чтобы меню закрывалось после нажатия на ссылки и также после нажатия на свободном месте в мобильном меню header__list и при нажатии на лого header__mobile-menu-logo (которое явл-ся ссылкой и отправляет наверх):
let clickableItems = document.querySelectorAll(".header__link, .header__list, .header__mobile-menu-logo, .header__logo");
if (clickableItems) {
	for (let index = 0; index < clickableItems.length; index++) {
		const el = clickableItems[index];
		el.addEventListener("click", function (e) {
			menu_close();
			let body = document.querySelector("body");
			body.classList.remove("_lock");
			// body_lock(10);
		});
	}
}
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}

//=================
// Filtering
let filterItems = document.querySelectorAll(".filter__item");
let portfolioColumns = document.querySelectorAll(".portfolio__column");
// * initially
filterItems[0].classList.add('_active');
for (let ind = 0; ind < portfolioColumns.length; ind++) {
	portfolioColumns[ind].classList.add('_active'); // всем добавить
}
// * then filter
for (let index = 0; index < filterItems.length; index++) {
	filterItems[index].addEventListener('click', function (e) {
		let i = this.dataset.filter; // filterItem that we clicked on
		console.log(i);
	
		if (i == 1) {
			for (let ind = 0; ind < portfolioColumns.length; ind++) {
				portfolioColumns[ind].classList.add('_active'); // всем добавить
			}
			
		}
		else {
			let filtered = document.querySelectorAll('.portfolio__column.f_' + i);
			for (let ind = 0; ind < portfolioColumns.length; ind++) {
				portfolioColumns[ind].classList.remove('_active'); // у всех убрать
			}
			for (let ind = 0; ind < filtered.length; ind++) {
				filtered[ind].classList.add('_active'); 
			}
		}

		for (let index = 0; index < filterItems.length; index++) {
			filterItems[index].classList.remove('_active'); // make sure no one has
			this.classList.add('_active'); // добавить одному
		}
	});
}

//=================
//Gallery
let gallery = document.querySelectorAll('._gallery');
if (gallery) {
	gallery_init();
}
function gallery_init() {
	for (let index = 0; index < gallery.length; index++) {
		const el = gallery[index];
		lightGallery(el, {
			counter: false,
			selector: 'a',
			download: false
		});
	}
}

//========================================================================================================================================================

let image = document.querySelector('.main-screen__image');

function adaptive_function() {
	let w = $(window).outerWidth();
	let h = $(window).outerHeight();

	if(w < 600) {
		image.dataset.src = "img/main-screen/main_bg_mob.jpg";
	}
	else{
		image.dataset.src = "img/main-screen/main_bg.jpg";
	}
}
adaptive_function();
$(window).resize(function(event) {
	adaptive_function();
});
