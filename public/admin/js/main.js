function confirmModal(formID, text, type) {
	// check inputs
	if (!formID || !text || !type) {
		return console.log('Error: params required');
	}

	// Get the modal
	const confModal = document.getElementById('confModal');

	// Get the button that opens the modal
	const modalSubmit = document.getElementById('confModalSubmit');

	// Get the <span> element that closes the modal
	const modalClose = document.getElementById('confModalClose');

	// Get the <p> element that contains the modal text
	const modalText = document.getElementById('confModalText');

	modalText.textContent = text;

	// check type and change button class and text
	if (type === 1) {
		modalSubmit.className = 'btn-primary';
		modalSubmit.textContent = 'SUBMIT';
	}

	if (type === 2) {
		modalSubmit.className = 'btn-danger';
		modalSubmit.textContent = 'DELETE';
	}

	// open the modal
	confModal.style.display = 'block';

	// close the modal
	modalClose.addEventListener('click', function() {
		confModal.style.display = 'none';
	});

	// submit the modal from related
	modalSubmit.addEventListener('click', function() {
		document.getElementById(formID).submit();
	});

	// When the user clicks anywhere outside of the modal, close it
	window.addEventListener('click', function(event) {
		if (event.target == confModal) {
			confModal.style.display = 'none';
		}
	});
}
