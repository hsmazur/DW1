document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const productsTable = document.getElementById('productsTable').getElementsByTagName('tbody')[0];
    
    let editingId = null;

    // Carregar produtos ao iniciar
    loadProducts();

    // Evento de submit do formulário
    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const productId = document.getElementById('productId').value;
        const productName = document.getElementById('productName').value;
        const productQuantity = document.getElementById('productQuantity').value;
        
        const product = {
            name: productName,
            quantity: parseInt(productQuantity)
        };
        
        if (productId) {
            updateProduct(productId, product);
        } else {
            createProduct(product);
        }
    });

    // Evento do botão cancelar
    cancelBtn.addEventListener('click', resetForm);

    function loadProducts() {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(products => {
                productsTable.innerHTML = '';
                products.forEach(product => {
                    addProductToTable(product);
                });
            })
            .catch(error => console.error('Erro ao carregar produtos:', error));
    }

    function addProductToTable(product) {
        const row = productsTable.insertRow();
        
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td class="actions">
                <button class="edit-btn" data-id="${product.id}">Editar</button>
                <button class="delete-btn" data-id="${product.id}">Excluir</button>
            </td>
        `;
        
        // Adicionar eventos aos botões
        row.querySelector('.edit-btn').addEventListener('click', function() {
            editProduct(product.id);
        });
        
        row.querySelector('.delete-btn').addEventListener('click', function() {
            deleteProduct(product.id);
        });
    }

    // Função para criar produto
    function createProduct(product) {
        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
        .then(response => response.json())
        .then(newProduct => {
            addProductToTable(newProduct);
            resetForm();
        })
        .catch(error => console.error('Erro ao criar produto:', error));
    }

    // Função para editar produto
    function editProduct(id) {
        fetch(`http://localhost:3000/products/${id}`)
            .then(response => response.json())
            .then(product => {
                document.getElementById('productId').value = product.id;
                document.getElementById('productName').value = product.name;
                document.getElementById('productQuantity').value = product.quantity;
                
                editingId = id;
            })
            .catch(error => console.error('Erro ao carregar produto para edição:', error));
    }

    // Função para atualizar produto
    function updateProduct(id, product) {
        fetch(`http://localhost:3000/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
        .then(response => response.json())
        .then(updatedProduct => {
            loadProducts();
            resetForm();
        })
        .catch(error => console.error('Erro ao atualizar produto:', error));
    }

    // Função para excluir produto
    function deleteProduct(id) {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            fetch(`http://localhost:3000/products/${id}`, {
                method: 'DELETE',
            })
            .then(() => {
                loadProducts();
                if (editingId === id) {
                    resetForm();
                }
            })
            .catch(error => console.error('Erro ao excluir produto:', error));
        }
    }

    // Função para resetar o formulário
    function resetForm() {
        productForm.reset();
        document.getElementById('productId').value = '';
        editingId = null;
    }
});