const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/techstore')
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error('Error de conexion a MongoDB:', err));

const productSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    valoracion: String,
    imagen: String
});

const Product = mongoose.model('Product', productSchema);

const poblarBD = async () => {
    try {
        const conteo = await Product.countDocuments();
        if (conteo === 0) {
            const rutaJson = path.join(__dirname, 'productos.json');
            const data = JSON.parse(fs.readFileSync(rutaJson, 'utf-8'));
            await Product.insertMany(data);
            console.log('Base de datos poblada desde productos.json');
        } else {
            console.log(`La base de datos contiene ${conteo} productos.`);
        }
    } catch (err) {
        console.error('Error al poblar la BD:', err);
    }
};

app.get('/api/productos', async (req, res) => {
    try {
        const productos = await Product.find();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

const PORT = 5000;
app.listen(PORT, async () => {
    console.log(`Servidor listo en http://localhost:${PORT}`);
    await poblarBD();
});
