import { Select2Data } from "ng-select2-component";

export const COUNTRIES: Select2Data = [
    {
        label: 'Alaskan/Hawaiian Time Zone',
        options: [
            { value: 'AK', label: 'Alaska' },
            { value: 'HI', label: 'Hawaii', disabled: true }
        ]
    },
    {
        label: 'Pacific Time Zone',
        options: [
            { value: 'CA', label: 'California' },
            { value: 'NV', label: 'Nevada' },
            { value: 'OR', label: 'Oregon' },
            { value: 'WA', label: 'Washington' }
        ]
    },
    {
        label: 'Mountain Time Zone',
        options: [
            { value: 'AZ', label: 'Arizona' },
            { value: 'CO', label: 'Colorado' },
            { value: 'ID', label: 'Idaho' },
            { value: 'MT', label: 'Montana' },
            { value: 'NE', label: 'Nebraska' },
            { value: 'NM', label: 'New Mexico' },
            { value: 'ND', label: 'North Dakota' },
            { value: 'UT', label: 'Utah' },
            { value: 'WY', label: 'Wyoming' }
        ]
    },
    {
        label: 'Central Time Zone',
        options: [
            { value: 'AL', label: 'Alabama' },
            { value: 'AR', label: 'Arkansas' },
            { value: 'IL', label: 'Illinois' },
            { value: 'IA', label: 'Iowa' },
            { value: 'KS', label: 'Kansas' },
            { value: 'KY', label: 'Kentucky' },
            { value: 'LA', label: 'Louisiana' },
            { value: 'MN', label: 'Minnesota' },
            { value: 'MS', label: 'Mississippi' },
            { value: 'MO', label: 'Missouri' },
            { value: 'OK', label: 'Oklahoma' },
            { value: 'SD', label: 'South Dakota' },
            { value: 'TX', label: 'Texas' },
            { value: 'TN', label: 'Tennessee' },
            { value: 'WI', label: 'Wisconsin' }
        ]
    },
    {
        label: 'Eastern Time Zone',
        options: [
            { value: 'CT', label: 'Connecticut' },
            { value: 'DE', label: 'Delaware' },
            { value: 'FL', label: 'Florida' },
            { value: 'GA', label: 'Georgia' },
            { value: 'IN', label: 'Indiana' },
            { value: 'ME', label: 'Maine' },
            { value: 'MD', label: 'Maryland' },
            { value: 'MA', label: 'Massachusetts' },
            { value: 'MI', label: 'Michigan' },
            { value: 'NH', label: 'New Hampshire' },
            { value: 'NJ', label: 'New Jersey' },
            { value: 'NY', label: 'New York' },
            { value: 'NC', label: 'North Carolina' },
            { value: 'OH', label: 'Ohio' },
            { value: 'PA', label: 'Pennsylvania' },
            { value: 'RI', label: 'Rhode Island' },
            { value: 'SC', label: 'South Carolina' },
            { value: 'VT', label: 'Vermont' },
            { value: 'VA', label: 'Virginia' },
            { value: 'WV', label: 'West Virginia' }
        ]
    }
];

export const STATES: string[] = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
    'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];