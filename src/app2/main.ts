import { sayHello } from '../common';

let div = document.createElement('div');
div.innerText = sayHello('App2');
document.body.appendChild(div);
