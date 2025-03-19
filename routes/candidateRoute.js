import express from "express";
import db from "../db/db.js";
import Candidate from '../models/candidate.js';
import User from '../models/user.js';
const {createTokenForUser} = require('../models/createToken.js'); 
const router = express.Router();

//to get all candidates

router.get('/', async(req, res) => {
    try {
        const data = await Candidate.find();
        console.log("data fetch");
        res.status(200).json(data);
        const candidate = await Candidate.find().sort({voteCount: 'desc'});

        // Map the candidates to only return their name and voteCount
        const voteRecord = candidate.map((data)=>{
            return {
                name: data.name,
                count: data.voteCount
            }
        });

        return res.status(200).json(voteRecord);
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
    
})

//to post a andidate
// router.post("/", async(req, res) => {
//     try {
//         const data =req.body;
//         const newCandidate = new Candidate(data); 
//         const saveCandidate=await newCandidate.save();
//         console.log("Candidate saved");
//         res.status(200).json(saveCandidate);
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({error: 'Internal Server Error'});
//     }
    
// })

//user voting
router.post('/:candidateID', createTokenForUser, async (req, res)=>{
    // no admin can vote
    // user can only vote once
    
    const candidateID = req.params.candidateID;
    const userId = req.user._id;

    try{
        // Find the Candidate document with the specified candidateID
        const candidate = await Candidate.findById(candidateID);
        if(!candidate){
            return res.status(404).json({ message: 'Candidate not found' });
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: 'user not found' });
        }
        if(user.role == 'admin'){
            return res.status(403).json({ message: 'admin is not allowed'});
        }
        if(user.isVoted){
            return res.status(400).json({ message: 'You have already voted' });
        }

        // Update the Candidate document to record the vote
        candidate.votes.push({user: userId})
        candidate.voteCount++;
        await candidate.save();

        // update the user document
        user.isVoted = true
        await user.save();

        return res.status(200).json({ message: 'Vote recorded successfully' });
    }catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
});

// vote count 
router.get('/vote/count', async (req, res) => {
    try{
        // Find all candidates and sort them by voteCount in descending order
        const candidate = await Candidate.find().sort({voteCount: 'desc'});

        // Map the candidates to only return their name and voteCount
        const voteRecord = candidate.map((data)=>{
            return {
                name: data.name,
                count: data.voteCount
            }
        });

        return res.status(200).json(voteRecord);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export default router;