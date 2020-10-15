import React from 'react';
import GET_NEWSLETTER_CONFIG from "../../Queries/getNewsletterConfig.graphql";
import {useQuery} from '@apollo/react-hooks';

export const useNewsletterConfig = (props) => {
    const {data} = useQuery(GET_NEWSLETTER_CONFIG, {});
    if(!data){
        return  {title:false,description:false};
    }
    return  {title:data.newsletter_config.general_title,description:data.newsletter_config.general_description};
}
