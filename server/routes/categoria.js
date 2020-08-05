const express = require('express');
const app = express();
const Categoria = require('../models/categoria');

app.get('/categoria/:id', (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El id proporcionado no es valido'
                }
            })
        }

        res.status(200).json({
            ok: true,
            categoria: categoriaDB
        })
    })

})


app.get('/categoria', function(req, res) {
    Categoria.find({})
        .sort('strNombre')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Categoria.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    categorias,
                    cuantos: conteo
                })
            })

        })
});

app.post('/categoria', (req, res) => {
    let body = req.body;

    // Crea una nueva instancia de ese esquema
    let categoria = new Categoria({
        strNombre: body.strNombre,
        strDescripcion: body.strDescripcion
    })


    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'la categoria ya ha sido creada'
                }
            });
        }

        if (!categoriaDB) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            categoria: categoriaDB
        })


    })

});

app.put('/categoria/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let infCategoria = {
        strNombre: body.strNombre,
        strDescripcion: body.strDescripcion
    }


    Categoria.findByIdAndUpdate(id, infCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            categoria: categoriaDB
        })
    })
})

app.delete('/categoria/:id', (req, res) => {

})

module.exports = app;