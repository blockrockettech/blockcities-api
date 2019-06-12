module.exports = {
    _id: '5cf917a298b9ff812bfc64d1',
    lastUpdated: '2019-06-12T07:27:55.912Z',
    createdOn: '2019-06-06T13:39:46.036Z',
    name: 'Build Profiles',
    slug: 'building',
    singularName: 'Build Profile',
    fields:
        [{
            name: 'tokenid',
            slug: 'token-id',
            type: 'Number',
            required: true,
            editable: true,
            helpText: '',
            id: '005c4b2262add1cb1eafa08052680710',
            validations: [Object]
        },
            {
                name: 'building image',
                slug: 'image',
                type: 'Link',
                required: true,
                editable: true,
                helpText: '',
                id: '8d0ab6906ebea224dc39d7ae1a5fe8fa',
                validations: {}
            },
            {
                name: 'background color',
                slug: 'background-color',
                type: 'Color',
                required: false,
                editable: true,
                helpText: '',
                id: '0bd073e9265732de81cbf922ac19b7c8',
                validations: {}
            },
            {
                name: 'city - 3 letter',
                slug: 'city',
                type: 'PlainText',
                required: true,
                editable: true,
                helpText: 'ATL',
                id: 'e915f32405b268f7457a332526c7427b',
                validations: [Object]
            },
            {
                name: 'city - full name',
                slug: 'city-full-name',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: '01f9b844d8316d7e460c7ff8fb7efba2',
                validations: [Object]
            },
            {
                name: 'era #',
                slug: 'era',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: 'fbd7ce0a59619a805a3451ee42c1cbd7',
                validations: [Object]
            },
            {
                name: 'era class',
                slug: 'era-class',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: '5aa67e959af91c49ea59d047ba605f18',
                validations: [Object]
            },
            {
                name: 'original architect',
                slug: 'architect',
                type: 'PlainText',
                required: true,
                editable: true,
                helpText: '',
                id: '23f263d7f13a4c13bb3d3029dcb9306d',
                validations: [Object]
            },
            {
                name: 'current owner',
                slug: 'current-owner',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: '21124940fb629c99539d6bc207d0c9c5',
                validations: [Object]
            },
            {
                name: 'building description',
                slug: 'buildingdescription',
                type: 'PlainText',
                required: true,
                editable: true,
                helpText: '',
                id: 'a979fcb7a3c4bcc9ff18e40af56270dd',
                validations: [Object]
            },
            {
                name: 'height',
                slug: 'height',
                type: 'Number',
                required: false,
                editable: true,
                helpText: '',
                id: 'bd912007e3e295d4b111b4f7c9ee37e2',
                validations: [Object]
            },
            {
                name: 'height class',
                slug: 'height-class',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: '72a1c6242e5f46de6b6137cbcbaa51a6',
                validations: [Object]
            },
            {
                name: 'date built',
                slug: 'date-built',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: 'd07ad39f8badfb012816742e82a23712',
                validations: [Object]
            },
            {
                name: 'ground floor source',
                slug: 'groundfloor',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: '8e7a34a88dd2771fbb3fec49904470ae',
                validations: [Object]
            },
            {
                name: 'body source',
                slug: 'body',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: 'a8524956ff4a20604e5b228082891492',
                validations: [Object]
            },
            {
                name: 'roof source',
                slug: 'roof',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: '107aa9364cf5cd72323303c377f86a05',
                validations: [Object]
            },
            {
                name: 'ground floor - exterior color',
                slug: 'ground-floor-exterior-color',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: '2cd17b9447a75fc3ef0f533382828c3d',
                validations: [Object]
            },
            {
                name: 'ground floor - window color',
                slug: 'ground-floor-window-color',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: 'bb65ebec757584cf2c8978352fb48e28',
                validations: [Object]
            },
            {
                name: 'ground floor - window type',
                slug: 'ground-floor-window-type',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: '289c63f067ce621457b25e35db092129',
                validations: [Object]
            },
            {
                name: 'ground floor - use',
                slug: 'ground-floor-use',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: '794ab48172d66068e0ba4955270ad1b0',
                validations: [Object]
            },
            {
                name: 'ground floor - exterior color icon',
                slug: 'ground-floor-exterior-color-icon',
                type: 'ImageRef',
                required: false,
                editable: true,
                helpText: '',
                id: '7e7afab4b60421dc5663633524cec258',
                validations: {}
            },
            {
                name: 'ground floor - window color icon',
                slug: 'ground-floor-window-color-icon',
                type: 'ImageRef',
                required: false,
                editable: true,
                helpText: '',
                id: 'e178af2a8f3780ed9383b2e65391dfc1',
                validations: {}
            },
            {
                name: 'ground floor - window type icon',
                slug: 'ground-floor-window-type-icon',
                type: 'ImageRef',
                required: false,
                editable: true,
                helpText: '',
                id: 'd7651a4a4485e321a98d4554b07d2659',
                validations: {}
            },
            {
                name: 'ground floor - use icon',
                slug: 'ground-floor-use-icon',
                type: 'ImageRef',
                required: false,
                editable: true,
                helpText: '',
                id: '87bdf972d793707646960630360d5e4d',
                validations: {}
            },
            {
                name: 'body - exterior color',
                slug: 'body-exterior-color',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: 'de67c2bc47d2119238e5dab4e129da2c',
                validations: [Object]
            },
            {
                name: 'body - window color',
                slug: 'body-window-color',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: '9d3152670e4bf4894a873563855f9a50',
                validations: [Object]
            },
            {
                name: 'body - window type',
                slug: 'body-window-type',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: '811224b0685435d4166dbc314e1b6aac',
                validations: [Object]
            },
            {
                name: 'body - use',
                slug: 'body-use',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: 'deae8b3cd69316f9d9bc106c6b657144',
                validations: [Object]
            },
            {
                name: 'body - exterior color icon',
                slug: 'body-exterior-color-icon',
                type: 'ImageRef',
                required: false,
                editable: true,
                helpText: '',
                id: '40557423852c2e758a6458f6b486e0d2',
                validations: {}
            },
            {
                name: 'body - window color icon',
                slug: 'body-window-color-icon',
                type: 'ImageRef',
                required: false,
                editable: true,
                helpText: '',
                id: '1ce93a53ee71d43334f2b9777c827c5f',
                validations: {}
            },
            {
                name: 'body - window type icon',
                slug: 'body-window-type-icon',
                type: 'ImageRef',
                required: false,
                editable: true,
                helpText: '',
                id: '8c5d108b10fbb4ea397257eb00713c5b',
                validations: {}
            },
            {
                name: 'body - use icon',
                slug: 'body-use-icon',
                type: 'ImageRef',
                required: false,
                editable: true,
                helpText: '',
                id: '1a0d842b70772287ca8d19268b9a3449',
                validations: {}
            },
            {
                name: 'roof - exterior color',
                slug: 'roof-exterior-color',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: '93f9575d87c9c4127a94c65aa638950f',
                validations: [Object]
            },
            {
                name: 'roof - window color',
                slug: 'roof-window-color',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: '518b4436c154ccade86f354598a6b68b',
                validations: [Object]
            },
            {
                name: 'roof - window type',
                slug: 'roof-window-type',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: '416ab1cd5f2d313a485565df9a4a4d93',
                validations: [Object]
            },
            {
                name: 'roof - use',
                slug: 'roof-use',
                type: 'PlainText',
                required: false,
                editable: true,
                helpText: '',
                id: 'de012a959fdb79b20df3f649ea65ee67',
                validations: [Object]
            },
            {
                name: 'roof - exterior color icon',
                slug: 'roof-exterior-color-icon',
                type: 'ImageRef',
                required: false,
                editable: true,
                helpText: '',
                id: 'b48afc2582c0325389ffef2d4674c1b7',
                validations: {}
            },
            {
                name: 'roof - window color icon',
                slug: 'roof-window-color-icon',
                type: 'ImageRef',
                required: false,
                editable: true,
                helpText: '',
                id: '370beade821c7f98a715b542045b4f1d',
                validations: {}
            },
            {
                name: 'roof - window type icon',
                slug: 'roof-window-type-icon',
                type: 'ImageRef',
                required: false,
                editable: true,
                helpText: '',
                id: '809941065e0971d6ce54c153293657d7',
                validations: {}
            },
            {
                name: 'roof - use icon',
                slug: 'roof-use-icon',
                type: 'ImageRef',
                required: false,
                editable: true,
                helpText: '',
                id: '9968e41b63a421ac1ef3661eb913a945',
                validations: {}
            },
            {
                name: 'building name',
                slug: 'name',
                type: 'PlainText',
                required: true,
                editable: true,
                id: '9f4e0e456017f4d3cfe00697b842194e',
                validations: [Object]
            },
            {
                name: 'Slug',
                slug: 'slug',
                type: 'PlainText',
                required: true,
                editable: true,
                unique: true,
                id: '193b1db72fc8bca6cc4f7384052d2545',
                validations: [Object]
            },
            {
                name: 'Archived',
                slug: '_archived',
                type: 'Bool',
                required: true,
                editable: true,
                id: '390d5e753df2b191be7def6ecf55ce3b',
                default: false
            },
            {
                name: 'Draft',
                slug: '_draft',
                type: 'Bool',
                required: true,
                editable: true,
                id: 'c2d07b5802b59d9e30529965e0e1b423',
                default: false
            },
            {
                name: 'Created On',
                slug: 'created-on',
                type: 'Date',
                required: false,
                editable: false,
                id: '4dc8309f78330b481273782623a56c8f'
            },
            {
                name: 'Updated On',
                slug: 'updated-on',
                type: 'Date',
                required: false,
                editable: false,
                id: 'e0d6aa72dbfad6ad7b70b5bf94004f06'
            },
            {
                name: 'Published On',
                slug: 'published-on',
                type: 'Date',
                required: false,
                editable: false,
                id: '357c1523d5b39197caddaa7e9678cbea'
            },
            {
                name: 'Created By',
                slug: 'created-by',
                type: 'User',
                required: false,
                editable: false,
                id: 'a74f89c29aa075bab41175febae60fb4'
            },
            {
                name: 'Updated By',
                slug: 'updated-by',
                type: 'User',
                required: false,
                editable: false,
                id: '8acfa9448110f67c8518309a44963344'
            },
            {
                name: 'Published By',
                slug: 'published-by',
                type: 'User',
                required: false,
                editable: false,
                id: '60725b6ac0692a35bc26d2c8df2e320a'
            }],
};
