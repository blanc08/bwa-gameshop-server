const Player = require('../player/model')
const config = require('../../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports = {
  signup: async (req, res, next) => {
    try {
      const payload = req.body

      if (req.file) {
      } else {
        let player = new Player(payload)

        await player.save()

        delete player._doc.password

        res.status(201).json({ data: player })
      }
    } catch (err) {
      if (err && err.name == 'ValidationError') {
        return res.status(422).json({
          err: 1,
          message: err.message,
          fields: err.errors,
        })
      }

      return next(err)
    }
  },

  signin: (req, res, next) => {
    const { email, password } = req.body
    console.log(email)
    Player.findOne({ email: email })
      .then((player) => {
        if (player) {
          const checkPassword = bcrypt.compareSync(password, player.password)
          if (checkPassword) {
            const token = jwt.sign(
              {
                player: {
                  id: player.id,
                  username: player.username,
                  email: player.email,
                  name: player.name,
                  phoneNumber: player.phoneNumber,
                  avatar: player.avatar,
                },
              },
              config.jwtKey
            )

            res.status(200).json({
              data: { token },
            })
          } else {
            res.status(403).json({ message: 'Password salah' })
          }
        } else {
          res
            .status(403)
            .json({ message: 'Email yang anda masukkan belum terdaftar' })
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: err.message || 'Internal Server error' })
      })
  },
}
