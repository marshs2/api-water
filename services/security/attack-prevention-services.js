class AttackPrevention {
  constructor (options) {
    this.options = options
  }
  /* checks for csrf attack */
  validateCSRFAttack () {
    if (this.options && this.options.csrf_token) {

    }
  }
  /* checks for maliculous code in request */
  sanitizeInput () {

  }
}
module.exports = AttackPrevention
