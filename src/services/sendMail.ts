import nodemailer from 'nodemailer'

// information to send
interface IMailInformation{
  to: string,
  subject: string,
  text: string
}

const sendMail = async (mailInformation: IMailInformation)=>{
  // step to send mail
  // transporter/ transport -> configuration setup lai transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_GMAIL,
      pass: process.env.NODEMAILER_GMAIL_APP_PASSWORD
      // the password is not real password, actually it is the password accessed through GOOGLE account -> serach app password -> create -> remove space of app password
    }
  })

  const mailFormatObject = {
    from : "Google <google@gmail.com>",
    to : mailInformation.subject,
    html : mailInformation.text
  }

  try{
    await transporter.sendMail(mailFormatObject)
  }catch(error){
    console.log(error)
  }
}

export default sendMail