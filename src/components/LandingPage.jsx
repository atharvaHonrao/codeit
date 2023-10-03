import React, { useState, onChange } from "react";
import { Link } from 'react-router-dom';
import '../styles/lPage.css';
import { Cards } from './ctas';
import { InfoCards } from './Infocards';
import Footer from './Footer';
import Pricing from './Pricing'

export default function LandingPage() {
    return (
        <div>
            <section className="container-1">
                <div className="attract">
                    <p className="attract-text">1,2,3...</p>
                </div>
            </section>
            <section className="container-2">
                <div className="cards">
                    <Cards />
                </div>
                <InfoCards />
                <Pricing />
            </section>
            <Footer />
        </div>
    );
}