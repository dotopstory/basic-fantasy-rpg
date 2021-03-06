/**
 * OrcAI - barbarian script
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function OrcAI() {
  const meleeRange = 25;
  const AI = function() {
    if (this.combat.isDead()) return;

    // scan for enemies for body pull
    const enemies = this.target.scanForEnemies(75);
    // scan for enemies by threat table (pulled by attack)
    const target = this.threat.highestThreat()
      ? this.threat.highestThreat()
      : this.target.getClosestEnemy(enemies);
    // if no target in range and no aggro, wait
    if (!target) {
      this.animations.idle();
      return this.movement.stop();
    }

    // if target, move close enough to attack
    const canMelee = this.target.rangeCheck(target, meleeRange);
    if (canMelee) {
      this.movement.stop();
      this.animations.combat();
      this.combat.meleeAutoAttack(target);
    } else {
      // change this to total moveSpeed
      const moveModifier = this.buffs.statBonus('moveSpeed')
      ? this.buffs.statBonus('moveSpeed')
      : 1;
      const moveSpeed = this.movement.getMovementSpeed() * moveModifier;
      this.movement.setMoveTargetCoords([target.x, target.y]);
      this.animations.run();
      this.scene.physics.moveToObject(this, target, moveSpeed);
    }
  }
  return AI;
}
