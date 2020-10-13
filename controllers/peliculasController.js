let db = require('../database/models');

const {validationResult} = require('express-validator');

let peliculasController = {
    lista: function(req, res){
        db.Pelicula.findAll()
            .then(function(peliculas){
                res.render('listadoPeliculas', {peliculas:peliculas, css: 'listado.css'})
            })
    },
    crear: function(req, res){
        db.Genero.findAll()
            .then(function(generos){
                return res.render('crearPeliculas', {generos : generos, css: "crear.css"})
            })
    },
    subir: function(req, res){
        db.Pelicula.create({
            title: req.body.titulo,
            rating: req.body.rating,
            awards: req.body.premios,
            length: req.body.length,
            genre_id: req.body.genero,
            release_date: req.body.fecha
        });

        res.redirect('/movies')
    },
    detail: function(req, res){
        db.Pelicula.findByPk(req.params.id, {
            include: [{association: 'genero'}, {association: 'actores'}]
        })
            .then(function(pelicula){
                res.render('detallePelicula', {pelicula:pelicula, css: "detalle.css"})
            })
    },
    editar: function(req, res){
        let pedidoPelicula = db.Pelicula.findByPk(req.params.id);

        let pedidoGeneros = db.Genero.findAll();

        Promise.all([pedidoPelicula, pedidoGeneros])
            .then(function([pelicula, generos]){
                res.render('editarPelicula', {pelicula:pelicula, generos:generos, css: "editar.css"})
            })
    },
    actualizar: function(req, res){
        db.Pelicula.update({
            title: req.body.titulo,
            rating: req.body.rating,
            awards: req.body.premios,
            length: req.body.length,
            genre_id: req.body.genero,
            release_date: req.body.fecha
        }, {
            where: {
                id: req.params.id
            }
        });

        res.redirect('/movies/' + req.params.id)
    },
    eliminar: function(req, res){
        db.Pelicula.destroy({
            where: {
                id: req.params.id
            }
        });

        res.redirect('/movies')
    }
}



module.exports = peliculasController