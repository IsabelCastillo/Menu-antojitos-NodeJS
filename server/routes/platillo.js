const express = require('express');
const app = express();
const Platillo = require('../models/platillo');

app.get('/platillos', (req, res) => {

    Platillo.find({})
        .limit(5)
        .populate('categorias', 'strNombre')
        .exec((err, platillos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.status(200).json({
                ok: true,
                platillos
            })

        })
});

app.get('/platillos/:id', (req, res) => {

    let id = req.params.id;

    Platillo.findById(id)
        .populate('categorias', 'strNombre strDescripcion')
        .exec((err, platilloDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!platilloDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El id proporcionado no existe'
                    }
                });
            }

            res.status(200).json({
                ok: true,
                platillo: platilloDB
            });

        })
});

app.post('/platillos', (req, res) => {

    let body = req.body;

    let platillo = new Platillo({
        strNombre: body.strNombre,
        strDescripcion: body.strDescripcion,
        strIngredientes: body.strIngredientes,
        nmbPiezas: body.nmbPiezas,
        nmbPrecio: body.nmbPrecio,
        categoria: body.categoria
    });

    platillo.save((err, platilloDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El platillo ya ha sido creado'
                }
            });
        }
        res.status(200).json({
            ok: true,
            platillo: platilloDB
        })
    });
})

app.put('/platillos/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Platillo.findById(id, (err, platilloDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!platilloDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id proporcionado no es valido'
                }
            });
        }

        platilloDB.strNombre = body.strNombre;
        platilloDB.strDescripcion = body.strDescripcion;
        platilloDB.strIngredientes = body.strIngredientes;
        platilloDB.nmbPrecio = body.nmbPrecio;
        platilloDB.categoria = body.categoria;
        platilloDB.nmbPiezas = body.nmbPiezas;
        platilloDB.nmbPrecio = body.nmbPrecio;

        platilloDB.save((err, platilloGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.status(200).json({
                ok: true,
                producto: platilloGuardado
            })
        })
    })

});

app.delete('/platillos/:id', (req, res) => {
    let id = req.params.id;

    Producto.findById(id, (err, platilloDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!platilloDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id proporcionado no existe'
                }
            });
        }

        platilloDB.blnStatus = false;
        platilloDB.save((err, platilloBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
        })


    })

});
module.exports = app;