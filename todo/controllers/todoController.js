const bodyParser = require('body-parser');
const { data } = require('jquery');
const mongoose = require('mongoose');
//connect to the database
mongoose.connect('mongodb://vaidehip:Yp29icPv1934B90g7Lhu@15.206.7.200:28017/vaidehip?authMechanism=DEFAULT&authSource=admin');
//create a schema - this is like blueprint
const todoSchema = new mongoose.Schema({
    item: String
});
const Todo = mongoose.model('todo', todoSchema);
// const itemOne = Todo({item: 'buy flowers'}).save((err) => {
//     if(err) throw err;
//     console.log('item saved');
// });
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// const data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding'}];
module.exports = (app) => {
    app.get('/todo', (req, res) => {
        // get data from mongodb and pass it to view
        Todo.find({}, (err, data) => {
            if (err) throw err;
            res.render('todo', { todos: data });
        });
    });
    app.post('/todo', urlencodedParser, (req, res) => {
        // get data from the view and add it to mongodb
        const newTodo = Todo(req.body).save((err, data) => {
            if (err) throw err;
            res.json(data);
            console.log(data);
        });
        // data.push(req.body);
        // res.json(data);
    });
    app.delete('/todo/:item', (req, res) => {
        Todo.find({
            item: req.params.item.replace(/\-/g, " ")
        }).remove((err, data) => {
            if (err) throw err;
            res.json(data);
        })
    });
};