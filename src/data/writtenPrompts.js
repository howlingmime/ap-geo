// AP Human Geography - Free-Response style written prompts.
// Each rubric item is "addressed" if the response contains at least one
// keyword from any of its keyword groups (case-insensitive substring match).
// Groups are alternates/synonyms; the response only needs ONE per item.

export const writtenPrompts = [
  {
    id: 1,
    unit: 1,
    prompt:
      "Geographers use different types of regions to organize and analyze space. Define formal, functional, and perceptual (vernacular) regions, and provide a real-world example of each. Then, explain how the boundaries of these regions differ in clarity and stability.",
    guidance:
      "Strong responses define each region type clearly, give a concrete example for each, and explicitly compare how their boundaries are drawn or perceived (measurable vs. node-based vs. attitude-based).",
    rubric: [
      {
        description: "Define formal region (uniform/measurable trait)",
        keywords: [["formal region", "uniform region"], ["measurable", "shared", "uniform", "homogeneous"]]
      },
      {
        description: "Define functional region (organized around a node)",
        keywords: [["functional region", "nodal region"], ["node", "central", "focal", "hub", "around"]]
      },
      {
        description: "Define perceptual/vernacular region",
        keywords: [["perceptual region", "vernacular region"], ["perception", "feeling", "attitude", "identity", "cultural identity"]]
      },
      {
        description: "Give a concrete example of at least one region",
        keywords: [["midwest", "the south", "bible belt", "corn belt", "dairy belt", "metropolitan", "delivery area", "tv station", "newspaper", "pizza delivery"]]
      },
      {
        description: "Compare boundary clarity or stability across types",
        keywords: [["boundary", "boundaries", "border"], ["clear", "fuzzy", "overlap", "subjective", "objective", "blurred", "vary", "stable"]]
      }
    ]
  },
  {
    id: 2,
    unit: 2,
    prompt:
      "Using the Demographic Transition Model (DTM), describe how a country's birth rates, death rates, and total population change as it moves from Stage 2 to Stage 4. Then, explain TWO social or economic factors that drive this transition.",
    guidance:
      "Strong responses track CBR, CDR, and population growth across stages, and connect the transition to causes such as industrialization, urbanization, women's education, or improved healthcare.",
    rubric: [
      {
        description: "Describe Stage 2 (high CBR, falling CDR, rapid growth)",
        keywords: [["stage 2"], ["high birth", "high cbr", "falling death", "declining death", "rapid growth", "population explosion"]]
      },
      {
        description: "Describe Stage 3 (declining CBR)",
        keywords: [["stage 3"], ["declining birth", "falling birth", "birth rate drops", "cbr declines", "cbr falls"]]
      },
      {
        description: "Describe Stage 4 (low CBR and CDR, slow/stable growth)",
        keywords: [["stage 4"], ["low birth", "low cbr", "low death", "stable", "slow growth", "zero population growth"]]
      },
      {
        description: "Identify a social/economic driver (industrialization, urbanization, education)",
        keywords: [["industrialization", "industrialisation", "urbanization", "urbanisation", "education", "women's education", "female education", "literacy"]]
      },
      {
        description: "Identify a healthcare or sanitation driver",
        keywords: [["healthcare", "health care", "medicine", "medical", "sanitation", "vaccin", "clean water", "nutrition"]]
      }
    ]
  },
  {
    id: 3,
    unit: 3,
    prompt:
      "Cultural traits spread across the globe through different processes of diffusion. Define expansion diffusion and relocation diffusion. Then, describe TWO subtypes of expansion diffusion (such as hierarchical, contagious, or stimulus) and provide a real-world example for each subtype.",
    guidance:
      "Strong responses clearly distinguish expansion (idea stays at origin) from relocation (people physically move), define two subtypes, and connect each to a concrete example (e.g., fashion trends from major cities, viral memes, McDonald's adapting menus).",
    rubric: [
      {
        description: "Define expansion diffusion (idea spreads while remaining at origin)",
        keywords: [["expansion diffusion"], ["remains", "stays at origin", "outward", "still strong", "remain strong"]]
      },
      {
        description: "Define relocation diffusion (physical movement of people)",
        keywords: [["relocation diffusion"], ["movement of people", "migration", "physically move", "carry with them", "migrants"]]
      },
      {
        description: "Define hierarchical diffusion",
        keywords: [["hierarchical diffusion"], ["large to small", "authority", "powerful", "major cities", "trickle down", "top down"]]
      },
      {
        description: "Define contagious diffusion",
        keywords: [["contagious diffusion"], ["direct contact", "rapidly", "viral", "disease", "person to person", "everyone"]]
      },
      {
        description: "Define stimulus diffusion or give a concrete example",
        keywords: [["stimulus diffusion"], ["adapted", "modified", "altered", "underlying idea", "mcdonald", "veggie", "local version"]]
      }
    ]
  },
  {
    id: 4,
    unit: 4,
    prompt:
      "Centripetal and centrifugal forces shape the stability of a state. Define both terms. Then, describe ONE specific centripetal force and ONE specific centrifugal force, and explain how each affects national unity using a real-world example.",
    guidance:
      "Strong responses define the two forces, identify concrete examples (shared language, religion, ethnic conflict, devolution movements), and explicitly link each force to its effect on unity or division.",
    rubric: [
      {
        description: "Define centripetal force (unifies the state)",
        keywords: [["centripetal"], ["unify", "unite", "strengthen", "binds", "holds together", "national unity"]]
      },
      {
        description: "Define centrifugal force (divides the state)",
        keywords: [["centrifugal"], ["divide", "weaken", "split", "fragment", "pull apart", "destabilize"]]
      },
      {
        description: "Identify a specific centripetal force (language, religion, common enemy, etc.)",
        keywords: [["common language", "shared language", "national language", "shared religion", "common enemy", "national identity", "patriotism", "shared history", "currency"]]
      },
      {
        description: "Identify a specific centrifugal force (ethnic conflict, devolution, etc.)",
        keywords: [["ethnic conflict", "devolution", "separatist", "secession", "sectarian", "religious conflict", "economic inequality", "linguistic divide"]]
      },
      {
        description: "Give a real-world example country/region",
        keywords: [["belgium", "spain", "catalonia", "scotland", "united kingdom", "uk", "canada", "quebec", "yugoslavia", "sudan", "ukraine", "switzerland", "nigeria", "iraq", "syria"]]
      }
    ]
  },
  {
    id: 5,
    unit: 5,
    prompt:
      "Von Thünen's model explains the spatial pattern of agricultural land use around a central market. Describe the assumptions of the model, identify the order of the rings from the market outward, and explain ONE limitation of the model in the modern world.",
    guidance:
      "Strong responses note isolated state assumptions (flat terrain, single market, equal transport access), name the rings in order (dairy/horticulture, forestry, grains, ranching), and identify a real limitation such as refrigeration, globalization, or transportation changes.",
    rubric: [
      {
        description: "State at least one assumption (isolated state, flat, equal transport, etc.)",
        keywords: [["isolated state", "flat", "uniform", "single market", "one market", "equal transport", "no barriers", "rational farmers"]]
      },
      {
        description: "Identify the innermost ring (dairy / market gardening / horticulture)",
        keywords: [["dairy", "market gardening", "horticulture", "intensive farming", "perishable"]]
      },
      {
        description: "Identify the forestry/timber ring",
        keywords: [["forest", "forestry", "timber", "firewood", "wood"]]
      },
      {
        description: "Identify grains and then ranching/livestock farther out",
        keywords: [["grain", "wheat", "crop rotation", "extensive"], ["ranching", "livestock", "cattle", "grazing"]]
      },
      {
        description: "Explain a modern limitation (refrigeration, transport, globalization)",
        keywords: [["refrigeration", "transportation", "globalization", "globalisation", "highways", "interstate", "air freight", "supermarket", "outdated", "modern technology"]]
      }
    ]
  },
  {
    id: 6,
    unit: 6,
    prompt:
      "Compare the Concentric Zone Model (Burgess) and the Sector Model (Hoyt) of urban land use. Describe the structure of each model and explain ONE strength and ONE weakness of using these models to analyze modern cities.",
    guidance:
      "Strong responses describe Burgess as rings around a CBD and Hoyt as wedges/sectors following transport corridors, and weigh strengths (simplicity, historic insight) against weaknesses (US-centric, ignore edge cities, suburbanization, multiple nuclei).",
    rubric: [
      {
        description: "Describe Burgess Concentric Zone Model (rings around CBD)",
        keywords: [["concentric", "burgess"], ["ring", "rings", "circle", "zones", "outward", "around the cbd"]]
      },
      {
        description: "Describe Hoyt Sector Model (wedges along transportation)",
        keywords: [["sector model", "hoyt"], ["wedge", "wedges", "sector", "transportation", "transport corridor", "rail", "highway", "pie"]]
      },
      {
        description: "Identify the CBD as the central element of both",
        keywords: [["cbd", "central business district"], ["center", "core", "downtown", "heart"]]
      },
      {
        description: "Give a strength (simplicity, historical accuracy, generalization)",
        keywords: [["simple", "simplicity", "easy to understand", "historical", "useful", "general pattern", "industrial era", "chicago"]]
      },
      {
        description: "Give a weakness (suburbanization, edge cities, US-centric)",
        keywords: [["suburbanization", "edge city", "edge cities", "sprawl", "outdated", "us-centric", "western", "developing world", "global south", "multiple nuclei", "gentrification"]]
      }
    ]
  },
  {
    id: 7,
    unit: 7,
    prompt:
      "Wallerstein's World Systems Theory divides the world into core, semi-periphery, and periphery countries. Define each category, give an example country for each, and explain how the relationships among these regions create and maintain global economic inequality.",
    guidance:
      "Strong responses define each tier by economic role (high-skill manufacturing/finance vs. raw materials/cheap labor), give plausible examples (US/Germany; Brazil/Mexico/India; Sub-Saharan Africa), and connect the structure to dependency, exploitation, or unequal exchange.",
    rubric: [
      {
        description: "Define core (advanced, capital-intensive, high skill)",
        keywords: [["core"], ["advanced", "wealthy", "high skill", "developed", "capital", "manufacturing", "finance", "headquarters", "innovation"]]
      },
      {
        description: "Define semi-periphery (middle, transitioning, mixed)",
        keywords: [["semi-periphery", "semiperiphery", "semi periphery"], ["middle", "industrializing", "transitioning", "mixed", "between", "newly industrialized"]]
      },
      {
        description: "Define periphery (raw materials, cheap labor, dependent)",
        keywords: [["periphery"], ["raw materials", "cheap labor", "low wage", "dependent", "exploited", "extractive", "agriculture"]]
      },
      {
        description: "Give a real-world example country for at least one tier",
        keywords: [["united states", "usa", "germany", "japan", "uk", "france", "brazil", "mexico", "india", "china", "south africa", "indonesia", "sub-saharan", "ethiopia", "nigeria", "haiti", "bangladesh"]]
      },
      {
        description: "Explain inequality / dependency / exploitation between tiers",
        keywords: [["inequality", "exploit", "unequal", "dependency", "dependent", "extraction", "outsourc", "neocolonial", "uneven development", "global division of labor"]]
      }
    ]
  }
];

