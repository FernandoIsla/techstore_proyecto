import React, { useState, useEffect } from 'react';
import heroImg from '../assets/hero.png';

const Banner = () => {
    const slides = [
        {
            title: "La tecnología que lleva tu mundo al siguiente nivel",
            subtitle: "Descubre los mejores productos en tecnología con las mejores ofertas",
            image: heroImg
        },
        {
            title: "Equípate con lo mejor del Gaming",
            subtitle: "Teclados mecánicos, ratones y audífonos premium para dominar la partida",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80"
        },
        {
            title: "Potencia al Máximo tu Computador",
            subtitle: "Unidades SSD ultra rápidas y memorias de alto rendimiento para tu setup",
            image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section className="banner">
            <div className="banner-container">
                <div className="banner-content">
                    <h1>{slides[currentIndex].title}</h1>
                    <p>{slides[currentIndex].subtitle}</p>
                    <button className="btn-offer">VER OFERTAS &gt;</button>
                </div>
                <div className="banner-image">
                    <img src={slides[currentIndex].image} alt="Banner slide" key={currentIndex} className="fade-in-slide" />
                </div>
            </div>
            <div className="banner-indicators">
                {slides.map((_, idx) => (
                    <span 
                        key={idx} 
                        className={`indicator ${currentIndex === idx ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(idx)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Banner;