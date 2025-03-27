const { Router } = require("express");
const router = Router();
const CartController = require("../controllers/CartController")
const ProductController = require("../controllers/ProductController");
const UserController = require("../controllers/UserController");
const CartItemController = require('../controllers/CartItemController');

//authentication 

router.post("/user", UserController.create);
router.get("/user/:id", UserController.show); 
router.get("/user", UserController.index); 
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.destroy);

router.post("/product", ProductController.create);
router.get("/product/:id", ProductController.show); 
router.get("/product", ProductController.index); 
router.put("/product/:id", ProductController.update);
router.delete("/product/:id", ProductController.destroy);

router.post("/cart", CartController.create);  
router.get("/cart/:id", CartController.show); 
router.get("/cart", CartController.index); 
router.put("/cart/:id", CartController.update);
router.delete("/cart/:id", CartController.destroy);

router.post('/items', CartItemController.create);
router.get('/items/:id', CartItemController.list);
router.get('/itemsUserCart/:id', CartItemController.getItemsByCartId);
router.put('/items/:id', CartItemController.update);


module.exports = router;