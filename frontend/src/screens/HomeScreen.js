import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Col, Row } from 'react-bootstrap'
//import products from '../products.js'
import { Link } from 'react-router-dom';
import Product from "../components/Product"
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Paginate } from '../components/Paginate'
import TopCarusel from '../components/TopCarusel'
import {Helmet} from "react-helmet";
import Meta from '../components/Meta'

const HomeScreen = ( props ) => {
  const keyword = props.match.params.keyword
  const pageNumber = props.match.params.pageNumber || 1
  console.log(pageNumber)
  
  const dispatch = useDispatch()
  
  const productList = useSelector( state => (state.productList) )
  
  const { loading, error, products, page, pages } = productList

  useEffect( () => {
    debugger
    dispatch( listProducts( keyword, pageNumber ) )
    
  }, [ dispatch, keyword, pageNumber] )
  return (
    <>
      <Meta />
      {!keyword ? <TopCarusel /> : <Link to="/" className="btn btn-light">Go back</Link>}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : products.length === 0 ? (
        <Message variant='danger'>Sorry, Not found</Message>
      ) : (
              <>
              
                <Row>
                  {products.map( ( product ) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ) )}
                </Row>
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
              </>
            )
      } </>
  );
}

export default HomeScreen
