// Develop a trap to capture the elements when the mouse is getting too close to the center of the page.

// Create the following functions:

// createCircle: make it fire on every click on the page, and create a div at the position of the mouse on the screen, setting its background to white and its class to circle.

// moveCircle: make it fire when the mouse moves, and get the last circle created and makes it move along with the mouse.

// setBox: which creates a box with the class box in the center of the page. When a circle is entirely inside that box, it has to be purple (use the CSS global variable var(--purple) as its background). Once a circle enters the box, it is trapped inside and cannot escape.

// Hint: Be careful, a circle cannot overlap the box which has walls of 1px. It has to be trapped strictly inside.

export function createCircle() {
    document.addEventListener('mousedown', event => {
        const newCirc = document.createElement('div')
        newCirc.setAttribute('class', 'circle')
        let x = event.clientX - 25
        let y = event.clientY - 25
        newCirc.setAttribute('style', 'left: ' + x.toString() + 'px; top: ' + y.toString() + 'px; background: white;')
        document.body.appendChild(newCirc);
    })
}
export function moveCircle() {
    document.addEventListener('mousemove', event => {
        const lastCircle = document.querySelector('div:last-child')
        lastCircle.style.left = `${event.clientX - 25}px`
        lastCircle.style.top = `${event.clientY - 25}px`
        let midBox = document.querySelector('div.box')
        let dims = midBox.getBoundingClientRect()
        if (lastCircle.getAttribute('class') !== 'box') {
            if ((+lastCircle.style.left.replace('px', '') > (dims.x)) && (+lastCircle.style.left.replace('px', '') < (dims.right - 50)) && (+lastCircle.style.top.replace('px', '') > (dims.top)) && (+lastCircle.style.top.replace('px', '') < (dims.bottom - 50))) {
                lastCircle.style.background = 'var(--purple)'
            }
        }
        if (event.clientX - 25 < (dims.x) && lastCircle.style.background === 'var(--purple)') {
            console.log(lastCircle.style.left)
            lastCircle.style.left = (dims.x).toString() + 'px'
            if (event.clientY - 25 < (dims.top)) {
                lastCircle.style.top = (dims.y).toString() + 'px'
            }
            console.log(event.clientY - 25)
            console.log(dims.bottom)
            if (event.clientY - 25 > (dims.bottom - 50)) {
                lastCircle.style.top = (dims.bottom - 50).toString() + 'px'
            }
        } else if (event.clientX - 25 > (dims.right - 50) && lastCircle.style.background === 'var(--purple)') {
            lastCircle.style.left = (dims.right - 50).toString() + 'px'
            if (event.clientY - 25 < (dims.top)) {
                lastCircle.style.top = (dims.y).toString() + 'px'
            }
            if (event.clientY - 25 > (dims.bottom - 50)) {
                lastCircle.style.top = (dims.bottom - 50).toString() + 'px'
            }
        } else if ((event.clientY - 25 > (dims.bottom - 50)) && lastCircle.style.background === 'var(--purple)') {
            lastCircle.style.top = (dims.bottom - 50).toString() + 'px'
        } else if ((event.clientY - 25 < (dims.top)) && lastCircle.style.background === 'var(--purple)') {
            lastCircle.style.top = (dims.top).toString() + 'px'
        }
    })
}
export function setBox() {
    const centerBox = document.createElement('div')
    centerBox.setAttribute('class', 'box')
    document.body.append(centerBox)
}