import React, { Component } from 'react'
// import Items from './data';
import  Client from './Contentful';



const RoomContext = React.createContext(); // contextAPI
//<RoomContext.Provider value={}>
class RoomProvider extends Component {

    state = {
       rooms: [],
       sortedRooms: [],
       featuredRooms: [],
       loading: true,
       type: "all",
       capacity: 1,
       price: 0,
       minPrice: 0,
       maxPrice: 0,
       minSize: 0,
       maxSize: 0,
       breakfast:false,
       pets: false,
    };
    
  
        //RESPONSIBLE FOR GETTING DATA FROM CONTENTFUL
    getData = async() =>{
        try{
            let response = await Client.getEntries({
                content_type: "beachResortRoomData",
                //used to order the room as prefered
                order: 'fields.price'
            });
            let rooms = this.formatData(response.items); //duplicate filtered room from formatData function

            //FEATURED ROOM FILTERED VARIABLE
            let featuredRooms = rooms.filter(room => room.featured === true);
        
            // get the highest price 
            let maxPrice = Math.max(...rooms.map(item => item.price));
            // get the max size
            let maxSize = Math.max(...rooms.map(item => item.size));
     
        this.setState({
           rooms,
           featuredRooms,
           sortedRooms:rooms,
           loading:false,
           price: maxPrice,
           maxPrice,
           maxSize
        })

        } catch (error){
            console.log(error)
        }
    }

        // set it state with boolean of slug prop
    componentDidMount(){
        this.getData();
    }

        //filter out only the data we needed from d whole data.Js
        formatData (items) {
            let tempItems = items.map(item => {
                let id = item.sys.id
                let images = item.fields.images.map(image => image.fields.file.url);
                let room = {...item.fields,id,images} //spread operator
                return room;
            })
            return tempItems;
        }


        //filter type of room for feature using find
        getRoom = (slug) =>{
            let tempRooms = [...this.state.rooms]; //spread operator
            const room = tempRooms.find((room) => room.slug === slug); // find() returns object
            return room;
        };

                //handleChange for the room container element
        handleChange = event => {
                const target = event.target;
                const value = target.type === "checkbox" ? target.checked: target.value;
                const name = target.name;
                this.setState({
                    [name] : value
                }, this.filterRooms);
        };

        //filter rooms function for room container
        filterRooms = () =>{
            let { rooms,type,capacity,price,minSize,maxSize,pets,breakfast,minPrice,maxPrice} = this.state

            // ALL THE ROOMS
            let temprooms = [...rooms];
                 //TRANSFORM VALUES
            capacity = parseInt(capacity);
                //PRICE 
            price = parseInt(price)


            //FILTER BY TYPE
            if(type !== "all"){
                temprooms = temprooms.filter(room => room.type === type);
            }
            //FILTER BY CAPACITY
            if(capacity !== 1){
                temprooms = temprooms.filter(room => room.capacity >= capacity);
            }

            //FILTER PRICE
            temprooms = temprooms.filter(room => room.price <= price);

            //FILTER BY SIZE
            temprooms = temprooms.filter(room => room.size >= minSize
            && room.size <= maxSize);

            //FILTER BY PETS
            if(pets){
                temprooms = temprooms.filter(room => room.pets === true);

            }

            //FILTER BY BREAKFAST
            if(breakfast){
                temprooms = temprooms.filter(room => room.breakfast === true)
            }

                //CHANGE STATE
                this.setState({
                    sortedRooms:temprooms
                })
            }





    render() {
        return (  
             <RoomContext.Provider  
              value={{ 
                  ...this.state,
                  getRoom:this.getRoom,
                  handleChange:this.handleChange
                  }}>
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}


const RoomConsumer = RoomContext.Consumer;

// hooks
export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return (
             <RoomConsumer>
                {  value => <Component {...props} context={value} />}
            </RoomConsumer>

        );
    }
};
export  {RoomProvider,RoomConsumer, RoomContext}