const express = require('express')
const mongoose = require('mongoose')
// const router = express.Router()
const path = require('path');
const ejs = require('ejs')
// const multer = require('multer')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect('mongodb+srv://manuel123:manuel123@cluster0.m5ysuwy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection error', err);
});
// mongoose.connect('mongodb+srv://manuelviotor:bRl3TIANe3IP15NO@cluster0.rtbh7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',).then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Connection error', err);
// });
// mongoose.connect('mongodb+srv://manuelviotor:bRl3TIANe3IP15NO@cluster0.rtbh7.mongodb.net/',).then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Connection error', err);
// });
// mongoose.connect('mongodb://localhost:27017/products',)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     }).catch(err => {
//     console.error('Connection error', err);
// });

// Schemas
const productSchema = {
    productName: String,
    rating: Number,
    price: Number,
    
    description: String
    // imageUrl: String
};

const messageSchema = {
    name: String,
    email: String,
    subject: String,
    message: String
};

const Product = mongoose.model('Product', productSchema);
const Message = mongoose.model('Message', messageSchema);

app.get('/', (req, res) => {
    res.render('index', {title: "EuroAfrica | Tantra "})
})

app.get('/about', (req, res) => {
    res.render('about', {title: "About Us"});
});

app.get('/services', (req, res) => {
    res.render('services', {title: "Services"});
});

app.get('/products', (req, res) => {
    Product.find()
        .then(products => {
            res.render('products', { products, title: "Products"})
        })
    // res.render('events');
});

app.get('/products/:id', (req, res) => {
    const id = req.params.id
    Product.findById(id)
        .then(result => {
            res.render('details', { product: result, title: "Product Details" });
        })
        .catch(err => {
            console.log(err)
        })
});


app.post('/products', (req, res) => {
    const product = new Product(req.body)

    product.save()
        .then(result => {
            res.redirect('/products');
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/manage', (req, res) => {
    res.render('manage', {title: "Manage products"});
});

// Delete Product 
app.delete('/products/:id', (req, res) => {

    Product.findByIdAndDelete(req.params.id)
    .then(result => {
        res.json( {redirect: '/products'} )
    })
    .catch(err => console.log(err))
})
app.get('/contact', (req, res) => {
    res.render('contact', {title: "Contact Us"});
});

app.post('/contact', (req, res) => {
    const message = new Message(req.body)

    message.save()
        .then(result => {
            res.redirect('/contact');
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/messages', (req, res) => {
    Message.find()
        .then(messages => {
            res.render('messages', { messages, title: "Messages"})
        })
});

// const eventsRouter = require('./routes/events');
// app.use('/events', eventsRouter);

app.use((req, res) => {
    res.status(404).render('404', {title: "404"});
});

const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});