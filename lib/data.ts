export const TEAMS_2026 = [
  // Group A
  { id: "usa", name: "USA", flag: "🇺🇸", group: "A" },
  { id: "mexico", name: "Mexico", flag: "🇲🇽", group: "A" },
  { id: "canada", name: "Canada", flag: "🇨🇦", group: "A" },
  // Group B
  { id: "argentina", name: "Argentina", flag: "🇦🇷", group: "B" },
  { id: "chile", name: "Chile", flag: "🇨🇱", group: "B" },
  { id: "peru", name: "Peru", flag: "🇵🇪", group: "B" },
  // Group C
  { id: "brazil", name: "Brazil", flag: "🇧🇷", group: "C" },
  { id: "colombia", name: "Colombia", flag: "🇨🇴", group: "C" },
  { id: "paraguay", name: "Paraguay", flag: "🇵🇾", group: "C" },
  // Group D
  { id: "england", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "D" },
  { id: "france", name: "France", flag: "🇫🇷", group: "D" },
  { id: "belgium", name: "Belgium", flag: "🇧🇪", group: "D" },
  // Group E
  { id: "germany", name: "Germany", flag: "🇩🇪", group: "E" },
  { id: "spain", name: "Spain", flag: "🇪🇸", group: "E" },
  { id: "portugal", name: "Portugal", flag: "🇵🇹", group: "E" },
  // Group F
  { id: "netherlands", name: "Netherlands", flag: "🇳🇱", group: "F" },
  { id: "austria", name: "Austria", flag: "🇦🇹", group: "F" },
  { id: "switzerland", name: "Switzerland", flag: "🇨🇭", group: "F" },
  // Group G
  { id: "morocco", name: "Morocco", flag: "🇲🇦", group: "G" },
  { id: "senegal", name: "Senegal", flag: "🇸🇳", group: "G" },
  { id: "south-africa", name: "South Africa", flag: "🇿🇦", group: "G" },
  // Group H
  { id: "japan", name: "Japan", flag: "🇯🇵", group: "H" },
  { id: "south-korea", name: "South Korea", flag: "🇰🇷", group: "H" },
  { id: "australia", name: "Australia", flag: "🇦🇺", group: "H" },
  // Group I
  { id: "iran", name: "Iran", flag: "🇮🇷", group: "I" },
  { id: "saudi-arabia", name: "Saudi Arabia", flag: "🇸🇦", group: "I" },
  { id: "uzbekistan", name: "Uzbekistan", flag: "🇺🇿", group: "I" },
  // Group J
  { id: "nigeria", name: "Nigeria", flag: "🇳🇬", group: "J" },
  { id: "egypt", name: "Egypt", flag: "🇪🇬", group: "J" },
  { id: "cameroon", name: "Cameroon", flag: "🇨🇲", group: "J" },
  // Group K
  { id: "croatia", name: "Croatia", flag: "🇭🇷", group: "K" },
  { id: "serbia", name: "Serbia", flag: "🇷🇸", group: "K" },
  { id: "ukraine", name: "Ukraine", flag: "🇺🇦", group: "K" },
  // Group L
  { id: "ecuador", name: "Ecuador", flag: "🇪🇨", group: "L" },
  { id: "uruguay", name: "Uruguay", flag: "🇺🇾", group: "L" },
  { id: "venezuela", name: "Venezuela", flag: "🇻🇪", group: "L" },
];

export const POINTS_SYSTEM = {
  groupWin: 3,
  groupDraw: 1,
  groupLoss: 0,
  roundOf32: 1,
  roundOf16: 2,
  quarterFinal: 3,
  semiFinal: 5,
  runnerUp: 7,
  winner: 10,
};

