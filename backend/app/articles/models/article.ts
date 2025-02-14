import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeSave } from '@adonisjs/lucid/orm'
import User from '#auth/models/user'
import string from '@adonisjs/core/helpers/string'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

type ArticleSection = {
  title: string
  body: string
}

type ActionButton = {
  title: string
  link: string
}

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare imageUrl: string

  @column({
    prepare: (value: ArticleSection[]) => JSON.stringify(value),
    consume: (value: string | ArticleSection[] | null) =>
      typeof value === 'string' ? JSON.parse(value) : value || [],
  })
  declare sections: ArticleSection[]

  @column({
    prepare: (value: ActionButton[]) => JSON.stringify(value),
    consume: (value: string | ActionButton[] | null) =>
      typeof value === 'string' ? JSON.parse(value) : value || [],
  })
  declare actionButtons: ActionButton[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @beforeSave()
  public static async generateSlug(article: Article) {
    if (article.$dirty.title) {
      const baseSlug = string.slug(article.title)
      let slug = baseSlug

      const existingSlug = await Article.query().where('slug', slug).first()
      if (existingSlug) {
        slug = `${baseSlug}-${Date.now()}`
      }

      article.slug = slug
    }
  }
}
