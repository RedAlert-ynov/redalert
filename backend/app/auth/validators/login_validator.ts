import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().maxLength(255).email().normalizeEmail(),
    password: vine.string().minLength(8),
  })
)
