const PullRequest = require("../../model/pullrequest");
const { services } = require("../../services/services");

const getRequests = async (req, res, next) => {
  try {
    const requestDoc = await PullRequest.find()
      .populate("requesterId", ["username"])
      .sort({ createdAt: -1 })
      .limit(50);
    return res.json(requestDoc);
  } catch (err) {
    return next(err);
  }
};

const getRequestById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const postDoc = await PullRequest.findById(id)
      .populate("requesterId", ["username"])
      .populate({
        path: "approvers.approverId", // Adjust the path based on your schema
        model: "User",
        select: "username email", // Specify the fields you want to select from the User model
      })
      .populate({
        path: "comments",
        model: "Review",
        populate: {
          path: "reviewerId",
          model: "User",
          select: "username",
        },
      })
      .populate({
        path: "approvals",
        model: "Approval",
        populate: {
          path: "approverId",
          model: "User",
          select: "username",
        },
      });
    res.json(postDoc);
  } catch (err) {
    return next(err);
  }
};

const createRequest = async (req, res, next) => {
  try {
    const { title, content, processed, checker } = req.body;
    const info = req.user;

    const approversArray=await services.getApproversAndRequesters(checker);

    console.log('users at controller',approversArray);
    
    if (title) {
      const userDoc = await PullRequest.create({
        title,
        description: content,
        requesterId: info._id,
        comments: [],
        approvals: [],
        processed,
        approvers: approversArray,
      });

      if (processed === "parallel") {
        services.handleParallel(approversArray);
      } else if (processed === "sequential") {
        services.handleSequential(approversArray, userDoc);
      }

      return res.json(userDoc);
    } else {
      res.status(400).json("Title is required");
    }
  } catch (err) {
    return next(err);
  }
};

const deleteRequestById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const info = req.user;
    const postDoc = await PullRequest.findById(id);
    const isAuthor =
      JSON.stringify(info.id) === JSON.stringify(postDoc.requesterId);

    await Review.deleteMany({ _id: { $in: postDoc.comments } });
    await Approval.deleteMany({ _id: { $in: postDoc.approvals } });
    await PullRequest.deleteOne({ _id: id });
    return res.status(200).json("ok");
  } catch (err) {
    return next(err);
  }
};

const updateRequestById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const info = req.user;
    const postDoc = await PullRequest.findById(id);
    const isAuthor =
      JSON.stringify(info.id) === JSON.stringify(postDoc.requesterId);
    if (!isAuthor) {
      return res.status(400).send("not valid user");
    }
    await postDoc.updateOne({
      $set: {
        title,
        description: content,
        requesterId: info.id,
        comments: postDoc.comments,
        approvers: postDoc.approvers,
        approvals: postDoc.approvals,
        status: postDoc.status,
      },
    });
    return res.json(postDoc);
  } catch (err) {
    return next(err);
  }
};

const postCommentToRequestById = async (req, res, next) => {
  try {
    const { comment } = req.body;
    const { id } = req.params;
    const info = req.user;

    const postDoc = await PullRequest.findById(id);
    const newComment = await Review.create({
      pullRequestId: id,
      reviewerId: info.id,
      comments: comment,
    });
    postDoc.comments.push(newComment);
    await postDoc.save();
    return res.status(200).json(newComment);
  } catch (err) {
    return next(err);
  }
};

exports.requestController = {
  getRequests,
  getRequestById,
  createRequest,
  deleteRequestById,
  updateRequestById,
  postCommentToRequestById,
};
