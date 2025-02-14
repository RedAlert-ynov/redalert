import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { throttle } from '#start/limiter'

const UpdateController = () => import('#auth/controllers/update_controller')
const DeleteController = () => import('#auth/controllers/delete_controller')
const LogoutController = () => import('#auth/controllers/logout_controller')
const RefreshTokenController = () => import('#auth/controllers/refresh_token_controller')
const LoginController = () => import('#auth/controllers/login_controller')
const RegisterController = () => import('#auth/controllers/register_controller')
const ForgotPasswordController = () => import('#auth/controllers/forgot_password_controller')

const ListArticlesController = () => import('#articles/controllers/list_articles_controller')
const ShowArticleController = () => import('#articles/controllers/show_article_controller')

// **Routes pour l'authentification**
router
  .group(() => {
    router.post('/register', [RegisterController, 'store'])
    router.post('/login', [LoginController, 'store']).use(throttle)
    router.post('/refresh', [RefreshTokenController, 'refresh'])
    router.post('/logout', [LogoutController, 'store']).use(middleware.auth())
    router.delete('/delete', [DeleteController, 'destroy']).use(middleware.auth())
    router.put('/update', [UpdateController, 'update']).use(middleware.auth())
  })
  .prefix('auth')

// **Routes pour la récupération de mot de passe**
router
  .group(() => {
    router.post('/', [ForgotPasswordController, 'send']).as('forgot_password.send')
    router.post('/verify', [ForgotPasswordController, 'verify']).as('forgot_password.verify')
    router.post('/reset', [ForgotPasswordController, 'update']).as('forgot_password.reset')
  })
  .prefix('/auth/forgot-password')

// **Routes pour les articles accessibles par tous les utilisateurs**
router.group(() => {
  router.get('/articles', [ListArticlesController, 'index']).as('articles.index')
  router.get('/articles/:slug', [ShowArticleController, 'show']).as('articles.show')
})
