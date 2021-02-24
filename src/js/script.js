const main = document.querySelector(".main");
function updateTime() {
	const seconds = new Date().getSeconds();
	main.innerHTML = seconds;
	main.closest ("*").style.fontSize = `${10 + seconds * 2}px`;
}

requestAnimationFrame(function update() {
	updateTime();
	requestAnimationFrame(update);
});
