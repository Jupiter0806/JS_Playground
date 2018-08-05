/**
 * May create a query generator as to type a query is so easy to include syntax errors
 */

const Client = require('mariasql')

const Connection = new Client({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    db: 'my_test'
})


/**
 * Create database, case-insensitive
 */
// Connection.query('CREATE DATABASE my_test', error => {
//     if (error) {
//         throw error
//     }
//     Connection.query("SHOW DATABASES", null, { useArray: true }, (error, rows) => {
//         if (error) {
//             throw error
//         }
//         console.dir(rows)
//     })
// })

/**
 * Drop database
 */
// Connection.query('DROP DATABASE MY_TEST', error => {
//     if (error) {
//         throw error
//     }
//     Connection.query("SHOW DATABASES", null, { useArray: true }, (error, rows) => {
//         if (error) {
//             throw error
//         }
//         console.dir(rows)
//     })
// })

/**
 * Create table
 */
// const CreateTableQuery = "CREATE TABLE products(" 
//                             + "product_id INT NOT NULL AUTO_INCREMENT, "
//                             + "product_name VARCHAR(100) NOT NULL, "
//                             + "product_manufacturer VARCHAR(40) NOT NULL, "
//                             + "submission_date DATE, "
//                             + "PRIMARY KEY ( product_id )"
//                             + ")"
// Connection.query(CreateTableQuery, error => {
//     if (error) {
//         throw error
//     }
//     Connection.query("SHOW TABLES", null, { useArray: true }, (error, rows) => {
//             if (error) {
//                 throw error
//             }
//             console.dir(rows)
//     })
// })

/**
 * Drop table 
 */
// Connection.query('DROP TABLE products', error => {
//     if (error) {
//         throw error
//     }
//     Connection.query("SHOW TABLES", null, { useArray: true }, (error, rows) => {
//         if (error) {
//             throw error
//         }
//         console.dir(rows)
//     })
// })

/**
 * Insert row
 */
// const InsertQuery = "INSERT INTO products "
//                         + "(product_name, product_manufacturer) "
//                         + "VALUES "
//                         + "('product_name1', 'product_manufacturer1')"
// Connection.query(InsertQuery, error => {
//     if (error) {
//         throw error
//     }
//     Connection.query('SELECT * FROM products', (error, rows) => {
//         if (error) {
//             throw error
//         }
//         console.dir(rows)
//     })
// })

/**
 * Delete row
 */
// const DeleteQuery = "DELETE FROM products WHERE product_id = 1"
// Connection.query(DeleteQuery, error => {
//     if (error) {
//         throw error
//     }
//     Connection.query('SELECT * FROM products', (error, rows) => {
//         if (error) {
//             throw error
//         }
//         console.dir(rows)
//     })
// })

/**
 * Update row
 */
// const UpdateQuery = `UPDATE products
//                         SET product_name = "product_name21"
//                         WHERE product_id = 2
//                         `
// Connection.query(UpdateQuery, error => {
//     if (error) {
//         throw error
//     }
//         Connection.query('SELECT * FROM products', (error, rows) => {
//         if (error) {
//             throw error
//         }
//         console.dir(rows)
//     })
// })

/**
 * Transaction
 * 
 * not working
 */ 
    // 
const TransactionQuery = `
    START TRANSACTION;
    SELECT * FROM products;
    INSERT INTO products (product_name, product_manufacturer) VALUES ('product_name4', 'product_manufacturer4');
    UPDATE products SET product_name = 'product_name41' WHERE product_name = 'product_name4';
    COMMIT;
`
Connection.query(TransactionQuery, error => {
    if (error) {
        throw error
    }
    Connection.query('SELECT * FROM products', (error, rows) => {
        if (error) {
            throw error
        }
        console.dir(rows)
    })
})

Connection.end()