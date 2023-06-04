import '../appearance/styles.css';

import { useEffect } from 'react';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function Menu({ children }) {
  useEffect(() => {
    let interval = 0;

    document.querySelector('span').onmouseover = (event) => {
      let iteration = 0;

      clearInterval(interval);

      interval = setInterval(() => {
        event.target.innerText = event.target.innerText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return event.target.dataset.value[index];
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join('');

        if (iteration >= event.target?.dataset.value.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };
  });

  return (
    <div>
      <h2 className={'menu-text hacker'}>
        <span className={'hacker'} data-value={'CROSSROADS'}>
          CROSSROADS
        </span>
      </h2>
      <div>{children}</div>
    </div>
  );
}
