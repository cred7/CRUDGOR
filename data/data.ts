export type Player = {
  pos: string;
  id: number;
  number: number;
  name: string;
  imageUrl: string;
  position: string;
  nickname: string;
  bio: string;
  dateOfBirth: string;
  nationality: string;
  height: string;
  weight: string;
  dob?: Date;
  social: {
    instagram: string;
  };
};
export type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  // link?: string; // optional external link
  content: string; // full article content
};
export type TicketEvent = {
  id: string;
  title: string;
  date: string; // ISO date
  competition: string;
  venue: string;
  thumbnail: string;
  soldOut?: boolean;
  tiers: {
    name: string;
    price: number;
    available: number;
  }[];
  description?: string;
};

// export const playerData: Player[] = [
//   {
//     id: 1,
//     number: 1,
//     name: "Byrne Omondi",
//     pos: "goalkeeper",
//     position: "Goalkeeper",
//     nickname: "Wall",
//     bio: `Gor Mahia’s first-choice goalkeeper, known for his sharp reflexes and consistency in high-pressure matches.`,
//     dateOfBirth: "15 April 1996",
//     nationality: "Kenyan",
//     height: "185 cm",
//     weight: "82 kg",
//     social: {
//       instagram: "https://www.instagram.com/gadmathews",
//     },
//     imageUrl: "/y.png",
//   },
//   {
//     number: 2,
//     name: "Philemon Otieno",
//     pos: "goalkeeper",
//     position: "Right Back",
//     nickname: "Mbish",
//     bio: `A versatile defender who can play across the backline, bringing leadership and strength to the Gor Mahia defense.`,
//     dateOfBirth: "20 November 1992",
//     nationality: "Kenyan",
//     height: "178 cm",
//     weight: "74 kg",
//     social: {
//       instagram: "https://www.instagram.com/philemonotieno",
//     },
//     imageUrl: "/b.png",
//   },
//   {
//     number: 3,
//     name: "Geoffrey Ochieng",
//     pos: "defender",
//     position: "Left Back",
//     nickname: "Ochesa",
//     bio: `Reliable left back with good overlapping runs and defensive discipline, a key part of Gor Mahia’s backline.`,
//     dateOfBirth: "05 January 1995",
//     nationality: "Kenyan",
//     height: "176 cm",
//     weight: "72 kg",
//     social: {
//       instagram: "",
//     },
//     imageUrl: "/c.png",
//   },
//   {
//     number: 4,
//     name: "Charles Momanyi",
//     position: "Centre Back",
//     pos: "defender",
//     nickname: "Strong Man",
//     bio: `Commanding central defender, strong in aerial duels and marking opposition strikers.`,
//     dateOfBirth: "17 June 1995",
//     nationality: "Kenyan",
//     height: "183 cm",
//     weight: "80 kg",
//     social: {
//       instagram: "",
//     },
//     imageUrl: "/d.png",
//   },
//   {
//     number: 5,
//     name: "Ernest Wendo",
//     position: "Defensive Midfielder",
//     pos: "midfielder",
//     nickname: "Tank",
//     bio: `One of Gor Mahia’s longest-serving midfielders, known for his ball-winning skills and tactical awareness.`,
//     dateOfBirth: "27 November 1991",
//     nationality: "Kenyan",
//     height: "179 cm",
//     weight: "76 kg",
//     social: {
//       instagram: "",
//     },
//     imageUrl: "/e.png",
//   },
//   {
//     number: 6,
//     name: "Alpha Onyango",
//     position: "Central Midfielder",
//     pos: "midfielder",
//     nickname: "Engine",
//     bio: `Young and dynamic midfielder with a strong work rate, key in linking defense and attack.`,
//     dateOfBirth: "14 August 2000",
//     nationality: "Kenyan",
//     height: "180 cm",
//     weight: "74 kg",
//     social: {
//       instagram: "",
//     },
//     imageUrl: "/FKF.jpg",
//   },
//   {
//     number: 7,
//     name: "Benson Omalla",
//     pos: "striker",
//     position: "Striker",
//     nickname: "Goal Machine",
//     bio: `Prolific striker, Gor Mahia’s top scorer in recent seasons, always a threat inside the box.`,
//     dateOfBirth: "12 September 2001",
//     nationality: "Kenyan",
//     height: "182 cm",
//     weight: "78 kg",
//     social: {
//       instagram: "https://www.instagram.com/bensonomalla",
//     },
//     imageUrl: "/FKF.jpg",
//   },
//   {
//     number: 8,
//     name: "Austin Odhiambo",
//     position: "Attacking Midfielder",
//     pos: "midfielder",
//     nickname: "Maestro",
//     bio: `Creative midfielder with excellent vision and passing range, capable of unlocking tight defenses.`,
//     dateOfBirth: "22 December 1999",
//     nationality: "Kenyan",
//     height: "177 cm",
//     weight: "70 kg",
//     social: {
//       instagram: "https://www.instagram.com/austinodhiambo",
//     },
//     imageUrl: "/FKF.jpg",
//   },
//   {
//     number: 9,
//     name: "Peter Lwasa",
//     pos: "striker",
//     position: "Forward",
//     nickname: "Pistol",
//     bio: `Ugandan forward with pace and dribbling ability, capable of playing both as a winger and striker.`,
//     dateOfBirth: "10 May 1996",
//     nationality: "Ugandan",
//     height: "180 cm",
//     weight: "75 kg",
//     social: {
//       instagram: "",
//     },
//     imageUrl: "/FKF.jpg",
//   },
//   {
//     number: 10,
//     name: "John Macharia",
//     pos: "striker",
//     position: "Winger",
//     nickname: "Speedster",
//     bio: `Fast and skillful winger who stretches defenses and provides crucial assists.`,
//     dateOfBirth: "28 April 1998",
//     nationality: "Kenyan",
//     height: "174 cm",
//     weight: "71 kg",
//     social: {
//       instagram: "",
//     },
//     imageUrl: "/FKF.jpg",
//   },
// ];

