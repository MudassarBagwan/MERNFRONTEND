import React,{useState ,useContext}from "react";
import "./PlaceItem.css"
import Button from "../../Shared/components/FormElements/Button";
import Card from "../../Shared/components/UIElements/Card";
import Modal from "../../Shared/components/UIElements/Modal";
import Map from "../../Shared/components/UIElements/Map";
import { AuthContext } from "../../Shared/contex/auth-contex";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import ErrorModal from "../../Shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/components/UIElements/LoadingSpinner";





const PlaceItem=(props)=>{
   
    

    const {isLoading,error,sendRequest,clearError}=useHttpClient();
    const auth = useContext(AuthContext);

    const [showmap,setshowmap]=useState(false);

    const [showConfirmModal,setShowConfirmModal]=useState(false)


    const openMapHandler=()=>{
        setshowmap(true);
    }

    const closeMapHandler =()=>{
        setshowmap(false);
    }

const showDeleteHandler =()=>{
    setShowConfirmModal(true)
}

const cancelDeleteHandler=()=>{
    setShowConfirmModal(false)
}

const confirmDeleteHandler =async () =>{
    setShowConfirmModal(false)
    try{
        await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,
        'DELETE',
        null,
        {Authorization: 'Bearer ' + auth.token});

        props.onDelete();


        
    }catch (err){

    }
}
    return <React.Fragment> 
        <ErrorModal error={error} onClear={clearError}/>

        <Modal show={showmap} 
                onCancel={closeMapHandler} 
                header={props.address} 
                contentClass="place-item__modal-content" 
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
                >


        <div className="map-container">
           <Map  center={props.coordinates} zoom={16}/>
        </div>

        </Modal>
        <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?" 
        footerClass="place-item__modal-actions"
        footer={<React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
        </React.Fragment>}
        >
            <p>Do you want to proceed and delete this place? Plese  note that it can't be undone thereafter</p>


        </Modal>
        
        <li className="place-item">
        <Card className="place-item__content">
        {isLoading&&<LoadingSpinner asOverlay/>}
        <div className="place-item__image">
            <img src={`${process.env.REACT_APP_BACKEND_IMAGE_URL}/${props.image}`}
            alt={props.title}/>

        </div>

        <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>


        </div>

        <div className="palce-item__actions">

            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button> 
         
            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}

            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteHandler}>
                DELETE
              </Button>
            )}


        </div>
        </Card>
    </li>
    </React.Fragment>

    


}

export default PlaceItem;