const express = require('express');
const app = express();
const path = require('path');
const { v4:uuid } = require('uuid');
const methodOverride = require('method-override');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// dataBase of Blogs
let blogs = [
    {
        id:uuid(),
        title:'Nature and Us',
        author: 'sandeep',
        img: 'https://images.unsplash.com/photo-1488543882437-49f6f714ad05?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quis doloremque repudiandae, qui, sapiente dolor esse officiis possimus nihil deserunt nam adipisci ullam accusamus? Nisi illo perferendis tempore architecto eligendi.'
    },
    {
        id:uuid(),
        title:'Dolphins',
        author: 'abhishek',
        img: 'https://images.unsplash.com/photo-1517584623449-78bf7667d0f6?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quis doloremque repudiandae, qui, sapiente dolor esse officiis possimus nihil deserunt nam adipisci ullam accusamus? Nisi illo perferendis tempore architecto eligendi.'
    },
    {
        id:uuid(),
        author: 'sourav',
        title:'Spring',
        img: 'https://images.unsplash.com/photo-1617030638526-6aa64eb58c4d?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQwfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quis doloremque repudiandae, qui, sapiente dolor esse officiis possimus nihil deserunt nam adipisci ullam accusamus? Nisi illo perferendis tempore architecto eligendi.'

    },
    {
        id:uuid(),
        title:'Kashmir',
        author: 'Gourav',
        img: 'https://images.unsplash.com/uploads/141327328038701afeede/eda0fb7c?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDcwfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quis doloremque repudiandae, qui, sapiente dolor esse officiis possimus nihil deserunt nam adipisci ullam accusamus? Nisi illo perferendis tempore architecto eligendi.'

    }
]

// display all the blogs
app.get('/blogs',(req,res)=>{
    res.render('home',{blogs});
})

// create a new blog
app.get('/blogs/new',(req,res)=>{
    res.render('new');
})

app.post('/blogs',(req,res)=>{
    const {title,img,author,text} = req.body;
    blogs.push({title,img,author,text,id:uuid()});
    res.redirect('/blogs');
})


// edit a blog
app.get('/blogs/:id/edit',(req,res)=>{
    const {id} = req.params;
    const blog = blogs.find(c => c.id === id);
    res.render('edit',{foundBlog:blog});
})

// update a blog
app.patch('/blogs/:id',(req,res)=>{

    const {id} = req.params;
    const foundBlog = blogs.find(c => c.id === id);
    const {title,img,text} = req.body;
    foundBlog.title = title;
    foundBlog.img = img;
    foundBlog.text = text;

    res.redirect('/blogs');
})

// delete a blog
app.delete('/blogs/:id',(req,res)=>{
    const {id} = req.params;
    const temp = blogs.filter(c => c.id !== id);
    blogs = temp;
    res.redirect('/blogs');
})

app.listen(3000,()=>{
    console.log('server started at port 3000');
})