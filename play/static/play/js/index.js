

function pick() {
    const choiceArray = ['X', 'O'];
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
    console.log('hello');
    for (let i = 0; i < gridlist.length; i++) {
        let checklist = gridlist[i].join('');
        console.log(checklist);
        if (checklist.includes('XXX') || checklist.includes('OOO')) {
            return false;
        } else {
            return true;
        }
    }
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
//            showGrid(gridlist);
            return;
        }
    }
}




















