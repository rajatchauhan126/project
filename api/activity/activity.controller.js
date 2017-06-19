const activityDao = require('../../dao/activity');
const followDao = require('../../dao/follow');


function createPublishActivity(req, res) {
  const payload = req.body;
  const receiver = req.params.circleId;
  // console.log(req.params.circleId);
  const newActivity = {
    payload: req.body,
    timestamp: new Date(),
  };
  // console.log(newActivity);
  // receiver:{[payload:req.body,'timestamp:'req.timestamp}]
  res.status(201).json(activityDao.createPublishActivity(receiver, newActivity));
}

function getActivity(req, res) {
  const mailId = req.params.mailboxId;
  const isMailboxPresent = activityDao.retriveMessageFromMailbox(mailId, (err, result) => {
    if (err) {
      return res.status(404).json([]);
    } else {
      res.json(result);
    }
    return null;
  });
}


module.exports = {
  createPublishActivity,
  getActivity,
};
