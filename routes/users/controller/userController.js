module.exports = {
  login: async (req, res) => {
    try {
      res.status(200).json({
        message: "POST request from controller",
      });
    } catch (e) {
      res.status(500).json({
        message: e,
      });
    }
  },
};
