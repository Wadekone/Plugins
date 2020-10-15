import React, { useState, useCallback} from 'react';
import { useMutation} from "@apollo/react-hooks";
import SET_NEWSLETTER from "../../Queries/setNewslettes.graphql";
import UNSUBSCRIPTION_NEWSLETTER from "../../Queries/unsubscriptionNewsletter.graphql";
import {getUniqueKey} from "../../Helper/Form/getUniqueKey";

/**
 *
 * @param token_id
 * @returns {boolean}
 */
export const useNewsletter = (props) => {
    const [addNewsletter] = useMutation(
        SET_NEWSLETTER
    );
    const [unsubscriptionNewsletter] = useMutation(
        UNSUBSCRIPTION_NEWSLETTER
    );
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [initialValue, setInitialValue] = useState('');


    /**send form*/
    const handleSubmit = useCallback(
        async (formValues) => {
            setIsSubmitting(true);
            try {
                const {data} = await addNewsletter(
                    {
                        variables: {
                            email: formValues.newsletter.email,
                            key: getUniqueKey()
                        }
                    }
                );
                if (data) {
                    if (data.CreateNewsletter.error) {
                        setErrorMessage(data.CreateNewsletter.error);
                    } else {
                        setSuccessMessage(data.CreateNewsletter.message);
                        setInitialValue('');

                    }
                    setIsSubmitting(false);
                }

            } catch (error) {
                if (process.env.NODE_ENV === 'development') {
                    console.error(error);
                }
                setIsSubmitting(false);
            }
        },
        []
    );

    /**
     *
     * @type {Function}
     */
    const handleUnsubscription = useCallback(
        async (formValues) => {
            setIsSubmitting(true);
            try {
                const {data} = await unsubscriptionNewsletter(
                    {
                        variables: {
                            email: formValues.newsletter.email,
                            key: getUniqueKey()
                        }
                    }
                );
                if (data) {
                    if (data.UnsubscriptionNewsletter.error) {
                        setErrorMessage(data.UnsubscriptionNewsletter.error);
                    } else {
                        setSuccessMessage(data.UnsubscriptionNewsletter.message);

                    }
                    setIsSubmitting(false);
                }

            } catch (error) {
                if (process.env.NODE_ENV === 'development') {
                    console.error(error);
                }
                setIsSubmitting(false);
            }
        },
        []
    );
    return {
        handleSubmit,
        errorMessage,
        successMessage,
        isSubmitting,
        handleUnsubscription,
        initialValue
    }

};
