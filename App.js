const express = require("express");
const mysql = require("mysql2");


const app = express();
app.use(express.json()); 

// Configure MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123000",
    database: "library"
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.log("Error connecting to MySQL:", err);
    }
});

// Add a new book
app.post("/books", (req, res) => {
    const { id, name, title } = req.body;
    const query = "INSERT INTO books (id, name, title) VALUES (?, ?, ?)";
    
    connection.query(query, [id, name, title], (err) => {
        if (err) {
            return res.status(500).json({ error: "Error adding new book", details: err.message });
        }
        res.status(201).json({ message: "Book has been added" });
    });
});

// Get all books
app.get("/books", (req, res) => {
    const query = "SELECT * FROM books";
    
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the books", details: err.message });
        }
        res.json(results);
    });
});

// Get book by ID
app.get("/books/:id", (req, res) => {
    const query = "SELECT * FROM books WHERE id = ?";
    
    connection.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the book", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(results[0]);
    });
});

// Update book by ID
app.put("/books/:id", (req, res) => {
    const { name, title } = req.body;
    const query = "UPDATE books SET name = ?, title = ? WHERE id = ?";
    
    connection.query(query, [name, title, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error updating the book", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book has been updated" });
    });
});

// Delete book by ID
app.delete("/books/:id", (req, res) => {
    const query = "DELETE FROM books WHERE id = ?";
    
    connection.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error deleting the book", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book has been deleted" });
    });
});

// Update translation by book ID
app.patch("/books/:id/translation", (req, res) => {
    const { language } = req.body; // Fixed typo

    if (!language || typeof language !== "string") {
        return res.status(400).json({ error: "Invalid or missing language" });
    }

    const query = "UPDATE books SET title = CONCAT(title, ' - (', ?, ')') WHERE id = ?";
    
    connection.query(query, [language, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error updating translation", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book translation has been updated" });
    });
});

// Add a new author
app.post("/authors", (req, res) => {
    const { name, country } = req.body;
    const query = "INSERT INTO authors (name, country) VALUES (?, ?)";
    
    connection.query(query, [name, country], (err) => {
        if (err) {
            return res.status(500).json({ error: "Error adding new author", details: err.message });
        }
        res.status(201).json({ message: "Author has been added" });
    });
});
/* books */

// Get all authors
app.get("/authors", (req, res) => {
    const query = "SELECT * FROM authors";
    
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving authors", details: err.message });
        }
        res.json(results);
    });
});


// Get author by ID
app.get("/authors/:id", (req, res) => {
    const query = "SELECT * FROM authors WHERE id = ?";
    
    connection.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the author", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Author not found" });
        }
        res.json(results[0]);
    });
});

// Update author by ID
app.put("/authors/:id", (req, res) => {
    const { name, country } = req.body;
    const query = "UPDATE authors SET name = ?, country = ? WHERE id = ?";
    
    connection.query(query, [name, country, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error updating the author", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Author not found" });
        }
        res.status(200).json({ message: "Author has been updated" });
    });
});

// Delete author by ID
app.delete("/authors/:id", (req, res) => {
    const query = "DELETE FROM authors WHERE id = ?";
    
    connection.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error deleting the author", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Author not found" });
        }
        res.status(200).json({ message: "Author has been deleted" });
    });
});
/* author */






/* bookshop */



// Get bookshop by ID
app.get("/bookshops/:id", (req, res) => {
    const query = "SELECT * FROM bookshop WHERE shop_id = ?";
    
    connection.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the bookshop", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.json(results[0]);
    });
});

// Get all cities
app.get("/bookshops/cities", (req, res) => {
    const query = "SELECT DISTINCT city FROM bookshop";
    
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving cities", details: err.message });
        }
        res.json(results);
    });
});

// Get bookshop by name
app.get("/bookshops/name/:name", (req, res) => {
    const query = "SELECT * FROM bookshop WHERE name = ?";
    
    connection.query(query, [req.params.name], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the bookshop", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.json(results[0]);
    });
});

// Get bookshop by email
app.get("/bookshops/email/:email", (req, res) => {
    const query = "SELECT * FROM bookshop WHERE email = ?";
    
    connection.query(query, [req.params.email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving the bookshop", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.json(results[0]);
    });
});


// Update bookshop name
app.put("/bookshops/:id/name", (req, res) => {
    const { name } = req.body;
    const query = "UPDATE bookshop SET name = ? WHERE shop_id = ?";
    
    connection.query(query, [name, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error updating the bookshop name", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.status(200).json({ message: "Bookshop name has been updated" });
    });
});

// Update bookshop email
app.put("/bookshops/:id/email", (req, res) => {
    const { email } = req.body;
    const query = "UPDATE bookshop SET email = ? WHERE shop_id = ?";
    
    connection.query(query, [email, req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error updating the bookshop email", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.status(200).json({ message: "Bookshop email has been updated" });
    });
});

// Add a new bookshop
app.post("/bookshops", (req, res) => {
    const { city, name, contactNumber, email, Address } = req.body;
    const query = "INSERT INTO bookshop (city, name, contactNumber, email, Address) VALUES (?, ?, ?, ?, ?)";
    
    connection.query(query, [city, name, contactNumber, email, Address], (err) => {
        if (err) {
            return res.status(500).json({ error: "Error adding new bookshop", details: err.message });
        }
        res.status(201).json({ message: "Bookshop has been added" });
    });
});

// Add only one bookshop (unique)
app.post("/bookshops/unique", (req, res) => {
    const { city, name, contactNumber, email, Address } = req.body;

    // Check if a bookshop with the same name or email already exists
    const query = "SELECT * FROM bookshop WHERE name = ? OR email = ?";
    
    connection.query(query, [name, email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error checking for existing bookshop", details: err.message });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: "A bookshop with this name or email already exists" });
        }

        // Insert the new bookshop
        const insert = "INSERT INTO bookshop (city, name, contactNumber, email, Address) VALUES (?, ?, ?, ?, ?)";
        
        connection.query(insert, [city, name, contactNumber, email, Address], (err) => {
            if (err) {
                return res.status(500).json({ error: "Error adding new bookshop", details: err.message });
            }
            res.status(201).json({ message: "Unique bookshop has been added" });
        });
    });
});

// Delete bookshop by ID
app.delete("/bookshops/:id", (req, res) => {
    const query = "DELETE FROM bookshop WHERE shop_id = ?";
    
    connection.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error deleting the bookshop", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Bookshop not found" });
        }
        res.status(200).json({ message: "Bookshop has been deleted" });
    });
});





// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server has been started on http://localhost:${port}`);
});