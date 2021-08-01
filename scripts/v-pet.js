const dgmEvoLn = {
    0: {
        0: {
            name: 'botamon',
            next: [0],
            prev: null
        }
    },
    1: {
        0: {
            name: 'koromon',
            next: [0,1],
            prev: [0]
        }
    },
    2: {
        0: {
            name: 'agumon',
            next: [0,1,2,3,6],
            prev: [0]
        },
        1: {
            name: 'betamon',
            next: [2,3,4,5,6],
            prev: [0]
        }
    },
    3: {
        0: {
            name: 'greymon',
            next: [0],
            prev: [0]
        },
        1: {
            name: 'tyranomon',
            next: [1],
            prev: [0]
        },
        2: {
            name: 'devimon',
            next: [0],
            prev: [0,1]
        },
        3: {
            name: 'meramon',
            next: [1],
            prev: [0,1]
        },
        4: {
            name: 'airdramon',
            next: [0],
            prev: [1]
        },
        5: {
            name: 'seadramon',
            next: [1],
            prev: [1]
        },
        6: {
            name: 'numemon',
            next: [2],
            prev: [0,1]
        }
    },
    4: {
        0: {
            name: 'metalgreymon-virus',
            next: null,
            prev: [0,2,4],
        },
        1: {
            name: 'mamemon',
            next: null,
            prev: [1,3,5]
        },
        2: {
            name: 'monzaemon',
            next: null,
            prev: [6]
        }
    }
};

var level = nxtLvl = 0;
var nxtDig = 0;
var actDig = 0
level = 0;

function changeSprite(t_name, addClass, remoceClass) {
    document.getElementById('dgmImg').src = `img/sprites/dm1/${t_name}.png`;
    document.getElementById('dgmImg').classList.remove(remoceClass);
    document.getElementById('dgmImg').classList.add(addClass);
}

window.onload = () => {

    document.getElementById('btnNext').onclick = () => {
        if(dgmEvoLn[level][actDig].next == null)
            return 0;
        let index = dgmEvoLn[level][actDig].next.indexOf(nxtDig);
        if(index == -1)
            nxtDig = dgmEvoLn[level][actDig].next[0];
        else {
            console.log(index)
            nxtDig = dgmEvoLn[level][actDig].next.indexOf(++index);
            console.log(dgmEvoLn[level][actDig].next.indexOf(index));
            if(nxtDig == -1)
                nxtDig = dgmEvoLn[level][actDig].next[0];
        }
        changeSprite(dgmEvoLn[level+1][nxtDig].name, 'evolved', 'devolved');
    }
    
    document.getElementById('btnNext').oncontextmenu = () => {
        if(dgmEvoLn[level][actDig].next == null)
            return 0;
        let index = dgmEvoLn[level][actDig].next.indexOf(nxtDig);
        if(index == -1)
            nxtDig = dgmEvoLn[level][actDig].next[0];
        else {
            nxtDig = dgmEvoLn[level][actDig].next.indexOf(--index);
            if(nxtDig == -1) {
                index = dgmEvoLn[level][actDig].next.length - 1;
                nxtDig = dgmEvoLn[level][actDig].next[index];
            }
        }
        changeSprite(dgmEvoLn[level+1][nxtDig].name, 'evolved', 'devolved');
    }

    document.getElementById('btnPrev').onclick = () => {
        if(dgmEvoLn[level][actDig].prev == null)
            return 0;
        let index = dgmEvoLn[level][actDig].prev.indexOf(nxtDig);
        if(index == -1)
            nxtDig = dgmEvoLn[level][actDig].prev[0];
        else {
            nxtDig = dgmEvoLn[level][actDig].prev.indexOf(++index);
            if(nxtDig == -1)
                nxtDig = dgmEvoLn[level][actDig].prev[0];
        }
        changeSprite(dgmEvoLn[level-1][nxtDig].name, 'devolved', 'evolved');
    }
    
    document.getElementById('btnPrev').oncontextmenu = () => {
        if(dgmEvoLn[level][actDig].prev == null)
            return 0;
        let index = dgmEvoLn[level][actDig].prev.indexOf(nxtDig);
        if(index == -1)
            nxtDig = dgmEvoLn[level][actDig].prev[0];
        else {
            nxtDig = dgmEvoLn[level][actDig].prev.indexOf(--index);
            if(nxtDig == -1) {
                index = dgmEvoLn[level][actDig].prev.length - 1;
                nxtDig = dgmEvoLn[level][actDig].prev[index];
            }
        }
        changeSprite(dgmEvoLn[level-1][nxtDig].name, 'devolved', 'evolved');
    }

    document.getElementById('conBtn').onclick = () => {
        console.log('right click!')
    }
}