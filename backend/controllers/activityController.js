const models = require("../models");
const asyncHandler = require("express-async-handler");

const ActivityLog = models.ActivityLog;
const User = models.User;

// fetch all user activity logs
exports.getLogs = asyncHandler(async (req, res) => {
  const logs = await ActivityLog.findAll({
    include: [{ model: User, attributes: ['username'] }],
    order: [['createdAt', 'DESC']]
  });

  // format logs for frontend
  const formatted = logs.map(log => ({
    id: log.id,
    username: log.User?.username || "Unknown",
    action: log.action,
    details: log.details,
    createdAt: log.createdAt
  }));

  res.status(200).json(formatted);
});
