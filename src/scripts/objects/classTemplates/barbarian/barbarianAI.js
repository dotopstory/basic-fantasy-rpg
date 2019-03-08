/**
 * barbarianAI - barbarian script, used for
 * non player controlled barbarian characters.
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function barbarianAI() {
  const meleeRange = 25;
  const rageDumpValue = 20;
  const AI = function() {
    const rage = this.rage.rage();
    const enemies = this.target.scanForEnemies(100);
    // if no enemies, stop
    if (!enemies.length) {
      this.animations.idle();
      return this.setVelocity(0, 0);
    }
    const target = this.target.getClosestEnemy(enemies);
    const canMelee = this.target.rangeCheck(target, meleeRange);
    if (canMelee) {
      this.setVelocity(0, 0);
      if (rage > rageDumpValue) this.ability.savageBlow();
      this.combat.meleeAutoAttack(target);
    } else {
      this.scene.physics.moveToObject(this, target);
    }
  }
  return AI;
}