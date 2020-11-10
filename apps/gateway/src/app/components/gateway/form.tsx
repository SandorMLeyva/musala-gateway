import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, LinearProgress } from '@material-ui/core';
import { IGateway, ipV4Format } from '@gateway/models';
import * as ApiInterfaces from '@gateway/api-interfaces';



export default function FormGateway() {
    return (
        <div>
            <Formik
                initialValues={{
                    serial: "",
                    name: "",
                    ipv4Address: "",
                }}
                validate={values => {
                    const errors: Partial<IGateway> = {};
                    if (!values.ipv4Address) {
                        errors.ipv4Address = 'Required';
                    } else if (
                        !ipV4Format.test(values.ipv4Address)
                    ) {
                        errors.ipv4Address = 'Invalid email address';
                    }
                    if (!values.serial) {
                        errors.serial = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {

                    fetch(`http://localhost:3333/api/v1${ApiInterfaces.GatewayApiUrlCreate}`,
                        {
                            method: 'POST',
                            body: JSON.stringify(values),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(r => r.json())
                        .then(r => setSubmitting(false))
                        .catch(e => console.log(e));

                }}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form>
                        <Field
                            component={TextField}
                            name="serial"
                            type="string"
                            label="Serial"
                        />
                        <br />
                        <Field
                            component={TextField}
                            type="string"
                            label="IP"
                            name="ipv4Address"
                        />
                        <br />
                        <Field
                            component={TextField}
                            type="string"
                            label="Name"
                            name="name"
                        />
                        {isSubmitting && <LinearProgress />}
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >Save</Button>
                    </Form>
                )}
            </Formik >
        </div>
    );
}