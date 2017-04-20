import React from 'react';
import ReactDOM from 'react-dom';

import LandingPageCarousel from 'carousel/carousel.jsx';

var carousel = document.getElementById('carousel');


if (carousel) {

  ReactDOM.render(
    <LandingPageCarousel />,
    document.getElementById('carousel')
  );
}

require("./letsgo.en.svg");
require("./Octicons-mark-github.svg");
require("./landing_page.sass");
