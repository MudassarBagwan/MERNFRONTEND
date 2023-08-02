import React from "react";
import "./UserList.css"
import UserItem from "./UserItem";
import Card from "../../Shared/components/UIElements/Card";
const UserList =(user)=>{

    
    if (user.items.length === 0){
       return( <div className="center">
        <Card>
            <h2>
                No Users found.
            </h2>
            </Card>

        </div>)
    }

 
    return <ul className="user-list">
        {user.items.map(user=>{
            return <UserItem

            key={user.id} 
            id={user.id} 
            image={user.image} 
            name={user.name}
            placeCount={user.places}

            />
        })}
    </ul>
    

   
}


export default UserList;