export const NEWS: NewsItem[] = [
  {
    id: "1",
    title: "Sienna’s Up and Running as a Celt",
    date: "2025-09-30",
    excerpt: "New signing Sienna made her debut in style this weekend...",
    imageUrl: "/pic.jpg",
    content: `
      Sienna shone brightly on her Celtic debut, helping the team secure an important win. 
      Her movement off the ball and sharp link-up play gave fans a glimpse of what’s to come. 
      The Celtic faithful welcomed her warmly, chanting throughout the match.
      
      Manager comments: "Sienna has settled in quickly, she’s a great addition to the squad."
      Sienna shone brightly on her Celtic debut, helping the team secure an important win. 
      Her movement off the ball and sharp link-up play gave fans a glimpse of what’s to come. 
      The Celtic faithful welcomed her warmly, chanting throughout the match.
      
      Manager comments: "Sienna has settled in quickly, she’s a great addition to the squad."
      Sienna shone brightly on her Celtic debut, helping the team secure an important win. 
      Her movement off the ball and sharp link-up play gave fans a glimpse of what’s to come. 
      The Celtic faithful welcomed her warmly, chanting throughout the match.
      
      Manager comments: "Sienna has settled in quickly, she’s a great addition to the squad."
      Sienna shone brightly on her Celtic debut, helping the team secure an important win. 
      Her movement off the ball and sharp link-up play gave fans a glimpse of what’s to come. 
      The Celtic faithful welcomed her warmly, chanting throughout the match.
      
      Manager comments: "Sienna has settled in quickly, she’s a great addition to the squad."
      Sienna shone brightly on her Celtic debut, helping the team secure an important win. 
      Her movement off the ball and sharp link-up play gave fans a glimpse of what’s to come. 
      The Celtic faithful welcomed her warmly, chanting throughout the match.
      
      Manager comments: "Sienna has settled in quickly, she’s a great addition to the squad."
      Sienna shone brightly on her Celtic debut, helping the team secure an important win. 
      Her movement off the ball and sharp link-up play gave fans a glimpse of what’s to come. 
      The Celtic faithful welcomed her warmly, chanting throughout the match.
      
      Manager comments: "Sienna has settled in quickly, she’s a great addition to the squad."
    `,
  },
  {
    id: "2",
    title: "Celtic Academy Produces Rising Stars",
    date: "2025-09-25",
    excerpt: "The youth academy continues to provide quality talent...",
    imageUrl: "/homes.jpg",
    content: `
      Celtic’s Academy prospects impressed in their recent fixture, showcasing 
      technical ability and composure well beyond their years.
    `,
  },

  {
    id: "3",
    title: "Celtic Academy Produces Rising Stars",
    date: "2025-09-25",
    excerpt: "The youth academy continues to provide quality talent...",
    imageUrl: "/hero.jpeg",
    content: `
      Celtic’s Academy prospects impressed in their recent fixture, showcasing 
      technical ability and composure well beyond their years.
    `,
  },

  {
    id: "4",
    title: "Celtic Academy Produces Rising Stars",
    date: "2025-09-25",
    excerpt: "The youth academy continues to provide quality talent...",
    imageUrl: "/homes.jpg",
    content: `
      Celtic’s Academy prospects impressed in their recent fixture, showcasing 
      technical ability and composure well beyond their years.
    `,
  },

  {
    id: "5",
    title: "Celtic Academy Produces Rising Stars",
    date: "2025-09-25",
    excerpt: "The youth academy continues to provide quality talent...",
    imageUrl: "/kit.png",
    content: `
      Celtic’s Academy prospects impressed in their recent fixture, showcasing 
      technical ability and composure well beyond their years.
    `,
  },

  {
    id: "3",
    title: "Celtic Academy Produces Rising Stars",
    date: "2025-09-25",
    excerpt: "The youth academy continues to provide quality talent...",
    imageUrl: "/FKF.jpg",
    content: `
      Celtic’s Academy prospects impressed in their recent fixture, showcasing 
      technical ability and composure well beyond their years.
    `,
  },
  // add more news items here...
];
export const standings = [
  { pos: 1, team: "Gor Mahia", p: 9, pts: 21 },
  { pos: 2, team: "Tusker FC", p: 9, pts: 19 },
  { pos: 3, team: "Kakamega Homeboyz", p: 8, pts: 17 },
  { pos: 4, team: "Kenya Police FC", p: 9, pts: 16 },
  { pos: 5, team: "KCB FC", p: 9, pts: 15 },
  { pos: 6, team: "Bandari FC", p: 8, pts: 14 },
  { pos: 7, team: "AFC Leopards", p: 9, pts: 13 },
  { pos: 8, team: "Sofapaka FC", p: 9, pts: 11 },
  { pos: 9, team: "Posta Rangers", p: 8, pts: 10 },
  { pos: 10, team: "Ulinzi Stars", p: 9, pts: 9 },
  { pos: 11, team: "Shabana FC", p: 8, pts: 9 },
  { pos: 12, team: "Nzoia Sugar", p: 8, pts: 8 },
  { pos: 13, team: "Muhoroni Youth", p: 9, pts: 7 },
  { pos: 14, team: "Murang’a Seal", p: 9, pts: 7 },
  { pos: 15, team: "Bidco United", p: 8, pts: 6 },
  { pos: 16, team: "Talanta FC", p: 8, pts: 4 },
  { pos: 17, team: "Kariobangi Sharks", p: 8, pts: 3 },
  { pos: 18, team: "Vihiga Bullets", p: 8, pts: 2 },
];

