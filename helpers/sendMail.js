const sgMail = require("@sendgrid/mail")
const {SENDGRID_API_KEY} = process.env

sgMail.setApiKey(SENDGRID_API_KEY)
// const mail = {
//   to: '',
//   from: 'igorpinyo@gmail.com',
//   subject: 'test mail',
//   html: '<td align="center"><table width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tbody><tr><td align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td width="530" valign="top" align="center"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td  align="center" style="font-size:0"><a target="_blank" href="https://viewstripo.email/"><img src="https://tlr.stripocdn.email/content/guids/CABINET_75694a6fc3c4633b3ee8e3c750851c02/images/67611522142640957.png" alt style="display: block;" width="120"></a></td></tr><tr><td  align="center"><h2>You sing up success!</h2></td></tr><tr><td  align="left"><p style="font-size: 16px; color: #777777;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium iste ipsa numquam odio dolores, nam.</p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td>'
// }

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