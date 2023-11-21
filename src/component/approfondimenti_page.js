import React from 'react';
import '../assets/approfondimenti_page.css';
import { useParams } from 'react-router-dom';
import infoApprofondimentiCard from '../data/approfondimenticards_data';

const DetailPage = () => {
  const { id } = useParams();
  const item = infoApprofondimentiCard.find(card => card.id === parseInt(id));

  if (!item) {
    return <div>Errore, approfondimento non trovato</div>;
  }

  return (
    <div className="approfondimento-container">
      <h2 className="approfondimento-title">{item.title}</h2>
      <p className="approfondimento-description">{item.description}</p>
      <p className="approfondimento-biblio">{item.biblio}</p>
    </div>
  );
};

export default DetailPage;
