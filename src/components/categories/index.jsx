import React, { useEffect, useState } from 'react';
import EditForm from '../editVideo/index';
import edit from '../../img/edit.png';
import delet from '../../img/delet.png';
import './index.css';

function Category() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); 
  const [editing, setEditing] = useState(false); 

  useEffect(() => {
    fetch('http://localhost:5000/videos')
      .then(response => response.json())
      .then(data => {
        setVideos(data); 
        const firstFrontendVideo = data.find(video => video.category === 'frontend');
        if (firstFrontendVideo) {
          setSelectedVideo(firstFrontendVideo);
        }
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  }, []);

  const handleDelete = (id) => {
    console.log(`Deleting video with ID: ${id}`);
    fetch(`http://localhost:5000/videos/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setVideos(videos.filter(video => video.id !== id));
          if (selectedVideo && selectedVideo.id === id) {
            setSelectedVideo(null);
          }
        } else {
          console.error('Failed to delete video');
        }
      })
      .catch(error => {
        console.error('Error deleting video:', error);
      });
  };

  const handleEdit = (id) => {
    const videoToEdit = videos.find(video => video.id === id);
    setSelectedVideo(videoToEdit);
    setEditing(true);
  };

  const handleSaveEdit = (updatedData) => {
    fetch(`http://localhost:5000/videos/${selectedVideo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => {
        if (response.ok) {
          const updatedVideos = videos.map(video =>
            video.id === selectedVideo.id ? { ...video, ...updatedData } : video
          );
          setVideos(updatedVideos);
          setEditing(false);
        } else {
          console.error('Failed to update video');
        }
      })
      .catch(error => {
        console.error('Error updating video:', error);
      });
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  if (editing) {
    return (
      <EditForm video={selectedVideo} onSave={handleSaveEdit} />
    );
  }

  return (
    <div className='categories'>
      {selectedVideo && (
        <div className="video-details">
          <h2>{selectedVideo.title}</h2>
          <p>{selectedVideo.description}</p>
          <iframe className='video'
            title={selectedVideo.title}
            src={selectedVideo.videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="category frontend">
        <h2>Frontend</h2>
        <div className="videos-container">
          <div className="videos">
            {videos.map(video => {
              if (video.category === 'frontend') {
                return (
                  <div key={video.id} className="video-item">
                    <img className='image-item' src={video.image} alt={video.title} onClick={() => handleVideoClick(video)} />
                    <div className="buttons">
                      <button onClick={() => handleEdit(video.id)}><img src={edit} alt="Edit" />EDITAR</button>
                      <button onClick={() => handleDelete(video.id)}><img src={delet} alt="Delete" />DELETAR</button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      <div className="category backend">
        <h2>Backend</h2>
        <div className="videos-container">
          <div className="videos">
            {videos.map(video => {
              if (video.category === 'backend') {
                return (
                  <div key={video.id} className="video-item">
                    <img className='image-item' src={video.image} alt={video.title} onClick={() => handleVideoClick(video)} />
                    <div className="buttons">
                      <button onClick={() => handleEdit(video.id)}><img src={edit} alt="Edit" />EDITAR</button>
                      <button onClick={() => handleDelete(video.id)}><img src={delet} alt="Delete" />DELETAR</button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

      <div className="category mobile">
        <h2>Mobile</h2>
        <div className="videos-container">
          <div className="videos">
            {videos.map(video => {
              if (video.category === 'mobile') {
                return (
                  <div key={video.id} className="video-item">
                    <img className='image-item' src={video.image} alt={video.title} onClick={() => handleVideoClick(video)} />
                    <div className="buttons">
                      <button onClick={() => handleEdit(video.id)}><img src={edit} alt="Edit" />EDITAR</button>
                      <button onClick={() => handleDelete(video.id)}><img src={delet} alt="Delete" />DELETAR</button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Category;
