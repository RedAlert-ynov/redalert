import { BaseSchema } from '@adonisjs/lucid/schema'
import { UserRole } from '#auth/enums/user_role'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('username').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table
        .integer('role')
        .notNullable()
        .defaultTo(UserRole.User)
        .checkIn(Object.values(UserRole).map(String))

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
