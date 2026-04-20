const express = require('express');
const methodOverride = require('method-override');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let tasks = [
    { id: 1, title: "complete your sleep 8 hours" },
    { id: 2, title: "wake up fresher" }
];

app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.post('/tasks', (req, res) => {
    if (req.body.title) {
        const newTask = { id: Date.now(), title: req.body.title };
        tasks.push(newTask);
    }
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (task) {
        res.render('edit', { task });
    } else {
        res.redirect('/');
    }
});

app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (task) {
        task.title = req.body.title;
    }
    res.redirect('/');
});

app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});