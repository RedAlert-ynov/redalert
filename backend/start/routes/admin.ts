import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const DeleteUserController = () => import('#admin/users/controllers/delete_user_controller')
const UpdateUserController = () => import('#admin/users/controllers/update_user_controller')
const ListUsersController = () => import('#admin/users/controllers/list_users_controller')
const ShowUserController = () => import('#admin/users/controllers/show_user_controller')

const DeleteArticleController = () =>
  import('#admin/articles/controllers/delete_article_controller')
const UpdateArticleController = () =>
  import('#admin/articles/controllers/update_article_controller')
const CreateArticleController = () =>
  import('#admin/articles/controllers/create_article_controller')

// **Routes Admin**
router
  .group(() => {
    // **Articles**

    router.post('/articles', [CreateArticleController, 'store']).as('admin.articles.create')
    router.put('/articles/:id', [UpdateArticleController, 'update']).as('admin.articles.update')
    router.delete('/articles/:id', [DeleteArticleController, 'destroy']).as('admin.articles.delete')

    // **Users**
    router.get('/users', [ListUsersController, 'index']).as('admin.users.index')
    router.get('/users/:id', [ShowUserController, 'show']).as('admin.users.show')
    router.put('/users/:id', [UpdateUserController, 'update']).as('admin.users.update')
    router.delete('/users/:id', [DeleteUserController, 'destroy']).as('admin.users.destroy')
  })
  .prefix('/admin')
  .use([middleware.auth(), middleware.admin()])
