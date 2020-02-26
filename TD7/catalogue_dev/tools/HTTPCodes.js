/*
    Ce module permet de construire des réponses HTTP
 */

const HTTPCodes = {

    base: function(type, code, message){
      return {type: type, code: code, message: message}
    },
    success: function(code){
        let message = null;
        switch(code){
            case 200:
                message = "Succès de la requête";
                break;
            case 201:
                message = "La donnée a été insérée avec succès";
                break;
        }
        return this.base("Success", code, message)
    },
    error: function(code){
        let message = null;
        switch (code) {
            case 400:
                message = "L'URI indiquée n'est pas connue de l'API";
                break;
            case 403:
                message = "Accès non authorisé";
                break;
            case 404:
                message = "Ressource non disponible";
                break;
            case 405:
                message = "Méthode non authorisée";
                break;
            case 500:
                message = "Erreur interne au serveur";
                break;

        }
        return this.base("Error", code, message)
    }
};

module.exports = HTTPCodes;
