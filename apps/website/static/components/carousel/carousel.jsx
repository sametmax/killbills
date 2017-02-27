
import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'bootstrap/dist/fonts/glyphicons-halflings-regular.eot';
import 'bootstrap/dist/fonts/glyphicons-halflings-regular.svg';
import 'bootstrap/dist/fonts/glyphicons-halflings-regular.ttf';
import 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff';
import 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff2';

import './img/ajax-loader.gif';
import './img/screenshot-mockup.png';
import './carousel.sass';

var LandingPageCarousel = React.createClass({
  render: function() {
    var settings = {
      dots: true,
      mobileFirst: true,
    }
    return (
      <div className='carousel'>
        <Slider {...settings}>
          <div>
            <span className="legend">Rapide</span>
              <a href="/static/screenshot-mockup.png">
                <img src='/static/screenshot-mockup.png' />
              </a>
          </div>
          <div>
            <span className="legend">Intuitif</span>
              <a href="/static/screenshot-mockup.png">
                <img src='/static/screenshot-mockup.png' />
              </a>
          </div>
          <div>
            <span className="legend">Utile</span>
              <a href="/static/screenshot-mockup.png">
                <img src='/static/screenshot-mockup.png' />
              </a>
          </div>
        </Slider>
      </div>
    );
  }
});

module.exports = LandingPageCarousel;
