/* 
Activité : gestion des contacts
*/

// TODO : complétez le programme

// Définition du prototype de Contact, un objet qui permet de gérer un contact avec son affichage
var Contact = {
	nom: "",
	prenom: "",
	creer: function (prenom, nom) {
		this.nom = nom;
		this.prenom = prenom;
	},
	decrire: function () {
		return this.prenom[0].toUpperCase() + this.prenom.substr(1).toLowerCase() + " " + this.nom.toUpperCase();
	}
};

// Définition du prototype de Repertoire, un objet qui permet de stocker et d'afficher une liste de Contacts
var Repertoire = {
	listeDeContacts: [],
	lister: function () {
		var resultatContacts = "";
		this.listeDeContacts.forEach(function (contact, index) {
			resultatContacts = resultatContacts + index + " - " + contact.decrire() + "\n";
		});
		return resultatContacts;
	},
	// Cette fonction renvoie une chaine qui est le nom complet du nouveau contact tel qu'il est maintenant défini dans le répertoire.
	ajouter: function (prenom, nom) {
		var nouveauContact = Object.create(Contact);
		nouveauContact.creer(prenom, nom);
		this.listeDeContacts.push(nouveauContact);
		return this.listeDeContacts[this.listeDeContacts.length - 1].decrire();
	}
};	

// Définition d'un objet Menu permettant de gérer l'affichage des choix disponibles et la saisie du choix utilisateur
var Menu = {
	CHOIX_LISTE: "L",
	CHOIX_NOUVEAU: "N",
	CHOIX_QUITTER	: "Q",
	choixActif: "",
	estChoixValide: function (choix) {
		return (choix === this.CHOIX_QUITTER || choix === this.CHOIX_LISTE || choix === this.CHOIX_NOUVEAU);
	},
	reponseQuitter: function () {
		return this.choixActif === this.CHOIX_QUITTER;
	},
	reponseListe: function () {
		return this.choixActif === this.CHOIX_LISTE;
	},
	reponseNouveau: function () {
		return this.choixActif === this.CHOIX_NOUVEAU;
	},
	demanderChoixValide: function () {
		var messageDErreur = "";
		var texteMenu = "Gestionnaire de contacts\n" +
			"-----------------------\n" +
			"Que voulez-vous faire ?\n" +
			"(" + this.CHOIX_LISTE + ")... Afficher la liste des contacts\n" +
			"(" + this.CHOIX_NOUVEAU + ")... Ajouter un nouveau contact dans la liste\n" +
			"(" + this.CHOIX_QUITTER + ")... Quitter (sans sauvegarde)\n"
		var question = "Votre choix ?"
		this.choixActif = "";
		while (! this.estChoixValide(this.choixActif)) {
			var choix = demander(messageDErreur + texteMenu + question);
			if (choix) {
				choix = choix.toUpperCase();
			}
			if (this.estChoixValide(choix)) {
				this.choixActif = choix;
			}
			else {
				messageDErreur = "ERREUR : Le choix " + choix + " n'est pas un choix valide !\n\n";
			}
		}
	}
}

// Fonction de simplification des affichages : à la fois à l'écran (alert) et dans la console
function afficher(message) {
	console.log(message);
	alert(message);
}

// Fonction de simplification des demandes utilisateur : à la fois à l'écran (prompt) et dans la console
function demander(message) {
	console.log(message);
	return prompt(message);
}

// Définition d'un objet gestionnaire qui va permet de gérer l'ensemble de l'application
var gestionnaire = {
	repertoire: Object.create(Repertoire),
	menu: Object.create(Menu),
	actif: function () {
		return (this.menu.reponseQuitter() === false);
	},
	lister: function () {
		afficher("Liste des contacts du répertoire :\n" + this.repertoire.lister());
	},
	nouveau: function () {
		var nouveauPrenom = demander("Création d'un nouveau contact dans le répertoire :\nQuel est son prénom ?");
		var nouveauNom = demander("Création d'un nouveau contact pour " + nouveauPrenom + ":\nQuel est son nom ?");
		var nomCompletNouveauContact = this.repertoire.ajouter(nouveauPrenom, nouveauNom);
		afficher("Nouveau contact " + nomCompletNouveauContact + " créé et ajouté dans le répertoire");
	},
	quitterSansSauver: function () {
		afficher("Fin du programme. Les données sont abandonnées.");
	},
	attendreUnChoixPuisLeTraiter: function () {
		this.menu.demanderChoixValide();
		if (this.menu.reponseListe()) {
			this.lister();
		}
		else if (this.menu.reponseNouveau()) {
			this.nouveau();
		}
		else if (this.menu.reponseQuitter()) {
			this.quitterSansSauver();
		}
	}
} ;

// Ajout du premier contact dans le répertoire du gestionnaire
gestionnaire.repertoire.ajouter("Carole", "Lévisse");

// Ajout du second contact dans le répertoire du gestionnaire
gestionnaire.repertoire.ajouter("Mélodie", "Nelsonne");


// Boucle principale du gestionnaire de contacts
while (gestionnaire.actif()) {
	gestionnaire.attendreUnChoixPuisLeTraiter();
}
