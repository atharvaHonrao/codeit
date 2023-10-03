import React from 'react'
import '../styles/footer.css'; 

export default function Footer()  {
  return (
    <div>
        <section className="footer">
            <div className="box-container">
                <div className="box">
                    <h3>our locations</h3>
                    <a href="#">
                    <i className="fas fa-map-marker-alt" />
                    india
                    </a>
                    <a href="#">
                    <i className="fas fa-map-marker-alt" />
                    usa
                    </a>
                    <a href="#">
                    <i className="fas fa-map-marker-alt" />
                    china
                    </a>
                    <a href="#">
                    <i className="fas fa-map-marker-alt" />
                    france
                    </a>
                    <a href="#">
                    <i className="fas fa-map-marker-alt" />
                    japan
                    </a>
                    <a href="#">
                    <i className="fas fa-map-marker-alt" />
                    germany
                    </a>
                </div>
                <div className="box">
                    <h3>quick links</h3>
                    <a href="#">
                    <i className="fas fa-arrow-right" />
                    home
                    </a>
                    <a href="#">
                    <i className="fas fa-arrow-right" />
                    featured
                    </a>
                    <a href="#">
                    <i className="fas fa-arrow-right" />
                    arrivals
                    </a>
                    <a href="#">
                    <i className="fas fa-arrow-right" />
                    reviews
                    </a>
                    <a href="#">
                    <i className="fas fa-arrow-right" />
                    blogs
                    </a>
                </div>
                <div className="box">
                    <h3>other links</h3>
                    <a href="#">
                    <i className="fas fa-arrow-right" />
                    account info
                    </a>
                    <a href="#">
                    <i className="fas fa-arrow-right" />
                    ordered items
                    </a>
                    <a href="#">
                    <i className="fas fa-arrow-right" />
                    privacy policy
                    </a>
                    <a href="#">
                    <i className="fas fa-arrow-right" />
                    payment method
                    </a>
                    <a href="#">
                    <i className="fas fa-arrow-right" />
                    our services
                    </a>
                </div>
                <div className="box">
                    <h3>contact info</h3>
                    <a href="#">
                    <i className="fas fa-phone" />
                    +123-456-7890
                    </a>
                    <a href="#">
                    <i className="fas fa-phone" />
                    +111-222-3333
                    </a>
                    <a href="#">
                    <i className="fas fa-envelope" />
                    abcd@gmail.com
                    </a>
                    <img src="images/worldmap.png" className="map" alt="" />
                </div>
            </div>
            <div className="share">
            <a href="#" className="fab fa-facebook-f" />
            <a href="#" className="fab fa-twitter" />
            <a href="#" className="fab fa-instagram" />
            <a href="#" className="fab fa-linkedin" />
            <a href="#" className="fab fa-pinterest" />
            </div>
        </section>
    </div>
  )
}
