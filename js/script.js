var slideActif;
var idSlideActif="";

// Initialise les menu aisni que les utilisateurs si ils n'existent pas.
$(document).ready(function(){

    $('#barremenu').click(function(){        
        if($('#menu').css('left')!='0px'){
            $('#menu').animate({
                'left':'0'
            });
        }       
        else if($('#menu').css('left')=='0px'){
            $('#menu').animate({
                'left':'-199'
            });
        }       
    });
    // Permet d'initialiser les utilisateurs si ils n'existent pas déjà
    if(!localStorage.Init){
	    initUtilisateur();
    }
	listeAll = "k m u r e s n a p t l w i . j z = f o y , v g 5 / q 9 2 h 3 8 b ? 4 7 c 1 d 6 0 x";
	
	// Test barre de progression
	
    goTo("choixUti"); // Cette fonction permet de charger la page d'accueil lorsque le navigateur à terminé de charger la page html.

});

// Fonction qui permet d'appeler le slide que l'on souhaite. Modifier pour gérer quelques exceptions.
function goTo(slide) {
	
	if($('#menu').css('left')=='0px'){$('#menu').animate({'left':'-199'});}
	
	if(utilisateurCourant == 0 && slide != "choixUti"){
		alert("Veuillez choisir un utilisateur !");
	} else {
		if (slideActif != null) slideActif.hide();
    
	    if(slide == "slideapp2"){
	        slide = "ex"+exCourant;
	    }
	    
	    if(suppr>0){ // Permet de remettre à 0 suppr si l'utilisateur à cliquez une seule fois sur la suppression et qu'il est sortie de la page.
		    suppr =0;
	    }
	    slideActif = $("#"+slide);
	    slideActif.show();
	}    
}


// MES VARIABLES 
var exCourant = 0; // Stock le numéro de l'exercice courant
var utilisateurCourant = 0; // Variable stockant l'utilisateur courant
var scoreEx = 0; // Score de l'exercice courant
var scores; // Stock sous forme de tableau tous les scores de l'utilisateurs
var listeAll; // Liste de tous les caractères
var valide; // Variable contenant la chaine de caractère correcte de l'exercice
var str = ''; // Variable qui va contenir la chaine de caractère traduite en pseudo morse
var list1 =''; // Sert pour les exemples audio, permet de stocker ce que l'exemple audio va jouer
var sound; // Variable de son qui est utilisé dès l'instant qu'un son est joué
var suppr = 0; // Variable qui est utilisé pour la suppression d'utilisateur

// MES FONCTIONS

// Cette fonction permet d'initialiser les utilisateurs en local storage
function initUtilisateur(){
    var tab = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i=1; i<=3; i++){
        localStorage.setItem("Utilisateur"+i, tab);
    }
    localStorage.setItem("Init", true);
	
}

// Fonction qui permet à l'utilisateur courant de réinitialiser sa progression, prend en paramètre un entier qui indique le numéro de l'utilisateur
// La fonction se situe sur la page de progression
function resetUtilisateur(){
	
	if(utilisateurCourant!=0 && suppr == 1){
		var tab = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		localStorage.setItem("Utilisateur"+utilisateurCourant,tab);
		suppr = 0;
		changerUtilisateur();
	} else {
		alert("Si vous souhaitez réinitialiser vos données, cliquer de nouveau sur réinitialiser les données");
		suppr++;
	}
}

// Permet d'initialiser les variables nécessaires à l'exercices en fonction de la progression de l'utilisateur
// Cette fonction récupère la liste de complétion des exercices stocker en local storage
// Cette fonction doit être appeler directement après le choix du profil par l'utilisateur
function setApplication(user){
	var list;
	if(user == 1 ){
		list = localStorage.Utilisateur1;
	}else if(user == 2){
		list = localStorage.Utilisateur2;
	}else{
		list = localStorage.Utilisateur3;
	}
	exCourant = setExcourant(list);
	utilisateurCourant = user;
	// Ici on colle la fonction qui initialise les scores
	initScore(list);
	goTo("slideAccueil");
}

// Permet de changer d'utilisateur sans avoir à raffraichir la page
function changerUtilisateur(){
	goTo("choixUti");
	utilisateurCourant = 0;
	
	//remet à 0 la page progression
	
	for(var i = 0; i < 40; i++){
		$("#barre"+(i + 1)).width('0%');
		$("#barre"+(i + 1)+" p").html('0%');
	}

}

// Fonction qui permet d'aller à un exercice si on à fait le score requis (95%)
function goToEx(exer){
	if(scores[exer-1] >= 95 && exer !=1){ // -1 car le tableau commence à 0
		goTo("ex"+exer);
		exCourant = exer;
	}
	
	if(scores[exer-2] >= 95 && exer !=1){ // Permet d'être rediriger sur l'exercice sur lequel l'utilisateur est actuellement
		goTo("ex"+exer);
		exCourant = exer;
	}
	
	if(exer == 1){ // Permet d'aller à l'exercice 1 sans avoir un score de 95%
		goTo("ex"+exer);
		exCourant = exer;
	}
}

