import React from 'react'
import Hero from '../component/Hero';
import Banner from '../component/Banner';
import { Link } from 'react-router-dom';
import RoomsContainer from '../component/RoomsContainer';


export const Rooms = () => {
    return (
        <>
        <Hero hero="roomsHero">
            <Banner  title="Our Rooms" >
                    <Link to="/" className="btn-primary">return home</Link>
            </Banner>
        </Hero>
        <RoomsContainer/>

      
        </>
    )
}
export default Rooms