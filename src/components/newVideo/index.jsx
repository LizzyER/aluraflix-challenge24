import React, { useState } from 'react';
import './index.css';

const AddVideoForm = () => {
  const initialFormState = {
    title: '',
    category: 'frontend',
    imageUrl: '',
    videoUrl: '',
    description: ''
  };

  const [title, setTitle] = useState(initialFormState.title);
  const [category, setCategory] = useState(initialFormState.category);
  const [imageUrl, setImageUrl] = useState(initialFormState.imageUrl);
  const [videoUrl, setVideoUrl] = useState(initialFormState.videoUrl);
  const [description, setDescription] = useState(initialFormState.description);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newVideo = {
      title,
      category,
      image: imageUrl,
      video: videoUrl,
      description
    };

    try {
      const response = await fetch('http://localhost:5000/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVideo),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar vídeo');
      }
      clearFormFields();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao adicionar vídeo:', error);
    }
  };

  const clearFormFields = () => {
    setTitle(initialFormState.title);
    setCategory(initialFormState.category);
    setImageUrl(initialFormState.imageUrl);
    setVideoUrl(initialFormState.videoUrl);
    setDescription(initialFormState.description);
  };

  return (
    <form className='form-newVideo' onSubmit={handleSubmit}>
      <h2>Novo Vídeo</h2>
      <p>Título:</p>
      <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
 
      <p>Categoria:</p>
      <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="mobile">Mobile</option>
      </select>

      <p>URL da Imagem:</p>
      <input type="url" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />

      <p>URL do Vídeo:</p>
      <input type="url" id="videoUrl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required />

      <p>Descrição:</p>
      <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

      <button type="submit">Adicionar</button>
      <button type="button" onClick={clearFormFields}>Limpar</button>
    </form>
  );
};

export default AddVideoForm;
