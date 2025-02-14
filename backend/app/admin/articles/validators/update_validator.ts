import vine from '@vinejs/vine'

export const updateArticleValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255).optional(),
    imageUrl: vine.string().url().optional(),
    sections: vine
      .array(
        vine.object({
          title: vine.string().trim().minLength(1).maxLength(255),
          body: vine.string().trim().minLength(10),
        })
      )
      .optional(),
    actionButtons: vine
      .array(
        vine.object({
          title: vine.string().trim().minLength(1).maxLength(255),
          link: vine.string().url(),
        })
      )
      .optional(),
  })
)
