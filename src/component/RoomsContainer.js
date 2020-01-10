import React from 'react';
import RoomsFilter from './RoomFilter';
import RoomList from './RoomList';
import {withRoomConsumer} from '../context'
import Loading from './loading';

function RoomContainer({context}){
    const {loading,sortedRooms,rooms} = context

            if(loading){ return <Loading/>; }
                return (
                        <>
                            <RoomsFilter rooms={rooms}/>
                            <RoomList rooms={sortedRooms}/>
                        </>
                );
}

export default withRoomConsumer(RoomContainer);


//THE CODE ABOVE DOES SAME THING -- BUT HOOK JUST LOOK MORE SIMPLER AND SHORTER

// import React from 'react';
// import RoomsFilter from './RoomFilter';
// import RoomList from './RoomList';
// import {RoomConsumer} from '../context'
// import Loading from './loading';

// export default function RoomsContainer() {
//     return (

//         <RoomConsumer>
//             {
//                 value => { //value is a function derived from context
//                     const {loading,sortedRooms,rooms} = value
//                     if(loading){
//                         return <Loading/>;
//                     }
//                     return (
//                     <div>
//                         hello from rooms RoomsContainer
//                         <RoomsFilter rooms={rooms}/>
//                         <RoomList rooms={sortedRooms}/>
//                     </div>
//                  );
//                 }
//             }
//         </RoomConsumer>
      
//     )
// }
