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

var level = actDig = nxtLvl = 0;
var nxtDig = prevDig = -1;
var sEvolved = null;

function changeSprite(t_name, addClass, removeClass, exRemoveClass) {
    document.getElementById('dgmImg').src = `img/sprites/dm1/${t_name}.webp`;
    document.getElementById('dgmImg').classList.remove(removeClass);
    document.getElementById('dgmImg').classList.remove(exRemoveClass);
    document.getElementById('dgmImg').classList.add(addClass);
}

window.onload = () => {

    document.getElementById('btnNext').onclick = () => {
        sEvolved = 'e';
        if ( dgmEvoLn[level][actDig].next == null )
            return;
        if ( nxtDig == -1 )
            nxtDig = dgmEvoLn[level][actDig].next[0];
        else {
            let index = dgmEvoLn[level][actDig].next.indexOf(nxtDig) + 1;
            nxtDig = dgmEvoLn[level][actDig].next[index]
            if ( nxtDig == undefined )
                nxtDig = dgmEvoLn[level][actDig].next[0];
        }
        nxtLvl = level + 1;
        changeSprite(dgmEvoLn[nxtLvl][nxtDig].name, 'evolved', 'devolved');
    }
    
    document.getElementById('btnNext').oncontextmenu = () => {
        let index = 0;
        sEvolved = 'e';
        if ( dgmEvoLn[level][actDig].next == null )
            return;
        if ( nxtDig == -1 ) {
            index = dgmEvoLn[level][actDig].next.length - 1;
            nxtDig = dgmEvoLn[level][actDig].next[index];
        }
        else {
            index = dgmEvoLn[level][actDig].next.indexOf(nxtDig) - 1;
            nxtDig = dgmEvoLn[level][actDig].next[index];
            if ( nxtDig == undefined ) {
                index = dgmEvoLn[level][actDig].next.length - 1;
                nxtDig = dgmEvoLn[level][actDig].next[index];
            }
        }
        nxtLvl = level + 1;
        changeSprite(dgmEvoLn[nxtLvl][nxtDig].name, 'evolved', 'devolved');
    }

    document.getElementById('btnPrev').onclick = () => {
        sEvolved = 'd';
        if ( dgmEvoLn[level][actDig].prev == null )
            return;
        if ( prevDig == -1 )
            prevDig = dgmEvoLn[level][actDig].prev[0];
        else {
            let index = dgmEvoLn[level][actDig].prev.indexOf(prevDig) + 1;
                prevDig = dgmEvoLn[level][actDig].prev[index]
            if ( prevDig == undefined )
                prevDig = dgmEvoLn[level][actDig].prev[0];
        }
        nxtLvl = level - 1;
        changeSprite(dgmEvoLn[nxtLvl][prevDig].name, 'devolved', 'evolved');
    }
    
    document.getElementById('btnPrev').oncontextmenu = () => {
        sEvolved = 'd';
        if(dgmEvoLn[level][actDig].prev == null)
            return 0;
        let index = dgmEvoLn[level][actDig].prev.indexOf(prevDig);
        if(index == -1) {
            index = dgmEvoLn[level][actDig].prev.length - 1;
            prevDig = dgmEvoLn[level][actDig].prev[index];
        }
        else {
            prevDig = dgmEvoLn[level][actDig].prev[--index];
            if(prevDig == -1 || prevDig == undefined) {
                index = dgmEvoLn[level][actDig].prev.length - 1;
                prevDig = dgmEvoLn[level][actDig].prev[index];
            }
        }
        nxtLvl = level - 1;
        changeSprite(dgmEvoLn[nxtLvl][prevDig].name, 'devolved', 'evolved');
    }

    document.getElementById('conBtn').onclick = () => {
        if(sEvolved == null)
            return;
        else if( sEvolved == 'e' )
            actDig = nxtDig;
        else
            actDig = prevDig;
        level = nxtLvl;
        changeSprite(dgmEvoLn[level][actDig].name, null, 'evolved', 'devolved');
        nxtDig = prevDig = -1;
    }

    document.getElementById('btnCan').onclick = () => {
        changeSprite(dgmEvoLn[level][actDig].name, null, 'evolved', 'devolved');
        nxtDig = prevDig = -1;
        sEvolved = null;
    }

    document.getElementById('btnReset').onclick = () => {
        level = nxtLvl = actDig = 0;
        nxtDig = prevDig = -1;
        sEvolved = null;
        changeSprite('botamon', null, 'evolved', 'devolved');
    }
}