const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cors())

const transport = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: process.env.user,
      pass: process.env.pass
   }
})


app.post('/api/send-message', async (req, res) => {
   console.log("api-------------")
   try {
      const { name, email, message } = req.body
      const mailOption = {
         from: email,
         to: process.env.user,
         subject: `Mail from the Portfolio - Name: ${name}`,
         text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
      }

      transport.sendMail(mailOption, (err, info) => {
         if (err) {
            console.log("errrrr--jhk-------", err)
            return res.status(500).json({ message: 'There was problem in sending the mail', error: err })
         } else {
            return res.status(200).json({ message: 'Mail send successfully', data: info })
         }
      })

   } catch (err) {
      console.log("errrrr---------",err)
      return res.status(200).json({ message: 'Mail send failure', err })

   }
})
 
module.exports = app