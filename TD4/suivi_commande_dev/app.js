const express = require("express");
const parser = require('body-parser');
const date = require('date-and-time');
const datas = require('./Tools');
const PORT = 8080;

const buildBody = (type, code, message) => {
  body.type = type;
  body.code = code;
  body.message = message;
};

const buildError = (code) => {
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
  buildBody("Error", code, message);
};

// Variables
let body = {
  type: null,
  code: null,
  message: null
};

// App
const app = express();
app.use(parser.json());




app.listen(PORT);

/* ----------------- Routing  ----------------- */




/******
 *
 * Méthodes GET
 *
 ******/

// Root
app.get("/", (req, res) => {
  buildError(403);
  res.status(403).send(body)
});

app.get('/:command', function (req, res) { 
  let uri  = new URL(req.protocol+req.get('host')+req.originalUrl)
  if(req.params.command != "commandes"){
    res.send({type:"error",error:400,message : 'Route non connu '})
  }else{
    datas.query(uri.searchParams.get('page'),uri.searchParams.get('status'),uri.searchParams.get('size'),res);
    
}

})



