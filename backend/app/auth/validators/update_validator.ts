import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(4).maxLength(25).optional(),
    email: vine
      .string()
      .trim()
      .maxLength(255)
      .email()
      .normalizeEmail()
      .unique({ table: 'users', column: 'email' })
      .optional(),
    password: vine.string().minLength(8).confirmed().optional(),
  })
)
