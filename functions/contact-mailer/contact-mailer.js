const nodemailer = require('nodemailer');
const validator = require('validator');
const xssFilters = require('xss-filters');

const shouldSend = true

const NODEMAILER_INFO = {
  /*host: "smtp.gmail.com",*/
  service: "gmail",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.USER_MAIL, // generated ethereal user
    pass: process.env.MDP_MAIL // generated ethereal password
  }
}

const SMTP_DEFAULT_FIELDS = {
  from: 'Developmint <no-reply@developmint.de>'
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ 'error': 'Method not allowed' }) }
  }

  try {
    const params = JSON.parse(event.body)

    const attributes = ['name', 'email', 'msg']
    const sanitizedAttributes = attributes.map(n => validateAndSanitize(n, params[n]))
    const someInvalid = sanitizedAttributes.some(r => !r)

    if (someInvalid) {
      return { statusCode: 422, body: JSON.stringify({ 'error': 'Ugh.. That looks unprocessable!' }) }
    }
    const sendMailFunction = shouldSend ? sendMail : sendMailDev
    try {
      await sendMailFunction(...sanitizedAttributes)
      return { statusCode: 200, body: JSON.stringify({ 'message': 'OH YEAH' }) }
    } catch (e) {
      console.error(e)
      return { statusCode: 500, body: 'error' }
    }
  } catch (e) {
    console.error(e)
    return { statusCode: 422, body: JSON.stringify({ 'error': 'Ugh.. That looks unprocessableee!' }) }
  }
}

const validateAndSanitize = (key, value) => {
  const rejectFunctions = {
    name: v => v.length < 4,
    email: v => !validator.isEmail(v),
    msg: v => v.length < 25
  }

  // If object has key and function returns false, return sanitized input. Else, return false
  return rejectFunctions.hasOwnProperty(key) && !rejectFunctions[key](value) && xssFilters.inHTMLData(value)
}

const sendMail = async (name, email, msg) => {
  const transporter = nodemailer.createTransport(
    {
      ...NODEMAILER_INFO,
      logger: {
        debug: () => {},
        info: () => {},
        warn: console.warn,
        error: console.error
      },
      debug: shouldSend
    },
    SMTP_DEFAULT_FIELDS
  )

  // Message object
  const message = {
    replyTo: email,
    to: "pierre222ramires@gmail.com",
    subject: `New contact form message from ${email}`,
    text: msg,
    html: `
        <h1>Un utilisateur a besoin d'informations</h1>
        <h2>Détail de l'utilisateur: </h2>
        <ul>
          <li>Nom: ${name}</li>
          <li>Email: ${email}</li>
        </ul>
        <p>^${msg}</p>
    `
  }

  await transporter.sendMail(message)

  console.log('Message sent successfully!')
}

const sendMailDev = (...args) => {
  console.log(...args)
}
