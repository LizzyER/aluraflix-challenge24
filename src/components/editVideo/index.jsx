import React, { useState } from 'react';
import './index.css';

function EditForm({ video, onSave }) {
  const [formData, setFormData] = useState({
    title: video.title,
    category: video.category,
    description: video.description,
    videoUrl: video.videoUrl,
    image: video.image,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      category: 'frontend',
      description: '',
      videoUrl: '',
      image: '',
    });
    window.location.reload();
  };

  return (
    <form className='form-editVideo' onSubmit={handleSubmit}>
      <h2>Editar Video</h2>
      <p>Título:</p>
      <input type="text" name="title" value={formData.title} onChange={handleChange} />

      <p>Categoria:</p>
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="mobile">Mobile</option>
      </select>

      <p>URL da Imagem:</p>
      <input type="text" name="image" value={formData.image} onChange={handleChange} />
      
      <p>URL do Vídeo:</p>
      <input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleChange} />

      <p>Descrição:</p>
      <textarea name="description" value={formData.description} onChange={handleChange} />

      <button type="submit">Salvar</button>
      <button type="button" onClick={handleCancel}>Cancelar</button>
    </form>
  );
}

export default EditForm;
