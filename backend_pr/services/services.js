const { getIo } = require("../config/socketConn");

const getApproversAndRequesters = async (checker) => {
  try {
    const approversArray = checker.map((info) => ({
      approverId: info,
      status: "Pending",
    }));
    return approversArray;
  } catch (error) {
    console.error("Error retrieving approvers and requesters:", error);
    throw error;
  }
};

const handleParallel = (userIds) => {
  const io = getIo();
  userIds.forEach((user) => {
    io.emit(`parallel${user.approverId}`, user.approverId);
  });
};

const handleSequential = (userIds, docs) => {
  const io = getIo();
  // console.log(docs.counter);
  if (docs.counter >= userIds.length) {
    console.log("All users have been notified");
    return;
  }
  const userId = userIds[docs.counter].approverId;
  io.emit(`sequential${userId}`, userIds[docs.counter].approverId);
};

exports.services = {
  getApproversAndRequesters,
  handleParallel,
  handleSequential,
};
