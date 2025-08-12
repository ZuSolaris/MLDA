const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

let currentIndex = 1;             // start on the first *real* slide
const total = slides.length + 2;  // with clones

function setTransform(withTransition = true) {
	track.style.transition = withTransition ? 'transform 400ms ease' : 'none';
	track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

if (!window.__carouselBound__) {
	window.__carouselBound__ = true;

	// Initial position (no animation jump)
	requestAnimationFrame(() => setTransform(false));

	nextButton.addEventListener('click', () => {
		if (currentIndex >= total - 1) return; // guard against spam
		currentIndex++;
		setTransform(true);
	});

	prevButton.addEventListener('click', () => {
		if (currentIndex <= 0) return;
		currentIndex--;
		setTransform(true);
	});

	track.addEventListener('transitionend', () => {
		// If we hit the fake last (clone of first), snap to real first
		if (currentIndex === total - 1) {
			currentIndex = 1;
			setTransform(false);
		}
		// If we hit the fake first (clone of last), snap to real last
		if (currentIndex === 0) {
			currentIndex = total - 2;
			setTransform(false);
		}
	});
}
