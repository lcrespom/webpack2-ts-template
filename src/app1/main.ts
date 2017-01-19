import { sayHello } from '../common';

let div = document.createElement('div');
div.innerText = sayHello('App1');
document.body.appendChild(div);
