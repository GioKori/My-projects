document.addEventListener("keydown", function (event) {
  compose(event);
});

function compose(e) {
  if (e === undefined) {
    return;
  }
  if ([...Array(26).keys()].map((i) => i + 97).includes(e.key.charCodeAt(0))) {
    let div = document.createElement("div");
    div.classList.add("note");
    div.style.backgroundColor = `rgb(${
      (255 / 26) * (e.key.charCodeAt(0) - 97)
    }, ${(255 / 26) * (e.key.charCodeAt(0) - 97)}, ${
      (255 / 26) * (e.key.charCodeAt(0) - 97)
    })`;
    div.innerHTML = e.key;
    document.body.appendChild(div);
  } else if (e.key === "Backspace") {
    let notes = document.getElementsByClassName("note");
    notes[notes.length - 1].remove();
  } else if (e.key === "Escape") {
    let notes = document.getElementsByClassName("note");
    while (notes.length > 0) {
      notes[0].remove();
    }
  }
}

export { compose };
// Write the function compose:

// Make it fire every time a key is pressed.
// Create a new div with the class note when a letter of the lowercase alphabet is pressed. It should have a unique background color generated using the key of the event. It should also display the corresponding pressed character.
// When Backspace is pressed, delete the last note.
// When Escape is pressed, clear all the notes.
