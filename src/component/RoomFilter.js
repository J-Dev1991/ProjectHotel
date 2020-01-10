import React from 'react'
import {useContext} from 'react';
import {RoomContext} from '../context';
import Title from '../component/Title';


// get all unique values
const getUnique = (items,value)=>{
    return  [...new Set(items.map(item=> item[value]))]
}
export default function RoomFilter({rooms}) {

        // NOW WE USE SOMETHING DIFF FROM HOOKS
    const context = useContext(RoomContext);
        const {
                handleChange,
                type,
                capacity,
                price,
                maxPrice,
                minPrice,
                minSize,
                maxSize,
                pets,
                breakfast } = context
                
            //get unique types
    let types = getUnique(rooms, "type");

    // add all
    types = ['all', ...types];

    //map to jsx
    types = types.map((item,index)=>{
        return <option values={item} key={index}>{item}</option>
    });


                //guest
    let guest = getUnique(rooms, 'capacity');
    guest = guest.map((item,index) => {
        return <option key={index} value={item}>{item}</option>
    })


    return (
        <section className="filter-container">
            <Title title="search rooms"/>
            <form className="filter-form">
                {/* {select type} */}

                    <div className="form-group">
                        <label htmlFor="type">room type</label>
                        <select name="type"
                            id="type" 
                            value={type} 
                            className="form-control" 
                            onChange={handleChange}>
                            {types}
                        </select>
                    </div>              
                {/* end of select type */}

                {/* {start of guest section} */}
                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select name="capacity"
                        id="capacity" 
                        value={capacity} 
                        className="form-control" 
                        onChange={handleChange}>
                        {guest}
                    </select>
                </div>
                {/* end of guest section */}


                {/* start of room price */}
                <div className="form-group">
                    <label htmlFor="price">room price ${price}</label>
        
                    <input type="range" name="price" 
                     max={maxPrice} min={minPrice}  id="price" 
                     value={price} onChange={handleChange}  
                    className="form-control" />
                </div>
                {/* {end of room price} */}


                {/* start of room size */}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input 
                            type="number" 
                            className="size-input" 
                            name='minSize'
                            id="size"
                            value={minSize}
                            onChange={handleChange}
                        />

                        <input 
                            type="number" 
                            className="size-input" 
                            name="maxSize"
                            value={maxSize} 
                            id="size"
                            onChange={handleChange}
                        />
                    </div>
                    
                </div>
                {/* {end of room size} */}

                {/* {start of extras} */}
                <div className="form-group">
                        {/* {breakfast} */}
                    <div className="single-extra">
                        <input 
                            type="checkbox" name="breakfast"
                            id="breakfast" checked={breakfast}
                            onChange={handleChange}
                        />
                        <label htmlFor="breakfeast">breakfast</label>
                    </div>

                    {/* {pets} */}
                    <div className="single-extra">
                        <input 
                            type="checkbox" name="pets"
                            id="pets" checked={pets}
                            onChange={handleChange}
                        />
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
                {/* {end of extras} */}
            </form>
        </section>
    )
}
