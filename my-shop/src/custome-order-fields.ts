// src/custom-order-fields.ts
import { LanguageCode } from '@vendure/core';
// import { DeepPartial } from '@vendure/common/lib/shared-types';
import { Order } from '@vendure/core';

export interface CustomOrderFields {
    internalShippingCost: {
        type: string;
        config: {
            inputType: string;
        };
        label: { languageCode: LanguageCode.en; value: string }[];
        description: { languageCode: LanguageCode.en; value: string }[];
    };
    externalShippingCost: {
        type: string;
        config: {
            inputType: string;
        };
        label: { languageCode: LanguageCode.en; value: string }[];
        description: { languageCode: LanguageCode.en; value: string }[];
    };
    [key: string]: any; // Index signature to satisfy ConfigArgs constraint
}

export interface CustomOrder extends Order {
    customFields: CustomOrderFields;
}
