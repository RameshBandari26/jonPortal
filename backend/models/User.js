const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, default: false },         // ✅ NEW
  password: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  mobileVerified: { type: Boolean, default: false },         // ✅ NEW
  workStatus: { type: String, enum: ['experienced', 'fresher'], default: 'fresher' },
  updatesViaEmail: { type: Boolean, default: false },
  role: { type: String, enum: ['jobSeeker', 'employer', 'admin'], default: 'jobSeeker' },
    companyName: { type: String, default: '' },

  graduation: { type: String, default: '' },
  gender: { type: String, default: '' },
  location: { type: String, default: '' },
  profileImage: {
    type: String,
    default: 'https://randomuser.me/api/portraits/men/1.jpg',
  },

  experiences: { type: String, default: '' },
  ctc: { type: String, default: '' },

  professionalDetails: {
    currentIndustry: { type: String, default: '' },
    department: { type: String, default: '' },
    designation: { type: String, default: '' },
  },

  employmentDetails: {
    isCurrentCompany: { type: Boolean, default: false },
    calendarInfo: { type: String, default: '' },
    jobTitle: { type: String, default: '' },
    currentSalary: {
      fixedPay: { type: String, default: '' },
      variablePay: { type: String, default: '' },
    },
  },

  skills: {
    technologies: [String],
  },

  rolesAndResponsibilities: {
    summary: { type: String, default: '' },
  },

  education: {
    college: { type: String, default: '' },
    yearOfPassing: { type: String, default: '' },
    percentage: { type: String, default: '' },
  },

  personalDetails: {
    address: { type: String, default: '' },
    isDisabled: { type: Boolean, default: false },
    languages: [String],
  },
}, { timestamps: true });

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
