const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);

// ConnectionRequest.find({fromUserId: 273478465864786587, toUserId: 273478465864786587})

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// Remove 'next' from the parameters and make it async
connectionRequestSchema.pre("save", async function () {
  const connectionRequest = this;

  // Always compare IDs using .toString() to be 100% safe
  const fromId = connectionRequest.fromUserId.toString();
  const toId = connectionRequest.toUserId.toString();

  if (fromId === toId) {
    throw new Error("Cannot send connection request to yourself!");
  }
  
  // No next() call needed here because it's an async function
}); 

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;