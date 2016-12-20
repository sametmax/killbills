
var React = require('react');
var ReactDOM = require('react-dom');
var Slider = require('react-slick');

var LandingPageCarousel = React.createClass({
  render: function() {
    var settings = {
      dots: true
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
