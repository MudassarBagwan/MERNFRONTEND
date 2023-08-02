import React from "react";
import "./PlaceFrom.css"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../Shared/Util/validators"; 
import Button from "../../Shared/components/FormElements/Button";
import Input from "../../Shared/components/FormElements/Input";
import { useHttpClient } from "../../Shared/hooks/http-hook";
import { useForm } from "../../Shared/hooks/form-hook";
import { useContext } from "react";
import { AuthContext } from "../../Shared/contex/auth-contex";
import ErrorModal from "../../Shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/components/UIElements/LoadingSpinner";
import { useNavigate } from 'react-router-dom';
import ImageUpload from "../../Shared/components/FormElements/ImageUpload";

const NewPlace = () => {
  

  const auth = useContext(AuthContext);
  const {isLoading,error,sendRequest,clearError}=useHttpClient();
  
    const [formState, inputHandler] = useForm(
      {
        title: {
          value: '',
          isValid: false
        },
        description: {
          value: '',
          isValid: false
        },
        address: {
          value: '',
          isValid: false
        },
        image:{
          value:null,
          isValid:false
        }
      },
      false
    );



    const navigate = useNavigate();
    const placeSubmitHandler = async event => {
      event.preventDefault();

      try {
        const formData =new FormData();
        formData.append('title',formState.inputs.title.value);
        formData.append('description',formState.inputs.description.value);
        formData.append('address',formState.inputs.address.value);
        formData.append('image',formState.inputs.image.value);

        console.log()
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places`,
          'POST',
          formData,{Authorization: 'Bearer ' + auth.token}
        );
         
        navigate('/');

      } catch(err){

      }
    
      
      
    };
  
    return (
      <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>

      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverly/>}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload id="image" onInput={inputHandler} errorText="Please Provide Image."/>
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>

      </React.Fragment>
    );
  };
  
  export default NewPlace;

  