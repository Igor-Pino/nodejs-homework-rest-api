const sgMail = require("@sendgrid/mail")
const {SENDGRID_API_KEY} = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

const sendMail = async(data) => {
 // eslint-disable-next-line no-useless-catch
 try {
     const mail = {...data,  from: 'igorpinyo@gmail.com'}
     await sgMail.send(mail);
 } catch (error) {
    throw error
 }
}

module.exports = sendMail;