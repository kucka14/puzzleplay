
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
    for (let i = 0; i < gridlist.length; i++) {
        let checklist = gridlist[i].join('');
        if (checklist.includes('XXX') || checklist.includes('OOO')) {
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
        removePercent = 0.2;
    } else if (level == 'medium') {
        removePercent = 0.35;
    } else {
        removePercent = 0.5;
    }
    const gridArea = gridlist.length**2;
    const removeAmount = Math.floor(gridArea * removePercent);
    const fullSet = genRangeList(gridArea - 1);
    const subSet = getRandomSubset(fullSet, removeAmount);
    
    const mergedGrid = mergeList(gridlist);
    for (let i = 0; i < subSet.length; i++) {
        mergedGrid[subSet[i]] = '';
    }
    const modifiedGrid = unmergeList(mergedGrid);
    return modifiedGrid;
}

function setPuzzleRoom() {

//size = str(100/len(gridlist)) + '%'

///static/play/images/letter_{{ cell }}.png

//{% for row in gridlist %}
//        <div class="puzzle-row" style="height: {{ size }};">
//            {% for cell in row %}
//            <div class="puzzle-cell" style="width: {{ size }};">
//                <image width="80%" height="80%">           
//            </div>
//            {% endfor %}
//        </div>
//        {% endfor %}

    document.querySelector('#gen-puzzle').onclick = function() {
        const size = document.querySelector('#size-select').value;
        const level = document.querySelector('#level-select').value;
        const preGridlist = gengrid(size);
        const gridlist = modifyGrid(preGridlist, level);
        for (let i
        
    }

}






















