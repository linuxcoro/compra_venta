const mongoose = require("mongoose");
const Ruta = require("../models/rutaModel");

let location = require('location-href')


let findAll = (req, res) => {
  Ruta.find()
    .select("direccionSgc direccion latitud longitud ubicacion comentario fechaInstalacion activo _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        rutas: docs.map(doc => {
          return {
            direccionSgc: doc.direccionSgc,
            direccion: doc.direccion,
            latitud: doc.latitud,
            longitud: doc.longitud,
            ubicacion: doc.ubicacion,
            comentario: doc.comentario,
            fechaInstalacion: doc.fechaInstalacion,
            activo: doc.activo,
            _id: doc._id,
            request: {
              type: "GET",
              url: res.location.url+"/api/v1/rutas/" + doc._id
            }
          }
        })
      }
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

let save = (req, res) => {
  const ruta = new Ruta({
    _id: new mongoose.Types.ObjectId(),
    direccionSgc: req.body.direccionSgc,
    direccion: req.body.direccion,
    latitud: req.body.latitud,
    longitud: req.body.longitud,
    ubicacion: req.body.ubicacion,
    comentario: req.body.comentario,
    fechaInstalacion: req.body.fechaInstalacion,
    activo: req.body.activo
  });
  ruta
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created ruta successfully",
        createdRuta: {
          direccionSgc: result.direccionSgc,
          direccion: result.direccion,
          latitud: result.latitud,
          longitud: result.longitud,
          ubicacion: result.ubicacion,
          comentario: result.comentario,
          fechaInstalacion: result.fechaInstalacion,
          activo: result.activo,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/api/v1/rutas/" + result._id
          }
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

let find = (req, res) => {
  const id = req.params.rutaId;
  Ruta.findById(id)
    .select("direccionSgc direccion latitud longitud ubicacion comentario fechaInstalacion activo _id")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          ruta: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/api/v1/rutas"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
}


let updated = (req, res) => {
  const id = req.params.rutaId
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  Ruta.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Ruta updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/api/v1/rutas/" + id
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}


let deleted = (req, res) => {
  const id = req.params.rutaId
  Ruta.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Ruta deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/api/v1/rutas",
          body: { name: "String", price: "Number" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

module.exports = {
    findAllRutas: findAll,
    saveRuta: save,
    findRuta: find,
    updateRuta: updated,
    deleteRuta: deleted
}
