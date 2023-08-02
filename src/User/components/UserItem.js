import React from "react";
import Avatar from "../../Shared/components/UIElements/Avatar";
import Card from "../../Shared/components/UIElements/Card";
import {Link} from "react-router-dom";
import "./UserItem.css"


const UserItem =(user)=>{


    
    return (
     
            <li className="user-item">
              
                    <Card className="user-item__content">
                    <Link to={`/${user.id}/places`}>
                    <div className="user-item__image">
                        <Avatar image={`${process.env.REACT_APP_BACKEND_IMAGE_URL}/${user.image}`} alt={user.name}/> 
                    </div>
                    <div className="user-item__info">
                        <h2>{user.name}</h2>
                        <h3>{user.placeCount.length} {user.placeCount===1?'Place':'Places'}</h3>
                    </div>
                    </Link>
                    </Card>

                

            </li>
     
    )
}


export default UserItem;