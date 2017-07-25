import "./app.sass"

import { render } from 'react-dom'

import {router} from '../../base/base.jsx'

var app = document.getElementById('app');

if (app) {
  render(router, app)
}

