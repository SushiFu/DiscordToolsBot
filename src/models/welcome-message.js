import mongoose from "../server/mongo";

export const WelcomeMessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        default: "Welcome"
    },
    timestamps: {}
});

/**
 * Virtuals fields
 */

/**
 * Pre-save hooks
 */

/**
 * Methods
 */

/**
 * Statics
 */
WelcomeMessageSchema.statics = {
    create(welcomeMessage) {
        const wMsg = new this();
        wMsg.message = welcomeMessage;
        return wMsg.save();
    },
    all() {
        return this.find({});
    }
};

/**
 * @typedef WelcomeMessage
 */
export default mongoose.model("WelcomeMessage", WelcomeMessageSchema);
