import { sayHello } from '../common';
import { intersperse } from 'ramda';

let div = document.createElement('div');
let nums = intersperse('and', ['one', 'two', 'three']).join(' ');
div.innerText = sayHello('App ' + nums);
document.body.appendChild(div);
