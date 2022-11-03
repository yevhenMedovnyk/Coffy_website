
const scrollLock = document.querySelector('body');
const burgerBtn = document.querySelector('.header__burger');
const burgerMenuList = document.querySelector('.menu__list');
const burgerCover = document.querySelector('.header__burger-cover');
const noneHeaderBg = document.querySelector('.header__wrapper');
const logoNone = document.querySelector('.header__logo');

// Відкриваємо меню натискання на кнопку бургера:
burgerBtn.addEventListener('click', (e) => {
	fnBurgerOpen();
})

// Закриваємо бургер натисканням будь-де поза списком меню:
document.addEventListener('click', (e) => {
	const burgerButton = e.composedPath().includes(burgerBtn);
	const MenuList = e.composedPath().includes(burgerMenuList);
	if (!burgerButton && !MenuList) {
		fnBurgerClose()
	}
})

// Ф-ція для відкривання бургер-меню:
const fnBurgerOpen = () => {
	burgerMenuList.classList.toggle('active');
	burgerCover.classList.toggle('active');
	scrollLock.classList.toggle('scroll-lock');
	noneHeaderBg.classList.toggle('-bg');
	logoNone.classList.toggle('none');
	burgerBtn.classList.toggle('open');
}

// Ф-ція для закривання бургер-меню:
const fnBurgerClose = () => {
	burgerMenuList.classList.remove('active');
	burgerCover.classList.remove('active');
	scrollLock.classList.remove('scroll-lock');
	noneHeaderBg.classList.remove('-bg');
	logoNone.classList.remove('none');
	burgerBtn.classList.remove('open');
}

// Закриваємо та відкриваємо меню-бургер натисканням клавіатури:
document.addEventListener('keyup', e => {
	console.log(e)
	if (e.code == 'KeyM') {
		fnBurgerOpen();
	}
	if (e.code == 'Escape') {
		fnBurgerClose();
	}

})