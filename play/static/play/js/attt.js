
function tempAlert(msg, duration, textColor, backgroundColor) {
    const el = document.createElement("div");
    el.setAttribute("style",
                    `position: fixed;
                    top: 35%;
                    width: 150px;
                    left: calc(50% - 75px);
                    background-color: ${backgroundColor};
                    opacity: 0.7;
                    color: ${textColor};
                    z-index: 1050;
                    text-align: center;
                    padding-top: 20px;
                    padding-bottom: 20px;
                    padding-left: 10px;
                    padding-right: 10px;
                    `);
    el.innerHTML = msg;
    document.body.appendChild(el);
    
    function clickClear() {
        el.parentNode.removeChild(el);
        clearTimeout(timeClear);
        document.body.removeEventListener('click', clickClear);
    }
    timeClear = setTimeout(function(){
        el.parentNode.removeChild(el);
        document.body.removeEventListener('click', clickClear);
    }, duration);
    setTimeout(function() {
        document.body.addEventListener('click', clickClear);
    });
}

function mergeList(list) {
    let mergedList = []
    for (let i = 0; i < list.length; i++) {
        mergedList = mergedList.concat(list[i]);
    }
    return mergedList;
}

function unmergeList(list) {
    const size = Math.sqrt(list.length);
    let mergedList = [];
    for (let i = 0; i < size; i++) {
        let listRow = [];
        for (let j = 0; j < size; j++) {
            listRow.push(list[(i * size) + j]);
        }
        mergedList.push(listRow);
    }
    return(mergedList);
}

function genRangeList(highBound, lowBound=0) {
    rangeList = []
    for (let i = lowBound; i <= highBound; i++) {
        rangeList.push(i);
    }
    return rangeList;
}

function getRandomSubset(fullSet, count) {
    
    subSet = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random()*fullSet.length);
        subSet.push(fullSet.splice(randomIndex, 1)[0]);
    }
    return subSet;
}

function pick() {
    const choiceArray = ['x', 'o'];
    const randomIndex = Math.floor(Math.random() * choiceArray.length);  
    const randomChoice = choiceArray[randomIndex];
    return randomChoice;
}

function invertGrid(gridlist) {
    let invertedGridlist = [];
    for (let i = 0; i < gridlist.length; i++) {
        invertedGridlist.push([]);
    }
    for (let i = 0; i < gridlist.length; i++) {
        for (let j = 0; j < gridlist.length; j++) {
            invertedGridlist[j].push(gridlist[i][j]);
        }   
    }
    return invertedGridlist;
}

function checkGrid(gridlist) {
    for (let i = 0; i < gridlist.length; i++) {
        let checklist = gridlist[i].join('');
        if (checklist.includes('xxx') || checklist.includes('ooo') || checklist.includes('b')) {
            return false;
        }
    }
    return true
}

function showGrid(gridlist) {
    for (let i = 0; i < gridlist.length; i++) {
        console.log(gridlist[i]);
    }
}

function makeRow(size) {
    let gridRow = [];
    for (let j = 0; j < size; j++) {
        const gridCell = pick();
        gridRow.push(gridCell);
    }
    return gridRow;
}

function gengrid(size) {
    while (true) {
        let gridlist = [];
        for (let i = 0; i < size; i++) {
            let gridRow = makeRow(size);
            while (checkGrid([gridRow]) == false) {
                gridRow = makeRow(size);
            }
            gridlist.push(gridRow);
        }
        invertedGridlist = invertGrid(gridlist);
        if (checkGrid(invertedGridlist)) {
            return gridlist;
        }
    }
}

function modifyGrid(gridlist, level) {
    let removePercent = 0;
    if (level == 'easy') {
        removePercent = 0.3;
    } else if (level == 'medium') {
        removePercent = 0.4;
    } else {
        removePercent = 0.5;
    }
    const gridArea = gridlist.length**2;
    const removeAmount = Math.floor(gridArea * removePercent);
    const fullSet = genRangeList(gridArea - 1);
    const subSet = getRandomSubset(fullSet, removeAmount);
    
    const mergedGrid = mergeList(gridlist);
    for (let i = 0; i < subSet.length; i++) {
        mergedGrid[subSet[i]] = 'b';
    }
    const modifiedGrid = unmergeList(mergedGrid);
    return modifiedGrid;
}

function changeCellImage(cell, type) {
    cell.innerHTML = '';
    if (type == 'x' || type == 'o') {
        cellImage = document.createElement('img');
        cellImage.classList.add('cell-image');
        cellImage.src = '/static/play/images/letter_' + type + '.png'; 
        cell.appendChild(cellImage);
    }
    cell.dataValue = type;
}

function cellClickAction() {
    const cellMarker = this.dataValue;
    if (cellMarker == 'b') {
        changeCellImage(this, 'x');
    } else if (cellMarker == 'x') {
        changeCellImage(this, 'o');
    } else if (cellMarker == 'o') {
        changeCellImage(this, 'b');
    }
}   

function addCellItem(cell, item) {
    if (item == 'x' || item == 'o') {
        changeCellImage(cell, item);
    } else {
        cell.classList.add('change-cell');
        cell.onclick = cellClickAction;
    }
    cell.dataValue = item;
}

function setAtttRoom() {

    window.onbeforeunload = function() {
        return ''; 
    }

    document.querySelector('#gen-puzzle').onclick = function() {
        const size = document.querySelector('#size-select').value;
        const cellSize = (100/size).toString() + '%';
        const level = document.querySelector('#level-select').value;
        const preGridlist = gengrid(size);
        const gridlist = modifyGrid(preGridlist, level);
        
        const puzzleBox = document.querySelector('#puzzle-box');
        puzzleBox.innerHTML = '';
        for (let i = 0; i < size; i++) {
            const htmlRow = document.createElement('div');
            htmlRow.classList.add('puzzle-row');
            htmlRow.style.height = cellSize;
            puzzleBox.appendChild(htmlRow);
            for (let j = 0; j < size; j++) {
                const htmlCell = document.createElement('div');
                htmlCell.classList.add('puzzle-cell');
                htmlCell.style.width = cellSize;
                addCellItem(htmlCell, gridlist[i][j]);
                htmlRow.appendChild(htmlCell);
            }
        }
    }
    
    document.querySelector('#check-answer').onclick = function() {
        const cellList = document.getElementsByClassName('puzzle-cell');
        valueList = [];
        for (let i = 0; i < cellList.length; i++) {
            valueList.push(cellList[i].dataValue);
        }
        gridlist = unmergeList(valueList);
        if (checkGrid(gridlist) && checkGrid(invertGrid(gridlist))) {
            tempAlert('Correct!', 5000, 'white', 'green'); 
        } else {
            tempAlert('Incorrect.', 5000, 'white', 'red'); ;
        }
    }

}

































