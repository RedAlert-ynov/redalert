import ResetPassword from '#auth/actions/password_reset/reset_password'
import TrySendPasswordResetEmail from '#auth/actions/password_reset/try_send_password_reset_email'
import VerifyPasswordResetToken from '#auth/actions/password_reset/verify_password_reset_token'
import {
  passwordResetSendValidator,
  passwordResetValidator,
} from '#auth/validators/password_reset_validator'
import { HttpContext } from '@adonisjs/core/http'

export default class ForgotPasswordController {
  /**
   * Envoie un e-mail avec un lien pour réinitialiser le mot de passe
   */
  public async send({ request, response }: HttpContext) {
    const email = await request.validateUsing(passwordResetSendValidator)

    if (!email) {
      return response.badRequest({ message: 'Email is required' })
    }

    await TrySendPasswordResetEmail.handle(email)

    return response.ok({
      message: 'Password reset email has been sent. Please check your inbox.',
    })
  }

  /**
   * Vérifie la validité du token envoyé dans l'URL
   */
  public async verify({ request, response }: HttpContext) {
    const encryptedValue = request.input('value')

    if (!encryptedValue) {
      return response.badRequest({ message: 'Reset token is required' })
    }

    const { isValid, user } = await VerifyPasswordResetToken.handle({
      encryptedValue,
    })

    if (!isValid) {
      return response.unauthorized({
        message: 'Invalid or expired reset token',
        code: 'E_INVALID_TOKEN',
      })
    }

    return response.ok({
      message: 'Reset token is valid',
      email: user?.email,
    })
  }

  /**
   * Réinitialise le mot de passe de l'utilisateur
   */
  public async update({ request, response }: HttpContext) {
    // Validation des données entrantes
    const payload = await request.validateUsing(passwordResetValidator)

    // Réinitialisation du mot de passe
    const user = await ResetPassword.handle({ data: payload })

    if (!user) {
      return response.notFound({
        message: 'User not found or reset token is invalid',
        code: 'E_USER_NOT_FOUND',
      })
    }

    return response.ok({
      message: 'Your password has been successfully reset.',
    })
  }
}
