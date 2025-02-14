import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import PasswordResetToken from '#auth/models/password_reset_token'
import EmailHistory from '#auth/models/email_history'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { AccessToken } from '@adonisjs/auth/access_tokens'
import Article from '#articles/models/article'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  // Gestion des tokens d'accès
  static accessTokens = DbAccessTokensProvider.forModel(User)

  // Ajout de la propriété currentAccessToken
  declare currentAccessToken?: AccessToken

  @hasMany(() => EmailHistory)
  declare emailHistories: HasMany<typeof EmailHistory>

  @hasMany(() => PasswordResetToken)
  declare passwordResetTokens: HasMany<typeof PasswordResetToken>

  @hasMany(() => Article)
  declare articles: HasMany<typeof Article>
}
