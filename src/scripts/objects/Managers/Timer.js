export default class Timer {
  constructor(character) {
    let globalCooldown = 0;
    let swingTimerMainHand = 0;
    let swingTimerOffHand = 0;
    let abilityTimers = [];
    let corpseTimer = 0;



    /**
     * checkAbilityTimer
     *
     * @param  {object} ability to check
     * @returns {bool} true if can be cast
     */
    this.checkAbilityTimer = function(ability = {}) {
      const abilityTimer = this.getAbilityTimers()
        .filter(a => a.name === ability.name)[0].time;
      const spellSpeed = spell.speed;
      const spellSpeedToFrames = spellSpeed * 60;
      return (spellTimer > spellSpeedToFrames);
    }

    /**
     * updateAbilityTimers - increment each timer
     *
     * @returns {array} of ability timers
     */
    this.updateAbilityTimers = function() {
      const oldAbilityTimers = this.getAbilityTimers();
      const newAbilityTimers = oldAbilityTimers.map((timer) => {
        const newTime = timer.time + 1;
        const newTimer = Object.assign({}, { name: timer.name, time: newTime });
        return newTimer;
      })
      this.setAbilityTimers(newAbilityTimers);
      return newAbilityTimers;
    }

    /**
     * resetAbilityTimer
     *
     * @param  {string} ability name of ability
     * @returns {object} new timer object
     */
    this.resetAbilityTimer = function(ability = '') {
      const oldAbilityTimers = this.getAbilityTimers();
      const newTimer = Object.assign({}, { name: ability, time: 0 });
      const newAbilityTimers = oldAbilityTimers.filter(a => a.name !== ability);
      newAbilityTimers.push(newTimer);
      this.setAbilityTimers(newAbilityTimers);
      return newTimer;
    }

    /**
     * resetSwingTimer - resets timer to weapon speed
     *
     * @param  {Character} attacker
     * @param  {string} hand to reset
     * @returns {void}
     */
    this.resetSwingTimer = function(hand = '') {
      const spdModifier = character.combat.attackSpd();
      if (hand === 'main') {
        const mainHandSpeed = character.equipment.getWeaponSpeed('main');
        this.setSwingTimerMainHand(spdModifier * mainHandSpeed * 60);
      } else if (hand === 'off') {
        const offHandSpeed = character.equipment.getWeaponSpeed('off');
        this.setSwingTimerOffHand(spdModifier * offHandSpeed * 60);
      }
    }

    /**
     * checkSwingTimer
     *
     * @param  {Character} character to check
     * @param  {string} hand to use
     * @returns {bool} can attack or not
     */
    this.checkSwingTimer = function(hand = '') {
      const mainHandSpeed = character.equipment.getWeaponSpeed('main');
      const offHandSpeed = character.equipment.getWeaponSpeed('off');
      const swingTimer = (hand === 'main')
        ? this.getSwingTimerMainHand()
        : this.getSwingTimerOffHand();
      const weaponSpeed = (hand === 'main')
        ? mainHandSpeed
        : offHandSpeed;
      return (swingTimer === 0);
    }

    /**
     * updateSwingTimers - run on character update
     *
     * @param  {Character} character to update
     * @returns {void}
     */
    this.updateSwingTimers = function() {
      const swingTimerMainHand = this.getSwingTimerMainHand();
      const swingTimerOffHand = this.getSwingTimerOffHand();
      const newSwingTimerMainHand = (swingTimerMainHand - 1 > 0)
        ? swingTimerMainHand - 1
        : 0;
      const newSwingTimerOffHand = (swingTimerOffHand - 1 > 0)
        ? swingTimerOffHand - 1
        : 0;
      this.setSwingTimerMainHand(newSwingTimerMainHand);
      this.setSwingTimerOffHand(newSwingTimerOffHand);
    }

    /**
     * updateGlobalCooldown - increment GCD
     *
     * @param  {Character} character to modify
     * @returns {void}
     */
    this.updateGlobalCooldown = function() {
      const oldGlobalCooldown = this.getGlobalCooldown();
      const newGlobalCooldown = oldGlobalCooldown + 1;
      this.setGlobalCooldown(newGlobalCooldown);
    }

    /**
    * getSwingTimerMainHand
    *
    * @returns {number} main hand cooldown
    */
    this.getSwingTimerMainHand = function() {
      return swingTimerMainHand;
    }

    /**
    * getSwingTimerOffHand
    *
    * @returns {number} off hand cooldown
    */
    this.getSwingTimerOffHand = function() {
      return swingTimerOffHand;
    }

    /**
     * getGlobalCooldown
     *
     * @returns {number} global cooldown
     */
    this.getGlobalCooldown = function() {
      return globalCooldown;
    }

    /**
     * getSpellTimers
     *
     * @returns {array} array of timer objects
     */
    this.getSpellTimers = function() {
      return spellTimers;
    }

    /**
     * getCorpseTimer
     *
     * @returns {number} seconds until destroy
     */
    this.getCorpseTimer = function() {
      return corpseTimer;
    }

    /**
    * setSwingTimerMainHand
    *
    * @param  {number} newSwingTimerMainHand
    * @returns {void}
    */
    this.setSwingTimerMainHand = function(newSwingTimerMainHand) {
      swingTimerMainHand = newSwingTimerMainHand;
    }

    /**
    * setSwingTimerOffHand
    *
    * @param  {number} newSwingTimerOffHand
    * @returns {void}
    */
    this.setSwingTimerOffHand = function(newSwingTimerOffHand) {
      swingTimerOffHand = newSwingTimerOffHand;
    }

    /**
     * setGlobalCooldown
     *
     * @param  {number} newGlobalCooldown
     * @returns {void}
     */
    this.setGlobalCooldown = function(newGlobalCooldown) {
      globalCooldown = newGlobalCooldown;
    }

    /**
     * setSpellTimers
     *
     * @param  {array} newSpellTimers array of timer objects
     * @returns {void}
     */
    this.setSpellTimers = function(newSpellTimers) {
      spellTimers = newSpellTimers;
    }

    /**
     * setCorpseTimer
     *
     * @param  {number} newCorpseTimer
     * @returns {void}
     */
    this.setCorpseTimer = function(newCorpseTimer) {
      corpseTimer = newCorpseTimer;
    }

  }
}
