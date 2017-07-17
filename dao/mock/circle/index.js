const start = require('../../../db');

const mailboxDao = require('../../index').mailbox;

const config = require('../../../config');

const circles = [];
const result = [];
const uuid = start.uuid;

function createCircle(callback) {
  const newCircle = {
    circleId: uuid().toString(),
    mailboxId: uuid().toString(),
    createdOn: new Date()
  };
  circles.push(newCircle);
  return callback(null, newCircle);
}

function checkIfCircleExists(circleId, callback) {
  const filterCircle = circles.filter(circles => circles.circleId === circleId);
  return callback(null, filterCircle.length !== 0);
}

function deleteCircle(circleId, callback) {
  const filter = circles.filter(y => y.circleId === circleId);
  circles.splice(circles.indexOf(filter[0]), 1);
  return callback(null, { id: filter[0].circleId });
}


function getAllCircles(limit, callback) {
  if (limit == 0) {
    return callback("limit is set to 0", null);
  }

  else if (limit == -1) {
    let a = circles.length;
    let b = circles;
    return callback(null, {a,b});
  }
  else if (limit === undefined) {
    limit = config.defaultLimit;
    for (let i = 0; i < limit; i++) {
      result.push(circles[i]);
    }
    let a = result.length;
    let b = result;
    return callback(null, {a,b});

  }
  else {
    for (let i = 0; i < limit; i++) {
      result.push(circles[i]);
    }
    let a = result.length;
    let b = result;
    return callback(null, {a,b});
  }
}


module.exports = {
  createCircle,
  deleteCircle,
  checkIfCircleExists,
  getAllCircles,
};
