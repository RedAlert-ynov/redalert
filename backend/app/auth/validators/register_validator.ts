import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(4).maxLength(25),
    email: vine
      .string()
      .trim()
      .maxLength(255)
      .email()
      .normalizeEmail()
      .unique({ table: 'users', column: 'email' }),
    password: vine.string().minLength(8).confirmed(),
  })
)
