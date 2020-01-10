import React from 'react'
import Hero from '../component/Hero';
import Banner from '../component/Banner';
import { Link } from 'react-router-dom';

 export const Error = () => {
    return (
        <>
            <Hero>
                <Banner  title="404" subtitle="page not found">
                    <Link to="/rooms" className="btn-primary">Back to rooms</Link>
                </Banner>
            </Hero>
        </>
    )
}

export default Error