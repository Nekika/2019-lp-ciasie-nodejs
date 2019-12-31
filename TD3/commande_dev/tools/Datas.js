/*
    Ce module permet d'effectuer différentes opérations sur des données
 */

const Datas = {
    keys: function(object){
        let res = [];
        Object.keys(object).forEach(key => {
            res.push(key)
        });
        return res;
    },
    values: function (object){
        let res = [];
        Object.keys(object).forEach(key => {
            res.push(object[key])
        });
        return res;
    }
};

module.exports = Datas;

