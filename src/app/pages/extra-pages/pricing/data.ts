import { PricingPlan } from "src/app/shared/widget/pricing-cards/pricing-card.model";

const PRICINGPLANS1: PricingPlan[] = [
    {
        id: 1,
        name: 'Basic',
        price: 19,
        duration: 'Month',
        features: ['5 Projects', '1 GB Storage', 'No Domain', '1 User', '24x7 Support'],
        isPopular: false,
    },
    {
        id: 1,
        name: 'Premium',
        price: 29,
        duration: 'Month',
        features: ['5 Projects', '1 GB Storage', 'No Domain', '1 User', '24x7 Support'],
        isPopular: true,
    },
    {
        id: 2,
        name: 'Developer',
        price: 39,
        duration: 'Month',
        features: ['5 Projects', '1 GB Storage', 'No Domain', '1 User', '24x7 Support'],
        isPopular: false,
    },
    {
        id: 3,
        name: 'Business',
        price: 49,
        duration: 'Month',
        features: ['5 Projects', '1 GB Storage', 'No Domain', '1 User', '24x7 Support'],
        isPopular: false,
    },
];

const PRICINGPLANS2: PricingPlan[] = [
    {
        id: 1,
        name: 'Basic',
        price: 19,
        duration: 'Month',
        features: ['5 Projects', '1 GB Storage', 'No Domain', '1 User', '24x7 Support'],
        isPopular: false,
    },
    {
        id: 1,
        name: 'Premium',
        price: 29,
        duration: 'Month',
        features: ['5 Projects', '1 GB Storage', 'No Domain', '1 User', '24x7 Support'],
        isPopular: true,
    },
    {
        id: 2,
        name: 'Developer',
        price: 39,
        duration: 'Month',
        features: ['5 Projects', '1 GB Storage', 'No Domain', '1 User', '24x7 Support'],
        isPopular: false,
    },
];

export { PRICINGPLANS1, PRICINGPLANS2 };