require("slick-carousel/slick/ajax-loader.gif");
require("slick-carousel/slick/slick.css");
require("../sass/carousel.sass");
require("../img/screenshot-mockup.png");

var React = require('react');
var ReactDOM = require('react-dom');
var Slider = require('react-slick');

var ReactSlickDemo = React.createClass({
  render: function() {
    var settings = {
      dots: true
    }
    return (
      <div className='carousel'>
        <Slider {...settings}>
          <div>
            <span className="legend">Rapide</span>
            <img src='/static/screenshot-mockup.png' />
          </div>
          <div>
            <span className="legend">Intuitif</span>
            <img src='/static/screenshot-mockup.png' />
          </div>
          <div>
            <span className="legend">Utile</span>
            <img src='/static/screenshot-mockup.png' />
          </div>
        </Slider>
      </div>
    );
  }
});

ReactDOM.render(
  <ReactSlickDemo />,
  document.getElementById('carousel')
);
