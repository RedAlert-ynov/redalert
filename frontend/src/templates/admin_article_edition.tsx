import React, { useEffect, useState } from 'react';
import Header from './header';
import '../assets/sass/new_article.scss';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams, Navigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { ADMIN_ROLE } from '../common';
import Unauthorized from './unauthorized';
import { useArticle } from '../api/articles/articles';
import { useUpdateArticle } from '../api/admin/articles/articles';
import { Article, Section } from '../api/articles/articles.types';
import { ArticleUpdatePayload } from '../api/admin/articles/articles.types';

interface Chapter {
  id: number;
  title: string;
  body: string;
}

const AdminArticleEdition: React.FC = () => {
  const { slug = '' } = useParams();
  const articleQuery = useArticle(slug);
  const updateArticle = useUpdateArticle();

  const isUserLoggedIn = useStore((state) => state.isLoggedIn);
  const isAdmin = useStore((state) => state.role) === ADMIN_ROLE;

  const [articleId, setArticleId] = useState<number | null>(null);
  const [articleTitle, setArticleTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [initialData, setInitialData] = useState<Article | null>(null);

  useEffect(() => {
    if (articleQuery.isSuccess) {
      const data = articleQuery.data;
      setArticleId(data.id);
      setArticleTitle(data.title);
      setImageUrl(data.imageUrl || '');
      setChapters(
        data.sections.map((section: Section, index: number) => ({
          id: Date.now() + index,
          title: section.title,
          body: section.body,
        }))
      );
      setInitialData(data);
    }
  }, [articleQuery.isSuccess, articleQuery.data]);

  if (!isUserLoggedIn) return <Navigate replace to="/login" />;
  if (!isAdmin) return <Unauthorized />;
  if (updateArticle.isSuccess) return <Navigate to={`/article/${slug}`} />;

  const createChapter = () => {
    const newChapter: Chapter = {
      id: Date.now(),
      title: '',
      body: '',
    };
    setChapters([...chapters, newChapter]);
  };

  const updateChapter = (id: number, field: keyof Chapter, value: string) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === id ? { ...chapter, [field]: value } : chapter
      )
    );
  };

  const removeChapter = (id: number) => {
    setChapters(chapters.filter((chapter) => chapter.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initialData || articleId === null) return;

    const updatedFields: ArticleUpdatePayload = {};

    if (articleTitle !== initialData.title) {
      updatedFields.title = articleTitle;
    }

    if (imageUrl !== initialData.imageUrl) {
      updatedFields.imageUrl = imageUrl;
    }

    const newSections = chapters.map((c) => ({ title: c.title, body: c.body }));
    const initialSections = initialData.sections;

    if (JSON.stringify(newSections) !== JSON.stringify(initialSections)) {
      updatedFields.sections = newSections;
    }

    if (Object.keys(updatedFields).length > 0) {
      updateArticle.mutate({ articleId, articleData: updatedFields });
    }
  };

  return (
    <div>
      <Header />
      <section className='new_article'>
        <form onSubmit={handleSubmit}>
          <h1>Modifier l'article :</h1>
          <TextField
            label='Titre article'
            variant='outlined'
            size='small'
            required
            fullWidth
            margin='dense'
            sx={{ mb: 2 }}
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
          <TextField
            label='Lien image'
            variant='outlined'
            size='small'
            fullWidth
            margin='dense'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Button
            variant='contained'
            size='large'
            onClick={createChapter}
            startIcon={<AddIcon />}
            sx={{ mb: 2, mt: 2 }}
          >
            Nouveau chapitre
          </Button>
          <div className='chapters'>
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '16px',
                  marginBottom: '16px',
                  position: 'relative',
                }}
              >
                <Button
                  variant='contained'
                  color='error'
                  size='small'
                  onClick={() => removeChapter(chapter.id)}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '8px',
                    zIndex: '10',
                  }}
                  startIcon={<DeleteIcon />}
                >
                  Supprimer
                </Button>
                <TextField
                  label='Titre chapitre'
                  variant='outlined'
                  size='small'
                  required
                  fullWidth
                  margin='dense'
                  value={chapter.title}
                  onChange={(e) =>
                    updateChapter(chapter.id, 'title', e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  label='Contenu chapitre'
                  variant='outlined'
                  size='small'
                  required
                  fullWidth
                  multiline
                  rows={4}
                  margin='dense'
                  value={chapter.body}
                  onChange={(e) =>
                    updateChapter(chapter.id, 'body', e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            fullWidth
            sx={{ mt: 2 }}
          >
            Enregistrer les modifications
          </Button>
        </form>
      </section>
    </div>
  );
};

export default AdminArticleEdition;
