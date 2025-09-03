"use client"

import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { arrowright, size_array } from '../../../public/imports';
import Image from 'next/image';
import { FlagContext } from '../contexts/flagcontext';
import DripCard from '../components/drip_card';
import { useCart } from '../contexts/cart_context';
import Loader from '../components/loader';
import supabse_image_path from '@/utils/supabase/supabse_image_path';
import Spinner from '../components/spinner';
import ProductCard from '../components/similar_card';

export default function DripSlug() {
  const params = useParams();
  const { location } = useContext(FlagContext);
  const [merch_quantity, setMerchQuantity] = useState(1);
  const [selected_size, setSelectedSize] = useState({ index: null, size: "M" })
  const { cart, addToCart, setShowCart, product } = useCart();
  const [show_cart_panel, setShowCartPanel] = useState(false);
  const [zoomable, setZoomable] = useState(false);
  const [loader, setLoader] = useState(false);
  const [main_image, setMainImage] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const params_id = parseInt(params.drip_page, 10);
  const router = useRouter();
  const [img_src, setImgSrc] = useState("image_url");
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
  const image_object = product.find(image => image.id === params_id) || null
  const reviews = [
    { rating: 4, comments: "Great merchandise, quality is good, threading was excellent.", client_name: "Jared Padalecki" },
    { rating: 4, comments: "Great merchandise, quality is good, threading was excellent.", client_name: "Jensen Ackles" },
    { rating: 4, comments: "Great merchandise, quality is good, threading was excellent.", client_name: "Castiel Uriel" },
    { rating: 4, comments: "Great merchandise, quality is good, threading was excellent.", client_name: "Crowley Fichtner" }
  ]


  useEffect(() => {
    const existing_product = cart.find(item => item?.id === image_object?.id && item?.size === selected_size.size)
    if (existing_product) {
      setMerchQuantity(existing_product.quantity)
    }
  }, [cart])


  useEffect(() => {
    const existing_product = cart.find(item => item.id === image_object.id)
    if (existing_product) {
      setSelectedSize(prev => ({ ...prev, size: existing_product.size, index: size_array.indexOf(existing_product.size) }))
      setMerchQuantity(existing_product.quantity)
    }
  }, [])

  useEffect(() => {
    if (image_object) {
      setMainImage(image_object.image_url)
      setLoadingProduct(false);
    } else if (product.length > 0) {
      setLoadingProduct(false)
      router.push('/')
    }
  }, [image_object, product])

  useEffect(() => {
    if (zoomable) {
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling
      document.body.style.overflow = '';
    }
    // Cleanup in case the component unmounts while panel is open
    return () => {
      document.body.style.overflow = '';
    }
  }, [zoomable]);





  const handleQuantity = (operation) => {
    // if (!selected_size.size) {
    //   setShowCartPanel(true)
    //   setTimeout(() => {
    //     setShowCartPanel(false)
    //   }, 3000);
    //   return;
    // }
    operation === "add" ? setMerchQuantity(prev => prev + 1) : setMerchQuantity(prev => Math.max(prev - 1, 1))
  }

  const handleAddToCart = (options) => {
    // if (!options) {
    //   setShowCartPanel(true)
    //   setTimeout(() => {
    //     setShowCartPanel(false)
    //   }, 3000);
    //   return;
    // }
    setLoader(true);
    setTimeout(() => {
      setLoader(false)
      addToCart({ drip_image: image_object.image_url, product_name: image_object.name, product_price: image_object.price, id: image_object.id, size: selected_size.size, quantity: merch_quantity }, "add")
      setShowCart(true)
    }, 1500);
  }

  const changeBorder = (img, imgSrc) => {
    setImgSrc(imgSrc)
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

  const img_map = {
    image_url: "image_one",
    image_url2: "image_two",
    image_url3: "image_three",
    image_url4: "image_four"
  }

  const img_array = [image_object?.image_url, image_object?.image_url2, image_object?.image_url3, image_object?.image_url4].filter(Boolean);

  const zoom_image = (operation) => {

    const match = img_src.match(/\d+$/)
    let img_num = match ? parseInt(match[0], 10) : 1
    img_num = operation === "next" ? img_num + 1 : img_num - 1;

    if (img_num < 1) img_num = 1
    if (img_num > 4) img_num = 4

    const dg = img_num === 1 ? 'image_url' : `image_url${img_num}`;
    if (image_object[dg]) {
      setImgSrc(dg)
      changeBorder(img_map[dg], dg)
    }

    // let dg;

    // if (operation === "next") {
    //   const img_num = parseInt(img_src[9], 10) + 1
    //   if (img_num) {
    //     img_num === 5 ? dg = 'image_url4' : dg = 'image_url' + img_num.toString();
    //     setImgSrc(dg)
    //     changeBorder(img_map[dg], dg)
    //   } else {
    //     dg = 'image_url2'
    //     setImgSrc(dg)
    //     changeBorder(img_map[dg], dg)
    //   }
    // } else {
    //   const img_num = parseInt(img_src[9], 10) - 1
    //   if (img_num) {
    //     img_num === 1 ? dg = 'image_url' : dg = 'image_url' + img_num.toString();
    //     setImgSrc(dg)
    //     changeBorder(img_map[dg], dg)
    //   } else {
    //     dg = 'image_url'
    //     setImgSrc(dg)
    //     changeBorder(img_map[dg], dg)
    //   }
    // }
  }


  return (
    <div className='drip_page_main'>
      {
        !loadingProduct && image_object ?
          <div className="drip_page_container">
            <div className='container-one'>
              <div className='one-images'>
                <div className="carousel_images">
                  {
                    image_object && (
                      img_array.map((img, index) => (
                        <div className={blackBorder[Object.keys(blackBorder)[index]] ? "black-border black-border-image" : "black-border-image"} key={`drip_image${index}`} onClick={() => changeBorder(Object.keys(blackBorder)[index], Object.keys(img_map)[index])}>
                          <Image src={img} width={100} height={100} alt='drip_image' unoptimized />
                        </div>
                      ))
                    )
                  }
                </div>
                {/* <div className='carousel_images'>
                  <Image src={image_object.image_url || null} width={100} height={100} alt='drip_image' unoptimized className={blackBorder.image_one ? "black-border black-border-image" : "black-border-image"} onClick={() => changeBorder("image_one", "image_url")} />
                  <Image src={image_object.image_url2 || null} width={100} height={100} alt='drip_image' unoptimized className={blackBorder.image_two ? "black-border black-border-image" : "black-border-image"} onClick={() => changeBorder("image_two", "image_url2")} />
                  <Image src={image_object.image_url3 || null} width={100} height={100} alt='drip_image' unoptimized className={blackBorder.image_three ? "black-border black-border-image" : "black-border-image"} onClick={() => changeBorder("image_three", "image_url3")} />
                  <Image src={image_object.image_url4 || null} width={100} height={100} alt='drip_image' unoptimized className={blackBorder.image_four ? "black-border black-border-image" : "black-border-image"} onClick={() => changeBorder("image_four", "image_url4")} />
                </div> */}

                <div className={!zoomable ? "main_image" : "bigger_main_image"} >
                  {zoomable && <Image src={supabse_image_path('/x.svg')} width={20} height={20} alt='zoom-out' className='zoom-out' onClick={() => setZoomable(false)} />}
                  <Image src={arrowright} width={25} height={25} alt='arrow-right' className='arrowright' id='left' style={!zoomable ? { display: "none" } : { display: "block", transform: "rotate(180deg)" }} onClick={() => zoom_image("prev")} />
                  <Image src={main_image} width={100} height={100} alt='drip_image' unoptimized id={!zoomable ? "" : "img_main"} className={!zoomable ? "zoomable" : "shrinkable"} onClick={() => setZoomable(!zoomable)} />
                  <Image src={arrowright} width={25} height={25} alt='arrow-right' className='arrowright' id='right' style={!zoomable ? { display: "none" } : { display: "block" }} onClick={() => zoom_image("next")} />
                </div>
              </div>

              <div className='one-detail'>
                <div className="div_one">
                  <h2>{image_object.name}</h2>
                  <div className="reviews">
                    <div className="stars">
                      {
                        [...Array(4)].map((_, i) => (
                          <Image src={supabse_image_path('/black_star.svg')} width={100} height={100} alt='black_star' key={i} />
                        ))
                      }
                    </div>
                    <p>4 Reviews</p>
                  </div>
                  <p className='price'>{`£${image_object.price * merch_quantity}`}</p>
                  <p className='vat'>Inclusive VAT *</p>
                </div>

                <div className="two-detail">
                  <div className="p">
                    <p>SIZE</p>
                    {
                      show_cart_panel && (
                        <div className="size_alert">
                          <div className="thumbs-down">
                            <Image src={supabse_image_path('/finger.svg')} width={20} height={20} alt='finger-svg' className='floating' />
                          </div>
                          Please select size.
                        </div>
                      )
                    }
                    <div className='size-guide'>
                      <Image src={supabse_image_path('/size.svg')} width={20} height={20} alt='size' />
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
                    <button onClick={() => handleAddToCart(selected_size.index)}>{loader ? <Spinner /> : <>Add to Cart</>}</button>
                  </div>
                  <div className="one-details">
                    <h4>Description</h4>
                    <p className='description-container-two'>{image_object.description}</p>
                    <div className="shipping-details">
                      <div className="case">
                        <div className="case_title">
                          <p>UK SHIPPING</p>
                          <div onClick={() => showDeets(prevDeets => ({
                            ...prevDeets,
                            deets1: !prevDeets.deets1
                          }))} style={{ cursor: "pointer" }}>{deets.deets1 ? "➖" : "➕"}</div>
                        </div>
                        <div className={deets.deets1 ? "deets showdeets" : "deets"}>
                          <div className="dropdown-content">
                            <p>📦 Standard: £3.99 (Free over £80) — 2 to 4 days</p>
                            <p>⚡ Express: £6.99 — 1 to 2 days (before 2pm)</p>
                            <p>🚚 Next Day: £8.99 — Mon to Fri before 2pm</p>
                          </div>
                        </div>
                      </div>

                      <div className="case">
                        <div className="case_title">
                          <p>INTERNATIONAL SHIPPING</p>
                          <div onClick={() => showDeets(prevDeets => ({
                            ...prevDeets,
                            deets2: !prevDeets.deets2
                          }))} style={{ cursor: "pointer" }}>{deets.deets2 ? "➖" : "➕"}</div>
                        </div>
                        <p className={deets.deets2 ? "deets showdeets" : "deets"}>
                          🌍 Worldwide shipping available — Please see our <span onClick={() => router.push("/International_shipping")} style={{ textDecoration: "underline", cursor: "pointer" }}>International shipping</span> page for countries we currently ship to.
                        </p>

                      </div>

                      <div className="case" style={{ borderBottom: "1px solid rgb(223, 223, 223)", paddingBottom: "1rem" }}>
                        <div className="case_title">
                          <p>RETURNS</p>
                          <div onClick={() => showDeets(prevDeets => ({
                            ...prevDeets,
                            deets3: !prevDeets.deets3
                          }))} style={{ cursor: "pointer" }}>{deets.deets3 ? "➖" : "➕"}</div>
                        </div>
                        <p className={deets.deets3 ? "deets showdeets" : "deets"}>
                          🔄 Returns accepted within 14 days. Items must be unused, in original packaging. Please see our <span onClick={() => router.push("/orders_returns")} style={{ textDecoration: "underline", cursor: "pointer" }}>Returns Page</span> for more information.
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
                    product.slice(0, 4).map((item, index) => (
                      <ProductCard id={item.id} image={item.image_url} name={item.name} price={item.price} key={item.id} />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          :
          <>
            <Spinner />
          </>
      }
    </div>
  )
}
