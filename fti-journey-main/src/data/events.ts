export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    image: string;
    category: 'Seminar' | 'Webinar' | 'Roadshow' | 'Workshop';
    status: 'upcoming' | 'past';
    registrationLink?: string;
    gallery?: string[];
}

export const events: Event[] = [
    {
        id: '1',
        title: 'UK Education Expo 2024',
        description: 'Meet representatives from top UK universities and get on-the-spot assessment and scholarship guidance.',
        date: 'March 25, 2024',
        time: '10:00 AM - 05:00 PM',
        location: 'Pearl Continental, Lahore',
        image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070&auto=format&fit=crop',
        category: 'Roadshow',
        status: 'upcoming',
        registrationLink: '/apply'
    },
    {
        id: '2',
        title: 'Canada Student Visa Workshop',
        description: 'Detailed session on the new SDS requirements and how to prepare a strong visa file for Canada.',
        date: 'April 05, 2024',
        time: '02:00 PM - 04:00 PM',
        location: 'FTI Lahore Office',
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop',
        category: 'Workshop',
        status: 'upcoming',
        registrationLink: '/apply'
    },
    {
        id: '3',
        title: 'Study in Australia: Group Counselling',
        description: 'Join our expert counsellors to discuss admission requirements for Group of Eight (Go8) universities.',
        date: 'March 15, 2024',
        time: '11:00 AM - 01:00 PM',
        location: 'Online (Zoom)',
        image: 'https://images.unsplash.com/photo-1591115765373-520b7a424a10?q=80&w=2070&auto=format&fit=crop',
        category: 'Webinar',
        status: 'upcoming',
        registrationLink: '/apply'
    },
    {
        id: '4',
        title: 'German Public University Seminar',
        description: 'Learn about free education in Germany and how to navigate the APS process.',
        date: 'February 10, 2024',
        time: '12:00 PM - 03:00 PM',
        location: 'FTI Islamabad Office',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070&auto=format&fit=crop',
        category: 'Seminar',
        status: 'past',
        gallery: [
            'https://images.unsplash.com/photo-1523580494863-6f30312248fd?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop'
        ]
    }
];

export interface GalleryItem {
    id: string;
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
    title: string;
    date: string;
}

