const utils = require('./utils')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
app.use(express.json());
app.use(cors())


const tasks = utils.initialTasks();
let character = utils.initialCharacter();
app.post('/character/create', (req, res) => {
    if (!req.body.name) {
        res.status(400).send('Name is mandatory');
    }
    if (!req.body.level) {
        res.status(400).send('level is mandatory');
    }
    if (!req.body.exp) {
        res.status(400).send('exp is mandatory');
    }
    if (!req.body.needed) {
        res.status(400).send('needed is mandatory');
    }
    if (!req.body.image) {
        res.status(400).send('image is mandatory');
    }
    if (character.name) {
        res.status(400).send('Character already exists');
    }
    character = {
        name: req.body.name,
        level: req.body.level,
        exp: req.body.exp,
        needed: req.body.needed,
        image: req.body.image,
    };

    res.status(200).send(character);
    console.log(character);
});

app.post('/mission/:id/done', (req, res) => {
    const doneTask = tasks.find(task => task.id === req.params.id)

    if (!doneTask || doneTask.status !== 'toBeDone'){
        res.status(400).send('Id not found');
    } else {
        const index = tasks.findIndex(task => task.id === req.params.id);
        tasks[index].status = 'done';
        character = utils.characterExp(character, doneTask.exp);
        console.log('teste ', character)
        res.status(200).send(character);
    }
})

app.post('/mission/:id/delete', (req, res) => {
    const doneTask = tasks.find(task => task.id === req.params.id)

    console.log('OLHA O ID: ', req.params.id)
    console.log('OLHA AS TASKS: ', tasks)

    if (!doneTask || doneTask.status !== 'toBeDone'){
        res.status(400).send('Id not found');
    } else {
        const index = tasks.findIndex(task => task.id === req.params.id);
        tasks[index].status = 'deleted';
        res.status(200).send('deleted');
    }
})


app.post('/mission/create', (req, res) => {
    if(req.body.period !== 'daily' && req.body.period !== 'weekly') {
        res.status(400).send('Incorrect value for period');
    }
    if (!req.body.name){
        res.status(400).send('Name is mandatory');
    }
    if (!req.body.exp){
        res.status(400).send("Exp is mandatory and can't be 0");
    }

    const newTask = {
        name: req.body.name,
        period: req.body.period,
        exp: req.body.exp,
        id: `${tasks.length + 1}`,
        status: 'toBeDone'
    }

    tasks.push(newTask);

    res.status(200).send(newTask)
})

app.get('/mission/getAll', (req, res) => {
    const filteredTasks = tasks.filter(task => task.status === 'toBeDone')
    res.status(200).send(filteredTasks)
})

app.get('/character', (req, res) => {
    res.status(200).send(character)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
