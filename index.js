const express = require('express')
const server = express()
const shortid = require('shortid')
const { json } = require('express')

server.use(express.json())

let resource = [
    {
        id: shortid.generate(), // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
      }
]

server.get("/api/users", (req, res) => {
   try{ res.status(200).json({data: resource})}
   catch{res.status(500).json({ errorMessage: "The users information could not be retrieved." })}
})

server.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id)
    let found = resource.find(data => data.id === id)
    
    try{
    if (found){
        res.status(200).json({data: resource.id})
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist." })
    }}
    catch{res.status(500).json({ errorMessage: "The user information could not be retrieved." })}
})

server.post("/api/users", (req,res) => {
    const newResource = req.body
    const newName = newResource.name
    const newBio = newResource.bio
    // resource.push(newResource)
    // res.status(201).json({data: resource})
    try {if(newName === "" || newBio === "" ){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
    }else{
        resource.push(newResource)
        res.status(201).json({data: resource})
    }}
    catch {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
})

server.put("/api/users/:id", (req,res) => {
    const id = Number(req.params.id)
    const change = req.body
    const newName = change.name
    const newBio = change.bio
    let found = resource.find(data => data.id === id)

    try{
    if (found){
        Object.assign(found, change)
        res.status(200).json(found)
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist." })
    }

    if(newName === "" || newBio === "" ){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user."})}}
        catch{res.status(500).json({ errorMessage: "The user information could not be modified." })}
})

server.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id)
    resource = resouce.filter(data => data.id !== id)
    let found = resource.find(data => data.id === id)

    try{
    if(!found){
        res.status(404).json({message: "The user with the specified ID does not exist." })
    }

    res.status(200).json(resource)}
    catch{res.status(500).json({ errorMessage: "The user could not be removed" })}
})

const port = 9000

server.listen(port, () => console.log('server is up on 9000'))