// Returns { score, total, hits, misses, percentage }
export function gradeResponse(prompt, response) {
  const text = (response || "").toLowerCase();
  const hits = [];
  const misses = [];

  prompt.rubric.forEach((item) => {
    // Each item has one or more keyword groups; ALL groups must match for the
    // item to count as addressed (groups are AND, alternates within a group are OR).
    const allGroupsMatched = item.keywords.every((group) =>
      group.some((kw) => text.includes(kw.toLowerCase()))
    );
    if (allGroupsMatched) {
      hits.push(item.description);
    } else {
      misses.push(item.description);
    }
  });

  const score = hits.length;
  const total = prompt.rubric.length;
  const percentage = total === 0 ? 0 : Math.round((score / total) * 100);

  let feedback;
  if (percentage === 100) {
    feedback = "Outstanding — your response addressed every rubric point an AP reader would look for.";
  } else if (percentage >= 80) {
    feedback = "Strong response. You hit most rubric points — tighten up the missing pieces and you're at full marks.";
  } else if (percentage >= 60) {
    feedback = "Solid foundation. You covered the core ideas but missed some required components.";
  } else if (percentage >= 40) {
    feedback = "Partial credit. Revisit the missed rubric points and try to weave specific terminology and examples into your answer.";
  } else {
    feedback = "Keep practicing. Use precise AP HuG vocabulary and address each part of the prompt directly.";
  }

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lengthNote =
    wordCount < 60
      ? "Tip: AP free responses are usually a paragraph or more — aim for 80+ words to fully develop your ideas."
      : null;

  return { score, total, percentage, hits, misses, feedback, lengthNote, wordCount };
}

export function getPromptForUnit(unitId) {
  return writtenPrompts.find((p) => p.unit === unitId) || null;
}

export default writtenPrompts;
