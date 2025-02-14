import vine from '@vinejs/vine'

export const createArticleValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255),
    imageUrl: vine.string().url().optional(),
    sections: vine
      .array(
        vine.object({
          title: vine.string().trim().minLength(1).maxLength(255),
          body: vine.string().trim().minLength(10),
        })
      )
      .minLength(1),
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
