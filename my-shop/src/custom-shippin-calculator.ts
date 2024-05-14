// src/api/extensions/custom-shipping-calculator.ts

import { RequestContext, ShippingCalculator, LanguageCode} from '@vendure/core';
import { ConfigArgValues } from '@vendure/core/dist/common/configurable-operation';
import { Order, ShippingMethod } from '@vendure/core';
import { CalculateShippingFnResult } from '@vendure/core';
import { CustomOrderFields } from './custome-order-fields'; // Import your custom order fields type

export const customShippingCalculator = new ShippingCalculator<CustomOrderFields>({
  code: 'custom-shipping-calculator',
  description: [{ languageCode: LanguageCode.en, value: 'Custom Shipping Calculator' }],
  args: {
    internalShippingCost: {
        type: 'int', // or 'float' if it's a floating-point number
        config: { inputType: 'money' },
        label: [{ languageCode: LanguageCode.en, value: 'Internal Shipping Cost' }],
        description: [{ languageCode: LanguageCode.en, value: 'The shipping cost for deliveries within the city' }]
    },
    externalShippingCost: {
        type: 'int', // or 'float' if it's a floating-point number
        config: { inputType: 'money' },
        label: [{ languageCode: LanguageCode.en, value: 'External Shipping Cost' }],
        description: [{ languageCode: LanguageCode.en, value: 'The shipping cost for deliveries outside the city' }]
    }
  },
// args: {
//     internalShippingCost: 60, // Example value
//     externalShippingCost: 80, // Example value
// },

  calculate: (ctx: RequestContext, order: Order, args: ConfigArgValues<CustomOrderFields>, method: ShippingMethod): CalculateShippingFnResult => {
    const destination = order.shippingAddress?.city ?? '';
    const internalCities = ['cairo', 'cairo']; 

    console.log("Args:", args);
    const internalCost = parseInt(args.internalShippingCost as string, 10);
    const externalCost = parseInt(args.externalShippingCost as string, 10);
    console.log("Internal Cost:", internalCost);
    console.log("External Cost:", externalCost);

    const cost = internalCities.includes(destination) ? internalCost : externalCost;
    const priceIncludesTax = true;
    const taxRate = 0;

    return {
      price: cost * 100, // Assuming the cost needs to be in cents
      priceIncludesTax,
      taxRate,
      metadata: {
        description: "Calculated based on the city of destination"
      }
    };
  }
});
