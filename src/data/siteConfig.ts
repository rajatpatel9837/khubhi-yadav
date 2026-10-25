import { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  siteTitle: "MILES APART, HEART TO HEART",
  dedication: "For Khubi Yadav, with sincerity — from Rajat Patel.",
  mainTagline: "Two cities. Two little worlds. One feeling I wanted to share.",
  supportingTagline: "Bhagalpur to Gurgaon. A little distance, a lot of things left unsaid.",
  emotionalTheme: "Distance does not decide what two people can mean to each other. Honest choices, mutual feelings, and the way we treat one another matter more.",
  
  names: {
    him: "Rajat",
    her: "Khubi",
    himFull: "Rajat Patel",
    herFull: "Khubi Yadav",
  },

  locations: {
    him: {
      city: "Bhagalpur",
      state: "Bihar",
      label: "Where Rajat is studying at IIIT Bhagalpur.",
      coords: { lat: 25.2425, lng: 86.9842 },
      description: "Quiet riverside evenings, lines of code, late study sessions, and thoughts that quietly drift west towards Haryana."
    },
    her: {
      city: "Gurgaon",
      state: "Haryana",
      label: "Where Khubi calls home.",
      coords: { lat: 28.4595, lng: 77.0266 },
      description: "Bustling city lights, familiar roads, your world, your dreams, and the calm you carry amidst the rush."
    },
    approxDistanceKm: 1240,
    distanceNote: "Approx. 1,240 km by road (verified mapping estimate)"
  },

  opening: {
    label: "A PRIVATE LITTLE STORY",
    quote1: "Some things are easier to feel than to say.",
    quote2: "So I made you a little world of words, memories, and things I wanted to tell you.",
    primaryCta: "Open My Letter",
    secondaryCta: "Skip Intro"
  },

  twoCities: {
    title: "Two Cities. One Story to Discover.",
    quote1: "Different cities. Different routines. Different skies.",
    quote2: "But being in different places doesn’t stop me from wanting to know you better.",
    quote3: "Distance is a circumstance. Understanding, honesty, and effort are choices."
  },

  letter: {
    title: "Khubi, Ek Baat Kehni Thi…",
    paragraphs: [
      "Hey Khubi,",
      "Main Rajat, IIIT Bhagalpur mein apni padhai aur apne sapnon ke beech busy rehta hoon. Tum Gurgaon mein apni duniya jee rahi ho.",
      "Hum alag shehron mein hain, aur shayad hamari roz ki duniya bhi alag hai. Lekin aaj main tumse ek baat seedhe aur honestly kehna chahta hoon.",
      "Mujhe tum achhi lagti ho.",
      "Main nahi chahta ki tum is website ko kisi pressure ki tarah dekho. Maine ise bas isliye banaya hai kyunki kabhi-kabhi apni feelings ko ek simple message se thoda zyada thoughtfully express karne ka mann karta hai.",
      "Main tumhe aur achhe se jaana chahta hoon, tumhari baatein sunna chahta hoon, tumhare thoughts samajhna chahta hoon, aur dekhna chahta hoon ki hum dono ke beech kuch khoobsurat shuru ho sakta hai ya nahi.",
      "Main future ke bade-bade vaade karne se pehle ek honest beginning mein believe karta hoon.",
      "Agar tum bhi chaho, toh hum ek doosre ko waqt de sakte hain, baat kar sakte hain, aur dheere-dheere samajh sakte hain.",
      "Aur agar tumhari feelings alag hain, toh bhi main tumhari choice ki respect karunga.",
      "Bas itna tha jo main tumse kehna chahta tha."
    ],
    signature: "— Rajat",
    buttonText: "There’s Something Else"
  },

  proposal: {
    introPrompt: "Khubi, Can I Ask You Something?",
    confession: "Main tumhe pasand karta hoon.",
    leadMessage: "Main tumhe aur achhe se jaana chahta hoon. Tumhare saath baat karna, ek doosre ko samajhna aur dekhna chahta hoon ki kya hum ek khoobsurat relationship ki shuruaat kar sakte hain.",
    question: "Khubi, will you be my girlfriend?",
    yesButtonText: "Yes, I’d Like That",
    noButtonText: "I’m Not Ready / I Don’t Feel the Same",
    yesResponse: {
      title: "Khubi, Thank You for Giving This a Chance.",
      message: "Main khush hoon ki hum ek doosre ko samajhne ki shuruaat kar sakte hain. Main chahta hoon ki hum apne pace par, honestly aur respect ke saath aage badhein.",
      ctaText: "Explore Our Next Chapter"
    },
    noResponse: {
      title: "Thank you for being honest, Khubi.",
      message: "Tumhari feelings aur tumhari choice important hain. Main tumhare decision ki respect karta hoon. Is website ko dekhne aur meri baat sunne ke liye thank you.",
      ctaText: "Close This Letter"
    }
  },

  distanceChapter: {
    title: "Across Cities, One Conversation at a Time",
    quote1: "Har roz paas hona zaroori nahi, agar dono ek doosre ko samajhne ki koshish karein.",
    quote2: "Door rehna ek challenge ho sakta hai, lekin communication, trust, time aur mutual effort se do log apna raasta khud bana sakte hain.",
    cards: [
      {
        id: "conversations",
        tag: "A. Conversations",
        title: "Meaningful Dialogues",
        description: "Un baaton ke liye waqt nikalna jo humein ek doosre ko samajhne mein help karein."
      },
      {
        id: "moments",
        tag: "B. Small Moments",
        title: "Everyday Warmth",
        description: "Ek thoughtful message, ek shared playlist, ek achhi conversation, ya din ke end mein ek honest check-in."
      },
      {
        id: "effort",
        tag: "C. Mutual Effort",
        title: "Balanced Space",
        description: "Ek aisa connection jahan effort dono taraf se aaye, aur dono ko apni padhai, career, friends aur personal space ke liye jagah mile."
      }
    ],
    noteButtonText: "Read a Little Note",
    noteModal: {
      title: "A Gentle Perspective on Distance",
      paragraphs: [
        "Khubi, college ki life aur dooriyan aksar logon ko lagta hai mushkil hoti hain. Aur sach mein, bina effort ke koi bhi doori door hi rehti hai.",
        "Lekin mera maanna hai ki agar dil mein sachchai ho aur dono ek doosre ki privacy aur ambitions ki izzat karein, toh yeh shehron ka faasla sirf ek physical number ban ke reh jata hai.",
        "Jab bhi tum baat karna chaho, main sunne ke liye hamesha taiyaar milunga. No expectations, only genuine care."
      ],
      signature: "— With sincerity, Rajat"
    }
  },

  sharedSky: {
    title: "Different Cities, Different Skies",
    himSkyLabel: "Bhagalpur — Rajat",
    herSkyLabel: "Gurgaon — Khubi",
    quote: "Chahe shehr alag hon, har connection ki khoobsurati us waqt mein hoti hai jo do log ek doosre ko samajhne ke liye dete hain.",
    ctaText: "Continue the Story"
  },

  futureChapter: {
    title: "Someday, If We Both Choose It",
    quote1: "Har kahaani ko apni speed se aage badhne ka haq hai.",
    quote2: "Abhi sabse important ek honest beginning hai. Baaki future ki baatein tabhi khoobsurat hongi jab hum dono unhe apni marzi se choose karein.",
    pillars: [
      {
        title: "Growing as Individuals",
        subtitle: "Apne Sapne, Apni Pehchan",
        description: "Tum Gurgaon mein apne goals ko follow karo, main IIIT mein apni engineering aur career pe focus karun. Ek doosre ke sapnon ka sahara banein, rukaawat nahi."
      },
      {
        title: "Learning to Understand Each Other",
        subtitle: "Samajh aur Sabr",
        description: "Ek doosre ke quirks, achhi baatein, thode mood swings aur personal boundaries ko bina judgment ke samajhna aur accept karna."
      },
      {
        title: "Building a Future Freely",
        subtitle: "Hamesha Apni Marzi Se",
        description: "Future ki taraf har kadam dono ki marzi aur khushi se ho. Jab tak dono ready na hon, tab tak koi jaldbazi nahi."
      }
    ]
  },

  marriageProposal: {
    chapterTag: "AN OPTIONAL GLIMPSE INTO SOMEDAY",
    prelude: "If, Someday, We Reach That Chapter…",
    transitionText: "Main chahta hoon ki future ke bade decisions hum dono samajhkar, bina kisi pressure ke, apni marzi se lein. Agar kabhi hum dono apni zindagi saath bitane ka decision karein…",
    question: "Khubi, would you choose to build a future with me?",
    yesText: "Yes, Let’s Talk About Our Future",
    noText: "I’m Not Ready for That",
    yesResponse: "Then let’s take that future one honest conversation at a time.",
    noResponse: "That’s completely okay. A future should be something we both choose freely.",
    disclaimer: "Note: This chapter is an optional poetic thought for a distant future, never an immediate expectation or a legal commitment."
  },

  finalLetter: {
    title: "Until the Next Page",
    paragraphs: [
      "Khubi,",
      "Maine yeh website tumhe kisi answer ke liye majboor karne ke liye nahi banayi. Main bas apni feelings ko ek thoughtful aur personal tareeke se express karna chahta tha.",
      "Zindagi mein bahut si cheezein waqt ke saath samajh aati hain. Mere liye is waqt itna hi important hai ki main tumse honestly apni baat keh sakun aur tumhari feelings ko bhi utni hi importance doon.",
      "Thank you for taking a moment to read my little letter."
    ],
    signature: "— Rajat Patel",
    footerNote: "Made with care, from Bhagalpur to Gurgaon.",
    replayText: "Experience This Again"
  }
};
