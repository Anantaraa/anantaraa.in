import p1 from '../assets/p1.png'
import p2 from '../assets/p2.png'
import p3 from '../assets/p3.png'

export const projects = [
    {
        id: 'silent-house',
        title: 'The Silent House',
        type: 'Residential',
        location: 'Kyoto, Japan',
        year: '2024',
        role: 'Architecture & Interior',
        img: p1,
        desc: "A meditation on light and shadow.",
        challenge: "To build a sanctuary in a dense urban fabric that feels completely isolated from the noise of the city.",
        solution: "We turned the house inward, creating a central courtyard that acts as a light well. The exterior facade is a solid concrete shell, while internal walls are glass shoji screens that diffuse light throughout the day.",
        stats: [
            { label: 'Area', value: '450 sqm' },
            { label: 'Material', value: 'Concrete' },
            { label: 'Status', value: 'Completed' }
        ]
    },
    {
        id: 'apex-tower',
        title: 'Apex Tower',
        type: 'Commercial',
        location: 'New York, USA',
        year: '2023',
        role: 'Facade Design',
        img: p2,
        desc: "Verticality redefined for the modern workforce.",
        challenge: "Creating a distinct identity in the Manhattan skyline while adhering to strict zoning setbacks.",
        solution: "A parametric facade system that self-shades based on solar orientation. The twisting form reduces wind load and creates unique corner offices on every floor.",
        stats: [
            { label: 'Height', value: '320m' },
            { label: 'Floors', value: '72' },
            { label: 'Cert', value: 'LEED Platinum' }
        ]
    },
    {
        id: 'canvas-loft',
        title: 'Canvas Loft',
        type: 'Interior',
        location: 'Berlin, Germany',
        year: '2023',
        role: 'Renovation',
        img: p3,
        desc: "Raw concrete meets soft textiles.",
        challenge: "Converting a cold, industrial warehouse into a warm family home without losing its brutalist character.",
        solution: "We preserved the original concrete columns and ceilings but introduced warm oak flooring and linen drapes to soften acoustics. Floating partition walls define spaces without interrupting the open plan.",
        stats: [
            { label: 'Area', value: '200 sqm' },
            { label: 'Budget', value: 'Confidential' },
            { label: 'Timeline', value: '14 Months' }
        ]
    },
    {
        id: 'dune-pavilion',
        title: 'Dune Pavilion',
        type: 'Public',
        location: 'Dubai, UAE',
        year: '2024',
        role: 'Concept',
        img: p1,
        desc: "Architecture that mimics the shifting sands.",
        challenge: "Designing a temporary exhibition space that blends seamlessly with the desert landscape.",
        solution: "A tensile fabric structure inspired by Bedouin tents, anchored by rammed earth walls. The form allows for natural ventilation, keeping the interior cool without air conditioning.",
        stats: [
            { label: 'Capacity', value: '500 pax' },
            { label: 'Material', value: 'Rammed Earth' },
            { label: 'Type', value: 'Temporary' }
        ]
    }
]
