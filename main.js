var rows = 3
var columns = 3

var currTile
var otherTile

var turns = 0

var imgOrder = ['4', '2', '8', '5', '1', '6', '7', '3', '9']

window.onload = () => {
    for (let r=0; r < rows; r++) {
        for(let c=0; c < columns; c++) {

            let tile = document.createElement('img')
            tile.id = r.toString() + '-' + c.toString()
            tile.src = `./imgs/${imgOrder.shift()}.jpg`

            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", pass);    //moving image around while clicked
            tile.addEventListener("dragenter", pass);  //dragging image onto another one
            tile.addEventListener("dragleave", pass);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles

            document.getElementById('board').append(tile)
        }
    }
}

function dragStart() {
    currTile = this
}

function pass(e) {
    e.preventDefault()
}

function dragDrop() {
    otherTile = this
}

function dragEnd() {
    if (currTile.src.split('/')[4] !== '3.jpg') {
        return
    }

    let currImg = currTile.src.split('/')[4]
    let otherImg = otherTile.src.split('/')[4]

    let currCoords = currTile.id.split('-')
    let r = parseInt(currCoords[0])
    let c = parseInt(currCoords[1])

    let otherCoords = otherTile.id.split('-')
    let r2 = parseInt(otherCoords[0])
    let c2 = parseInt(otherCoords[1])

    let moveUp = r - 1 == r2 && c == c2
    let moveDown = r + 1 == r2 && c == c2
    let moveLeft = c - 1 == c2 && r == r2
    let moveRight = c + 1 == c2 && r == r2

    let moveAble = moveUp || moveDown || moveLeft || moveRight

    if (moveAble) {
        document.getElementById('turns').innerText = turns += 1
        currTile.src = `http://127.0.0.1:5500/imgs/${otherImg}`
        otherTile.src = `http://127.0.0.1:5500/imgs/${currImg}`
    }
}