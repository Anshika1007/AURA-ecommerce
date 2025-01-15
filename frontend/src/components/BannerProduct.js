

import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/skin1.jpg'
import image2 from '../assest/banner/skin2.jpg'
import image3 from '../assest/banner/skin3.jpg'
import image4 from '../assest/banner/skin4.jpg'
import image5 from '../assest/banner/skin5.jpg'

import mobile1 from '../assest/banner/mob1.jpeg'
import mobile2 from '../assest/banner/mob2.jpeg'
import mobile3 from '../assest/banner/mob3.jpeg'
import mobile4 from '../assest/banner/mob4.jpeg'
import mobile5 from '../assest/banner/mob5.jpeg'
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ];

    const mobileImages = [
        mobile1,
        mobile2,
        mobile3,
        mobile4,
        mobile5
    ];

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1)
        }
    }

    const prevImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(prev => prev - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                nextImage()
            } else {
                setCurrentImage(0)
            }
        }, 5000)
        return () => clearInterval(interval)
    }, [currentImage])

    return (
        <div className='container mx-auto px-4 rounded '>
            <div className='md:h-56 w-full bg-slate-200 relative'>
                <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
                    <div className='flex justify-between w-full text-2xl'>
                        <button className='bg-white shadow-md rounded-full p-1' onClick={prevImage}><FaAngleLeft /></button>
                        <button className='bg-white shadow-md rounded-full p-1' onClick={nextImage}><FaAngleRight /></button>
                    </div>
                </div>

                {/* desktop and tab version */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {desktopImages.map((imageURL, index) => {
                        return (
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={index} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                <img src={imageURL} alt="" className='w-full h-full' />
                            </div>
                        )
                    })}
                </div>

                {/* mobile version */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {mobileImages.map((imageURL, index) => {
                        return (
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={index} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                <img src={imageURL} alt="" className='w-full h-full object-cover' />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default BannerProduct
