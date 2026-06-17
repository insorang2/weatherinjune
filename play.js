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