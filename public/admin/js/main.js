function confirmModel(formID, text, type) {
	// Get the modal
	const confModal = document.getElementById('confModal');

	// Get the button that opens the modal
	const modalSubmit = document.getElementById('modalSubmit');

	// Get the <span> element that closes the modal
	const modalClose = document.getElementById('modalClose');

	// When the user clicks on the button, open the modal
	confModal.style.display = 'block';

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		confModal.style.display = 'none';
	};

	if (!formID || !text || !type) {
		return console.log('Error: params required');
	}
	if (type === 0) {
	} else if (type === 1) {
	}
}

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == confModal) {
//     confModal.style.display = 'none';
//   }
// };
