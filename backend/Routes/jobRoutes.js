const express = require('express');
const Job = require('../models/Jobs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const router = express.Router();

// GET all jobs (latest first)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// POST a new job
router.post('/create', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const jobData = {
      ...req.body,
      postedBy: userId,
    };

    const newJob = new Job(jobData);
    await newJob.save();

    res.status(201).json({ message: 'Job posted successfully', job: newJob });
  } catch (error) {
    console.error('Job creation error:', error);
    res.status(500).json({ message: 'Server error during job creation' });
  }
});

// GET total number of jobs
router.get('/count', async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    res.json({ total: totalJobs });
  } catch (err) {
    console.error('Total job count error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET latest 10 jobs
router.get('/latest', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).limit(10);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
  }
});

// Token test route
router.get('/protected-route', auth, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

// GET job count posted by current user
router.get('/my-jobs/count', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await Job.countDocuments({ postedBy: userId });
    res.json({ count });
  } catch (error) {
    console.error('Error fetching job count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET jobs posted by current user
router.get('/my-jobs', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
  }
});

// GET count of jobs the user has applied to
router.get('/applied/count', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await Job.countDocuments({
      applicants: { $elemMatch: { userId: userId } }
    });
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching job application count:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/jobs/search?type=&skills=&location=
router.get('/search', async (req, res) => {
  const { location = '', skills = '' } = req.query;

  try {
    if (!location.trim() && !skills.trim()) {
      return res.status(400).json({ message: 'Provide at least location or skills' });
    }

    const query = {};

    // Location search
    if (location.trim()) {
      query.location = { $regex: location.trim(), $options: 'i' };
    }

    // Multiple skills search
    if (skills.trim()) {
      const skillsArray = skills.split(',').map(skill => skill.trim()).filter(Boolean);
      query.skills = {
        $in: skillsArray.map(skill => new RegExp(skill, 'i')) // case-insensitive regex match
      };
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'Server error during job search' });
  }
});



// Apply to a job
router.post('/:id/apply', auth, async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const alreadyApplied = job.applicants.some(
      (app) => app.userId.toString() === userId.toString()
    );
    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied to this job' });
    }

    job.applicants.push({
      userId,
      appliedAt: new Date(),
    });

    await job.save();

    res.status(200).json({ message: 'Application submitted', job });
  } catch (error) {
    console.error('Application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
