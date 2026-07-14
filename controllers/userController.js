const db = require("../db/queries");

module.exports = {
  async getMembershipPage(req, res, next) {
    res.render("membership");
  },

  async updateMembership(req, res, next) {
    const { membershipPassword } = req.body;

    if (membershipPassword !== process.env.MEMBERSHIP_PASSWORD) {
      return res.render("membership", { error: "Incorrect Passcode." });
    }
    await db.updateMembership(req.user.id);
    res.redirect("/");
  },
};
