const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const CSV_FILE = 'products.csv';


app.use(cors());
app.use(bodyParser.json());

// Banco de dados em memória
let products = [];
let nextId = 1;

// Função para carregar dados do CSV
function loadDataFromCSV() {
    try {
        if (fs.existsSync(CSV_FILE)) {
            const data = fs.readFileSync(CSV_FILE, 'utf8');
            const lines = data.split('\n').filter(line => line.trim() !== '');

            if (lines.length > 0) {
                products = lines.slice(1).map(line => {
                    const [id, name, quantity] = line.split(',');
                    return {
                        id: parseInt(id),
                        name,
                        quantity: parseInt(quantity)
                    };
                });

                // Encontrar o maior ID para definir o nextId
                if (products.length > 0) {
                    nextId = Math.max(...products.map(p => p.id)) + 1;
                }
            }
            console.log('Dados carregados do arquivo CSV');
        } else {
            // Cria arquivo CSV vazio se não existir
            fs.writeFileSync(CSV_FILE, 'id,name,quantity\n');
            console.log('Arquivo CSV criado');
        }
    } catch (error) {
        console.error('Erro ao carregar dados do CSV:', error);
    }
}

// Função para salvar dados no CSV
function saveDataToCSV() {
    try {
        let csvData = 'id,name,quantity\n';
        products.forEach(product => {
            csvData += `${product.id},${product.name},${product.quantity}\n`;
        });

        fs.writeFileSync(CSV_FILE, csvData);
        console.log('Dados salvos no CSV');
    } catch (error) {
        console.error('Erro ao salvar dados no CSV:', error);
    }
}

// Configurar salvamento automático a cada 1 minuto
function setupAutoSave() {
    setInterval(() => {
        saveDataToCSV();
    }, 60000); // 60.000 ms = 1 minuto
}

// Carregar dados ao iniciar
loadDataFromCSV();
setupAutoSave();

// Rotas (mantidas as mesmas do original)

app.get('/products', (req, res) => {
    res.json(products);
});


app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});


app.post('/products', (req, res) => {
    const { name, quantity } = req.body;

    if (!name || quantity === undefined) {
        return res.status(400).json({ message: 'Nome e quantidade são obrigatórios' });
    }

    const newProduct = {
        id: nextId++,
        name,
        quantity: parseInt(quantity)
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Atualizar um produto
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, quantity } = req.body;

    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Produto não encontrado' });
    }

    if (!name || quantity === undefined) {
        return res.status(400).json({ message: 'Nome e quantidade são obrigatórios' });
    }

    const updatedProduct = {
        id,
        name,
        quantity: parseInt(quantity)
    };

    products[productIndex] = updatedProduct;
    res.json(updatedProduct);
});

// Excluir um produto
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Produto não encontrado' });
    }

    products.splice(productIndex, 1);
    res.status(204).send();
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


process.on('SIGINT', () => {
    saveDataToCSV();
    process.exit();
});