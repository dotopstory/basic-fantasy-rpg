import mageAI from '../objects/classTemplates/mage/mageAI.js'
import barbarianAI from '../objects/classTemplates/barbarian/barbarianAI.js'
import playerUpdate from './playerUpdate';
import inputListeners from './inputListeners';

let index = 0;

export default function toggleControl(scene = {}) {
  index++;
  const playerCharacters = scene.characters.getChildren().filter(child => child.team() !== 'mob');
  const currentCharacter = playerCharacters.filter(character => character.controller === 'player')[0]
  const nextCharacter = playerCharacters[index % playerCharacters.length]
  // starting with mage, switch to barbarian:
  if (currentCharacter && nextCharacter) {
    // strip all input and visuals from current character:
    if (currentCharacter) {
      strip(currentCharacter);
    }

    // emit to UI:
    scene.registry.set('reloadUI', nextCharacter);
    inputListeners(nextCharacter);
    scene.cameras.main.startFollow(nextCharacter, true, .05, .05);

    // change character flag:
    nextCharacter.controller = 'player';
    if (nextCharacter.target.currentTarget()) {
      nextCharacter.target.currentTarget().playerTarget = true;
    }
  }
}

// reduces repeating self:
function strip(character = {}) {
  if (character.target.currentTarget()) {
    character.target.currentTarget().playerTarget = false;
  }
  character.controller = 'AI';
  character.scene.input.removeAllListeners();
  character.scene.input.keyboard.removeAllListeners();
}
