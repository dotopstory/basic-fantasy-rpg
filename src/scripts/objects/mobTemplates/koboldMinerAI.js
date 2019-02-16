import { meleeAutoAttack } from '../../globalAbilities/meleeAttack';

/**
 * KoboldMinerAI - warrior script
 *
 * @param  {Character} character reference
 * @returns {function} update function
 */
export default function KoboldMinerAI() {
  const meleeRange = 50;
  const AI = function() {
    const moveModifier = this.buffs.statBonus('moveSpeed')
      ? this.buffs.statBonus('moveSpeed')
      : 1;
    const moveSpeed = this.movement.getMovementSpeed() * moveModifier;
    const enemies = this.target.scanForEnemies(200);
    // if no enemies within scan distance, patrol
    if (!enemies.length) return this.setVelocity(0, 0);
    const target = this.target.getClosestEnemy(enemies);
    const canMelee = this.target.rangeCheck(target, meleeRange);
    if (canMelee) {
      this.setVelocity(0, 0);
      meleeAutoAttack(this, target);
    } else {
      this.scene.physics.moveToObject(this, target, moveSpeed);
    }
  }
  return AI;
}
