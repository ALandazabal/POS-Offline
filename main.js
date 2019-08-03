const { app, BrowserWindow, Menu } = require('electron')
// Mantén una referencia global del objeto window, si no lo haces, la ventana
// se cerrará automáticamente cuando el objeto JavaScript sea eliminado por el recolector de basura.
let win

// Dependencias

const path = require('path');
const url = require('url');
const request = require('request')
const OAuth = require('oauth-1.0a')
const crypto = require('crypto')

var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./database.sqlite"
  }
});

//Connection with mysql db
/*const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'dbtours'
})

connection.connect(function(err){
  //si hay
  if(err){
    console.log(err.code)
    console.log(err.fatal)
  }
})

exports.connection = connection;

exports.closeConnection = () => {
  connection.end(function(){
    //close the conecction
  })
}

console.log(connection);*/

/*require('electron-reload')(__dirname);*/

//Conexion y llamados http a Netsuite
// Initialize
var oauth = OAuth({
   consumer: {
       key: '66ea8772b7e653d111e2d3bcc7bd552017a809c2df7e982861d8b43e2cb92023',
       secret: 'f599f30717c3388dbc915e003a5e45b08e8e914a98737371728935fdebf58e8e',
   },
   signature_method: 'HMAC-SHA1',
   hash_function(base_string, key) {
       return crypto
           .createHmac('sha1', key)
           .update(base_string)
           .digest('base64')
   },
   realm : 'TSTDRV1132665'
})

//console.log( oauth );

var request_data = {
   url: 'https://tstdrv1132665.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=1318&deploy=1',
   method: 'GET',
   data: {}
}

// Note: The token is optional for some requests
var token = {
   key: 'b8c71fece223d88506c91ee0a151a23e195c6d99fb8a9cdded296f98fe1042e8',
   secret: 'ab9db0869d88feb29ef5b85e230035d7e559e368b94261ff589fbccc1bc13307',
}

request(
   {
     url: request_data.url,
     method: request_data.method,
     body: request_data.data,
     headers: oauth.toHeader(oauth.authorize( request_data, token )),
     json: true
   },
   function(error, response, body) {
       // Process your data here
       console.log(body);
   }
)
//Ventana principal
function createWindow () {
  // Crea la ventana del navegador.
  win = new BrowserWindow({

    resizable: true,
    fullscreen:false,
    minimizable:true,
    minHeight:600,
    minWidth:1300,
    show: false,
    closable:true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  //SQLite stuff
  let server = require('./server/server.js')

  const template = [
    // { role: 'appMenu' }
   /* ...(process.platform === 'darwin' ? [{
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),*/
    // { role: 'fileMenu' }
    {
      label: 'Archivo',
      submenu: [
        { role: 'quit' }
      ]
    },
    // { role: 'editMenu' }
    {
      label: 'Editar',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
      ]
    },
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
       /* { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },*/
        { role: 'togglefullscreen' }
      ]
    },
    // { role: 'windowMenu' }
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
      ]
    }
    /*{
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternalSync('https://electronjs.org') }
        }
      ]
    }*/
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
   /* win.setMenu(null)*/
  // and load the index.html of the app.
  win.loadFile('login.html')
  win.once('ready-to-show', () => {
    win.show()
  })

  menu.on("mainWindowLoaded", function(){
    let result = knex.select("FirstName").from("User")
    result.then(function(rows){
      mainWindow.webContents.send("resultSent", rows);
    })
  })

  // Abre las herramientas de desarrollo (DevTools).
  win.webContents.openDevTools()
  
  // Emitido cuando la ventana es cerrada.
  win.on('closed', () => {
    // Elimina la referencia al objeto window, normalmente  guardarías las ventanas
    // en un vector si tu aplicación soporta múltiples ventanas, este es el momento
    // en el que deberías borrar el elemento correspondiente.
    win = null
  })
}

// Este método será llamado cuando Electron haya terminado
// la inicialización y esté listo para crear ventanas del navegador.
// Algunas APIs pueden usarse sólo después de que este evento ocurra.
app.on('ready', createWindow)

// Sal cuando todas las ventanas hayan sido cerradas.
app.on('window-all-closed', () => {
  // En macOS es común para las aplicaciones y sus barras de menú
  // que estén activas hasta que el usuario salga explicitamente con Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // En macOS es común volver a crear una ventana en la aplicación cuando el
  // icono del dock es clicado y no hay otras ventanas abiertas.
  if (win === null) {
    createWindow()
  }
})

// En este archivo puedes incluir el resto del código del proceso principal de
// tu aplicación. También puedes ponerlos en archivos separados y requerirlos aquí.
