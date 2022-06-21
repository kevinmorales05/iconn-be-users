const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function getSecretKey() {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < 20; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log("SECRETKEY GENERATED: "+result);
    return result;
}

module.exports = getSecretKey;