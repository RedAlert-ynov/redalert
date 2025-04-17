import React, { useState } from 'react';
import Header from './header';
import '../assets/sass/new_article.scss';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreateArticle } from '../api/admin/articles/articles';



interface Chapter {
  id: number;
  title: string;
  body: string;
}

const shouldBeSubmittable = (articleTitle: string, chapters: Chapter[]) => {
  const isArticleTitleLongEnough = articleTitle.length > 2
  const areChaptersTitlesLongEnough = chapters.every((chapter) => chapter.title.length > 0)
  const areChaptersBodiesLongEnough = chapters.every((chapter) => chapter.body.length > 9)
  return !(isArticleTitleLongEnough && chapters.length > 0 && areChaptersTitlesLongEnough && areChaptersBodiesLongEnough)
}

const NewArticle: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [articleTitle, setArticleTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('')

  const {mutate: createArticle} = useCreateArticle()
  
  const createChapter = () => {
    const newChapter: Chapter = {
      id: Date.now(), // Using timestamp as unique ID
      title: '',
      body: ''
    };
    setChapters([...chapters, newChapter]);
  };

  const updateChapter = (id: number, field: keyof Chapter, value: string) => {
    setChapters(chapters.map(chapter => 
      chapter.id === id ? { ...chapter, [field]: value } : chapter
    ));
  };

  const removeChapter = (id: number) => {
    setChapters(chapters.filter(chapter => chapter.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const articleData = {
      title: articleTitle,
      imageUrl: imageUrl,
      sections: chapters.map((chapter) => ({title: chapter.title, body: chapter.body})),
    };
    console.log('Submitting:', articleData);
    createArticle(articleData)
  };

  return (
    <div>
      <Header/>
      <section className='new_article'>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h1>Créer un article :</h1>
          <TextField 
            id="title" 
            label="Titre article" 
            variant="outlined" 
            size='small' 
            required 
            margin="dense"
            fullWidth
            sx={{ mb: 2 }}
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
          
          <TextField
            label="lien photo" 
            size='small' 
            margin="dense"
            fullWidth
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <br></br>
          <Button 
            variant='contained' 
            size='large'
            onClick={createChapter}
            startIcon={<AddIcon/> }
            sx={{ mb: 2 }}
          >
            nouveau chapitre
          </Button>
          
          <div className='chapters'>
            {chapters.map((chapter) => (
              <div key={chapter.id} style={{ 
                border: '1px solid #ddd', 
                borderRadius: '4px', 
                padding: '16px', 
                marginBottom: '16px',
                position: 'relative'
              }}>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  size="small"
                  onClick={() => removeChapter(chapter.id)}
                  style={{ position: 'absolute', right: '8px', top: '8px',zIndex:'10' }}
                >
                  Remove
                </Button>
                
                <TextField 
                  label="Titre chaptitre" 
                  variant="outlined" 
                  size='small' 
                  required 
                  margin="dense"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={chapter.title}
                  onChange={(e) => updateChapter(chapter.id, 'title', e.target.value)}
                />
                
                <TextField
                  label="Contenu chapitre"
                  variant="outlined"
                  size='small'
                  required
                  margin="dense"
                  multiline
                  rows={4}
                  fullWidth
                  value={chapter.body}
                  onChange={(e) => updateChapter(chapter.id, 'body', e.target.value)}
                />
              </div>
            ))}
          </div>
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            size='large'
            fullWidth
            sx={{ mt: 2 }}
            disabled={shouldBeSubmittable(articleTitle, chapters)}
          >
            Submit
          </Button>
          <br></br>
        </form>
      </section>
    </div>
  );
};

export default NewArticle;