// Cette fonction permet d'initialiser les barres de progression avec les valeurs d'avancement de l'utilisateur sur la page progression
function initScore(list){
	list = list.split(',');
	for(var i = 0; i < list.length; i++){
		$("#barre"+(i + 1)).width(list[i]+'%');
		if(list[i] != 0){ // On affiche le pourcentage que si il est différent de 0
			$("#barre"+(i+1)+" p").html(list[i]+'%');
		}
	}
}

// Permet de mettre à jours la progression de l'exercice courant
function setProgress(prct){
	
	$("#barre"+exCourant).width(prct+'%');
	$("#barre"+exCourant+" p").html(prct+'%');
	
}

// Permet de calculer à quel exercice l'utilisateur se trouve
function setExcourant(list){
	scores = list.split(","); // On en profite ici pour stocker sous forme de tableau les scores des différents exercices
	var cpt=1;
	for(var i = 0; i< scores.length; i++){
		if(scores[i] >= 95){
			if(cpt != 40){ // Permet d'évite de se retrouver à l'exercice courant 41
				cpt++;
			}
		}
	}

	return cpt;
}

// Fonction qui permet de mettre à jours le score de l'utilisateur
function storeScore(user){
	
	if(user == 1 ){
		if(scores[exCourant-1]<scoreEx){ // On enregistre le score que si il est meilleure que le précédent
			scores[exCourant-1] = scoreEx; // le -1 permet de stocker le résultat de l'exercice 1 dans la case O du tableau
			localStorage.setItem("Utilisateur1", scores);
		}
	} else if (user == 2){
		if(scores[exCourant-1]<scoreEx){ // On enregistre le score que si il est meilleure que le précédent
			scores[exCourant-1] = scoreEx; // le -1 permet de stocker le résultat de l'exercice 1 dans la case O du tableau
			localStorage.setItem("Utilisateur2", scores);
		}
	} else {
		if(scores[exCourant-1]<scoreEx){ // On enregistre le score que si il est meilleure que le précédent
			scores[exCourant-1] = scoreEx; // le -1 permet de stocker le résultat de l'exercice 1 dans la case O du tableau
			localStorage.setItem("Utilisateur3", scores);
		}
	}
}

// Fonction qui va créer le son pour l'exercice
function creaEx(){
	
	str='';
	
	if(sound != null){sound.stop();} // Permet d'éviter d'avoir plusieurs exercices qui se déroulent en même temps
	
	initSon(20,12);
	valide = chaineAleatoireEx();
	console.log(valide); // --------------- Permet d'avoir le résultat de l'exercice sans avoir à écouter en entier. Attention à ne pas prendre l'espace au début de la chaine.
	traduction(valide);
	sound.playString(str);
}

// Fonction qui va créer le son pour l'exemple de la lettre
function creaExemple(exemple){
	
	list1 ='';
	str='';
	if(sound != null){sound.stop();}
	
	
	if(exemple == "ex"){ // Permet d'avoir le son pour l'exemple de la partie 1
		initSon(20,15);
		list1 = "ceci est un test"
	}else { // Sinon on fait ici l'exemple en fonction de l'exercice depuis lequel la fonction est appelée
		initSon(20,12);
		var car = listeAll.split(' ');
		for(var i=0; i<10; i++){ // on obtient alors list1 qui vaut 'k k k k k k k k k'
			list1 = list1+(car[exemple]+' ');
		}
	}
	
	traduction(list1);
	sound.playString(str);
}

// Fonction principale qui régit le fonctionnement du deuxième module.
function apprentissage(txt){    
	
    sound.stop(); // si jamais un son est en cours, on le coupe vu qu'à ce stade on est à la correction de l'exercice
    scoreEx = 0;
    txt = txt.toLowerCase();
	var rep = txt.split("");
	valide = valide.split("");
	var score = compare(valide, rep);
	scoreEx = score;
	storeScore(utilisateurCourant);
	
	setProgress(score);
	
	
	if(score>=95){

    	if(exCourant != 40){// dans le cas ou on serait dans le dernier exercice
	    	exCourant++;
    	}
    	
    	if (exCourant == 40){ // Le pop-up pour l'exercice est légerement différent des autres, c'est pourquoi il nécessite un if
	    	$("#slideAfin").fadeIn('slow')
	    	$("#sp_scoref").html(scoreEx);
    	} else {
	    	$("#slideAok").fadeIn('slow')
	    	$("#sp_score").html(scoreEx);
    	}
    	
	} else {
    	$("#slideAkok").fadeIn('slow');
    	$("#sp_score2").html(scoreEx);
	}
	

}

// Fonction qui permet de retourner à l'exercice lorsque l'on a fait une erreur.
function retourApp(){
	$("#slideAkok").fadeOut('slow');
}

