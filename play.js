document.getElementById("forPuzzle").innerHTML = `
<img
    id="puzzleImage"
    src="images/puzzle.png"
    style="
        width:90%;
        max-width:900px;
        margin-top:30px;
        display:none;
    "
>
`;

document.getElementById("hintBtn").onclick = function() {

    const image = document.getElementById("puzzleImage");

    image.style.display = "block";

    setTimeout(function() {
        image.style.display = "none";
    }, 3000);

};