export const FIXTURES = [
  // Group Stage - sample fixtures (June 2026)
  { id: "f1", date: "2026-06-11", time: "19:00", teamA: "mexico", teamB: "usa", stage: "Group A", venue: "Estadio Azteca, Mexico City" },
  { id: "f2", date: "2026-06-12", time: "16:00", teamA: "canada", teamB: "mexico", stage: "Group A", venue: "BMO Field, Toronto" },
  { id: "f3", date: "2026-06-13", time: "19:00", teamA: "usa", teamB: "canada", stage: "Group A", venue: "MetLife Stadium, New York" },
  { id: "f4", date: "2026-06-12", time: "13:00", teamA: "argentina", teamB: "chile", stage: "Group B", venue: "Hard Rock Stadium, Miami" },
  { id: "f5", date: "2026-06-13", time: "16:00", teamA: "peru", teamB: "argentina", stage: "Group B", venue: "Levi's Stadium, San Francisco" },
  { id: "f6", date: "2026-06-14", time: "13:00", teamA: "chile", teamB: "peru", stage: "Group B", venue: "Rose Bowl, Los Angeles" },
  { id: "f7", date: "2026-06-13", time: "13:00", teamA: "brazil", teamB: "colombia", stage: "Group C", venue: "SoFi Stadium, Los Angeles" },
  { id: "f8", date: "2026-06-14", time: "16:00", teamA: "paraguay", teamB: "brazil", stage: "Group C", venue: "AT&T Stadium, Dallas" },
  { id: "f9", date: "2026-06-15", time: "13:00", teamA: "colombia", teamB: "paraguay", stage: "Group C", venue: "NRG Stadium, Houston" },
  { id: "f10", date: "2026-06-14", time: "19:00", teamA: "england", teamB: "france", stage: "Group D", venue: "Gillette Stadium, Boston" },
  { id: "f11", date: "2026-06-15", time: "16:00", teamA: "belgium", teamB: "england", stage: "Group D", venue: "Lincoln Financial Field, Philadelphia" },
  { id: "f12", date: "2026-06-16", time: "13:00", teamA: "france", teamB: "belgium", stage: "Group D", venue: "MetLife Stadium, New York" },
  { id: "f13", date: "2026-06-15", time: "19:00", teamA: "germany", teamB: "spain", stage: "Group E", venue: "Levi's Stadium, San Francisco" },
  { id: "f14", date: "2026-06-16", time: "16:00", teamA: "portugal", teamB: "germany", stage: "Group E", venue: "Rose Bowl, Los Angeles" },
  { id: "f15", date: "2026-06-17", time: "13:00", teamA: "spain", teamB: "portugal", stage: "Group E", venue: "SoFi Stadium, Los Angeles" },
  { id: "f16", date: "2026-06-16", time: "19:00", teamA: "netherlands", teamB: "austria", stage: "Group F", venue: "AT&T Stadium, Dallas" },
  { id: "f17", date: "2026-06-17", time: "16:00", teamA: "switzerland", teamB: "netherlands", stage: "Group F", venue: "NRG Stadium, Houston" },
  { id: "f18", date: "2026-06-18", time: "13:00", teamA: "austria", teamB: "switzerland", stage: "Group F", venue: "Hard Rock Stadium, Miami" },
  { id: "f19", date: "2026-06-17", time: "19:00", teamA: "morocco", teamB: "senegal", stage: "Group G", venue: "Gillette Stadium, Boston" },
  { id: "f20", date: "2026-06-18", time: "16:00", teamA: "south-africa", teamB: "morocco", stage: "Group G", venue: "Lincoln Financial Field, Philadelphia" },
  { id: "f21", date: "2026-06-19", time: "13:00", teamA: "senegal", teamB: "south-africa", stage: "Group G", venue: "MetLife Stadium, New York" },
  { id: "f22", date: "2026-06-18", time: "19:00", teamA: "japan", teamB: "south-korea", stage: "Group H", venue: "BMO Field, Toronto" },
  { id: "f23", date: "2026-06-19", time: "16:00", teamA: "australia", teamB: "japan", stage: "Group H", venue: "Estadio Azteca, Mexico City" },
  { id: "f24", date: "2026-06-20", time: "13:00", teamA: "south-korea", teamB: "australia", stage: "Group H", venue: "Levi's Stadium, San Francisco" },
  { id: "f25", date: "2026-06-19", time: "19:00", teamA: "iran", teamB: "saudi-arabia", stage: "Group I", venue: "Rose Bowl, Los Angeles" },
  { id: "f26", date: "2026-06-20", time: "16:00", teamA: "uzbekistan", teamB: "iran", stage: "Group I", venue: "SoFi Stadium, Los Angeles" },
  { id: "f27", date: "2026-06-21", time: "13:00", teamA: "saudi-arabia", teamB: "uzbekistan", stage: "Group I", venue: "AT&T Stadium, Dallas" },
  { id: "f28", date: "2026-06-20", time: "19:00", teamA: "nigeria", teamB: "egypt", stage: "Group J", venue: "NRG Stadium, Houston" },
  { id: "f29", date: "2026-06-21", time: "16:00", teamA: "cameroon", teamB: "nigeria", stage: "Group J", venue: "Hard Rock Stadium, Miami" },
  { id: "f30", date: "2026-06-22", time: "13:00", teamA: "egypt", teamB: "cameroon", stage: "Group J", venue: "Gillette Stadium, Boston" },
  { id: "f31", date: "2026-06-21", time: "19:00", teamA: "croatia", teamB: "serbia", stage: "Group K", venue: "Lincoln Financial Field, Philadelphia" },
  { id: "f32", date: "2026-06-22", time: "16:00", teamA: "ukraine", teamB: "croatia", stage: "Group K", venue: "MetLife Stadium, New York" },
  { id: "f33", date: "2026-06-23", time: "13:00", teamA: "serbia", teamB: "ukraine", stage: "Group K", venue: "BMO Field, Toronto" },
  { id: "f34", date: "2026-06-22", time: "19:00", teamA: "ecuador", teamB: "uruguay", stage: "Group L", venue: "Estadio Azteca, Mexico City" },
  { id: "f35", date: "2026-06-23", time: "16:00", teamA: "venezuela", teamB: "ecuador", stage: "Group L", venue: "Levi's Stadium, San Francisco" },
  { id: "f36", date: "2026-06-24", time: "13:00", teamA: "uruguay", teamB: "venezuela", stage: "Group L", venue: "Rose Bowl, Los Angeles" },
];
