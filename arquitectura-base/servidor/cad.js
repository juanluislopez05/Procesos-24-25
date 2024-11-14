const mongo=require("mongodb").MongoClient;
const ObjectId=require("mongodb").ObjectId;


function CAD() {
    this.usuarios;

    // Método para conectar a la base de datos
    this.conectar = async function(callback) {
        let cad=this;
        let client = new mongo("mongodb+srv://juanluislopez05:SXRifSvUfiCjUcxz@cluster0.bg5kf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        await client.connect();
        const database = client.db("sistema");
        this.usuarios = database.collection("usuarios");
        callback(database);
    };

    // Buscar o crear un usuario en la base de datos
    this.buscarOCrearUsuario = function(usr, callback) {
        buscarOCrear(this.usuarios, usr, callback);
    };

    // Método para buscar o crear un usuario
    this.buscarOCrearUsuario=function(usr,callback){
        buscarOCrear(this.usuarios,usr,callback);
        }
        function buscarOCrear(coleccion,criterio,callback)
        {
        coleccion.findOneAndUpdate(criterio, {$set: criterio}, {upsert:
        true,returnDocument:"after",projection:{email:1}}, function(err,doc) {
        if (err) { throw err; }
        else {
        console.log("Elemento actualizado");
        console.log(doc.value.email);
        callback({email:doc.value.email});
        }
        });
        }

    
}

module.exports.CAD = CAD;
