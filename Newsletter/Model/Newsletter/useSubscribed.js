import React from 'react';
import {useQuery} from "@apollo/react-hooks";
import {getUniqueKey} from "../../Helper/Form/getUniqueKey";
import GET_SUBSCRIBED from "../../Queries/getSubscribed.graphql";
/**
 *
 * @param token_id
 * @returns {boolean}
 */
export const useSubscribed = (props) => {

    const {currentUser,handleSubmit,handleUnsubscription} = props;


    const {data} = useQuery(GET_SUBSCRIBED, {
        variables: {
            email: currentUser.email,
            key: getUniqueKey()
        }
    });
    if (!data) {
        return {subscribed: false};
    }
    const {subscribed} = data;

    /**
     *
     * @param value
     */
    const handleInputChange =(value)=>{
       if(value) {
           handleSubmit({newsletter: {email: currentUser.email}});
       }else{
           handleUnsubscription({newsletter: {email: currentUser.email}});
       }
    }
    return {
        subscribed,
        handleInputChange
    }

};
