"use strict"

function createChessBoard(){
    let placeHolder = document.getElementById("chessboard");
    
    let chessBoard = document.createElement("table");
    placeHolder.appendChild(chessBoard);

    // create columns header

    let columnsHeader = document.createElement("tr");
    chessBoard.appendChild(columnsHeader);
    // first cell over row header
    let emptyCell = document.createElement("th");
    emptyCell.setAttribute("class", "cell")
    columnsHeader.appendChild(emptyCell);
    //
    let columns = ['A','B','C','D','E','F','G','H']; 
    for(let i of columns){
        let columnHeader = document.createElement("th");
        columnHeader.setAttribute("class", "cell")
        columnHeader.innerHTML = i;
        columnsHeader.appendChild(columnHeader);
    }

    // create board
    for(let i = 1; i < 9; i++){
        // add new row
        let row = document.createElement("tr");
        chessBoard.appendChild(row);
        // add row header
        let rowHeader = document.createElement("td");
        rowHeader.setAttribute("class", "cell rowheader")
        rowHeader.innerHTML = String(i);
        row.appendChild(rowHeader);
        
        // add cells to row
        for(let j = 1; j < 9; j++){
            let cell = document.createElement("td");
            cell.setAttribute("class", "cell")
            row.appendChild(cell);
        }
    }
    
}