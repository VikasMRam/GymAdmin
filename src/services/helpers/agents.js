import { urlize, stateRegionMap, getStateAbbr, objectToURLQueryParams } from 'sly/services/helpers/url';
import { assetPath } from 'sly/components/themes';

export const mostSearchedRegions = [
  {
    to: '',
    image: assetPath('images/cities/SanFrancisco.jpeg'),
    title: 'West Coast',
  },
  {
    to: '',
    image: assetPath('images/cities/SanFrancisco.jpeg'),
    title: 'East Coast',
  },
  {
    to: '',
    image: assetPath('images/cities/SanFrancisco.jpeg'),
    title: 'Southeast',
  },
  {
    to: '',
    image: assetPath('images/cities/SanFrancisco.jpeg'),
    title: 'Midwest',
  },
  {
    to: '',
    image: assetPath('images/cities/SanFrancisco.jpeg'),
    title: 'South',
  },
];

export const agents =[
  {
    "id":"oasis-denver-metro-daphne-jean-and-lisa-theard",
    "name":"Oasis Denver Metro, CO (Daphne Jean and Lisa Theard)",
    "agentBio":"Daphne Jean and Lisa Theard understand the emotional struggles, financial pressures and other difficulties involved when deciding whether to move a loved one from their home to the safety of a community, whether that be independent or assisted living or more involved care, such as long-term and memory care locations.  Daphne was raised in Atlanta, Georgia and moved to St. Louis, Missouri after college.  Her passion for community service led her to the Greater St. Louis Literacy Council as a volunteer instructor. Lisa was born in New Jersey and moved to Colorado when her father retired from the military. While she was working in corporate America, her dad suffered a stroke and was diagnosed with Alzheimer’s Disease. From then on, Lisa became heavily involved in his care and the complexities that came with it. They are here to help you through, step by step. Daphne Jean and Lisa Theard partnered with Seniorly in 2018. ",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/99ae88dbcd4cef84ec2027c7bbfdbb38/OasisDenver_Seniorly_sd.png",
    "status":1,
    "address":{
      "id":"3ce07ca40c7c180111e32804c9ac7009",
      "city":"Denver",
      "state":"CO"},
    "user":{
      "id":"2a03b285d134958535f724dfec8fca7b",
      "name":"Daphne Jean And Lisa Theard"
    }},
  {
    "id":"senior-care-authority-richmond-va-lisa-h-isbell",
    "name":"Senior Care Authority Richmond, VA (Lisa H. Isbell)",
    "agentBio":"Lisa Isbell has spent her career working with people and assisting them as they plan and prepare for various stages of life. After obtaining her undergraduate degree from Mary Washington College in Fredericksburg, Virginia, and her graduate degree from the University of Richmond, Lisa started her career in the corporate offices at Circuit City Stores, Inc. Realizing she preferred to be interacting with people and away from a desk, Lisa obtained her insurance license and started to work with seniors to navigate Medicare, long term care, and retirement planning. She became a Certified Senior Advisor and Registered Investment Advisor, operating her own business for over a decade before being asked to join a growing local church and help lead church operations. Over the next ten years, Lisa managed over 70 different departments and over 1500 volunteers in the church, leading countless events and outreach efforts locally, nationally and internationally. Seeking to work with seniors and their families again, Lisa opened Senior Care Authority of Central Virginia after experiencing care need situations with her own parents. Knowing that finding the right care for loved ones can be stressful and frustrating, Lisa and her team work patiently with families, helping them navigate residential and home care options. Working with a wide range of experts and local resources, Lisa and her team help make the transition to care a smooth one for seniors and their families. Lisa Isbell partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/6e0f43156f18de6b02b0ae6b050a4462/Screen%2520Shot%25202018-08-09%2520at%25205.16.04%2520PM_sd.png",
    "status":1,
    "address":{
      "id":"897ea5a9ce3fd83f16d465f4ac805884",
      "city":"Glen Allen",
      "state":"VA"},
    "user":{
      "id":"ce6d301325f2b434688b34d277703917",
      "name":"Lisa Isbell"
    }},
  {
    "id":"senior-care-authority-el-dorado-county-ca-maureen-simmons",
    "name":"Senior Care Authority El Dorado County, CA (Maureen Simmons)",
    "agentBio":"Maureen Simmons has always been passionate about helping others during challenging times. Growing up in the heart of LA, she spent many hours helping homeless women transition into shelters. While attending UC Santa Barbara, she not only continued her outreach to the homeless but also started visiting residents in nearby nursing homes. \n\nAs Maureen searched for assisted living for two family members, she learned first hand what a stressful process it entails. Realizing the need for educating families about long term care options, she embraced the opportunity to work as a Senior Care Authority Advisor demonstrating her natural ability to find the best solutions for her clients. \n\nMaureen knows it all starts with understanding the specific needs of each family. “I am in a unique position to guide families in the right direction because in addition to having toured the homes and communities, I keep current with the state inspections. I am an advocate for families in helping them find the most appropriate care for their loved ones and providing peace of mind with the outcome.”\n\nAfter a series of health challenges with several family members, Maureen had to find Memory Care for her sister and then again for her uncle who had experienced elder abuse from an at-home caregiver. \"I just remember having so many questions and concerns and feeling so lost during the process. It was overwhelming, to say the least.\"\n\nRealizing the need for educating families about long-term care options, Maureen embraced the opportunity to work as a Senior Care Authority Advisor with those seeking to find the best care for their loved ones. \"I want to make a difference during this difficult transition and it all starts with building a relationship and trust.\" She spends many hours researching and touring various facilities in the area to ensure her clients have peace of mind and they are treated with the dignity they deserve.\n\nMaureen is always happy to help with all the necessary services related to assisted living facilities or residential care home for your loved ones in El Dorado County. Maureen Simmons partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/3acbcb6d6e46d914fd4de9b9c53593c7/Maureen_sd.JPG",
    "status":1,
    "address":{
      "id":"fc471ea2be3ae340efdda70ae5ad7538",
      "city":"El Dorado Hills",
      "state":"CA"},
    "user":{
      "id":"0b4d5119f1f965c7185c40bf4156a08d",
      "name":"Maureen Simmons"
    }},
  {
    "id":"ask-carol-hudson-counties-nj-inna-grinshpun",
    "name":"Ask-Carol Hudson Counties, NJ (Inna Grinshpun)",
    "agentBio":"Inna Grinshpun is the Carol’s Senior Living Advisor in Bergen, Passaic, Morris and Hudson counties. She saw firsthand what her family went through caring for her Grandma, and trying to keep her at home. If they have known then what they know now, they would have instead chose an Assisted Living community.\n\nInna's grandma was a very strong-willed person who cared for and supported her large family. When it came time for her family to care for Grandma, they got in touch with one of the most recommended home care agencies and hired them.\n\nAt first it seemed to go fine, but then the problems began.  Constant staff turnover, uneven quality among the aides, and overall dissatisfaction with the care. Grandma’s quality of life declined as her lack of mobility kept her from seeing her friends or even going outside. Years later Inna visited her first assisted living community and her grandma came to mind right away. Living in a home-like environment, getting consistent support, and socializing with other people would have drastically improved her quality of life. When Inna heard about Ask-Carol! from one of her husband’s friends, she was excited about it and decided to join Carol in helping seniors and their families.\n\nIn her role in Bergen, Passaic, Morris and Hudson counties, she looks forward to helping you and your family find the right solutions for your parents. Inna Grinshpun partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/b9b31d09e74f7e31c1bd655aec18ed5e/Inna%2520Grinshpun_sd.jpg",
    "status":1,
    "address":{
      "id":"bacbb6c62eb64c93c78b979ff013c684",
      "city":"Tinton Falls",
      "state":"NJ"},
    "user":{
      "id":"a9e7406849b6985070e1b25bb13643d3",
      "name":"Inna Grinshpun"
    }},
  {
    "id":"assisted-living-locators-hillsborough-nj-tara-hett",
    "name":"Assisted Living Locators, Hillsborough NJ (Tara Hett)",
    "agentBio":"Tara Hett has been in the healthcare industry for over 30 years and holds a Master’s Degree in Business Administration.   Tara is passionate about helping others and providing excellent customer service.   \nShe is happily married to Alan and has one son, Jesse who is 28 years old.  Tara and Alan grew up in Piscataway, NJ and have lived in the Princeton area for more than 20 years.  During their free time Tara loves to spend time with family and friends, bike ride, and attend live music events. Tara looks forward to assisting your family in finding the perfect care for your loved one.  Tara Hett partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/b14be55c2ed4bf4907e4aa223be7e6f2/Tara%2520H%25204x4_sd.jpg",
    "status":1,
    "address":{
      "id":"3f7b6e6b099223478339ab5d0c3684a8",
      "city":"Hillsborough",
      "state":"NJ"},
    "user":{
      "id":"59a69424a9577018ed6af9fe7f314fb3",
      "name":"Tara Hett"
    }},
  {
    "id":"assisted-living-locators-western-ct-mimi-santry",
    "name":"Assisted Living Locators, Western CT (Mimi Santry)",
    "agentBio":"Mimi Santry is an eldercare advisor and owner of Assisted Living Locators Western CT.  Mimi enjoys working closely with families to identify solutions related to the aging of a loved one.  She intimately knows the options in south western Connecticut and can efficiently identify communities that are a good fit in terms of budget, location, level of care, culture and other desired amenities.  She also works with the top tier home health providers, should staying at home be preferred by the family.\nMimi worked for fifteen years in financial industry, where she advised mid-market companies on raising debt, mezzanine and equity capital.  She was recognized as one of Charlotte’s Top Women in Business and closed her firm’s largest recorded fee transaction.  She is a graduate of Princeton University and after working for eleven years on Wall Street and four years in Charlotte, she settled in Greenwich, Connecticut to raise her five children. \nWhen a family wrestles with finding care and housing for a senior, Mimi’s ability to be caring, efficient and analytical will make a difficult process much less stressful and produce a more tailored outcome. Mimi Santry partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/35681dc75090e67af44f9e63812405ba/Mimi%2520Santry%25204x4_sd.jpg",
    "status":1,
    "address":{
      "id":"226b51bdee4362f45905fd25db5999e5",
      "city":"Greenwich",
      "state":"CT"},
    "user":{
      "id":"f01d9009f5b44f273eb8951e3706ac91",
      "name":"Mimi Santry"
    }},
  {
    "id":"a-caring-heart-senior-solutions-donlyn-young",
    "name":"A Caring Heart Senior Solutions (Donlyn Young)",
    "agentBio":"Donlyn Young first started to work with seniors when she was in high school and also did a variety of volunteer programs throughout her educational experience and have always had a heart for the senior population since navigating her own grandparents' aging experiences.  She going into her 12th year of helping families find the best care/placement options they can for their loved ones.  It's often a difficult and challenging time, but she is here to hold their hand throughout the entire process, including visiting after placement to see how they are doing.  Donlyn has her Master's in Clinical Psychology from Pepperdine University, which has been quite helpful in navigating family dynamics and going over clinical intakes of co-morbid diagnoses.  She takes a whole person- centered approach when considering options and also has her Residential Care Facility for the Elderly Administrator Certification (Certificate #6034279740 through the CA Department of Social Services). Donlyn Young partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/31ff57ea3eef8ee1a3ff68dfe8945e95/IMG_3215_sd.JPG",
    "status":1,
    "address":{
      "id":"524cb3c59e6945c746127364ea149968",
      "city":"Aliso Viejo",
      "state":"CA"},
    "user":{
      "id":"c69894ab37fb889a7af10b803b85c228",
      "name":"Donlyn Young"
    }},
  {
    "id":"linda-iwamoto",
    "name":"Linda Iwamoto",
    "agentBio":"Linda Iwamoto's role is to educate, support and guide families through the process of selecting the right living situation, for their loved ones, based upon individual need and preference. She has evaluated communities, large and small, for staffing, safety, cleanliness, cost, food quality and compliance as mandated by the state of California. She personally escorts clients on tours of licensed communities that match their needs and coordinate the transition by helping them complete required paperwork. As a daughter who has experienced this process, when her Mother was no longer safe at home, she understands the stress that families may experience and listen carefully to their needs and concerns. Linda Iwamoto partnered with Seniorly in 2016.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/f8fef5588eeca1f5b4faf0897bf6dcd1/0_sd.jpg",
    "status":1,
    "address":{
      "id":"7fecb969cc6bc063034d1c054d4191cf",
      "city":"Pleasanton",
      "state":"CA"},
    "user":{
      "id":"5d17e6c5a9b2f138f442396607090203",
      "name":"Linda Iwamoto"
    }},
  {
    "id":"senior-advantages-assisted-living-placement",
    "name":"Senior Advantages Assisted Living Placement",
    "agentBio":"Senior Advantages was founded with the mission of finding the right assisted living for the right client. Over our 25 years in business we have had the privileged to find Assisted, independent and memory care living options to thousands of Florida residents. Our team of professionals assessed each client based on their care needs, budget and desired location to determine the best 3-4 communities to fit their needs. We then accompany families on tours and answer any questions you may have along the way. We then assist with everything from negotiating the contract to helping to find local move managers. All of this is completely FREE to the client.  Senior Advantages partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/0e66405170ee791d88556e26fc886873/senior%2520advantages_sd.png",
    "status":1,
    "address":{
      "id":"611de734897ffef9a3c14b1262c2c356",
      "city":"Fort Lauderdale",
      "state":"FL"},
    "user":{
      "id":"d7653db331282087129ea1841267fa47",
      "name":"Senior Advantages"
    }},
  {
    "id":"assisted-living-locators-annapolis-md-donna-butman",
    "name":"Assisted Living Locators Annapolis, MD (Donna Butman)",
    "agentBio":"Donna Butman’s knowledge of the needs of an aging population and their families came first from supporting her mother as Mom aged in place in her original home, downsized, moved closer to family and, eventually, choose assisted living at the age of 96. When her mother passed, Donna wished to use her knowledge and experience to help others who find themselves at choice points with loved ones. She opened her Assisted Living Locators franchise with the goal to offer assistance and guidance to families facing life-care decisions.\n\nDonna approaches her life through the lenses of education and service. She has advanced degrees where her research focused on strategies for successful aging.  Additionally, forty years of experience in business have allowed Donna to hone her skills in evaluating resources, discerning client needs and recommending solutions.  She successfully pairs those skills with the wisdom, compassion, and empathy of experience to assist her clients to reach their goals. \n\nRecently repatriated to Maryland, Donna is involved with several community organizations and volunteering with Partners In Care.  Donna Butman partnered with Seniorly in 2018.\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/758d1ac2fb8e32a35389d8aa27d9015e/Donna%2520B%25204x4_sd.jpg",
    "status":1,
    "address":{
      "id":"8a6bae07a4a667dbc755f5177f2afb22",
      "city":"Odenton",
      "state":"MD"},
    "user":{
      "id":"d24e9f4c4fadbcbacabfefac484abad5",
      "name":"Donna Butman"
    }},
  {
    "id":"oasis-mckinney-tx-olia-davis",
    "name":"Oasis North Dallas Suburbs, TX ( Olia Davis)",
    "agentBio":"Olia Davis was born and raised in Toronto, Ontario Canada. Prior to joining Oasis Senior Advisors, she had a rewarding career working in telecommunications focusing on business operations. She started her career in Canada and in 1998 relocated to McKinney Texas, where she still reside today.\n\nOlia came across Oasis Senior Advisors at a time in her life when she was looking to transition into a more personally fulfilling endeavor. What she loves about Oasis is the personalized touch of helping seniors and their families navigate through the process of finding a home that will meet their needs while also maintaining their quality of life.\n\nAs your Oasis Senior Advisor, it would be Olia's honor to be your advocate, making this lifestyle change as seamless, and as easy as possible for you and/or your loved one.  Olia Davis partnered with Seniorly in 2018.\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/2de95cf7383dff49f7be159579da0371/Olia_Davis_Oasis_Seniorly_sd.png",
    "status":1,
    "address":{
      "id":"1130deae2b7e5013b14428ba824e4059",
      "city":"Mc Kinney",
      "state":"TX"},
    "user":{
      "id":"9d8b0f3e8b4927ff5ec0640332d45fe4",
      "name":"Olia Davis"
    }},
  {
    "id":"steve-villa",
    "name":"Senior Care Authority, Contra Costa CA (Steve Villa)",
    "agentBio":"Steve Villa, Senior Care Authority’s representative in Contra Costa County, is Transitions with Care, a professional, full-service Senior Living Placement agency. He is the owner of Transitions With Care, whose intimate knowledge of the assisted living, residential care homes and memory care locations are in Contra Costa County and Tri Valley areas of Northern California. A graduate of Santa Clara University with a BS in Psychology, he started his elder care business in 2012. Steve Villa partnered with Seniorly in 2017.\n\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/3a29a352749330c0495783c6245b5bf0/steve-villa_sd.jpg",
    "status":1,
    "address":{
      "id":"0a6928377349cbb1bb41ba52c2ad91a1",
      "city":"Danville",
      "state":"CA"},
    "user":{
      "id":"9e0580b91370c343dfe2ee403556ba9e",
      "name":"Steve Villa"
    }},
  {
    "id":"assisted-living-locators-northern-colorado-maureen-walker",
    "name":"Assisted Living Locators, Northern CO (Maureen Walker)",
    "agentBio":"Maureen Walker has over 25-years of experience in senior living as an Executive Director and Regional Operations Director.  A graduate of the University of Northern Colorado and resident in the front range the past 30 years, she has strong connections to area organizations.  She is involved and serves as Ambassador on the local Chamber, is active within the Alzheimer’s Association as both a support group lead and member of the local memory walk committee.  In addition, she is a member of the Eldercare Network, Women in Business, Weld Senior Network, and several local leadership groups.  She possesses her assisted-living license in both Colorado and Wyoming.\nMaureen and her husband Gordon have three adult children and four grandchildren living in the area and enjoy the roles of Grandma and Poppy.  They are also involved in their local church serving in a variety of roles within marriage and mission ministries.  \nShe brings passion and energy to her work serving people and is driven by the internal rewards that come with helping people have positive experiences.  Maureen’s expertise in local resources will ensure the delivery of services that meet your family’s needs.  Maureen Walker partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/f2ba41dd46ce51bc2c6634964e0ec68a/Maureen%2520Walker%25204x4_sd.jpg",
    "status":1,
    "address":{
      "id":"f98660e1a049ff72a80753aae465ec8e",
      "city":"Johnstown",
      "state":"CO"},
    "user":{
      "id":"05b3534ff92471873cdf83ead0fe8fb7",
      "name":"Maureen Walker"
    }},
  {
    "id":"christopher-valenti",
    "name":"Christopher Valenti",
    "agentBio":"Christopher Valenti was the primary caregiver for his Grandmother and helped her find the best assisted living options when she was no longer safe at home.  He is a Licensed Real Estate Broker and a Certified RCFE Administrator.  Certified Administrators are individuals designated by licensees of Residential Care Facilities for the Elderly (RCFE) to act on their behalf in the overall management of their facilities.  Prior to helping older adults and their families, Christopher was the Marketing Director for a large assisted living community in San Mateo County.  \n \nChristopher realizes that there are many factors involved in finding the right living situation for our loved ones and those in need.  Most families are not familiar with the care options available.  Therefore, he listens carefully and explores many issues with the family to understand their particular situation and determine the best alternatives.  He will escort you to communities that meet your needs based on location, care levels, cost and any other factors that are important to your family. Christopher Valenti partnered with Seniorly in 2016.\n ",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/21821712baf5024faf3b35a0c006d7b1/0_0_0_0_230_246_csupload_16344206_sd.jpg",
    "status":1,
    "address":{
      "id":"5636e4a2e12ba2f938502d5cc74b0b43",
      "city":"San Francisco",
      "state":"CA"},
    "user":{
      "id":"75be5a6606afa5b066e98531c24735bc",
      "name":"Christopher Valenti"
    }},
  {
    "id":"senior-living-connections-oh",
    "name":"Senior Living Connections OH (Rebekah Johnson)",
    "agentBio":"Rebekah Johnson was the caretaker for both her mother and her aunt after a 35 year career in IT sales. She understands how overwhelming the process can be searching for just the right assisted living environment. She commends you for taking the first important step. She listens to her client’s needs and knows how to guide them through the senior living search process. Rebekah is patient and kind and has a caring heart and will help make your process as seamless as possible. Rebekah Johnson partnered with Seniorly in 2018.\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/5a628d8b1f488b85e594812929d11e72/Rebekah_Johnson_Senior_Living_Connections_Seniorly_sd.jpg",
    "status":1,
    "address":{
      "id":"e70dbea65baac7dfd24eabf1f15f60ed",
      "city":"Newark",
      "state":"OH"},
    "user":{
      "id":"297cd12d7ae8fdf2a9a039806a8f9a9f",
      "name":"Rebekah Johnson "
    }},
  {
    "id":"texas-family-services-corey",
    "name":"Texas Family Services (Corey Goward)",
    "agentBio":"Corey Goward has always had a desire to help people, so it is fitting that he found his way into senior housing placements. He has not always been so lucky. Corey's education is in finance and accounting. The entire time he was in school his mom would yell at me, “You are not an accountant!” “You need to work with people and help others.” He guesses when people say momma knows best, they are right. It took him six long years to realize that accounting was not for him. He needed to help people; it makes the work he does not feel like work. Corey finally made the career change to home health marketing 3 years ago and loved it. However, his wife, who is a social worker, approached him about taking over part of her business, Texas Family Services. After helping his first family, there was no looking back. He enjoys every aspect, from taking the initial phone call, researching communities to meet the clients every need, and touring the communities with the family. He looks forward to helping more families in the near future in Austin, Texas. Corey Goward partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/7cec9f9e78f29c38a88a02d3c4bd8132/Corey_Goward_photo_01_Seniorly_sd.png",
    "status":1,
    "address":{
      "id":"ea171ba9cc041f874a6316e5ee6936ab",
      "city":"Austin",
      "state":"TX"},
    "user":{
      "id":"9f1d2656890af828d9c398710907c39e",
      "name":"Corey Goward"
    }},
  {
    "id":"john-alagood",
    "name":"Senior Care Authority Dallas (John Alagood)",
    "agentBio":"John Alagood grew up on stories about prohibition, Model T Fords, and canning food for lean winters. His grandfather rode in covered wagons and saw a man land on the moon. His love of family and legacy, as well as tragic experience with Alzheimer’s, led him to become a senior living and care advisor.\n\nA Certified Senior Advisor, Certified Dementia Professional, and Certified Public Accountant, John, and his team serve seniors in his local community of Dallas-Fort Worth. His crisis experience, both in his professional and personal life, allows him to help families make courageous and informed decisions under difficult circumstances.\n\nJohn spends a great deal of time touring and reviewing the local living communities — including assisted living, independent living, dementia and memory care, and residential care homes — to help his clients make the best possible decision for their loved ones.\n\nJohn’s team works at no cost to the family, receiving a commission similar to a realtor or apartment locator from the location chosen by the family.\n\nJohn is always happy to help determine the best assisted living or memory care communities, or residential care homes for your loved ones in the Dallas-Forth Worth area. John Alagood partnered with Seniorly in 2017.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/c654a2907abd7752ba255c812a0df6e6/john-alagood_seniorly_sd.jpg",
    "status":1,
    "address":{
      "id":"17343af153071d0584b88ad732a51b0c",
      "city":"Coppell",
      "state":"TX"},
    "user":{
      "id":"748c03548b9aeeb7f9673244b0c21a79",
      "name":"John Alagood"
    }},
  {
    "id":"encore-senior-resources-jim",
    "name":"Encore Senior Resources (Jim Humphrey)",
    "agentBio":"Jim Humphrey believes that becoming his parent's parents has been one of the most challenging jobs he has ever faced. He recalls that many life experiences did not prepare him when his mother fought their dementia. It taught him the values of honor, respect, dignity, and compassion. These moments helped drive him to help others who face similar challenges. \n\nJim also knows that sons and husbands often become reluctant caregivers, and need support to weather the storm. Making the decision to place a loved one in someone else’s care can be eased with the hand of someone, like Jim, who knows the options for a successful change in lifestyle.  Jim Humphrey partnered with Seniorly in 2018.\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/e47618a1f18f541e199ab6f97ebb19ef/Jim%2520business%2520photo_sd.jpg",
    "status":1,
    "address":{
      "id":"c66663c226dcf1915ebd98fa52fdf3d8",
      "city":"Oro Valley Arizona",
      "state":"AZ"},
    "user":{
      "id":"7698a2fe6bdafcad1d36fae9d3b40086",
      "name":"James Humphrey"
    }},
  {
    "id":"oasis-senior-advisor-chicago-julianne",
    "name":"Oasis Chicago, IL (Julianne Rizzo)",
    "agentBio":"Julianne Rizzo have been a registered nurse since 1996. The majority of her nursing experiences was in caring for cancer patients and as an operating room RN, helping patients and their families through some of life’s difficult moments. After completing her MBA from Western Governors University in 2006, she shifted her focus to more administrative duties and service line development, where she received multiple “Center of Excellence” recognitions for programs I developed. Julianne is a lifelong resident of Illinois and a loyal Cubs fan. \n\nAfter experiencing firsthand the stress that health issues can place on a family in caring for a loved one, she decided to change careers. Julianne looked for an opportunity that would utilize her nursing skills and business background, and was introduced to Oasis. She considers it a privilege to be a part of your journey and to walk with you and your loved ones in navigating through making what is undoubtedly one of the most important decisions of your lives.\n\nWhat she loves about Oasis Senior Advisors is the personal approach. Julianne has toured every property she presents to you, and based on your social, physical, and financial needs, together you will find the best community for your loved one. Her personal and professional passion has always been to help people and make a difference, and assisting clients to determine the best quality of life is a privilege and a responsibility that she takes very seriously. Julianne Rizzo partnered with Seniorly in 2018.\n\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/dec9224b502b174371e0ac4348b8afdd/Julianne.Rizzo_sd.JPG",
    "status":1,
    "address":{
      "id":"b2fe51e7b46f98e7fdc8588b3f60ed05",
      "city":"Westchester",
      "state":"IL"},
    "user":{
      "id":"165e28eae5dacf2f0ee3aa462b6e67b2",
      "name":"Julianne Rizzo"
    }},
  {
    "id":"mary-schleeter-and-diane-houlton",
    "name":"Aging Plan-It (Mary and Diane)",
    "agentBio":"Diane Houlton is a gerontologist, placement specialist and co-founder of Aging Plan-it.  After earning a bachelor’s degree in Journalism at Sacramento State University, she later received three associate’s degrees at American River College, and a master’s degree in gerontology from San Francisco State University in 2014.  In preparation to work in the field of aging, she completed internships in assisted living facilities, Del Oro Caregiver Resource Center, and a year as a long-term care ombudsman.  She holds a license as an administrator for residential care facilities for the elderly.  A member of the Gerontological Society of America and the American Society on Aging, Diane writes a blog at www.fixedpurpose.com with information on successful aging.  In addition, Diane was a Girl Scout volunteer in Rocklin for 19 years and is a proud Air Force daughter, wife and mother. \n\nMary Schleeter was a family caregiver and she personally understands the everyday challenges families experience with their loved ones.  While studying Gerontology, Mary held internships and volunteer positions in the areas of aging and mental health, hospice and geriatric care management.  Prior to becoming a gerontologist, Mary worked for over 20 years in the corporate world of finance, fraud investigations, technology, management and marketing. Mary is an adjunct professor at American River College in the Gerontology Department.  She is also serving as a commissioner on the Sacramento County Adult and Aging Commission. Both Diane and Mary have been a partner of Seniorly since 2017. ",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/b05851d7cbbffbed602a796339f3e3d1/Diane%2520Houlton_sd.jpg",
    "status":1,
    "address":{
      "id":"f2a27d17d98cd55051e1efd04944149f",
      "city":"Rocklin",
      "state":"CA"},
    "user":{
      "id":"fbee17558d329fe1d5ac8925b438c887",
      "name":"Diane Houlton And Mary Schleeter"
    }},
  {
    "id":"adult-care-advisors",
    "name":"Adult Care Advisors (Carol or Dina)",
    "agentBio":"Carol Katz began the process of placing a loved one into a senior care community several years ago. Soon after, a number of friends who needed to do the same approached her for help. At this point, Carol realized that many families struggle with understanding senior care and finding it for their loved ones. She also realized that talking with others about the process and the experience can make it easier.\n\nIn 2009, Carol Katz and her daughter Dina Frauwirth began Adult Care Advisors with the mission of helping families receive free advice about elder care and assisted living in general. Carol and her team have been serving their community by offering useful advice and valuable resources about senior living care facilities. Carol also spends time volunteering on the first aid squad, as well as working on the domestic violence intervention team. Carol Katz partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/b24414414dc4ac5683fad90d62161beb/Screenshot%25202018-07-12%2520at%25201.50.48%2520PM_sd.png",
    "status":1,
    "address":{
      "id":"a71d0d54aff3a7c8d63cca00a1f1bc76",
      "city":"Manalapan",
      "state":"NJ"},
    "user":{
      "id":"5b22bd6455461b7ebab78a587b829315",
      "name":"Carol Katz"
    }},
  {
    "id":"residential-options-for-seniors-and-the-elderly-rose",
    "name":"Residential Options for Seniors and the Elderly, ROSE (Virginia Renker)",
    "agentBio":"Virginia Renker is the owner of Residential Options for Seniors and the Elderly (ROSE) and is a CSA, Certified Senior Advisor, which means she understands the key health, social and financial factors that are important to seniors as well as how these factors work together. She has her Master’s in Public Health and a 25 year background in both health and academic settings. Virginia spent the early part of her career in the hospitality industry and recognizes quality service.\n\nShe knows that when a family member transitions to a new home, people need to be able to rely on someone who can assist them in evaluating their options and making the best choices. After all, many people don’t realize how difficult this process can be until they begin a search and just don’t know what to look for. Virginia’s goal is to eliminate as much stress and anxiety as possible during this life change, while providing friendship, guidance, information and support along the way.  Virginia Renker partnered with Seniorly in 2017.\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/72c9c6f81848576c733f078946d071f4/facebook%2520Aug%25202017%25202_sd.jpg",
    "status":1,
    "address":{
      "id":"98369ee79223adae847c70d25e9b9f75",
      "city":"La Mesa",
      "state":"CA"},
    "user":{
      "id":"5491a1b5d06c8cc5a2247c989d9274e7",
      "name":"Virginia Renker"
    }},
  {
    "id":"nulantern-megan-wiswell",
    "name":"NuLantern (Megan Wiswell)",
    "agentBio":"Megan Wiswell has over twenty years of experience in customer service. She started in\ncustomer service with her first job in retail and has been drawn back to it time and again. Along the way she has also acquired skills in management, stand up training, one-on-one training, consulting, customer/employee satisfaction surveying, event planning, writing original website content and senior placement.\n\nOver the last two years, Megan has been busy writing online content for senior websites and touring Assisted Living communities in the San Diego area. This experience led her to form her own placement company, NuLantern, LLC. This foray into the world of Assisted Living has paired nicely with her background in Skilled Nursing and customer service. NuLantern offers placement services to seniors who are transitioning from home to an Independent Living, Assisted Living or Memory Care community. Megan Wiswell partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/ede2264b7d3ad70e33ac7e3544658876/Screenshot%25202018-07-12%2520at%25202.15.09%2520PM_sd.png",
    "status":1,
    "address":{
      "id":"bf50ee292d136c0315bc7884ef451ada",
      "city":"San Marcos",
      "state":"CA"},
    "user":{
      "id":"71851c863c2ec7b763317803842d4ebb",
      "name":"Megan Wiswell"
    }},
  {
    "id":"delta-senior-referral-services",
    "name":"Delta Senior Referral Services (Jenanne Faust)",
    "agentBio":"Jenanne Faust’s heart has always felt fullest when helping seniors.  As a young girl, she felt inspired to work with seniors through time spent with her grandfather in long-term care, and school outings to local convalescent homes.  Feeling particularly affected when witnessing seniors suffering the effects of stroke, she was compelled to received her bachelor’s degree in Speech Pathology and Audiology, focusing on geriatric care.\n\nJenanne has worked in senior care locally since 2008, holding positions as a director of marketing and executive director.  Her background and experience help to provide families with an accurate summary of their local options, guiding the process using a consultative and compassionate approach, and ultimately aiming to make the decision process as smooth and seamless as possible.\n\nJenanne is a third-generation Lodian, whose most treasured time is with her two-year-old boy and girl twins, and her loving, supportive husband.  Her hobbies include carpentry, interior design, gardening and enjoying the great outdoors. Jenanne Faust partnered with Seniorly in 2017.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/f42f7b12a5abdbb2e2ca8b38c6f5eea9/jenanne_Seniorly_sd.jpg",
    "status":1,
    "address":{
      "id":"ebe3ac4d39051509f69319b447c3f768",
      "city":"Stockton",
      "state":"CA"},
    "user":{
      "id":"c0e4345a1126c1b0cd3471b52ce50d11",
      "name":"Jenanne Faust"
    }},
  {
    "id":"oasis-silicon-valley-ca-mike-scoggin",
    "name":"Oasis Silicon Valley, CA (Mike Scoggin)",
    "agentBio":"Mike Scoggin was raised on classic Midwestern values and sensitivities, having grown up in the Chicago suburbs. He was very active in both school and extracurricular activities, such as church and musical groups. Upon completion of my electrical engineering degree, Mike migrated to Silicon Valley. He's had a successful career in high tech and military/aerospace, and is now inspired to transition into a more personally fulfilling endeavor. \n\nMike's dad passed in 2007, and he was very close to his mom. At first reluctant, his mom has thoroughly enjoyed her new home in an assisted-living community since 2009. Mike experienced firsthand the challenges of finding the best fit for Mom. Through his frequent visits, he is able to ensure that the staff in her community continues to provide quality and personalized care. \n\nMike often reflect on the supreme dedication and sacrifice his parents made raising his family, and he realizes that there are so many in their generation that has given so much to create healthy and happy homes. Joining Oasis Senior Advisors enables him to give back. His personal charter is to help those people by providing face-to-face, personalized senior housing guidance and options to match them with their ideal assisted living community. Mike Scoggin partnered with Seniorly in 2018. ",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/454a2f7e2dd3c2feea647cfdd6aa1c5f/MikeScoggin_Seniorly_sd.jpg",
    "status":1,
    "address":{
      "id":"f89b0282af2d15e0b47c65d84ee22e53",
      "city":"Los Gatos",
      "state":"CA"},
    "user":{
      "id":"115ec0d114ab4a23e5ba95d557f6de0f",
      "name":"Mike Scoggin"
    }},
  {
    "id":"kelila-heller",
    "name":"Assisted Living Connections (Kelila Heller)",
    "agentBio":"Kelila Heller’s path of service and calling in life is being an Eldercare Advisor. She is passionate about helping families and seniors find the care and assistance they deserve. In short, she wants people to have the best quality of life possible.\n\nKelila is a licensed Administrator, Residential Care Facility for the Elderly by the State of California, Department of Social Services.\n\nKelila and her husband raised their two adult sons and have been residents of Thousand Oaks for 30 years. Her mother Bobbie lives locally in a large assisted living community. Kelila loves being a resource and counselor for seniors and their families, helping them obtain the best information as they explore assisted living and home care choices. Kelila Heller partnered with Seniorly in 2017.\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/977979314b67417089f7132637c55d22/Kelila%2520Biz%2520Pic%25204_sd.jpg",
    "status":1,
    "address":{
      "id":"d780eff9eefc2fdf323d7eda9ec18f0e",
      "city":"Thousand Oaks",
      "state":"CA"},
    "user":{
      "id":"763575b40fd58afcb1bb6b77201a949c",
      "name":"Kelila Heller"
    }},
  {
    "id":"mark-and-karyn-wolff",
    "name":"Senior Care Authority, Sacramento CA (Mark and Karyn Wolff)",
    "agentBio":"Mark and Karyn Wolff spend countless hours inspecting and rating residential locations including smaller care homes, medium-sized and larger care communities.   Inspections means meeting the staff and reviewing regulator reports to advise you of any citations or deficiency that may have been issued against a particular location.  As Senior Care Advisors, they will meet personally with you to discuss options and will accompany you on visits to locations to ensure all your questions are answered and even assist with negotiations. Mark and Karyn will only show you the best locations based on their proprietary rating system, and the hallmark of their service commitment is that they will be by your side every step of the way. Mark and Karyn Wolff partnered with Seniorly in 2017.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/77449ed8954b7aaea43c51e4e79b1deb/mark_sd.jpg",
    "status":1,
    "address":{
      "id":"d8d6dccf558fa8a322ded78a0c8dfe60",
      "city":"Rocklin",
      "state":"CA"},
    "user":{
      "id":"65864ab8b58948586daa222cab8a8c9f",
      "name":"Mark And Karyn Wolff"
    }},
  {
    "id":"a-to-z-gerontology-dorothy",
    "name":"A to Z Gerontology (Dorothy Guajardo)",
    "agentBio":"Dorothy Guajardo's mission is to be an advocate and elder care advisor for you and your family as you navigate the confusing and often frustrating world of senior care and senior services.  She is very passionate about using my years of experience in various areas of senior care to help you find the right care or living situation for your aging loved one.  \n\nHer journey to becoming an elder care specialist started when she became the primary caregiver for my mother who suffered for many years from congestive heart failure.  Dorothy cared for her until she passed away on hospice in 2005. She understands first-hand how scary it can be to try to navigate things like home care and hospice when you have never experienced them before. This experience inspired her to pursue a degree in Gerontology because she saw the high demand for people with expertise in the needs of the aging population.  Dorothy attended San Francisco State where she received her graduate degree in Gerontology, the study of old age, the process of aging, and the particular problems of old people.  \n\nAfter graduating Dorothy jumped into the senior care industry where she gained the experience to help find the best care for your loved one.  She has completed 480 hours of an Administrator Training Program in a local Assisted Living and Memory Care community where she was able to shadow all of the directors and see first hand what their jobs entail.  Many of these hours were spent working in the memory care unit where she  became confident in working with residents experiencing many different forms of dementia.  She later worked at Northern California branch of the Alzheimer’s Association where she made connections with important resources in the local community that can make caring for a loved one living with Alzheimer’s and dementia easier.  Connections included home care agencies, day programs, support groups for families and people suffering from Alzheimer’s and dementia, and hospice. Becoming the Assistant Executive Director of a local memory care helped her gain expertise in the a memory care community. Let her take the lead on gathering paperwork while you concentrate on your loved one.  \n\nOverall her goal is to work tirelessly for you and your family.  Dorothy will meet with you to determine the best situation that works for both you and most importantly for your loved one.  Dorothy Guajard partnered with Seniorly in 2018.\n\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/0e3aeffd1e315070693a283064b12fca/4be25b522a4eb855bdae6b01ac014c1a_sd.jpeg",
    "status":1,
    "address":{
      "id":"98226e8e063e86a8aba1f858bc8dca54",
      "city":"Petaluma",
      "state":"CA"},
    "user":{
      "id":"2528f5f3f0631c3ba9ac4a6bf377068b",
      "name":"Dorothy Guajardo"
    }},
  {
    "id":"cat-shepherd",
    "name":"Senior Care Referral Specialists (Cat and Christy)",
    "agentBio":"Catharine Shepard, the President of Senior Care Referral Specialists, Inc. and her team of local consultants are professionals with over 20 years of combined knowledge and experience at all levels in the eldercare field. They have assisted thousands of families in their search for appropriate senior living and care, and are a resource for many senior industry and care professionals, who refer to them frequently.\n\nCatharine grew up in a home with her grandmother living with her family until she needed a level of care that could not be provided at home. Her first volunteer position in junior high school was in a nursing home, where she continued developing a love for the elderly. Her background in personnel, training and development in various fields led to a career in healthcare, where she has been responsible for the training and management of many eldercare consultants before starting Senior Care Referral Specialists, Inc. Catharine Shepard partnered with Seniorly in 2017.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/1c6c79a043f81e44ffb8c05d4832f2ce/Catharine%2520Shepard%2520Headshot_sd.jpg",
    "status":1,
    "address":{
      "id":"8b8151c780da12605cea19113fd71643",
      "city":"Menifee",
      "state":"CA"},
    "user":{
      "id":"6f7a92a47eb27e75ce68a9e249891428",
      "name":"Catharine Shepard And Christy Howell"
    }},
  {
    "id":"assisted-living-locators-carolinas-nc-ken-laura-o-dea",
    "name":"Assisted Living Locators, Carolinas NC (Ken & Laura O’Dea)",
    "agentBio":"Ken O'Dea has worked in the financial services/insurance industry for many years, helping clients identify needs and offer solutions, that assisted them with financial security for their families and businesses, in the areas of business succession planning, college funding, retirement planning and estate preservation. Utilizing life insurance, business, and long-term care products to help them transition into the next phase of life. The prospect to work with seniors and their families to find the right living community and resources to help them transition to a new phase of their lives, seemed a natural progression of life long planning for his client. Ken O'Dea partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/2675c1396c1e8ac54efddf2f3e3fb122/Ken_Odea_Assisted_living_locators_seniorly_sd.jpg",
    "status":1,
    "address":{
      "id":"a6ae906aed930c4b50777ffeb0fe5088",
      "city":"Charlotte",
      "state":"NC"},
    "user":{
      "id":"4d5f83f02097482c0f8b61f0115f025c",
      "name":"Ken O'dea"
    }},
  {
    "id":"oasis-central-florida-fl-lori-legrand",
    "name":"Oasis Central Florida, FL (Lori LeGrand)",
    "agentBio":"Lori LeGrand was born and raised in Central Wisconsin, though after she married her husband, they moved to Minnesota, Wisconsin, New York, and Florida as they followed his career. Together, they raised two daughters, and Lori has always maintained a close sense of family and the joyful desire to help others face their challenges.\n\nShe started her journey caring for the elderly in Syracuse, NY as a receptionist at an assisted living facility. From there, she became an Activities Director for seniors and worked in both Alzheimer care and assisted living facilities settings, as well as working in home care. She has a true compassion for seniors, and strives to provide them with the support and care they need to handle changes in their lives. With over 20 years of experience working with seniors, Lori  still appreciated the help she received when we had to place her parents into care.\n\nIt is now time for her to help others with their transition needs. When faced with those hard decisions regarding your loved ones, you can trust that Lori will work hard to help you and find the best options for your family—no matter what you require. Her mission with Oasis Senior Advisors® is to be a personal resource for families, friends, and everyone involved in a senior’s life. She takes pride in guiding you with trustworthy, compassionate care, so you can find the right place for your loved one together. Lori LeGrand partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/317a7431a5cb081a021149951c393958/Screen%2520Shot%25202018-07-18%2520at%25203.47.34%2520PM_sd.png",
    "status":1,
    "address":{
      "id":"d7a209eb1b498a9a4c3dc71a642c72d1",
      "city":"Lakeland",
      "state":"FL"},
    "user":{
      "id":"e90a72f324b007050bb3caaa8fcb7e48",
      "name":"Lori Le Grand"
    }},
  {
    "id":"assisted-living-locators-glendale-az-lori-sears",
    "name":"Assisted Living Locators Glendale, AZ (Lori Sears)",
    "agentBio":"Lori Sears is the Owner/CEO of Assisted Living Locators, West Valley.  She is a Registered Nurse and was born in Northwest Missouri. She has been in the health and wellness industry for more than 20 years, with most of that time spent working in the skilled nursing business as a clinical liaison, working for a nationally known acute rehab hospital, and was instrumental in the opening of two new skilled nursing facilities in the Phoenix metro area prior to beginning her current business.  She is happily married to Steve who is a State Farm insurance agent in Tempe, AZ. Lori and Steve have five children and a 3-year-old granddaughter. \nLori is passionate about her work and the families she represents. She loves lending her personal touch to help her clients find the best fit in Independent and memory care settings and Assisted Living homes and communities. Lori Sears partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/9e201557482c51f6f43af49ccb066ecb/Lori%2520Head%2520Shot%25204x4_sd.jpg",
    "status":1,
    "address":{
      "id":"9f0f43c27ab1021520d90a03b1c1e89c",
      "city":"Queen Creek",
      "state":"AZ"},
    "user":{
      "id":"2706bae36c2c463ba07a0774df4f7068",
      "name":"Lori Sears"
    }},
  {
    "id":"oasis-cleveland-west-oh-holly-and-rick-adkins",
    "name":"Oasis Cleveland West, OH (Holly and Rick Adkins)",
    "agentBio":"Holly Adkins and Rick Adkins have lived in the Bay Village and Cleveland area for most of their lives. They have raised three successful children, and now live on their own with their wonderful Chocolate Labrador Retriever named Bailey. Until they have grandchildren, she is the apple of their eye. They love to lie on the beach and read, garden, and run (with Bailey), and are active in their church.\n\nRick has been an accountant throughout his career and Holly has had a variety of experiences, from being a telephone operator to teaching preschool. In the past seven years, they have had the opportunity to help both their parents find senior housing, unfortunately in dramatically different circumstances. Holly’s mom became ill and had to make the transition to a temporary care facility. They were under a time crunch, and yet had to do all the research and all the visits. It would have been helpful to have someone who was plugged into the area to help them make an educated decision. Rick's parents had more time, but they moved to Florida. His sister assisted them, but did it primarily via the internet. That was so impersonal; they believe that the personal touch along with expertise in the area will ease your burden when making these types of tough decisions. \n\nThat is why Holly and Rick joined Oasis. Their mission is to be a helping hand to those of you going through this difficult decision. They can help to lower the stress and give you an empathetic touch as you go through this stressful time. It would be their great honor to help you with your decision. Holly and Rick Adkins partnered with Seniorly in 2018.\n\n\n\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/59e2bcdbeb21538fdd3dcbaf211ba122/Screen%2520Shot%25202018-07-18%2520at%25203.38.57%2520PM_sd.png",
    "status":1,
    "address":{
      "id":"7b9bd5c6f8685e433d001b9ad3016875",
      "city":"Bay Village",
      "state":"OH"},
    "user":{
      "id":"5d612247dc39093f85e4e7ae44666a28",
      "name":"Holly Adkins And Rick Adkins"
    }},
  {
    "id":"assisted-living-locators-of-the-triangle-nc-allison-schneider-gulledge",
    "name":"Assisted Living Locators, Triangle NC (Allison Schneider-Gulledge)",
    "agentBio":"Allison Schneider-Gulledge brings more than 30 years’ experience in the healthcare industry having worked in both the hospital setting and pharmaceutical industry. She has called the Triangle home for more than 25 years and her knowledge of this diverse and growing area makes her a valuable asset to seniors and their families.\nAllison is a firm believer in “trusting the journey” and feels that her background and knowledge\nwill help seniors and their families along their journey in making the assisted living decisions\nthat meet their needs. Her caring and compassionate nature will give them the confidence they\nneed to allow her to help guide them on this often difficult and challenging journey and she\nlooks forward to working together as their advocate. When she isn’t working, Allison enjoys spending time with her friends, traveling, and flipping “found” furniture. She considers her two daughters and their families among her greatest blessings. Allison Schneider-Gulledge partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/26e4bbb040c40a44897f07356f934c2d/Allison%2520Schneider-Gulledge%25204x4_sd.jpg",
    "status":1,
    "address":{
      "id":"3551794733ffd283b6958f11c03e12e1",
      "city":"Raleigh",
      "state":"NC"},
    "user":{
      "id":"1dbb0ac40f6de5226207e7b7339259e4",
      "name":"Allison Schneider Gulledge"
    }},
  {
    "id":"assisted-living-locators-of-waukesha-wi",
    "name":"Assisted Living Locators of Waukesha WI (Dave Ciccantelli)",
    "agentBio":"Dave Ciccantelli is proud to be the owner of Wisconsin’s first Assisted Living Locators franchise. After 30+ successful years as a software engineer in the challenging IT world, Dave decided it was time for a change. His experiences with placing his elderly father and a desire to give back to his community brought him to Assisted Living Locators. He serves Waukesha county along with portions of Milwaukee county. Dave has degrees in Biology and IT. His experience in the corporate IT world taught him the value of building strong strategic relationships with his peers and enabled him to develop his exceptional interpersonal communication skills. In his spare time, Dave is a working musician who performs at various clubs/festivals/venues in the SE Wisconsin area. He occasionally offers his talents to local eldercare communities to entertain their residents. Dave Ciccantelli partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/22a29f3983c43e11cb2eff236e747b5f/cic_033-5_sd.jpg",
    "status":1,
    "address":{
      "id":"091569feab7080fed0d3883a47479242",
      "city":"Brookfield",
      "state":"WI"},
    "user":{
      "id":"81d796bbcd93031bee4fc23bf7ffa6bf",
      "name":"Dave Ciccantelli"
    }},
  {
    "id":"joseph-judy-gallagher",
    "name":"Oasis Richmond, VA (Joseph & Judy Gallagher)",
    "agentBio":"Joe Gallagher is a native of Richmond, Virginia, and entered the workforce in manufacturing. He not only created products for 30 years, but teams, as he climbed the ladder and took on leadership roles and corporate titles. As Joe moved around the country, he discovered that most of all he liked team building and helping others to be their best. Upon returning to Richmond so that his family could be with aging family members, He found that his background of being the son of a nurse certainly came in handy. The pastoral care work in his private life increased and his joy increased along with it. Joe and Judy believe that Oasis Senior Advisors is the perfect blend of their live's two journeys. Joseph & Judy Gallagher partnered with Seniorly in 2017.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/0dd1194be294f8abb194e8558d635347/Joseph_Judy_Gallagher_Seniorly_sd.jpg",
    "status":1,
    "address":{
      "id":"c95675e64b99bf97b93c788026da80b5",
      "city":"Henrico",
      "state":"VA"},
    "user":{
      "id":"5c83951d15ff53048b3a5d8eeb6b1175",
      "name":"Joe And Judy Gallagher"
    }},
  {
    "id":"golden-age-senior-referral-agency-tanya",
    "name":"Golden Age Senior Referral Agency (Tanya Balam)",
    "agentBio":"Tanya Balam has been working in the skilled nursing and assisted living industry for over 5 years. She and her team have visited countless assisted living facilities in the Los Angeles area, and are prepared to help you or your loved one find the perfect facility to meet your needs. With over 700 assisted living facilities in Los Angeles alone, let Tanya and her team help you navigate through the different levels of care, amenities, activities, and concierge services that are available. Tanya Balam partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/d74518507831dec1029b9cbf3c7f450c/Tanya_Seniorly_sd.png",
    "status":1,
    "address":{
      "id":"d821fdc071904caf3831e50144043018",
      "city":"Van Nuys",
      "state":"CA"},
    "user":{
      "id":"6adf88d24b965efc925dddbf6154e0ca",
      "name":"Tanya Balam"
    }},
  {
    "id":"oasis-fairfield-county-ct-paul-and-susan",
    "name":"Oasis Fairfield County CT (Paul and Susan Doyle)",
    "agentBio":"Susan and Paul Doyle are THE experts in Senior Living options in NY & CT and will work with your family face-to-face, in a caring and compassionate manner you won’t find anywhere else.   \n\nSusan & Paul will help you get the information you need to find the right place for your loved one. and help you understand what might lie ahead and how to be best prepared  They are unbiased, HIPAA compliant (to protect your privacy), and there is never a charge for their services.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/ecb065005b672d7eb4b87347e412f965/TheDoyles_Seniorly_sd.jpg",
    "status":1,
    "address":{
      "id":"d7d73f8e818f21445dd72fc105b80f36",
      "city":"Stamford",
      "state":"CT"},
    "user":{
      "id":"03d6fad906469e91ecfc1ef3ecbca2ba",
      "name":"Paul Doyle & Susan Doyle"
    }},
  {
    "id":"senior-care-authority-utah-jeremy-lisa",
    "name":"Senior Care Authority, Utah (Jeremy & Lisa Pike)",
    "agentBio":"Jeremy Pike assists each senior care family through the process of visiting a selection of communities and residential care homes, based on the family’s requirement, and support them in making the best, most informed decisions. He also continues to mentor families on an ongoing basis once a new home is selected. \n\nJeremy and Lisa are married, have 4 children – and his parents and in-laws all live in Utah. Jeremy Pike partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/efe73078d75d0e72080cbc02ed91a3e6/jeremy-pike_seniorly_sd.jpg",
    "status":1,
    "address":{
      "id":"33c284ef62a43c691fb1b6ce5994a943",
      "city":"Sandy",
      "state":"UT"},
    "user":{
      "id":"7c08b3a720b3b01c039aa6ac168e0848",
      "name":"Jeremy Pike"
    }},
  {
    "id":"senior-care-authority-minneapolis-metro-kathy-johnson",
    "name":"Senior Care Authority, Minneapolis Metro MN (Kathy and Matt Johnson)",
    "agentBio":"Kathy and Matt Johnson have experienced the journey many of their clients are on. Kathy’s mom was diagnosed with Alzheimer’s in 2010. Along with her siblings, Kathy has supported her dad as he’s navigated caring for her mom, understanding long term care insurance benefits and seeking memory care. Matt was by his mother’s side while in hospice. Kathy’s 30+ years in executive roles have helped her develop a strength in bringing order out of chaos, leading complex projects, multi-tasking and working with a wide range of people. A life-long resident of the Twin Cities, Matt grew up in Minneapolis. Kathy is from Iowa, but has called the Twin Cities home for nearly 30 years. They have two daughters and live Eden Prairie. Both active volunteers in their church, at their children’s school and extra-curricular activities.\nKathy and Matt are both Certified Senior Advisors, which means they’ve made the effort to become further educated on the issues and needs of the senior population. The Johnsons serve clients in Hennepin, Carver, Scott and Dakota counties.  Kathy and Matt Johnson partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/c7632eb6c1add25676592b60fa96815c/Screenshot%25202018-07-12%2520at%25204.51.56%2520PM_sd.png",
    "status":1,
    "address":{
      "id":"ba0cf715dee574b482296a04c1686d73",
      "city":"Eden Prairie",
      "state":"MN"},
    "user":{
      "id":"42e340bb47fc8ebfdf2dd77a2415f962",
      "name":"Kathy Quinby Johnson"
    }},
  {
    "id":"personal-placement-linda-halloran",
    "name":"Personal Placement",
    "agentBio":"Linda Halloran lives in the North Hills and earned a communications degree from the University of Pittsburgh. Prior to founding Personal Placement in 1998, she held a position in public relations for a medical device manufacturer, was a sales representative for a medical home care company, and admissions director for a skilled nursing home.\n\nShe is a member of several professional groups including S.W.A.P. (Social Workers in Aging Practice) and the Allegheny County Healthcare Networking Group.\n\nKaren Reep lives in Butler and holds a degree in logistics from Pennsylvania State University. She worked for several Butler companies before joining Personal Placement in 2000. Karen served as the office manager of the agency for eight years prior to becoming an eldercare advisor.\n\nKaren is active in the community and is a member of the Butler County Healthcare Networking Group.\n\nSusan Balog resides in Cranberry Township and graduated from the Pennsylvania State University with a degree in Nutrition Science. She was a Pharmaceutical Sales Representative for Glaxo Pharmaceuticals for eight years. Prior to becoming an eldercare advisor for Personal Placement, she has spent two years working for the company in an administrative role.\n\nSusan is a volunteer with the Respite Program at the YMCA of Cranberry Twp., an active volunteer within her church, as well as several charitable organizations. Personal Placement partnered with Seniorly in 2018.\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/87265d65a3e6a57ad6e38507ebb037df/Screen%2520Shot%25202018-07-26%2520at%25203.31.04%2520PM_sd.png",
    "status":1,
    "address":{
      "id":"44ae939c9f14f00eb1708930c4a79e94",
      "city":"Pittsburgh",
      "state":"PA"},
    "user":{
      "id":"00d89933e53a5bb8979985efa9224993",
      "name":"Linda   Personal Placement"
    }},
  {
    "id":"senior-care-authority-north-orange-county-nina",
    "name":"Senior Care Authority, North Orange County CA (Nina Seng)",
    "agentBio":"Nina Seng is the youngest daughter in a big family of 5 children. She cares about all family members, especially about her 73-year-old mom, whose happiness and health are the most important things in Nina's life.\n\nNina Seng has been in the hospitality industry for over ten years now. And it has helped her understand how to listen to people and learn from them. \n\nSenior Care Authority caught her attention because it is a business that helps people and families go through difficult times. When feelings, emotion and sensitive topics are on the rise, families hesitate what decision to make, and Nina guides them in helping find the right path.\n\nShe always loved talking to people and learning different types of personalities. She always felt like there was something that was always missing, and when she found Senior Care Authority, it allowed her to work with people who also were in need. Nina Seng partnered with Seniorly in 2018.\n\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/6c045a5540928be2da858b2d57f3f382/nina_seng_sd.jpg",
    "status":1,
    "address":{
      "id":"cd1331c22159f5e35198c2cbd7d95922",
      "city":"Orange County",
      "state":"CA"},
    "user":{
      "id":"7fc41030a725a20fedf35c87a65aece6",
      "name":"Nina Seng"
    }},
  {
    "id":"assisted-living-locators-north-atlanta-sarah-reese",
    "name":"Assisted Living Locators, North Atlanta GA (Sarah Reese)",
    "agentBio":"Sarah Reese is the owner and operator of Assisted Living Locators North Atlanta. A trained educator and business person with strong problem-solving and communication skills, she is committed to working with families, facilities and healthcare providers to identify solutions that help seniors and their families thrive. A life-long learner, she believes in helping families and seniors realize their potential at all life stages. Her attention to detail and compassionate, thoughtful delivery are ideally suited for the service she and her team provide. \n\nAs a Certified Senior Advisor, Sarah is qualified to identify and recommend care solutions based on each senior’s condition, goals, needs and resources. Her career experience includes 20 years’ leadership in the insurance industry, including Blue Cross / Blue Shield of Virginia, and 10 years’ experience with McKesson Corporation, delivering, implementing and marketing technologies that connect caregivers with patients. She is a caregiver to her two parents. Sarah Reese partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/c7dd859b630d11f26c5cf9e5fb340a14/Sarah%2520Reese%25204x4_sd.jpg",
    "status":1,
    "address":{
      "id":"b404b8de0305d4d740f1e213b1da1939",
      "city":"Roswell",
      "state":"GA"},
    "user":{
      "id":"930e31c7b570c0fbf04480de3f5cd452",
      "name":"Sarah Reese"
    }},
  {
    "id":"senior-home-transitions",
    "name":"Senior Home Transitions, FL (Mary & Frank)",
    "agentBio":"Frank Pascoe has been in the senior health care industry since 1976. His experience managing senior health care communities brings a vast amount of experience and knowledge that he uses to help his client find the best senior community for their financial capability as well as their personal needs for care and social activities.\n\nHe has been a Licensed Nursing Home Administrator in PA, MA, AZ and FL, as well as a certified administrator of Assisted Living in a number of states. Frank’s passion through the years has been the residents that he served. He chooses to help families because, during his career, he saw seniors pick the right place and flourish. However, sadly, also saw others move into communities that were not a good fit. He understands that hands-on personal guidance can make an incredible difference and assist families in making the right choices. Frank firmly believes that all of a senior’s years should be their best years.\n\nFrank’s knowledge will help you navigate the choices, costs, and processes of finding the senior community best suited for you or your loved one. He will also help negotiate the best deal for you once you choose the perfect community. Frank Pascoe & Mary Pascoe partnered with Seniorly in 2018.\n\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/69562f70e7c3619755721c63d99bab1e/frank-pascoe-senior-living-placement-assistance-services-seniorlyl_sd.jpg",
    "status":1,
    "address":{
      "id":"ec67e42a215077ec2dbc33cb180d3e0d",
      "city":"Palm Harbor",
      "state":"FL"},
    "user":{
      "id":"54cfe9f09faa7b8df84d0dd5b1c6eea8",
      "name":"Frank Pascoe And Mary Pascoe"
    }},
  {
    "id":"turning-point-senior-care-solutions-in-emee-miller",
    "name":"Turning Point Senior Care Solutions, IN (Emee Miller)",
    "agentBio":"Emee Gaither Miller was born in Mexico City, Mexico, raised in Stamford, Connecticut, attended Marietta College in Marietta, Ohio graduating with a B.A in Art History. With a love of art and artists! landed my first job out of college at Christie's Art Auction House in New York City working initially as a Scribe (manual inventory records) and then working as the Auctioneer's assistant.\nIn 1983 a college \"friend\" Bob was visiting NYC and called to reconnect. We did. In 1984 Bob and I were married and moved to South Bend, where Bob began his career as a Stock Broker. Today he owns his own firm Robert B. Miller Financial. Initially I took a job at Edgerton's Travel with the idea we could leave South Bend often and travel. Well.... traveled solo as Bob was hitting the pavement forming his business.\nIn our 34 years together, we have raised 3 children who are all grown. As our children naturally became independent, in 2012 after 4 years of helping Helen, an elder friend, manage breast cancer and a brain tumor I became acutely aware of senior care. Senior care and quality of life have become the focus of my life and the creation of Turning Point Senior Care Solutions, a service which lifts the \"fog\" of senior services, programs and living choices in the Greater South Bend area. Emee Miller has been a partner of Seniorly since 2018.\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/34145cad9c787d30ccad5d97a49f094c/Emee-Miller-Professional-Head-Shot-200x300_sd.jpg",
    "status":1,
    "address":{
      "id":"aa7f658c3b65793fcfb16e03b9a1f9b9",
      "city":"South Bend",
      "state":"IN"},
    "user":{
      "id":"2249e3ed18610b2c18cbe1c67db1f945",
      "name":"Emee Miller "
    }},
  {
    "id":"assisted-living-locators-metro-detroit-mi-carolyn-marengere",
    "name":"Assisted Living Locators Metro Detroit, MI (Carolyn Marengere)",
    "agentBio":"Carolyn Marengere lives in Southgate, Michigan, located in the Metro Detroit area.  She has a bachelor’s degree in Health Administration, is a Certified Senior Advisor (CSA) and is committed to helping seniors and their families find the right care and living options, as well as trusted resources.  \n \nAs a Certified Senior Advisor, Carolyn demonstrates a commitment to high standards, continuing education, personal ethics and trust.   \n \nCarolyn and her husband have three daughters, all young adults.  She is active in the music and church school ministries of her church. She also volunteers for the Alzheimer's Association of Greater Michigan, Senior Coordinating Aging Network Wayne County, and Gift of Life Michigan.  She is also on the Advisory Council at The Senior Alliance, Area Agency on Aging 1C.\n \nCarolyn covers a majority of Metro Detroit, working in mostly Oakland, Macomb and Wayne counties.  She is passionate about helping families who are facing the challenges of caring for their loved ones as they age.  Carolyn Marengere partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/2ea9ee9c9c678ec064be78e940f9bc19/headshot%2520square%25204x4_sd.jpg",
    "status":1,
    "address":{
      "id":"53e7a0da4b177ff1bd74af9e716d09d7",
      "city":"Southgate",
      "state":"MI"},
    "user":{
      "id":"417833b09739616c8a045801008d2a06",
      "name":"Carolyn Marengere"
    }},
  {
    "id":"parents-changing-spaces-llc",
    "name":"Parents Changing Spaces (Cindy Morley & Elizabeth Morley)",
    "agentBio":"Parents Changing Spaces is a family owned business founded by Cindy Morley in 2007. Through dedication and hard work she has developed a free senior living resource service. Cindy has gained tremendous insight and a wealth of knowledge from family that has been involved in medicine and social care giving for generations. Members include doctors, physicians assistance nurse practitioner's medical geriatric consultants, social workers, who are presently active in working with Parents Changing Spaces. This service was started by Cindy almost by accident after her elderly mother fell and suffered a closed head injury. She could no longer live in an unsupervised atmosphere and was to be discharged from the hospital at short notice. Thankfully Cindy had an extensive support network and was able to find the best community for her situation. But Cindy realized that many people are not as fortunate - and that is when she and the family decide they could help others. After personally touring and becoming intimately familiar with many senior communities she felt confident in becoming an all inclusive senior resource service. Even today the majority of her time is spent constantly searching for new communities that offer the specialized services her diverse customer base requires, along with maintaining a strong personal relationship with her established communities.  Contact Parents Changing Spaces today to let them evaluate your situation. Remember there is always a solution for every situation. Parents Changing Spaces partnered with Seniorly in 2017. ",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/761323cf5a49d71f1eff26900cec8cd4/Parent_Changing_Spaces_01_Seniorly_sd.png",
    "status":1,
    "address":{
      "id":"0aebbb4f2615eda6faf37439ff95b6ef",
      "city":"Rochester Hills",
      "state":"MI"},
    "user":{
      "id":"e21716d098c181887a9c19a24eb6f016",
      "name":"Cindy Morley"
    }},
  {
    "id":"assisted-living-locators-bergen-county-nj-joseph-chu",
    "name":"Assisted Living Locators Bergen County, NJ (Joseph Chu)",
    "agentBio":"Joseph and Suhee Chu are the owners of New Jersey’s first Assisted Living Locators franchise.\n\n Joe is a “Jersey Boy” who grew up in Bergen County, spending much of his time in the Jersey malls and diners.  He received his BA in History from Northwestern University and MDIV from Trinity Evangelical Divinity School.  Working as a Pastor for over 20 years, Joe has dedicated his life to helping others which brought him to Assisted Living Locators.\n\nSuhee grew up in Asia and Europe, and is fluent in Korean and Russian.  Previously she worked in the public relations industry.  Joe and Suhee were married in Tenafly and now live in Paramus with their two children. \n\nJoe and Suhee help seniors and families navigate the system and identify the best senior care options for their loved ones. They have a network of fully vetted assisted living solutions and services throughout Northern New Jersey that share one common characteristic -- excellence in care. Joseph and Suhee Chu partnered with Seniorly in 2018.\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/9b97e4a363fa1817670a22ab7f6c3016/chu%2520group%25204x4_sd.jpg",
    "status":1,
    "address":{
      "id":"40168a586125e28e47a8457c3ff7bdcd",
      "city":"Paramus",
      "state":"NJ"},
    "user":{
      "id":"902b0a1d7317456049b04db33bdf34fb",
      "name":"Joe & Suhee Chu"
    }},
  {
    "id":"senior-living-locators",
    "name":"Senior Living Locators (Sherri Mauger and Nanette Wickline)",
    "agentBio":"As sisters, Sherri Mauger and Nanette Wickline have first-hand experience with what it means to care for our loved ones.  In a matter of a few short months, they had to make quick and unexpected decisions relating to the care of two of our loved ones.   It was overwhelming.   Thankfully, Sherri had just left the corporate world, after twenty-five years of professional marketing experience and had the time to do the research, understand all the options (and there are plenty) and help our family make decisions.   But it was still a lot, especially under the added stress of having to make quick decisions.\n\nShortly after those unexpected situations, it becomes clear to them what their immediate next steps would be.  Take the information they have learned, learn even more and then share what they know with others who may be facing similar situations.  They knew they could utilize our marketing backgrounds, couple that with their small-town roots (where they were taught family first; being disrespectful is never an option, and always – always – treat people the way you want to be treated) and ultimately help make another family’s life change, a little bit easier.\n\nSince then, Sherri and Nanette has come to love their decision.  Every day they get to help families in a meaningful and sincere way. Sherri Mauger and Nanette Wickline partnered with Seniorly in 2018.\n\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/ef14b9f7f7d3b05d14164b615be55e9b/Sherri%2520_Mauger_Senior_Living_Locators_Seniorly_sd.jpg",
    "status":1,
    "address":{
      "id":"6b85970ca7fec91feb37602e6d00e659",
      "city":"Dublin",
      "state":"OH"},
    "user":{
      "id":"78e1d92044c9cb6e4733c6aeeec7aab0",
      "name":"Sherri Mauger"
    }},
  {
    "id":"assisted-living-locators-boulder-co-terry-bossle",
    "name":"Assisted Living Locators, Boulder CO (Terry Bossle)",
    "agentBio":"Terry Bossle is a dedicated owner of Assisted Living Locators – Boulder, CO.  Terry spent 20+ years ensuring people had the correct insurance for their needs.  She worked in the corporate insurance as a broker and an underwriter.  Terry found the theme in her accomplishments had to do with problem solving, presenting positive solutions to those challenges and making people feel at ease.  Terry’s gift is discovering and presenting positive solutions to the most challenging problems.\nWith care, detail and focus on her clients Terry is always about what is right for her clients and families. With her passion, she helps you navigate this next chapter of life. You feel you are in the hands of a trusted friend and you know you are being given the best options that match your specific needs and costs.  There is no better person you to have by your side. With Terry you have the expert who will guide you every step of the way.\nTerry is proud to be with Assisted Living Locators, guiding, caring and helping seniors and families throughout Boulder County Colorado. Terry also volunteers her time with the Alzheimer's Association Boulder Region Chapter.  Terry Bossle partnered with Seniorly in 2018.\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/e5097aa6d052812bbc6026bcf81ad002/Terry%2520Bossle%25204x4_sd.jpg",
    "status":1,
    "address":{
      "id":"0d37f384b65ee0ce7003dca44397bf31",
      "city":"Denver",
      "state":"CO"},
    "user":{
      "id":"9a0ee1ed539964f8a0544540fb1d14d1",
      "name":"Terry Bossle"
    }},
  {
    "id":"ask-carol-springfield-mo-patricia-koahou",
    "name":"Ask-Carol Springfield, MO (Patricia Koahou)",
    "agentBio":"Patricia Koahou is the Carol’s Senior Living Advisor in the Springfield/Branson, MO area. Born in Germany, her grandmother always made sure that she had a very good understanding of life and people. \nAfter struggling to find her path, Patricia  found it through medicine.  In 2002, she started her degree as a Physician Assistant and worked for years at a Long-Term-Care facility. Throughout her time in the facility, she learned many things from many outstanding doctors about what it means to be the best at what you do and to use all the information at her disposal to give the best care to all patients.\n\nAfter 6 years, Patricia decided to move to America and see what life had to offer here. After meeting and marrying her husband and raising their daughter, she started to work at a non-medical home care company in South Carolina, first as a caregiver and eventually as the office manager, after which the family relocated to Missouri.\n\nPatricia has found that working with the elderly is what makes her happy.  She joined Ask-Carol so that she could do just that. She looks forward to speaking with you. Patricia Koahou partnered with Seniorly in 2018.\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/e45083b2d640e7ad9f0a04552210708d/Headshot%2520Patricia_edited-2_sd.jpg",
    "status":1,
    "address":{
      "id":"d810c798f14355c6f639f7caa68c7930",
      "city":"Tinton Falls",
      "state":"NJ"},
    "user":{
      "id":"6a859e0f2431aa1f3b08e84996d4e74a",
      "name":"Patricia Koahou"
    }},
  {
    "id":"assisted-living-locators-phoenix-az-sarah-shrestha",
    "name":"Assisted Living Locators Phoenix, AZ (Sarah & Rijan Shrestha)",
    "agentBio":"Rijan and Sarah Shrestha have been working in the Senior Care Industry since 2005, where they met while working at an Assisted Living Center. Sarah was the Lead Caregiver and Rijan was the Medication Technician. Sarah received her Bachelor of Arts degree and worked for eight years as a Case Manager with an Assisted Living caseload under the state’s Long Term Care contracts, while Rijan has studied for his Doctor’s of Pharmacy. Both Rijan and Sarah endeavor to provide exceptional service to their clients and take pride in helping seniors find the perfect place to call home. Rijan and Sarah Shrestha partnered with Seniorly in 2018.",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/fa166abaea9307fae330875fb498eb43/sara%2520and%2520R%25204x4_sd.jpg",
    "status":1,
    "address":{
      "id":"a74483fe0e431d2f3252cc484d8437fb",
      "city":"Phoenix",
      "state":"AZ"},
    "user":{
      "id":"18cb1f52c5b4c45922e49d65202f42bb",
      "name":"Rijan And Sarah Shrestha"
    }},
  {
    "id":"leeann-allman",
    "name":"Assisted Living Locators San Gabriel Valley, CA (LeeAnn Allman)",
    "agentBio":"LeeAnn Allman began working with seniors more than 25 years ago through the insurance and finance fields. In 2010 she took her experience and applied it for the direct benefit of our seniors. LeeAnn provides an ear focused on the needs of \"Mom &/or Dad\" but also those of the family. While working directly with LeeAnn, her client-families receive a strong knowledge of the resources available and how they work together for the clients' benefit. Because LeeAnn spends time directly with her clients while assessing their needs and tours, she continues to develop her knowledge and expertise in assisting families to better understand, accept, and adjust to many of the changes the parents are experiencing. LeeAnn Allman partnered with Seniorly in 2018.\n",
    "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/e8131cb434e223bea910e717370f64dd/LeeAnn%2520Allman%25204x4_sd.jpg",
    "status":1,
    "address":{
    "id":"bed5644fb7d9044f24c92d94d944a411",
      "city":"Covina",
      "state":"CA"},
  "user":{
    "id":"453529d4b7ee5a134f0ca4bb33d8a0f4",
      "name":"Lee Ann Allman"
  }},
{
  "id":"ask-carol-chicago-il-tobi-samonek",
  "name":"Ask-Carol Chicago, IL (Tobi Samonek)",
  "agentBio":"Tobi Samonek lives right here in the Chicago North area. She's been through it herself with her family, and looks forward to helping many families just like yours.\n\nShe's ready to work with you, offer support, and help you to find the best community for your parent. Tobi Samonek partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/d66065a90fd72820de483dc675ebbb4f/Tobi%2520Headshot_sd.jpg",
  "status":1,
  "address":{
  "id":"eb05bf4f5d61b57036f0af4a17add1fa",
    "city":"Tinton Falls",
    "state":"NJ"},
  "user":{
  "id":"d1f68674462f94a24b06432b9c92aafb",
    "name":"Tobi Samonek"
}},
{
  "id":"senior-housing-solutions-bruce",
  "name":"Senior Housing Solutions (Bruce Rosenblatt)",
  "agentBio":"Bruce Rosenblatt has been involved with senior housing for over 30 years and is a long time resident of Southwest Florida. His company, Senior Housing Solutions, recently celebrated its 10 year anniversary. \n\nBruce is considered an expert in senior housing and is a frequent speaker at many clubs, churches and organizations. Bruce is a featured columnist for the Naples Daily News and provides senior housing advice in his column.\n\nBruce Rosenblatt partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/a7abfbf9f7d3eed77d42656c6f2776bc/03_sd.jpg",
  "status":1,
  "address":{
  "id":"4c0b176e17e33cc3cee2048978d69474",
    "city":"Bonita Springs",
    "state":"FL"},
  "user":{
  "id":"b775f49cde2a8dee8679befcfa9ccdc8",
    "name":"Bruce Rosenblatt"
}},
{
  "id":"jeffrey-horwitz",
  "name":"SCA South Orange County (Jeffrey Horwitz)",
  "agentBio":"Jeffrey Horwitz earned a Bachelor of Arts in Religious Studies with a minor in Broadcast and Television as an undergraduate at San Diego State. Such an education gives him a unique perspective when connecting with others and empathizing with their point of view. Jeffrey has professionally consulted and educated others in finance and communication for over 2 decades, and also volunteer when possible in his local community.\n\nAfter personally going through the process of an elder family member being diagnosed with a form of Dementia, Jeffrey saw and experienced first hand the daunting task of getting help for his loved one. \"It was extremely overwhelming\", said Jeffrey. \"I wish my family had someone take us by the hand and show us all the best assistance options available based on our needs. To get the answers we sought, we needed someone to understand our family situation. Somebody who saw it from our point of view.\" \n\nRecognizing that many families are thrown into the same situation and don’t know where to start, Jeffrey decided to change his career path to serve the needs of families and seniors with regard to assisted living and senior care needs. You can be sure Jeffrey will take the time to evaluate and understand each situation and make the best recommendation with regards to the needs of the elder and the people who love them. Jeffrey now spends much of his time touring and reviewing local living communities – including assisted living, independent living, dementia and memory care, and residential care homes. Jeffrey meets one-on-one with families to assess their needs. He accompanies them on tours of pre-approved facilities, assists them with their negotiations and paperwork, and follows up with the client once the placement has been made.\n\nJeffrey is always happy to help with all the necessary services related to assisted living facilities or residential care home for your loved ones in South Orange county. Jeffrey Horwitz partnered with Seniorly in 2017.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/fdb6a67ccc43aa6dcfcf2fee45af99bc/jeffreyhorwitz_sd.png",
  "status":1,
  "address":{
  "id":"3c4fcd058c0f97e606810f2484c2a69c",
    "city":"Laguna Niguel",
    "state":"CA"},
  "user":{
  "id":"ec76a06d2277a98ffb40bd72c0fa0002",
    "name":"Jeffrey Horwitz"
}},
{
  "id":"the-right-move-senior-resource-shane-johnston",
  "name":"The Right Move Senior Resource (Shane Johnston)",
  "agentBio":"Shane Johnston's first experience in the senior industry was helping families understand hospice and the support and comfort that can be available to them during this emotional time in their lives. While serving in this field he was always asked one question. How did you end up doing this type of work? Well, Shane owes credit to my beautiful wife (Megan) who is a registered nurse. She started doing hospice care during the beginning of their marriage. She would always tell me the greatest stories about individuals and families she had an opportunity to help and Shane wanted that in his life. With now almost a decade in the industry he feels this is where he's meant to be, helping families and providing resources that will help them during the aging process. Shane and his wife  have learned what’s truly important over the years: “FAMILY”.  That is why they want to help other families make “The Right Move” when it comes to deciding senior care options for their loved ones. Shane Johnston partnered with Seniorly in 2017.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/28112164cf6a653c9b954e30e7a38683/Shane_Johnston_Seniorly_sd.png",
  "status":1,
  "address":{
  "id":"fe9c9efd803768fb2680e318deb20637",
    "city":"Cumming",
    "state":"GA"},
  "user":{
  "id":"1d42baff4e29991da5cfae26caecabdf",
    "name":"Shane Johnston"
}},
{
  "id":"assisted-living-locators-rock-hill-sc-david-spafford",
  "name":"Assisted Living Locators Rock Hill, SC (David Spafford)",
  "agentBio":"David Spafford and his wife Chandler Spafford are proud owners of Assisted Living Locators franchise serving Rock Hill, SC.  They are excited to connect and support seniors and families in this community.\n\nAfter a 22-year successful career in the Consumer-Packaged Goods (CPG) industry, Dave is looking forward to providing care and guidance to South Carolina seniors and their families to find the perfect place to call home. His wife, Chandler, also remains active in the CPG industry focusing on the needs of continence-stricken adults and has a great passion for helping others.  \n\nAs an Assisted Living Locators Eldercare Advisor, Dave can help navigate the system and identify the best senior care options for your loved ones. He has a network of fully vetted assisted living solutions and services throughout the Rock Hill, SC community",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/c156e973efd8ff08846475ce005066aa/Dave%2520Spafford%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"381ac261dddc68a734a146f388f22352",
    "city":"Waxhaw",
    "state":"NC"},
  "user":{
  "id":"e533d82453f9eb417b503643c39c4540",
    "name":"David Spafford"
}},
{
  "id":"above-and-beyond-oc-ca-cathy-gaertner",
  "name":"Above and Beyond OC, CA (Cathy Gaertner)",
  "agentBio":"Cathy Gaertner has been helping families with placement since 2004, she is born and raised in Orange County and has been married since 1996. She graduated from CSUF with a Health Emphasis and has her certificate in gerontology from USC Davis School of Gerontology. She has her RCFE license from the State of California. Cathy has great passion for helping families especially seniors. Cathy started out as a candy striper at age 12-21. has volunteered her whole life in the community and has also helped take care of her grandparents whom both lived with her as a young adult. Cathy has been through what many families she helps is going through. Cathy wants what is best for your family and will guide you as if you were her own family. Cathy Gaertner partnered with Seniorly in 2018.\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/d61717f07628330aa8423af074b8c07f/cathy_sd.gif",
  "status":1,
  "address":{
  "id":"8ffe89d9d5ed5ed7d65adaff191dfbc2",
    "city":"Huntington Beach",
    "state":"CA"},
  "user":{
  "id":"43e178f3b24e6f92021d49fb99c6e27b",
    "name":"Cathy Gaertner"
}},
{
  "id":"a-tender-touch-senior-placement",
  "name":"A Tender Touch Senior Placement (Connie Perez)",
  "agentBio":"Connie Perez (De La Rosa) is a senior care advisor and owner  of  A Tender Touch Senior Placement.  She started her business five years ago shortly after retiring from the County of Ventura as a Social Worker III  with In- Home Supportive Services and worked  for the County  25 years which included working previously  as a Benefits Specialist , Clerical Assistant Supervisor, Public Health as a Community Worker III and the Fire Department Headquarters as a Receptionist.  \n\nHer passion for the Elders started at a young age when she joined a youth group which visited elders in the local skilled nursing facilities to provide friendly visiting and performances.  As  time went by, Connie's mother became ill with COPD  along with other illnesses.  She became her mother’s primary caregiver at a young age and was very unaware of the services available and how to ask for help.  In having very little knowledge with skilled nursing, care, options, etc. she became very frustrated and felt helpless in helping her mother by providing the best care for her. \n\nConnie soon started her journey in becoming as knowledgeable as she could in learning about care, ombudsmen, rights, options, trainings, etc as a worker for the Human Services Agency.  She knew that her experience and knowledge could help others in obtaining the best care possible as well as  having the empathy  in knowing how difficult it is to make decisions that we are unprepared for.  Her passion in helping others  find the right home  is truly rewarding  and knowing that she has provided the best service in meeting the needs of those who seek integrity and passion in a business is what makes A Tender Touch Senior Placement  guide your loved one to a brighter tomorrow.  Connie Perez partnered with Seniorly in 2018.\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/0826af4c421ffdb18ffb8d2256246d64/20150907_191250_sd.jpg",
  "status":1,
  "address":{
  "id":"10328466231ba0644674d6cd8a6c86e6",
    "city":"Ventura",
    "state":"CA"},
  "user":{
  "id":"6b1d4227508c7bf8a42f52346ea36c4d",
    "name":"Connie De La Rosa"
}},
{
  "id":"assisted-living-locators-kansas-city-ks-mo-mike-nixon",
  "name":"Assisted Living Locators, Kansas City KS MO (Mike Nixon)",
  "agentBio":"Mike Nixon's goal is to assist families in choosing appropriate care options for their loved ones, to save time, decrease stress, and to provide 'peace of mind’.  Since he is local and in the community, Mike is able to look at a wide range of options for seniors that just can’t be matched by online or national only firms. He tours and helps rank all the facilities he recommends, and make sure all our partners in the senior care market are fully committed to providing the best care possible. Mike Nixon partnered with Seniorly in 2018.\n\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/664f1128c42448fe08fc48530da1e9e3/Mike%2520Nixon%2520Headshot%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"db1ae76c46f2bae7e69910107bcd6cab",
    "city":"Overland",
    "state":"KS"},
  "user":{
  "id":"f4931ac17d38ba7c5d25b0cda62be011",
    "name":"Mike Nixon"
}},
{
  "id":"ask-carol-new-jersey-lisa-effron",
  "name":"Ask-Carol New Jersey (Lisa Shockley)",
  "agentBio":"Lisa Shockley is your local Senior Living advisor for Central New Jersey. Lisa’s mom is Carol, founder of Ask-Carol! Lisa experienced firsthand what her mother went through caring for her Grandmother in her later years. After several falls, broken bones and memory loss, the family knew she needed serious help. When they found the right assisted living facility for her grandmother, Lisa helped with the move-in and felt comfort knowing her grandmother was safe and happy.\nWitnessing how much better assisted living was for her grandmother than living at home, she wants to share her lessons in senior care with others in need of assisted living in New Jersey. In Central New Jersey there are many assisted living communities, each with its own personality, entrance requirements, costs, and level of services.  Furthermore, assisted living facilities are very different from nursing homes. They offer a home-like lifestyle and are considerably less expensive. Unless your parent is bed-ridden, assisted living is usually the better option. However, it is critical to find a caring environment that exactly meets your parent’s individual and financial needs. Lisa will provide you with a clear, step-by-step framework, matching your parent to the best facility, and enabling you to work through these challenging decisions.\nThe role of Certified Senior Advisor is one of trust, caring, and support in the guidance provided.\nMoving homes is never easy and life altering transitions for our aging loved one can be emotional, complex and heartbreaking. Ask-Carol! helps families work through these challenging times, guiding you through the maze of options and services. Lisa Shockley partnered with Seniorly in 2018.\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/29b2d084310cf5460130e835e2c74139/Lisa_Effron_Ask_Carol_Seniorly_sd.png",
  "status":1,
  "address":{
  "id":"82205ac0ab925c7b373f0ded91f9da7f",
    "city":"Tinton Falls",
    "state":"NJ"},
  "user":{
  "id":"3d8d18da6d405f86efaf110cae563130",
    "name":"Lisa Shockley"
}},
{
  "id":"assisted-living-locators-omaha-ne-nikki-wulff",
  "name":"Assisted Living Locators Omaha, NE (Nikki Wulff)",
  "agentBio":"Nikki Wulff earned her Bachelor’s Degree in Business Administration from the University of Nebraska-Omaha. Nikki began her career working through the corporate ladder with industry leaders in telecommunications and healthcare before starting her business with Assisted Living Locators. Nikki’s passion for seniors comes from her own family experience and knowing that there is a huge need for the industry in the Omaha area.\nShe is passionate about spending time with her family, traveling the world and currently sits on the board of directors for the Down Syndrome Alliance of the Midlands in Omaha, Nebraska. Nikki Wulff partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/77d8eac0395431d2faa50ff35dc99428/Nikki%2520Wulff%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"8bdbdb3f618cfdf259960d54d29c16a6",
    "city":"Omaha",
    "state":"NE"},
  "user":{
  "id":"7759dfa9847a80b9cff24d706910188a",
    "name":"Nikki Wulff"
}},
{
  "id":"southern-california-senior-resources-incorporated-socal-seniors",
  "name":"Southern California Senior Resources, Incorporated,SoCal Seniors (Chris Gutierrez)",
  "agentBio":"Chris Gutierrez has called Southern California home his entire life. He, his wife, and two children reside in Pasadena, CA. With an undergraduate degree in Communication Arts from California State Polytechnic University in Pomona and a graduate degree from Pepperdine in Business Administration, Gutierrez’s goals were always to have his own company and care homes for the elderly. Raised by all 4 grandparents, the care homes are a way of giving back to our wonderful seniors in California. He is a California licensed Administrator for Residential Care Facilities for the Elderly.\nBringing experience from working for major corporations such as ConAgra, Sanofi-Aventis Pharmaceuticals, Turner Entertainment Networks, and the largest assisted living referral service, Gutierrez has taken those successful models and his education, to start Southern California Senior Resources in 2002. “I hope that my grandparents would be proud of the work that I have accomplished, and I sure wish that a company like Southern California Senior Resources would have been around when I placed my grandparents,” Gutierrez says.  Chris Gutierrez partnered with Seniorly in 2018.\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/4155219df08e004640b567af173ea634/Chris_Gutierrez_Seniorly_sd.jpg",
  "status":1,
  "address":{
  "id":"38f314179fcd820e5413832d210464bb",
    "city":"Pasadena",
    "state":"CA"},
  "user":{
  "id":"4706b976369ee0feaefb3d57ee411d15",
    "name":"Chris Gutierrez"
}},
{
  "id":"assisted-living-locators-charleston-sc-leslie-jackson",
  "name":"Assisted Living Locators, Charleston SC (Leslie Jackson)",
  "agentBio":"Leslie Jackson, owner of Assisted Living Locators Charleston, SC, provides care and guidance to seniors and their families helping them find the perfect place to call home. She has more than a decade of medical and business consulting experience including direct patient care experience as a Prosthetist.  She knows firsthand how helpful, necessary and rewarding being an advocate for the patient can be.\nAs an Assisted Living Locators Eldercare Advisor, Leslie is now expanding her role of patient advocate and making sure seniors and their families receive the support, assistance and resolution needed to manage the key life transitions they are facing.  She has a network of fully vetted assisted living solutions and services in the greater Charleston area that share one common characteristic -- excellence in care.  Leslie is excited to help families navigate the system to find the best fit senior care options for their loved ones. Leslie Jackson partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/85a41fa3b4a15880ab750c360576356c/Leslie%2520Jackson%2520Reberts_sd.jpg",
  "status":1,
  "address":{
  "id":"53872905207a23e9fd32c96a9f427140",
    "city":"Charleston",
    "state":"AL"},
  "user":{
  "id":"be282f16cff2de074b4bc8940e99d6ab",
    "name":"Leslie Jackson"
}},
{
  "id":"ask-carol-long-island-ny-kristen-rossi",
  "name":"Ask-Carol Long Island, NY (Kristen Rossi)",
  "agentBio":"Kristen Rossi is the Carol’s Senior Living Advisor in Suffolk County, Long Island, NY.  Her start with Ask-Carol! is somewhat different from most. Besides having a deep connection to her grandmother and her care, she has been in the medical practice management industry for years. These two avenues allow her to understand the emotional and monetary value of getting good care and help for your aging loved ones. Kristen sees firsthand how Grandma does not want to lose her independence but is in need of extra help getting around. Her Grandma is a strong-willed Italian immigrant who to this day still makes her own homemade pasta. She is insistent on remaining in her home yet Kristen can see that life would greatly benefit if she entered Assisted Living. She also has the wonderful benefit of having a mother who is a hospice nurse. Her mom provides the best possible end of life care for not only her patients but their families. What Kristen has learned from her grandma is that many of these families and patients know very little about what is going on in their own lives. They are going through a very emotional time and need the guidance of someone else to help make decisions about care. This process starts way before hospice and Kristen hopes to help before hospice care in order to extend the lives of these patients.\nThe other side stems from her background as a medical office practice manager. A great amount of the\npatient population is elderly, many of whom have family caregivers who are often confused about insurance coverage and out-of-pocket costs. \nWe all want to do what’s best for our parents, aunts, uncles and grandparents, but we often find it hard\nto get the right help. This is when you need to turn to a Senior Living Advisor. This very thought made\nKristen look into various companies where she can assist in making it less of a struggle, not only for her family but others around Kristen. Her search ended with Ask-Carol! When she saw how well Carol was helping seniors and their families it helped push her to join Carol. Kristen Rossi partnered with Seniorly in 2018.\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/a6e742052584db92dfa381da97d4054c/Kristen_Rossi_Ask_Carol_Seniorly_sd.jpg",
  "status":1,
  "address":{
  "id":"5a93de20a6d909faecbe9b0325a32216",
    "city":"Tinton Falls",
    "state":"NJ"},
  "user":{
  "id":"84b286883ca82d51c85f54cd7954f098",
    "name":"Kristen Rossi"
}},
{
  "id":"custom-senior-living-search-david",
  "name":"Custom Senior Living Search (David Greenwood)",
  "agentBio":"David Greenwood and his team listen carefully to your health, social, spiritual, location and financial requirements, as well as your expectations and concerns about making a successful transition to a senior living residence. Based on your input, David narrows down the many living and care options and provides an appropriate short list of the best senior living selections to meet your needs.\n\nIn addition, he tours facilities with you and your family and helps you ask the important questions. The final choice is always yours and their custom search is provided free of charge to clients who plan to pay privately for their housing and care. David look forward to helping you! David Greenwood partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/df272c6227ce2a169a9ec31454d33956/Screenshot%25202018-07-12%2520at%252011.45.48%2520AM_sd.png",
  "status":1,
  "address":{
  "id":"6e04ca44f67e94a83a4cc1c15d45429c",
    "city":"Springfield",
    "state":"VA"},
  "user":{
  "id":"ad095383460999baf7a74f2eaec873c7",
    "name":"David Greenwood"
}},
{
  "id":"senior-care-authority-central-texas-stacy-marlin",
  "name":"Senior Care Authority, Central Texas (Stacy Marlin)",
  "agentBio":"Stacy Marlin has found a way to use her experience to help others who are facing life changing decisions for themselves or a family member after working for more than 20 years in the healthcare industry. “I have been looking for a career that would allow me to use the knowledge, skills, and experience I gained in healthcare to help seniors in need. Senior Care Authority has given me the opportunity to use my strengths and help families during a difficult times.”\n\nStacy was born and raised in Central Texas. She attended Texas A&M University and earned a Bachelor of Science in Health. After working in healthcare for many years, she decided to return to school and earn her Bachelor of Science in Nursing. Through her own family experiences, she has been faced with complex decisions for her father, who was battling cancer, and her grandmother, who could no longer remain safely at home. Stacy understands the struggles and challenges families face in making these decisions. Her goal is to help families make this process more bearable by being by their side and sharing her expertise to find the best fit for each person.\n\nStacy’s background in healthcare positions her well for assisting seniors and their families to make good choices. She now spends much of her time touring and reviewing local living communities – including assisted living, independent living, memory care, and residential care homes. She personally meets with each family to assess their needs, accompanies them on tours of pre-approved facilities, assists them with their negotiations and paperwork, and follows up with the client once the placement has been made. Stacy Marlin partnered with Seniorly in 2018.\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/dbbda128a4b84a408943b8e936d7adb4/stacy_y_marlin_sd.jpg",
  "status":1,
  "address":{
  "id":"4f1a3843c080d5de5d983fe0eb10d3ad",
    "city":"Pflugerville",
    "state":"TX"},
  "user":{
  "id":"0d43b4e418f6376e6d4de28d878d50ea",
    "name":"Stacy Marlin"
}},
{
  "id":"senior-care-authority-denver-metro",
  "name":"Senior Care Authority, Denver Metro CO (Kelly O'Connor)",
  "agentBio":"Kelly O’Connor knows what it’s like to care for loved ones through all stages of illness and aging. For most of her 20s, Kelly cared for older and ailing family members, serving as a caregiver for her mother who had cancer, and as a long-distance caregiver for her two grandmothers. At a young age, she held the responsibility of making critical healthcare and estate decisions during a time of crisis.\n\nAfter the unfortunate passings of her mom and maternal grandmother, Kelly turned her focus to an exciting career as a corporate communications executive in the fashion industry. She worked with all the top magazines, television shows, movies and celebrity stylists, but her heart was calling her to contribute her talents and experiences in a larger, more meaningful way. She returned to school and received a master’s in psychology and started volunteering with various philanthropic organizations. While volunteering for a local hospice in Denver, a friend called and said, “I have the job for you.”\n\n“And the rest is history,” Kelly says. She began a heartfelt second career in the senior living industry as a move and transitions coordinator for a large retirement community. To date, she has helped more than 250 families select and move into senior living communities, including assisted living, memory support, and long-term care skilled nursing, as well as independent living.\n\n“Selecting an assisted living or memory support community is one of the most difficult decisions a person can ever face,” says Kelly. “My greatest joy comes from helping people in the midst of a crisis and supporting them through the process of finding the best option to meet their needs.”\n\nIn her role as Senior Care Advisor, Kelly meets one-on-one with families to assess their needs, schedules and accompanies them on tours of pre-approved communities, assists with negotiations and paperwork, and always follows up to make sure her clients are thriving in their new homes.\n\nKelly spends a great deal of time inspecting locations, meeting with staff and reviewing state reports for citations to help her clients make the best, most informed decision for their loved ones.\n\nKelly’s passion for seniors is backed up by national and international certifications. She has completed Certified Eden Associate Training with the Eden Alternative, Masterpiece Living Academy associate training for Successful Aging, and associate training through Naomi Feil’s Validation Training Institute. She has also served as a ‘Music and Memories” volunteer for residents with Alzheimer’s and dementia and currently teaches at Clermont College of Creative Life, where the average student age is late-80s. Kelly O'Connor partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/f7929dc3fcf01d4c6a6bcd91ca7079fb/Kelly_seniorly_sd.jpg",
  "status":1,
  "address":{
  "id":"e3e1188914925f50b98bef62bcdfeb08",
    "city":"Denver",
    "state":"CO"},
  "user":{
  "id":"e91a16f3af8c85465e82b4bb1acf5c8b",
    "name":"Kelly O'connor"
}},
{
  "id":"assisted-living-locators-richmond-va-bill-thompson",
  "name":"Assisted Living Locators of Greater Richmond (Bill Thompson)",
  "agentBio":"Since Bill Thompson left the Navy, where he served as a patrol pilot, he pursued a career in sales meeting the needs of both businesses and individuals in various roles. His most recent success had been thirteen years in telecommunications. There he honed his skills in problem-solving, needs assessment and negotiating.\n\nHaving started Assisted Living Locators of Greater Richmond in the winter of 2017 these business skills have been put to effective use in his current role as an eldercare advisor. Through consistent and aggressive networking with senior sector professionals and referral development with health care providers and social workers, Bill has begun to see his franchise grow.\nHe has found that helping seniors and their families when they are at crossroads in life’s journey to be immensely rewarding.\n\nBill is happily married to Debbie who also has an extensive business to business sales background including sales management. She has continued in this capacity as they ramp up Assisted Living Locators in Richmond.\n\nBill and Debbie are very excited to be the first Assisted Living Locators franchise in Virginia and are pleased to help seniors and families navigate the challenge of finding caring providers in the Greater Richmond area and beyond.  Bill Thompson partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/01c1cdddc10391369c26879e0e196fe1/Bill%2520Thompson%2520HeadShot_sd.jpg",
  "status":1,
  "address":{
  "id":"94301f22cff738461ca253ac38d27ebb",
    "city":"N. Chesterfield",
    "state":"VA"},
  "user":{
  "id":"0b5ba2d31e1a4e726beeebd251494c4d",
    "name":"Bill Thompson"
}},
{
  "id":"senior-care-authority-rochester-ny-mike",
  "name":"Senior Care Authority, Rochester NY (Michael Kearney)",
  "agentBio":"Mike Kearney has found a way to use his life experiences to help others who are facing life changing decisions for themselves or a family member after working for more than 30 years in the corporate world. “I have been looking for a career that would allow me to use the skills and experience gained in a long career in sales and marketing to help seniors in need. Senior Care Authority has given me the opportunity to use my strengths and do something good for families.” Mike returned to the Rochester NY area where he grew up after more than 25 years away. An important part of his decision to return to Rochester was to be closer to his extended family, including aging parents. “I am blessed to come from a large and close family. As our first grandchild arrived, my wife and I realized we could not be happy seeing our grandchildren only a few times a year. At the same time, we both had aging parents and it was important to us to be able to spend more time with them while we still had that opportunity. During this time, we have seen friends and family experience very difficult times making decisions regarding aging loved ones and their ability to age in place.”\n\nMike’s background in sales and marketing positions him well for assisting seniors to find the right fit. Mike now spends much of his time touring and reviewing local living communities – including assisted living, independent living, dementia and memory care, and residential care homes. He then meets one-on-one with families to assess their needs. He accompanies them on tours of pre-approved facilities, assists them with their negotiations and paperwork, and follows up with the client once the placement has been made. Michael Kearney partnered with Seniorly in 2018.\n\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/eb3a5699159c66739a4b326b01e6632c/michael_kearney_seniorly_sd.jpg",
  "status":1,
  "address":{
  "id":"35238d5d9a74b83fe23689b1d959a6fa",
    "city":"Fairport",
    "state":"NY"},
  "user":{
  "id":"b6374a9bb264761dadab238bc08537c4",
    "name":"Michael Kearney"
}},
{
  "id":"ask-carol-pinellas-county-fl-sheree-lewis",
  "name":"Ask-Carol Pinellas County, FL (Sheree Lewis)",
  "agentBio":"Sheree Lewis is a local senior living expert in Pinellas County, and is ready to help your family. She is a Carol’s Senior Advisor in the St. Petersburg and Clearwater areas.\n\nHelping aging seniors is not a new thing to her. and as a child she remembers her mother helping the elderly. Her mother ran a nursing home for several years, and Sheree would go with her to help and talk with the residents. Later on, they shared in the responsibility of caring for these precious people at their home, even if it was just sitting with them, talking or playing cards.\n\nSheree seems to be following in her footsteps, helping others, including her three disabled brothers, mother, and mother-in-law in their times of need. Helping elderly people is a great reward, and she  believes Ask- Carol has figured it out in a very personal, professional way.  Sheree Lewis partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/3dbd77beec5defc8f42122057fd819ee/Sheree%2520Headshot%2520Final_edited-2_sd.jpg",
  "status":1,
  "address":{
  "id":"bec0182726b1843f43ae6ad57bc940d7",
    "city":"Seminole",
    "state":"FL"},
  "user":{
  "id":"acecb0925f08fde4af4897961ee4d6eb",
    "name":"Sheree Lewis"
}},
{
  "id":"senior-choices-fl-dina-hobson-and-pat-zagony",
  "name":"Senior Choices FL (Dina Hobson and Pat Zagony)",
  "agentBio":"Dina Hobson's career in Senior Living has spanned over 20 years.  In her regional and National Vice Present capacities she has overseen over (200 ) senior living communities in the assisted, memory care and skilled nursing segments. During this time she has developed a unique understanding and knowledge base of the psychological, financial and logistical dynamics involved in making a move to a senior living environment.  \n\nIn addition to possessing knowledge and skills within the industry, she is acutely aware of the emotional nature of taking this step and the family dynamics involved.  Dina brings her patience and calming nature to an otherwise stressful and  emotional time . Dina Hobson partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/99c99a3da9254fc189053cb2f69ba64b/DSC_0157%2520%25282%2529_sd.jpg",
  "status":1,
  "address":{
  "id":"2818ca4b843f1e7fa07db2c248f49930",
    "city":"Terra Ceia",
    "state":"FL"},
  "user":{
  "id":"9cdcdb0fa2300b4085a9523552396ed4",
    "name":"Dina Hobson"
}},
{
  "id":"santa-barbara-senior-living-consultants",
  "name":"Santa Barbara Senior Living Consultants (Peggy Renker & Sandra Rodezno)",
  "agentBio":"Peggy Renker is a Placement Representative for Senior Living Consultants. Peggy, a 25- year resident of Santa Barbara, was born and raised in Harbor Springs, Michigan and is the youngest of nine children. Peggy received her BA in Sociology from the University of California at Santa Barbara in 1986. She has spent the majority of her career in the hotel/resort industry in a group sales capacity representing hotels such as La Quinta Golf and Tennis Resort in La Quinta, California and the Four Seasons Biltmore in Santa Barbara. In the Fall of 2003, Peggy made the decision to pursue her interest in caring for senior citizens and began working for Senior Living Consultants. After volunteering for Meals on Wheels, Visiting Nurse and Hospice Care and other senior related activities over the past fifteen years, Peggy enjoys the opportunity to work with seniors and their families on a regular basis. In Summer of 2015, Peggy received her Residential Care Facility for the Elderly  (RCFE) Administrator Certification, providing her with an immense knowledge base on the various state regulations for all licensed Assisted Living and Alzheimer’s care homes. Peggy holds the designation of Certified Senior Advisor. Her continuing education helps to keep her informed of the ever changing needs of our beloved seniors with a better understanding of Alzheimers, Dementia and the social and financial needs of seniors. Peggy Renker partnered with Seniorly in 2017.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/1bba721acbee9424316458095a9b8f8c/SeniorLiving%2520Consultants_Seniorly_sd.png",
  "status":1,
  "address":{
  "id":"fe191daaa95e72b49ae9e875bc7e2d73",
    "city":"Santa Barbara",
    "state":"CA"},
  "user":{
  "id":"1c4e062417c1cad1aa2ad3f1d5f8fcf8",
    "name":"Senior Living Consultants"
}},
{
  "id":"steve-gilbert",
  "name":"Senior Care Authority, Mesa AZ (Jessica Bawden)",
  "agentBio":"Jessica Bawden is a Senior Care Advisor with Senior Care Authority in Mesa, Arizona. After completing her undergraduate degree in Chemical Engineering at the University of Arizona, Jessica spent 10 years working as an engineer in the medical device industry, primarily focused on vascular disease devices. Throughout her engineering career, Jessica kept looking for the much-needed fulfillment that comes from helping others and started volunteering in assisted living homes. Her desire to serve seniors grew from the love she has for her own grandparents who have been immensely influential in her life. As a result, she spent countless hours providing companionship care for senior residents in assisted living homes, and developed a love and passion for working with them. Jessica saw firsthand the improvement in quality of life that comes when one receives specialized care and realized she wanted to be a part of that process. \n\nAfter years of planning and preparation, Jessica left her career in engineering and embarked on this new journey. She admits, “Initially, I didn’t see myself becoming a consultant on senior care options. It wasn’t until I realized just how much everyone involved in this transition can benefit from these services – from the individuals needing care, to their loving families, and the health care providers. When it is time for a loved one to transition into long term care, families can feel overwhelmed at a time when they need to make crucial life-changing decisions. I can help them navigate this process as their personal guide and advocate, identifying the best solutions for the family’s unique needs.” Jessica Bawden partnered with Seniorly in 2017.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/626a91057f9ba37f75197eba854e1ed8/20-7_sd.JPG",
  "status":1,
  "address":{
  "id":"158431e5a4ee644c0817465009a77a29",
    "city":"Phoenix",
    "state":"AZ"},
  "user":{
  "id":"e4d42237ab13d4d036498d4c45b88f9c",
    "name":"Jessica Bawden"
}},
{
  "id":"oasis-lehigh-valley-pa-bob-hollinger",
  "name":"Oasis Senior Advisors Lehigh Valley, PA (Bob Hollinger)",
  "agentBio":"As we age, change in our lives is seldom easy. In 2010 Bob's mother was stricken and he and his father needed the help of a senior care facility, but there was no local expert to advise them. In the years that followed Bob has spent a lot of time with his father, struggling with the grips of high level dementia. His memories are vivid of a strong and proud Marine serving in Italy in 1945 as WWII came to a close. The Greatest Generation. They, and those that followed deserve better. \n\nBob's focus is on helping seniors and their families at that critical time when the decision is made for a loved one to move to a senior care facility. It is his passion to give back. Bob knows EVERY local Lehigh Valley senior facility and will advise families by personally showing them the best options for the perfect senior care facility with the dignity of their loved one at the forefront. Always. Bob Hollinger partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/7c07d8990faccadd6c62805ac3e7097e/Screenshot%25202018-07-11%2520at%25202.37.37%2520PM_sd.png",
  "status":1,
  "address":{
  "id":"9acd0dac35db885629fe7869d59ac468",
    "city":"Macungie",
    "state":"PA"},
  "user":{
  "id":"4fdd9d1034f0f3fc2e1784bd4153c895",
    "name":"Bob Hollinger"
}},
{
  "id":"assisted-living-locators-angelique-sieverson",
  "name":"Assisted Living Locators Thousand Oaks, CA (Angelique Sieverson)",
  "agentBio":"Angelique Sieverson has held numerous roles in her career, with her favorites being those that put her in a position of guidance and assistance for both the young and the old.  From serving as a volunteer at her daughters’ elementary school helping kids with disabilities to becoming both a certified Home Healthcare and Physical Therapy Aide, she felt a great calling to do more. As an Assisted Living Locators Eldercare Advisor, she is looking forward to helping families navigate the system and identify the best senior care options for their loved ones. Angelique Sieverson partnered with Seniorly in 2018. ",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/6461d170e22e544b1cbd57cbb6355752/Angelique%2520Sieverson%2520Headshot%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"23f2e422f4e15ff7e5e0003630f7a31d",
    "city":"Thousand Oaks",
    "state":"CA"},
  "user":{
  "id":"4504813ec95bafda8f779cb31cf4d58a",
    "name":"Angelique Sieverson"
}},
{
  "id":"assisted-living-locators-north-phoenix-az-jenn-ramirez",
  "name":"Assisted Living Locators North Phoenix, AZ (Jennifer Ramirez)",
  "agentBio":"Jennifer Ramirez, BSW, is the owner of Assisted Living Locators North Phoenix, AZ.  It is her goal to introduce you to the perfect Care Homes and Care Settings based on your needs and wants. Jennnifer has a  team of (4) dedicated to ensuring your needs are met quickly. She was a caregiver providing Dementia Care and in-home assist during her Social Work program at Arizona State University. Jennifer was hired as an ALTCS Case Manager where she audited and interviewed valley Care Homes and Centers for over a decade. As well, she was a Director at a Large Assisted Living Center. As an Owner at Assisted Living Locators, her team has an expert eye for Care Homes and Settings which you can leverage at no cost to you. As well, can direct you to the best valley resources for wrap-around support. Call for resources anytime. They are here for you! Jennifer Ramirez partnered with Seniorly in 2018. Jennifer Ramirez partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/81d11bedb6efa4a926cfb583a9f2c353/Jenn%2520Ramirez%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"046afdd402552826b3181c5ab25ae526",
    "city":"Mesa",
    "state":"AZ"},
  "user":{
  "id":"ad3b2b110ca420bf6ac8a083515a4d8f",
    "name":"Jenn Ramirez"
}},
{
  "id":"oasis-cleveland-east-oh-adam-santo",
  "name":"Oasis Cleveland East, OH (Adam Santo)",
  "agentBio":"Adam Santo was born and raised in Cleveland, Ohio. Community, integrity, and service have always guided his decisions, and his wife and are instilling those critical values in their three young children.\n\nAdam spent 14 years in the financial services industry, helping people realize their dreams and offering assistance and guidance when times were difficult. Today, he continues to assist people by working with seniors and families – face to face – to identify their needs and match them with their ideal assisted living community. He has experienced firsthand the stress that health issues can place on a family. Empowering clients to maintain their dignity and quality of life is a privilege, an honor, and a responsibility that he take very seriously. Adam Santo partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/050d46ec46937fdf6ed9ffaf0b4246e2/Screen%2520Shot%25202018-07-24%2520at%25204.28.27%2520PM_sd.png",
  "status":1,
  "address":{
  "id":"11b19da1e4625094011b8897d1979fd1",
    "city":"Avon Lake",
    "state":"OH"},
  "user":{
  "id":"459b388498a36c6e95e97922ea508068",
    "name":"Adam Santo"
}},
{
  "id":"senior-care-authority-kansas-city-don-minster",
  "name":"Senior Care Authority, Kansas City KS MO (Don Minter)",
  "agentBio":"Don Minter finds satisfaction in taking care of people. His compassion was unparalleled during his 11 years as a food and beverage director in a continuing care retirement community. He has always taken pride in providing the best food and care in the industry by utilizing his high energy style and 35 plus years of restaurant background. This has given the residents what they want most: many choices for the best food quality in a clean, friendly environment. Don implemented restaurant-style dining in his community of 260 residents at Brandon Woods at Alvamar in Lawrence, KS. He hired an excellent staff committed to and passionate about taking care of people which proved to be a formula for success.\n\nDon has first-hand knowledge of many of the struggles that families have in placing their loved one in the proper facilities with the proper care. All needs are different and Don's goal is to know the systems inside and out to be able to help the families make informed decisions.\n\nIn his spare time, Don enjoys family, fitness, tennis, boating, and generally anything having to do with the great outdoors. Don Minter partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/14746d8bfffa8809226cd0ddbb4fac6e/don_minter_sd.jpg",
  "status":1,
  "address":{
  "id":"d0faaf57785981d28aec3c0d52b3fcb6",
    "city":"Shawnee",
    "state":"KS"},
  "user":{
  "id":"fc2f1da961f126f9dbe157cef20f6755",
    "name":"Don Minter"
}},
{
  "id":"karl-winkelman-and-kathy-winkelman",
  "name":"Senior Care Authority, South Bay CA (Karl & Kathy Winkelman)",
  "agentBio":"Karl and Kathy Winkelman are a married couple for over 38 years with three sons and two grandsons. They have lived in the Bay Area for over 47 years. Karl Winkelman, an innovative leader and strategist, has held executive leadership positions throughout his entire corporate career. As a former CEO and President of InPrint Corporation and Vice President of Sales for ARC Northern California Division, a Fortune 1000 Company he is recognized as a business leader and has proven success in his career. He has expertise in building new programs, identifying new trends, emerging markets, and introducing state of the art technology solutions to customers which has attributed greatly to his and their success. He also believes in building value for his clients. From this unique vantage point, Karl wanted to continue to leverage his business expertise and apply his skills into an industry that he is passionate about. \"I had personal experience with my Mom and Dad in 2000, where I had to find two communities because I was contacted by a social worker from Adult Protective Services. If I would have had an Elder Care Specialist, if I knew what I know now, I would have been able to direct them to the same community. I also would have saved time, money and the emotional stress. Now we can help families walk through this with ease and we look forward to it.\" Karl is a graduate of Santa Clara University with a BA in Economics and an MBA. “Senior Care Authority is a nationwide Franchise that provides another opportunity for continued meaningful business career, to have an expanding staff, and run a respected and much-needed business,” Winkelman said.\nKarl and Katherine Winkelman are currently owners of Senior Care Authority South Bay and have been in this industry since 2012. SCA is a well-known and respected entity offering expertise in the Senior Care Industry through trained Advisors providing personal care and going the extra mile for clients. SCA provides several forms of up to date education and information through one on one care, newsletters and podcasts to make this transition as easy as possible. Karl and Katherine provide an elder care referral service for the growing senior population in Santa Clara County and Santa Cruz County, doing business as Senior Care Authority South Bay. “Transitioning to an assisted living facility or nursing home can be difficult, but with the guidance of Senior Care Authority, it doesn’t have to be”, he said. Kathy is a “people person,” has expertise in building and managing programs, projects, volunteers and staff for various organizations within the education, retail, nonprofit, and healthcare industries. She is recognized in her community and among her peers for being a mentor, creative and collaborative leader and teacher, and someone who brings enjoyment for working with people and projects. She has an entrepreneurial spirit and she is excited about the work she does with her husband Karl as a co-owner of Senior Care Authority South Bay. She has worked in the healthcare field at Good Samaritan Hospital. She received a BA in History, and an MBA, from Santa Clara University. Karl & Kathy Winkelman partnered with Seniorly in 2017.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/5567fa237fe1b587e99dd8acc1faa8f9/Karl%2520and%2520Kathy%2520Profile%2520Pic1_sd.jpg",
  "status":1,
  "address":{
  "id":"d6cc415aa058b8aab2a0b92a6c83840c",
    "city":"Los Gatos",
    "state":"CA"},
  "user":{
  "id":"2eb0d6253bc97b08d151d2d436e24052",
    "name":"Karl And Kathy Winkleman"
}},
{
  "id":"senior-care-authority-larry",
  "name":"Senior Care Authority, Louisiana (Larry Balyeat)",
  "agentBio":"Larry Balyeat now takes his 40 years of healthcare experience in hospitals, outpatient surgery centers and physician office management to assist seniors and their families in the local community. As the Senior Care Authority franchise owner in New Orleans, Larry provides invaluable assistance. Senior Care Authority serves families throughout the country through its network of professionals providing elder care consulting and personalized senior placement assistance to families seeking the best care options at home, assisted living and memory care communities.\n\nLarry Balyeat is married with 2 daughters and 2 grandsons. He earned his Bachelor’s Degree from the University of Toledo, is active in the American Heart Association, For Kids Foundation. Larry has lived in New Orleans for over 16 year.\n\nLarry now spends much of his time touring and reviewing local living communities – including assisted living, independent living, dementia and memory care, and residential care homes. He meets one-on-one with families to assess their needs. Accompanies them on tours of pre-approved homes, assists them with their negotiations and paperwork, and follows up with his clients once the placement has been made. Larry Balyeat partnered with Seniorly in 2017.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/8d88e9b140ce7bfe9da71727b60ab878/larry-balyeat-seniorly-72_sd.jpg",
  "status":1,
  "address":{
  "id":"d53c85d1c71fab8ab44393cd5820ddd7",
    "city":"Metairie",
    "state":"LA"},
  "user":{
  "id":"836d96a6bd9a959500be2c786f6dab42",
    "name":"Larry Balyeat"
}},
{
  "id":"assisted-living-locators-san-antonio-tx-tim-hodge",
  "name":"Assisted Living Locators, San Antonio TX (Tim Hodge)",
  "agentBio":"Tim Hodge lives in San Antonio, Texas; serving Bexar and the surrounding counties.  If asked, he will tell you that the Alamo City is a perfect blend of culture, climate and location.  \n\nTim served in the United States Army for 30 years, earning the rank of Colonel.  While living and working in Europe, Latin America and across the United States he built teams of soldiers and families.  After Tim’s retirement from the Army, he found a great career helping seniors and their families through senior placement.\n\nTim enjoys the adventure of travel, as well as sharing time with friends and family.  He is blessed with an amazing wife, 3 wonderful adult children, and proudly brags about his two handsome grandsons and a beautiful granddaughter. Tim Hodge partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/da0cd4e04997fdf15594dbb2a52f0f98/Tim%2520Hodge%2520Business%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"ffd3f33bfbdb30b63bfe3505ce3db196",
    "city":"San Antonio",
    "state":"TX"},
  "user":{
  "id":"5389552d3741a20c66d07909d3fea5c7",
    "name":"Tim Hodge"
}},
{
  "id":"premier-placement-service-tony-cassin",
  "name":"Premier Placement Service (Tony Cassin)",
  "agentBio":"At Premier Residential Placement Service, Tony Cassin helps seniors and their families find board and care communities as well as assisted living communities. His knowledge and experience in this field are designed to save you time, money and energy. He works closely with you to evaluate all of the senior's needs (social, physical, emotional, geographical, medical and financial) to find the appropriate community. Premier Residential Placement Service is a free service to the seniors and the families. Tony Cassin partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/316098b4786477c507de049d9c8593e4/Screenshot%25202018-07-12%2520at%25205.08.10%2520PM_sd.png",
  "status":1,
  "address":{
  "id":"80cae93b45d9b03aa140b12be8ce6ce2",
    "city":"San Anselmo",
    "state":"CA"},
  "user":{
  "id":"b3de0faf78d0adaa3a2d173d11f2a41c",
    "name":"Tony Cassin "
}},
{
  "id":"oasis-jacksonville",
  "name":"Oasis Jacksonville, FL (Dave Stieglitz )",
  "agentBio":"Dave Stieglitz is passionate about the lost art of customer service! \"It is critically important to connect with people to understand their needs before you can provide service. Accomplishing this with compassion and integrity is what drives him. He looks forward to the opportunity to be of service during this critical time for you and your family.\"\n\nDave had a very successful 30+ year career in the hospitality industry, delivering high-quality customer service on a daily basis. Along the way, he mentored many subordinates into leadership positions of their own and was elected by his peers to State and National leadership positions within the industry. Dave has also served on various charitable boards, raising hundreds of thousands of dollars for Children’s Miracle Network and Special Olympics. His faith and family are the most important. Beyond that, he enjoys most all sports, carpentry and continuing education. \n\nBecky Harkness earned her bachelor’s degree in rehabilitative services and one of her favorite jobs was working in the activities department in a memory care unit while attending FSU. She enjoyed figuring out what made each resident happy and then helping them enjoy each moment. After college, Becky worked at a private club for 10 years as a membership manager and loved the relationships she built with the members. After her second child was born, it was an easy decision to stop working and enjoy her children. Around that time, Becky's grandparents moved to Florida. It was such a gift to spend quality time with them and help them in a caregiving role. This left her with such a love, appreciation for, and understanding of older adults. She was blessed to be with them as they aged and moved from independent living to assisted living, and two of them to a memory care facility. Finding the right facility is everything. Her family was very happy with our selections, and she too wants to help you make the right decision as well.\n\nNow that her children are independent teenagers, she is ready to go back to work. Becky wants to combine her appreciation for older adults and the strong desire for everyone to be in their perfect home, with her determined skills to make it so. It’s not just about a job, but a passion for helping people and developing relationships. She is eager to give families peace of mind during this overwhelming process. You can trust that she will work hard to find you the best home for your loved one, with the right needs and desires for them. She is very excited to join David and Melanie’s Oasis team in Jacksonville. Becky lived here for 30 years and knows this city well. She looks forward to working with you, and helping you or your loved one transition into a new home that will help them thrive! Dave Stieglitz and Becky Harkness partnered with Seniorly in 2018.\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/c44f7ae386b38d03e651d8bcc1c21351/unnamed_sd.jpg",
  "status":1,
  "address":{
  "id":"f78a8e10f6d7b3adcd6c657421029207",
    "city":"Jacksonville",
    "state":"FL"},
  "user":{
  "id":"4f74a1afdb899994acc5be195fce63dc",
    "name":"David Stieglitz And Becky Harkness"
}},
{
  "id":"assisted-living-locators-inland-empire-ca-vincent-bonnemere",
  "name":"Assisted Living Locators Inland Empire, CA (Vincent Bonnemere)",
  "agentBio":"Vincent Bonnemere is the owner of Assisted Living Locators West Inland Empire in Southern California.  He is also a charter member of the National Placement & Referral Alliance.   The NPRA Believes that Families Have Choices\nVince worked in the retail industry for over 30 years where he excelled at customer service and believes these skills were the main factor for his longevity in an industry that traditionally sees much turnover. \nVince’s assignment included training, developing, strategizing, and driving results in over 90 retail store locations. As an Operations Executive, Vince used his creative problem-solving skills and out of the box thinking to successfully negotiate business deals with his retail stores many stakeholders.  \nWhen the opportunity came for a career change, Vince looked to the top two things he is passionate about: people and problem solving. Assisted Living Locators checked both boxes. Vince believes finding the perfect community for his clients will leverage his exceptional customer service and problem-solving skills.  Vince enjoys spending time and creating memories with his wife and their children. Vincent Bonnemere partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/e23be2416f015075837b9aff1d4d4fe5/Vince%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"878195ec1afcf1ac6196a8b329699b43",
    "city":"Claremont",
    "state":"CA"},
  "user":{
  "id":"5f8512686abada7d086e475f2d7f7b8b",
    "name":"Vincent Bonnemere"
}},
{
  "id":"oasis-jersey-shore-lakewood-nj-connie",
  "name":"Oasis Jersey Shore, NJ (Connie Roberson)",
  "agentBio":"Connie Roberson is a native of New York City and currently resides in South Brunswick Township, New Jersey. After a career spanning 30+ years in the Information Technology sector, she has been given an opportunity to embark on a more rewarding career, one where she can focus on her passion for helping others through senior care. Connie was blessed to intimately know my grandparents and great grandmother. One of her greatest pleasures was being able to sit with her great grandmother and listen to her vivid life stories. Passing away at the age of 102, she was truly an amazing woman and Connie will always treasure the memories they shared together. She is grateful to have the opportunity to serve as a continuing lifeline for her parents as they go into the next chapter of their lives; it is her way of giving back.\n\nConnie warmly embrace being an Oasis Senior Living Advisor because it provides the perfect outlet for her to lend services to families in need of locating a senior living community for a loved one, which in itself can be challenging and overwhelming. In the same way she cares for her family, Connie is dedicated to offering her knowledge and expertise on senior living communities and providing “hands on” service to help families as their loved ones transition to a new season in their life. She looks forward to working with you and your family as you go through this transition decision process. Connie Roberson partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/fdac122b5e8cf5b7eb30317c634f79ff/Screenshot%25202018-07-10%2520at%25202.56.40%2520PM_sd.png",
  "status":1,
  "address":{
  "id":"26de80745ca81179f0be1124d04390bc",
    "city":"Plainsboro",
    "state":"NJ"},
  "user":{
  "id":"9c7f76e13c801e970dbeb2957fb740a0",
    "name":"Connie Roberson "
}},
{
  "id":"above-n-beyond-senior-placement-campbell",
  "name":"Above N Beyond Senior Placement (Cheryl Comento)",
  "agentBio":"Cheryl Comento is a Certified Senior Advisor who helps seniors and their families eliminate the confusion and worry over finding care options for a loved one.\nCheryl spent several years helping seniors downside for a move to a senior community.  In 2012 she switched her focus to helping seniors find a senior living community that fits their care, financial and social needs.\nShe is a member of the Santa Clara County Senior Agenda program, the Society of Certified Senior Advisors and The National Placement and Referral Alliance.  She is an active member of the senior care community and continues to expand her knowledge of issues relating to senior and aging.  Cheryl attended West Valley College and San Jose State University.\nShe currently makes her home in the South Bay along with her 3 rescued senior dogs. Cheryl Comento partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/7ab1c8dbb12d2e7f49501046577908ee/2%2520head%2520shot_sd.jpg",
  "status":1,
  "address":{
  "id":"15aaf9083b4ba40d5002f53532b585b2",
    "city":"Campbell",
    "state":"CA"},
  "user":{
  "id":"64c66a01c29bc6f57ea21d1cc976bf23",
    "name":"Cheryl Comento"
}},
{
  "id":"senior-care-authority-serving-gulf-coast-region",
  "name":"Senior Care Authority, Gulf Coast Region AL FL (David and Leigh Johnson)",
  "agentBio":"David Johnson’s background and experience in healthcare management for over 30 years have positioned him perfectly for the senior care industry with Senior Care Authority. As the owner of Senior Care Authority/Gulf Coast Region, David serves communities in South Alabama and Northern Florida.\n\nSenior Care Authority serves families throughout the country through its network of professionals providing elder care consulting and personalized senior placement assistance to families seeking the best care options at home, assisted living and memory care communities.\n\nAfter finishing his undergraduate degree in Health Information Management from the University of Mississippi, David worked a year as a department head in a hospital and then enrolled in the University of Alabama at Birmingham where he received a Master’s of Science degree in Hospital and Health Administration.  For the past 30 years, David has worked with providers, purchasers and enrollees to implement innovative delivery and acquisition models designed to produce a higher level of care and value for all involved. He combines his compassion for people and his knowledge and of all aspects of healthcare delivery to generate solutions for individuals who are seeking an improved quality of life. David Johnson partnered with Seniorly in 2017.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/66d9c2dfd24b3d08200b5d3d3481f91f/Screenshot%25202018-07-12%2520at%25202.45.03%2520PM_sd.png",
  "status":1,
  "address":{
  "id":"f16fadda4270740ec57e08653e4fec22",
    "city":"Fairhope",
    "state":"AL"},
  "user":{
  "id":"333a0081a95251aae6b47e4eb9556d06",
    "name":"David Johnson"
}},
{
  "id":"oasis-chesterfield-mo-eileen-lambert",
  "name":"Oasis Chesterfield, MO (Eileen Lambert)",
  "agentBio":"Eileen Lambert grew up in Florissant, Missouri and graduated from UMSL with a degree in Accounting. She spent the last 20 years helping small and medium-sized businesses with all aspects of their businesses including customer service, sales, and operations. After deciding to make a career change, she wanted to continue helping others in an area she is passionate about, seniors. Oasis has provided her with that opportunity.\n\nA number of years ago her family transitioned her father to a senior community. It was a time consuming, difficult process due to the lack of resources to help them evaluate our options. With Oasis, she will be able to provide families with resources to guide them through the transition with a hands-on approach. Working with Oasis will allow Eileen the opportunity to be a compassionate advisor to the families as it is often a difficult time for the senior. Her personal interaction will give her the opportunity to treat the senior with the respect and dignity he or she deserves.\n\nIn her spare time she likes to travel, read, hike, bike and run. She looks forward to helping you find the community that best suits your family’s needs. Eileen Lambert partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/c516463ab21c2bd7a846e46a6ac87fca/Screen%2520Shot%25202018-08-09%2520at%25204.24.10%2520PM_sd.png",
  "status":1,
  "address":{
  "id":"34a0460e2d9d08a4b8040a2796279d6e",
    "city":"Chesterfield",
    "state":"MO"},
  "user":{
  "id":"1255a6e2da6469dc5b781c280949d460",
    "name":"Eileen Lambert"
}},
{
  "id":"senior-solutions-woodridge",
  "name":"Senior Solutions IL (Rick Graffagna)",
  "agentBio":"Rick Graffagna and his wife Pam have lived in the Chicago area for most of our lives, raising three beautiful children.  Pam grew up in Melrose Park, while Rick was raised in Elgin.\n\nRick received an undergraduate degree from Eastern Illinois and his MBA from Indiana University. The greater part of his working career was spent with several retail organizations including Jewel Food Store, Cub Foods, and Toys R Us – in a variety of local, regional and national roles.  He enjoys playing and watching sports – finding time for an occasional book.\n\nBut Rick was able to find his passion when he and his wife purchased a senior housing placement franchise which has become Senior Solutions. They have been helping families since 2012 and have never done anything better or felt more rewarded than what they are doing now.  Rick Graffagna partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/0e0a8a2cc0bd78313744f7724c438feb/rick%2520head%2520shot_sd.jpg",
  "status":1,
  "address":{
  "id":"f3913c53be4122b99753675ebbf942f0",
    "city":"Lisle",
    "state":"IL"},
  "user":{
  "id":"ebaee415030d01f3f0edcdb1494256a3",
    "name":"Rick Graffagna"
}},
{
  "id":"senior-care-authority-phoenix-matt-and-souban-houn-cairns",
  "name":"Senior Care Authority, Phoenix/Scottdale AZ (Matt and Souban Houn-Cairns)",
  "agentBio":"Matt and Souban Houn-Cairns are a family operated business that has over 30 years of combined healthcare experience in assisting some of the largest healthcare vendors, healthcare systems, and policy makers achieve their end goals. Throughout their careers, the main focus has been to take a patient centered approach to improving patient care while reducing costs. Their combined professional and academic healthcare experience makes us perfectly suited for navigating the complex healthcare environment, communities, financial and technological resources to help families find the right, individualized care solutions for their loved ones. \n\nSouban Houn-Cairns received her Bachelors in Business Management from Arizona State University and Masters in Healthcare Informatics from Grand Canyon University. She completed her master program’s capstone project on Care Transitions, where she studied the unique challenges that present during transfer of care of the elderly, particularly those with complex health issues or have unique mental, physical and social needs.\n\nSouban has over 18 years experience in healthcare consulting with expertise in implementing evidence-based care and best practices. In her previous role as senior consultant at one of the largest healthcare consulting firm in the country, Souban has managed and supported complex project implementations across both large and small healthcare systems. Most recently, Souban designed and implemented healthcare technology solutions to ensure accuracy in documentation and accessibility in patient information to drive better patient care at one of the most prestigious academic institution in New York.\n\nMatt received his Bachelors in Business Management from Nichols College and was Project Director for one of the most successful federally funded Challenge Grants that bridged the gap of the continuum of care across hospitals systems, long-term care, home health and health information exchanges.\n\nAs a Healthcare Consulting professional, Matt specialized in managing projects that directly impact acute and post acute care, clinical decision support tools, and collaboration of clinical stakeholders across Health Care Systems. As part of the federally approved grant, Matt was directly responsible for improving post acute care transitions by impacting communications from hospital to post acute facilities. The project focused on introducing technology that captured Assisted Daily Living (ADL) scores that were disseminated through the healthcare community to drive down ED and hospital Admissions.  Matt brings extensive, on-the-ground experience in implementation of clinical technologies in the health systems across acute and post acute care.\n\nTogether, their mission is to help families find appropriate care for their loved ones and we do it through innovation and collaboration with the local communities, healthcare stakeholders and families.  Matt and Souban Houn-Cairns partnered with Seniorly in 2018.\n\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/9b895d801d654d3a904dd3540f582379/souban-houn-cairns-senior-care-consultant_sd.jpg",
  "status":1,
  "address":{
  "id":"22f14930eff53fde33caca4ba0436dc9",
    "city":"Scottsdale",
    "state":"AZ"},
  "user":{
  "id":"4aafcb2c13f8a8237dc65afee1770b7b",
    "name":"Matthew Cairns"
}},
{
  "id":"senior-care-authority-gary-and-mickie-blizzard",
  "name":"Senior Care Authority, Houston TX (Gary and Mickie Blizzard)",
  "agentBio":"Gary and Mickie Blizzard help families negotiate the challenges of finding exceptional senior care and residences in the North Houston area.  They make the process of looking for assisted living and other care services less daunting by saving families time, money, and added stress.  Their company provides expert guidance concerning your loved one including finding the best places to live, receiving the proper care, and navigating a complex health care system.\n\nGary and Mickie both have extensive experience serving others and are driven by a desire to help families make informed life-changing aging decisions. \"However, there are over 100 options in North Houston for assisted living alone, with wildly varying degrees of quality and service.  Our goal is to make the advocacy and guidance we would want for our own family accessible to seniors throughout North Houston.\"\n\nGary & Mickie spend a great deal of time touring and reviewing the local living communities, including assisted living, independent living, dementia and memory care, and residential care homes, to help clients make the best possible decision for their loved ones.\nWhen asked about their approach, Mickie says, \"We get to do a lot of listening, understanding each family’s unique circumstances. This allows us to make the process less overwhelming by providing them with a short-list of the best care options to meet their needs. We then tour communities with the family, assist with negotiations and paperwork, and follow up with the senior after they’ve moved in.\"\nThey work at no cost to the family, receiving a commission similar to a realtor or apartment locator from the location chosen by the family. When not serving seniors, they enjoy time with their two teenage children and actively serving in their church as well as in the local school district.  Gary and Mickie Blizzard partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/ab29a0a11ab1d07062bcc22f482a9bd4/Gary%2520%26%2520Mickie_sd.jpg",
  "status":1,
  "address":{
  "id":"828a37d5a03289266fbb3fdc4b515198",
    "city":"The Woodlands",
    "state":"TX"},
  "user":{
  "id":"4a0046ae28a5cc4ebe63ace938060cb4",
    "name":"Gary And Mickie Blizzard"
}},
{
  "id":"assisted-living-locators-morristown-nj-eric-moore",
  "name":"Assisted Living Locators Morristown, NJ (Eric Moore)",
  "agentBio":"Eric Moore is the proud owner of the Assisted Living Locators franchise serving many key areas of New Jersey, including portions of Morris, Somerset, Union, Middlesex and Warren counties. Eric has a B.S. in Business Administration and has worked for over 25 years in the Financial Services industry, where he has provided financial leadership, training, and customer advisory services to several leading global companies.  Eric has lived in NJ for over 30 years and strives to bring his passion for helping others to Assisted Living Locators.  \n\nAs a trained Advisor, Eric helps to provide support and solutions that assist families in locating assisted living facilities, housing options and care services that meet their geographic, financial and clinical needs and preferences.  This service can be instrumental in helping families navigate through the information and alternatives to help them identify the best solutions for care.  Through the network of vetted facilities, Eric can help families search and view properties that meet the family’s specific needs.  Eric strives to provide high quality, personal and compassionate service to the community and help families smoothly transition to the care solution that best prepares them for the next phase of life.  Eric Moore partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/6279f62fd60eb45932ead1fe174ea5e5/Moore%2520Headshot_sd.jpg",
  "status":1,
  "address":{
  "id":"7361feccc24dbcd2157c5bb28a7d267b",
    "city":"Midland Park",
    "state":"NJ"},
  "user":{
  "id":"a0ae0865f912870f5b753f1a43e571c3",
    "name":"Eric Moore"
}},
{
  "id":"creating-new-hope",
  "name":"Creating New Hope (Christine Sevier)",
  "agentBio":"Christine Sevier is the owner and founder of Creating New Hope, LLC. She grew up in the Bay Area, obtaining her BA in Psychology at John F. Kennedy University. She’s spent ten years serving as a local Advocate, Case Manager and Mental Health Counselor at John Muir Hospital. Creating New Hope was established by Christine out of necessity, as she was court appointed as her grandmother’s conservator due to the progressive nature of her Alzheimer’s disease. Her many years in the social services field made her an expert at identify and navigating community resources. She is a dedicated, detail-oriented, and patient-focused professional, who offers comprehensive experience in healthcare administration and case management. She is also a California Certified Administrator for Residential Care Facilities (RCFE). Christine Sevier partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/fd5395593cab3b9eecb05947780a80cd/creating%2520new%2520hope_sd.jpg",
  "status":1,
  "address":{
  "id":"d0842704820c34f318d08ab4e991bd3f",
    "city":"Concord",
    "state":"CA"},
  "user":{
  "id":"6466dd1a96eafc6426114c516c0ed945",
    "name":"Christine Sevier"
}},
{
  "id":"adult-senior-placement-cynthia",
  "name":"Adult Senior Placement FL (Cynthia Fiammetta-Lopez)",
  "agentBio":"Cynthia Fiammetta-Lopez has long experience in the field of geriatrics, both personal and professional and she appreciates the difficulties facing a family when making a placement decision for their loved ones. Her experience working with the City of Coral Springs Police Department’s Community Involvement Unit assisting the elderly has given her further insight into the problems of seniors.\n\nCynthia’s goal is to assist families in their decision-making process by helping them locate the best senior housing environment, meeting their loved ones’ medical, social, spiritual and financial requirements. Cynthia centers her professional practice in the Miami-Dade, Broward and Palm Beach County areas of South Florida. As a Senior Advisor who has worked with Independent, Assisted Living and Memory Care Communities, Cynthia can answer all of your questions and guide you through the placement process. Cynthia Fiammetta-Lopez partnered with Seniorly in 2018.\n\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/fbea51f90ef2471179b885b73e1bc549/Bio%2520Picture_sd.PNG",
  "status":1,
  "address":{
  "id":"30b4f4238b5fdf7d0995ac6bcebb84f8",
    "city":"Coral Springs",
    "state":"FL"},
  "user":{
  "id":"20ce3bf54e6364b36df3e5862d64c1f8",
    "name":"Cynthia Fiammetta Lopez"
}},
{
  "id":"assisted-living-locators-of-st-louis-rob",
  "name":"Assisted Living Locators of St. Louis, MO (Rob Howe)",
  "agentBio":"Rob Howe lives in St. Louis, MO with his wife Lisa.  Rob enjoyed a long and successful career in the distribution and logistics business with McDonald’s Restaurants.  \n\nIn 2015, Rob started his local business, Assisted Living Locators of St. Louis.  Having gone through the experience of searching for senior living personally with his wife’s family, this business is a perfect opportunity to assist other families going through the same struggles.  He is able to combine his business skills, compassion and customer service skills to help each family find the right solutions.  \n\nHis goal is to provide a high quality service to St. Louis’ senior community.   He eases the burden on families by locating the best options by thoroughly understanding their needs, preferences, and budget and then matching them with the right communities.  He personally meets with each family, tours the communities with the families, and follows up extensively to insure everything goes as planned.  All of this is done in a very professional manner, in quick time, and with a sense of “fun” to make this difficult life transition as enjoyable as possible.  Rob Howe partnered with Seniorly in 2018.\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/92e9f042472a7d1a66559c5684c2e55d/Rob%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"22e8c5a77f179c8a36f7441d4e1e9dec",
    "city":"Arnold",
    "state":"MO"},
  "user":{
  "id":"b988240c3314fafccd97035fe6d9d64e",
    "name":"Rob Howe"
}},
{
  "id":"assisted-living-locators-midlands-sc-ramona-britt",
  "name":"Assisted Living Locators Midlands, SC (Ramona Britt)",
  "agentBio":"Ramona Britt is 54 years old and the wife of Ron Britt.  They have two married sons, two grandsons and five grand-dogs. Ramona is originally from North Carolina but has made Columbia South Carolina her home since arriving here in 1990. Ramona enjoys time with family, hiking and camping in the North Carolina Mountains. She is also loves to read. Ramona has enjoyed a career in accounting for 23 years and made a lot of friends along the way.  She is now the Owner and Certified Senior Advisor of Assisted Living Locators of the Midlands.  Ramona just started her third year in the business and very much enjoys working with seniors and their families. Romona Britt partnered with Seniorly in 2018. \n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/2c6710298546a74702a880a0166888f4/Ramona%2520Britt%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"6657eaf056ba8a488c9798ee75f2277c",
    "city":"Columbia",
    "state":"SC"},
  "user":{
  "id":"eaca4a89bdedee9aa4b1333cdacbb965",
    "name":"Ramona Britt"
}},
{
  "id":"assisted-living-locators-pinellas-county-fl-lara-dickerson",
  "name":"Assisted Living Locators Tampa Bay, FL (Lara Dickerson)",
  "agentBio":"Lara Dickerson resides in the Tampa Bay area with her husband and two children.  Lara enjoyed a long and successful professional career in the fields of engineering, strategic purchasing and education.\nLara desired to build on her ability to educate and sought opportunities to give back to the community with a specific focus on assisting seniors.  She combines her business skills with compassion to help and educate each family she works with to resolve the challenges they face, ensuring that their loved ones receive appropriate care and meaningful life experiences as they age.    \nIn addition to being an elder care advisor, Lara is also a professional guardian.  Through her extensive advocation for seniors, she recognizes and empathizes with the changing needs and circumstances of today’s seniors.  She has been serving the Tampa Bay area as an Eldercare Advisor for more than 5 years.  \nLara’s goal is to provide high quality service to Tampa Bay’s senior community, while ensuring that they and their families receive the support, assistance, and compassion needed to manage the key life transition that they are facing.  Lara Dickerson partnered with Seniorly in 2018. ",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/d77554ad7a70e9450a9cf142052450e1/Screen%2520Shot%25202018-09-19%2520at%25205.23.53%2520PM_sd.png",
  "status":1,
  "address":{
  "id":"2f7c4e8354cc536ff6948720cfeeccb5",
    "city":"Clearwater",
    "state":"FL"},
  "user":{
  "id":"bc3b26f71602112c10732341d7445e46",
    "name":"Lara Dickerson"
}},
{
  "id":"assisted-living-locators-sw-portland-or-peter-wilhelm",
  "name":"Assisted Living Locators, SW Portland OR ( Peter Wilhelm)",
  "agentBio":"Peter Wilhelm resides in Portland, Oregon with his wife Marianne and their three children. Peter graduated from Montana State University and later earned a master’s degree from The George Washington University. He is a long-time volunteer with multiple non-profit organizations in Portland supporting the arts and elder care and has a broad professional background in communications, marketing, and national level government service. Peter is fueled by a desire to help people and after several years as a Meals on Wheels volunteer driver and having gone through two difficult family situations resulting in the need for long-term care he decided to find a way to combine his professional capabilities with his desire to make a difference in senior’s lives. Peter is proud to serve Portland seniors through his Assisted Living Locators business by being a caring, supportive resource for families and individuals in need of quality senior care. Peter Wilhelm partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/6f1e566e4d1b6aef995972556240d86c/PeterWilhelm%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"14a78a6a0748fa495a3f908a71a1a8dc",
    "city":"Portland",
    "state":"OR"},
  "user":{
  "id":"080e14bc405cf929fe6ca7824513363c",
    "name":"Peter Wilhelm"
}},
{
  "id":"oasis-hudson-valley",
  "name":"Oasis Hudson Valley, NY (Mark Fry)",
  "agentBio":"Mark Fry is an experienced advisor, who works with seniors and their families to find the place that is the best fit for their current and future needs. Providing a personal and confidential service, including connections to other organizations and professionals serving the senior community.\nHe lives in Cold Spring in the Hudson Valley with his wife, and they have two adult sons who both live and work in the area. Prior to the year 2000, they lived in England, where he worked for the BBC (British Broadcasting Company) as a manager in the technology department. In 2000, he had the opportunity to transfer to the New York office and lead the technology for support and development in all offices of the Americas. As a family, they migrated across the Atlantic and later earned the privilege of becoming U.S. citizens. They have lived in Cold Spring since 2000, and both sons attended the local school, Haldane.\nMark's career has always been focused on providing an excellent service in technology and in addition office space, facilities and production. Oasis allows him to continue to deliver that excellent level of service in an organization that is committed to the client and greatly cares about achieving the best solution. Each day he looks forward to the challenges that working with Oasis as a Senior Advisor will bring, and building on the personal experience he has of close family members coping with dementia and Alzheimer’s. Mark Fry partnered with Seniorly in 2017.\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/ec8fdc51e4e99689c990e6f0fa98dce5/Screenshot%25202018-07-10%2520at%25203.09.37%2520PM_sd.png",
  "status":1,
  "address":{
  "id":"e112de35075d8196f7a7c9514514dcaa",
    "city":"Cold Spring",
    "state":"NY"},
  "user":{
  "id":"1bbefcc965c4c23dbc7682c621b7b551",
    "name":"Mark Fry"
}},
{
  "id":"brandy-randolph",
  "name":"Senior Care Authority, Denver Metro (Brandy Randolph)",
  "agentBio":"Brandy Randolph knows how stressful it can be to search for the right care facility for a senior in crisis. When her father-in-law Bob was released from the hospital into a rehab facility, the family was given a list of facilities and sent on their way. The more places they visited the more confused they got.\n\nBrandy studied Psychology and Gerontology in college and always knew she wanted to work in some aspect of the Gerontology field. But it wasn’t until she’d gone through this personal experience that she knew what she wanted to do. She decided to become a Senior Care Authority Advisor to help other families avoid what she and her family went through.\n\nWith a background in customer retention, customer service, and sales, Brandy is well suited to helping seniors and families find the right fit for their personality and needs. Brandy Randolph partnered with Seniorly in 2017.\n\nThe Denver native spends much of her time visiting and reviewing the area’s senior facilities — including assisted living, independent living, memory care, and residential care homes — to help her clients make the best possible decision for their loved ones. She meets one-on-one with families to assess their needs, schedules and accompanies them on visits to top-rated facilities, assists with negotiations and paperwork, and follows up with families after a placement is made.\n\nWhen not striving to make a difference in seniors’ lives, Brandy enjoys spending time with her family — traveling, hiking, camping, boating, and seeking adventure of all kinds with her husband and two “beautiful children.”\n\nBrandy is always happy to help with all the necessary services related to assisted living facilities or residential care home for your loved ones in North Denver metro area. \n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/fe8c49cee8b0a3c9779f9162feb00a61/Brandy%2520Randolph%2520Headshot_sd.jpg",
  "status":1,
  "address":{
  "id":"c270492b51ec88f6a53cdad174e9791b",
    "city":"Henderson",
    "state":"CO"},
  "user":{
  "id":"284e15965484439e0802c1a86e5c1d13",
    "name":"Brandy Randolph"
}},
{
  "id":"oasis-rochester-ny-lane-keating",
  "name":"Oasis Rochester, NY (Lane Keating)",
  "agentBio":"Lane Keating has amassed a referral network of professionals that are uniquely qualified to assist in all aspects of the challenging transition into a senior community, as a longtime resident of Monroe County, . From finding the best possible placement options for the senior to addressing the day-to-day logistical tasks that many families must face, she offers a comprehensive service designed to allow the family to concentrate on their loved one. Lane Keating partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/4a01c50edad5048ed55e6e9d3e95791f/Screen%2520Shot%25202018-07-16%2520at%252010.39.17%2520AM_sd.png",
  "status":1,
  "address":{
  "id":"96248ec6b076ef8abcb0bed809cff4ca",
    "city":"Pittsford",
    "state":"NY"},
  "user":{
  "id":"8b3c52db7cadb844c36ee34e481aa7d0",
    "name":"Lane Keating"
}},
{
  "id":"nc-senior-living-solutions-stephanie",
  "name":"NC Senior Living Solutions (Stephanie Merritt)",
  "agentBio":"Stephanie Merritt, the Owner of NC Senior Living Solutions spent nearly two decades working directly in a community setting with Five Star and Sunrise Senior Living. Through her experience, she has been able to see the needs of a family and the residents. With the process of scheduling and touring, Stephanie and her team professionally select and advise placement to communities that provide the very best care, as well as community required assessment and smooth move in transitions. Ensuring the proper paperwork, assessment, TB skin test, POA documents and Physician Exam reports are in place prior to the move in, is critical for a smooth transition for the new resident as well as the community. NC Senior Living Solutions provides total comfort and peace of mind for the senior, their family, and caregiver. Stephanie Merritt partnered with Seniorly in 2018.\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/2f16ff7d5178544a8e5819d12b5f69b2/IMG_6386_sd.jpeg",
  "status":1,
  "address":{
  "id":"b3ed7bde2fce264671c3400b3324e952",
    "city":"Apex",
    "state":"NC"},
  "user":{
  "id":"a00e0ba109e0514d549d9de00b2e4848",
    "name":"Stephanie Merritt"
}},
{
  "id":"oasis-south-charlotte-sc-theresa-robertson",
  "name":"Oasis South Charlotte, NC (Theresa Robertson)",
  "agentBio":"Theresa Robertson was first introduced to the senior living industry while working for an in-home care company during her college years in Buffalo, NY, where she grew up. Helping seniors in their homes gave her the opportunity to make a real difference in their lives, and she quickly found that helping seniors is her passion and serves as one of the most gratifying experiences in her life. \nSeniors have shaped the world as we know it today, making valuable contributions to society along the way, which is why Theresa has chosen to dedicate her career to helping seniors find guidance and support around living choices when they need it most. \nTheresa has been living in and serving the Charlotte area since the late ‘90s. She has worked for several of the large employers in the area, but felt she was not doing all she could to contribute to the community and wanted to get back to making a real difference in the lives of others. From assisted and independent living communities to memory care communities, she is eager to help seniors and their families find the perfect senior living community. Theresa Robertson partnered with Seniorly in 2018.\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/f0f16b4115a1234ab62e29ad31147771/8576-002-Social_sd.jpg",
  "status":1,
  "address":{
  "id":"7a04be52ea1d155eb3b8521db50b238a",
    "city":"York",
    "state":"SC"},
  "user":{
  "id":"00726214ca4f6c55d773544962c7fe61",
    "name":"Theresa Robertson"
}},
{
  "id":"premier-placement-service-jim-cassin",
  "name":"Premier Placement Service (Jim Cassin)",
  "agentBio":"Jim Cassin from Premier Residential Placement Service is a personalized residential advisory and placement service that smoothly guides you through the daunting task of selecting the right residential community. Jim Cassin and his partner, Tony have more than thirty years of professional healthcare experience, exclusively in the Greater San Francisco Bay Area. Because they are independent and unbiased, the two can help you understand the pros and cons of the available options.\n\nOur professional expertise will guide you in all aspects of this important life decision, removing the guesswork because you will be fully informed. Tony will help you match your needs, including physical/medical requirements, budget, and desired geographic location. His free residential placement service saves you time and gives you peace of mind that you have made the optimal decision for yourself or your loved one.  Jim Cassin partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/67f9a3d30b0ad89f36deb92b11425c7f/0_sd.jpg",
  "status":1,
  "address":{
  "id":"bc044bf41e739ad9e732193f5482a764",
    "city":"San Anselmo",
    "state":"CA"},
  "user":{
  "id":"317922174db95efeb01916b7f13e86da",
    "name":"James Cassin"
}},
{
  "id":"preparing-for-care",
  "name":"Preparing for Care (Caroline Bell)",
  "agentBio":"Caroline Scranton Bell has over seventeen years of experience as an Executive with Fortune 100 companies like American Express and Diners Club, but what makes her truly special is her experience helping others navigate the maze of becoming a full time caregiver for a Parent.\n\nWhen Caroline’s father was no longer able to live on his own, she left her job in Corporate America to become his primary caregiver. She was shocked at how little information and guidance existed for the adult child caring for an aging parent, or even for a spouse caring for their aging mate. She attacked this in the same way that she attacked every other challenge she faced in Corporate America; she soaked up every piece of information she could, and learned everything possible to ensure that her father had the best care possible. She even went back to school and got her CNA license so that she would know how to care for his medical needs. \n\nAfter her father’s death, Caroline decided to take her knowledge and experience and help others who find themselves in the same roles. She founded the company “Preparing for Care LLC” , using her hands-on experience and knowledge from caring for her 90-year old father to provide much needed education, support and guidance to adult children about to or now caring for their senior parents.\n\nHer goals are clear: to provide a resource for those needing to find reliable, vetted specialized services for their parents. She has worked to create a safe haven for one of the most trying and emotionally charged situations anyone can face, one for which most people are unprepared. She explained “We help others through this frightening ordeal of helping the family find the right community where their loved ones can flourish in their golden years. \n\nCaroline was awarded the Caregiver of the Year award by Parentgiving.com in 2010, and recently received the Senior Professional Award from the Upstate Senior Network in 2014. She is a Facilitator for the South Carolina Chapter of the Alzheimer’s Association.\n\nShe received her BS at University of Alabama and her Paralegal degree at the National Institute of Paralegal Training. She is a Certified CNA through the Red Cross of Bartow County. She received her Gerontology Certificate at Kennesaw University.  Caroline Bell partnered with Seniorly in 2018.\n\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/134358f64939b97fe8a98f0976c0d12e/IMG_4600_sd.JPG",
  "status":1,
  "address":{
  "id":"a9e24481be9304aafa14ed5769b36de5",
    "city":"Townville",
    "state":"SC"},
  "user":{
  "id":"050385324c33379593b28a4f92ade384",
    "name":"Caroline Bell"
}},
{
  "id":"jackie-tatsak",
  "name":"Retirement Living by Design (Jackie Tatsak)",
  "agentBio":"Jackie Tatsak has been an Assisted Living Administrator since 1997 and, in some capacity, have worked in Independent Living, Assisted Living, Memory Care, Home Health, and Skilled Nursing.  She has also worked with specialty licenses such as Extended Congregate Care, Limited Nursing, and Mental Health.  More importantly, she was a caregiver!\n\nWhen her grandmother and mother passed away in 2003, her life changed forever.  She moved in with her father and became his caregiver due to his limitations from a stroke years prior.  She cared for him until his death in 2011.  Even though Jackie worked in \"the business\", she still had many questions and struggles.  She understand what it take to work full time and be a caregiver.  Her purpose in creating this company is to make this journey as easy as possible for you and find your ideal retirement living option.\n\nJackie does not proclaim to be an expert in every field related to retirement living, but can refer you to those who are experts in their fields. Jackie Tatsak partnered with Seniorly in 2017.\n\nJackie is dedicating her journey to her parents and \"gram\" who demonstrated a strong work ethic and gave her the wings to fly. They taught Jackie to \"live her passion\" and that is what I offer you. Jackie Tatsak partnered with Seniorly in 2017. ",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/b51647349119ba1a173de5bcaef934b8/JackieTatsak_Seniorly_sd.png",
  "status":1,
  "address":{
  "id":"74dd0a0575f196dc88c906f5bdee2134",
    "city":"Indian Rocks Beach",
    "state":"FL"},
  "user":{
  "id":"17be8317840bb73b69a116cff05437c2",
    "name":"Jackie Tatsak"
}},
{
  "id":"roger-sunner",
  "name":"Senior Care Authority, Fresno CA (Roger Sunner)",
  "agentBio":"Roger Sunner has over 30 years of functional sales, marketing experience, and financial services. He is highly accomplished and a respected subject matter specialist in planning, developing and implementing sales operational strategies and business processes. Excellent working knowledge of overall customer management processes, operational management processes, marketing, customer service, and face-to-face processes.\n\nHis background in sales and management has been very beneficial to his senior care families. His experience drives him to provide comfort and the utmost customer service at a time that senior care families need it the most. Roger's ability to help those around him during their time of need is what convinced him to enter SCA in the senior care industry.”\n\n“Selecting an assisted living or memory support community is one of the most difficult decisions a person can ever face,” says Roger. “His greatest joy comes from helping people make the right decision for their loved ones and supporting them through the process of finding the best option to meet their needs.”\n\nRoger's experience allowed him to help clients navigate through a difficult and emotional process. His passion for helping others has helped provide excellent service to his clients. SCA allows him to work with families in the community to remove the uncertainty and stress to those families dealing with senior care placement.\n\nWhile touring and reviewing the local living communities — including assisted living, independent living, dementia and memory care, and residential care homes, to help his clients make the best possible decision for their loved ones, Roger completes detailed reports of each residence that he shares with families to assist them with their crucial placement decisions. Roger Sunner partnered with Seniorly in 2017.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/063eb6140e71f0b0a0190fbe30aa7701/seniorcareauthority_roger_sunner_sd.jpg",
  "status":1,
  "address":{
  "id":"1c7579ba97907d91bfa411c946c0370b",
    "city":"Fresno",
    "state":"CA"},
  "user":{
  "id":"6974e389ba38148217cd8666a214e4e9",
    "name":"Roger Sunner"
}},
{
  "id":"senior-care-authority-palm-beach-county-jodi",
  "name":"Senior Care Authority, Palm Beach County FL (Jodi Glacer)",
  "agentBio":"Jodi Glacer has lived in Florida most of her life and calls South Florida home.  After 30 years of working for Fortune 1000 companies, she made a career change that allows her to use her experience to help others and add more meaning to her own life. \n \nJodi wanted to help minimize the stress and uncertainty for Seniors and their families who have decided to make a move. She helps families find the best options for assisted living, independent living, memory care, residential care homes and skilled nursing facilities. \n \nJodi is well equipped to assist you through the process of visiting a selection of facilities based on the your requirements, and supports you in making the best, and most informed decisions. \"I will never take you to a place I haven't already visited and I always check citation reports issued by the state.\"\n \nJodi is always happy to help with recommendations for necessary services that seniors may need before or during a move.   She is very familiar with options in Palm Beach County and Northern Broward County. Jodi Glacer partnered with Seniorly in 2017.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/28c3b9fe56a3ebb020929ada9c56856a/Jodi%2520Headshot%25201%2520%25282%2529_sd.jpg",
  "status":1,
  "address":{
  "id":"239c748903a28f1371699a4f565392d6",
    "city":"Boynton Beach",
    "state":"FL"},
  "user":{
  "id":"9a716e5976a0ad9cadc89a206fffa6e9",
    "name":"Jodi Glacer"
}},
{
  "id":"senior-living-specialists-llc",
  "name":"Senior Living Specialists TX (Kim Corcoran)",
  "agentBio":"Kim Corcoran has always had a soft heart for seniors and helping others. She is excited about providing support for the team at Senior Living Specialists and helping people find a place they can call home. Kim also loves being with her two children, reading, baking and playing her flute. She has also volunteered at her church and in the Plano community previously. In 2005-2007, Kim was on the Relay For Life Committee (with the American Cancer Society) for Plano and helped with marketing and acquiring sponsorships for the event for three years. Working with the cancer survivors was the best reward possible. Kim Corcoran partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/3c3a2beaa94be3c6f4e0b3ffeb3dcdf7/Kim_sd.JPG",
  "status":1,
  "address":{
  "id":"ae515d4bc260caf4cc1b5af4207337b7",
    "city":"Addison",
    "state":"TX"},
  "user":{
  "id":"14c4d5d9c88b48bfe6c26e6f3c5c925c",
    "name":"Kim Corcoran"
}},
{
  "id":"senior-placement-services-of-arkansas-mike-cude",
  "name":"Senior Placement Services of Arkansas (Mike Cude)",
  "agentBio":"Michael Cude is a Certified Senior Advisor® who specializes in senior living options and transitional care. He has been advising and working directly with seniors since 1999. A native of Arkansas, Mike has worked around the state throughout the duration of his professional career and is familiar with the offerings and amenities of the majority of the senior living communities, facilities, and agencies within the service area. Mike Cude partnered with Seniorly in 2018. ",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/a36060d1a00350ab0646fb16fb400274/Seniorly%2520headshot.Mike%2520Cude_sd.jpg",
  "status":1,
  "address":{
  "id":"31b226b56100c71d2493a97b0963eec5",
    "city":"Russellville",
    "state":"AR"},
  "user":{
  "id":"a4cc3d508a882049304951da43574486",
    "name":"Michael Cude"
}},
{
  "id":"valley-view-senior-placement-agency-and-resources-llc-razvan",
  "name":"Valley View Senior Placement Agency and Resources LLC (Razvan Dumitry)",
  "agentBio":"Razvan Dumitru is the CEO and founder of Valley View Senior Placement Agency and brings many years of medical experience and compassion. His medical experience started in his youth by developing and managing two dental offices, but he felt he wanted to do more, so he became a Paramedic and worked in NYC / NYS EMS, as a 911 paramedic and also as a critical care transport medic for 12 years. Observing the good and bad in the industry he felt that he could do even more to help people so he become an Assisted Living Home Manager and opened in Surprise Arizona, an Assisted living home, which is currently a success story. Since he opened the facility, with his wife, Oana he tried to improve even more so he got certified as a Certified Senior Advisor , he also got certified in Dementia care by the National Alzheimer Association. With all of his knowledge he knows all of the necessary requirements in order to help you find a perfect match for your loved one.  Razvan Dumitru has been a partner since March 2018. ",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/429189f3e772758f7c7425c65bb48463/razvan_sd.jpg",
  "status":1,
  "address":{
  "id":"d45dc1be4b58d2a85949244dd029837c",
    "city":"Surprise",
    "state":"AZ"},
  "user":{
  "id":"b10efa581daa050d94f315f03aad8fa3",
    "name":"Razvan Dumitru"
}},
{
  "id":"total-senior-jeff-albert",
  "name":"Total Senior (Daniel Sagal and Jeffrey Albert)",
  "agentBio":"Daniel Sagal's grandmother fell, broke her hip, and spent three months in a local rehab center learning how to walk again in 2013. Living just down the street and being well aware of how difficult it was for his grandmother to go through such a traumatic experience, he joined her for Physical Therapy and Occupational Therapy daily to help motivate her and translate the instructions provided by the Therapists. After three months, her walking ability was so-so at best and her Dementia had become a real issue. With a lack of activities, communication, or support, she felt stranded in her bed or wheelchair and had no desire to continue her life. When the time came to relocate her into a long term assisted living facility, there were few people willing to help and even fewer knowledgeable enough to provide useful information.\n\nDaniel formed a special bond with his grandma during this time and soon recognized that his support of her, and others in her situation, doesn't have to end when she completes her rehab. This personal experience sparked the concept of Total Senior and TotalSenior.com.\n\nAfter over half a decade of building a career in the Real Estate industry, Daniel changed gears and pursued something more meaningful. The days of working for money were over. There is a new goal in life: to help families find the best senior living options by providing the highest level and most compassionate service. As he strives to provide the best services available in the industry, he is building a brand that operates with integrity, strong morals, and loyalty. Daniel Sagal partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/832c58ee202e6bf8286689dfd85579d6/Daniel_sd.jpeg",
  "status":1,
  "address":{
  "id":"cf868840e85e48948e618af9139ba547",
    "city":"Tarzana",
    "state":"CA"},
  "user":{
  "id":"90066eedf596edaa302973e68b7130f7",
    "name":"Daniel Sagal"
}},
{
  "id":"assisted-living-locators-eastside-or-russell-morgan",
  "name":"Assisted Living Locators, Eastside OR ( Russell Morgan)",
  "agentBio":"Russell Morgan resides in Portland, Oregon with his wife, Carol.  Russell enjoyed a long and successful professional career in the fields of telecommunications and technology, with a strong emphasis on customer service.  \nUpon retirement, Russell sought opportunities to give back to the community with a specific focus on assisting seniors.  He combines his business skills with compassion to help each family he works with to resolve the challenges they face in ensuring that their loved ones receive appropriate care and meaningful life experiences as they age.    \nA senior himself, Russell recognizes and empathizes with the changing needs and circumstances of today’s seniors. In addition, as a volunteer with the Alzheimer’s Association, Russell has the opportunity to see first-hand the impact that this disease has on seniors and their families.  \nHis goal is to provide high quality service to Portland’s senior community, while ensuring that they and their families receive the support, assistance, and compassion needed to manage the key life transition that they are facing. Russell Morgan partnered with Seniorly in 2018.\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/1e8b5461615708650e71d191082ef200/134093_sd.jpeg",
  "status":1,
  "address":{
  "id":"2016af71647ce61423e60fe7d2a03a26",
    "city":"Portland",
    "state":"OR"},
  "user":{
  "id":"4710b2e18650c957c9c0e5fb53553874",
    "name":"Russell Morgan"
}},
{
  "id":"the-right-move-senior-resource-michelle-withrow",
  "name":"The Right Move Senior Resource (Michelle Withrow)",
  "agentBio":"Michelle Withrow has worked many years as a social worker, but it wasn’t until she joined The Right Move Senior Resource that she recognized her dream to serve seniors was finally coming to fruition. \n\nMichelle has had numerous opportunities to serve others throughout her adult life.  Through her church, she were given the opportunity to serve as a missionary family at an orphanage in northeast Brazil for a period of two years.  Michelle's husband built a second orphanage, her twin daughters had the opportunity to serve children with unconditional love, and she worked with the staff to improve systems and conditions. After returning stateside, she was fortunate enough to serve fellow social workers by creating Social Work meetings with great speakers and resources in several Atlanta hospitals to increase the knowledge of community resources. Nowadays, Michelle's efforts have turned to serving her local church and community. For many years, it has been her dream to serve others by offering no cost social work to seniors and their families.  Michelle's past experiences have given her the opportunity to learn about useful, necessary resources to help aid the aging community and now she has daily opportunities to share her knowledge and heart with families. \n\nHer position has given her the ability to pray for (or with, if desired) families while supporting them through challenging decisions.  She is honored to walk alongside families during the trying times of finding a senior living community or in finding services to support them in the aging process. Michelle Withrow partnered with Seniorly in 2018. ",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/22fac9fe44d96cf2ea58bfdb137612fe/Michelle_Withrow_Seniorly_sd.jpg",
  "status":1,
  "address":{
  "id":"beec5f2971318e4f868dfe88ac70ba2e",
    "city":"Cumming",
    "state":"GA"},
  "user":{
  "id":"5b0d5e33162d4cc627572a0c6093326e",
    "name":"Michelle Withrow"
}},
{
  "id":"assisted-living-locators-starla-bryant",
  "name":"Assisted Living Locators, Alexandria VA (Starla Bryant)",
  "agentBio":"Starla Bryant opened her Assisted Living Locators franchise to provide care and guidance to families when they need it the most. After Starla’s mother suffered a stroke and she faced the daunting process of finding the right resources and trained caregivers within a 48-hour period, she wanted to pay it forward by helping others navigate the system and identify the best options for their loved ones. In addition to eldercare advising, Starla enjoys exercising, perfecting her bowling game and enjoying an old western or war movie.  She loves to travel, volunteer with her church and, discover new local restaurants. Starla thrives on making a positive difference for caregivers and their friends and family.  She finds it gratifying to help people one-on-one and really make an impact in their lives.  As an Elder Care Advisor, Starla is excited to provide a no cost, referral service that offers the best elder care options, information, and resources available to help families in the Northern, Virginia area. Starla loves running her own business and assisting others. Starla Bryant partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/6925dd1c5e6391e7c528fa3edf085aef/Starla%2520Bryant%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"83037b925ddf42b3b5a3904610e8a885",
    "city":"Alexandria",
    "state":"VA"},
  "user":{
  "id":"c1fa9eb94fee47c9d64ff91af2d918df",
    "name":"Starla Bryant"
}},
{
  "id":"senior-living-decisions-co-jim-ver-meer",
  "name":"Senior Living Decisions CO (Jim Ver Meer)",
  "agentBio":"Service in home health, adaptive transportation equipment, and a wide range of senior leadership roles has led Jim Ver Meer to an in-depth understanding of the importance of connecting aging adults to living space that complements their character.\n\nOne of the most satisfying activities for Jim has been mentoring and inspiring staff, and he uses those same skills and find that same satisfaction when learning about a senior's lifestyle, objectives, dreams, challenges, and plans. His 20 years up and down Colorado’s Front Range has also equipped him with a network of resources, including senior retirement options, but extending into many other areas to assist seniors.\n\nHe is also accustomed to getting on the floor of a van to assure a client’s wheelchair is safely secured or finding a solution to a health, financial, or logistical concern. It began with caring for his own family and would love to care for yours.\n\nIf you want to talk, even just once, Jim promises to share insights, propose ideas, and if you tell him \"that's it\", he will leave you alone. But there just isn't any need to face this tough life transition without help. Jim Ver Meer partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/c0477191c15accbde868645fe0aae6d4/GoodBlueWhitesq_sd.jpg",
  "status":1,
  "address":{
  "id":"62afb18d8352f33d913c7561ac12f8bc",
    "city":"Colorado Springs",
    "state":"CO"},
  "user":{
  "id":"928b3ebaf9e8b02cb6dd446032241922",
    "name":"Jim Ver Meer"
}},
{
  "id":"ask-carol-central-nc-doug-shellabarger",
  "name":"Ask-Carol Central NC (Doug Shellabarger)",
  "agentBio":"Doug Shellabarger is the Carol’s Senior Living Advisor in the Piedmont Triad area. About 15 years ago, he got a close-up view into the challenges many of us will have to face as we make tough decisions about where to direct a loved one when their everyday needs outweigh their ability to cope. After his grandmother, Mally, had a fall in her Florida winter rental home, his parents immediately drove directly down to Sarasota to pick her up and retrieve her things. It became clear that day that she needed more assistance than his family could provide so far away. Little did they know, this was the start of a long journey with many difficult choices.\n\nAs you can imagine, finding the appropriate place was a huge undertaking. There are so many options. Where to begin? No one had done any research. What facility would be the perfect place for Mally?\n\nWhile Doug's family did end up finding a wonderful place for Mally, it was hard. They needed help that just wasn’t available or had no idea where to look. \n\nFor the past 17 years, he has lived and worked in the Piedmont Triad. He has spent a long career in the Healthcare Industry seeing firsthand many of the challenges that face caregivers, families and patients.\n\nDoug has come to appreciate the difficult life choices facing our families, and the absence of personal, caring professionals to provide one-on-one guidance through this process. It is his dream to take what he has learned from his time in the healthcare industry and parlay it into this specific need in his own community.  Doug will personalize his service for you and your family’s particular needs. This task could be taken off your plate while he picks up the burden of finding the most appropriate solution for your loved one based on their individual needs and finances.\n\nPlacing a loved one in an assisted living home/facility is never an easy decision, but Doug is here to provide support during the process of identifying resources that will help with: Financial Concerns, choosing the best fit for you in the community, and giving personal support when you need it. Doug Shellabarger partnered with Seniorly in 2018. ",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/a8ab8645beb416dd18a6eef4612bc96b/Doug%2520Headshot_edited-2_sd.jpg",
  "status":1,
  "address":{
  "id":"53bc8bf51d68cba7d155e153a1be69d3",
    "city":"Tinton Falls",
    "state":"NJ"},
  "user":{
  "id":"efa3efe07197fcb6cff540b2b3df7755",
    "name":"Doug Shellabarger"
}},
{
  "id":"ask-carol-boston-ma-daniel-diamond",
  "name":"Ask-Carol Boston, MA (Daniel Diamond)",
  "agentBio":"Daniel Diamond is a Carol’s Senior Living Advisor in Middlesex and Worcester counties. Daniel became involved in Senior Living based on his own personal experience, going through the process for both of his own Grandmothers.  One of them, who was very independent, refused to leave her house which she worked her entire life for, so as a family, we came up with other options.  His remaining Grandmother was open to Assisted Living when the time came, and while there, she met another Resident, and they actually got married!\n\nAfter growing up in Michigan, he located to Massachusetts his entire adult life, and this is his home.  Daniel is involved in his local town government, and enjoys watching his wife and kids play soccer.\n\nMaking the difficult decision to place a family member in an assisted living facility isn’t easy, but we are here to help.  Let Daniel assist you in finding the right care for your loved one – one that meets both the financial and care needs of your parent.  Daniel Diamond partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/e387b0f9984ec1d771e6600c79a06595/Dan%2520Sweater_edited-2_sd.jpg",
  "status":1,
  "address":{
  "id":"3ecb55686a5bd11c59bf60d987fc9c49",
    "city":"Auburn",
    "state":"MA"},
  "user":{
  "id":"8375e96199310d38b5f7b2a38421d76e",
    "name":"Daniel Diamond"
}},
{
  "id":"sarah-ordover",
  "name":"Assisted Living Locators, Greater Los Angeles (Sarah Ordover)",
  "agentBio":"Sarah Ordover is an Accredited Senior Living Specialist, who runs the Los Angeles office of Assisted Living Locators, a nationwide network of highly-trained local senior housing professionals.  Sarah has worked with hundreds of families in the LA area and has inside knowledge on all the best assisted living, memory care and independent living homes and communities in the area.  She will work with you one-on-one to whittle down a list of appropriate properties, tour with you, help you evaluate selections and negotiate pricing.  She is extremely knowledgeable on the many issues surrounding this most important decision and is a reliable, pro-active resources for you and your family.  You can find out more about her by visiting her website www.assistedlivinglocatorsla.com or reading her Yelp reviews at https://www.yelp.com/biz/assisted-living-locators-beverly-hills-13.  Sarah Ordover partnered with Seniorly in 2017. ",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/fd58887eab1cf94295717b263a949235/SarahOrdover_Seniorly_sd_sd.jpeg",
  "status":1,
  "address":{
  "id":"a1db50ae78d2472a392b5b7290d7ad04",
    "city":"Beverley Hills",
    "state":"CA"},
  "user":{
  "id":"0fd10125a70faeedb74f09c75e8f6d60",
    "name":"Sarah Ordover"
}},
{
  "id":"graceful-senior-solutions-clark-shuster",
  "name":"Graceful Senior Solutions  (Clark Shuster)",
  "agentBio":"Clark Shuster and his wife Jane, help seniors and their families find the best housing solutions for themselves or their loved one based upon needs, preferences and resources. They opened Graceful Senior Solutions five years ago after struggling to find appropriate housing for Jane’s father, who had downsized from a large home in New Jersey and moved to Pennsylvania.  Living in Newtown, they are very active in their local community, especially in their church. In his prior career, Clark led the business community for 27 years as president of the Lower Bucks County Chamber of Commerce.  \n\nWith a Master’s Degree in Social Work, Jane has over 20 years of professional experience serving people in a variety of residential and community settings. In order to strengthen their service to clients, Clark also completed a comprehensive course of study and obtained the Certified Senior Advisor(CSA) designation.  He is also the Center Manager at the Morrisville Senior Center in Morrisville, PA. Clark Shuster partnered with Seniorly in 2018.\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/e69c0413ea7ceb849c96993c8da83d73/Clark%2520and%2520Jane%2520Shuster_sd.jpg",
  "status":1,
  "address":{
  "id":"e562841c2e02fef01b3da3495ce95d27",
    "city":"Fairless Hills",
    "state":"PA"},
  "user":{
  "id":"1913a8f9c3b2612203b0d6de163e6c94",
    "name":"Clark Shuster"
}},
{
  "id":"a-senior-care-solutions-cheryl-lourenco",
  "name":"A+ Senior Care Solutions (Cheryl Lourenco)",
  "agentBio":"Cheryl Lourenco is the founder of A+ Senior Care Solutions.  She has 20 plus years of experience working with Independent & Assisted Living, Dementia & Alzheimer’s care, Residential Care Homes. In-Home Care, Hospice Care, Veterans Aid and Attendance, numerous State and Local agencies and several programs for the elderly.  She is willing and able to assist you or your referral to navigate through the journey of senior care.  She also welcomes the opportunity to speak at your clubs or organization, providing education and referrals for senior services and programs.  Please feel free to contact her at any time.  Cheryl Lourenco partnered with Seniorly in 2018.\n\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/70ab1b3a1541a56c5f81a5984c77385c/cheryl%2520bio_sd.jpg",
  "status":1,
  "address":{
  "id":"b0e611c3a8cf7a237e4381bb8168be51",
    "city":"Hughson",
    "state":"CA"},
  "user":{
  "id":"225f7ac53e38485b9c02e6ac366fcac6",
    "name":"Cheryl Lourenco"
}},
{
  "id":"karen-mitchell",
  "name":"Assisted Living Locators, Fort Worth TX (Karen Mitchell)",
  "agentBio":"Karen Mitchell began her career in non-clinical healthcare management in West Texas.  After receiving her Bachelor of Arts degree from the University of Texas Permian Basin, she spent 25+ years in leadership roles for hospitals, rehab centers, and physician practices.  For the next 2 years, Karen was a healthcare revenue cycle consultant and then spent 7 years as a Vice President in client relations.  Prior to starting her Assisted Living Locators business, she served as the Business Director for a retirement community with independent living, assisted living, and memory care accommodations.\nThis last role was the catalyst for her desire to work with seniors and their families to assist them in finding the right fit in retirement living.  She is adept at gathering all the necessary information, focusing carefully on her clients’ needs and lifestyle, and following up to ensure that every detail is resolved to their satisfaction.\nShe and her husband, Kenny, live in Fort Worth, Texas and enjoy the company of their twin grandsons and serving their community.  Karen Mitchell partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/dfb2c066caf61abae5b97fdd030e8787/K%2520Mitchell%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"ca73a8c629896541e69bfd21248d933e",
    "city":"Fort Worth",
    "state":"TX"},
  "user":{
  "id":"b10bf70ae8ad60e8e7512c8961085394",
    "name":"Karen Mitchell"
}},
{
  "id":"assisted-living-locators-indianapolis-in-dave-holder",
  "name":"Assisted Living Locators Indianapolis, IN (Dave Holder)",
  "agentBio":"Dave Holder's background is horticulture and snow removal.  He spent eleven years in the Branch Manager role for both Brightview and Tovar Snow Professionals.  However, the thought of being a business owner hadn’t entered his mind until he was introduced to Assisted Living Locators.\n\nIn the late summer early fall of 2017, Dave’s Father in Law’s health was declining.  The symptoms of Lewy Body Dementia worsened and the family had to make the painful decision that he could no longer be cared for in his home.  With no guidance or resource the family began the search for a memory care facility.  The first facility that was visited became my Father in Law’s new home.  But it was not for long.  It was not a good fit and three months later the process started again.  We were naïve that the resource and guidance Assisted Living Locators provides.  Dave is excited to be this resource for central Indiana and is eager to begin helping families in Indianapolis and the surrounding counties.  Dave Holder partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/9f4fa0b80d0a41d3d80a29c02c060326/D%2520Holder%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"dde43dd01bfab39aa4d13e5f3cded438",
    "city":"Indianapolis",
    "state":"IN"},
  "user":{
  "id":"81b83e6ddd5e73897aed0e6ea1f7efec",
    "name":"Dave Holder"
}},
{
  "id":"assisted-living-locators-southeast-dallas-tx-bj-bounds",
  "name":"Assisted Living Locators, Southeast Dallas TX (BJ Bounds)",
  "agentBio":"BJ Bounds is the Assisted Living Locators franchise owner in Southeast Dallas. BJ began a career in marketing almost 15 years ago and has extensive experience in visualizing, strategizing, and executing creative digital and traditional marketing/communications campaigns for products and entire companies. \n\nGifted with a servant’s heart, BJ has been volunteering since she was 15 years old, beginning first as a candy striper, then moving on to the Texas State Guard before co-founding at 501C3 organization in 2004.  She is excited to bring her business experience and volunteer spirit to help families achieve the best placement possible for their loved ones.  Her degree in psychology and her supportive, yet persistent, nature are ideal complements to the Assisted Living Locators mission.   \n\nMarried to her husband for over 25 years, BJ is blessed to have wholehearted support from him. \nThey have 3 dogs and a great love for road trips throughout the Lone Star State. No matter what they’re doing, they just love when they’re doing it together. BJ Bounds partnered with Seniorly in 2018.\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/8b34438d411939ada26742125370dae9/BJ_Bounds%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"86869ba07faed173b562eb478ebfba08",
    "city":"Red Oak",
    "state":"TX"},
  "user":{
  "id":"42c206d364412a1aa36847e44fb5774b",
    "name":"Bj Bounds"
}},
{
  "id":"oasis-daytona-beach-tom-mondloch",
  "name":"Oasis Daytona Beach, FL (Tom Mondloch)",
  "agentBio":"Tom Mondloch grew up in the Midwest with a large extended family that included many elders. Some of his best childhood memories are of Sunday afternoons spent listening to stories of his grandparents, great-aunts and -uncles, and older family friends. In them Tom found wisdom, courage and caring. As he pursued college and a career, he followed my passion for elders by obtaining a master’s degree in aging and then, in serving the residents of retirement communities, assisted living and long-term care centers in three different states over the past 35 years. He was currently licensed as an Assisted Living Administrator and Nursing Home Administrator in the State of Florida.\n\nTom has come to believe that his purpose in life is simple – to love and serve others. In his work with Oasis Senior Advisors, he fulfills his purpose by being of service to you and your family during this time of transition. He learned about Oasis Senior Advisors while working as the executive director of a large assisted living center in Jacksonville, Florida. Through the eyes of the elders and their families who came to visit our community, he experienced the highest level of customer service provided by our local Oasis Senior Advisors. Time after time, our assisted living center was identified by Oasis as a perfect fit for both the elders’ healthcare needs and their lifestyle preferences. We were able to partner with Oasis and the elders/families to achieve a successful transition. He now looks forward to partnering with you and your family as an Oasis Senior Advisor. Tom Mondloch partnered with Seniorly in 2018.\n\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/8e45fd4dff5ae8599540331c543d0521/Screen%2520Shot%25202018-07-18%2520at%252010.03.55%2520AM_sd.png",
  "status":1,
  "address":{
  "id":"7a581348e71b2d38d2282a8ba64aeaf7",
    "city":"Jacksonville",
    "state":"FL"},
  "user":{
  "id":"0a6e3e61992d1726f25de2ceed823b52",
    "name":"Tom Mondloch"
}},
{
  "id":"claudia-johnson",
  "name":"Senior Care Authority, San Antonio TX (Bill and Claudia Johnson)",
  "agentBio":"Bill and Claudia Johnson began their endeavor into Senior Care Authority after living through the stressful search for how to best accommodate the placement of Claudia’s mom into a Memory Care Facility. Bill also had walked the path with a mom who suffered from dementia. Learning about Senior Care Authority, after all of the hard work, locating the “right” place gave us the burning desire to aid families who find themselves in this predicament and who are looking for answers.\n\nBill and Claudia have very diverse backgrounds, with Bill’s focus having been in construction and sales in many venues and Claudia’s on the medical field, bookkeeping with attention to organization and details. Both have a great handle on the needs of families facing this stage of life. They have both owned and operated their own businesses and strive to meet the needs of those who seek to do business with them.\n\nThe primary goal here is doing what is right for each family. All families have specific needs and desires when faced with such devastating circumstances and want SOMEONE out there to hold their hand and walk them through this season of life. The thought of being the conduit between the crisis and the final outcome brings satisfaction to both of them.\n\nClaudia Johnson can rest assured that every rock will be overturned and they will strive to find all the answers needed to connect the dots and find an amenable direction for your family to rest at night knowing the best possible decision has been made. Bill and Claudia Johnson partnered with Seniorly in 2017.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/a9ec7ec7e4a59db77476ff12f01a3a9a/bill_and_claudia_johnson_sseniorly_sd.jpg",
  "status":1,
  "address":{
  "id":"2c4ab023c1d2b9d2c3dbb449566b7d89",
    "city":"San Antonio",
    "state":"TX"},
  "user":{
  "id":"d1ddac4700b979e3b90dccdec6763f69",
    "name":"Bill And Claudia Johnson"
}},
{
  "id":"jeralyn-bieniek",
  "name":"Senior Care Authority, Chicago IL (Jeralyn Bieniek)",
  "agentBio":"Jeralyn Bieniek has spent most of her career in sales and contract management. Working with long-term care communities, she quickly recognized the different quality of services that each community provided. Looking to enter into a service related business, Jeralyn and her sister Joellyn wanted to make a difference in their community by helping other families navigate the challenges in finding exceptional senior care. They both recognized the need for assistance with the decision making process when their Grandmother was no longer capable of living on her own. As her care needs evolved they had to determine the best course of action. When they noticed that Chicago didn't have a resource for personalized guidance with placing a loved one, they decided to join the Senior Care Authority team to make a difference in their community. \n\n\"Helping others find the right resources for their loved ones is a rewarding career\". \n\nThey now use their passion and skills to assist seniors and their families in finding the right senior living and memory care communities in the Chicagoland area.  Jeralyn Bieniek partnered with Seniorly in 2017.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/d8378c15c29bd8da92a0e9ee3beb64e3/jeralyn_bieniek_sd.jpg",
  "status":1,
  "address":{
  "id":"d15a4d9729e6bdaaaf6ac019a9d86c20",
    "city":"Palos Park",
    "state":"IL"},
  "user":{
  "id":"febd36212e549b760424c96eafd6dc2d",
    "name":"Jeralyn Bieniek"
}},
{
  "id":"assisted-living-locators-of-massachusetts-jon",
  "name":"Assisted Living Locators of Massachusetts (Jon Younger)",
  "agentBio":"Jon Younger is known locally for his ability to match seniors with caring providers. Much like a close family friend, Jon shows up with a caring attitude and warm smile to assist your family for FREE throughout the process of locating the safest, healthiest and most comfortable living environment for your loved one. He offers clear insight in to the Communities (facilities) and is experienced in knowing what questions to ask as well as what things you need to know about staffing and other fee structures. Jon is that friendly face you look forward to seeing during an emotional, transitional time. His involvement continues, if you wish, long after your loved one has moved in to their new home.\nJon is a lifelong Massachusetts resident having grown up on the coast north of Boston. He attended Springfield College majoring in Psychology with a minor in Sociology. His work experience has included working as a counselor with troubled youth, owning his own technology manufacturing business and managing sales of electronic components throughout the United States and Canada.\nWhile examining his core competencies, Jon found the theme in everything he has accomplished had to do with problem solving and presenting positive solutions to challenges. Jon has the ability to discover and present the most positive and appropriate solution, whether that be what product to purchase or program in which to participate.\nJon is an active volunteer with his local Special Olympics Program. He is very excited to be the first Assisted Living Locators business in Massachusetts and looks forward to serving you and your family's changing needs. Jon Younger partnered with Seniorly in 2018.\n\n\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/17bc148af43659c42c0ef7b2cd353855/Glasses-fix%2520-%2520JonYounger_9205-500px%2520LI%2520%26%2520Bus%2520card_sd.jpg",
  "status":1,
  "address":{
  "id":"d19b0a09adf2a98d65bc9c127d3d4dd6",
    "city":"Amesbury",
    "state":"MA"},
  "user":{
  "id":"8041838815ddaa0557a1a4ecfde35b47",
    "name":"Jon Younger"
}},
{
  "id":"assisted-living-locators-ann-arbor-mi-arlene-cadell",
  "name":"Assisted Living Locators Southeast, MI (Arlene Caddell)",
  "agentBio":"Arlene Caddell is the  Eldercare Advisor and franchise owner with Assisted Living Locators. Her passion is to help you navigate through the process of finding the right fit so you can make the best choice for you or your loved one. With so many senior living options, the process is overwhelming and confusing. \nArlene was very close to her mother in law who was diagnosed with dementia then progressed to Alzheimer's Disease. Looking back, her life would have been much easier if she had an Eldercare Advisor to help walk through the senior living options and resources to help prepare her home for sale. \nToday, as an Eldercare Advisor, Arlene has selected partnerships with Senior Living Communities and Adult Foster Care Homes as well as resources to help you transition. Together, you both will visit and tour the selected options available.  She will also help facilitate your move during the process.\nShe looks forward to meeting you and journey together to find the perfect place for you or your loved one to call “home”.   Arlene Cadell partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/89b9fe6b7514a3b7b2376d105864f12e/Arlene_Caddell_Seniorly_01_sd.jpeg",
  "status":1,
  "address":{
  "id":"18f88a1be82110a07347031e4b35dfc7",
    "city":"Ann Arbor",
    "state":"MI"},
  "user":{
  "id":"66adfd6332fc068350e261520fb15829",
    "name":"Arlene Caddell"
}},
{
  "id":"assisted-living-locators-washington-dc-patricia-russell",
  "name":"Assisted Living Locators Washington,DC (Patricia Russell)",
  "agentBio":"Patricia Russell shares her passion to serve the elderly community. She earned her B.S.N. Degree in Nursing and Masters of Jurisprudence in Health Law with an assorted background knowledge in State, and Federal Regulations. Her dedication to a career in healthcare originates in a profound desire to effect positive change through service. Her 25 year professional progression—from Director of Nursing to Senior Nurse Executive in nursing homes and patient rehabilitation centers for preventative and interventional care—illustrates not only Patricia’s deep connection to patient welfare but also her developed sensitivity to the discrete needs of individuals living with cognitive and physical challenges.\nPatricia is excited to continued service with Assisted Living Locator: Washington, DC and Northern & Southern Maryland areas. Patricia Russell partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/6e89bbea270341f2cb3a540bbcf5dad9/Patricia%2520Russell%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"61f3a2e65499b232c32b2ad5885cb724",
    "city":"Lanham",
    "state":"MD"},
  "user":{
  "id":"25df1b3142b21ddfa1cff43660f57697",
    "name":"Patricia Russell"
}},
{
  "id":"assisted-living-locators-west-dallas-tx-mitzie-jerry-watson",
  "name":"Assisted Living Locators West Dallas, TX (Mitzie & Jerry Watson)",
  "agentBio":"Jerry and Mitzie Watson represent Assisted Living Locators in the West Dallas and Mid-Cities area between Dallas and Fort Worth. They believe in the importance of family, and in being advocates for seniors in their community. They provide expert advice to help seniors and their families make educated choices from the various senior living options of independent living, assisted living, and memory care.\n\nJerry and his wife Mitzie are very active in the lives of their three children and eight grandchildren. Church ministry also has been an important area of service. Jerry and Mitzie are well known among friends and family for helping others, and for providing for those in need.\n\nJerry has more than 25 years of experience in information technology. Mitzie has more than 20 years of experience as a Registered Nurse. Seven years ago, she redirected her career when her mother developed several health issues, and she has been her mother’s caregiver since that time. Jerry and Mitzie Watson partnered with Seniorly in 2018. ",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/e739e847833f425d87a7f1d2bd3dbae2/Mitzie%2520and%2520Jerry%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"2d766b8b5e7b96fa5f65dcae90d49588",
    "city":"Colleyville",
    "state":"TX"},
  "user":{
  "id":"f5f62050e3b347702c4dfee66250686e",
    "name":"Mitzie Watson"
}},
{
  "id":"assisted-living-locators-seattle-wa-mary-bea-gallagher",
  "name":"Assisted Living Locators Seattle, WA (MaryBea Gallagher)",
  "agentBio":"Mary Bea Gallagher joined Assisted Living Locators in 2015 after many years of national consulting in healthcare business. She thinks of herself as the “assist” in Assisted Living Locators, and views the process of assistance as matchmaking.  Whether you are looking for ways to stay in your home for as long as possible, or for the benefits of community living, the matchmaking process incorporates goals, needs, finances, and personality components that start with listening to the families Mary works with.  Options in senior living, and support for our elders has changed much in the past twenty years, and understanding the options available to you will help you to make an informed decision; there is a best solution for you, and Mary Bea can help you to find it with confidence.  She knows that life-changing decisions are difficult, and that the potential of moving is overwhelming for many people; Mary Bea will stand by and provide recommendations to services and people that she trusts to join a team of support for you and your loved ones. Mary Bea Gallagher partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/1ac63024c181b452349ddd9b47137848/Mary%2520Bea%2520Gallagher%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"7e245714649564fe6d985957474d6b8a",
    "city":"Seattle",
    "state":"WA"},
  "user":{
  "id":"8738131a719f361795d86fca131880ee",
    "name":"Mary Bea Gallagher"
}},
{
  "id":"oasis-senior-advisors-of-maine-and-the-seacoast-nh-kelly-wilsey",
  "name":"Oasis Maine and the Seacoast, NH (Kelly Wilsey)",
  "agentBio":"Kelly Wilsey  began her career in non-profit management, product management, and operational management. What she loved most was working with people and helping them in any way that she can. Her philosophy revolves around listening, connecting, informing, educating, supporting and serving to help families find the best senior care. She looks at all aspects of the aging process to make sure families are connected to the best resources including financial, medical and professional assistance and hand hold them through the process.\nKelly graduated from the University of San Francisco with a degree in communication and received her MBA from Northeastern University in 2015. After losing her mom in 2003, she trained for and completed an IRONMAN to honor her life. Kelly believes in helping people love all aspects of their life at any age. She is currently writing a book, and am actively involved with her son’s school. She enjoys skiing, yoga, gardening, and independent reading on the Whole Brain and early child development. Kelly currently resides in York, Maine, with her four-year-old son, Benjamin. Kelly Wilsey partnered with Seniorly in 2018.\n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/e49a2a5da7d0b46cf37c229d436f2dce/unnamed_sd.jpg",
  "status":1,
  "address":{
  "id":"c9ebaa9ac9527bd3c67996fa2c861114",
    "city":"York",
    "state":"ME"},
  "user":{
  "id":"fd9029f52e197d8dcb5fea9136345839",
    "name":"Kelly Wilsey"
}},
{
  "id":"oasis-mainline-pa-john-benbrook",
  "name":"Oasis Mainline, PA (John Benbrook)",
  "agentBio":"John Benbrook grew up in Monmouth County, NJ, moved to this area for work in 1992 and have never left. He loved the area for the people, the opportunities, the seasons, and having access to all it offers.\n\nJohn spent his entire career in the tech and life sciences industry helping each organization achieve its goals. Now his goal is to help families and seniors during difficult and stressful times. He's learned first-hand the challenges families face when considering their options. He is committed to honoring and supporting seniors and their families during this time of transition by providing them with a trusted resource that is committed to their best interest.\n\nJoining the Oasis team was the right move for John and he can now provide a much-needed service that is lacking in our communities. John Benbrook partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/81b3f29280dc352affce7733ff7ffcfc/Screen%2520Shot%25202018-07-18%2520at%252010.16.11%2520AM_sd.png",
  "status":1,
  "address":{
  "id":"cfba491135285184e229264cf04fe052",
    "city":"West Chester",
    "state":"PA"},
  "user":{
  "id":"b934d6bea7741d0b6ea371722cefbaab",
    "name":"John Benbrook"
}},
{
  "id":"next-steps-senior-solutions-fl-jeffrey-linville",
  "name":"Next Steps Senior Solutions FL (Jeffrey Linville)",
  "agentBio":"Jeff Linville was ready for a change after 14 years in the telecommunications industry in a variety of management roles.. The opportunity to serve the senior population was too good to pass up and the adventure began. Jeff found that he was easily able to adapt his sales approach and style that had been so very successful for him at AT&T into serving those seeking senior living solutions while also creating greater job satisfaction for himself. First working with family's that were seeking Independent Living followed with several years of working with families seeking both Assisted Living and Memory Care. Helping families to find the right solution and navigate the complex senior care market is the ultimate motivation for him. Jeff Linville partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/d9e504ec86683ec6640b8b5d972fc9db/15171264_10154796569448593_7740459197586188234_n_sd.jpg",
  "status":1,
  "address":{
  "id":"a2903285451cde3450cc8ba2a21a6ba5",
    "city":"High Springs",
    "state":"FL"},
  "user":{
  "id":"4eb58e738af52774d19945f26b3b7030",
    "name":"Jeffrey Linville"
}},
{
  "id":"assisted-living-locator-mesa-az-angela-olea",
  "name":"Assisted Living Locators Mesa, AZ (Angela Olea)",
  "agentBio":"Angela Olea is a Registered Nurse and respected authority on elder care and senior placement. Angela founded Assisted Living Locators in 2003 and has been matchmaking seniors with caring providers for well over a decade. Angela seeks to provide a positive change and ease of care transition for families she serves. Angela Olea partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/95f6165b6bc0fededcd5627f5b754584/1%2520Angela%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"dd8d34eb049323c462d38c8079b62750",
    "city":"Scottsdale",
    "state":"AZ"},
  "user":{
  "id":"30f1e1697cff09d881cb8f676db061b2",
    "name":"Angela Olea"
}},
{
  "id":"assisted-living-locators-pensacola-fl-john-horton",
  "name":"Assisted Living Locators Pensacola, Fl (John Horton)",
  "agentBio":"John T. Horton was born in Indiana and raised in the south east. He is married and has four daughters, six grandsons, and one granddaughter.\nJohn desired a career and life change with the ability to give back to his community. John developed a desire to help Seniors through personal experience. He realized the need for guidance in the search of assisted living while searching for somewhere to place his own parents. John is looking forward to transitioning his management experience and his strong relationship skills to build his Assisted Living Locators Franchise in the Panhandle of Florida. John T. Horton partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/21c4441a45cebd5f2e02b01bf88522fb/John%2520H%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"e09a1de5f302ba1f725330c251408068",
    "city":"Pensacola",
    "state":"FL"},
  "user":{
  "id":"fdd41b14f20fa222361bc90afcb955cf",
    "name":"John Horton"
}},
{
  "id":"oasis-fort-worth-tx-karen-deshotels",
  "name":"Oasis Senior Advisors (Karen DesHotels)",
  "agentBio":"Karen DesHotels was born and raised in Fort Worth, where she resides with her husband and three children. They enjoy spending time with their horses and watching their son play baseball. Prior to joining Oasis Senior Advisors, she spent over 20 years in education, and for 12 of those years she worked as a school counselor. Today, she continues to assist people by working with seniors and families to identify their needs and match them with their ideal Independent, Assisted Living or Memory Care community. Karen has experienced firsthand the stress and heartache that declining health and memory issues can place on a family. She is committed to easing this emotional struggle. Empowering clients to maintain their dignity and quality of life is a privilege, an honor, and a responsibility that she takes very seriously.\n\nIf you or a loved one are in need of guidance or insight on how to navigate the best quality of life options, her mission is to be there by your side, acting as guide and resource during your transition. Karen DesHotels partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/35fa8de6fe95fd9a3647d81bb057b2f7/Screen%2520Shot%25202018-08-21%2520at%25208.58.53%2520AM_sd.png",
  "status":1,
  "address":{
  "id":"bc81a77da43e734341086538dfb9f741",
    "city":"Fort Worth",
    "state":"TX"},
  "user":{
  "id":"a5859afa2985b7642522e332aca9b29f",
    "name":"Karen Des Hotels"
}},
{
  "id":"assisted-living-locators-pikesville-md-richard-boisvert",
  "name":"Assisted Living Locators Pikesville, MD (Richard Boisvert)",
  "agentBio":"Rick and Debi Boisvert are the new owners of Assisted Living Locators Pikesville, MD. Seeking an opportunity to positively contribute to the local community; they opened Assisted Living\nLocators franchise to provide care and guidance to families when they need it the most.\n\nRick Boisvert has 28 years of experience fostering customer service in a successful corporate retail career. His goal is to positively contribute to his community and provide outstanding\ncustomer service to Pikesville’s seniors and their families to help them manage key life transitions.\n\nDebi has a long history supporting her community as well. With expertise as a property consultant, elder caregiver and healthcare intake coordinator, Debi thrives on finding the best care environment for seniors.\n\nAs an Assisted Living Locators Eldercare Advisors, Rick and Debi are looking forward to helping families navigate the system and identify the best senior care options for their loved ones. Richard Boisvert partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/f1b990f1f4355ce7807237330003e432/Richard%2520Boisvert%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"a2e5dec00bc4ad82393d3b6ff6210fce",
    "city":"Westminister",
    "state":"MD"},
  "user":{
  "id":"c447407613a0f65fe7bbdeaa7a785d17",
    "name":"Richard Boisvert"
}},
{
  "id":"assisted-living-locators-scottsdale-az-rachel-wasserstrom",
  "name":"Assisted Living Locators Scottsdale, AZ (Rachel Wasserstrom)",
  "agentBio":"Rachel Wasserstrom has lived in Arizona for the past twelve years. Rachel attended Arizona State University graduating with a BS in dietetics. Rachel is originally from Buffalo, NY and enjoys the Arizona sunshine! She has been working in healthcare for the past nine years and understands the importance of the service that Assisted Living Locators provides. She has the knowledge and passion it takes to provide every family with the assistance, resources and support they need during the transition period. Rachel Wasserstrom partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/e2a8d8539c4d0c2748058deca788608c/Rachel%2520Wasserstrom%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"880bb3ddc17f553834d1d913b7c2ddb1",
    "city":"Scottsdale",
    "state":"AZ"},
  "user":{
  "id":"6a872730670448071b9b3726bdd0994d",
    "name":"Rachel Wasserstrom"
}},
{
  "id":"the-right-move-senior-resource-kristen-thaxton",
  "name":"The Right Move Senior Resource (Kristen Thaxton)",
  "agentBio":"Kristen Thaxton grew up with very special relationship among her grandparents and many of their friends.  From golf outings, to dinner shows and endless card games she believe these relationships helped her to become the person she is today.  Kristen realized just how special seniors are and it led her on a journey to working in healthcare helping seniors.\n\nDuring the past 4 years working in hospice she began to see the overwhelming struggle families faced when deciding on appropriate assisted living and care solutions for their loved ones.  She found her true passion for serving others and making a difference in their life.  Kristen wanted to help navigate families through this sometimes stressful process, give them resources and assist with a smooth transition not only for their loved one but the entire family.\n\nShe is committed to walking alongside a family on this journey and it is ingrained in everything we do.   Kristen's grandparents lived a full, happy life and her hope is to help the senior community live their Best day. Every day.   Kristen Thaxton partnered with Seniorly in 2018. ",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/ae934c3e1e5688bba8678162833f74c9/Kristen_Thaxton_Seniorly_sd.png",
  "status":1,
  "address":{
  "id":"b56518a9b8c728f4121e4b636bf36445",
    "city":"Cumming",
    "state":"GA"},
  "user":{
  "id":"0a7235bb9eb970c8e20836e060aff87d",
    "name":"Kristen Thaxton"
}},
{
  "id":"assisted-living-locators-wichita-ks-john-weber",
  "name":"Assisted Living Locators Wichita, KS (John Weber)",
  "agentBio":"John has spent his entire career providing exceptional service to his clients.  He worked for over 25 years in all facets of the Human Resource’s field, including talent management and talent development.  He is very community minded and has served on several Boards.  John is highly trained in the ability to find the needs of the client and providing the best solution.\n\nJohn is a very devoted to his family.    Over the last two years, John has become very educated with the difficult transitional phase of finding assisted living for his father and uncle & aunt.  This is what led to John’s decision to start this Franchise and help families find solutions.\n\nHe has lived in Kansas all his life and is very familiar with the Kansas area.  He loves to spend time with his family and plays several sports including golf, tennis and handball.  \nJohn is elated to be the first Assisted Living Locators franchise in Kansas and looks forward to servicing the needs of the families and seniors in the area. John Weber partnered with Seniorly in 2018. ",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/c629df5ffe0a2e342358651873b943a6/John%2520Weber%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"0b738ab602d3eecba8e57556af0e56db",
    "city":"Wichita",
    "state":"KS"},
  "user":{
  "id":"8e83b3b3db15a6f0abc74e1b2d561202",
    "name":"John Weber"
}},
{
  "id":"senior-care-referral-services-of-oklahoma",
  "name":"Senior Care Referral Services of Oklahoma (Rick & Denise Guttenberger)",
  "agentBio":"Rick & Denise Guttenberger started their business in 2014 after a 30+ year career in the hotel & hospitality industry for Rick.  Faced with the daunting task of trying to determine care options for loved ones, the Guttenbergers realized that a trusted, local company was needed to help families understand all of the various communities, their pricing, and their care level differences.  Rick & Denise spent months touring every licensed residential care community and can speak to families about each place with personal, first hand knowledge.  \n\nSenior Care Referral Services of Oklahoma is now the leading LOCAL senior care referral company in the state of Oklahoma.  Serving the greater Oklahoma City and Tulsa metro areas, the company was established to help families who are faced with making care choices for loved ones navigate the many options of senior care and help them understand the costs and benefits of each choice.  Our service is free to our clients as we are paid by the senior care providers we recommend......independent living, assisted living, memory care, residential care homes, and respite care communities. Rick & Denise Guttenberger partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/16631bbcf4e6b52aa0235d28b2faf16d/Rick%2520and%2520Denise%2520Guttenberger%2520Square%2520Profile%2520Pic%2520July%25202018_sd.jpg",
  "status":1,
  "address":{
  "id":"a66a1b4fa20bd85c13e3763689a2d996",
    "city":"Oklahoma City",
    "state":"OK"},
  "user":{
  "id":"665cfb1c853aedb698beb9cce8b37603",
    "name":"Rick & Denise Guttenberger"
}},
{
  "id":"assisted-living-locators-southeast-tn-john-rouser",
  "name":"Assisted Living Locators Southeast , TN (John Rouser)",
  "agentBio":"John Rouser was born and raised in Greensboro NC.  After graduating from Lenoir-Rhyne University in Hickory, NC with degrees in Special Education and Physical Education, he decided that education was not the route his life was to follow. John spent most of his adult life in Information Technology sales. In 2004, he moved to Ooltewah, TN where he continued in IT. After being ordained in the Episcopal Church and dealing with parental health issues, he was looking for a change in his life. In 2015, he purchased the Chattanooga area Assisted Living Locators franchise.\nAssisted Living Locators is both John's ministry and his vocation. What he does is walk with families as they go through the process of dealing with their aged parents or loved ones. He helps them find the resources needed to live at home or if appropriate move into an Assisted Living community. His particular passion is walking with those who are dealing with dementia. John Rouser partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/ded32a14a1f77576762561664de9ee94/John%2520Rouser%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"09caef53bd833cada8517f246027d446",
    "city":"Ooltewah",
    "state":"TN"},
  "user":{
  "id":"b55bea1a2de10ebc9607b6a54fc9d59c",
    "name":"John Rouser"
}},
{
  "id":"ask-carol-kansas-city-mo-ralph-caro",
  "name":"Ask-Carol Kansas City, MO (Ralph Caro)",
  "agentBio":"Ralph Caro is the Carol’s Senior Living Advisor in the metropolitan Kansas City area. A native of Kansas City, Kansas, he earned his undergraduate degree from the University of Kansas and completed his MBA at the University of Missouri.\n\nFor more than 35 years, Ralph was involved in the Community Health Care Movement, promoting the provision of high quality, comprehensive and affordable health care for all. For fifteen of those years, he led the strategic direction and operations, of two Community Health Centers.\n\nThe common thread between both entities was family. Families come in all shapes and sizes, with varied resources; and every family deserved to be treated with dignity and respect, irrespective of their circumstances.\n\nHe chose to work with Carol because she understands the difficulties of finding care for a loved one and can help families based upon their experience. Ralph understands what you are going through because we have faced similar circumstances.\n\nHe knows what it’s like to struggle with deciding about care for your loved one because he faced a similar situation with his Mom. Ralph was unexpectedly put into a position of making quality of life decisions on Mom’s behalf without the benefit of outside help. He looks forward to helping you find the best care possible so that your loved one can have the fullest life possible. Ralph Caro partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/482c44a86885c9f180297dbc5897d9db/ralph-caro-photoshop_sd.jpg",
  "status":1,
  "address":{
  "id":"a1e343dafdf78c1e9e60fc150fcea7af",
    "city":"Kansas City",
    "state":"MO"},
  "user":{
  "id":"1a45849c9157e51083e017899b9407f4",
    "name":"Ralph Caro"
}},
{
  "id":"ask-carol-senior-guidance-carol-shockley",
  "name":"Ask-Carol Senior Guidance NJ PA (Carol Shockley)",
  "agentBio":"Carol Shockley founded Ask-Carol! in 2009. She can help you find assisted living or a nursing home anywhere in the country. She's been through it herself with her Mom, and looks forward to helping you. \n\nAssisted living facilities are very different from nursing homes. They offer a home-like lifestyle and are considerably less expensive. Unless your parent is bed-ridden, assisted living is usually the better option. As for Home Care, that’s for short term use – it gets very expensive and can be very unreliable.\n\nThere are many assisted living communities, each with its own personality, entrance requirements, costs, and level of services, so it is important to find the one that exactly meets your parent’s needs. Moving from home is never easy, and every situation is unique and personal. It’s critical to find the one that exactly meets your parent’s care and financial needs. Carol will help you work through these challenging decisions. Carol Shockley partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/a3694961397a8725d332f4fdfd0969d4/Carol%2520Shockley%2520Headshot%25202_sd.jpg",
  "status":1,
  "address":{
  "id":"51ed63c97b86eded08641bceb0f4e2eb",
    "city":"Tinton Falls",
    "state":"NJ"},
  "user":{
  "id":"63d29e4a82b15ffbf5dd65fc4ff395fa",
    "name":"Carol Shockley"
}},
{
  "id":"ask-carol-atlanta-ga-cornelia-crenshaw",
  "name":"Ask-Carol Atlanta, GA (Cornelia Crenshaw)",
  "agentBio":"Cornelia Crenshaw represents the Atlanta area, and is ready to help your family. She is a Senior Advisor in the area, and is also a Registered Nurse. She has personally witnessed the tremendous benefits families receive by reaching out to her team for help finding the right place for themselves or their loved ones.\n\nNot only does Cornelia have experience as a nurse for over thirty years, but caring for her own Mom during her health crises during recent years. Together, they've overcome many obstacles, and she'd like to help you knock down your obstacles to finding a better life for yourself and your parents. She knows the constant stress of caring for a loved one and can help you reduce your stress by finding the right care for your family member. Cornelia Crenshaw partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/40d92c98b80aa16d2b968a713ce832bc/Cornelia%2520Headshot_sd.jpg",
  "status":1,
  "address":{
  "id":"7dc14ed2c0150d6b72f448c7b2b84d7e",
    "city":"Atlanta",
    "state":"GA"},
  "user":{
  "id":"eb670a804d80fc86509ba68090b9ae24",
    "name":"Cornelia Crenshaw"
}},
{
  "id":"assisted-living-locators-tyrone-ga-ralph-booker",
  "name":"Assisted Living Locators, Tyrone GA (Ralph Booker)",
  "agentBio":"Ralph & Betty Booker are the owners of Assisted Living Locators of Peachtree City.  Ralph Booker is a results-oriented sales professional with extensive experience in territory management, forecasting and sales planning. Self-starter with proven success in identifying growth opportunities and maintaining strong business alliances. Visionary with the ability to project market needs, develop new product call points and extend market penetration. I have over thirty years of sales and sales management with; Eveready Battery Company, Pepsi Cola, Nabisco Biscuit Company, Miller Brewing Company, Novartis Healthcare, Nestle Health Science as well Executive Director of the Eastside Family YMCA, Oklahoma City.\n\nBetty has worked in the capacity of customer service for a number of large companies of over a decade to include Eveready Battery Company and the Overhead Corporation. In her role as the lead customer service associate, she provided first contact hands-on care for internal as well as external customers. Upon leaving Overhead Corporation she accepted her most important role to date as a Stay at Home mom to Tifani, Alexandria, and Zachary that has lasted the past two decades. Included in that two decades of service, she was one of the lead volunteers at each of the schools for our children and 2010 she was named the volunteer of the year at our church. She is uniquely qualified to understand and balance the needs of the family with those of the person needing care.  Ralph & Betty Booker partnered with Seniorly in 2018. \n",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/48a8a46c6ca15beed8db817213d52a6c/bookers%25204x4_sd.jpg",
  "status":1,
  "address":{
  "id":"788e1b477c45299394a312064b0a4b47",
    "city":"Tyrone",
    "state":"GA"},
  "user":{
  "id":"12c7a506154b36e7becd7a6c9bd16927",
    "name":"Ralph And Betty Booker"
}},
{
  "id":"ask-carol-baltimore-md-sheila-baldeo",
  "name":"Ask-Carol Baltimore, MD (Sheila Baldeo)",
  "agentBio":"Sheila Baldeo is Ask Carol’s Senior Living Advisor in Maryland. She received her Bachelors degree from the University of South Carolina-Columbia. For more than 16 years, Sheila worked in the Human Services field as an advocate for the disabled and elderly population. She takes pride in the personal interactions she share with her clients, and each encounter with them is a chance to write a new beginning or a perfect ending together. Placing a loved one in an assisted living home or community is never an easy decision, but she is here to provide support during the process of identifying resources that will help with guiding you through an often complex process.  Sheila is there to ask questions you might overlook, find financing options for your budget, suggest the communities best for your parent and offer personal support during a difficult time. Sheila Baldeo partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/ddd1a426c7a4c74233e19c23f8a6d9f4/Sheila_sd.jpg",
  "status":1,
  "address":{
  "id":"386675158b7f54ed1bb152235535e188",
    "city":"Baltimore",
    "state":"MD"},
  "user":{
  "id":"30eef4fa1cb1add3c629cb15d3dfd2d7",
    "name":"Sheila Baldeo"
}},
{
  "id":"ask-carol-palm-beach-fl-david-paltanavich",
  "name":"Ask-Carol Palm Beach, FL (David Paltanavich)",
  "agentBio":"David Paltanovich lives right here in South Florida, working with families in Palm Beach and Broward counties. He's been through it himself with his dad, and looks forward to helping many families just like yours.  He is ready to work with you, offer support, and help you to find the best community for your parent. David Paltanavich partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/48f57f6514f58b7814bec306b797caff/David%2520Headshot_sd.jpg",
  "status":1,
  "address":{
  "id":"48fcf61e8ab18ecefdeb068a4c70c706",
    "city":"Tinton Falls",
    "state":"NJ"},
  "user":{
  "id":"350df08cfce47f45fce886f439690ca5",
    "name":"David Paltanavich"
}},
{
  "id":"senior-housing-services",
  "name":"Senior Housing Services, MI (Sandy Spiro)",
  "agentBio":"Sandy Spiro is a Senior Healthcare Executive with years as an executive leader working within the healthcare market. Regardless of which segment of the healthcare industry he has served; skilled nursing home, home health care, independent living / assisted living, acute care, imaging, or telemedicine, he has consistently maintained a high standard of quality regarding patient/resident out-comes. Sandy's ability to focus and maintain strategic initiatives while paying attention to details of the operations has been a key to his managerial success. He has a deep appreciation for talented individuals of an organization and encourages growth from within as well seek to identify smart and motivated people to join the Company. Sandy is hugely passionate regarding senior services and fully commit to corporate mission, vision and values to the benefit of the highest Corporate and personal integrity. He enjoys working and interacting with all types of personalities, and highly value the team. Sandy's personality has been described as affable, engaging, and approachable. He is a veteran of the US Navy, a native of Detroit, Michigan, and is married to a wonderful woman and together they have three children. Sandy Spiro partnered with Seniorly in 2018.",
  "mainImage":"https://d1qiigpe5txw4q.cloudfront.net/uploads/58fd822564381a90c5b8a1ee20c5516d/Screenshot%25202018-07-12%2520at%25205.06.31%2520PM_sd.png",
  "status":1,
  "address":{
  "id":"2c98ff6d0d8a3e635820ba89a625e992",
    "city":"West Bloomfield",
    "state":"MI"},
  "user":{
  "id":"a21af48e0357bdc4ec8c4d478f650db5",
    "name":"Sandy Spiro"
}},
];

