import { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { sliderData } from "./slider-data"
import "./Slider.scss"

const Slider = () => {

    const [currentSlide, setcurrentSlide] = useState(0)
    const slideLength = sliderData.length

    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000


    const nextSlide = () => {
        setcurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1)
    }
    const prevSlide = () => {

        setcurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1)

    }



    useEffect(() => {
        setcurrentSlide(0)

    }, [])


    useEffect(() => {
        if (autoScroll) {
            const auto = () => {
                slideInterval = setInterval(nextSlide, intervalTime)
            }
            auto()
        }
        return () => clearInterval(slideInterval)
    }, [currentSlide, slideInterval, autoScroll,])


    return (
        <div className='slider'>
            <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide} />
            <AiOutlineArrowRight className='arrow next' onClick={nextSlide} />
            {sliderData.map((slide, index) => (
                <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
                    {index === currentSlide && (
                        <>
                            <img src={slide.image} alt="slide" />
                            <div className="content">
                                <h2>{slide.heading}</h2>
                                <p>{slide.desc}</p>
                                <hr />
                                <a className='--btn --btn-primary' href="#product">
                                    Shop Now
                                </a>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Slider
