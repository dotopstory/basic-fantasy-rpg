import Warrior from '../objects/classTemplates/warrior/Warrior';
import Rogue from '../objects/classTemplates/Rogue';
import Priest from '../objects/classTemplates/Priest';
import Mage from '../objects/classTemplates/Mage';
import KoboldMiner from '../objects/mobTemplates/KoboldMiner';
import playerInput from '../player/playerInput';
import playerUpdate from '../player/playerUpdate';
import updateUI from '../../updates/updateUI';
import updateLiveCharacters from '../../updates/updateLiveCharacters';
import updateDeadCharacters from '../../updates/updateDeadCharacters';

export default class CharacterCreationScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CharacterCreationScene' })
  }

  create() {
    this.characters = this.add.group();

    this.charlie = new Warrior(this, 'charlie');
    this.characters.add(this.charlie);
    // allow for listening to input
    this.charlie.AI = playerUpdate();
    playerInput(this.charlie);

    for (let i = 0; i < 3; i++) {
      const mob = new KoboldMiner(this, 'kobold');
      this.characters.add(mob);
    }

    this.hpText = this.add.text(10, 10, '0', { fontFamily: 'Arial', fontSize: 32, color: '#00ff00' });
    this.rageText = this.add.text(10, 50, '0', { fontFamily: 'Arial', fontSize: 32, color: '#ff0000' });
    this.mySwingTimer = this.add.text(10, 90, '', { fontFamily: 'Arial', fontSize: 16, color: '#000000' });
    this.myBuffs = this.add.text(10, 110, '', { fontFamily: 'Arial', fontSize: 16, color: '#0000ff' });
    this.enemyHpText = this.add.text(260, 10, '', { fontFamily: 'Arial', fontSize: 32, color: '#00ff00' });
    this.enemySwingTimer = this.add.text(260, 90, '', { fontFamily: 'Arial', fontSize: 16, color: '#000000' });
    this.enemyBuffs = this.add.text(260, 110, '', { fontFamily: 'Arial', fontSize: 16, color: '#0000ff' });
    this.keyMapText = this.add.text(10, 680, '', { fontFamily: 'Arial', fontSize: 26, color: '#000000' });
    this.keyMapText.setText("Keys: 1: Charge, 2: Rend, 3: Heroic Strke, 4: Auto On/Off, 5: Battle Shout, 6: Thunder Clap, 7: Hamstring")

  }

  update() {
    updateUI(this);
    updateLiveCharacters(this);
    updateDeadCharacters(this);
  }
}
