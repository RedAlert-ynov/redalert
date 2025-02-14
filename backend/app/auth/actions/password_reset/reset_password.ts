import { passwordResetValidator } from '#auth/validators/password_reset_validator'
import { Infer } from '@vinejs/vine/types'
import VerifyPasswordResetToken from '#auth/actions/password_reset/verify_password_reset_token'
import { Exception } from '@adonisjs/core/exceptions'
import ExpirePasswordResetTokens from '#auth/actions/password_reset/expire_password_reset_token'

type Params = {
  data: Infer<typeof passwordResetValidator>
}

export default class ResetPassword {
  static async handle({ data }: Params) {
    const { isValid, user } = await VerifyPasswordResetToken.handle({ encryptedValue: data.value })

    if (!isValid) {
      throw new Exception(
        'Le lien de réinitialisation de votre mot de passe est invalide ou a expiré.',
        {
          status: 403,
          code: 'E_UNAUTHORIZED',
        }
      )
    }

    await user!.merge({ password: data.password }).save()
    await ExpirePasswordResetTokens.handle({ user: user! })

    return user!
  }
}
