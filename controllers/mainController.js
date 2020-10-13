let mainController = {
    index: function(req, res, next) {
        res.render('index', {
             title: 'Express',
             css: 'style.css' 
            });
      }
}



module.exports = mainController