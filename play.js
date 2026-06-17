const piecesDiv = document.getElementById("pieces");

const image = new Image();
image.src = "images/puzzle.png";

let completedPieces = 0;

let draggedPiece = null;
let offsetX = 0;
let offsetY = 0;

image.onload = function () {

    const rows = 10;
    const cols = 10;

    const pieceWidth = image.width / cols;
    const pieceHeight = image.height / rows;

    for(let y = 0; y < rows; y++){

        for(let x = 0; x < cols; x++){

            const piece = document.createElement("canvas");

            piece.width = pieceWidth;
            piece.height = pieceHeight;

            piece.className = "piece";

            piece.dataset.correctX = x;
            piece.dataset.correctY = y;

            const pctx = piece.getContext("2d");

            pctx.drawImage(
                image,
                x * pieceWidth,
                y * pieceHeight,
                pieceWidth,
                pieceHeight,
                0,
                0,
                pieceWidth,
                pieceHeight
            );

            piece.style.order =
                Math.floor(Math.random() * 1000);

            piecesDiv.appendChild(piece);
        }
    }
};

document.addEventListener("mousedown", function(e){

    if(
        e.target.classList.contains("piece") &&
        e.target.dataset.locked !== "true"
    ){

        draggedPiece = e.target;

        const rect =
            draggedPiece.getBoundingClientRect();

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    }
});

document.addEventListener("mousemove", function(e){

    if(!draggedPiece) return;

    draggedPiece.style.position = "absolute";
    draggedPiece.style.left =
        (e.pageX - offsetX) + "px";

    draggedPiece.style.top =
        (e.pageY - offsetY) + "px";

    draggedPiece.style.zIndex = "1000";
});

document.addEventListener("mouseup", function(){

    if(!draggedPiece) return;

    const board =
        document.getElementById("board");

    const boardRect =
        board.getBoundingClientRect();

    const pieceRect =
        draggedPiece.getBoundingClientRect();

    const insideBoard =
        pieceRect.left > boardRect.left &&
        pieceRect.right < boardRect.right &&
        pieceRect.top > boardRect.top &&
        pieceRect.bottom < boardRect.bottom;

    if(insideBoard){

    const cols = 10;
    const rows = 10;

    const pieceWidth =
        board.clientWidth / cols;

    const pieceHeight =
        board.clientHeight / rows;

    const correctX =
        parseInt(draggedPiece.dataset.correctX);

    const correctY =
        parseInt(draggedPiece.dataset.correctY);

    const targetX =
    boardRect.left +
    correctX * pieceWidth;

const targetY =
    boardRect.top +
    correctY * pieceHeight;

    const currentX =
        pieceRect.left;

    const currentY =
        pieceRect.top;

    const distanceX =
        Math.abs(currentX - targetX);

    const distanceY =
        Math.abs(currentY - targetY);

    if(distanceX < 15 && distanceY < 15){

        draggedPiece.style.position =
            "absolute";

        draggedPiece.style.left =
            targetX + "px";

        draggedPiece.style.top =
            targetY + "px";

        draggedPiece.style.border =
            "2px solid lime";

        draggedPiece.dataset.locked =
            "true";

            completedPieces++;

if(completedPieces === 100){

    alert("🎉 퍼즐 완성!");

}
    }
}

    draggedPiece = null;
});

const hintBtn =
    document.getElementById("hintBtn");

const hintImage =
    document.getElementById("hintImage");

hintBtn.addEventListener("click", function(){

    hintImage.style.display = "block";

    setTimeout(function(){

        hintImage.style.display = "none";

    }, 2000);

});