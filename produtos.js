let Mercado = [];
lerProdutos();



const ordenadoPreco = ordenar(Mercado, "preco");

console.log('Produtos Ordenados pelo menor preço');
ordenadoPreco.forEach(produto => {
    console.log("Produto: " + produto.nome
                +", " + produto.descricao
                +", " + produto.preco
                +", " + produto.quantidade
                +", " + produto.categoria
                + ", R$ " + produto.preco);
});

function lerProdutos(){
    Mercado = require("./produtos.json");
}

function cadastrarProduto(codigo, nome, descricao, preco, quantidade, categoria){
    const encontrado = encontrar(Mercado, "codigo", codigo);
    if (typeof encontrado === "undefined"){
        const produto = {
            codigo: codigo,
            nome: nome,
            descricao: descricao,
            preco: preco,
            quantidade: quantidade,
            categoria: categoria
        };

        Mercado.push(produto);

        //Persistindo os Dados
        const fs = require('fs');

        const MercadoJSON = JSON.stringify(Mercado);
        fs.writeFileSync("produtos.json", MercadoJSON);
        console.log("Dados foram adicionados com sucesso!");
    } else {
        console.log("Produto já existente");
    }
}

function encontrar(lista, chave, valor){
    return lista.find((item) => item[chave] === valor);
}

function ordenar(lista, chave){
    return lista.sort((a, b) => {
        if(a[chave] < b[chave]){
            return -1;
        }
        if(a[chave] > b[chave]){
            return 1;
        }
        return 0;
    });
}

