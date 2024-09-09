import { Router } from 'express';

const router = Router();


//route to send products info 
router.get("/productos", (req, res) => {
    const { query, rating, category, sortPrice } = req.query;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imageUrl = new URL('/images/WinePlaceholder.webp', baseUrl).href;
    
    let productos = [
        { Id: 1, Title: "Vino Chardonnay blanco", Price: 100454, ImgUrl: imageUrl, Rating: 4, Type: "Chardonnay" },
        { Id: 2, Title: "Vino Chardonnay", Price: 150454, ImgUrl: imageUrl, Rating: 4.5, Type: "Chardonnay" },
        { Id: 3, Title: "Vino Semillon", Price: 120454, ImgUrl: imageUrl, Rating: 4.9, Type: "Semillon" },
        { Id: 4, Title: "Vino Viogner", Price: 510454, ImgUrl: imageUrl, Rating: 2.3, Type: "Viogner" },
        { Id: 5, Title: "Vino Semillon", Price: 320454, ImgUrl: imageUrl, Rating: 3.9, Type: "Semillon" },
        { Id: 6, Title: "Vino Viogner", Price: 230454, ImgUrl: imageUrl, Rating: 1.2, Type: "Viogner" },
        { Id: 7, Title: "Vino Viogner", Price: 230454, ImgUrl: imageUrl, Rating: 4.8, Type: "Viogner" },
    ];

    // Filter by search query
    if (query) {
        productos = productos.filter(p => p.Title.toLowerCase().includes(query.toLowerCase()));
    }

    // Filter by rating
    if (rating) {
        if (rating === '5') productos = productos.filter(p => p.Rating >= 4.5);
        if (rating === '4') productos = productos.filter(p => p.Rating >= 3.5 && p.Rating < 4.5);
        if (rating === '3') productos = productos.filter(p => p.Rating >= 2.5 && p.Rating < 3.5);
        if (rating === '2') productos = productos.filter(p => p.Rating >= 1.5 && p.Rating < 2.5);
        if (rating === '1') productos = productos.filter(p => p.Rating < 1.5);
    }
    // Filter by category   
    if (category && category !== '') {
        productos = productos.filter(p => p.Type === category);
    }


    // Sort by price
    if (sortPrice === 'lowToHigh') {
        productos = productos.sort((a, b) => a.Price - b.Price);
    } else if (sortPrice === 'highToLow') {
        productos = productos.sort((a, b) => b.Price - a.Price);
    }
    res.json(productos);
});

//route to send Type of wine
router.get("/productos/type", (req, res) => {
    const Type = [
        {Id: 1, Name:"Chardonnay"},
        {Id: 2, Name:"Sauvignon Blanc"},
        {Id: 3, Name:"Semillon"},
        {Id: 4, Name:"Viognier"},
        {Id: 5, Name:"Pinot Grigio"},
        {Id: 6, Name:"Gewürztraminer"},
        {Id: 7, Name:"Malbec"},
        {Id: 8, Name:"Cabernet franc"},
        {Id: 9, Name:"Cabernet Sauvignon"},
        {Id: 10, Name:"Tempranillo"},
        {Id: 11, Name:"Syrah"},
        {Id: 12, Name:"Merlot"},
        {Id: 13, Name:"Pinot noir"},
        {Id: 14, Name:"Bonarda"},
        {Id: 15, Name:"Ancellotta"},
        {Id: 16, Name:"Petit Verdot"}
        
    ];
    res.json(Type);
})
export default router;