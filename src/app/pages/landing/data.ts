// types
import { PricingPlan } from 'src/app/shared/widget/pricing-cards/pricing-card.model';
import { Layout, Statistic, Testimonial, Service } from './landing.model';

const LAYOUTS: Layout[] = [
    {
        image: 'assets/images/landing/demo/demo-1.jpg',
        name: 'Light Layouts',
        link: '#',
    },
    {
        image: 'assets/images/landing/demo/demo-2.jpg',
        name: 'Horizontal Layouts',
        link: '#',
    },
    {
        image: 'assets/images/landing/demo/demo-3.jpg',
        name: 'Semi Dark Layout',
        link: '#',
    },
    {
        image: 'assets/images/landing/demo/demo-4.jpg',
        name: 'Semi Dark Horizontal',
        link: '#',
    },
    {
        image: 'assets/images/landing/demo/demo-5.jpg',
        name: 'Landing Page',
        link: '#',
    },
    {
        image: 'assets/images/landing/demo/demo-6.jpg',
        name: 'Dark Sidebar',
        link: '#',
    },
];

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        clientName: 'Xpanta',
        title: 'Adminto User',
        avatar: 'assets/images/landing/testi/img-1.png',
        message:
            ' The designer of this theme delivered a quality product. I am not a front-end developer and I hate when the theme I download has glitches or needs minor tweaks here and there. This worked for my needs just out of the boxes. Also, it is fast and elegant.',
    },
    {
        id: 2,
        clientName: 'G_Sam',
        title: 'Adminto User',
        avatar: 'assets/images/landing/testi/img-2.png',
        message:
            ' Extremely well designed and the documentation is very well done. Super happy with the purchase and definitely recommend this! ',
    },
    {
        id: 3,
        clientName: 'Isaacfab',
        title: 'Adminto User',
        avatar: 'assets/images/landing/testi/img-3.png',
        message:
            " We used this theme to save some design time but... wow it has everything you didn't realize you would need later.I highly recommend this template to get your web design headed in the right direction quickly. ",
    },
];

const STATISTICS: Statistic[] = [
    {
        icon: 'pe-7s-add-user',
        title: 'Fans',
        value: 1200,
        counterOptions: {
            startVal: 0,
            duration: 5
        }
    },
    {
        icon: 'pe-7s-cart',
        title: 'Total Sales',
        value: 1500,
        counterOptions: {
            startVal: 10,
            suffix: ' +',
            duration: 5
        },
    },
    {
        icon: 'pe-7s-smile',
        title: 'Happy Clients',
        value: 6931,
        counterOptions: {
            startVal: 608,
            duration: 5
        }
    },
    {
        icon: 'pe-7s-medal',
        title: 'Won Prices',
        value: 800,
        counterOptions: {
            startVal: 2,
            duration: 5
        }
    },
];

const PRICINGPLANS: PricingPlan[] = [
    {
        id: 1,
        name: 'Single',
        price: 24,
        duration: 'license',
        features: ['Number of end products 1', 'Customer support', 'Free Updates', 'Monthly updates', '24 x 7 Support'],
    },
    {
        id: 1,
        name: 'Multiple',
        price: 120,
        duration: 'license',
        features: ['Number of end products 1', 'Customer support', 'Free Updates', 'Monthly updates', '24 x 7 Support'],
    },
    {
        id: 2,
        name: 'Extended',
        price: 999,
        duration: 'license',
        features: ['Number of end products 1', 'Customer support', 'Free Updates', 'Monthly updates', '24 x 7 Support'],
    },
];

const SERVICES: Service[] = [
    {
        image: 'assets/images/landing/icons/layers.png',
        title: 'Responsive Layouts',
        shortDesc: 'The new common language will be more simple and regular than the existing European languages.',
    },
    {
        image: 'assets/images/landing/icons/core.png',
        title: 'Based on Bootstrap UI',
        shortDesc: 'If several languages coalesce the grammar language is more than that of indual languages.',
    },
    {
        image: 'assets/images/landing/icons/paperdesk.png',
        title: 'Creative Design',
        shortDesc:
            'It will be as simple as occidental it will be to an english person. It will be as simple as occidental',
    },
    {
        image: 'assets/images/landing/icons/solarsystem.png',
        title: 'Awesome Support',
        shortDesc: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut',
    },
    {
        image: 'assets/images/landing/icons/datatext.png',
        title: 'Easy to customize',
        shortDesc: 'Everyone realizes why a new common language would be one could refuse to pay translators.',
    },
    {
        image: 'assets/images/landing/icons/browserscript.png',
        title: 'Quality Code',
        shortDesc: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis deleniti atque',
    },
];

export { LAYOUTS, TESTIMONIALS, STATISTICS, PRICINGPLANS, SERVICES };
