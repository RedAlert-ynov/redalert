# 📝 Documentation API

## 🚀 Routes Principales

---

## Inscription d'un utilisateur

### **POST** `/auth/register`

### 📖 Description
Permet à un utilisateur de s'inscrire en fournissant :
- Un **nom d'utilisateur**
- Une **adresse email**
- Un **mot de passe**

**Authentification** : Non requise 🔓

### 📩 Paramètres de la requête

#### **Body (JSON)** :
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "password_confirmation": "string"
}
```

### ⚠️ Contraintes

- **username** :
  - Doit être une chaîne de caractères.
  - Longueur minimale : **4 caractères**.
  - Longueur maximale : **25 caractères**.
- **email** :
  - Doit être une **adresse email valide**.
  - Longueur maximale : **255 caractères**.
  - Doit être **unique** (aucun autre utilisateur ne peut avoir cet email).
- **password** :
  - Doit contenir au moins **8 caractères**.
  - Doit être confirmé avec `password_confirmation` (les deux doivent correspondre).

### ✅ Réponse

#### **Succès (201 Created)** :
```json
{
  "message": "User successfully registered",
  "user": {
    "username": "test1",
    "email": "test1@gmail.com",
    "createdAt": "2025-01-22T08:12:40.050+00:00",
    "updatedAt": "2025-01-22T08:12:40.050+00:00",
    "id": 4
  }
}
```

---

## Connexion d'un utilisateur

### **POST** `/auth/login`

### 📖 Description
Permet à un utilisateur existant de se connecter en fournissant :
- Une **adresse email**
- Un **mot de passe**

**Authentification** : Non requise 🔒

### 📩 Paramètres de la requête

#### **Body (JSON)** :
```json
{
  "email": "string",
  "password": "string"
}
```

### ⚠️ Contraintes

- **email** :
  - Doit être une **adresse email valide**.
  - Longueur maximale : **255 caractères**.
- **password** :
  - Doit contenir au moins **8 caractères**.

### ✅ Réponse

#### **Succès (200 OK)** :
```json
{
  "message": "Login successful",
  "token": {
    "accessToken": "string",
    "refreshToken": "string"
  }
}
```

---

## Déconnexion d'un utilisateur

### **POST** `/auth/logout`

### 📖 Description
Permet à un utilisateur de se déconnecter en invalidant son **jeton d'accès** et son **jeton de rafraîchissement**.

**Authentification** : Requise 🔒

### 📩 Paramètres de la requête
- Aucun paramètre spécifique dans le **Body**.

#### **Headers requis** :
- **Authorization** : `Bearer <accessToken>` (jeton d'accès valide).

### ✅ Réponse

#### **Succès (200 OK)** :
```json
{
  "message": "Logout successful"
}
```

---

## Rafraîchissement de jeton d'accès

### **POST** `/auth/refresh`

### 📖 Description
Permet de renouveler un **jeton d'accès** expiré en utilisant un **jeton de rafraîchissement** valide.

**Authentification** : Requise 🔒

### 📩 Paramètres de la requête

#### **Body (JSON)** :
```json
{
  "refreshToken": "string"
}
```

### ⚠️ Contraintes
- **refreshToken** :
  - Doit être fourni dans le corps de la requête.
  - Doit correspondre à un jeton valide et non expiré.

### ✅ Réponse

#### **Succès (200 OK)** :
```json
{
  "message": "Access token refreshed successfully",
  "accessToken": "string"
}
```

---

## Mise à jour d'un utilisateur

### **PUT** `/auth/update`

### 📖 Description
Permet à un utilisateur authentifié de mettre à jour ses informations personnelles telles que :
- **Nom d'utilisateur**
- **Adresse email**
- **Mot de passe**

**Authentification** : Requise 🔒

### 📩 Paramètres de la requête

#### **Body (JSON)** :
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "password_confirmation": "string"
}
```

### ⚠️ Contraintes

