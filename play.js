const piecesDiv = document.getElementById("pieces");

const image = new Image();
image.src = "images/puzzle.png";

image.onload = function () {

    const rows = 10;
    const cols = 10;

    const pieceWidth = image.width / cols;
    const pieceHeight = image.height / rows;

    for(let y = 0; y < rows; y++){

        for(let x = 0; x < cols; x++){

            const piece =
                document.createElement("canvas");

            piece.width = pieceWidth;
            piece.height = pieceHeight;

            piece.className = "piece";

            piece.dataset.correctX = x;
            piece.dataset.correctY = y;

            piece.dataset.snapX =
            x * pieceWidth;

            piece.dataset.snapY =
            y * pieceHeight;

            const pctx =
                piece.getContext("2d");

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

let draggedPiece = null;

document.addEventListener("mousedown", function(e){

    if(
        e.target.classList.contains("piece") &&
        e.target.dataset.locked !== "true"
    ){
        draggedPiece = e.target;
    }

});

document.addEventListener("mousemove", function(e){

    if(!draggedPiece) return;

    draggedPiece.style.position = "absolute";
    draggedPiece.style.left = e.pageX - 30 + "px";
    draggedPiece.style.top = e.pageY - 30 + "px";
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

    const targetX =
    boardRect.left +
    5 +
    parseInt(draggedPiece.dataset.snapX);

    const targetY =
    boardRect.top +
    5 +
    parseInt(draggedPiece.dataset.snapY);

    const distanceX =
        Math.abs(pieceRect.left - targetX);

    const distanceY =
        Math.abs(pieceRect.top - targetY);

    if(distanceX < 30 && distanceY < 30){

        draggedPiece.style.border =
            "2px solid lime";

        draggedPiece.style.left =
            targetX + "px";

        draggedPiece.style.top =
            targetY + "px";

        draggedPiece.dataset.locked = "true";
    }
}

    draggedPiece = null;

});