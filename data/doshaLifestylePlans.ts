export interface OverviewCharacteristic {
  characteristic: string;
  description: string;
}

export interface RoutineActivity {
  time: string;
  activity: string;
  details: string;
}

export interface LifestyleTip {
  categoryOrAspect: string;
  recommendationOrSuggestion: string;
}

export interface RitucharyaDetail {
  season: string;
  keyTips: string;
}

export interface SupportiveHerb {
  herb: string;
  action: string;
}

export interface LifestylePlan {
  id: string;
  name: string;
  overviewCharacteristics: OverviewCharacteristic[];
  dailyRoutine: RoutineActivity[];
  dietRecommendedTitle?: string;
  dietRecommended: string[];
  dietAvoidTitle?: string;
  dietAvoid: string[];
  lifestyleTipsTitle?: string;
  lifestyleTips: LifestyleTip[];
  ritucharyaTitle?: string;
  ritucharyaSpecialCaution?: string;
  ritucharyaDetails: RitucharyaDetail[];
  supportiveHerbsTitle?: string;
  supportiveHerbs: SupportiveHerb[];
  recommendedOilsTitle?: string;
  recommendedOils: string[];
}

export const doshaLifestylePlans: LifestylePlan[] = [
  {
    id: "vata",
    name: "Vata Prakriti Lifestyle Plan",
    overviewCharacteristics: [
      { characteristic: "Dominant Dosha", description: "Vata (Air + Ether)" },
      { characteristic: "Body Type", description: "Thin, dry skin, cold hands and feet" },
      { characteristic: "Digestion", description: "Irregular, bloating, gas-prone" },
      { characteristic: "Mind", description: "Creative, energetic, but anxious quickly" },
      { characteristic: "Prone to", description: "Insomnia, dryness, constipation, anxiety" },
      { characteristic: "Needs", description: "Warmth, stability, nourishment" }
    ],
    dailyRoutine: [
      { time: "6–7 AM", activity: "Wake up (not too early)", details: "Avoid exposure to cold air" },
      { time: "7–8 AM", activity: "Warm oil Abhyanga (self-massage)", details: "Use Sesame oil, follow with warm shower" },
      { time: "8–9 AM", activity: "Breakfast", details: "Warm, moist food like oats with ghee, herbal tea" },
      { time: "10–1 PM", activity: "Work or study", details: "Avoid multitasking; keep a calm pace" },
      { time: "1 PM", activity: "Lunch", details: "Main meal: soups, khichdi, cooked veggies with ghee" },
      { time: "2–5 PM", activity: "Light work, hydration", details: "Luke warm water," },
      { time: "6 PM", activity: "Light dinner", details: "Early dinner: soupy or soft foods" },
      { time: "7–8 PM", activity: "Leisure, meditation or light walk", details: "Avoid screens/stress post-sunset" },
      { time: "9–9:30 PM", activity: "Sleep prep", details: "Drink warm milk with nutmeg, head massage, early sleep" }
    ],
    dietRecommendedTitle: "✅ Recommended (Warm, oily, grounding)",
    dietRecommended: [
      "Warm milk with ghee",
      "Ghee, sesame oil",
      "Soups, khichdi, rice, urad dal",
      "Spices: ginger, cumin, hing, ajwain",
      "Seasonal fruits (ripe, sweet)",
      "Sweet, sour, salty tastes"
    ],
    dietAvoidTitle: "❌ Avoid (Dry, cold, rough)",
    dietAvoid: [
      "Raw salads, dry fruits (unless soaked)",
      "Cold water, carbonated drinks",
      "Beans (unless well-cooked with oil)",
      "Bitter & astringent foods in excess",
      "Overuse of leafy greens in raw form",
      "Pungent, bitter, astringent in excess"
    ],
    lifestyleTipsTitle: "🧘‍♀️ Lifestyle Tips",
    lifestyleTips: [
      { categoryOrAspect: "Exercise", recommendationOrSuggestion: "Gentle yoga, slow walking – avoid overexertion" },
      { categoryOrAspect: "Sleep", recommendationOrSuggestion: "Minimum 7–8 hrs, regular bedtime before 10 PM" },
      { categoryOrAspect: "Travel", recommendationOrSuggestion: "Minimize over-travel," },
      { categoryOrAspect: "Stress", recommendationOrSuggestion: "Daily meditation, nasya with warm oil (Anu taila) helpful" },
      { categoryOrAspect: "Sexual Activity", recommendationOrSuggestion: "Moderate; excess drains Vata" },
      { categoryOrAspect: "Seasonal Caution", recommendationOrSuggestion: "Autumn & early winter (Vata season) need extra care" },
      { categoryOrAspect: "Clothing", recommendationOrSuggestion: "Soft, warm, grounding colors like gold, red, earth tones" }
    ],
    ritucharyaTitle: "🌸 Ritucharya for Vata Prakriti",
    ritucharyaSpecialCaution: "Special Caution in: Sharad & Hemant Ritu",
    ritucharyaDetails: [
      { season: "Grishma (Summer)", keyTips: "Stay hydrated, avoid dry foods, coconut water" },
      { season: "Varsha (Monsoon)", keyTips: "Use digestive herbs (ginger, cumin), warm foods" },
      { season: "Sharad (Autumn)", keyTips: "Avoid cooling foods, take Shatavari, Ghee" },
      { season: "Hemant (Early Winter)", keyTips: "Eat heavier, oily foods; do Abhyanga (self-massage) daily" },
      { season: "Shishira (Late Winter)", keyTips: "Maintain warmth; stay nourished" },
      { season: "Vasanta (Spring)", keyTips: "Detox mildly, avoid excessive fasting or raw foods" }
    ],
    supportiveHerbsTitle: "💊 Supportive Herbs for Vata Balance",
    supportiveHerbs: [
      { herb: "Ashwagandha", action: "Anti-anxiety, adaptogen" },
      { herb: "Shatavari", action: "Nourishes tissues, Vata-pacifying" },
      { herb: "Dashamoola", action: "Nervine tonic, balances Vata" },
      { herb: "Brahmi", action: "Mental calmness" },
      { herb: "Trikatu (mild)", action: "Improves digestion (in moderation)" }
    ],
    recommendedOilsTitle: "🧴 Recommended Oils",
    recommendedOils: [
      "Abhyanga: Sesame oil, Bala taila, Ksheerabala taila",
      "Nasya: Anu taila (2 drops in each nostril in the morning)",
      "Shirodhara (if possible): Excellent for Vata"
    ]
  },
  {
    id: "pitta",
    name: "Pitta Prakriti Lifestyle Plan",
    overviewCharacteristics: [
      { characteristic: "Dominant Dosha", description: "Pitta (Fire + Water)" },
      { characteristic: "Body Type", description: "Medium build, warm body, soft skin" },
      { characteristic: "Digestion", description: "Strong appetite, prone to acidity" },
      { characteristic: "Mind", description: "Intelligent, focused, but can be irritable" },
      { characteristic: "Prone to", description: "Anger, inflammation, ulcers, rashes" },
      { characteristic: "Needs", description: "Cooling, calmness, moderation" }
    ],
    dailyRoutine: [
      { time: "5:30–6:30 AM", activity: "Wake up early", details: "Fresh air, pranayama is beneficial" },
      { time: "6:30–7:30 AM", activity: "Light Abhyanga", details: "Use cooling oils like coconut or Chandanadi taila" },
      { time: "8:00 AM", activity: "Breakfast", details: "Sweet fruits, milk, oats with cardamom" },
      { time: "10–1 PM", activity: "Work or study", details: "Manage intensity, take breaks" },
      { time: "1 PM", activity: "Lunch (Main meal)", details: "Cool, balanced foods like rice, ghee, cucumber raita" },
      { time: "2–5 PM", activity: "Productive hours", details: "Stay hydrated with coriander water" },
      { time: "6:30 PM", activity: "Light dinner", details: "Simple foods, avoid oily/spicy items" },
      { time: "7:30 PM", activity: "Walk or cool bath", details: "Meditate, listen to calming music" },
      { time: "9:30 PM", activity: "Sleep", details: "Apply cooling oil to soles/head before bed" }
    ],
    dietRecommendedTitle: "✅ Recommended (Cooling, sweet, light)",
    dietRecommended: [
      "Sweet fruits: mango, grapes, pomegranate",
      "Ghee, coconut oil",
      "Milk, buttermilk, rice, wheat",
      "Spices: fennel, coriander, cardamom",
      "Coriander water, Amla juice"
    ],
    dietAvoidTitle: "❌ Avoid (Hot, oily, spicy)",
    dietAvoid: [
      "Sour citrus, tomato, fermented foods",
      "Mustard oil, too much salt",
      "Fried food, excess meat",
      "Red chili, garlic, mustard",
      "Coffee, alcohol, carbonated drinks"
    ],
    lifestyleTipsTitle: "🧘‍♂️ Lifestyle Tips",
    lifestyleTips: [
      { categoryOrAspect: "Exercise", recommendationOrSuggestion: "Moderate intensity: swimming, cycling, evening walks" },
      { categoryOrAspect: "Sleep", recommendationOrSuggestion: "Sound sleep, avoid late nights" },
      { categoryOrAspect: "Emotions", recommendationOrSuggestion: "Practice mindfulness, gratitude journaling" },
      { categoryOrAspect: "Work Environment", recommendationOrSuggestion: "Cool, non-competitive, non-hostile settings" },
      { categoryOrAspect: "Clothing", recommendationOrSuggestion: "Prefer cottons, white or pastel colors" }
    ],
    ritucharyaTitle: "🌸 Ritucharya for Pitta Prakriti",
    ritucharyaDetails: [
      { season: "Grishma (Summer)", keyTips: "Avoid exposure to sun; drink coconut water, wear light clothes" },
      { season: "Varsha (Monsoon)", keyTips: "Light diet, avoid fermented food" },
      { season: "Sharad (Autumn)", keyTips: "Avoid spicy/oily food, take cooling herbs like Guduchi, Shatavari" },
      { season: "Hemant (Winter)", keyTips: "Increase nourishment but avoid very hot/spicy foods" },
      { season: "Shishira (Late Winter)", keyTips: "Same as Hemant with mild spices only" },
      { season: "Vasanta (Spring)", keyTips: "Detox with light food, Amla, Triphala" }
    ],
    supportiveHerbsTitle: "🌿 Supportive Herbs for Pitta Balance",
    supportiveHerbs: [
      { herb: "Amla", action: "Natural coolant, antioxidant" },
      { herb: "Shatavari", action: "Balances heat, improves immunity" },
      { herb: "Guduchi", action: "Immunomodulator, anti-inflammatory" },
      { herb: "Mustaka", action: "Digestive and cooling" },
      { herb: "Chandan", action: "Soothes nerves and skin" }
    ],
    recommendedOilsTitle: "🧴 Recommended Oils & Therapies",
    recommendedOils: [
      "Abhyanga: Coconut oil, Chandanadi taila, Pinda taila",
      "Nasya: Cooling oils like Brahmi ghee (nasal form) in moderation",
      "Shirodhara: With milk or Brahmi oil for stress relief"
    ]
  },
  {
    id: "kapha",
    name: "Kapha Prakriti Lifestyle Plan",
    overviewCharacteristics: [
      { characteristic: "Dominant Dosha", description: "Kapha (Water + Earth)" },
      { characteristic: "Body Type", description: "Sturdy, well-built, smooth and oily skin" },
      { characteristic: "Digestion", description: "Slow metabolism, tendency toward heaviness" },
      { characteristic: "Mind", description: "Calm, loyal, but may be lethargic or possessive" },
      { characteristic: "Prone to", description: "Weight gain, congestion, sinusitis, lethargy" },
      { characteristic: "Needs", description: "Lightness, warmth" }
    ],
    dailyRoutine: [
      { time: "4:30–5:30 AM", activity: "Wake up early", details: "Avoid oversleeping, start with brisk activity" },
      { time: "5:30–6:30 AM", activity: "Dry Abhyanga", details: "Use warm, stimulating oils like mustard or Katu taila" },
      { time: "7:00 AM", activity: "Warm water + lemon", details: "Stimulates digestion, clears Kapha" },
      { time: "8:00 AM", activity: "Light Breakfast", details: "Warm, spiced foods like porridge with ginger, honey" },
      { time: "10–1 PM", activity: "Active work", details: "Keep moving, avoid sedentary routine" },
      { time: "1 PM", activity: "Lunch (Main meal)", details: "Warm, light, spicy foods—millets, soups, steamed veggies" },
      { time: "3–5 PM", activity: "Movement", details: "Walk, stretch, avoid sleeping" },
      { time: "6:30 PM", activity: "Early dinner", details: "Very light meal—vegetable broth, khichdi with trikatu" },
      { time: "8:00 PM", activity: "Gentle walk", details: "Avoid lethargy, engage in calming activity" },
      { time: "9:30 PM", activity: "Sleep", details: "Go to bed early, avoid heavy mental stimulation" }
    ],
    dietRecommendedTitle: "✅ Recommended (Light, dry, warm)",
    dietRecommended: [
      "Apples, pears, berries",
      "Barley, millet, oats",
      "Legumes, bitter greens",
      "Ginger, black pepper, turmeric",
      "Honey (raw)",
      "Warm herbal teas"
    ],
    dietAvoidTitle: "❌ Avoid (Heavy, cold, oily)",
    dietAvoid: [
      "Bananas, melons, avocados",
      "Rice, wheat in excess",
      "Dairy, especially cold milk or cheese",
      "Sweet, fried, or creamy foods",
      "Sugar, jaggery",
      "Cold beverages, iced drinks"
    ],
    lifestyleTipsTitle: "🧘‍♂️ Lifestyle Tips",
    lifestyleTips: [
      { categoryOrAspect: "Exercise", recommendationOrSuggestion: "Daily vigorous exercise: jogging, dancing,  yoga" },
      { categoryOrAspect: "Sleep", recommendationOrSuggestion: "Wake early, no day sleep" },
      { categoryOrAspect: "Emotions", recommendationOrSuggestion: "Practice letting go, avoid attachment and complacency" },
      { categoryOrAspect: "Work Environment", recommendationOrSuggestion: "Stimulating, engaging tasks to avoid boredom" },
      { categoryOrAspect: "Clothing", recommendationOrSuggestion: "Bright, warm colors; avoid heavy layers" }
    ],
    ritucharyaTitle: "🌸 Ritucharya for Kapha Prakriti",
    ritucharyaDetails: [
      { season: "Vasanta (Spring)", keyTips: "Prime time for detox: use Triphala, light diet" },
      { season: "Grishma (Summer)", keyTips: "Maintain light foods; moderate sun exposure" },
      { season: "Varsha (Monsoon)", keyTips: "Avoid heavy, oily food; include digestive spices" },
      { season: "Sharad (Autumn)", keyTips: "Favor pungent and bitter tastes" },
      { season: "Hemant (Winter)", keyTips: "Use warming herbs; maintain physical activity" },
      { season: "Shishira (Late Winter)", keyTips: "Focus on dry, spiced, hot foods to balance cold" }
    ],
    supportiveHerbsTitle: "🌿 Supportive Herbs for Kapha Balance",
    supportiveHerbs: [
      { herb: "Trikatu (Ginger, Black pepper, Pippali)", action: "Stimulates digestion, clears mucus" },
      { herb: "Punarnava", action: "Diuretic, reduces fluid retention" },
      { herb: "Musta", action: "Lightens digestion, balances heaviness" },
      { herb: "Vacha", action: "Clears brain fog, enhances speech and clarity" },
      { herb: "Tulsi", action: "Respiratory tonic, immunity booster" }
    ],
    recommendedOilsTitle: "🧴 Recommended Oils & Therapies",
    recommendedOils: [
      "Abhyanga: Use Mustard oil, Katu taila, or Dhanwantharam taila in warm form",
      "Nasya: Apply Anu taila or Shadbindu taila to clear sinuses",
      "Udvartana (Dry massage): With chickpea flour, triphaladi churna to reduce Kapha",
      "Swedana (Steam therapy): Helpful to liquefy and remove Kapha buildup"
    ]
  },
  {
    id: "vata-pitta",
    name: "Vata-Pitta Prakriti Lifestyle Plan",
    overviewCharacteristics: [
        { characteristic: "Dominant Doshas", description: "Vata (Air + Ether) and Pitta (Fire + Water)" },
        { characteristic: "Body Type", description: "Moderate build with slight leanness, warm and dry skin, prominent veins" },
        { characteristic: "Digestion", description: "Variable digestion — can alternate between fast (Pitta) and irregular (Vata)" },
        { characteristic: "Mind", description: "Quick-thinking, sharp intellect, creative yet prone to stress or irritability" },
        { characteristic: "Common Imbalances", description: "Indigestion, acidity, anxiety, inflammation, dryness" },
        { characteristic: "Needs", description: "Routine lifestyle, grounding and nourishing foods, emotional calmness" },
    ],
    dailyRoutine: [
        { time: "6:00–6:30 AM", activity: "Wake up", details: "Avoid overly early rising. Gentle start to avoid Vata aggravation." },
        { time: "6:30–7:30 AM", activity: "Abhyanga", details: "Use mildly warm oils like Ksheerabala or Chandanadi taila for nourishment and cooling." },
        { time: "8:00 AM", activity: "Breakfast", details: "Cooked grains, ghee, dates or soaked figs. Avoid dry or very spicy food." },
        { time: "10:00 AM – 1:00 PM", activity: "Work/study", details: "Focus time. Take regular breaks to balance both doshas." },
        { time: "1:00 PM", activity: "Lunch (Main meal)", details: "Warm, fresh, mildly spiced. Include grains, dal, ghee, vegetables." },
        { time: "2:00–5:00 PM", activity: "Productivity/Creative time", details: "Stay hydrated with fennel or coriander water." },
        { time: "6:30 PM", activity: "Light dinner", details: "Khichdi, soups with digestive herbs like ajwain, cumin." },
        { time: "7:30 PM", activity: "Relaxation", details: "Evening walk, gentle music" },
        { time: "9:30–10:00 PM", activity: "Sleep", details: "Head and foot massage with cooling oil. Avoid late-night activity." },
    ],
    dietRecommendedTitle: "✅ Recommended (Warm, moist, grounding with mild cooling nature)",
    dietRecommended: [
        "Sweet, bitter, and astringent tastes: bottle gourd, pumpkin, okra",
        "Well-cooked rice, wheat, oats; avoid dry cereals",
        "Moong dal, ghee, coconut oil, mildly spiced soups",
        "Cooling spices: fennel, coriander, turmeric, mint",
        "Fruits: pomegranate, ripe mango, soaked raisins",
        "Hydrating drinks: rose water, coriander tea, aloe vera juice",
    ],
    dietAvoidTitle: "❌ Avoid (Dry, spicy, overly sour or bitter)",
    dietAvoid: [
        "Dry snacks (chips, crackers), fermented foods",
        "Red chili, mustard, vinegar, pickles",
        "Overeating raw salads, carbonated drinks",
        "Coffee, alcohol, too many nightshades (like tomatoes)",
        "Skipping meals or eating on the go",
    ],
    lifestyleTipsTitle: "🧘‍♂️ Lifestyle Tips",
    lifestyleTips: [
        { categoryOrAspect: "Exercise", recommendationOrSuggestion: "Moderate yoga, swimming, walking in nature" },
        { categoryOrAspect: "Sleep", recommendationOrSuggestion: "Fixed schedule; 7–8 hours; avoid overstimulation before bed" },
        { categoryOrAspect: "Emotions", recommendationOrSuggestion: "Calming pranayama (Anuloma Viloma, Sheetali)" }, 
        { categoryOrAspect: "Work Environment", recommendationOrSuggestion: "Structured, creative but calm and non-hostile settings" },
        { categoryOrAspect: "Clothing", recommendationOrSuggestion: "Natural fabrics like cotton; neutral to cool colors" },
    ],
    ritucharyaTitle: "🌸 Ritucharya for Vata-Pitta Prakriti",
    ritucharyaDetails: [
        { season: "Grishma (Summer)", keyTips: "Protect from heat. Coconut water, stay indoors in peak sun." },
        { season: "Varsha (Monsoon)", keyTips: "Light, warm foods. Use dry ginger and hing for digestion." },
        { season: "Sharad (Autumn)", keyTips: "Avoid spicy and oily food. Favor cooling herbs." },
        { season: "Hemant (Winter)", keyTips: "Include nourishing, oily, and grounding foods." },
        { season: "Shishira (Late Winter)", keyTips: "Similar to Hemant. Gentle spices can be used." },
        { season: "Vasanta (Spring)", keyTips: "Mild detox with Triphala, avoid heavy/oily food." },
    ],
    supportiveHerbsTitle: "🌿 Supportive Herbs for Vata-Pitta Balance",
    supportiveHerbs: [
        { herb: "Amla", action: "Tridosha hara; antioxidant; digestive" },
        { herb: "Shatavari", action: "Pitta-shamak; supports hydration and immunity" },
        { herb: "Ashwagandha", action: "Vata-balancing adaptogen, strength-promoting" },
        { herb: "Guduchi", action: "Immunomodulator, balances both Pitta and Vata" },
        { herb: "Brahmi", action: "Calms mind, improves focus" },
        { herb: "Licorice (Yashtimadhu)", action: "Soothing to gut and respiratory system" },
    ],
    recommendedOilsTitle: "🧴 Recommended Oils & Therapies",
    recommendedOils: [
        "Abhyanga: Ksheerabala oil, Chandanadi taila, Mahanarayana taila for joint support",
        "Nasya: Anu taila or Brahmi ghee in small doses (morning)",
        "Shirodhara: With Brahmi oil or milk for mental clarity and stress relief",
    ],
  },
  {
    id: "pitta-kapha",
    name: "Pitta-Kapha Prakriti Lifestyle Plan",
    overviewCharacteristics: [
        { characteristic: "Dominant Doshas", description: "Pitta (Fire + Water) and Kapha (Water + Earth)" },
        { characteristic: "Body Type", description: "Medium to sturdy build; may gain weight easily; warm, oily skin" },
        { characteristic: "Digestion", description: "Strong but can become sluggish if Kapha dominates" },
        { characteristic: "Mind", description: "Focused and ambitious (Pitta); can become lethargic or dull (Kapha)" },
        { characteristic: "Prone to", description: "Inflammation, acidity, congestion, sluggishness, skin eruptions" },
        { characteristic: "Needs", description: "Balance between stimulation and cooling; avoid extremes" },
    ],
    dailyRoutine: [
        { time: "6:00 AM", activity: "Wake up", details: "Avoid Kapha-induced sluggishness by rising early." },
        { time: "6:30 AM", activity: "Dry brushing & oil massage", details: "Use light oils like sunflower or coconut to invigorate and cool the body." },
        { time: "7:00 AM", activity: "Bath & Herbal Tea", details: "Opt for teas like cumin-coriander-fennel or lemongrass to stimulate digestion." },
        { time: "8:00 AM", activity: "Breakfast", details: "Light and warm meals such as millet porridge; avoid heavy or oily foods." },
        { time: "9:00 AM – 12:00 PM", activity: "Work", details: "Utilize peak focus hours; schedule demanding tasks during this period." },
        { time: "12:30 PM", activity: "Lunch", details: "Main meal of the day; include warm, cooked, and lightly spiced foods." },
        { time: "2:00 PM – 5:00 PM", activity: "Light activity", details: "Engage in creative tasks or take a short walk; avoid napping." },
        { time: "6:00 PM", activity: "Dinner", details: "Light meal like soups or steamed vegetables; avoid heavy or late dinners." },
        { time: "7:00 PM – 8:00 PM", activity: "Relaxation", details: "Practice meditation or gentle breathing exercises to unwind." },
        { time: "9:30 PM – 10:00 PM", activity: "Sleep", details: "Aim for consistent sleep schedule to maintain balance." },
    ],
    dietRecommendedTitle: "Recommended",
    dietRecommended: [
        "Grains: Barley, quinoa, millet",
        "Vegetables: Leafy greens, asparagus, carrots", 
        "Fruits: Apples, pears, pomegranates, berries",
        "Legumes: Lentils, mung beans, chickpeas",
        "Spices: Cumin, coriander, fennel, turmeric",
        "Oils: Use sparingly; opt for cooling oils like coconut",
        "Beverages: Warm water, herbal teas; avoid cold drinks",
    ],
    dietAvoidTitle: "To Avoid",
    dietAvoid: [
        "Foods: Fried, oily, and heavy foods; red meat; dairy products like cheese and yogurt",
        "Spices: Excessively hot spices like chili and garlic",
        "Beverages: Caffeinated drinks, alcohol, and cold beverages",
        "Eating Habits: Overeating, late-night meals, and snacking between meals",
    ],
    lifestyleTipsTitle: "Lifestyle Tips", 
    lifestyleTips: [
        { categoryOrAspect: "Exercise", recommendationOrSuggestion: "Engage in moderate-intensity activities like brisk walking, swimming, or yoga to balance energy levels." },
        { categoryOrAspect: "Stress Management", recommendationOrSuggestion: "Practice meditation, deep breathing, or yoga to manage stress and prevent irritability." },
        { categoryOrAspect: "Sleep", recommendationOrSuggestion: "Maintain a regular sleep schedule; aim for 7–8 hours of restful sleep." },
        { categoryOrAspect: "Seasonal Adjustments", recommendationOrSuggestion: "Follow a Pitta-pacifying regimen during summer and a Kapha-pacifying regimen during winter and spring." },
    ],
    ritucharyaTitle: "Seasonal Guidelines (Ritucharya)",
    ritucharyaDetails: [
        { season: "Summer (Grishma)", keyTips: "Emphasize cooling foods and avoid spicy, oily dishes to pacify Pitta." },
        { season: "Monsoon (Varsha)", keyTips: "Focus on light, easily digestible foods; incorporate digestive spices to balance Kapha." },
        { season: "Autumn (Sharad)", keyTips: "Continue Pitta-pacifying diet; avoid sour and spicy foods." },
        { season: "Winter (Hemant & Shishira)", keyTips: "Favor Kapha-pacifying foods; include warming spices and avoid heavy meals." },
        { season: "Spring (Vasanta)", keyTips: "Detoxify gently; incorporate bitter and astringent tastes to balance Kapha." },
    ],
    supportiveHerbsTitle: "Supportive Herbs",
    supportiveHerbs: [
        { herb: "Triphala", action: "Aids digestion and detoxification." },
        { herb: "Guduchi", action: "Supports immune function and balances Pitta." },
        { herb: "Manjistha", action: "Purifies blood and supports skin health." },
        { herb: "Neem", action: "Detoxifies and balances both Pitta and Kapha." },
        { herb: "Turmeric", action: "Anti-inflammatory and supports digestion." },
    ],
    recommendedOilsTitle: "Recommended Oils",
    recommendedOils: [
        "Abhyanga (Self-Massage): Use cooling oils like coconut or sunflower to balance Pitta; mustard oil can be used sparingly to invigorate Kapha.",
        "Nasya (Nasal Therapy): Utilize Anu taila or Nirgundi oil to clear nasal passages and balance doshas.",
        "Shirodhara (Forehead Oil Flow Therapy): Employ Brahmi taila or Chandanaadi taila for calming the mind and balancing Pitta.",
    ],
  },
  {
    id: "kapha-vata",
    name: "Kapha-Vata Prakriti Lifestyle Plan",
    overviewCharacteristics: [
        { characteristic: "Dominant Dosha", description: "Kapha (Water + Earth) and Vata (Air + Ether)" },
        { characteristic: "Body Type", description: "Moderate frame, prone to both heaviness and dryness" },
        { characteristic: "Digestion", description: "Variable – can be sluggish (Kapha) or irregular (Vata)" },
        { characteristic: "Mind", description: "Creative and grounded, but prone to anxiety or lethargy" },
        { characteristic: "Prone to", description: "Cold, congestion, joint pain, fatigue" },
        { characteristic: "Needs", description: "Warmth, stimulation, grounding, lightness" },
    ],
    dailyRoutine: [
        { time: "4:30–5:30 AM", activity: "Wake up early", details: "Avoid oversleeping, practice light yoga or movement" },
        { time: "5:30–6:30 AM", activity: "Dry Abhyanga", details: "Use warm oils like mustard, followed by light exercise" },
        { time: "7:00 AM", activity: "Warm water + lemon", details: "Stimulates digestion and clears stagnation" },
        { time: "8:00 AM", activity: "Balanced Breakfast", details: "Warm, lightly spiced food; avoid dairy" },
        { time: "10–1 PM", activity: "Active work", details: "Engage in structured tasks with short breaks" },
        { time: "1 PM", activity: "Lunch (Main meal)", details: "Light, warm, easily digestible foods" },
        { time: "3–5 PM", activity: "Movement", details: "Take a walk or do light stretches" },
        { time: "6:30 PM", activity: "Early dinner", details: "Simple soup or khichdi with warming spices" },
        { time: "8:00 PM", activity: "Relaxation", details: "Gentle walk or calming breathing practices" },
        { time: "9:30 PM", activity: "Sleep", details: "Go to bed early to maintain stability" },
    ],
    dietRecommendedTitle: "✅ Recommended (Warm, light, moist yet spiced)",
    dietRecommended: [
        "Cooked apples, pears, berries",
        "Light grains like quinoa, millet, barley",
        "Steamed greens, cooked carrots and beets",
        "Warming spices – ginger, cinnamon, cumin",
        "Herbal teas with tulsi, fennel."
    ],
    dietAvoidTitle: "❌ Avoid (Cold, dry, heavy, oily)",
    dietAvoid: [
        "Cold dairy, ice cream",
        "Raw salads, dry crackers",
        "Bananas, melons",
        "Fried or overly oily foods",
        "Carbonated or iced drinks"
    ],
    lifestyleTipsTitle: "🧘‍♂️ Lifestyle Tips",
    lifestyleTips: [
        { categoryOrAspect: "Exercise", recommendationOrSuggestion: "Daily moderate exercise: walking, yoga, dancing" },
        { categoryOrAspect: "Sleep", recommendationOrSuggestion: "Early to bed and rise, avoid day naps" },
        { categoryOrAspect: "Emotions", recommendationOrSuggestion: "Balance between expression and grounding activities" },
        { categoryOrAspect: "Work Environment", recommendationOrSuggestion: "Organized, creative and mentally stimulating tasks" },
        { categoryOrAspect: "Clothing", recommendationOrSuggestion: "Layered warm clothes, use natural fibers" }
    ],
    ritucharyaTitle: "🌸 Ritucharya for Kapha-Vata Prakriti",
    ritucharyaDetails: [
        { season: "Vasanta (Spring)", keyTips: "Detox and reduce Kapha – use Triphala, light warm diet" },
        { season: "Grishma (Summer)", keyTips: "Hydrate and stay cool, avoid overexertion" },
        { season: "Varsha (Monsoon)", keyTips: "Protect digestion with dry, spiced meals" },
        { season: "Sharad (Autumn)", keyTips: "Grounding and balancing activities, avoid cold" },
        { season: "Hemant (Winter)", keyTips: "Keep warm, favor moist, nourishing food" },
        { season: "Shishira (Late Winter)", keyTips: "Focus on warmth, include spices to counter cold" }
    ],
    supportiveHerbsTitle: "🌿 Supportive Herbs for Kapha-Vata Balance",
    supportiveHerbs: [
        { herb: "Trikatu", action: "Stimulates digestion, clears mucus" },
        { herb: "Ashwagandha", action: "Supports Vata balance, strengthens immunity" },
        { herb: "Tulsi", action: "Enhances respiratory health" },
        { herb: "Brahmi", action: "Calms nervous system, reduces anxiety" },
        { herb: "Musta", action: "Aids digestion, reduces heaviness" }
    ],
    recommendedOilsTitle: "🧴 Recommended Oils & Therapies",
    recommendedOils: [
        "Abhyanga: Use warm oils like Mustard or Dhanwantharam taila",
        "Nasya: Apply Anu taila to lubricate and clear sinuses",
        "Udvartana: Dry massage with herbal powders to stimulate and energize",
        "Swedana: Gentle steam to relieve stiffness and Kapha accumulation"
    ]
  },
  {
    id: "sama-doshaj",
    name: "Sama Doshaj Prakriti Lifestyle Plan",
    overviewCharacteristics: [
        { characteristic: "Dominant Dosha", description: "Balanced Tridosha – Vata (Air + Ether), Pitta (Fire + Water), Kapha (Water + Earth)" },
        { characteristic: "Body Type", description: "Harmonious features; stable weight and digestion" },
        { characteristic: "Digestion", description: "Consistent and efficient metabolism" },
        { characteristic: "Mind", description: "Stable, focused, and emotionally balanced" },
        { characteristic: "Prone to", description: "Minimal imbalance unless diet/lifestyle is poor" },
        { characteristic: "Needs", description: "Balanced routine to maintain doshic harmony" },
    ],
    dailyRoutine: [
        { time: "5:00–6:00 AM", activity: "Wake up", details: "Maintain a consistent wake-up time daily" },
        { time: "6:00–7:00 AM", activity: "Abhyanga", details: "Warm oil massage using tridosha-balancing oils" },
        { time: "7:30 AM", activity: "Warm water", details: "Hydrate and support digestion" },
        { time: "8:00 AM", activity: "Balanced Breakfast", details: "Include all tastes in moderate quantity" },
        { time: "10–1 PM", activity: "Focused work", details: "Mental or physical productivity" },
        { time: "1 PM", activity: "Lunch (Main meal)", details: "Wholesome, freshly cooked, moderate quantity" },
        { time: "3–5 PM", activity: "Leisure/Activity", details: "Walk or engage in light recreation" },
        { time: "6:30 PM", activity: "Light dinner", details: "Avoid heavy or late meals" },
        { time: "8:00 PM", activity: "Wind down", details: "Reading, meditation, or soft music" },
        { time: "9:30 PM", activity: "Sleep", details: "Sleep at a fixed time, avoid screens before bed" }
    ],
    dietRecommendedTitle: "✅ Recommended (Balanced, fresh, seasonal foods)",
    dietRecommended: [
        "Seasonal fruits and vegetables",
        "Whole grains like rice, wheat, and millets",
        "Balanced spices – cumin, coriander, turmeric",
        "Warm herbal teas as per season",
        "Ghee or healthy fats in moderation"
    ],
    dietAvoidTitle: "❌ Avoid (Excessive, processed, stale, or incompatible combinations)",
    dietAvoid: [
        "Overeating or undereating",
        "Very spicy, fried, or cold foods",
        "Improper food combinations (e.g., milk + fruit)",
        "Alcohol, excessive caffeine",
        "Preserved or packaged foods"
    ],
    lifestyleTipsTitle: "🧘‍♂️ Lifestyle Tips",
    lifestyleTips: [
        { categoryOrAspect: "Exercise", recommendationOrSuggestion: "Daily moderate exercise – walking, yoga, swimming" },
        { categoryOrAspect: "Sleep", recommendationOrSuggestion: "Regular sleep-wake cycle" },
        { categoryOrAspect: "Emotions", recommendationOrSuggestion: "Practice mindfulness, journaling, or meditation" },
        { categoryOrAspect: "Work Environment", recommendationOrSuggestion: "Balanced workload with short breaks" },
        { categoryOrAspect: "Clothing", recommendationOrSuggestion: "Seasonal natural fibers – cotton, silk, wool" }
    ],
    ritucharyaTitle: "🌸 Ritucharya for Sama Doshaj Prakriti",
    ritucharyaDetails: [
        { season: "Vasanta (Spring)", keyTips: "Support detox with lighter meals and Triphala" },
        { season: "Grishma (Summer)", keyTips: "Stay cool and hydrated, avoid spicy foods" },
        { season: "Varsha (Monsoon)", keyTips: "Use digestive spices, avoid heavy foods" },
        { season: "Sharad (Autumn)", keyTips: "Favor bitter and astringent tastes" },
        { season: "Hemant (Winter)", keyTips: "Include nourishing, warming meals" },
        { season: "Shishira (Late Winter)", keyTips: "Stay warm, favor strengthening herbs" }
    ],
    supportiveHerbsTitle: "🌿 Supportive Herbs for Sama Doshaj Balance",
    supportiveHerbs: [
        { herb: "Triphala", action: "Mild detoxifier, supports digestion and elimination" },
        { herb: "Guduchi", action: "Immunity and metabolism booster" },
        { herb: "Tulsi", action: "Respiratory and adaptogenic support" },
        { herb: "Ashwagandha", action: "Rejuvenator and stress-reliever" },
        { herb: "Shatavari", action: "Balances Pitta and supports Vata" }
    ],
    recommendedOilsTitle: "🧴 Recommended Oils & Therapies",
    recommendedOils: [
        "Abhyanga: Use oils like Mahanarayana or tridosha-balancing oils",
        "Nasya: Apply Anu taila seasonally",
        "Udvartana: Gentle exfoliation occasionally",
        "Swedana: Steam therapy as per seasonal need"
    ]
  }
];
