const express = require('express')
const authentication = require('../middleware/authentication')
const Note = require('../models/Note')

const router = express.Router()

router.get('/allnotes',authentication ,async(req,res)=>{
    try{ 
        let notes = await Note.find({user: req.user.id})
        res.json(notes)
    }catch{
        res.status(500).json({message: "internal server error"})
    }
})

router.post('/addnotes',authentication, async(req,res)=>{
    try{
        const {title,description,tag} = req.body
        let notes = new Note({
            title,description,tag,user:req.user.id
        })
        const data = await notes.save()
        res.status(200).send(data)
    }catch{
        res.status(500).json({message: "internal server error"})
    }
})

router.put('/updatenotes/:id',authentication,async(req,res)=>{
    try{
        const {title,description,tag} = req.body
        const newNotes = {}
        if(title){newNotes.title = title }
        if(description){newNotes.description = description }
        if(tag){newNotes.tag = tag }
       
        let notes = await Note.findById(req.params.id)
        console.log(notes);
        if(!notes){
           return res.status(404).json({message: "Page not Found"})
        }
        if(notes.user.toString() !== req.user.id){
          return  res.status(401).send("Not Allowed")
        }
        notes = await Note.findByIdAndUpdate(req.params.id, {$set:newNotes}, {new:true})
        res.status(200).json({notes})

    }catch{
        res.status(500).json({message: "internal server error"})
    }
})

router.delete('/deletenotes/:id',authentication,async(req,res)=>{
    try{
        let notes = await Note.findById(req.params.id)
        if(!notes){
           return res.status(404).json({message: "Page not Found"})
        }
        if(notes.user.toString() !== req.user.id){
          return  res.status(401).send("Not Allowed")
        }
        notes = await Note.findByIdAndDelete(req.params.id)
        res.status(200).json("Note has been deleted successfully")
    }catch{
        res.status(500).json({message: "internal server error"})
    }   
})




module.exports = router