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

  async getAdminPage(req, res, next) {
    res.render("admin");
  },

  async updateAdmin(req, res, next) {
    const { adminPassword } = req.body;

    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return res.render("admin", { error: "Incorrect Passcode." });
    }

    await db.updateAdmin(req.user.id);
    res.redirect("/");
  },
};
