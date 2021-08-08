var level = actDig = nxtLvl = 0;
var nxtDig = prevDig = -1;
var sEvolved = null;
var dgmEvoLn = data[0];
var dir = 'img/sprites/dm';
var folder = 1;

function changeSprite(t_name, addClass, removeClass, exRemoveClass) {
    let sprite = document.getElementById('dgmImg');
    sprite.src = `${dir}${folder}/${t_name}.webp`;
    sprite.classList.remove(removeClass);
    sprite.classList.remove(exRemoveClass);
    sprite.classList.add(addClass);
}

function changeSkin(t_vPet) {
    let vPet = document.getElementById('vPet');
    let skins = ['v-pet-red','v-pet-blue','v-pet-yellow','v-pet-green','v-pet-gray'];
    let skin = vPet.classList[1];
    vPet.classList.remove(skin);
    vPet.classList.add(skins[t_vPet]);
    dgmEvoLn = data[t_vPet];
    level = actDig = nxtLvl = 0;
    nxtDig = prevDig = -1;
    sEvolved = null;
    folder = t_vPet + 1;
    changeSprite(dgmEvoLn[0][0].name, null, 'evolved', 'devolved');
}

function changeVPet(t_vPet) {
    changeSkin(t_vPet);
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
        changeSprite(dgmEvoLn[0][0].name, null, 'evolved', 'devolved');
    }
}