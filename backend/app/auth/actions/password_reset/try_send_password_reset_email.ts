import User from '#auth/models/user'
import string from '@adonisjs/core/helpers/string'
import encryption from '@adonisjs/core/services/encryption'
import ExpirePasswordResetTokens from '#auth/actions/password_reset/expire_password_reset_token'
import { DateTime } from 'luxon'
import router from '@adonisjs/core/services/router'
import env from '#start/env'
import mail from '@adonisjs/mail/services/main'

type Params = {
  email: string
}

export default class TrySendPasswordResetEmail {
  static async handle({ email }: Params) {
    const user = await User.query().where({ email }).first()
    const value = string.generateRandom(32)
    const encryptedValue = encryption.encrypt(value)

    if (!user) return

    await ExpirePasswordResetTokens.handle({ user })
    await user.related('passwordResetTokens').create({
      value,
      expiresAt: DateTime.now().plus({ hour: 1 }),
    })
    const resetLink = router
      .builder()
      .prefixUrl(env.get('APP_URL'))
      .params({ value: encryptedValue })
      .make('forgot_password.reset')

    await mail.sendLater((message) => {
      message.subject('Réinitialisez votre mot de passe').to(user.email).html(`
      <h1>Réinitialisez votre mot de passe</h1>
      <p>Bonjour ${user.username},</p>
      <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Ce lien expirera dans une heure.</p>
    `)
    })
  }
}
