const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const Project = require('../models/Project');

// Get all projects for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ creator: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

module.exports = router;