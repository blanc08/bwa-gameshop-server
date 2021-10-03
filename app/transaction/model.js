const mongoose = require('mongoose')

let transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: {
        type: String,
        require: [true, 'name game harus diisi'],
      },
      category: {
        type: String,
        require: [true, 'name game harus diisi'],
      },
      thumbnail: {
        type: String,
      },
      coinName: {
        type: String,
        require: [true, 'name coin harus diisi'],
      },
      coinQuantity: {
        type: String,
        require: [true, 'Jumlah coin harus diisi'],
      },
      price: {
        type: Number,
      },
    },

    historyPayment: {
      name: {
        type: String,
        require: [true, 'Nama harus diisi'],
      },
      type: {
        type: String,
        require: [true, 'Tipe Pembayaran harus diisi'],
      },
      bankName: {
        type: String,
        require: [true, 'Nama bank harus diisi'],
      },
      noRekening: {
        type: String,
        require: [true, 'Nomor Rekening harus diisi'],
      },
    },

    name: {
      type: String,
      require: [true, 'Nama harus diisi'],
      maxlength: [255, 'panjang nama haruslah antara 3- 255 karakter'],
      minlength: [3, 'panjang nama haruslah antara 3- 255 karakter'],
    },
    accountUser: {
      type: String,
      require: [true, 'Nama akun diisi'],
      maxlength: [255, 'panjang nama haruslah antara 3- 255 karakter'],
      minlength: [3, 'panjang nama haruslah antara 3- 255 karakter'],
    },

    tax: {
      type: Number,
      default: 0,
    },

    value: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },

    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
    },
    historyUser: {
      name: {
        type: String,
        require: [true, 'Nama player harus diisi'],
      },
      phoneNumber: {
        type: Number,
        require: [true, 'Nama akun diisi'],
        maxlength: [13, 'panjang nama haruslah antara 9 - 13 karakter'],
        minlength: [9, 'panjang nama haruslah antara 9 - 13 karakter'],
      },
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Transaction', transactionSchema)
