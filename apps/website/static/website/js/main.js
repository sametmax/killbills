require('../sass/main.sass');

require("slick-carousel/slick/ajax-loader.gif");
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");

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
          <div><img src='http://placekitten.com/g/400/200' /></div>
          <div><img src='http://placekitten.com/g/400/200' /></div>
          <div><img src='http://placekitten.com/g/400/200' /></div>
          <div><img src='http://placekitten.com/g/400/200' /></div>
        </Slider>
      </div>
    );
  }
});

ReactDOM.render(
  <ReactSlickDemo />,
  document.getElementById('carousel')
);


