var mongoose = require("mongoose");
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  created: { type: Date, default: new Date() },
});

// virtual
MessageSchema.virtual("created_formatted").get(function () {
  return DateTime.fromJSDate(this.created).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Message", MessageSchema);