export const getSearchParamFromPlacesResponse = ({ address_components, geometry }) => {
  const cityFull = address_components.filter(e => e.types.indexOf('locality') > -1 || e.types.indexOf('administrative_area_level_3') > -1);
  const stateFull = address_components.filter(e => e.types.indexOf('administrative_area_level_1') > -1);
  if (cityFull.length > 0 && stateFull.length > 0) {
    const city = urlize(cityFull[0].long_name);
    const state = urlize(stateFull[0].long_name);
    const { lat, lng } = geometry.location;
    return {
      state,
      city,
      latitude: lat(),
      longitude: lng(),
    };
  } else if (stateFull.length > 0) {
    const state = urlize(stateFull[0].long_name);
    return {
      state
    };
  }
  return {};
};

const validNumber = x => typeof x === 'number' || x === undefined;
export const filterLinkPath = (currentFilters, nextFilters = {}) => {
  let pageFilters = {
    'page-number': currentFilters['page-number'] || null,
    'page-size': currentFilters['page-size'] || null,
  };
  if (validNumber(nextFilters['page-number']) || validNumber(nextFilters['page-size'])) {
    pageFilters = {
      'page-number': nextFilters['page-number'],
      'page-size': nextFilters['page-size'],
    };
  }

  const filters = {
    ...currentFilters,
    ...nextFilters,
    ...pageFilters,
  };

  const {
    state, city, ...qs
  } = filters;
  const region = stateRegionMap[getStateAbbr(state)];

  const selected = !Object.keys(nextFilters)
    .some(key => currentFilters[key] !== nextFilters[key]);

  if (selected) {
    Object.keys(nextFilters)
      .forEach(filter => delete qs[filter]);
  }

  let path = `/agents`;
  if (region && city) {
    const qsString = objectToURLQueryParams(qs);
    const qsPart = qsString ? `?${qsString}` : '';
    path = `${path}/${urlize(region)}/${city}${qsPart}`;
  } else if (region) {
    const qsString = objectToURLQueryParams(qs);
    const qsPart = qsString ? `?${qsString}` : '';
    path = `${path}/${urlize(region)}${qsPart}`;
  }

  return {
    path,
    selected,
  };
};
