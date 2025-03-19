import { Schema, model } from 'mongoose';

const candidateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    votes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            votedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    voteCount: {
        type: Number,
        default: 0
    }
});

const Candidate = model('Candidate', candidateSchema);
export default Candidate;