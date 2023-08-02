import React,{useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import ErrorModal from "../../Shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/components/UIElements/LoadingSpinner";
import { useNavigate } from 'react-router-dom';




const UserPlaces = () => {
  const [loadedPlaces,setLoadedPlaces] =useState('');
  const {isLoading,error,sendRequest,clearError}=useHttpClient();

  const userId = useParams().userId;

 const navigate = useNavigate();
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);

 
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler=(deletePlaceId)=>{

    setLoadedPlaces(prevPlaces =>prevPlaces.filter(place=>place.id !== deletePlaceId));
    navigate('/')
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;


