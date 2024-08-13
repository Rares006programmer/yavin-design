"use strict";

const metrics = document.querySelectorAll(".metric");
const navbarEl = document.getElementById("navigation");
const btnUp = document.getElementById("btn-up");
const contactForm = document.querySelector(".needs-validation");

document.addEventListener("DOMContentLoaded", () => incrementStats(metrics, 1));
window.addEventListener("scroll", () => (window.scrollY >= 50 ? addStickyNavigation() : removeStickyNavigation()));
btnUp.addEventListener("click", scrollTop);

contactForm.addEventListener("submit", (event) => {
	if (!contactForm.checkValidity()) {
		event.preventDefault();
		event.stopPropagation();
	}

	contactForm.classList.add("was-validated");
});

function incrementStats(statsNodeList, durationSec) {
	const frameRate = 60;
	const totalFrames = durationSec * frameRate;

	statsNodeList.forEach((stat) => {
		stat.textContent = 0;
		const target = stat.dataset.target;
		const increment = target / totalFrames;
		let currentValue = 0;
		let frame = 0;

		function updateCounter() {
			currentValue += increment;
			if (++frame < totalFrames) {
				stat.textContent = Math.floor(currentValue);
				requestAnimationFrame(updateCounter);
			} else stat.textContent = target;
		}

		updateCounter();
	});
}

function addStickyNavigation() {
	navbarEl.classList.add("navbar-sticky");
	btnUp.classList.remove("btn-hidden");
}

function removeStickyNavigation() {
	navbarEl.classList.remove("navbar-sticky");
	btnUp.classList.add("btn-hidden");
}

function scrollTop() {
	window.scrollTo(0, 0);
}
