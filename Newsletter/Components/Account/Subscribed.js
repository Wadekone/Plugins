import React from 'react';
import {mergeClasses} from '@magento/venia-ui/lib/classify';
import {shape, string} from "prop-types";
import defaultClasses from '../CSS/accountNewsletter.css';
import {useSubscribed, useNewsletter} from '../../Model';
import {IS_SUBSCRIBED, IS_NOT_SUBSCRIBED} from '../../Constants/constNewsletter';

const Subscribed = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {handleSubmit, handleUnsubscription} = useNewsletter(props);
    const {subscribed, handleInputChange,} = useSubscribed({
        currentUser: props.currentUser,
        handleSubmit,
        handleUnsubscription
    });

    const TEXT = subscribed.subscribed ? IS_SUBSCRIBED : IS_NOT_SUBSCRIBED;
    return (
        <div className={classes.accountSubscribed}>
            <h4>{'Subscription option'}</h4>
            <label>
                <input
                    type={'checkbox'}
                    value={''}
                    name={'subscription'}
                    checked={subscribed.subscribed}
                    onChange={(event) => handleInputChange(event.target.checked)}
                />
                <span> {TEXT}</span>
            </label>
        </div>
    );
}

export default Subscribed;

Subscribed.propTypes = {
    classes: shape({
        root: string,
        messageSuccess: string,
        messageError: string,
        newsLetterText: string
    })
};
