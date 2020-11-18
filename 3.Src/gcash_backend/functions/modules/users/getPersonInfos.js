const { db } = require("../adminSdk");
const admin = require("firebase-admin");
const { getSessionUser } = require("../getSessionUID");

const cors = require("cors")({ origin: true });


class Person {
  constructor(nni, prenom, prenomPere, nom, ddn) {
    this.nni = nni;
    this.prenom = prenom;
    this.prenomPere = prenomPere;
    this.nom = nom;
    this.ddn = ddn;
  }
}
const listPersons = [
  new Person("1234567890", "Un à neuf", "Un", "Neuf", new Date()),
  new Person("1515151515", "Quinz", "Cinq", "Ould Quinz", new Date()),
  new Person("1414141414", "Quatorze", "Quatre", "Ould quatorze", new Date()),
  new Person("1313131313", "Treize", "Trois", "Ould treize", new Date()),
  new Person("1212121212", "douze", "deux", "Ould douze", new Date()),
  new Person("1111111111", "Onze", "Onze", "Ould Onze", new Date())
];
let other = listPersons.map(p => p.nni);
console.log(typeof other);
const getPersonInfos = (req, res) => {
  cors(req, res, async () => {
    let user = await getSessionUser(req);
    //todo: if isAdmin or user.uid == req.body.data.uid
    if (user) {
      let nni = req.body.data.nni;

      let existingUser = await db.collection("users").where("nni", "==", nni).get();
      if (existingUser.docs.length > 0) {
        res.send({ data: { error:  { nniValid: true, nniAlreadyRegistred:true }  } });
        return;
        //TODO: consulter le webservice de l'ANRPTS
      } else if (listPersons.map(p => p.nni).includes(nni)) {
        let person = listPersons.filter(p => p.nni===nni)[0];
        res.send({ data: { nniValid: true, nniAlreadyRegistred:false, nni: nni, prenom: person.prenom, prenomPere:person.prenomPere, nom: person.nom, ddn: person.ddn } });
      } else {
        res.send({ data: { nniValid: false, nniAlreadyRegistred:false } });
      }
      return;
    } else {
      res.status(401).send({ data: { error: "Unauthorized" } });
      return;
    }
  });
}
module.exports = getPersonInfos;
