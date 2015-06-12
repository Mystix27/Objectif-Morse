

// Cette fonction initialise la variable son en lui attribuant les sprites correspondants aux différents son nécessaire.
// Elle prend en paramètre la vitesse de transmission (word per minute) qui va permettre de régler la durée de chacun des sprites pour correspondre à la vitesse de transmission.
function initSon(wpm, wpm2){
	
	var total;
	var elt;
	var elt2;
	
	if (wpm == wpm2){
		total = ((wpm * 50)/60);
		elt = (1/total)*1000; // Permet d'avoir un résultat en ms
				
		sound = new Howl({
			urls: ['./son/sound.mp3'],
			sprite: {
			C: [100, elt], //beep court
			L: [500, 3*elt], //beep long
			M: [1100, 7*elt], //inter mot
			I: [1100, 1*elt], //inter bip
			W: [1100, 3*elt], //inter lettre
			B: [2100, 300] //bruit
			}
		});
				
	}else {
		
		total = total = ((wpm * 50)/60);
		elt = (1/total)*1000; // Permet d'avoir un résultat en ms
		total = total = ((wpm2 * 50)/60);
		elt2 = (1/total)*1000; // Permet d'avoir un résultat en ms
		
		sound = new Howl({
			urls: ['./son/sound.mp3'],
			sprite: {
			C: [100, elt], //beep court
			L: [100, 3*elt], //beep long
			M: [1100, 7*elt2], //inter mot
			I: [1100, 1*elt], //inter bip
			W: [1100, 3*elt2], //inter lettre
			B: [2100, 300] //bruit
			}
		});
	}
}

// Fonction qui permet de lire une chaine de caractère pour émettre le code morse correspondant
Howl.prototype.playString = function(str){
    if(str.length>1){
        this._onend[0] = function(){this.playString(str.substring(1,str.length));};
    } else {
        this._onend[0] = function(){};
    }
    if(str.length>0){
        this.play(str.substring(0,1));
    }
};

// Fonction qui va décomposer la chaine de caractère de l'exercice et l'envoyer à la fonction lettre()

function traduction(str){
	var tabRep = str.split('')
	//console.log(tabRep);
	
	for(var i=0; i< tabRep.length; i++){
		lettre(tabRep[i]);
	}
}


// Cette fonction prend en paramètre un charactère et ajoute la correspondance morse à une chaine de caractère. Cette fonction sert en quelque sorte de bibliothèque morse
function lettre(chr){
	
	
   
    switch (chr) {
	    
    case 'a':
        str += 'CILW';
        break;
        
    case 'b':
        str += 'LICICICW';
        break;
        
    case 'c':
        str += 'LICILICW';
        break;
        
    case 'd':
        str += 'LICICW';
        break;
        
    case 'e':
        str += 'CW';
        break;
        
    case 'f':
        str += 'CICILICW';
        break;
        
    case 'g':
        str += 'LILICW';
        break;
        
    case 'h':
        str += 'CICICICW';
        break;
        
    case 'i':
        str += 'CICW';
        break;
        
    case 'j':
        str += 'CILILILW';
        break;
        
    case 'k':
        str += 'LICILW';
        break;
        
    case 'l':
        str += 'CILICICW';
        break;
        
    case 'm':
        str += 'LILW';
        break;
        
    case 'n':
        str += 'LICW';
        break;
        
    case 'o':
        str += 'LILILW';
        break;
        
    case 'p':
        str += 'CILILICW';
        break;
        
    case 'q':
        str += 'LILICILW';
        break;
        
    case 'r':
        str += 'CILICW';
        break;
        
    case 's':
        str += 'CICICW';
        break;
        
    case 't':
        str += 'LW';
        break;
        
    case 'u':
        str += 'CICILW';
        break;
    
    
    case 'v':
        str += 'CICICILW';
        break;
        
    case 'w':
        str += 'CILILW';
        break;
        
    case 'x':
        str += 'LICICILW';
        break;
        
    case 'y':
        str += 'LICILILW';
        break;
    
    case 'z':
        str += 'LILICICW';
        break;
        
    case '0':
        str += 'LILILILILW';
        break;
        
    case '1':
        str += 'CILILILILW';
        break;
        
    case '2':
        str += 'CICILILILW';
        break;
        
    case '3':
        str += 'CICICILILW';
        break;
        
    case '4':
        str += 'CICICICILW';
        break;
        
    case '5':
        str += 'CICICICICW';
        break;
        
    case '6':
        str += 'LICICICICW';
        break;
        
    case '7':
        str += 'LILICICICW';
        break;
        
    case '8':
        str += 'LILILICICW';
        break;
        
    case '9':
        str += 'LILILILICW';
        break;
        
    case '.':
        str += 'CILICILICILW';
        break;
        
    case ',':
        str += 'LILICICILILW';
        break;
        
    case '/':
        str += 'LICICILICW';
        break;
        
    case '=':
        str += 'LICICICILW';
        break;
        
    case '?':
        str += 'CICILILICICW';
        break;
        
    case ' ':
        str += 'M';
        break;
    }
       
}
  
// Fonction qui permet de stopper la lecture d'un son
function stop(){
    sound.stop();
}