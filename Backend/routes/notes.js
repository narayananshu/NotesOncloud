const express = require('express');
const router= express.Router();
const fetchuser = require('../middleware/Getuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
router.get('/fetchallnotes',fetchuser, async (req, res)=>{

   try{
    const notes =await Note.find({user:req.user.id})
    res.json(notes)
   }
   catch(error)
   {

    console.error(error.message)
    res.status(500).send('Internal server error');
   }
})
// Post routes to add new notes and login requied
router.post('/addnewnotes',fetchuser,[
    body('title','Enter valid title').isLength({min: 3}),
    body('description','Description must be atleast 5 characters').isLength({min:5}),
  
]
, async (req, res)=>{
   try{
    const {title, description, tag}= req.body;
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            erorr: error.array()})
    }
const note = new Note({
title,description,tag,user :req.user.id

})
   const savedNote = await note.save(); 
    res.json(savedNote)
   }
   catch(error)
   {
    console.error(error.message)
    res.status(500).send('Internal server error');
   }
})

// router for updatation of notes

router.put('/updatenote/:id',fetchuser, async(req, res)=>{
    const {title, description,tag} = req.body;
    // creation of new note
     const newNote ={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}
    // find the note to be updated
    
    let note = await Note.findById(req.params.id) 
    if(!note){(res.status(404).send('Not found'))}
    if(note.user.toString()!==req.user.id){
        res.status(404).send('Not Found')
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{newNote:true})
    res.send(note);
})
// router for deletion of existed notes
router.delete('/deletenote/:id',fetchuser, async(req, res)=>{
    // find the note to be updated
    const {title, description,tag} = req.body;
    let note = await Note.findById(req.params.id) 
    if(!note){(res.status(404).send('Not found'))}
    if(note.user.toString()!==req.user.id){
        res.status(404).send('Not Found')
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.send({"success":"note has been deleted",note:note});
})
module.exports= router