
import Bingo  from "./bingo";
import Listener from "./listener";



const bingo = new Bingo();
const listener = new Listener(bingo);

listener.init();