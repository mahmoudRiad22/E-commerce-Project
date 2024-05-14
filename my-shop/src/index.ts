import { bootstrap, runMigrations } from '@vendure/core';
import { config } from './vendure-config';
export { StripePlugin } from './plugins/stripe-payment/stripe-payment.plugin';
runMigrations(config)
    .then(() => bootstrap(config))
    .catch(err => {
        console.log(err);
    });
