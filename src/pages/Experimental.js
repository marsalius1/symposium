import React, { useState, useEffect, useRef } from 'react';

const EnhancedForYouPage = () => {
  // State management
  const [currentDepth, setCurrentDepth] = useState(0); // 0: Hook, 1: Main, 2: Full
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showResponses, setShowResponses] = useState(false);
  const [activeTab, setActiveTab] = useState('visual');
  const [revealedSections, setRevealedSections] = useState([]);
  const [highlightedText, setHighlightedText] = useState(null);
  const contentRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  
  // Sample content data
  const contentData = [
    {
      id: 'content1',
      creator: 'Dr. Emma Chen',
      creatorAvatar: '/api/placeholder/80/80',
      dateCreated: new Date('2025-03-10'),
      complexity: 7,
      discipline: 'Physics',
      topic: 'The Illusion of Time',
      contentType: 'mixed',
      hook: {
        text: "What if I told you that time as we experience it is just an illusion? That past, present, and future all exist simultaneously?",
        quote: "Einstein called this our 'stubborn illusion'—one of the most profound insights of modern physics.",
        visual: {
          type: 'animated',
          description: 'Clock hands moving in different directions with shadowy past and future events visible simultaneously'
        },
        duration: 60
      },
      main: {
        intro: "Einstein's theory of relativity revealed that time is not absolute but relative to the observer. Different observers can disagree about whether two events happen simultaneously.",
        keyPoints: [
          {
            title: "The Block Universe",
            text: "The 'block universe' model views all moments—past, present, and future—as equally real, existing together in a four-dimensional spacetime block.",
            visual: {
              type: 'diagram',
              description: 'A 3D block representing spacetime with slices showing different moments in time'
            }
          },
          {
            title: "Time is Relative",
            text: "Your birth, your death, and you reading this right now all exist permanently in this timeless structure.",
            visual: {
              type: 'animation',
              description: 'Visual showing how events appear simultaneous or sequential depending on motion'
            }
          },
          {
            title: "Philosophical Implications",
            text: "This challenges our intuitive experience of time and raises profound questions: If the future already 'exists,' do we have free will?",
            visual: {
              type: 'illustration',
              description: 'Branching pathways representing possible futures in a deterministic universe'
            }
          }
        ],
        conclusion: "How does consciousness create the illusion of flowing time? And why do we remember the past but not the future?",
        duration: 240
      },
      full: {
        sections: [
          { 
            id: 'history',
            title: "Historical Views of Time", 
            content: "The nature of time has puzzled philosophers and physicists throughout human history. While our subjective experience treats time as flowing from past to future, modern physics suggests a dramatically different picture.",
            visual: {
              type: 'timeline',
              description: 'Timeline showing evolution of time concepts from ancient to modern views'
            }
          },
          { 
            id: 'einstein',
            title: "Einstein and Relativity", 
            content: "In 1905, Einstein's Special Relativity demonstrated that two observers moving relative to each other will disagree about the timing of events. In 1908, mathematician Hermann Minkowski formalized this by showing that space and time form a unified four-dimensional 'spacetime.'",
            quote: "Since there exists in this four dimensional structure [space-time] no longer any sections which represent 'now' objectively, the concepts of happening and becoming are indeed not completely suspended, but yet complicated. It appears therefore more natural to think of physical reality as a four dimensional existence, instead of, as hitherto, the evolution of a three dimensional existence.",
            quoteAuthor: "Hermann Minkowski, 1908",
            visual: {
              type: 'interactive',
              description: 'Interactive diagram showing relative simultaneity based on reference frames'
            }
          },
          { 
            id: 'block',
            title: "The Block Universe", 
            content: "This led to what philosophers call the 'block universe' or 'eternalism'—the view that all moments of time exist together in a timeless structure. This model has profound implications. If the future already 'exists' in some sense, is it predetermined? Not necessarily. The block universe is compatible with determinism but doesn't require it—quantum mechanics introduces fundamental uncertainty into the fabric of reality.",
            visual: {
              type: 'model',
              description: '3D model of spacetime showing how past, present and future coexist'
            }
          },
          { 
            id: 'theories',
            title: "Modern Theories", 
            content: "The physicist Julian Barbour goes further, arguing that time doesn't flow at all—there is no motion, just different configurations of the universe that create the illusion of change. In his view, each moment is a 'Now' that exists independently, with no intrinsic connection to other 'Nows.' Recent theoretical work in quantum gravity has produced models like causal set theory, where spacetime emerges from more fundamental discrete elements.",
            visual: {
              type: 'illustration',
              description: 'Series of static configurations showing how the illusion of change might emerge'
            }
          },
          { 
            id: 'consciousness',
            title: "Consciousness and Time", 
            content: "The puzzle of time's apparent flow might be a problem of consciousness rather than physics. Our brains construct a sense of 'now' from sensory information that arrives slightly delayed. Neuroscience research shows that our experience of duration is malleable and can be distorted by attention, emotion, and other factors.",
            quote: "What, then, is time? If no one asks me, I know; if I want to explain it to someone who does ask me, I don't know.",
            quoteAuthor: "Augustine of Hippo, 4th century",
            visual: {
              type: 'brain',
              description: 'Brain activity visualization showing how we construct temporal awareness'
            }
          }
        ],
        references: [
          { text: "Einstein, A. 'On the Electrodynamics of Moving Bodies' (1905)", url: "https://example.com/einstein" },
          { text: "Barbour, J. 'The End of Time: The Next Revolution in Physics' (1999)", url: "https://example.com/barbour" },
          { text: "Rovelli, C. 'The Order of Time' (2018)", url: "https://example.com/rovelli" }
        ],
        duration: 600
      },
      responses: [
        {
          id: 'response1',
          text: "This is fascinating! I've always wondered about the relationship between consciousness and our perception of time flow. If all moments exist simultaneously in a block universe, why do we experience time's arrow in only one direction? Could it be related to entropy and the second law of thermodynamics?",
          citations: [{ text: "Carroll, S. 'From Eternity to Here' (2010)", url: "https://example.com/carroll" }],
          dateCreated: new Date('2025-03-15'),
          author: 'Michael K.',
          avatar: '/api/placeholder/40/40',
          votes: 12,
          views: 89
        },
        {
          id: 'response2',
          text: "I think we need to distinguish between physical time and phenomenological time. Even if physics tells us time doesn't 'flow,' our lived experience of duration can't be dismissed as mere illusion. Perhaps consciousness itself is the missing piece in our understanding of temporality.",
          citations: [],
          dateCreated: new Date('2025-03-16'),
          author: 'Sarah L.',
          avatar: '/api/placeholder/40/40',
          votes: 8,
          views: 52
        }
      ]
    },
    {
      id: 'content2',
      creator: 'Dr. Alex Wright',
      creatorAvatar: '/api/placeholder/80/80',
      dateCreated: new Date('2025-03-05'),
      complexity: 8,
      discipline: 'Political Science',
      topic: 'Complex Systems and Resistance to Change',
      contentType: 'mixed',
      hook: {
        text: "Our political divisions reflect thermodynamic reality of complex systems in competitive environments.",
        quote: "For complicated systems, change is dangerous and mostly counterproductive. But in a competitive world, unchanging systems are consumed by competition.",
        visual: {
          type: 'systems',
          description: 'Visual representation of competing complex systems and their evolution'
        },
        duration: 60
      },
      main: {
        intro: "Evolution mostly 'selects' the removal of uncompetitive elements. Successful traits are vanishingly rare in complex systems that have already been optimized through time.",
        keyPoints: [
          {
            title: "The Scarcity of Good Moves",
            text: "In chess or go, the vast majority of possible moves are mistakes, and only a tiny few would lead to an improvement. Similarly, most possible changes to a brain, flying airplane, city, or codebase would be a net negative.",
            visual: {
              type: 'game',
              description: 'Chess board visualization showing the few good moves among many possibilities'
            }
          },
          {
            title: "Competitive Pressures",
            text: "While change is risky, competitive environments punish stasis. Systems that don't adapt eventually become prey to those that do, even if most adaptations fail.",
            visual: {
              type: 'animation',
              description: 'Animation showing competing systems where some adapt and others remain static'
            }
          },
          {
            title: "Adversarial Adjudication",
            text: "Modern society is designed or 'selected' to handle this paradox through adversarial adjudication - structured competition in politics, markets, and law where opposing forces check each other.",
            visual: {
              type: 'diagram',
              description: 'Diagram of adversarial systems like courts, markets, and democratic institutions'
            }
          }
        ],
        conclusion: "This thermodynamic reality explains why political systems tend toward polarization - it's a natural result of systems that must simultaneously resist harmful changes while adapting to competitive pressures.",
        duration: 240
      },
      full: {
        sections: [
          { 
            id: 'thermodynamics',
            title: "Thermodynamics of Social Systems", 
            content: "Social systems, like physical ones, follow certain thermodynamic principles. Complex systems that have evolved over time represent highly organized states that resist entropy—random or undirected change typically increases disorder rather than order. This explains the conservative instinct to preserve what works, even when flawed.",
            visual: {
              type: 'entropy',
              description: 'Visualization of entropy increasing in organized systems through random changes'
            }
          },
          { 
            id: 'fragility',
            title: "The Fragility of Complexity", 
            content: "Complex systems often exhibit what Nassim Taleb calls 'fragility'—they can be devastated by significant perturbations. A human body can be killed by a small change in temperature, a tiny dose of poison, or a single bullet. Similarly, complex social institutions can collapse from seemingly minor alterations to their structure.",
            quote: "The more complex the system, the greater the room for harm from artificial policies that seek to improve rather than remove fragilizers.",
            quoteAuthor: "Nassim Nicholas Taleb",
            visual: {
              type: 'network',
              description: 'Network visualization showing cascading failures in complex systems'
            }
          },
          { 
            id: 'evolution',
            title: "Evolutionary Pressures", 
            content: "Both biological and cultural evolution primarily work by removing failures rather than directly selecting successes. Most mutations are harmful, but organisms with disadvantageous traits die off, leaving those with neutral or beneficial changes. Similarly, failed social experiments tend to be abandoned while successful ones are preserved.",
            visual: {
              type: 'evolution',
              description: 'Evolutionary tree showing primarily elimination of branches rather than positive selection'
            }
          },
          { 
            id: 'politics',
            title: "Political Implications", 
            content: "This explains why healthy political systems are adversarial. Conservatism embodies resistance to potentially harmful changes in complex systems, while progressivism responds to the competitive necessity of adaptation. Neither can dominate entirely without system failure—too much change creates chaos, while too little leads to competitive extinction.",
            visual: {
              type: 'balance',
              description: 'Balance scale showing tension between conservation and adaptation forces'
            }
          },
          { 
            id: 'institutions',
            title: "Institutional Design", 
            content: "Good institutional design acknowledges both principles. Markets, scientific processes, legal systems, and democracy all function as 'adversarial collaborations' where opposing forces check each other. They allow for experimental change but incorporate mechanisms to identify and filter out failures.",
            quote: "The first rule of tinkering is to save all the parts.",
            quoteAuthor: "Aldo Leopold",
            visual: {
              type: 'structure',
              description: 'Architectural visualization of institutional structures with competing elements'
            }
          }
        ],
        references: [
          { text: "Taleb, N. 'Antifragile: Things That Gain from Disorder' (2012)", url: "https://example.com/taleb" },
          { text: "Kauffman, S. 'At Home in the Universe: The Search for the Laws of Self-Organization and Complexity' (1995)", url: "https://example.com/kauffman" },
          { text: "Scott, J. 'Seeing Like a State: How Certain Schemes to Improve the Human Condition Have Failed' (1998)", url: "https://example.com/scott" }
        ],
        duration: 600
      },
      responses: [
        {
          id: 'response3',
          text: "This helps explain why effective reforms are so difficult to implement. It's not just resistance to change, but a rational recognition that most changes to a complex system will make it worse. But how do we then address obvious problems without destabilizing the entire system?",
          citations: [],
          dateCreated: new Date('2025-03-08'),
          author: 'Thomas J.',
          avatar: '/api/placeholder/40/40',
          votes: 10,
          views: 72
        },
        {
          id: 'response4',
          text: "I wonder if this also explains why many successful societies have evolved similar institutional patterns independently - they've all converged on solutions that balance stability with adaptation. Markets, legal systems, and democratic processes all seem to share this adversarial collaboration structure.",
          citations: [{ text: "North, D. 'Institutions, Institutional Change and Economic Performance' (1990)", url: "https://example.com/north" }],
          dateCreated: new Date('2025-03-11'),
          author: 'Elena M.',
          avatar: '/api/placeholder/40/40',
          votes: 15,
          views: 103
        }
      ]
    },
    {
      id: 'content3',
      creator: 'Prof. Maya Santos',
      creatorAvatar: '/api/placeholder/80/80',
      dateCreated: new Date('2025-02-28'),
      complexity: 7,
      discipline: 'Ethics & Economics',
      topic: 'The Price of Moral Decisions',
      contentType: 'mixed',
      hook: {
        text: "Cost or Price is the most significant factor in moral decisions.",
        quote: "In the world of limited resources, every allocation has an opportunity cost. This turns every action into a trolley problem with near infinite tracks.",
        visual: {
          type: 'trolley',
          description: 'Visualization of a trolley problem with multiple tracks and price tags'
        },
        duration: 55
      },
      main: {
        intro: "The fundamental truth of economics, perhaps the only one economists managed to produce, is that in a world of limited resources, every allocation has an opportunity cost.",
        keyPoints: [
          {
            title: "Hidden Moral Calculations",
            text: "Picture stopping by the highway to pick up a dog hit by a truck. The vet says it costs $10,000 to give him a decent chance at survival. As a billionaire, you happily cover the cost. You might feel good about yourself, but you just chose the death of at least 3 innocent children for a chance of saving a dog.",
            visual: {
              type: 'comparison',
              description: 'Visual comparing different uses of $10,000 and their potential impacts'
            }
          },
          {
            title: "Effective Altruism",
            text: "Organizations like the Against Malaria Foundation can save a human life for approximately $3,000-$4,000 by distributing insecticide-treated mosquito nets. Most of our consumption choices implicitly value conveniences or luxuries over human lives.",
            visual: {
              type: 'chart',
              description: 'Bar chart showing costs per life saved across different interventions'
            }
          },
          {
            title: "Implicit Value Judgments",
            text: "When we renovate a kitchen, buy a luxury car, or choose expensive healthcare interventions near end-of-life, we are implicitly making value judgments about whose lives matter more based on proximity, visibility, and emotional connection.",
            visual: {
              type: 'scales',
              description: 'Balance scales weighing different moral choices against their costs'
            }
          }
        ],
        conclusion: "A rational moral framework must account for these trade-offs explicitly rather than hiding them. Every dollar spent is a moral decision with life-or-death consequences somewhere in the world.",
        duration: 240
      },
      full: {
        sections: [
          { 
            id: 'opportunity',
            title: "The Omnipresent Opportunity Cost", 
            content: "Whenever we allocate scarce resources to one purpose, we inherently deny them to all other possible uses. This seemingly obvious economic principle has profound moral implications that most ethical frameworks fail to adequately address. Even basic acts of consumption represent implicit choices about who and what we value.",
            visual: {
              type: 'branching',
              description: 'Tree diagram showing how one spending choice eliminates countless others'
            }
          },
          { 
            id: 'effectiveness',
            title: "Measuring Effectiveness", 
            content: "Research by GiveWell and other effective altruism organizations has established reliable estimates for the cost of saving lives through various interventions. Malaria prevention through bednets, deworming treatments, and vitamin A supplementation consistently rank as the most cost-effective ways to save lives, often at $3,000-$5,000 per life saved.",
            quote: "The combined evidence suggests that the cost per death averted with an AMF distribution is around $4,500... To emphasize: you can save a human life for a few thousand dollars.",
            quoteAuthor: "GiveWell Cost-Effectiveness Analysis, 2023",
            visual: {
              type: 'data',
              description: 'Data visualization of cost-effectiveness calculations for life-saving interventions'
            }
          },
          { 
            id: 'proximity',
            title: "The Bias of Proximity", 
            content: "Humans have strong intuitions to value nearby suffering over distant suffering. We might spend $50,000 to save a child who fell down a well in our town, while ignoring the fact that the same resources could save 10-15 children from malaria. This proximity bias made evolutionary sense but becomes problematic in a global economy.",
            visual: {
              type: 'distance',
              description: 'Map showing how moral concern diminishes with physical and cultural distance'
            }
          },
          { 
            id: 'consumption',
            title: "The Ethics of Consumption", 
            content: "Every luxury purchase implicitly values personal satisfaction above lives that could be saved. A $35,000 car rather than a $20,000 car represents a choice to let approximately 5 children die of preventable causes. Yet society doesn't view such consumption as a moral failing—we've normalized these trade-offs by making them invisible.",
            visual: {
              type: 'comparison',
              description: 'Side-by-side comparison of luxury purchases and their life-saving equivalents'
            }
          },
          { 
            id: 'solutions',
            title: "Towards Better Moral Accounting", 
            content: "A more rational approach doesn't require extreme asceticism or constant guilt, but rather more explicit acknowledgment of trade-offs. Setting aside a percentage of income for effective giving, making major consumption decisions with awareness of their opportunity costs, and building institutions that better account for distant suffering can all help align our moral intuitions with the reality of our interconnected world.",
            quote: "If it is in our power to prevent something bad from happening, without thereby sacrificing anything of comparable moral importance, we ought, morally, to do it.",
            quoteAuthor: "Peter Singer",
            visual: {
              type: 'framework',
              description: 'Framework for balancing personal needs and effective altruism'
            }
          }
        ],
        references: [
          { text: "MacAskill, W. 'Doing Good Better: Effective Altruism and a Radical New Way to Make a Difference' (2015)", url: "https://example.com/macaskill" },
          { text: "Singer, P. 'The Life You Can Save: Acting Now to End World Poverty' (2009)", url: "https://example.com/singer" },
          { text: "GiveWell. 'Against Malaria Foundation (AMF)' (2023)", url: "https://example.com/givewell" }
        ],
        duration: 600
      },
      responses: [
        {
          id: 'response5',
          text: "This framework makes me deeply uncomfortable, but I can't deny its logic. If we truly valued all human lives equally, most of our current consumption patterns would be morally indefensible. Does this mean we're all complicit in immoral behavior simply by participating in modern society?",
          citations: [],
          dateCreated: new Date('2025-03-02'),
          author: 'David R.',
          avatar: '/api/placeholder/40/40',
          votes: 18,
          views: 126
        },
        {
          id: 'response6',
          text: "I think there's an important distinction between act and rule utilitarianism here. While it's true that any individual luxury purchase could instead save lives, there may be systemic reasons why complete self-sacrifice isn't the optimal strategy. The system needs to change, not just individual behavior.",
          citations: [{ text: "Sidgwick, H. 'The Methods of Ethics' (1874)", url: "https://example.com/sidgwick" }],
          dateCreated: new Date('2025-03-07'),
          author: 'Priya K.',
          avatar: '/api/placeholder/40/40',
          votes: 21,
          views: 142
        }
      ]
    },
    {
      id: 'content4',
      creator: 'Prof. Alex Morgan',
      creatorAvatar: '/api/placeholder/80/80',
      dateCreated: new Date('2025-03-08'),
      complexity: 6,
      discipline: 'Mathematics',
      topic: 'The Friendship Paradox',
      contentType: 'mixed',
      hook: {
        text: "Did you know most of your friends likely have more friends than you do?",
        quote: "This isn't because you're unpopular—it's a mathematical certainty called the Friendship Paradox.",
        visual: {
          type: 'network',
          description: 'Social network visualization highlighting the friendship paradox effect'
        },
        duration: 45
      },
      main: {
        intro: "The Friendship Paradox emerges from network mathematics. In most social networks, a small number of people have many connections, while most have relatively few.",
        keyPoints: [
          {
            title: "Network Sampling",
            text: "When you sample the network through your friends, you're more likely to include highly-connected individuals in your sample.",
            visual: {
              type: 'diagram',
              description: 'Diagram showing how sampling through connections biases toward high-degree nodes'
            }
          },
          {
            title: "Simple Example",
            text: "Imagine a party with 10 people. One person knows everyone (9 friends), while everyone else knows only that central person (1 friend each). The average number of friends is 1.8, but if you're one of the nine peripheral people, your only friend has 9 friends—far above average.",
            visual: {
              type: 'animation',
              description: 'Simple network animation showing the star topology example'
            }
          },
          {
            title: "Real-World Impact",
            text: "This effect appears consistently in both online and offline social networks. Studies of Facebook, Twitter, and academic collaboration networks all demonstrate the paradox.",
            visual: {
              type: 'graph',
              description: 'Graph showing real-world data from social networks demonstrating the paradox'
            }
          }
        ],
        conclusion: "This isn't just a mathematical curiosity—it creates systematic perception biases where social activities appear more common than they actually are.",
        duration: 180
      },
      full: {
        sections: [
          { 
            id: 'discovery',
            title: "The Discovery", 
            content: "The Friendship Paradox, first observed by sociologist Scott Feld in 1991, states that on average, most people have fewer friends than their friends have.",
            visual: {
              type: 'portrait',
              description: 'Portrait of Scott Feld with quote about his discovery'
            }
          },
          { 
            id: 'mathematics',
            title: "The Mathematics", 
            content: "To understand why this paradox occurs, we need to examine how we sample social networks. When we look at our friends, we're not observing a random sample of the population—we're looking at people connected to us. People with many connections are more likely to be someone's friend than people with few connections.",
            quote: "Mathematically, if we define ki as the number of friends person i has, then the average number of friends in the population is μ = (1/n)∑ki. However, if we sample through friendships, each person i is counted ki times.",
            visual: {
              type: 'equation',
              description: 'Mathematical formula for the friendship paradox with visual explanation'
            }
          },
          { 
            id: 'applications',
            title: "Practical Applications", 
            content: "In public health, monitoring friends of randomly selected people provides earlier detection of disease outbreaks than traditional surveillance. In network influence, it explains why people consistently overestimate the prevalence of behaviors among their peers—a phenomenon called 'pluralistic ignorance.'",
            visual: {
              type: 'chart',
              description: 'Chart showing how monitoring friends detected flu outbreak 13 days earlier'
            }
          },
          { 
            id: 'psychology',
            title: "Psychological Impact", 
            content: "Studies show this effect can negatively impact psychological well-being through social comparison. When people observe their friends' lives through social media, they're systematically exposed to individuals who are more connected, creating a distorted view of social norms.",
            visual: {
              type: 'illustration',
              description: 'Illustration showing social media perception vs reality'
            }
          },
          { 
            id: 'generalizations',
            title: "Beyond Friendship", 
            content: "The 'generalized friendship paradox' shows that your friends are likely to be richer, more attractive, happier, and more successful than you are—not because of your own attributes, but as a mathematical consequence of network structure combined with homophily (the tendency to connect with similar others).",
            visual: {
              type: 'infographic',
              description: 'Infographic showing how the paradox applies to wealth, happiness, and other attributes'
            }
          }
        ],
        references: [
          { text: "Feld, S. 'Why Your Friends Have More Friends Than You Do' (1991)", url: "https://example.com/feld" },
          { text: "Hodas, N. et al. 'Friendship Paradox Redux: Your Friends Are More Interesting Than You' (2013)", url: "https://example.com/hodas" },
          { text: "Eom, Y. & Jo, H. 'Generalized Friendship Paradox in Complex Networks' (2014)", url: "https://example.com/eom" }
        ],
        duration: 480
      },
      responses: [
        {
          id: 'response7',
          text: "This explains so much about social media and why everyone seems to be having a better time than I am! I wonder if being aware of this paradox helps reduce the negative psychological effects of social comparison?",
          citations: [],
          dateCreated: new Date('2025-03-12'),
          author: 'Jamie T.',
          avatar: '/api/placeholder/40/40',
          votes: 15,
          views: 103
        }
      ]
    }
  ];
  
  // Get the current content being displayed
  const currentContent = contentData[currentContentIndex];
  
  // Color scheme (same as the upload form with some additions)
  const colors = {
    gradient: "linear-gradient(135deg, #2A1B3D 0%, #1A3A63 100%)",
    accent1: "#E9A16B", // Warm amber
    accent2: "#44CFCB", // Turquoise 
    accent3: "#9F7AEA", // Purple for tertiary elements
    accent4: "#F97B5C", // Coral for additional contrast
    surface1: "rgba(255, 255, 255, 0.07)",
    surface2: "rgba(255, 255, 255, 0.12)",
    surface3: "rgba(0, 0, 0, 0.15)",
    glow1: "rgba(233, 161, 107, 0.2)", // Accent1 glow
    glow2: "rgba(68, 207, 203, 0.2)", // Accent2 glow
    text: "#FFFFFF",
    textSecondary: "rgba(255, 255, 255, 0.7)",
    border: "rgba(255, 255, 255, 0.12)"
  };
  
  // Check if the screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Handle auto-hiding controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        if (!showResponses) {
          setShowControls(false);
        }
      }, 3000);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseMove);
    
    // Initial timeout
    controlsTimeoutRef.current = setTimeout(() => {
      if (!showResponses) {
        setShowControls(false);
      }
    }, 3000);
    
    return () => {
      clearTimeout(controlsTimeoutRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseMove);
    };
  }, [showResponses]);
  
  // Navigation functions
  const navigateToNextContent = () => {
    if (isTransitioning) return;
    
    setTransitionDirection('vertical');
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentDepth(0); // Reset to Hook level
      setCurrentContentIndex((prevIndex) => (prevIndex + 1) % contentData.length);
      setShowResponses(false);
      setActiveTab('visual');
      setRevealedSections([]);
      
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionDirection(null);
      }, 300);
    }, 300);
  };
  
  const navigateToDepth = (newDepth) => {
    if (isTransitioning || newDepth === currentDepth) return;
    
    const direction = newDepth > currentDepth ? 'right' : 'left';
    setTransitionDirection(direction);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentDepth(newDepth);
      if (newDepth < 2) {
        setShowResponses(false);
        setActiveTab('visual');
      }
      setRevealedSections([]);
      
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitionDirection(null);
      }, 300);
    }, 300);
  };
  
  // Get the depth name
  const getDepthName = () => {
    switch (currentDepth) {
      case 0:
        return 'Hook';
      case 1:
        return 'Main';
      case 2:
        return 'Full';
      default:
        return '';
    }
  };
  
  // Toggle section reveal in Full depth
  const toggleSection = (sectionId) => {
    if (revealedSections.includes(sectionId)) {
      setRevealedSections(revealedSections.filter(id => id !== sectionId));
    } else {
      setRevealedSections([...revealedSections, sectionId]);
    }
  };
  
  // Handle text highlight
  const handleTextSelect = () => {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      setHighlightedText(selection.toString());
    } else {
      setHighlightedText(null);
    }
  };
  
  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  // Transition classes for content
  const getContentTransitionClasses = () => {
    if (!isTransitioning) return 'transition-all duration-300 ease-in-out';
    
    switch (transitionDirection) {
      case 'right':
        return 'opacity-0 transform translate-x-10 transition-all duration-300 ease-in-out';
      case 'left':
        return 'opacity-0 transform -translate-x-10 transition-all duration-300 ease-in-out';
      case 'vertical':
        return 'opacity-0 transform translate-y-10 transition-all duration-300 ease-in-out';
      default:
        return 'transition-all duration-300 ease-in-out';
    }
  };
  
  // Hook Content Component
  const HookContent = () => {
    const { hook } = currentContent;
    
    return (
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-6 py-8">
        {/* Visual component */}
        <div 
          className="w-40 h-40 md:w-56 md:h-56 mb-8 rounded-full flex items-center justify-center bg-cover bg-center"
          style={{ 
            background: colors.surface1,
            boxShadow: `0 0 40px ${colors.glow1}`
          }}
        >
          {/* Time Hook Visual */}
          {hook.visual.type === 'animated' && (
            <div className="p-4 relative">
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${colors.glow2} 0%, transparent 70%)`,
                  animation: 'pulse 4s infinite'
                }}
              ></div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke={colors.accent2} strokeWidth="2" />
                <line 
                  x1="50" y1="50" x2="50" y2="20" 
                  stroke={colors.accent1} 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  style={{ transformOrigin: 'center', animation: 'rotateClock 10s linear infinite' }}
                />
                <line 
                  x1="50" y1="50" x2="70" y2="50" 
                  stroke={colors.accent3} 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  style={{ transformOrigin: 'center', animation: 'rotateClock 60s linear infinite' }}
                />
                <circle cx="50" cy="50" r="3" fill={colors.accent2} />
              </svg>
            </div>
          )}
          
          {/* Friendship Paradox Hook Visual */}
          {hook.visual.type === 'network' && (
            <div className="p-4">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Central node */}
                <circle cx="50" cy="50" r="6" fill={colors.accent1} />
                
                {/* Peripheral nodes */}
                <circle cx="20" cy="30" r="4" fill={colors.accent2} />
                <circle cx="25" cy="70" r="4" fill={colors.accent2} />
                <circle cx="50" cy="20" r="4" fill={colors.accent2} />
                <circle cx="75" cy="30" r="4" fill={colors.accent2} />
                <circle cx="80" cy="70" r="4" fill={colors.accent2} />
                <circle cx="60" cy="80" r="4" fill={colors.accent2} />
                <circle cx="30" cy="50" r="4" fill={colors.accent2} />
                <circle cx="70" cy="50" r="4" fill={colors.accent2} />
                
                {/* Connections */}
                <line x1="50" y1="50" x2="20" y2="30" stroke={colors.border} strokeWidth="1" />
                <line x1="50" y1="50" x2="25" y2="70" stroke={colors.border} strokeWidth="1" />
                <line x1="50" y1="50" x2="50" y2="20" stroke={colors.border} strokeWidth="1" />
                <line x1="50" y1="50" x2="75" y2="30" stroke={colors.border} strokeWidth="1" />
                <line x1="50" y1="50" x2="80" y2="70" stroke={colors.border} strokeWidth="1" />
                <line x1="50" y1="50" x2="60" y2="80" stroke={colors.border} strokeWidth="1" />
                <line x1="50" y1="50" x2="30" y2="50" stroke={colors.border} strokeWidth="1" />
                <line x1="50" y1="50" x2="70" y2="50" stroke={colors.border} strokeWidth="1" />
              </svg>
            </div>
          )}
          
          {/* Complex Systems Hook Visual */}
          {hook.visual.type === 'systems' && (
            <div className="p-4 relative">
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${colors.glow2} 0%, transparent 70%)`,
                  animation: 'pulse 6s infinite'
                }}
              ></div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Environment boundary */}
                <circle cx="50" cy="50" r="40" fill="none" stroke={colors.accent2} strokeWidth="1" strokeDasharray="2,2" />
                
                {/* Initial animation countdown */}
                <text 
                  x="50" 
                  y="92" 
                  textAnchor="middle" 
                  fill={colors.textSecondary} 
                  fontSize="4"
                  style={{animation: 'cycleText 8s infinite'}}
                >
                  Natural Selection Cycle
                </text>
                
                {/* Selection pressure zone - represents environmental pressure */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="22" 
                  fill="none" 
                  stroke={colors.accent1} 
                  strokeWidth="1.5"
                  style={{animation: 'pulse 4s infinite alternate'}} 
                />
                
                {/* Selection forces - directional arrows */}
                <g style={{animation: 'fadeInOut 8s infinite'}}>
                  <path d="M60,35 L65,30 L70,35" stroke={colors.accent4} strokeWidth="1" fill="none" />
                  <path d="M65,30 L65,45" stroke={colors.accent4} strokeWidth="1" fill="none" />
                  
                  <path d="M30,65 L35,70 L40,65" stroke={colors.accent4} strokeWidth="1" fill="none" />
                  <path d="M35,70 L35,55" stroke={colors.accent4} strokeWidth="1" fill="none" />
                </g>
                
                {/* Core survivors group */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="10" 
                  fill="none" 
                  stroke={colors.accent1} 
                  strokeWidth="2"
                />
                
                {/* Random variations - will be eliminated */}
                {[...Array(24)].map((_, i) => {
                  const angle = (i * 15) * Math.PI / 180;
                  const distanceFromCenter = 25 + (i % 4) * 5;
                  const x = 50 + Math.cos(angle) * distanceFromCenter;
                  const y = 50 + Math.sin(angle) * distanceFromCenter;
                  const delay = i * 0.2;
                  const animIndex = i % 4; // To create 4 different movement patterns
                  
                  return (
                    <g key={i}>
                      <circle 
                        cx={x}
                        cy={y}
                        r="1.5"
                        fill={colors.accent3}
                        style={{
                          animation: `randomEvolution${animIndex + 1} 8s infinite ${delay}s, 
                                     eliminateVariation 6s ${2 + delay}s forwards`
                        }}
                      />
                      {/* Flash effect when element is eliminated */}
                      <circle 
                        cx={x}
                        cy={y}
                        r="0"
                        fill="none"
                        stroke={colors.accent4}
                        strokeWidth="0"
                        style={{
                          animation: `eliminationFlash 0.5s ${4 + delay}s forwards`
                        }}
                      />
                    </g>
                  );
                })}
                
                {/* Successful adaptations that survive */}
                {[...Array(5)].map((_, i) => {
                  const angle = (i * 72) * Math.PI / 180;
                  const x = 50 + Math.cos(angle) * 12;
                  const y = 50 + Math.sin(angle) * 12;
                  
                  return (
                    <circle 
                      key={i}
                      cx={x}
                      cy={y}
                      r="2"
                      fill={colors.accent1}
                      style={{
                        animation: `survive 10s infinite ${i * 0.5}s`,
                        opacity: 1
                      }}
                    />
                  );
                })}
                
                {/* Central origin point */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="3" 
                  fill={colors.accent1}
                />
                
                {/* Selection force */}
                <path 
                  d="M10,50 Q30,30 50,50 Q70,70 90,50" 
                  fill="none" 
                  stroke={colors.accent4} 
                  strokeWidth="1.5" 
                  strokeDasharray="2,2"
                  style={{animation: 'selectionWave 8s infinite'}} 
                />
                
                {/* Selection ring - moves outward eliminating variations */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="10"
                  fill="rgba(249, 123, 92, 0.1)"
                  stroke={colors.accent4}
                  strokeWidth="1.5"
                  strokeDasharray="2,1"
                  opacity="0.9"
                  style={{animation: 'selectionRing 8s infinite'}}
                />
              </svg>
            </div>
          )}
          
          {/* Moral Economics Hook Visual */}
          {hook.visual.type === 'trolley' && (
            <div className="p-4 relative">
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${colors.glow2} 0%, transparent 70%)`,
                  animation: 'pulse 5s infinite'
                }}
              ></div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Trolley tracks */}
                <path 
                  d="M10,50 L50,50" 
                  stroke={colors.accent2} 
                  strokeWidth="2" 
                  fill="none"
                />
                
                {/* Branching tracks */}
                <path 
                  d="M50,50 L90,30" 
                  stroke={colors.accent2} 
                  strokeWidth="2" 
                  fill="none"
                />
                <path 
                  d="M50,50 L90,40" 
                  stroke={colors.accent2} 
                  strokeWidth="2" 
                  fill="none"
                />
                <path 
                  d="M50,50 L90,50" 
                  stroke={colors.accent2} 
                  strokeWidth="2" 
                  fill="none"
                />
                <path 
                  d="M50,50 L90,60" 
                  stroke={colors.accent2} 
                  strokeWidth="2" 
                  fill="none"
                />
                <path 
                  d="M50,50 L90,70" 
                  stroke={colors.accent2} 
                  strokeWidth="2" 
                  fill="none"
                />
                
                {/* Trolley */}
                <rect 
                  x="30" 
                  y="45" 
                  width="10" 
                  height="7" 
                  fill={colors.accent1}
                  style={{ animation: 'moveTrolley 4s infinite' }}
                />
                
                {/* Price tags */}
                <g style={{ opacity: 0.8 }}>
                  <rect x="75" y="25" width="10" height="6" fill={colors.surface2} rx="1" />
                  <text x="77" y="30" fill={colors.text} fontSize="5">$10k</text>
                  
                  <rect x="75" y="35" width="10" height="6" fill={colors.surface2} rx="1" />
                  <text x="77" y="40" fill={colors.text} fontSize="5">$5k</text>
                  
                  <rect x="75" y="45" width="10" height="6" fill={colors.surface2} rx="1" />
                  <text x="77" y="50" fill={colors.text} fontSize="5">$3k</text>
                  
                  <rect x="75" y="55" width="10" height="6" fill={colors.surface2} rx="1" />
                  <text x="77" y="60" fill={colors.text} fontSize="5">$2k</text>
                  
                  <rect x="75" y="65" width="10" height="6" fill={colors.surface2} rx="1" />
                  <text x="77" y="70" fill={colors.text} fontSize="5">$1k</text>
                </g>
              </svg>
            </div>
          )}
        </div>
        
        {/* Main text */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{hook.text}</h1>
        
        {/* Quote */}
        <div 
          className="relative my-8 max-w-2xl"
          style={{ 
            background: colors.surface1,
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1)`,
            borderLeft: `3px solid ${colors.accent1}`,
            padding: '20px',
            borderRadius: '4px'
          }}
        >
          <div 
            className="absolute -top-3 -left-3 text-4xl opacity-30"
            style={{ color: colors.accent1 }}
          >
            "
          </div>
          <p className="text-lg md:text-xl italic">{hook.quote}</p>
        </div>
        
        {/* Interactive prompt */}
        <div 
          className="mt-6 flex items-center justify-center"
          style={{ color: colors.accent2 }}
        >
          <div className="flex flex-col items-center">
            <p className="text-sm mb-2">Swipe left or tap to explore more</p>
            <svg className="w-8 h-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    );
  };
  
  // Main Content Component
  const MainContent = () => {
    const { main } = currentContent;
    
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Introduction */}
        <p className="text-xl md:text-2xl mb-8 leading-relaxed">{main.intro}</p>
        
        {/* Visual key points */}
        <div className="my-10 space-y-12">
          {main.keyPoints.map((point, index) => (
            <div 
              key={index} 
              className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8"
            >
              {/* Visual element */}
              <div 
                className="w-full md:w-2/5 h-48 md:h-56 rounded-lg overflow-hidden flex items-center justify-center order-1 md:order-none"
                style={{ 
                  background: `${colors.surface2}`,
                  boxShadow: index % 2 === 0 ? `0 10px 25px ${colors.glow1}` : `0 10px 25px ${colors.glow2}`
                }}
              >
                {/* Block Universe Diagram */}
                {point.visual.type === 'diagram' && point.title === "The Block Universe" && (
                  <div className="p-4 relative w-full h-full flex items-center justify-center">
                    <div 
                      className="absolute inset-0 opacity-20" 
                      style={{ background: `radial-gradient(circle, ${colors.accent2} 0%, transparent 70%)` }}
                    ></div>
                    
                    <svg className="w-full h-full max-w-xs" viewBox="0 0 120 120">
                      {/* 3D Block */}
                      <polygon points="20,40 100,40 100,80 20,80" fill="rgba(68, 207, 203, 0.2)" stroke={colors.accent2} strokeWidth="1" />
                      <polygon points="40,20 120,20 100,40 20,40" fill="rgba(68, 207, 203, 0.1)" stroke={colors.accent2} strokeWidth="1" />
                      <polygon points="100,40 120,20 120,60 100,80" fill="rgba(68, 207, 203, 0.15)" stroke={colors.accent2} strokeWidth="1" />
                      
                      {/* Time slices */}
                      <line x1="40" y1="50" x2="120" y2="30" stroke={colors.accent1} strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="40" y1="60" x2="120" y2="40" stroke={colors.accent1} strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="40" y1="70" x2="120" y2="50" stroke={colors.accent1} strokeWidth="1" strokeDasharray="2,2" />
                      
                      {/* Labels */}
                      <text x="10" y="82" fill={colors.textSecondary} fontSize="6">SPACE</text>
                      <text x="102" y="85" fill={colors.textSecondary} fontSize="6">TIME</text>
                    </svg>
                  </div>
                )}
                
                {/* Chess/Game Visualization */}
                {point.visual.type === 'game' && (
                  <div className="p-4 relative w-full h-full flex items-center justify-center">
                    <div 
                      className="absolute inset-0 opacity-20" 
                      style={{ background: `radial-gradient(circle, ${colors.accent1} 0%, transparent 70%)` }}
                    ></div>
                    
                    <svg className="w-full h-full max-w-xs" viewBox="0 0 120 120">
                      {/* Chess board */}
                      <g transform="translate(10,10) scale(0.8)">
                        {/* Generate 8x8 board */}
                        {[...Array(8)].map((_, row) => (
                          [...Array(8)].map((_, col) => (
                            <rect 
                              key={`${row}-${col}`}
                              x={row * 12.5} 
                              y={col * 12.5} 
                              width="12.5" 
                              height="12.5" 
                              fill={(row + col) % 2 === 0 ? colors.surface1 : colors.surface2}
                            />
                          ))
                        ))}
                        
                        {/* Highlight good moves */}
                        <circle cx="43.75" cy="31.25" r="4" fill={colors.accent2} opacity="0.5" />
                        <circle cx="56.25" cy="56.25" r="4" fill={colors.accent2} opacity="0.5" />
                        <circle cx="81.25" cy="43.75" r="4" fill={colors.accent2} opacity="0.5" />
                        
                        {/* Piece */}
                        <circle cx="50" cy="50" r="5" fill={colors.accent1} />
                        
                        {/* Potential move lines - mostly bad */}
                        {[...Array(20)].map((_, i) => {
                          const angle = (i * 18) * Math.PI / 180;
                          const length = 20 + (i % 3) * 10;
                          const endX = 50 + Math.cos(angle) * length;
                          const endY = 50 + Math.sin(angle) * length;
                          const isGood = i === 5 || i === 10 || i === 15;
                          
                          return (
                            <line 
                              key={i}
                              x1="50" 
                              y1="50" 
                              x2={endX} 
                              y2={endY} 
                              stroke={isGood ? colors.accent2 : colors.accent4}
                              strokeWidth={isGood ? "1.5" : "0.5"}
                              opacity={isGood ? "0.8" : "0.3"}
                            />
                          );
                        })}
                      </g>
                      
                      {/* Label */}
                      <text x="60" y="110" fill={colors.textSecondary} fontSize="6" textAnchor="middle">
                        Few good moves among many possibilities
                      </text>
                    </svg>
                  </div>
                )}
                
                {/* Adversarial Systems Diagram */}
                {point.visual.type === 'diagram' && point.title === "Adversarial Adjudication" && (
                  <div className="p-4 relative w-full h-full flex items-center justify-center">
                    <div 
                      className="absolute inset-0 opacity-20" 
                      style={{ background: `radial-gradient(circle, ${colors.accent3} 0%, transparent 70%)` }}
                    ></div>
                    
                    <svg className="w-full h-full max-w-xs" viewBox="0 0 120 120">
                      {/* Balance scales */}
                      <line x1="60" y1="30" x2="60" y2="45" stroke={colors.accent2} strokeWidth="2" />
                      <line x1="30" y1="45" x2="90" y2="45" stroke={colors.accent2} strokeWidth="2" />
                      
                      {/* Scale pans */}
                      <circle cx="30" cy="55" r="10" fill="none" stroke={colors.accent1} strokeWidth="1.5" />
                      <circle cx="90" cy="55" r="10" fill="none" stroke={colors.accent3} strokeWidth="1.5" />
                      
                      <text x="30" y="58" fill={colors.text} fontSize="6" textAnchor="middle">Stability</text>
                      <text x="90" y="58" fill={colors.text} fontSize="6" textAnchor="middle">Change</text>
                      
                      {/* Three institutions */}
                      <g transform="translate(20, 75)">
                        <rect x="0" y="0" width="20" height="20" rx="2" fill="none" stroke={colors.accent1} strokeWidth="1" />
                        <text x="10" y="13" fill={colors.text} fontSize="6" textAnchor="middle">Markets</text>
                      </g>
                      
                      <g transform="translate(50, 75)">
                        <rect x="0" y="0" width="20" height="20" rx="2" fill="none" stroke={colors.accent2} strokeWidth="1" />
                        <text x="10" y="13" fill={colors.text} fontSize="6" textAnchor="middle">Courts</text>
                      </g>
                      
                      <g transform="translate(80, 75)">
                        <rect x="0" y="0" width="20" height="20" rx="2" fill="none" stroke={colors.accent3} strokeWidth="1" />
                        <text x="10" y="13" fill={colors.text} fontSize="6" textAnchor="middle">Elections</text>
                      </g>
                      
                      {/* Connection lines */}
                      <line x1="30" y1="75" x2="60" y2="65" stroke={colors.border} strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="60" y1="75" x2="60" y2="65" stroke={colors.border} strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="90" y1="75" x2="60" y2="65" stroke={colors.border} strokeWidth="1" strokeDasharray="2,2" />
                    </svg>
                  </div>
                )}
                
                {/* Network Sampling Diagram */}
                {point.visual.type === 'diagram' && point.title === "Network Sampling" && (
                  <div className="p-4 relative w-full h-full flex items-center justify-center">
                    <div 
                      className="absolute inset-0 opacity-20" 
                      style={{ background: `radial-gradient(circle, ${colors.accent2} 0%, transparent 70%)` }}
                    ></div>
                    
                    <svg className="w-full h-full max-w-xs" viewBox="0 0 100 100">
                      {/* Central node */}
                      <circle cx="50" cy="50" r="8" fill={colors.accent1} />
                      <text x="48" y="53" fill="#000" fontSize="8">9</text>
                      
                      {/* Peripheral nodes */}
                      <circle cx="20" cy="30" r="6" fill={colors.accent2} />
                      <text x="18" y="33" fill="#000" fontSize="6">1</text>
                      
                      <circle cx="25" cy="70" r="6" fill={colors.accent2} />
                      <text x="23" y="73" fill="#000" fontSize="6">1</text>
                      
                      <circle cx="50" cy="20" r="6" fill={colors.accent2} />
                      <text x="48" y="23" fill="#000" fontSize="6">1</text>
                      
                      <circle cx="75" cy="30" r="6" fill={colors.accent2} />
                      <text x="73" y="33" fill="#000" fontSize="6">1</text>
                      
                      <circle cx="80" cy="70" r="6" fill={colors.accent2} />
                      <text x="78" y="73" fill="#000" fontSize="6">1</text>
                      
                      <circle cx="60" cy="80" r="6" fill={colors.accent2} />
                      <text x="58" y="83" fill="#000" fontSize="6">1</text>
                      
                      <circle cx="30" cy="50" r="6" fill={colors.accent2} />
                      <text x="28" y="53" fill="#000" fontSize="6">1</text>
                      
                      <circle cx="70" cy="50" r="6" fill={colors.accent2} />
                      <text x="68" y="53" fill="#000" fontSize="6">1</text>
                      
                      {/* Connections */}
                      <line x1="50" y1="50" x2="20" y2="30" stroke={colors.text} strokeWidth="1" />
                      <line x1="50" y1="50" x2="25" y2="70" stroke={colors.text} strokeWidth="1" />
                      <line x1="50" y1="50" x2="50" y2="20" stroke={colors.text} strokeWidth="1" />
                      <line x1="50" y1="50" x2="75" y2="30" stroke={colors.text} strokeWidth="1" />
                      <line x1="50" y1="50" x2="80" y2="70" stroke={colors.text} strokeWidth="1" />
                      <line x1="50" y1="50" x2="60" y2="80" stroke={colors.text} strokeWidth="1" />
                      <line x1="50" y1="50" x2="30" y2="50" stroke={colors.text} strokeWidth="1" />
                      <line x1="50" y1="50" x2="70" y2="50" stroke={colors.text} strokeWidth="1" />
                      
                      {/* Highlighted sampling bias */}
                      <circle cx="50" cy="50" r="12" fill="none" stroke={colors.accent1} strokeWidth="1" strokeDasharray="2,2" />
                    </svg>
                  </div>
                )}
                
                {/* Moral Choice Comparison */}
                {point.visual.type === 'comparison' && (
                  <div className="p-4 relative w-full h-full flex items-center justify-center">
                    <div 
                      className="absolute inset-0 opacity-20" 
                      style={{ background: `radial-gradient(circle, ${colors.accent4} 0%, transparent 70%)` }}
                    ></div>
                    
                    <svg className="w-full h-full max-w-xs" viewBox="0 0 120 120">
                      {/* Divider */}
                      <line x1="60" y1="20" x2="60" y2="100" stroke={colors.border} strokeWidth="1" strokeDasharray="2,2" />
                      
                      {/* Left side - dog */}
                      <circle cx="30" cy="40" r="15" fill="none" stroke={colors.accent1} strokeWidth="1.5" />
                      
                      {/* Dog icon */}
                      <path d="M22,40 C22,37 26,35 30,35 C34,35 38,37 38,40 L38,45 L36,45 L36,48 L24,48 L24,45 L22,45 Z" fill={colors.accent1} />
                      <circle cx="26" cy="38" r="1" fill="#000" />
                      <circle cx="34" cy="38" r="1" fill="#000" />
                      
                      {/* Cost */}
                      <rect x="15" y="55" width="30" height="10" rx="2" fill={colors.surface3} />
                      <text x="30" y="63" fill={colors.text} fontSize="6" textAnchor="middle">$10,000</text>
                      
                      {/* Right side - children */}
                      <g>
                        <circle cx="80" cy="30" r="8" fill="none" stroke={colors.accent2} strokeWidth="1" />
                        <path d="M80,26 C81,26 82,27 82,28 L82,33 C82,34 81,34 80,34 C79,34 78,34 78,33 L78,28 C78,27 79,26 80,26 Z" fill={colors.accent2} />
                        <circle cx="80" cy="24" r="3" fill={colors.accent2} />
                      </g>
                      
                      <g>
                        <circle cx="95" cy="45" r="8" fill="none" stroke={colors.accent2} strokeWidth="1" />
                        <path d="M95,41 C96,41 97,42 97,43 L97,48 C97,49 96,49 95,49 C94,49 93,49 93,48 L93,43 C93,42 94,41 95,41 Z" fill={colors.accent2} />
                        <circle cx="95" cy="39" r="3" fill={colors.accent2} />
                      </g>
                      
                      <g>
                        <circle cx="80" cy="60" r="8" fill="none" stroke={colors.accent2} strokeWidth="1" />
                        <path d="M80,56 C81,56 82,57 82,58 L82,63 C82,64 81,64 80,64 C79,64 78,64 78,63 L78,58 C78,57 79,56 80,56 Z" fill={colors.accent2} />
                        <circle cx="80" cy="54" r="3" fill={colors.accent2} />
                      </g>
                      
                      {/* Cost per life */}
                      <rect x="75" y="75" width="30" height="10" rx="2" fill={colors.surface3} />
                      <text x="90" y="83" fill={colors.text} fontSize="6" textAnchor="middle">$3,000 each</text>
                      
                      {/* Arrows */}
                      <path d="M45,83 L75,83" stroke={colors.accent4} strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill={colors.accent4} />
                        </marker>
                      </defs>
                      
                      <text x="60" y="91" fill={colors.text} fontSize="5" textAnchor="middle">Opportunity Cost</text>
                    </svg>
                  </div>
                )}
                
                {/* Effectiveness Chart */}
                {point.visual.type === 'chart' && (
                  <div className="p-4 relative w-full h-full flex items-center justify-center">
                    <div 
                      className="absolute inset-0 opacity-20" 
                      style={{ background: `radial-gradient(circle, ${colors.accent2} 0%, transparent 70%)` }}
                    ></div>
                    
                    <svg className="w-full h-full max-w-xs" viewBox="0 0 120 120">
                      {/* Axes */}
                      <line x1="20" y1="100" x2="20" y2="20" stroke={colors.text} strokeWidth="1" />
                      <line x1="20" y1="100" x2="100" y2="100" stroke={colors.text} strokeWidth="1" />
                      
                      {/* Y-axis ticks */}
                      <line x1="18" y1="25" x2="22" y2="25" stroke={colors.text} strokeWidth="1" />
                      <text x="15" y="28" fill={colors.text} fontSize="5" textAnchor="end">$50k</text>
                      
                      <line x1="18" y1="50" x2="22" y2="50" stroke={colors.text} strokeWidth="1" />
                      <text x="15" y="53" fill={colors.text} fontSize="5" textAnchor="end">$25k</text>
                      
                      <line x1="18" y1="75" x2="22" y2="75" stroke={colors.text} strokeWidth="1" />
                      <text x="15" y="78" fill={colors.text} fontSize="5" textAnchor="end">$10k</text>
                      
                      {/* Bars */}
                      <g>
                        <rect x="30" y="35" width="10" height="65" fill={colors.accent4} />
                        <text x="35" y="110" fill={colors.text} fontSize="5" textAnchor="middle">Surgery</text>
                      </g>
                      
                      <g>
                        <rect x="50" y="75" width="10" height="25" fill={colors.accent3} />
                        <text x="55" y="110" fill={colors.text} fontSize="5" textAnchor="middle">Medicine</text>
                      </g>
                      
                      <g>
                        <rect x="70" y="92" width="10" height="8" fill={colors.accent2} />
                        <text x="75" y="110" fill={colors.text} fontSize="5" textAnchor="middle">Deworming</text>
                      </g>
                      
                      <g>
                        <rect x="90" y="95" width="10" height="5" fill={colors.accent1} />
                        <text x="95" y="110" fill={colors.text} fontSize="5" textAnchor="middle">Bednets</text>
                      </g>
                      
                      {/* Title */}
                      <text x="60" y="15" fill={colors.text} fontSize="6" textAnchor="middle">Cost per Life Saved</text>
                    </svg>
                  </div>
                )}
                
                {/* Moral Scales visualization */}
                {point.visual.type === 'scales' && (
                  <div className="p-4 relative w-full h-full flex items-center justify-center">
                    <div 
                      className="absolute inset-0 opacity-20" 
                      style={{ background: `radial-gradient(circle, ${colors.accent1} 0%, transparent 70%)` }}
                    ></div>
                    
                    <svg className="w-full h-full max-w-xs" viewBox="0 0 120 120">
                      {/* Scales with animation */}
                      <g transform="translate(60, 30)">
                        <line x1="0" y1="0" x2="0" y2="15" stroke={colors.text} strokeWidth="2" />
                        <line 
                          x1="-30" 
                          y1="15" 
                          x2="30" 
                          y2="15" 
                          stroke={colors.text} 
                          strokeWidth="2" 
                          style={{ transformOrigin: 'center', animation: 'rotateLever 8s ease-in-out infinite alternate' }}
                        />
                        
                        {/* Scale pans */}
                        <g style={{ animation: 'moveScalePan1 8s ease-in-out infinite alternate' }}>
                          <line x1="-30" y1="15" x2="-30" y2="25" stroke={colors.text} strokeWidth="1" />
                          <circle cx="-30" cy="35" r="10" fill="none" stroke={colors.accent1} strokeWidth="1.5" />
                          
                          {/* Local choice icon */}
                          <rect x="-35" y="30" width="10" height="10" rx="1" fill={colors.accent1} />
                          <text x="-30" y="38" fill="#000" fontSize="6" textAnchor="middle">$</text>
                        </g>
                        
                        <g style={{ animation: 'moveScalePan2 8s ease-in-out infinite alternate' }}>
                          <line x1="30" y1="15" x2="30" y2="25" stroke={colors.text} strokeWidth="1" />
                          <circle cx="30" cy="35" r="10" fill="none" stroke={colors.accent2} strokeWidth="1.5" />
                          
                          {/* Global impact icon */}
                          <circle cx="30" cy="35" r="5" fill={colors.accent2} />
                          <path d="M30,32 C31,32 32,33 32,34 L32,37 C32,38 31,38 30,38 C29,38 28,38 28,37 L28,34 C28,33 29,32 30,32 Z" fill="#000" />
                          <circle cx="30" cy="30" r="2" fill="#000" />
                        </g>
                      </g>
                      
                      {/* Examples */}
                      <g transform="translate(20, 75)">
                        <rect x="0" y="0" width="25" height="10" rx="2" fill={colors.surface3} />
                        <text x="12.5" y="7.5" fill={colors.text} fontSize="5" textAnchor="middle">Kitchen</text>
                      </g>
                      
                      <g transform="translate(50, 75)">
                        <rect x="0" y="0" width="25" height="10" rx="2" fill={colors.surface3} />
                        <text x="12.5" y="7.5" fill={colors.text} fontSize="5" textAnchor="middle">Car</text>
                      </g>
                      
                      <g transform="translate(80, 75)">
                        <rect x="0" y="0" width="25" height="10" rx="2" fill={colors.surface3} />
                        <text x="12.5" y="7.5" fill={colors.text} fontSize="5" textAnchor="middle">Healthcare</text>
                      </g>
                      
                      {/* Connection lines */}
                      <line x1="32.5" y1="75" x2="40" y2="65" stroke={colors.border} strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="62.5" y1="75" x2="50" y2="65" stroke={colors.border} strokeWidth="1" strokeDasharray="2,2" />
                      <line x1="92.5" y1="75" x2="70" y2="65" stroke={colors.border} strokeWidth="1" strokeDasharray="2,2" />
                      
                      {/* Value explanation */}
                      <text x="60" y="95" fill={colors.text} fontSize="6" textAnchor="middle">Visible needs vs. invisible needs</text>
                      <text x="60" y="105" fill={colors.textSecondary} fontSize="5" textAnchor="middle">Proximity • Visibility • Connection</text>
                    </svg>
                  </div>
                )}
                
                {/* Time Relative Animation */}
                {point.visual.type === 'animation' && point.title === "Time is Relative" && (
                  <div className="p-4 relative w-full h-full flex items-center justify-center overflow-hidden">
                    <div 
                      className="absolute inset-0 opacity-20" 
                      style={{ background: `radial-gradient(circle, ${colors.accent1} 0%, transparent 70%)` }}
                    ></div>
                    
                    <div className="relative w-full h-full">
                      {/* Moving objects animation */}
                      <div 
                        className="absolute w-8 h-8 rounded-full" 
                        style={{ 
                          background: colors.accent1,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          animation: 'moveLeftRight 8s infinite alternate ease-in-out'
                        }}
                      ></div>
                      <div 
                        className="absolute w-8 h-8" 
                        style={{ 
                          background: colors.accent2,
                          top: '25%',
                          left: '60%',
                          animation: 'blink 4s infinite'
                        }}
                      ></div>
                      
                      {/* Timeline */}
                      <div 
                        className="absolute bottom-8 left-4 right-4 h-2 rounded-full"
                        style={{ background: colors.border }}
                      >
                        <div 
                          className="absolute top-0 bottom-0 w-16 rounded-full"
                          style={{ 
                            background: colors.accent2,
                            animation: 'expandTimeline 8s infinite alternate ease-in-out'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Simple Network Star Animation */}
                {point.visual.type === 'animation' && point.title === "Simple Example" && (
                  <div className="relative w-full h-full">
                    {/* Center node */}
                    <div 
                      className="absolute w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ 
                        background: colors.accent1,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10
                      }}
                    >
                      <span className="text-xs font-bold">9</span>
                    </div>
                    
                    {/* Orbiting nodes */}
                    {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => (
                      <div key={i}>
                        <div 
                          className="absolute w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ 
                            background: colors.accent2,
                            top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * 60}px)`,
                            left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * 60}px)`,
                            transform: 'translate(-50%, -50%)',
                            animation: `pulse 2s infinite ${i * 0.2}s`
                          }}
                        >
                          <span className="text-xs">1</span>
                        </div>
                        
                        <div 
                          className="absolute w-1 h-24"
                          style={{
                            background: colors.border,
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                            transformOrigin: 'center',
                            zIndex: 5
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Competing Systems Animation */}
                {point.visual.type === 'animation' && point.title === "Competitive Pressures" && (
                  <div className="p-4 relative w-full h-full flex items-center justify-center">
                    <div 
                      className="absolute inset-0 opacity-20" 
                      style={{ background: `radial-gradient(circle, ${colors.accent2} 0%, transparent 70%)` }}
                    ></div>
                    
                    <svg className="w-full h-full max-w-xs" viewBox="0 0 120 120">
                      {/* Environment boundary */}
                      <rect x="10" y="10" width="100" height="100" rx="3" fill="none" stroke={colors.border} strokeWidth="1" strokeDasharray="2,2" />
                      
                      {/* Static System - shrinking */}
                      <g style={{ animation: 'shrink 10s ease-in-out infinite' }}>
                        <circle cx="35" cy="40" r="15" fill="none" stroke={colors.accent4} strokeWidth="1.5" />
                        
                        {/* Internal components */}
                        <line x1="30" y1="35" x2="40" y2="45" stroke={colors.accent4} strokeWidth="1" />
                        <line x1="30" y1="45" x2="40" y2="35" stroke={colors.accent4} strokeWidth="1" />
                        <circle cx="35" cy="40" r="2" fill={colors.accent4} />
                        
                        <text x="35" y="60" fill={colors.text} fontSize="5" textAnchor="middle">Static</text>
                      </g>
                      
                      {/* Adaptive System - growing */}
                      <g style={{ animation: 'expand 10s ease-in-out infinite' }}>
                        <circle cx="75" cy="50" r="12" fill="none" stroke={colors.accent1} strokeWidth="1.5" />
                        
                        {/* Internal components with movement */}
                        <circle 
                          cx="75" 
                          cy="50" 
                          r="4" 
                          fill="none" 
                          stroke={colors.accent1} 
                          strokeWidth="1" 
                          style={{ animation: 'pulse 2s infinite' }}
                        />
                        
                        <circle 
                          cx="70" 
                          cy="45" 
                          r="2" 
                          fill={colors.accent1} 
                          style={{ animation: 'moveCircular 5s infinite' }}
                        />
                        
                        <circle 
                          cx="80" 
                          cy="45" 
                          r="2" 
                          fill={colors.accent1} 
                          style={{ animation: 'moveCircular 5s infinite 0.5s' }}
                        />
                        
                        <circle 
                          cx="70" 
                          cy="55" 
                          r="2" 
                          fill={colors.accent1} 
                          style={{ animation: 'moveCircular 5s infinite 1s' }}
                        />
                        
                        <circle 
                          cx="80" 
                          cy="55" 
                          r="2" 
                          fill={colors.accent1} 
                          style={{ animation: 'moveCircular 5s infinite 1.5s' }}
                        />
                        
                        <text x="75" y="70" fill={colors.text} fontSize="5" textAnchor="middle">Adaptive</text>
                      </g>
                      
                      {/* Competition arrows */}
                      <path
                        d="M50,40 C60,35 60,45 70,40"
                        fill="none"
                        stroke={colors.accent2}
                        strokeWidth="1"
                        markerEnd="url(#comphead)"
                        style={{ animation: 'dash 3s linear infinite' }}
                      />
                      
                      <path
                        d="M50,50 C60,55 60,45 70,50"
                        fill="none"
                        stroke={colors.accent2}
                        strokeWidth="1"
                        markerEnd="url(#comphead)"
                        style={{ animation: 'dash 3s linear infinite 1.5s' }}
                      />
                      
                      <defs>
                        <marker id="comphead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill={colors.accent2} />
                        </marker>
                      </defs>
                      
                      {/* Environment change indicators */}
                      <path
                        d="M10,85 C30,90 50,75 70,90 S100,80 110,85"
                        fill="none"
                        stroke={colors.accent3}
                        strokeWidth="1"
                        strokeDasharray="2,2"
                        style={{ animation: 'moveUp 20s linear infinite' }}
                      />
                      
                      <text x="60" y="100" fill={colors.textSecondary} fontSize="6" textAnchor="middle">
                        Changing Environment
                      </text>
                    </svg>
                  </div>
                )}
                
                {/* Generic fallback for other visuals */}
                {!(
                  (point.visual.type === 'diagram' && (point.title === "The Block Universe" || point.title === "Adversarial Adjudication" || point.title === "Network Sampling")) ||
                  (point.visual.type === 'game') ||
                  (point.visual.type === 'animation') ||
                  (point.visual.type === 'comparison') ||
                  (point.visual.type === 'chart') ||
                  (point.visual.type === 'scales')
                ) && (
                  <div className="text-center p-4">
                    <div className="text-xs uppercase tracking-wider" style={{ color: colors.textSecondary }}>
                      {point.visual.type}
                    </div>
                    <div className="mt-2 text-sm px-4">
                      {point.visual.description}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Text content */}
              <div className="w-full md:w-3/5 order-2 md:order-none">
                <h3 
                  className="text-xl md:text-2xl font-bold mb-3"
                  style={{ color: index % 2 === 0 ? colors.accent1 : colors.accent2 }}
                >
                  {point.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed">{point.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Conclusion */}
        <div className="mt-12 mb-8">
          <p className="text-xl md:text-2xl text-center italic" style={{ color: colors.accent2 }}>
            {main.conclusion}
          </p>
        </div>
      </div>
    );
  };
  
  // Full Content Component
  const FullContent = () => {
    const { full } = currentContent;
    
    // Toggle between visual and text modes
    const toggleMode = (mode) => {
      setActiveTab(mode);
    };
    
    return (
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">
        {/* Mode toggle */}
        <div className="flex justify-center mb-8">
          <div 
            className="inline-flex rounded-md p-1"
            style={{ background: colors.surface2 }}
          >
            <button
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'visual' ? 'text-gray-900' : ''}`}
              style={{ 
                background: activeTab === 'visual' ? colors.accent2 : 'transparent',
                color: activeTab === 'visual' ? '#1A1A2E' : colors.text
              }}
              onClick={() => toggleMode('visual')}
            >
              Visual
            </button>
            <button
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${activeTab === 'text' ? 'text-gray-900' : ''}`}
              style={{ 
                background: activeTab === 'text' ? colors.accent1 : 'transparent',
                color: activeTab === 'text' ? '#1A1A2E' : colors.text
              }}
              onClick={() => toggleMode('text')}
            >
              Text
            </button>
          </div>
        </div>
        
        {activeTab === 'visual' ? (
          <div className="space-y-10">
            {full.sections.map((section, index) => {
              const isRevealed = revealedSections.includes(section.id);
              
              return (
                <div 
                  key={section.id} 
                  className={`rounded-lg overflow-hidden transition-all duration-300 ${isRevealed ? 'shadow-lg' : ''}`}
                  style={{ 
                    background: colors.surface1,
                    borderLeft: isRevealed ? `3px solid ${index % 2 === 0 ? colors.accent1 : colors.accent2}` : 'none'
                  }}
                >
                  {/* Section header */}
                  <div 
                    className="px-6 py-4 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection(section.id)}
                  >
                    <h3 className="text-xl font-bold">{section.title}</h3>
                    <button 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: colors.surface2 }}
                    >
                      <svg 
                        className={`w-5 h-5 transition-transform duration-200 ${isRevealed ? 'transform rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Expanded content */}
                  {isRevealed && (
                    <div className="px-6 pb-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Visual component */}
                        <div 
                          className="w-full md:w-2/5 h-48 md:h-60 rounded-lg overflow-hidden flex items-center justify-center"
                          style={{ 
                            background: colors.surface2,
                            boxShadow: index % 2 === 0 ? `0 10px 25px ${colors.glow1}` : `0 10px 25px ${colors.glow2}`
                          }}
                        >
                          {/* Timeline Visualization */}
                          {section.visual.type === 'timeline' && (
                            <div className="w-full h-full p-4 relative">
                              <div className="absolute left-8 top-4 bottom-4 w-1" style={{ background: colors.border }}></div>
                              
                              {/* Timeline points */}
                              <div className="relative h-full flex flex-col justify-between">
                                <div className="ml-8 pl-6 relative">
                                  <div 
                                    className="absolute left-0 w-4 h-4 rounded-full top-1"
                                    style={{ background: colors.accent2, transform: 'translateX(-50%)' }}
                                  ></div>
                                  <div className="text-sm font-bold" style={{ color: colors.accent2 }}>Ancient</div>
                                  <div className="text-xs" style={{ color: colors.textSecondary }}>Cyclical time concepts</div>
                                </div>
                                
                                <div className="ml-8 pl-6 relative">
                                  <div 
                                    className="absolute left-0 w-4 h-4 rounded-full top-1"
                                    style={{ background: colors.accent2, transform: 'translateX(-50%)' }}
                                  ></div>
                                  <div className="text-sm font-bold" style={{ color: colors.accent2 }}>Newton</div>
                                  <div className="text-xs" style={{ color: colors.textSecondary }}>Absolute time</div>
                                </div>
                                
                                <div className="ml-8 pl-6 relative">
                                  <div 
                                    className="absolute left-0 w-4 h-4 rounded-full top-1"
                                    style={{ background: colors.accent1, transform: 'translateX(-50%)' }}
                                  ></div>
                                  <div className="text-sm font-bold" style={{ color: colors.accent1 }}>Einstein</div>
                                  <div className="text-xs" style={{ color: colors.textSecondary }}>Relative time</div>
                                </div>
                                
                                <div className="ml-8 pl-6 relative">
                                  <div 
                                    className="absolute left-0 w-4 h-4 rounded-full top-1"
                                    style={{ background: colors.accent3, transform: 'translateX(-50%)' }}
                                  ></div>
                                  <div className="text-sm font-bold" style={{ color: colors.accent3 }}>Quantum</div>
                                  <div className="text-xs" style={{ color: colors.textSecondary }}>Emergent time</div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Entropy Visualization for Thermodynamics section */}
                          {section.visual.type === 'entropy' && (
                            <div className="w-full h-full p-4 flex items-center justify-center">
                              <svg className="w-full h-full max-w-xs" viewBox="0 0 150 100">
                                {/* Organized State */}
                                <g transform="translate(30, 30)">
                                  <rect x="-20" y="-20" width="40" height="40" fill="none" stroke={colors.accent1} strokeWidth="1" />
                                  
                                  {/* Organized particles */}
                                  <g>
                                    {[...Array(16)].map((_, i) => {
                                      const row = Math.floor(i / 4);
                                      const col = i % 4;
                                      return (
                                        <circle 
                                          key={i} 
                                          cx={-15 + col * 10} 
                                          cy={-15 + row * 10} 
                                          r="3" 
                                          fill={colors.accent1}
                                        />
                                      );
                                    })}
                                  </g>
                                  
                                  <text x="0" y="30" fill={colors.text} fontSize="8" textAnchor="middle">Organized</text>
                                </g>
                                
                                {/* Arrows indicating change/entropy */}
                                <g transform="translate(75, 30)">
                                  <path 
                                    d="M-10,0 L10,0 M5,-5 L10,0 L5,5" 
                                    stroke={colors.accent3} 
                                    strokeWidth="1.5" 
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{ animation: 'pulse 2s infinite' }}
                                  />
                                  <text x="0" y="15" fill={colors.accent3} fontSize="6" textAnchor="middle">Random Change</text>
                                </g>
                                
                                {/* Disorganized State */}
                                <g transform="translate(120, 30)">
                                  <rect x="-20" y="-20" width="40" height="40" fill="none" stroke={colors.accent4} strokeWidth="1" />
                                  
                                  {/* Disorganized particles - random positions */}
                                  <g>
                                    {[...Array(16)].map((_, i) => {
                                      const randomX = (Math.random() * 36) - 18;
                                      const randomY = (Math.random() * 36) - 18;
                                      return (
                                        <circle 
                                          key={i} 
                                          cx={randomX} 
                                          cy={randomY} 
                                          r="3" 
                                          fill={colors.accent4}
                                          style={{ animation: `moveSlightly ${(2 + Math.random() * 2).toFixed(1)}s infinite alternate ${Math.random() * 2}s` }}
                                        />
                                      );
                                    })}
                                  </g>
                                  
                                  <text x="0" y="30" fill={colors.text} fontSize="8" textAnchor="middle">Disordered</text>
                                </g>
                                
                                {/* Entropy Curve */}
                                <g transform="translate(75, 80)">
                                  <line x1="-45" y1="0" x2="45" y2="0" stroke={colors.textSecondary} strokeWidth="1" />
                                  <path 
                                    d="M-45,0 C-35,-15 -20,-20 0,-5 S30,10 45,0" 
                                    fill="none" 
                                    stroke={colors.accent2} 
                                    strokeWidth="1.5"
                                  />
                                  <text x="0" y="15" fill={colors.text} fontSize="6" textAnchor="middle">Increasing Entropy</text>
                                </g>
                              </svg>
                            </div>
                          )}
                          
                          {/* Network visualization for system fragility */}
                          {section.visual.type === 'network' && (
                            <div className="w-full h-full p-4 flex items-center justify-center">
                              <svg className="w-full h-full max-w-xs" viewBox="0 0 120 120">
                                {/* Network nodes */}
                                <g id="network" style={{ opacity: 1, transition: 'opacity 0.5s' }}>
                                  {/* Main nodes */}
                                  <circle cx="60" cy="40" r="8" fill={colors.accent1} />
                                  <circle cx="35" cy="60" r="6" fill={colors.accent2} />
                                  <circle cx="85" cy="60" r="6" fill={colors.accent2} />
                                  <circle cx="30" cy="85" r="5" fill={colors.accent3} />
                                  <circle cx="60" cy="85" r="5" fill={colors.accent3} />
                                  <circle cx="90" cy="85" r="5" fill={colors.accent3} />
                                  
                                  {/* Critical connection - pulsing */}
                                  <line 
                                    x1="60" y1="40" x2="35" y2="60" 
                                    stroke={colors.accent1} 
                                    strokeWidth="2"
                                    style={{ animation: 'pulse 2s infinite' }}
                                  />
                                  
                                  {/* Other connections */}
                                  <line x1="60" y1="40" x2="85" y2="60" stroke={colors.border} strokeWidth="1.5" />
                                  <line x1="35" y1="60" x2="30" y2="85" stroke={colors.border} strokeWidth="1.5" />
                                  <line x1="35" y1="60" x2="60" y2="85" stroke={colors.border} strokeWidth="1.5" />
                                  <line x1="85" y1="60" x2="60" y2="85" stroke={colors.border} strokeWidth="1.5" />
                                  <line x1="85" y1="60" x2="90" y2="85" stroke={colors.border} strokeWidth="1.5" />
                                </g>
                                
                                {/* Simulated failure */}
                                <g id="failure" style={{ opacity: 0, animation: 'networkFailure 5s infinite 2s' }}>
                                  <circle cx="60" cy="40" r="8" fill={colors.accent4} />
                                  <circle cx="35" cy="60" r="6" fill={colors.surface3} />
                                  <circle cx="85" cy="60" r="6" fill={colors.surface3} />
                                  <circle cx="30" cy="85" r="5" fill={colors.surface3} />
                                  <circle cx="60" cy="85" r="5" fill={colors.surface3} />
                                  <circle cx="90" cy="85" r="5" fill={colors.surface3} />
                                  
                                  {/* Broken connection */}
                                  <line 
                                    x1="60" y1="40" x2="40" y2="55" 
                                    stroke={colors.accent4} 
                                    strokeWidth="2"
                                    strokeDasharray="3,3"
                                  />
                                  
                                  {/* Breaking connections */}
                                  <line x1="60" y1="40" x2="85" y2="60" stroke={colors.accent4} strokeWidth="1.5" strokeDasharray="2,2" />
                                  <line x1="85" y1="60" x2="60" y2="85" stroke={colors.accent4} strokeWidth="1.5" strokeDasharray="4,2" />
                                  <line x1="85" y1="60" x2="90" y2="85" stroke={colors.accent4} strokeWidth="1.5" strokeDasharray="3,3" />
                                </g>
                                
                                {/* Small change big impact */}
                                <g transform="translate(20, 20)">
                                  <circle cx="0" cy="0" r="6" fill="none" stroke={colors.accent4} strokeWidth="1" />
                                  <path d="M-3,-3 L3,3 M-3,3 L3,-3" stroke={colors.accent4} strokeWidth="1.5" />
                                </g>
                                
                                <text x="60" y="110" fill={colors.text} fontSize="6" textAnchor="middle">
                                  Small change → Cascading failure
                                </text>
                              </svg>
                            </div>
                          )}
                          
                          {/* Evolution tree visualization */}
                          {section.visual.type === 'evolution' && (
                            <div className="w-full h-full p-4 flex items-center justify-center">
                              <svg className="w-full h-full max-w-xs" viewBox="0 0 150 120">
                                {/* Main trunk */}
                                <path 
                                  d="M75,100 L75,20" 
                                  fill="none" 
                                  stroke={colors.accent2} 
                                  strokeWidth="2"
                                />
                                
                                {/* Branches - successful */}
                                <path 
                                  d="M75,80 C85,80 95,70 100,60" 
                                  fill="none" 
                                  stroke={colors.accent1} 
                                  strokeWidth="1.5"
                                />
                                <circle cx="100" cy="60" r="4" fill={colors.accent1} />
                                
                                <path 
                                  d="M75,60 C85,60 95,50 105,45" 
                                  fill="none" 
                                  stroke={colors.accent2} 
                                  strokeWidth="1.5"
                                />
                                <circle cx="105" cy="45" r="4" fill={colors.accent2} />
                                
                                <path 
                                  d="M75,40 C85,40 95,35 110,30" 
                                  fill="none" 
                                  stroke={colors.accent3} 
                                  strokeWidth="1.5"
                                />
                                <circle cx="110" cy="30" r="4" fill={colors.accent3} />
                                
                                {/* Branches - unsuccessful/pruned (many more) */}
                                {[85, 70, 65, 55, 50, 45, 35, 30, 25].map((y, i) => (
                                  <g key={i}>
                                    <path 
                                      d={`M75,${y} C65,${y} 55,${y-10} ${45-(i%3)*5},${y-15+(i%2)*5}`} 
                                      fill="none" 
                                      stroke={colors.accent4} 
                                      strokeWidth="1"
                                      strokeDasharray="2,2"
                                      opacity="0.6"
                                    />
                                    <circle 
                                      cx={45-(i%3)*5} 
                                      cy={y-15+(i%2)*5} 
                                      r="3" 
                                      fill={colors.accent4}
                                      opacity="0.6"
                                    />
                                    <line 
                                      x1={45-(i%3)*5-3} 
                                      y1={y-15+(i%2)*5-3} 
                                      x2={45-(i%3)*5+3} 
                                      y2={y-15+(i%2)*5+3} 
                                      stroke={colors.text} 
                                      strokeWidth="1"
                                      opacity="0.6"
                                    />
                                    <line 
                                      x1={45-(i%3)*5-3} 
                                      y1={y-15+(i%2)*5+3} 
                                      x2={45-(i%3)*5+3} 
                                      y2={y-15+(i%2)*5-3} 
                                      stroke={colors.text} 
                                      strokeWidth="1"
                                      opacity="0.6"
                                    />
                                  </g>
                                ))}
                                
                                {/* Labels */}
                                <text x="115" cy="30" fill={colors.accent3} fontSize="6">Surviving</text>
                                <text x="40" cy="50" fill={colors.accent4} fontSize="6">Eliminated</text>
                                <text x="75" cy="110" fill={colors.text} fontSize="8" textAnchor="middle">
                                  Evolution by elimination
                                </text>
                              </svg>
                            </div>
                          )}
                          
                          {/* Balance visualization */}
                          {section.visual.type === 'balance' && (
                            <div className="w-full h-full p-4 flex items-center justify-center">
                              <svg className="w-full h-full max-w-xs" viewBox="0 0 120 120">
                                {/* Balance beam */}
                                <g style={{ transformOrigin: '60px 40px', animation: 'tiltBalance 8s ease-in-out infinite alternate' }}>
                                  <line x1="30" y1="40" x2="90" y2="40" stroke={colors.text} strokeWidth="2" strokeLinecap="round" />
                                  
                                  {/* Weight indicators */}
                                  <g transform="translate(30, 40)">
                                    <line x1="0" y1="0" x2="0" y2="15" stroke={colors.text} strokeWidth="1.5" />
                                    <rect x="-12" y="15" width="24" height="20" rx="2" fill={colors.accent3} />
                                    <text x="0" y="28" fill="#000" fontSize="8" textAnchor="middle">Preserve</text>
                                  </g>
                                  
                                  <g transform="translate(90, 40)">
                                    <line x1="0" y1="0" x2="0" y2="15" stroke={colors.text} strokeWidth="1.5" />
                                    <rect x="-12" y="15" width="24" height="20" rx="2" fill={colors.accent1} />
                                    <text x="0" y="28" fill="#000" fontSize="8" textAnchor="middle">Adapt</text>
                                  </g>
                                </g>
                                
                                {/* Fulcrum */}
                                <path 
                                  d="M55,40 L65,40 L62,55 L58,55 Z" 
                                  fill={colors.accent2}
                                />
                                
                                {/* Base */}
                                <rect x="45" y="55" width="30" height="5" rx="2" fill={colors.accent2} />
                                
                                {/* Political spectrum */}
                                <g transform="translate(60, 80)">
                                  <line x1="-40" y1="0" x2="40" y2="0" stroke={colors.textSecondary} strokeWidth="1" />
                                  
                                  <g transform="translate(-30, 0)">
                                    <circle cx="0" cy="0" r="5" fill={colors.accent3} />
                                    <text x="0" y="12" fill={colors.text} fontSize="6" textAnchor="middle">Conserve</text>
                                  </g>
                                  
                                  <g transform="translate(0, 0)">
                                    <circle cx="0" cy="0" r="5" fill={colors.accent2} />
                                    <text x="0" y="12" fill={colors.text} fontSize="6" textAnchor="middle">Balance</text>
                                  </g>
                                  
                                  <g transform="translate(30, 0)">
                                    <circle cx="0" cy="0" r="5" fill={colors.accent1} />
                                    <text x="0" y="12" fill={colors.text} fontSize="6" textAnchor="middle">Progress</text>
                                  </g>
                                </g>
                                
                                <text x="60" y="100" fill={colors.textSecondary} fontSize="6" textAnchor="middle">
                                  Political spectrum balances competing needs
                                </text>
                              </svg>
                            </div>
                          )}
                          
                          {/* Institutional structure visualization */}
                          {section.visual.type === 'structure' && (
                            <div className="w-full h-full p-4 flex items-center justify-center">
                              <svg className="w-full h-full max-w-xs" viewBox="0 0 120 120">
                                {/* Base structure */}
                                <g transform="translate(60, 95)">
                                  <rect x="-40" y="-5" width="80" height="10" rx="2" fill={colors.accent2} />
                                  <text x="0" y="2" fill="#000" fontSize="6" textAnchor="middle">Foundation</text>
                                </g>
                                
                                {/* Pillars */}
                                <g transform="translate(30, 60)">
                                  <rect x="-5" y="-40" width="10" height="70" rx="2" fill={colors.accent3} />
                                  <text x="0" y="-25" fill="#fff" fontSize="6" textAnchor="middle" transform="rotate(-90)">Stability</text>
                                </g>
                                
                                <g transform="translate(60, 60)">
                                  <rect x="-5" y="-40" width="10" height="70" rx="2" fill={colors.accent1} />
                                  <text x="0" y="-25" fill="#fff" fontSize="6" textAnchor="middle" transform="rotate(-90)">Innovation</text>
                                </g>
                                
                                <g transform="translate(90, 60)">
                                  <rect x="-5" y="-40" width="10" height="70" rx="2" fill={colors.accent2} />
                                  <text x="0" y="-25" fill="#fff" fontSize="6" textAnchor="middle" transform="rotate(-90)">Feedback</text>
                                </g>
                                
                                {/* Roof structure */}
                                <g transform="translate(60, 15)">
                                  <path d="M-45,0 L45,0 L30,-15 L-30,-15 Z" fill={colors.surface2} />
                                  <text x="0" y="-5" fill={colors.text} fontSize="8" textAnchor="middle">Institutional Design</text>
                                </g>
                                
                                {/* Connecting elements */}
                                <path 
                                  d="M30,20 C45,30 75,30 90,20" 
                                  fill="none" 
                                  stroke={colors.border} 
                                  strokeWidth="1" 
                                  strokeDasharray="2,2" 
                                />
                                
                                <path 
                                  d="M25,40 C40,50 80,50 95,40" 
                                  fill="none" 
                                  stroke={colors.border} 
                                  strokeWidth="1" 
                                  strokeDasharray="2,2" 
                                />
                                
                                {/* System elements */}
                                <g style={{ animation: 'moveVertical 4s infinite alternate' }}>
                                  <circle cx="45" cy="35" r="3" fill={colors.accent1} />
                                  <circle cx="60" cy="45" r="3" fill={colors.accent2} />
                                  <circle cx="75" cy="35" r="3" fill={colors.accent3} />
                                </g>
                              </svg>
                            </div>
                          )}
                          
                          {/* Tree branching visualization */}
                          {section.visual.type === 'branching' && (
                            <div className="w-full h-full p-4 flex items-center justify-center">
                              <svg className="w-full h-full max-w-xs" viewBox="0 0 120 120">
                                {/* Start node */}
                                <circle cx="60" cy="20" r="8" fill={colors.accent1} />
                                <text x="60" y="23" fill="#000" fontSize="6" textAnchor="middle">$</text>
                                
                                {/* First level branches */}
                                <g>
                                  <line x1="60" y1="20" x2="30" y2="40" stroke={colors.border} strokeWidth="1.5" />
                                  <circle cx="30" cy="40" r="6" fill={colors.accent2} />
                                  <text x="30" y="43" fill="#000" fontSize="5" textAnchor="middle">A</text>
                                </g>
                                
                                <g>
                                  <line x1="60" y1="20" x2="90" y2="40" stroke={colors.border} strokeWidth="1.5" />
                                  <circle cx="90" cy="40" r="6" fill={colors.accent3} />
                                  <text x="90" y="43" fill="#000" fontSize="5" textAnchor="middle">B</text>
                                </g>
                                
                                {/* Second level branches - greyed out alternatives */}
                                <g opacity="0.7">
                                  <line x1="30" y1="40" x2="15" y2="60" stroke={colors.border} strokeWidth="1" />
                                  <circle cx="15" cy="60" r="4" fill={colors.surface2} />
                                  
                                  <line x1="30" y1="40" x2="30" y2="60" stroke={colors.border} strokeWidth="1" />
                                  <circle cx="30" cy="60" r="4" fill={colors.surface2} />
                                  
                                  <line x1="30" y1="40" x2="45" y2="60" stroke={colors.border} strokeWidth="1" />
                                  <circle cx="45" cy="60" r="4" fill={colors.surface2} />
                                  
                                  <line x1="90" y1="40" x2="75" y2="60" stroke={colors.border} strokeWidth="1" />
                                  <circle cx="75" cy="60" r="4" fill={colors.surface2} />
                                  
                                  <line x1="90" y1="40" x2="90" y2="60" stroke={colors.border} strokeWidth="1" />
                                  <circle cx="90" cy="60" r="4" fill={colors.surface2} />
                                  
                                  <line x1="90" y1="40" x2="105" y2="60" stroke={colors.border} strokeWidth="1" />
                                  <circle cx="105" cy="60" r="4" fill={colors.surface2} />
                                </g>
                                
                                {/* Third level branches - even more alternatives */}
                                <g opacity="0.4">
                                  {[15, 30, 45, 75, 90, 105].map((x, i) => (
                                    <g key={i}>
                                      <line x1={x} y1="60" x2={x-8} y2="80" stroke={colors.border} strokeWidth="0.5" />
                                      <circle cx={x-8} cy="80" r="2" fill={colors.surface3} />
                                      
                                      <line x1={x} y1="60" x2={x} y2="80" stroke={colors.border} strokeWidth="0.5" />
                                      <circle cx={x} cy="80" r="2" fill={colors.surface3} />
                                      
                                      <line x1={x} y1="60" x2={x+8} y2="80" stroke={colors.border} strokeWidth="0.5" />
                                      <circle cx={x+8} cy="80" r="2" fill={colors.surface3} />
                                    </g>
                                  ))}
                                </g>
                                
                                {/* Final level - tiny dots to suggest massive further branches */}
                                <g opacity="0.2">
                                  {[...Array(60)].map((_, i) => (
                                    <circle 
                                      key={i}
                                      cx={10 + (i % 10) * 10}
                                      cy={90 + Math.floor(i / 10) * 6}
                                      r="1"
                                      fill={colors.text}
                                    />
                                  ))}
                                </g>
                                
                                <text x="60" y="110" fill={colors.text} fontSize="6" textAnchor="middle">
                                  One choice eliminates countless others
                                </text>
                              </svg>
                            </div>
                          )}
                          
                          {/* Data visualization for effectiveness */}
                          {section.visual.type === 'data' && (
                            <div className="w-full h-full p-4 flex items-center justify-center">
                              <svg className="w-full h-full max-w-xs" viewBox="0 0 120 120">
                                {/* Axes */}
                                <line x1="20" y1="90" x2="110" y2="90" stroke={colors.textSecondary} strokeWidth="1" />
                                <line x1="20" y1="20" x2="20" y2="90" stroke={colors.textSecondary} strokeWidth="1" />
                                <text x="65" y="105" fill={colors.textSecondary} fontSize="6" textAnchor="middle">Intervention Type</text>
                                <text x="10" y="55" fill={colors.textSecondary} fontSize="6" textAnchor="middle" transform="rotate(-90, 10, 55)">Cost per Life Saved (USD)</text>
                                
                                {/* Cost scale */}
                                <line x1="18" y1="30" x2="22" y2="30" stroke={colors.textSecondary} strokeWidth="1" />
                                <text x="15" y="33" fontSize="5" fill={colors.textSecondary} textAnchor="end">$100k</text>
                                
                                <line x1="18" y1="50" x2="22" y2="50" stroke={colors.textSecondary} strokeWidth="1" />
                                <text x="15" y="53" fontSize="5" fill={colors.textSecondary} textAnchor="end">$10k</text>
                                
                                <line x1="18" y1="70" x2="22" y2="70" stroke={colors.textSecondary} strokeWidth="1" />
                                <text x="15" y="73" fontSize="5" fill={colors.textSecondary} textAnchor="end">$1k</text>
                                
                                {/* Log scale indicator */}
                                <text x="30" y="20" fontSize="4" fill={colors.textSecondary} fontStyle="italic">(Log scale)</text>
                                
                                {/* Data points with tooltips */}
                                <g>
                                  {/* Heart surgery */}
                                  <circle cx="30" cy="32" r="5" fill={colors.accent4} opacity="0.7" />
                                  <text x="30" y="28" fontSize="4" fill={colors.text} textAnchor="middle">$80k</text>
                                  <text x="30" y="98" fontSize="5" fill={colors.text} textAnchor="middle">Surgery</text>
                                </g>
                                
                                <g>
                                  {/* Advanced medication */}
                                  <circle cx="50" cy="40" r="5" fill={colors.accent3} opacity="0.7" />
                                  <text x="50" y="36" fontSize="4" fill={colors.text} textAnchor="middle">$50k</text>
                                  <text x="50" y="98" fontSize="5" fill={colors.text} textAnchor="middle">Medicine</text>
                                </g>
                                
                                <g>
                                  {/* Vaccines */}
                                  <circle cx="70" cy="55" r="5" fill={colors.accent1} opacity="0.7" />
                                  <text x="70" y="51" fontSize="4" fill={colors.text} textAnchor="middle">$7k</text>
                                  <text x="70" y="98" fontSize="5" fill={colors.text} textAnchor="middle">Vaccines</text>
                                </g>
                                
                                <g>
                                  {/* Deworming */}
                                  <circle cx="90" cy="68" r="5" fill={colors.accent2} opacity="0.7" />
                                  <text x="90" y="64" fontSize="4" fill={colors.text} textAnchor="middle">$2k</text>
                                  <text x="90" y="98" fontSize="5" fill={colors.text} textAnchor="middle">Bednets</text>
                                </g>
                                
                                {/* Highlighted most effective intervention */}
                                <circle 
                                  cx="90" 
                                  cy="68" 
                                  r="8" 
                                  fill="none" 
                                  stroke={colors.accent2} 
                                  strokeWidth="1.5" 
                                  strokeDasharray="2,2"
                                  style={{ animation: 'pulse 2s infinite' }}
                                />
                              </svg>
                            </div>
                          )}
                          
                          {/* Distance map for moral proximity bias */}
                          {section.visual.type === 'distance' && (
                            <div className="w-full h-full p-4 flex items-center justify-center">
                              <svg className="w-full h-full max-w-xs" viewBox="0 0 120 120">
                                {/* Concentric circles of moral concern */}
                                <circle cx="60" cy="60" r="50" fill="none" stroke={colors.border} strokeWidth="0.5" />
                                <circle cx="60" cy="60" r="40" fill="none" stroke={colors.border} strokeWidth="0.5" />
                                <circle cx="60" cy="60" r="30" fill="none" stroke={colors.border} strokeWidth="0.5" />
                                <circle cx="60" cy="60" r="20" fill="none" stroke={colors.border} strokeWidth="0.5" />
                                <circle cx="60" cy="60" r="10" fill="none" stroke={colors.border} strokeWidth="0.5" />
                                
                                {/* Central person */}
                                <circle cx="60" cy="60" r="5" fill={colors.accent1} />
                                
                                {/* Inner circle - family, friends */}
                                <g style={{ opacity: 0.9 }}>
                                  <circle cx="65" cy="50" r="3" fill={colors.accent1} />
                                  <circle cx="55" cy="50" r="3" fill={colors.accent1} />
                                  <circle cx="50" cy="60" r="3" fill={colors.accent1} />
                                  <circle cx="60" cy="70" r="3" fill={colors.accent1} />
                                </g>
                                
                                {/* Second circle - local community */}
                                <g style={{ opacity: 0.7 }}>
                                  {[...Array(8)].map((_, i) => {
                                    const angle = i * Math.PI / 4;
                                    return (
                                      <circle 
                                        key={i}
                                        cx={60 + Math.cos(angle) * 25}
                                        cy={60 + Math.sin(angle) * 25}
                                        r="2.5"
                                        fill={colors.accent2}
                                      />
                                    );
                                  })}
                                </g>
                                
                                {/* Third circle - countrymen */}
                                <g style={{ opacity: 0.5 }}>
                                  {[...Array(12)].map((_, i) => {
                                    const angle = i * Math.PI / 6;
                                    return (
                                      <circle 
                                        key={i}
                                        cx={60 + Math.cos(angle) * 35}
                                        cy={60 + Math.sin(angle) * 35}
                                        r="2"
                                        fill={colors.accent3}
                                      />
                                    );
                                  })}
                                </g>
                                
                                {/* Outer circle - distant others */}
                                <g style={{ opacity: 0.3 }}>
                                  {[...Array(20)].map((_, i) => {
                                    const angle = i * Math.PI / 10;
                                    return (
                                      <circle 
                                        key={i}
                                        cx={60 + Math.cos(angle) * 45}
                                        cy={60 + Math.sin(angle) * 45}
                                        r="1.5"
                                        fill={colors.accent4}
                                      />
                                    );
                                  })}
                                </g>
                                
                                {/* Legend */}
                                <g transform="translate(25, 95)">
                                  <circle cx="0" cy="0" r="3" fill={colors.accent1} />
                                  <text x="5" y="3" fontSize="5" fill={colors.text}>Close</text>
                                  
                                  <circle cx="25" cy="0" r="3" fill={colors.accent3} opacity="0.5" />
                                  <text x="30" y="3" fontSize="5" fill={colors.text}>Distant</text>
                                </g>
                                
                                {/* Title */}
                                <text x="60" y="110" fontSize="6" fill={colors.text} textAnchor="middle">
                                  Moral concern fades with distance
                                </text>
                              </svg>
                            </div>
                          )}
                          
                          {/* Consumption vs Life-saving comparison */}
                          {section.visual.type === 'comparison' && section.id === 'consumption' && (
                            <div className="w-full h-full p-4 flex items-center justify-center">
                              <svg className="w-full h-full max-w-xs" viewBox="0 0 120 120">
                                {/* Dividing line */}
                                <line x1="60" y1="10" x2="60" y2="110" stroke={colors.border} strokeWidth="1" strokeDasharray="3,3" />
                                
                                {/* Luxury side */}
                                <g transform="translate(30, 30)">
                                  <rect x="-20" y="-15" width="40" height="30" rx="3" fill={colors.surface2} />
                                  
                                  {/* Car icon */}
                                  <path d="M-15,-5 L15,-5 L12,5 L-12,5 Z" fill={colors.accent4} />
                                  <rect x="-10" y="-10" width="20" height="10" rx="2" fill={colors.accent4} />
                                  <circle cx="-8" cy="5" r="3" fill={colors.surface3} />
                                  <circle cx="8" cy="5" r="3" fill={colors.surface3} />
                                  
                                  <text x="0" y="20" fontSize="6" fill={colors.text} textAnchor="middle">Luxury car</text>
                                  <text x="0" y="27" fontSize="7" fill={colors.accent4} textAnchor="middle">$35,000</text>
                                </g>
                                
                                {/* Life-saving side with multiple people to show scale */}
                                <g transform="translate(90, 30)">
                                  <rect x="-20" y="-15" width="40" height="30" rx="3" fill={colors.surface2} />
                                  
                                  {/* People icons in a grid */}
                                  {[...Array(10)].map((_, i) => {
                                    const col = i % 5;
                                    const row = Math.floor(i / 5);
                                    return (
                                      <g key={i} transform={`translate(${-10 + col * 5}, ${-5 + row * 10})`}>
                                        <circle cx="0" cy="-1" r="1" fill={colors.accent2} />
                                        <path d="M0,0 L0,4 M-1,2 L1,2 M-1,6 L1,6" stroke={colors.accent2} strokeWidth="0.5" />
                                      </g>
                                    );
                                  })}
                                  
                                  <text x="0" y="20" fontSize="6" fill={colors.text} textAnchor="middle">Save 10 lives</text>
                                  <text x="0" y="27" fontSize="7" fill={colors.accent2} textAnchor="middle">$35,000</text>
                                </g>
                                
                                {/* Equal sign */}
                                <g transform="translate(60, 30)">
                                  <circle cx="0" cy="0" r="8" fill={colors.surface1} />
                                  <text x="0" y="3" fontSize="12" fill={colors.accent3} textAnchor="middle">=</text>
                                </g>
                                
                                {/* Second comparison */}
                                <g transform="translate(30, 80)">
                                  <rect x="-20" y="-15" width="40" height="30" rx="3" fill={colors.surface2} />
                                  
                                  {/* Kitchen icon */}
                                  <rect x="-15" y="-10" width="30" height="5" fill={colors.accent4} />
                                  <rect x="-12" y="-5" width="5" height="10" fill={colors.accent4} />
                                  <rect x="-2" y="-5" width="4" height="10" fill={colors.accent4} />
                                  <rect x="7" y="-5" width="5" height="10" fill={colors.accent4} />
                                  
                                  <text x="0" y="20" fontSize="6" fill={colors.text} textAnchor="middle">Kitchen remodel</text>
                                  <text x="0" y="27" fontSize="7" fill={colors.accent4} textAnchor="middle">$20,000</text>
                                </g>
                                
                                <g transform="translate(90, 80)">
                                  <rect x="-20" y="-15" width="40" height="30" rx="3" fill={colors.surface2} />
                                  
                                  {/* Mosquito nets with people */}
                                  <path d="M-15,-8 C-15,-5 -5,-5 -5,-8" fill="none" stroke={colors.accent2} strokeWidth="0.5" />
                                  <path d="M-5,-8 C-5,-5 5,-5 5,-8" fill="none" stroke={colors.accent2} strokeWidth="0.5" />
                                  <path d="M5,-8 C5,-5 15,-5 15,-8" fill="none" stroke={colors.accent2} strokeWidth="0.5" />
                                  
                                  {/* People icons */}
                                  {[...Array(6)].map((_, i) => {
                                    const x = -12 + i * 5;
                                    return (
                                      <g key={i} transform={`translate(${x}, 0)`}>
                                        <circle cx="0" cy="-1" r="1" fill={colors.accent2} />
                                        <path d="M0,0 L0,4 M-1,2 L1,2 M-1,6 L1,6" stroke={colors.accent2} strokeWidth="0.5" />
                                      </g>
                                    );
                                  })}
                                  
                                  <text x="0" y="20" fontSize="6" fill={colors.text} textAnchor="middle">Save 6 lives</text>
                                  <text x="0" y="27" fontSize="7" fill={colors.accent2} textAnchor="middle">$20,000</text>
                                </g>
                                
                                {/* Equal sign */}
                                <g transform="translate(60, 80)">
                                  <circle cx="0" cy="0" r="8" fill={colors.surface1} />
                                  <text x="0" y="3" fontSize="12" fill={colors.accent3} textAnchor="middle">=</text>
                                </g>
                              </svg>
                            </div>
                          )}
                          
                          {/* Moral accounting framework */}
                          {section.visual.type === 'framework' && (
                            <div className="w-full h-full p-4 flex items-center justify-center">
                              <svg className="w-full h-full max-w-xs" viewBox="0 0 120 120">
                                {/* Background grid */}
                                <rect x="10" y="10" width="100" height="80" fill="none" stroke={colors.border} strokeWidth="0.5" strokeDasharray="2,2" />
                                
                                {/* Horizontal sections */}
                                <line x1="10" y1="50" x2="110" y2="50" stroke={colors.border} strokeWidth="1" />
                                <text x="15" y="20" fontSize="6" fill={colors.text}>Personal needs</text>
                                <text x="15" y="60" fontSize="6" fill={colors.text}>Effective giving</text>
                                
                                {/* Decision framework */}
                                <g transform="translate(40, 30)">
                                  <circle cx="0" cy="0" r="15" fill="none" stroke={colors.accent1} strokeWidth="1.5" />
                                  <text x="0" y="3" fontSize="5" fill={colors.accent1} textAnchor="middle">Self-care</text>
                                  <text x="0" y="-5" fontSize="5" fill={colors.accent1} textAnchor="middle">Basic needs</text>
                                  <text x="0" y="11" fontSize="5" fill={colors.accent1} textAnchor="middle">Development</text>
                                </g>
                                
                                <g transform="translate(80, 30)">
                                  <circle cx="0" cy="0" r="10" fill="none" stroke={colors.accent4} strokeWidth="1" />
                                  <text x="0" y="3" fontSize="5" fill={colors.accent4} textAnchor="middle">Luxuries</text>
                                </g>
                                
                                <g transform="translate(40, 70)">
                                  <circle cx="0" cy="0" r="10" fill="none" stroke={colors.accent2} strokeWidth="1.5" />
                                  <text x="0" y="3" fontSize="5" fill={colors.accent2} textAnchor="middle">Direct aid</text>
                                </g>
                                
                                <g transform="translate(80, 70)">
                                  <circle cx="0" cy="0" r="15" fill="none" stroke={colors.accent3} strokeWidth="1.5" />
                                  <text x="0" y="-5" fontSize="5" fill={colors.accent3} textAnchor="middle">Systemic</text>
                                  <text x="0" y="3" fontSize="5" fill={colors.accent3} textAnchor="middle">change</text>
                                  <text x="0" y="11" fontSize="5" fill={colors.accent3} textAnchor="middle">advocacy</text>
                                </g>
                                
                                {/* Flow arrows */}
                                <g>
                                  <path 
                                    d="M40,45 L40,55" 
                                    fill="none" 
                                    stroke={colors.accent1} 
                                    strokeWidth="1.5" 
                                    markerEnd="url(#arrowMarker)"
                                  />
                                  
                                  <path 
                                    d="M80,40 L80,55" 
                                    fill="none" 
                                    stroke={colors.accent4} 
                                    strokeWidth="1" 
                                    strokeDasharray="3,3"
                                    markerEnd="url(#arrowMarker)"
                                  />
                                  
                                  <defs>
                                    <marker id="arrowMarker" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                                      <polygon points="0 0, 10 3.5, 0 7" fill={colors.accent1} />
                                    </marker>
                                  </defs>
                                </g>
                                
                                {/* Percentage suggestions */}
                                <g transform="translate(60, 100)">
                                  <text x="-25" y="0" fontSize="6" fill={colors.accent1} textAnchor="middle">80%</text>
                                  <text x="0" y="0" fontSize="5" fill={colors.text}>Personal needs</text>
                                  <text x="25" y="0" fontSize="6" fill={colors.accent2} textAnchor="middle">20%</text>
                                  <text x="50" y="0" fontSize="5" fill={colors.text}>Giving</text>
                                </g>
                              </svg>
                            </div>
                          )}
                          
                          {/* Generic fallback for other visual types */}
                          {![
                            'timeline', 'interactive', 'model', 'entropy', 
                            'network', 'evolution', 'balance', 'structure', 
                            'branching', 'data', 'distance', 'comparison', 
                            'framework'
                          ].includes(section.visual.type) && (
                            <div className="text-center p-4">
                              <div className="text-xs uppercase tracking-wider" style={{ color: colors.textSecondary }}>
                                {section.visual.type}
                              </div>
                              <div className="mt-2 text-sm px-4">
                                {section.visual.description}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Text content */}
                        <div className="w-full md:w-3/5">
                          <div 
                            className="text-base leading-relaxed"
                            onMouseUp={handleTextSelect}
                          >
                            {section.content}
                          </div>
                          
                          {/* Quote if available */}
                          {section.quote && (
                            <div 
                              className="relative mt-6 p-4 rounded-md"
                              style={{ 
                                background: colors.surface2,
                                borderLeft: `3px solid ${index % 2 === 0 ? colors.accent2 : colors.accent1}`
                              }}
                            >
                              <div 
                                className="absolute -top-3 -left-1 text-4xl opacity-30"
                                style={{ color: index % 2 === 0 ? colors.accent2 : colors.accent1 }}
                              >
                                "
                              </div>
                              <p className="text-sm italic">{section.quote}</p>
                              {section.quoteAuthor && (
                                <p className="text-xs mt-2 text-right" style={{ color: colors.textSecondary }}>
                                  — {section.quoteAuthor}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* References */}
            <div 
              className="mt-10 rounded-lg p-5"
              style={{ background: colors.surface1 }}
            >
              <h3 className="text-lg font-medium mb-3" style={{ color: colors.accent2 }}>References</h3>
              <ul className="space-y-2">
                {full.references.map((ref, index) => (
                  <li key={index} className="text-sm" style={{ color: colors.textSecondary }}>
                    {ref.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div 
            className="prose prose-lg prose-invert mx-auto p-6 rounded-lg"
            style={{ background: colors.surface1 }}
            onMouseUp={handleTextSelect}
          >
            {/* Pure text version for reading */}
            {full.sections.map((section) => (
              <div key={section.id} className="mb-8">
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.accent1 }}>{section.title}</h3>
                <p className="mb-4">{section.content}</p>
                
                {section.quote && (
                  <blockquote 
                    className="border-l-4 pl-4 italic my-6"
                    style={{ borderColor: colors.accent2 }}
                  >
                    <p className="text-base">{section.quote}</p>
                    {section.quoteAuthor && (
                      <footer className="text-sm" style={{ color: colors.textSecondary }}>
                        — {section.quoteAuthor}
                      </footer>
                    )}
                  </blockquote>
                )}
              </div>
            ))}
            
            <div className="mt-10 pt-6 border-t" style={{ borderColor: colors.border }}>
              <h3 className="text-lg font-medium mb-3" style={{ color: colors.accent2 }}>References</h3>
              <ul className="space-y-2 list-none pl-0">
                {full.references.map((ref, index) => (
                  <li key={index} className="text-sm" style={{ color: colors.textSecondary }}>
                    {ref.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Responses Component
  const ResponsesComponent = () => {
    const { responses } = currentContent;
    
    return (
      <div 
        className="w-full max-w-3xl mx-auto mt-6 rounded-lg overflow-hidden animation-slide-up"
        style={{ 
          background: colors.surface1, 
          animation: 'slideUp 0.3s ease-out forwards'
        }}
      >
        <div className="px-5 py-4 border-b" style={{ borderColor: colors.border }}>
          <div className="flex justify-between items-center">
            <h3 className="font-medium" style={{ color: colors.accent2 }}>Responses</h3>
            <span className="text-sm" style={{ color: colors.textSecondary }}>
              {responses.length} total
            </span>
          </div>
        </div>
        
        <div className="divide-y" style={{ borderColor: colors.border }}>
          {responses.map((response) => (
            <div key={response.id} className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img src={response.avatar} alt={response.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-medium">{response.author}</div>
                    <div className="text-xs" style={{ color: colors.textSecondary }}>
                      {formatDate(response.dateCreated)}
                    </div>
                  </div>
                </div>
                <div 
                  className="flex items-center px-2 py-1 rounded"
                  style={{ background: colors.surface2 }}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span className="text-sm">{response.votes}</span>
                </div>
              </div>
              
              <div className="text-sm mb-3">{response.text}</div>
              
              {response.citations.length > 0 && (
                <div 
                  className="text-xs italic p-2 rounded-md"
                  style={{ background: colors.surface2 }}
                >
                  <span style={{ color: colors.accent2 }}>Cited: </span>
                  {response.citations.map(citation => citation.text).join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Add response form */}
        <div className="p-5">
          <div className="mb-3">
            <div className="text-sm font-medium mb-2">Add your response</div>
            <textarea 
              rows="4" 
              placeholder="Share your thoughts..."
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 text-base"
              style={{ 
                background: colors.surface2,
                border: `1px solid ${colors.border}`,
                color: colors.text
              }}
              onClick={(e) => e.stopPropagation()}
            ></textarea>
          </div>
          <div className="flex justify-between items-center">
            <button 
              className="text-sm flex items-center"
              style={{ color: colors.accent2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Add citation
            </button>
            <button 
              className="px-4 py-2 rounded-md text-sm"
              style={{ 
                background: colors.accent1,
                color: "#1A1A2E",
                fontWeight: 500
              }}
              onClick={(e) => e.stopPropagation()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Text selection tools
  const TextSelectionTools = () => {
    if (!highlightedText) return null;
    
    return (
      <div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 rounded-lg p-4 z-50 flex space-x-4"
        style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
      >
        <button 
          className="p-2 rounded-full"
          style={{ background: colors.accent1 }}
          onClick={() => setHighlightedText(null)}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
        
        <button 
          className="p-2 rounded-full"
          style={{ background: colors.accent2 }}
          onClick={() => setHighlightedText(null)}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
        
        <button 
          className="p-2 rounded-full"
          style={{ background: colors.surface2 }}
          onClick={() => setHighlightedText(null)}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
      </div>
    );
  };
  
  return (
    <div 
      className="min-h-screen w-full flex flex-col relative"
      style={{ 
        background: colors.gradient,
        color: colors.text,
        fontFamily: "'Inter', system-ui, sans-serif"
      }}
    >
      {/* Creator info - fades in/out */}
      <div 
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 flex items-center justify-center p-2 rounded-full backdrop-blur-sm transition-opacity duration-300"
        style={{ 
          background: 'rgba(0, 0, 0, 0.4)',
          opacity: showControls ? 1 : 0,
          pointerEvents: showControls ? 'auto' : 'none',
          borderLeft: `2px solid ${colors.accent1}`,
          borderRight: `2px solid ${colors.accent2}`
        }}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
            <img src={currentContent.creatorAvatar} alt={currentContent.creator} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-xs font-medium">{currentContent.creator}</div>
            <div className="text-xs opacity-60">{currentContent.discipline}</div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <main className="flex-1 flex flex-col relative overflow-hidden" ref={contentRef}>
        {/* Content container with transitions */}
        <div 
          className={`flex-1 ${getContentTransitionClasses()}`}
          style={{
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          {/* Dynamic content based on depth */}
          {currentDepth === 0 && <HookContent />}
          {currentDepth === 1 && <MainContent />}
          {currentDepth === 2 && <FullContent />}
          
          {/* Responses section */}
          {currentDepth === 2 && showResponses && <ResponsesComponent />}
        </div>
      </main>
      
      {/* Text selection tools */}
      {highlightedText && <TextSelectionTools />}
      
      {/* Floating depth indicator */}
      <div 
        className="fixed bottom-24 right-6 z-40 transition-opacity duration-300"
        style={{ 
          opacity: showControls ? 1 : 0,
          pointerEvents: showControls ? 'auto' : 'none'
        }}
      >
        <div 
          className="flex flex-col items-center p-1 rounded-full"
          style={{ background: colors.surface3, backdropFilter: 'blur(8px)' }}
        >
          {['Hook', 'Main', 'Full'].map((depth, index) => (
            <button
              key={depth}
              className={`w-10 h-10 rounded-full flex items-center justify-center my-1 transition-all duration-200 ${currentDepth === index ? 'scale-110' : 'opacity-60'}`}
              style={{ 
                background: currentDepth === index ? 
                  index === 0 ? colors.accent1 : 
                  index === 1 ? colors.accent2 : 
                  colors.accent3 : 
                  'transparent',
                color: currentDepth === index ? '#1A1A2E' : colors.text
              }}
              onClick={() => navigateToDepth(index)}
            >
              {index === 0 ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ) : index === 1 ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content index - small dots at bottom */}
      <div 
        className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-30 transition-opacity duration-300"
        style={{ 
          opacity: showControls ? 1 : 0,
          pointerEvents: showControls ? 'auto' : 'none'
        }}
      >
        <div 
          className="flex items-center space-x-2 px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(8px)' }}
        >
          {contentData.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${currentContentIndex === index ? 'scale-150' : 'opacity-60'}`}
              style={{ 
                background: currentContentIndex === index ? colors.accent1 : colors.surface2,
              }}
              onClick={() => {
                setCurrentDepth(0);
                setCurrentContentIndex(index);
                setShowResponses(false);
              }}
            ></button>
          ))}
        </div>
      </div>
      
      {/* Bottom bar with navigation */}
      <div 
        className="fixed bottom-0 inset-x-0 py-4 px-4 z-30 transition-opacity duration-300"
        style={{ 
          opacity: showControls ? 1 : 0,
          pointerEvents: showControls ? 'auto' : 'none'
        }}
      >
        <div 
          className="max-w-xl mx-auto px-4 py-3 rounded-full backdrop-blur-sm flex justify-between items-center"
          style={{ 
            background: 'rgba(0, 0, 0, 0.4)',
            borderTop: `1px solid ${colors.border}`
          }}
        >
          {/* Navigation tabs */}
          <div className="flex items-center space-x-6">
            <button 
              className="text-sm font-medium flex items-center"
              style={{ color: colors.accent2 }}
              onClick={(e) => {
                e.stopPropagation();
                // For You navigation
              }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              For You
            </button>
            
            <div className="h-4 w-px bg-gray-700"></div>
            
            <button 
              className="text-sm font-medium flex items-center opacity-60 hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                // Upload navigation
              }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Upload
            </button>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            {/* Response button (only in Full depth) */}
            {currentDepth === 2 && (
              <button 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ 
                  background: showResponses ? colors.accent2 : colors.accent1,
                  color: "#1A1A2E"
                }}
                onClick={() => setShowResponses(!showResponses)}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </button>
            )}
            
            {/* Next content button */}
            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ 
                background: colors.surface1,
                boxShadow: `0 0 10px ${colors.glow1}`
              }}
              onClick={navigateToNextContent}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Initial swipe instruction overlay */}
      <div 
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
        style={{ 
          background: 'rgba(0, 0, 0, 0.7)',
          opacity: 0.9,
          animation: 'fadeOut 2s forwards 3s'
        }}
      >
        <div className="text-center px-4 max-w-md">
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: colors.surface1 }}
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke={colors.accent1}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Explore in Depth</h3>
          <p className="mb-8 text-sm opacity-80">
            Swipe left or tap the screen to dive deeper into content.
            Swipe up for the next post.
          </p>
          <div className="flex justify-center items-center space-x-12">
            <div className="flex flex-col items-center">
              <div className="text-sm mb-2" style={{ color: colors.accent2 }}>Swipe left</div>
              <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10H37M37 10L30 3M37 10L30 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="text-xs mt-2 opacity-60">Deeper content</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-sm mb-2" style={{ color: colors.accent2 }}>Swipe up</div>
              <svg width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 37V3M10 3L3 10M10 3L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="text-xs mt-2 opacity-60">Next post</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeOut {
          from { opacity: 0.9; }
          to { opacity: 0; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes rotateClock {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes expandTimeline {
          from { width: 0; }
          to { width: 80%; }
        }
        
        @keyframes moveLeftRight {
          from { left: 10%; }
          to { left: 70%; }
        }
        
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        
        @keyframes rotate3d {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        
        @keyframes moveScalePan1 {
          0% { transform: translateY(0); }
          100% { transform: translateY(5px); }
        }
        
        @keyframes moveScalePan2 {
          0% { transform: translateY(0); }
          100% { transform: translateY(-5px); }
        }
        
        @keyframes tiltBalance {
          0% { transform: rotate(-2deg); }
          100% { transform: rotate(2deg); }
        }
        
        @keyframes moveVertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }
        
        @keyframes dash {
          to {
            stroke-dashoffset: 10;
          }
        }
        
        @keyframes moveTrolley {
          0% { transform: translateX(-20px); }
          50% { transform: translateX(0); }
          100% { transform: translateX(30px); }
        }
        
        @keyframes moveCircular {
          0% { transform: rotate(0deg) translateX(8px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(8px) rotate(-360deg); }
        }
        
        @keyframes shrink {
          0% { transform: scale(1); }
          100% { transform: scale(0.7); opacity: 0.7; }
        }
        
        @keyframes expand {
          0% { transform: scale(1); }
          100% { transform: scale(1.3); }
        }
        
        @keyframes moveUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20px); }
        }
        
        @keyframes networkFailure {
          0% { opacity: 0; }
          25% { opacity: 1; }
          75% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        @keyframes moveSlightly {
          0% { transform: translate(0, 0); }
          100% { transform: translate(2px, 2px); }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes randomEvolution1 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-3px, 4px); }
          50% { transform: translate(5px, -2px); }
          75% { transform: translate(-4px, -3px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes randomEvolution2 {
          0% { transform: translate(0, 0); }
          25% { transform: translate(4px, 3px); }
          50% { transform: translate(-2px, 5px); }
          75% { transform: translate(3px, -5px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes randomEvolution3 {
          0% { transform: translate(0, 0); }
          20% { transform: translate(-5px, -3px); }
          40% { transform: translate(2px, 4px); }
          60% { transform: translate(-3px, 2px); }
          80% { transform: translate(4px, -3px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes randomEvolution4 {
          0% { transform: translate(0, 0); }
          30% { transform: translate(3px, 5px); }
          60% { transform: translate(-5px, -4px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes eliminateVariation {
          0% { opacity: 0.8; r: 1.5; }
          60% { opacity: 0.8; r: 1.5; }
          70% { opacity: 0.6; r: 2; fill: #F97B5C; }
          80% { opacity: 0.3; r: 1; fill: #F97B5C; }
          100% { opacity: 0; r: 0; }
        }
        
        @keyframes survive {
          0% { r: 2; }
          20% { r: 2.5; }
          40% { r: 2; }
          60% { r: 3; }
          80% { r: 2.5; }
          100% { r: 2; }
        }
        
        @keyframes selectionWave {
          0% { stroke-dashoffset: 0; opacity: 0.4; }
          50% { stroke-dashoffset: -20; opacity: 1; }
          100% { stroke-dashoffset: -40; opacity: 0.4; }
        }
        
        @keyframes selectionRing {
          0%, 10% { r: 10; opacity: 0.3; stroke-width: 1; }
          30% { r: 20; opacity: 0.8; stroke-width: 2; }
          50% { r: 30; opacity: 0.9; stroke-width: 2; }
          70% { r: 37; opacity: 0.7; stroke-width: 1.5; }
          90%, 100% { r: 40; opacity: 0.2; stroke-width: 1; }
        }
        
        @keyframes eliminationFlash {
          0% { r: 0; stroke-width: 0; opacity: 0; }
          40% { r: 4; stroke-width: 2; opacity: 0.8; }
          100% { r: 6; stroke-width: 0; opacity: 0; }
        }
        
        @keyframes fadeInOut {
          0%, 15% { opacity: 0; }
          25%, 75% { opacity: 1; }
          85%, 100% { opacity: 0; }
        }
        
        @keyframes cycleText {
          0%, 10% { opacity: 0.7; }
          15% { opacity: 0; }
          90% { opacity: 0; }
          95%, 100% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default EnhancedForYouPage;