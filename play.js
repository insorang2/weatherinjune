const canvas = document.getElementById("puzzleCanvas");
const ctx = canvas.getContext("2d");

const image = new Image();

image.src = "images/puzzle.png";

image.onload = function(){

    ctx.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
    );

    createPieces();
};

function createPieces(){

    const piecesDiv =
        document.getElementById("pieces");

    piecesDiv.innerHTML = "";

    const rows = 10;
    const cols = 10;

    const pieceWidth =
        image.width / cols;

    const pieceHeight =
        image.height / rows;

    for(let y=0;y<rows;y++){

        for(let x=0;x<cols;x++){

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

const randomOrder = Math.random();
piece.style.order = Math.floor(randomOrder * 1000);

piecesDiv.appendChild(piece);
        }
    }
}