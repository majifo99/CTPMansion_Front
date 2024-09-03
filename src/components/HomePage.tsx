
import Hero from './Hero'
import Navbar from './Navbar'
import AboutUs from './AboutUs'
import Footer from './Footer'
import LocationSection from './Map'
import OurServices from './OurServices'
import { Gallery } from './Gallery'


function HomePage() {
  return (
    <>
        <Navbar />
        <Hero />
        <section id="about-us">
        <AboutUs /> 
        </section>
        <OurServices />
        <Gallery/>
        <LocationSection/>
        <Footer />
    </>
  )
}

export default HomePage