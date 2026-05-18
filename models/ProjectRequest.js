/* =====================================
   PROJECT REQUEST SCHEMA
===================================== */
const mongoose = require("mongoose");

const projectRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    projectType: {
      type: String,
      required: true,
    },

    bambooSpecies: {
      type: String,
    },

    preservationMethod: {
      type: String,
    },

    structuralNotes: {
      type: String,
    },

    protectionNotes: {
      type: String,
    },

    sustainabilityGoals: {
      type: String,
    },

    budgetRange: {
      type: String,
    },

    timeline: {
      type: String,
    },

    /* Image path will be added later using Multer */
    referenceImage: {
      type: String,
    },

    /* Admin workflow fields */
    status: {
      type: String,
      default: "Pending",
    },

    adminNotes: {
      type: String,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  },
);

module.exports = mongoose.model("ProjectRequest", projectRequestSchema);
