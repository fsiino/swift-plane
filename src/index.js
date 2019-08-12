import PaperPlane from './game';

const canvas = document.getElementById('plane-game');
new PaperPlane(canvas);

// index.js < game.js < level.js, plane.js
// entry file < canvas file < game logic file < player file

//TODO: Make plane get pushed to the left overtime
//TODO: Make pipes move faster overtime (PIPE_SPEED)
//TODO: Make background scroll infinitely