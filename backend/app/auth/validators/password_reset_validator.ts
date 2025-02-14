import vine from '@vinejs/vine'

export const passwordResetSendValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
  })
)

export const passwordResetValidator = vine.compile(
  vine.object({
    value: vine.string(),
    password: vine.string().minLength(8),
  })
)
