export default class RageMechanic {
  constructor(character) {
    let rage = 0;


    this.spendRage = function(cost = 0) {
      // calculate if enough rage
      if (this.rage() - cost < 0) {
        console.log('Not enough rage');
        return false;
      } else {
        // if so, deduct rage cost
        this.setRage(this.rage() - cost);
        return true;
      }
    }

    /**
     * rage
     *
     * @returns {number} current amount of rage
     */
    this.rage = function() {
      return rage;
    }

    /**
     * setRage
     *
     * @param  {number} rage value
     * @returns {void}
     */
    this.setRage = function(newRage) {
      rage = newRage;
    }

    /**
     * processRage - update players rage
     *
     * @param  {Character} character to update rage on
     * @param  {object} combatObject info about attack
     * @param  {string} role attacker or target
     * @returns {void}
     */
    this.processRage = function(combatObject = {}, role = '') {
      let rageGain = 0;
      const oldRage = this.rage();
      const level = character.lvl.getLevel();
      const rageConversion = 0.0091107836 * (level * level) + (3.225598133 * level) + 4.2652911;
      const dmgAmt = combatObject.amount;
      const hand = combatObject.hand;
      const weaponSpeed = (hand === 'main')
        ? character.equipment.getWeaponSpeed('main')
        : character.equipment.getWeaponSpeed('off');
      const hitFactor = calculateHitFactor(combatObject);

      if (role === 'attacker') {
        // only for white dmg and 'special' attacks
        rageGain = (15 * dmgAmt)/ (4 * rageConversion ) + ((hitFactor * weaponSpeed) / 2);
        const maxRageGain = (15 * dmgAmt) / rageConversion;
        if (rageGain > maxRageGain) rageGain = maxRageGain;
      } else if (role === 'target') {
        rageGain = (5/2) * (dmgAmt / rageConversion);
      }
      const totalRageGain = (rageGain + oldRage > 100) ? 100 : rageGain + oldRage;
      this.setRage(totalRageGain);
    }

    /**
     * rageDecay - run while out of combat
     *
     * @returns {void}
     */
    this.rageDecay = function() {
      if (this.rage() > 1) {
        this.setRage(this.rage() - 1/60);
      }
    }
  }
}

/**
 * calculateHitFactor - used for rage calculation
 *
 * @param  {object} combatObject info about attack
 * @returns {number} used in rage formula
 */
function calculateHitFactor(combatObject = {}) {
  let hitFactor = 0;
  const hand = combatObject.hand;
  const type = combatObject.type;
  if (hand === 'main') {
    if( type === 'hit') {
      hitFactor = 3.5;
    } else if (type === 'crit') {
      hitFactor = 7;
    }
  } else if (hand === 'off') {
    if (type === 'hit') {
      hitFactor = 1.75;
    } else if (type === 'crit') {
      hitFactor = 3.5;
    }
  }
  return hitFactor;
}
