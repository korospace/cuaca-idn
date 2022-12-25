import * as Yup from 'yup';

const rules = Yup.object().shape({
    provinsi: Yup.string()
        .required(' '),
    kabkota: Yup.string()
        .required(' ')
});

export default rules;