export const eventGallery: GalleryItem[] = [
    {
        id: 'g1',
        type: 'image',
        url: '/images/events/486862628_1065657532246393_8360810220740103911_n.jpg',
        title: 'International Education Expo 2024',
        date: 'March 2024'
    },
    {
        id: 'g2',
        type: 'image',
        url: '/images/events/486940278_1065657972246349_5146197752183850095_n.jpg',
        title: 'University Networking Gala',
        date: 'March 2024'
    },
    {
        id: 'g3',
        type: 'image',
        url: '/images/events/486973898_1065657912246355_1959935956418278721_n.jpg',
        title: 'Student Success Seminar',
        date: 'February 2024'
    },
    {
        id: 'g4',
        type: 'image',
        url: '/images/events/487094261_1065657962246350_5472234234352438965_n.jpg',
        title: 'Global Opportunities Workshop',
        date: 'February 2024'
    },
    {
        id: 'g5',
        type: 'image',
        url: '/images/events/487170827_1065657918913021_5556982259516289281_n.jpg',
        title: 'Visa Guidance Masterclass',
        date: 'January 2024'
    },
    {
        id: 'g6',
        type: 'image',
        url: '/images/events/487201481_1065657388913074_4021437408339322130_n.jpg',
        title: 'Career Paths in Canada',
        date: 'January 2024'
    },
    {
        id: 'g7',
        type: 'image',
        url: '/images/events/487333564_1065657872246359_7426232979376838719_n.jpg',
        title: 'UK University Roadshow',
        date: 'December 2023'
    },
    {
        id: 'g8',
        type: 'image',
        url: '/images/events/487445261_1065657285579751_4356136613368656566_n.jpg',
        title: 'Australian Education Fair',
        date: 'December 2023'
    },
    {
        id: 'g9',
        type: 'image',
        url: '/images/events/487453856_1065657862246360_1486215060333367221_n.jpg',
        title: 'MSc Business Analytics Info Session',
        date: 'November 2023'
    },
    {
        id: 'g10',
        type: 'image',
        url: '/images/events/487456397_1065657362246410_6884207708311686253_n.jpg',
        title: 'Engineering PhD Workshop',
        date: 'November 2023'
    },
    {
        id: 'g11',
        type: 'image',
        url: '/images/events/487477407_1065657525579727_1015412520177025639_n.jpg',
        title: 'Scholarship Readiness Program',
        date: 'October 2023'
    },
    {
        id: 'g12',
        type: 'image',
        url: '/images/events/487480014_1065657868913026_5822729024542863634_n.jpg',
        title: 'Germany Study Visa Seminar',
        date: 'October 2023'
    },
    {
        id: 'g13',
        type: 'image',
        url: '/images/events/487480695_1065658052246341_5819128849235083406_n.jpg',
        title: 'Annual Alumni Meetup',
        date: 'September 2023'
    },
    {
        id: 'g14',
        type: 'image',
        url: '/images/events/487480702_1065657348913078_3612135965523578145_n.jpg',
        title: 'IELTS Preparation Day',
        date: 'September 2023'
    },
    {
        id: 'g15',
        type: 'image',
        url: '/images/events/487481289_1065657152246431_110357734592938687_n.jpg',
        title: 'Digital Arts Exhibition',
        date: 'August 2023'
    },
    {
        id: 'g16',
        type: 'image',
        url: '/images/events/487481570_1065657945579685_9211554382484587030_n.jpg',
        title: 'USA Ivy League Consultancy',
        date: 'August 2023'
    },
    {
        id: 'g17',
        type: 'image',
        url: '/images/events/488206259_1065657275579752_2913211478086177871_n.jpg',
        title: 'Medical Studies Abroad Fair',
        date: 'July 2023'
    },
    {
        id: 'g18',
        type: 'image',
        url: '/images/events/488245198_1065657888913024_6122937613769150815_n.jpg',
        title: 'Architecture Portfolio Review',
        date: 'July 2023'
    },
    {
        id: 'g19',
        type: 'image',
        url: '/images/events/488250808_1065657942246352_8134595992882463931_n.jpg',
        title: 'Sustainability Career Talk',
        date: 'June 2023'
    },
    {
        id: 'g20',
        type: 'image',
        url: '/images/events/488259562_1065658022246344_8891457210008545447_n.jpg',
        title: 'Tech Innovation Summit',
        date: 'June 2023'
    },
    {
        id: 'g21',
        type: 'image',
        url: '/images/events/488569882_1065657952246351_7665891907961104364_n.jpg',
        title: 'International Law Expo',
        date: 'May 2023'
    },
    {
        id: 'g22',
        type: 'image',
        url: '/images/events/event.jpg',
        title: 'Grand Education Expo Highlights',
        date: 'May 2023'
    },
    {
        id: 'g23',
        type: 'image',
        url: '/images/events/487502395_1065657395579740_3348352280067604910_n.jpg',
        title: 'Counseling Session Islamabad',
        date: 'April 2023'
    },
    {
        id: 'g24',
        type: 'image',
        url: '/images/events/487505486_1065658045579675_1394092983667805637_n.jpg',
        title: 'Student Visa Workshop',
        date: 'April 2023'
    },
    {
        id: 'g25',
        type: 'image',
        url: '/images/events/487505555_1065657968913016_1795050000451341493_n.jpg',
        title: 'Europe Education Fair',
        date: 'March 2023'
    },
    {
        id: 'g26',
        type: 'image',
        url: '/images/events/487506378_1065657882246358_5637280087086982176_n.jpg',
        title: 'Networking Brunch',
        date: 'March 2023'
    },
    {
        id: 'g27',
        type: 'image',
        url: '/images/events/487506391_1065657892246357_4391147692984553881_n.jpg',
        title: 'Tech Education Seminar',
        date: 'February 2023'
    },
    {
        id: 'g28',
        type: 'image',
        url: '/images/events/487506474_1065657938913019_8943126080971094397_n.jpg',
        title: 'Career Counseling Day',
        date: 'February 2023'
    },
    {
        id: 'g29',
        type: 'image',
        url: '/images/events/487975236_1065657855579694_448682580494584836_n.jpg',
        title: 'Global University Expo',
        date: 'January 2023'
    },
    {
        id: 'g30',
        type: 'image',
        url: '/images/events/487987715_1065657858913027_8767321220298174294_n.jpg',
        title: 'Scholarship Success Stories',
        date: 'January 2023'
    },
    {
        id: 'g31',
        type: 'image',
        url: '/images/events/487998988_1065657278913085_6766004450981610781_n.jpg',
        title: 'New Student Orientation',
        date: 'December 2022'
    }
];
