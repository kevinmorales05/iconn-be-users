const MailSlurp = require("mailslurp-client").default;
const template = require('./welcomeTemplate');
//funcion para enviar correo electronico de confirmacion a un correo establecido
//configuro con mi API KEY
const sendWelcomeMessage = async (email, name) => { //aqui ingresan el id del inbox, la clave temporal obtenida de manera aleatoria, y el correo del cliente
    //await mailslurp.createInbox();
    try {
        const mailslurp = new MailSlurp({
            apiKey: process.env.APIKEY_MAILSLURP,
        });
        await mailslurp.sendEmail(process.env.MAIL_INBOX_ID, {
            to: [email],
            subject: "Verificación de correo electronico",
            isHTML:true,
            body: template(name),
            charset: "utf8",
            html: true,
        });
        console.log("Correo enviado con Éxito a " + email);
    } catch (error) {
        console.log('No funciona enviar el correo')
        console.log(error);
    }
};

module.exports = sendWelcomeMessage;