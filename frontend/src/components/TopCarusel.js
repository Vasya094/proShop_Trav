import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux"
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listTopProducts } from '../actions/productActions'


const TopCarusel = () => {
  const dispatch = useDispatch()

  const caruselTop = useSelector((state) => state.caruselTop);
  const { loading, error, products } = caruselTop;
  useEffect( () => {
    dispatch(listTopProducts())
  }, [dispatch])
  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
    <Carousel pause="hover" className="bg-dark">
      {products.map(product =>( 
        <Carousel.Item key={product._id}>
          <Link to={`/product/${ product._id }`}>
            <Image src={product.image} alt={product.name} fluid></Image>
            <Carousel.Caption className="carousel-caption">
              <h2>{product.name} ({product.price})</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ) )}
    </Carousel>
  )
}

export default TopCarusel
