import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  console.log(keyword);
  console.log(page);
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove()
    res.json({message: 'Product removed'})
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
} );
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product( {
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description'
  } )
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
} );
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } = req.body;
  const product = await Product.findById( req.params.id )
  if ( product )
  { 
    product.name = name
    product.price = price
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.description = description

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else
  {
    res.status( 404 )
    throw new Error('Product not found')
  }
  
});
export const reviewProduct = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById( req.params.id )
  if ( product )
  { 
    const alreadyReviewed = product.reviews.find( r => r.user.toString() === req.user._id.toString() )
    if ( alreadyReviewed )
    {
      res.status( 400 )
      throw new Error('The product already reviewed')
    }

    const rewiev = {
      name: req.user.name,
      rating: Number( rating ),
      comment,
      user: req.user._id
    }
    product.reviews.push( rewiev )
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce( ( acc, item ) => item.rating + acc, 0 ) / product.reviews.length
    await product.save()
    res.status(201).json({message: 'Review added'})
  } else
  {
    res.status( 404 )
    throw new Error('Product not found')
  }
  
});
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find( {} ).sort( { rating: -1 } ).limit( 3 )
  res.json(products)
});


