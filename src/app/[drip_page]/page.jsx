"use client"

import { useParams } from 'next/navigation'
import React, { use, useContext, useEffect, useState } from 'react'
import { black_start, extended_drip_array, finger, plus, size, size_array } from '../../../public/imports';
import Image from 'next/image';
import { FlagContext } from '../contexts/flagcontext';
import DripCard from '../components/drip_card';
import { useCart } from '../contexts/cart_context';
import Loader from '../components/loader';

export default function DripSlug() {
  const params = useParams();
  const { location } = useContext(FlagContext);
  const [merch_quantity, setMerchQuantity] = useState(1);
  const [selected_size, setSelectedSize] = useState({ index: null, size: null })
  const { cart, addToCart, setShowCart } = useCart();
  const [show_cart_panel, setShowCartPanel] = useState(false);
  const [loader, setLoader] = useState(false);
  const [blackBorder, setBlackBorder] = useState({
    image_one: true,
    image_two: false,
    image_three: false,
    image_four: false
  })
  const [deets, showDeets] = useState({
    deets1: false,
    deets2: false,
    deets3: false
  });
  const image_object = extended_drip_array.find(image => image.id === parseInt(params.drip_page))
  const reviews = [
    { rating: 4, comments: "Great merchandise, quality is good, threading was excellent.", client_name: "Jared Padalecki" },
    { rating: 4, comments: "Great merchandise, quality is good, threading was excellent.", client_name: "Jensen Ackles" },
    { rating: 4, comments: "Great merchandise, quality is good, threading was excellent.", client_name: "Castiel Uriel" },
    { rating: 4, comments: "Great merchandise, quality is good, threading was excellent.", client_name: "Crowley Fichtner" }
  ]


  useEffect(() => {
    const existing_product = cart.find(item => item.id === image_object.id && item.size === selected_size.size)
    if (existing_product) {
      setMerchQuantity(existing_product.quantity)
    }
  }, [cart])

  useEffect(() => {
    const existing_product = cart.find(item => item.id === image_object.id)
    if (existing_product) {
      setSelectedSize(prev => ({...prev, size: existing_product.size, index: size_array.indexOf(existing_product.size)}))
      setMerchQuantity(existing_product.quantity)
    }
  }, [])

  const [main_image, setMainImage] = useState(image_object.image);


  const handleQuantity = (operation) => {
    if (!selected_size.size) {
      setShowCartPanel(true)
      setTimeout(() => {
        setShowCartPanel(false)
      }, 3000);
      return;
    }
    operation === "add" ? setMerchQuantity(prev => prev + 1) : setMerchQuantity(prev => Math.max(prev - 1, 1))
  }

  const handleAddToCart = (options) => {
    if (!options) {
      setShowCartPanel(true)
      setTimeout(() => {
        setShowCartPanel(false)
      }, 3000);
      return;
    }
    setLoader(true);
    setTimeout(() => {
      setLoader(false)
      addToCart({ drip_image: image_object.image, product_name: image_object.product_name, product_price: image_object.product_price, id: image_object.id, size: selected_size.size, quantity: merch_quantity }, "add")
      setShowCart(true)
    }, 1500);
  }

  const changeBorder = (img, imgSrc) => {
    setBlackBorder(prevState => {
      if (prevState[img]) return prevState;

      const newState = {};
      Object.keys(prevState).forEach(key => {
        newState[key] = key === img
      })
      return newState;
    });
    setMainImage(image_object[imgSrc])
  }

  return (
    <div className='drip_page_main'>
      <div className="drip_page_container">
        <div className='container-one'>
          <div className='one-images'>
            <div className='carousel_images'>
              <Image src={image_object.image} width={100} height={100} alt='drip_image' unoptimized className={blackBorder.image_one ? "black-border" : ""} onClick={() => changeBorder("image_one", "image")} />
              <Image src={image_object.image2} width={100} height={100} alt='drip_image' unoptimized className={blackBorder.image_two ? "black-border" : ""} onClick={() => changeBorder("image_two", "image2")} />
              <Image src={image_object.image} width={100} height={100} alt='drip_image' unoptimized className={blackBorder.image_three ? "black-border" : ""} onClick={() => changeBorder("image_three", "image")} />
              <Image src={image_object.image2} width={100} height={100} alt='drip_image' unoptimized className={blackBorder.image_four ? "black-border" : ""} onClick={() => changeBorder("image_four", "image2")} />
            </div>

            <div className='main_image'>
              <Image src={main_image} width={100} height={100} alt='drip_image' unoptimized />
            </div>
          </div>

          <div className='one-detail'>
            <div className="div_one">
              <h2>{image_object.product_name}</h2>
              <div className="reviews">
                <div className="stars">
                  {
                    [...Array(4)].map((_, i) => (
                      <Image src={black_start} width={100} height={100} alt='black_star' key={i} />
                    ))
                  }
                </div>
                <p>4 Reviews</p>
              </div>
              <p className='price'>{`${location.currency} ${image_object.product_price*merch_quantity}`}</p>
              <p className='vat'>Inclusive VAT *</p>
            </div>

            <div className="two-detail">
              <div className="p">
                <p>SIZE</p>
                {
                  show_cart_panel && (
                    <div className="size_alert">
                      <div className="thumbs-down">
                        <Image src={finger} width={20} height={20} alt='finger-svg' className='floating' />
                      </div>
                      Please select size.
                    </div>
                  )
                }
                <div className='size-guide'>
                  <Image src={size} width={20} height={20} alt='size' />
                  <a href='https://www.spocket.co/blogs/uk-to-us-size-conversion-guide?srsltid=AfmBOootv1brqzwvIMXwOZRTrP8fINfNQomqtY3xLNdd5p-jHyvPRDoe' target='_blank' rel='noopener noreferrer'><p>size guide</p></a>
                </div>
              </div>
              <div className="sizes">
                {
                  size_array.map((item, index) => (
                    <p key={`drip_sizes${index}`} onClick={() => setSelectedSize(prev => ({ ...prev, index: index, size: item }))} className={selected_size.index === index ? "black-border" : ""}>{item}</p>
                  ))
                }
              </div>
              <div className="color">
                <p className='color-p'>Color: <span>Black</span></p>
                <div className='color-span'><span></span></div>
              </div>
              <div className="quantity">
                <h4>Quantity</h4>
                <div className="qtty">
                  <span onClick={() => handleQuantity("add")}>+</span>
                  <p>{merch_quantity}</p>
                  <span onClick={() => handleQuantity("minus")}>-</span>
                </div>
              </div>
              <div className="add_to_cart">
                <button onClick={() => handleAddToCart(selected_size.index)}>{loader ? <Loader /> : <>Add to Cart</>}</button>
              </div>
              <div className="one-details">
                <h4>Description</h4>
                <p className='description-container-two'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti atque esse nemo amet facere asperiores doloremque quae omnis natus, dolor incidunt. Quidem adipisci dolorum est ipsam illum voluptatum dolorem ipsum explicabo voluptatibus ut? Corporis asperiores accusamus, magni impedit fugit qui officia quo molestiae temporibus quod alias harum aliquid odit earum!</p>
                <div className="shipping-details">
                  <div className="case">
                    <div className="case_title">
                      <p>UK SHIPPING</p>
                      <Image src={plus} width={20} height={20} alt='plus' style={{ cursor: "pointer" }} onClick={() => showDeets(prevDeets => ({
                        ...prevDeets,
                        deets1: !prevDeets.deets1
                      }))} />
                    </div>
                    <p className={deets.deets1 ? "deets showdeets" : "deets"}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui deserunt laborum cum quas officiis, minus nesciunt sapiente quia delectus fugit et temporibus distinctio, aut maiores?
                    </p>
                  </div>

                  <div className="case">
                    <div className="case_title">
                      <p>INTERNATIONAL SHIPPING</p>
                      <Image src={plus} width={20} height={20} alt='plus' style={{ cursor: "pointer" }} onClick={() => showDeets(prevDeets => ({
                        ...prevDeets,
                        deets2: !prevDeets.deets2
                      }))} />
                    </div>
                    <p className={deets.deets2 ? "deets showdeets" : "deets"}  >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui deserunt laborum cum quas officiis, minus nesciunt sapiente quia delectus fugit et temporibus distinctio, aut maiores?
                    </p>
                  </div>

                  <div className="case" style={{ borderBottom: "1px solid rgb(223, 223, 223)", paddingBottom: "1rem" }}>
                    <div className="case_title">
                      <p>RETURNS</p>
                      <Image src={plus} width={20} height={20} alt='plus' style={{ cursor: "pointer" }} onClick={() => showDeets(prevDeets => ({
                        ...prevDeets,
                        deets3: !prevDeets.deets3
                      }))} />
                    </div>
                    <p className={deets.deets3 ? "deets showdeets" : "deets"}  >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui deserunt laborum cum quas officiis, minus nesciunt sapiente quia delectus fugit et temporibus distinctio, aut maiores?
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className='container-two'>

          <div className="container-two-one">
            <p>You may also like: </p>
            <div className="cards">
              {
                extended_drip_array.slice(0, 4).map((item, index) => (
                  <DripCard id={item.id} drip_image={item.image} product_name={item.product_name} product_price={item.product_price} index={index} key={`drip_card_component${index}`} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
