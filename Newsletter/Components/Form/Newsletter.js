import React from 'react';
import {Form} from 'informed';
import {mergeClasses} from '@magento/venia-ui/lib/classify';
import Field from '@magento/venia-ui/lib/components/Field';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import {shape, string} from "prop-types";
import {isRequired} from '@magento/venia-ui/lib/util/formValidators';
import defaultClasses from '../CSS/newsletter.css';
import {EMAIL, SUBMIT, PLACEHOLDER_TEXT} from '../../Constants/constNewsletter'
import {useNewsletter, useNewsletterConfig} from '../../Model';

const btnIcon =
    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M-0.0311279 6.33943L16.8881 0.699707L11.2483 17.6189L6.51024 11.3009L6.84487 10.7429L6.28687 11.0783L-0.0311279 6.33943ZM3.44942 6.90398L6.38833 9.10816L11.6157 5.97289L8.4796 11.2003L10.6838 14.1392L14.3001 3.28762L3.45024 6.90398H3.44942Z" fill="white"/>
    </svg>;

const Newsletter = (props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const talonProps = useNewsletter(props);
    const {handleSubmit, errorMessage, successMessage, isSubmitting,initialValue} = talonProps;
    const {title, description} = useNewsletterConfig(props);
    // Map over any errors we get and display an appropriate error.
    const messageBlock = successMessage ? (
        <div className={classes.messageSuccess}>{successMessage}</div>
    ) : errorMessage ? (
        <div className={classes.messageError}>{errorMessage}</div>
    ) : null;
    return (
        <div className={classes.root}>
            <div>
                <h5>{title}</h5>
                <div className={classes.newsLetterText}>
                    {description}
                </div>
                {messageBlock}
                <Form
                    onSubmit={handleSubmit}>
                    <Field label={EMAIL} required={true}>
                        <TextInput
                            field="newsletter.email"
                            autoComplete="email"
                            validate={isRequired}
                            validateOnBlur
                            placeholder={PLACEHOLDER_TEXT}
                            initialValue={initialValue}
                        />
                    </Field>
                    <div className={classes.actions}>
                        <button disabled={isSubmitting} type="submit">
                            {SUBMIT}
                            {btnIcon}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Newsletter;

Newsletter.propTypes = {
    classes: shape({
        root: string,
        messageSuccess: string,
        messageError: string,
        newsLetterText: string
    })
};
