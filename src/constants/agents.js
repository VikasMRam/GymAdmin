export const mostSearchedRegions = [
  {
    to: '/agents/pacific-west',
    image: 'react-assets/agents/regions/pacific-west.jpg',
    title: 'Pacific West',
    states: 'California, Oregon, Washington, Hawaii and Alaska',
  },
  {
    to: '/agents/northeast',
    image: 'react-assets/agents/regions/northeast.jpg',
    title: 'Northeast',
    states: 'New York, New Jersey, Pennsylvania, Connecticut, Massachusetts, Maine, New Hampshire and Rhode Island',
  },
  {
    to: '/agents/south',
    image: 'react-assets/agents/regions/south.jpg',
    title: 'South',
    states: 'Florida, Georgia, North Carolina, South Carolina, Maryland, Virginia and West Virginia',
  },
  {
    to: '/agents/midwest',
    image: 'react-assets/agents/regions/midwest.jpg',
    states: 'Illinois, Indiana, Michigan, Ohio, Wisconsin, Iowa, Kansas, Minnesota and Nebraska',
    title: 'Midwest',
  },
  {
    to: '/agents/southeast',
    image: 'react-assets/agents/regions/southeast.jpg',
    title: 'Southeast',
    states: 'Kentucky, Alabama, Tennessee and Mississippi',
  },
  {
    to: '/agents/southwest',
    image: 'react-assets/agents/regions/southwest.jpg',
    title: 'Southwest',
    states: 'Texas, Oklahoma, Louisiana and Arkansas',
  },
  {
    to: '/agents/mountain-west',
    image: 'react-assets/agents/regions/mountain-west.jpg',
    title: 'Mountain West',
    states: 'Arizona, Colorado, Nevada, New Mexico, Utah, Montana and Idaho ',
  },
];

export const partnerFAQs = [
  {
    title: 'Do I have to leave my current senior living referral agency business to join the Seniorly Agent Program?',
    description: 'No, you do not need to leave your current agency. As a Seniorly Partner Agent you will still operate under your business name and simply receive extra family referrals in addition to your current business.',
  },
  {
    title: 'Can I work on a team with other agents?',
    description: 'Yes. To do so you will need to set up points of contact and your team members’ coverage areas. To apply as a team, please be sure to add each member’s information on the Seniorly Partner Agent application.',
  },
  {
    title: 'Will I receive Assisted Living, Memory Care, Independent Living and Home Care Referrals?',
    description: 'Seniorly will send referrals based on your area of expertise. You will be asked to set up the care types you service in the sign up process.',
  },
  {
    title: 'What are my financial obligations to the program?',
    description: 'This is a success based program, which means there is no obligation or up-front cost. Once a family moves in or selects an in-home option partner agents receive a commission which is a split with Seniorly.',
  },
  {
    title: 'How many referrals can I expect?',
    description: 'Demand from families varies by market and time of year, but our partner agents receive an average of 1-5 referrals each week.',
  },
];

export const agentsFAQs = [
  {
    title: 'What is a Seniorly Partner Agent?',
    description: 'Seniorly Partner Agents, also known as Senior Living Referral Agents or Senior Living Placement Agents are similar to real estate agents in that they know the communities in your area and specialize in helping you find the right fit for your unique budget, location, care, social and other needs. ',
  },
  {
    title: 'How can I benefit from a Seniorly Partner Agent?',
    description: 'The process of choosing the right Senior Living option can be a challenge. A Seniorly Partner Agent will help you seamlessly navigate this process by providing insight into  the best communities in your area for your specific situation. Your agent will also help with other aspects of your transition such as knowing what to look for on a tour, questions to ask, how to negotiate rent and care costs.  In addition, they can help with other items such as moving, financing or furniture. Your agent is there to be your personal guide.',
  },
  {
    title: 'What is the difference between a Seniorly Partner Agent and senior living advisor?',
    description: 'There are a few names that professionals go by who can help you choose an assisted living facility. You may see "senior living" followed by an agent, adviser or expert, or even "eldercare adviser". We refer to our professionals as Seniorly Partner Agents.'
  },
  {
    title: 'Should I use a Seniorly Partner Agent even if I already know the community I’d like to visit?',
    description: 'Yes. Since they do not charge for their services we recommend you speak with an agent. You may already have a great community in mind. A senior living advisor can give a second opinion based on their extensive knowledge, as well as offer best practices for going through the transition process. By the way, visiting additional senior living communities is helpful to ensure you have made the best choice.',
  },
  {
    title: 'How much do Seniorly Partner Agents cost?',
    description: 'There is no cost to you.  Our agents are paid a commission by the senior living community you eventually choose.',
  },
  {
    title: 'How does Seniorly choose its partner agents?',
    description: 'All Seniorly Partner Agents are vetted through a rigorous interview, background check and review process.',
  },
  {
    title: 'How do I get started working with a Seniorly Partner Agent?',
    description: "It's easy. Simply sign up above or complete an inquiry form on any page throughout our site and we will connect you with a preferred agent in your area.",
  },
];

export const AGENT_STATUS_DELETED = -2;

export const AGENT_STATUS_NOT_LIVE = -1;

export const AGENT_STATUS_LIVE = 0;

export const AGENT_STATUS_LIVE_ON_PROFILE = 1;

export const AGENT_STATUS_NAME_MAP = {};
AGENT_STATUS_NAME_MAP[AGENT_STATUS_DELETED] = 'Deleted';
AGENT_STATUS_NAME_MAP[AGENT_STATUS_NOT_LIVE] = 'Not Live';
AGENT_STATUS_NAME_MAP[AGENT_STATUS_LIVE] = 'Live';
AGENT_STATUS_NAME_MAP[AGENT_STATUS_LIVE_ON_PROFILE] = 'Live on Profile';