- **username** :
  - Doit être une chaîne de caractères.
  - Longueur minimale : **4 caractères**.
  - Longueur maximale : **25 caractères**.
- **email** :
  - Doit être une **adresse email valide**.
  - Longueur maximale : **255 caractères**.
  - Doit être **unique** (aucun autre utilisateur ne peut avoir cet email).
- **password** :
  - Doit contenir au moins **8 caractères**.
  - Doit être confirmé avec `password_confirmation` (les deux doivent correspondre).

### ✅ Réponse

#### **Succès (200 OK)** :
```json
{
  "message": "User updated successfully",
  "user": {
    "username": "updated_username",
    "email": "updated_email@gmail.com",
    "updatedAt": "2025-01-22T08:30:00.000+00:00"
  }
}
```

---

## Suppression d'un utilisateur

### **DELETE** `/auth/delete`

### 📖 Description
Permet à un utilisateur authentifié de supprimer son compte utilisateur. Cette action est irréversible.

**Authentification** : Requise 🔒

### 📩 Paramètres de la requête
- Aucun paramètre spécifique dans le **Body**.

#### **Headers requis** :
- **Authorization** : `Bearer <accessToken>` (jeton d'accès valide).

### ✅ Réponse

#### **Succès (200 OK)** :
```json
{
  "message": "User deleted successfully"
}
```

---

## Réinitialisation du mot de passe

### **POST** `/auth/forgot-password`

### 📖 Description
Permet à un utilisateur de demander une réinitialisation de son mot de passe. Un email contenant un lien ou un code de réinitialisation sera envoyé à l'adresse fournie.

**Authentification** : Non requise

### 📩 Paramètres de la requête

#### **Body (JSON)** :
```json
{
  "email": "string"
}
```

### ⚠️ Contraintes

- **email** :
  - Doit être une **adresse email valide**.
  - L'email doit correspondre à un compte existant dans la base de données.

### ✅ Réponse

#### **Succès (200 OK)** :
```json
{
  "message": "Password reset email sent successfully"
}
```

---

## Routes associées à la gestion du mot de passe oublié

### 1️⃣ **Vérification du token de réinitialisation**

#### **POST** `/auth/forgot-password/verify`

#### **Description**
Permet de vérifier si un token de réinitialisation de mot de passe est valide.

**Authentification** : Non requise

#### **Paramètres de la requête**

##### **Body (JSON)** :
```json
{
  "value": "string"
}
```

#### **Réponse**

##### **Succès (200 OK)** :
```json
{
  "message": "Reset token is valid",
  "email": "user@example.com"
}
```

##### **Erreurs possibles**

###### **400 Bad Request** :
```json
{
  "message": "Reset token is required"
}
```
###### **401 Unauthorized** :
```json
{
  "message": "Invalid or expired reset token",
  "code": "E_INVALID_TOKEN"
}
```

---

### 2️⃣ **Réinitialisation du mot de passe**

#### **POST** `/auth/forgot-password/reset`

#### **Description**
Permet de réinitialiser le mot de passe d'un utilisateur en fournissant un nouveau mot de passe et un token valide.

**Authentification** : Non requise

#### **Paramètres de la requête**

##### **Body (JSON)** :
```json
{
  "password": "string",
  "password_confirmation": "string",
}
```

# Articles

## 🚀 Routes pour les Articles

### 📰 Liste des Articles
#### **GET** `/articles`

### 📖 Description
Permet de récupérer la liste complète des articles publiés.

**Authentification** : Non requise

---

### 📩 Paramètres de la requête
- Aucun paramètre requis.

---

### ✅ Réponse
#### **Succès (200 OK)** :
```json
{
  "data": [
    {
      "id": 1,
      "userId": 5,
      "title": "Introduction à l'API",
      "slug": "introduction-a-l-api",
      "imageUrl": "https://example.com/image1.jpg",
      "sections": [
        {
          "title": "Section 1",
          "body": "Contenu de la section 1."
        },
        {
          "title": "Section 2",
          "body": "Contenu de la section 2."
        }
      ],
      "actionButtons": [
        {
          "title": "Lire la suite",
          "link": "https://example.com/read-more"
        }
      ],
      "createdAt": "2025-01-20T08:00:00.000+00:00",
      "updatedAt": "2025-01-21T08:00:00.000+00:00",
      "user": {
        "id": 5,
        "username": "auteur123",
        "email": "auteur123@example.com",
        "role": 1,
        "createdAt": "2025-01-19T10:00:00.000+00:00",
        "updatedAt": "2025-01-19T10:00:00.000+00:00"
      }
    },
    {
      "id": 2,
      "userId": 6,
      "title": "Tutoriel API",
      "slug": "tutoriel-api",
      "imageUrl": "https://example.com/image2.jpg",
      "sections": [
        {
          "title": "Débuter",
          "body": "Comment commencer à utiliser l'API."
        }
      ],
      "actionButtons": [],
      "createdAt": "2025-01-21T09:00:00.000+00:00",
      "updatedAt": "2025-01-21T09:00:00.000+00:00",
      "user": {
        "id": 6,
        "username": "dev_api",
        "email": "dev_api@example.com",
        "role": 2,
        "createdAt": "2025-01-20T11:00:00.000+00:00",
        "updatedAt": "2025-01-20T11:00:00.000+00:00"
      }
    }
  ]
}
```

### 🖍️ **Détails de la réponse** :
- `data` : Contient une liste d'articles.
  - **id** : Identifiant unique de l'article.
  - **userId** : Identifiant de l'utilisateur ayant créé l'article.
  - **title** : Titre de l'article.
  - **slug** : Slug unique pour l'URL de l'article.
  - **imageUrl** : URL de l'image associée à l'article.
  - **sections** : Liste des sections de l'article :
    - **title** : Titre de la section.
    - **body** : Contenu de la section.
  - **actionButtons** : Liste des boutons d'action associée à l'article :
    - **title** : Titre du bouton.
    - **link** : Lien associé au bouton.
  - **createdAt** : Date et heure de création de l'article.
  - **updatedAt** : Date et heure de la dernière mise à jour de l'article.
  - **user** : Informations sur l'utilisateur ayant créé l'article :
    - **id** : Identifiant unique de l'utilisateur.
    - **username** : Nom d'utilisateur.
    - **email** : Adresse email de l'utilisateur.
    - **role** : Rôle de l'utilisateur.
    - **createdAt** : Date et heure de création de l'utilisateur.
    - **updatedAt** : Date et heure de la dernière mise à jour de l'utilisateur.


### 🌟 **Notes**
- Cette route retourne tous les articles avec leurs sections et actions associées.
- Les informations sur l'utilisateur créateur de chaque article sont également incluses.

### 📰 Afficher un Article spécifique
#### **GET** `/articles/:slug`

### 📖 Description
Permet de récupérer un article spécifique en utilisant son `slug` unique.

**Authentification** : Non requise

---

### 📩 Paramètres de la requête
- **Path Parameters** :
  - **slug** : Le `slug` unique de l'article à récupérer.

---

### ✅ Réponse
#### **Succès (200 OK)** :
```json
{
  "data": {
    "id": 1,
    "userId": 5,
    "title": "Introduction à l'API",
    "slug": "introduction-a-l-api",
    "imageUrl": "https://example.com/image1.jpg",
    "sections": [
      {
        "title": "Section 1",
        "body": "Contenu de la section 1."
      },
      {
        "title": "Section 2",
        "body": "Contenu de la section 2."
      }
    ],
    "actionButtons": [
      {
        "title": "Lire la suite",
        "link": "https://example.com/read-more"
      }
    ],
    "createdAt": "2025-01-20T08:00:00.000+00:00",
    "updatedAt": "2025-01-21T08:00:00.000+00:00",
    "user": {
      "id": 5,
      "username": "auteur123",
      "email": "auteur123@example.com",
      "role": 1,
      "createdAt": "2025-01-19T10:00:00.000+00:00",
      "updatedAt": "2025-01-19T10:00:00.000+00:00"
    }
  }
}
```

### 🖍️ **Détails de la réponse** :
- `data` : Contient les détails de l'article sélectionné.
  - Voir les champs détaillés dans la route **Liste des Articles**.

---

### ❌ **Erreurs possibles**
#### **404 Not Found** :
```json
{
  "message": "Article not found."
}
```
- Le `slug` fourni ne correspond à aucun article.

---

### 🌟 **Notes**
- Cette route est utile pour afficher les détails complets d'un article spécifique.


# Routes Admin

## 🚀 Routes Admin pour les Articles

### 📰 Créer un Article
#### **POST** `/admin/articles`

### 🔑 Description
Permet aux administrateurs de créer un nouvel article.

**Authentification** : Requise 🔐

---

### 📩 Paramètres de la requête
#### **Body (JSON)** :
```json
{
  "title": "string",
  "imageUrl": "string",
  "sections": [
    {
      "title": "string",
      "body": "string"
    }
  ],
  "actionButtons": [
    {
      "title": "string",
      "link": "string"
    }
  ]
}
```

---

### ⚠️ Contraintes
- **title** :
  - Obligatoire
  - Chaîne de caractères
  - Longueur maximale : **255 caractères**

- **imageUrl** :
  - Facultatif
  - URL valide

- **sections** :
  - Obligatoire
  - Tableau d’objets contenant :
    - **title** : Titre de la section (obligatoire).
    - **body** : Contenu de la section (obligatoire).

- **actionButtons** :
  - Facultatif
  - Tableau d’objets contenant :
    - **title** : Titre du bouton (obligatoire).
    - **link** : Lien associé au bouton (obligatoire).

---

### ✅ Réponse
#### **Succès (201 Created)** :
```json
{
  "message": "Article created successfully",
  "article": {
    "id": 1,
    "title": "Nouveau Titre",
    "slug": "nouveau-titre",
    "imageUrl": "https://example.com/image.jpg",
    "sections": [
      {
        "title": "Section 1",
        "body": "Contenu de la section 1."
      }
    ],
    "actionButtons": [],
    "createdAt": "2025-01-22T08:00:00.000+00:00",
    "updatedAt": "2025-01-22T08:00:00.000+00:00"
  }
}
```

### 🌟 **Notes**
- Seuls les administrateurs peuvent accéder à cette route.
- Un slug unique est automatiquement généré pour chaque article.

### 📲 Mettre à jour un Article
#### **PUT** `/admin/articles/:id`

### 🔑 Description
Permet aux administrateurs de modifier un article existant.

**Authentification** : Requise 🔐

### 📩 Paramètres de la requête
#### **Path Parameters** :
- **id** : Identifiant unique de l'article à mettre à jour.

#### **Body (JSON)** :
```json
{
  "title": "string",
  "imageUrl": "string",
  "sections": [
    {
      "title": "string",
      "body": "string"
    }
  ],
  "actionButtons": [
    {
      "title": "string",
      "link": "string"
    }
  ]
}
```


### ✅ Réponse
#### **Succès (200 OK)** :
```json
{
  "message": "Article updated successfully",
  "article": {
    "id": 1,
    "title": "Titre mis à jour",
    "slug": "titre-mis-a-jour",
    "imageUrl": "https://example.com/image.jpg",
    "sections": [
      {
        "title": "Section mise à jour",
        "body": "Nouveau contenu de la section."
      }
    ],
    "actionButtons": [],
    "createdAt": "2025-01-22T08:00:00.000+00:00",
    "updatedAt": "2025-01-22T08:30:00.000+00:00"
  }
}
```

---

### ❌ **Erreurs possibles**
#### **404 Not Found** :
```json
{
  "message": "Article not found."
}
```
- Aucun article n’a été trouvé avec l’identifiant fourni.

---

### 🌟 **Notes**
- Seuls les champs nécessitant une mise à jour doivent être inclus dans le **Body**.

---

### 🔒 Supprimer un Article
#### **DELETE** `/admin/articles/:id`

### 🔑 Description
Permet aux administrateurs de supprimer un article existant.

**Authentification** : Requise 🔐

---

### 📩 Paramètres de la requête
#### **Path Parameters** :
- **id** : Identifiant unique de l'article à supprimer.

---

### ✅ Réponse
#### **Succès (200 OK)** :
```json
{
  "message": "Article deleted successfully."
}
```

---

### ❌ **Erreurs possibles**
#### **404 Not Found** :
```json
{
  "message": "Article not found."
}
```
- Aucun article n’a été trouvé avec l’identifiant fourni.

## 🚀 Routes Admin pour les Utilisateurs

### 🔎 Lister les Utilisateurs
#### **GET** `/admin/users`

### 🔑 Description
Permet aux administrateurs de visualiser la liste des utilisateurs inscrits.

**Authentification** : Requise 🔐

---

### ✅ Réponse
#### **Succès (200 OK)** :
```json
{
  "data": [
    {
      "id": 1,
      "username": "utilisateur1",
      "email": "utilisateur1@example.com",
      "role": 1,
      "createdAt": "2025-01-20T10:00:00.000+00:00",
      "updatedAt": "2025-01-21T10:00:00.000+00:00"
    },
    {
      "id": 2,
      "username": "utilisateur2",
      "email": "utilisateur2@example.com",
      "role": 2,
      "createdAt": "2025-01-20T11:00:00.000+00:00",
      "updatedAt": "2025-01-21T11:00:00.000+00:00"
    }
  ]
}
```

---

### 📲 Mettre à jour un Utilisateur
#### **PUT** `/admin/users/:id`

### 🔑 Description
Permet aux administrateurs de modifier les informations d’un utilisateur existant.

**Authentification** : Requise 🔐

---

### 📩 Paramètres de la requête
#### **Path Parameters** :
- **id** : Identifiant unique de l'utilisateur à mettre à jour.

#### **Body (JSON)** :
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "password_confirmation": "string",
  "role": 1
}
```

---

### ✅ Réponse
#### **Succès (200 OK)** :
```json
{
  "message": "User updated successfully",
  "user": {
    "id": 1,
    "username": "utilisateur_mis_a_jour",
    "email": "updated_email@example.com",
    "role": 1,
    "createdAt": "2025-01-20T10:00:00.000+00:00",
    "updatedAt": "2025-01-22T10:30:00.000+00:00"
  }
}
```

---

### ❌ **Erreurs possibles**
#### **404 Not Found** :
```json
{
  "message": "User not found."
}
```
- Aucun utilisateur n’a été trouvé avec l’identifiant fourni.

---

### 🌟 **Notes**
- Tous les champs du **Body** sont optionnels. Fournissez uniquement les informations à mettre à jour.
- L'authentification avec un jeton administrateur valide est obligatoire.

---

### 🔒 Supprimer un Utilisateur
#### **DELETE** `/admin/users/:id`

### 🔑 Description
Permet aux administrateurs de supprimer un utilisateur existant.

**Authentification** : Requise 🔐

---

### 📩 Paramètres de la requête
#### **Path Parameters** :
- **id** : Identifiant unique de l'utilisateur à supprimer.

---

### ✅ Réponse
#### **Succès (200 OK)** :
```json
{
  "message": "User deleted successfully."
}
```

---

### ❌ **Erreurs possibles**
#### **404 Not Found** :
```json
{
  "message": "User not found."
}
```
- Aucun utilisateur n’a été trouvé avec l’identifiant fourni.

---

### 🌟 **Notes**
- Cette action est irréversible.
- Les utilisateurs supprimés ne pourront pas être restaurés.








