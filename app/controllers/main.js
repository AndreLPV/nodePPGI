const index = (req, res) => {
    const conteudo = 'Página principal da aplicação';
    res.render('main/index', {
        conteudo,
      
    });
};

const teste1 = (req, res) => {
    res.render('teste/teste1');
};
const teste2 = (req, res) => {
    res.render('teste/teste2');
};
const teste3 = (req, res) => {
    res.render('teste/teste3');
};

const sobre = (req, res) => {
    const conteudo = 'Página sobre a aplicação';
    res.render('main/sobre', {
        conteudo,
    
    });
};


module.exports = { index, sobre ,teste1,teste2,teste3}