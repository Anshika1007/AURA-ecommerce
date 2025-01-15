import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
   <div>
   <CategoryList/>
   <BannerProduct/>
   <HorizontalCardProduct Category={"Skin"} heading={"Top Skincare Products"}/>
   <HorizontalCardProduct Category={"Bath & Body"} heading={" Popular Bath & Body Products"}/>
   <VerticalCardProduct Category={"Hair"} heading={" Haircare Products"}/>
   <VerticalCardProduct Category={"Fragrance"} heading={"Some Fragrance's For You"}/>
   <VerticalCardProduct Category={"Mom & Baby"} heading={"Mom & Baby Care "}/>
   <VerticalCardProduct Category={"Natural"} heading={"All Natural Products for you "}/>
   <VerticalCardProduct Category={"Appliances"} heading={"Appliances to make your hair look more beautiful "}/>
   <VerticalCardProduct Category={"Health & Wellness"} heading={"Health & Wellness "}/>
   <VerticalCardProduct Category={"Makeup"} heading={"Makeup "}/>
   <VerticalCardProduct Category={"Men"} heading={"Men"}/>

   
   </div>
  )
}

export default Home