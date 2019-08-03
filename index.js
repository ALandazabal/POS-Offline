const remote = require('electron').remote
const main = remote.require('./main.js')

$(function(){
    let query = 'SELECT * FROM craft_users WHERE username = "admin"'

    main.connection.query(query, function(err,rows,fields){
        if(err){
            console.log("Hubo un error al hacer la consulta")
            console.log(err)
            return
        }

        let row = rows[0]
        /*$('.odd').append('Usuario:'+ row.email)
        $('.odd').append('Memoria:'+ row.phone)*/
        alert('Usuario:'+ row.email)
        alert('Memoria:'+ row.phone)
    })
})

main.closeConnection()