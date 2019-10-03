const index = (req, res) => {
    const conteudo = 'Página principal da aplicação';
    res.render('main/index', {
        conteudo,
      
    });
};
const sobre = (req, res) => {
    const conteudo = 'Página sobre a aplicação';
    res.render('main/sobre', {
        conteudo,
    
    });
};

const ui = (req, res) => {
    res.render('main/ui',{layout:'uiLayout'});
};
module.exports = { index, sobre,ui }