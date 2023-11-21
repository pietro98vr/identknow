/**
 * Filename: Home.js
 * Author: Pietro Montagna x Giorgia
 * Created on: 14/10/23
 * 
 * Version: 1.0
 */

import '../assets/home.css';
import Header from './header';
import infoPazientiCard from '../data/patientscards_data';
import infoApprofondimentiCard from '../data/approfondimenticards_data';
import ColorDecider from '../utils/ColorDecider';
import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// Trovo tutte le possibili categorie e poi ci aggiungo la voce "Tuti" 
const getUniqueCategories = (infoPazientiCard) => {
  const categoriesSet = new Set();
  infoPazientiCard.forEach(card => categoriesSet.add(card.category));
  return ["Tutti", ...Array.from(categoriesSet)];
};

// Scelgo 3 approfondimenti da consigliare
const getInsightsSplitted = (infoApprofondimentiCard) => {
  let shuffledArray = [...infoApprofondimentiCard];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray.slice(0, 3);
}

// FITTIZIO PER ORA. Scelgo 3 quiz da consigliare
const getUniqueQuiz = (infoPazientiCard) => {
  const quizSet = new Set();
  infoPazientiCard.forEach(card => quizSet.add(card.title));
  return [...Array.from(quizSet)]
}

// definisco le costanti
const uniqueCategories = getUniqueCategories(infoPazientiCard);
const uniqueInsights = getInsightsSplitted(infoApprofondimentiCard);
const uniqueQuiz = getUniqueQuiz(infoPazientiCard);

// trovo il colore del cerchio sulla base della cateogira in input
const getCategoryColor = (category) => {
  const color = ColorDecider(category);
  return color;
};

// scelgo le cards da mostrare sulla base della categoria selezioanta
const getCardsForCategory = (category) => {
  if (category === "Tutti") {
    let shuffled = [...infoPazientiCard].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  } else {
    let filtered = infoPazientiCard.filter(card => card.category === category);
    return filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
  }
};

// Definisco il layout delle varie cards in modo modulare
const CategoryCard = ({ category, onClick }) => (
  <div className="category-card" onClick={() => onClick(category)}>
    <p className='category-text'>{category}</p>
    <div className='category-circle' style={{ backgroundColor: getCategoryColor(category) }} ></div>
  </div>
);

const CaseCard = ({ title, description, category, onClick }) => (
  <div onClick={onClick} className="case-card">
    <p className='case-title-text'>{title}</p>
    <p className='case-desc-text'>{description}</p>
    <div className='category-circle' style={{ backgroundColor: getCategoryColor(category) }}></div>
  </div>

);

const InsightCard = ({ title, id }) => {
    const navigate = useNavigate();
    
    return (
      <div className="insight-card">
        <p className='insight-title-text'>{title}</p>
        <Button className="insight-button" variant="contained" color="primary" onClick={() => navigate(`/insight/${id}`)}>
          Approfondisci
        </Button>
      </div>
    );
};


function Home() {

  // definisco le costanti
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [displayCards, setDisplayCards] = useState([]);

  //  Quando cambia la categoria selezioanta cambiano le carte mostrate
  useEffect(() => {
    if (selectedCategory) {
      setDisplayCards(getCardsForCategory(selectedCategory));
    } else {
      setDisplayCards([]);
    }
  }, [selectedCategory]);

  //  gestisco avanti ed indietro nel carosello delle categorie
  const handleNext = () => {
    const maxStartIndex = uniqueCategories.length - 3;
    setVisibleStartIndex(prevIndex => Math.min(prevIndex + 3, maxStartIndex));
  };
    
  const handlePrev = () => {
    setVisibleStartIndex(prevIndex => Math.max(prevIndex - 3, 0));
  };
  
  // gestisco il cambio di categoria
  const handleCategoryClick = (category) => {
    if (category !== selectedCategory) {
        setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  };

  const handleTuttiClick = () => {
    if (selectedCategory !== "Tutti") {
      setSelectedCategory("Tutti");
    } else {
      setSelectedCategory(null);
    }
  };

  //  layout
  return (
    <div className="home">
      <Header/>
      <div className='all-content-wrapper'> 
        <div className='suggested-container'>
          <div className='categories-container'>
            <p>Casi<br/> consigliati</p>
            <div className="categories-carousel-container">
              {visibleStartIndex > 0 && (
                <button style={{ backgroundColor: 'gold' }} onClick={handlePrev} className="carousel-nav-button prev">
                  <FontAwesomeIcon icon={faArrowLeft} color="black" />
                </button>
              )}
              <div className='categories-cards-wrapper'>
                {uniqueCategories.slice(visibleStartIndex, visibleStartIndex + 3).map(category => (
                  <CategoryCard 
                    key={category}
                    category={category} 
                    onClick={category === "Tutti" ? handleTuttiClick : handleCategoryClick} 
                  />
                ))}
              </div>
              {visibleStartIndex < uniqueCategories.length -3 && (
                <button style={{ backgroundColor: 'gold' }} onClick={handleNext} className="carousel-nav-button next">
                  <FontAwesomeIcon icon={faArrowRight} color="black" />
                </button>
              )}
            </div>
          </div>
          {selectedCategory && (
            <div className='cases-container'>
              <div className='cases-cards-wrapper'>
                  {displayCards.map(card => (
                      <CaseCard 
                      key={card.id} 
                      title={card.title}
                      description={card.description}
                      category={card.category} 
                      onClick={() => null}  
                    />
                  ))}
                </div>
            </div>
          )}
        </div>
        <div className='insights-container'>
          <p>Approfondimenti<br/> consigliati</p>
          <div className="insights-carousel-container">
            <div className='insights-cards-wrapper'>
              {uniqueInsights.map(item => (
                <InsightCard 
                key={item.id}
                title={item.title}
                id={item.id}
              />
              ))}
            </div>
          </div>
        </div>
        <div className='quiz-container'>
          <p>Quiz<br/> consigliati</p>
          <div className="quiz-carousel-container">
            <div className='quiz-cards-wrapper'>
              {uniqueQuiz.map(category => (
                <CategoryCard 
                key={category}
                category={category} 
                onClick={() => null} 
              />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='footer-container'>
        <p>I Den't Know è parte della Tesi Di Laurea Magistrale a Ciclo Unico in Odontoiatria e Protesi Dentaria scritta da Giorgia Lanzaretti</p>
      </div>
    </div>
  );
}

export default Home;