// Fonction qui permet de retourner à l'exercice lorsque l'on a tout terminé.
function retourAppf(){
	$("#slideAfin").fadeOut('slow');
}

// Fonction qui permet de passer à l'exercice suivant lorsque nous avons réussi l'exercice
function exSuivant(){
	$("#slideAok").fadeOut('slow');
	goTo("ex"+exCourant);
}

// Fonction qui compare la valeur saisie par l'utilisateur et la valeur généré par l'ordinateur
function compare(val, rep){
    var scorec = 0;
    val.shift(); // Permet de retirer l'espace placé au début de la chaine valide qui permettait de temporiser le départ de l'exercice
    for(var i = 0; i < val.length; i++){
	    if (val[i] == ' '){
	    }else if(val[i] == rep[i]){
            scorec++;			           
        }
    }
    return scorec;
}

// Fonction qui permet la correction de l'exercice libre
function exerciceLibre(txt){
	
    sound.stop(); // Stop le son de l'exercice si il est toujours en cours
    scoreEx = 0;
    //rep.toLowerCase();
    txt = txt.toLowerCase(); // Permet de convertir les éventuels majuscules saisies pas l'utilisateur
	var rep = txt.split("");
	valide = valide.split(""); // transforme les chaines de caracteres de l'utilisateur et de la bonne réponse en tableau...

	var score = compare(valide, rep); //... Qui sont comparé ici afin de calculé le score
	scoreEx = score;
	
	$("#slideAr").fadeIn('slow');
	$("#sp_score3").html(scoreEx);

}

// Fonction qui va créer le son pour l'exercice libre
function creaExl(wpm1, wpm2, list){
	
	list = list.toLowerCase(); // évite d'avoir des majuscules qui ne seraient pas reconnu
	if(verifList(list) == false){
		alert("Erreur dans la liste de caractère");
	}else if(wpm1 == '' || wpm2 == '' || list == '' ){
		// Permet de gerer le cas dans lequel certains champs sont vide
		alert("Veuillez remplir tous les champs !");
	} else {		//Ici mettre un if qui appelle la fonction qui permet de lancer une alert si un caractère est inséré et qu'il n'est pas dans la la liste.
		str='';
		if(sound != null){sound.stop();} // Permet d'éviter d'avoir plusieurs exercices qui se déroulent en même temps
		initSon(wpm1,wpm2);
		valide = chaineAleatoireExl(list);
		console.log(valide); // Permet de donner la réponse
		traduction(valide);
		sound.playString(str);
	}
	
}

//Fonction qui vérifie si les caractères saisies sont dans la liste de tous les caractères
function verifList(list){
	var retour = true;
	
	for(var i=0; i< list.length; i++){
		if(listeAll.indexOf(list[i]) == -1){
			retour = false;
		}
	}
	
	
	return retour;
}

// Fonction retour qui permet de retourner sur l'exercice libre
function retourApp2(){
	$("#slideAr").fadeOut('slow');
}

// fonction aléa qui permet de définir le nombre de caractère et les caractères que l'on souhaite selectionner et qui insère un espace tous les 5 caractères
function chaineAleatoireEx() {
	
var listeCar = 0;
var nbcar = 100 ;
var cptEx = 0; // permet de faire le focus dans la zone de saisie de l'exercice.
var inter = listeAll.split(' ') // Découpe la chaine de caractère des caractères présent dans l'exercice.

for(var i=0; i<exCourant+1; i++){
	if(listeCar == 0){
		listeCar = inter[i];
		cptEx++;
	}else{
		listeCar = listeCar+inter[i];
		cptEx++;
	}
	


}
$("#reponse"+exCourant).focus();// Permet de mettre l'utilisateur directement dans la zone de saisie de la réponse
var chaine =' '; // L'espace ici permet de faire démarrer l'exercice avec un petit délai
var j = 0;
for(i = 0; i < nbcar; i++)
{
	if( j == 5){
		chaine = chaine + " ";
		j=0;
	}
	chaine = chaine + listeCar[Math.floor(Math.random()*listeCar.length)];
	j++;
}

return chaine;
}

// fonction aléa semblable à la précédente mais pour l'exercice libre
function chaineAleatoireExl(list) {
	
var listeCar = '';
list.toLowerCase();
var nbcar = 100 ;
var inter = list.split(' ');
for(var i=0; i<inter.length; i++){
	listeCar = listeCar+inter[i];
}
$("#reponsel").focus();// Permet de mettre l'utilisateur directement dans la zone de saisie de la réponse

var chaine =' ';
var j = 0;
for(i = 0; i < nbcar; i++)
{
	if( j == 5){
		chaine = chaine + " ";
		j=0;
	}
	chaine = chaine + listeCar[Math.floor(Math.random()*listeCar.length)];
	j++;
}

return chaine;
}