export const EVENTS: TicketEvent[] = [
  {
    id: "e1",
    title: "Home League Match vs Rivals FC",
    date: "2025-10-18T15:00:00Z",
    competition: "Premiership",
    venue: "Paradise Stadium",
    thumbnail: "/hero.jpeg",
    tiers: [
      { name: "VIP", price: 500, available: 25 },
      { name: "Standard", price: 200, available: 120 },
    ],
    description:
      "Big league clash under the lights. Expect a full house and intense atmosphere.",
  },
  {
    id: "e2",
    title: "Cup Quarter-Final vs City Wanderers",
    date: "2025-11-02T17:00:00Z",
    competition: "Cup",
    venue: "Paradise Stadium",
    thumbnail: "/FKF.jpg",
    tiers: [
      { name: "VIP", price: 70, available: 0 }, // sold out tier
      { name: "Standard", price: 40, available: 20 },
    ],
    description: "Knockout football — a must-attend fixture.",
  },
  {
    id: "e3",
    title: "Pre-season Friendly vs Continental XI",
    date: "2025-07-25T14:00:00Z",
    competition: "Friendly",
    venue: "Training Ground Arena",
    thumbnail: "/kit.png",
    tiers: [{ name: "Standard", price: 20, available: 200 }],
    description: "Family-friendly friendly to see new signings in action.",
  },
];
