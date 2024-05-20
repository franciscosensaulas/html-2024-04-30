const cors = require('cors');
const express = require('express');
const Sequelize = require('sequelize');
const app = express();
app.use(cors({
    // origin: 'http://127.0.0.1:5500'  // Permitir apenas requisições dessa origem
}));
const port = 3000;

const sequelize = new Sequelize('sqlite:./database.sqlite');

// Importar modelos
const Categoria = require('./models/categoria')(sequelize, Sequelize.DataTypes);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas para Categoria
app.get('/categorias', async (req, res) => {
    const categorias = await Categoria.findAll();
    res.json(categorias);
});

app.get('/categorias/:id', async (req, res) => {
    const categoria = await Categoria.findByPk(req.params.id);
    if (categoria) {
        res.json(categoria);
    } else {
        res.status(404).send('Categoria não encontrada');
    }
});

// Adicionar uma nova categoria
app.post('/categorias', async (req, res) => {
    try {
        const { nome } = req.body;
        const novaCategoria = await Categoria.create({ nome });
        res.status(201).json(novaCategoria);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Atualizar uma categoria
app.post('/categorias/:id', async (req, res) => {
    try {
        const { nome } = req.body;
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) {
            return res.status(404).send('Categoria não encontrada');
        }
        categoria.nome = nome;
        await categoria.save();
        res.status(200).json(categoria);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Deletar uma categoria
app.get('/categorias/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // Primeiro, tenta encontrar a categoria para verificar se ela realmente existe
        const categoria = await Categoria.findByPk(id);

        if (!categoria) {
            // Se não encontrar a categoria, retorna que não foi encontrada
            return res.status(404).send('Categoria não encontrada');
        }

        // Se a categoria existe, prossegue para deletar
        const resultado = await Categoria.destroy({
            where: { id }
        });
        console.log("Número de linhas deletadas:", resultado);

        if (resultado > 0) {
            // Confirma que a categoria foi deletada
            res.status(200).send('Categoria deletada com sucesso');
        } else {
            // Por alguma razão, a categoria não foi deletada
            res.status(404).send('Falha ao deletar a categoria');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Sincronizar com o banco de dados e iniciar o servidor
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
});
