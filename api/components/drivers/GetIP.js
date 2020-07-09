var os = require('os');

var ifaces = os.networkInterfaces();


exports.getIp = () => {
    let ip = '';
    var os = require( 'os' ); 
    // var networkInterfaces = os.networkInterfaces( ); 
    // console.log({red: networkInterfaces.wlp2s0 });

    // require('dns').lookup(require('os').hostname(), function (err, add, fam) { console.log('addr: '+add); }) 
    var networkInterfaces = os.networkInterfaces( );

    console.log( networkInterfaces );
        
}


