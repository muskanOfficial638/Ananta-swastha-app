"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FaCalendarAlt, 
  FaArrowLeft, 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin,
  FaUser,
  FaClock,
  FaTag
} from "react-icons/fa";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

// This would come from your database or CMS in a real application
const getBlogPost = (id: string) => {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Your Vata Dosha: Signs of Balance and Imbalance",
      excerpt: "Learn how to recognize when your Vata is in balance and practical steps to restore harmony when it's not.",
      image: "/blog-vata.svg",
      category: "Dosha Education",
      date: "June 15, 2023",
      author: "Dr. Amrita Patel",
      authorImage: "/team-member1.svg",
      readTime: "7 min read",
      featured: true,
      tag: "vata",      content: `<div class="blog-content prose prose-sm md:prose-base">
<p>Vata dosha, composed of the elements air and space, governs all movement in the body and mind. When in balance, Vata promotes creativity, flexibility, and vitality. However, when imbalanced, it can lead to anxiety, digestive issues, and various other health concerns.</p>

<h2>Signs of Balanced Vata</h2>
<p>When your Vata dosha is in balance, you'll likely experience:</p>
<ul>
  <li>Mental alertness and clarity</li>
  <li>Regular digestion and elimination</li>
  <li>Steady energy throughout the day</li>
  <li>Sound, refreshing sleep</li>
  <li>Creativity and enthusiasm</li>
  <li>Adaptability to changing circumstances</li>
</ul>

<h2>Signs of Vata Imbalance</h2>
<p>An excess of Vata in your system may manifest as:</p>
<ul>
  <li>Anxiety, worry, or racing thoughts</li>
  <li>Irregular digestion, gas, or constipation</li>
  <li>Dry skin and hair</li>
  <li>Cold hands and feet</li>
  <li>Difficulty falling asleep or staying asleep</li>
  <li>Cracking joints</li>
  <li>Irregular appetite and meal times</li>
</ul>

<h2>Causes of Vata Imbalance</h2>
<p>Several factors can disturb your Vata balance:</p>
<ul>
  <li>Irregular daily routine</li>
  <li>Excessive travel or movement</li>
  <li>Cold, dry weather or environments</li>
  <li>Overconsumption of raw, cold, or dry foods</li>
  <li>Excessive mental activity or multitasking</li>
  <li>Lack of adequate rest</li>
  <li>Excessive fasting or dieting</li>
</ul>

<h2>Restoring Vata Balance</h2>

<h3>Daily Routine (Dinacharya)</h3>
<p>Establishing a consistent daily routine is essential for balancing Vata:</p>
<ul>
  <li>Wake up and go to sleep at the same time each day</li>
  <li>Eat meals at regular times</li>
  <li>Practice gentle yoga or stretching in the morning</li>
  <li>Meditate for 10-20 minutes twice daily</li>
  <li>Practice self-massage (abhyanga) with warm sesame oil</li>
</ul>

<h3>Diet Recommendations</h3>
<p>Focus on warm, moist, and grounding foods:</p>
<ul>
  <li>Cooked, warm meals rather than raw or cold foods</li>
  <li>Healthy oils like ghee, olive oil, and sesame oil</li>
  <li>Sweet, sour, and salty tastes</li>
  <li>Warming spices like ginger, cinnamon, and cumin</li>
  <li>Nourishing foods like sweet potatoes, oatmeal, and basmati rice</li>
  <li>Warm milk with spices before bedtime</li>
</ul>

<h3>Lifestyle Practices</h3>
<p>Incorporate these Vata-pacifying practices into your life:</p>
<ul>
  <li>Keep warm, especially during cold and windy weather</li>
  <li>Practice restorative yoga and gentle exercise</li>
  <li>Minimize multitasking and rushing</li>
  <li>Reduce screen time, especially before bed</li>
  <li>Create a calm, peaceful environment at home</li>
  <li>Use essential oils like lavender, vetiver, and sandalwood</li>
</ul>

<h2>Seasonal Considerations</h2>
<p>Vata tends to increase during autumn and early winter when the weather is cold and dry. During these seasons, be especially mindful of your Vata-balancing practices.</p>

<p>Remember that each person's optimal balance is unique. These guidelines provide a starting point, but you should adjust based on your personal experience and, ideally, with guidance from an Ayurvedic practitioner.</p>

<p>By understanding the signs of Vata imbalance and implementing these balancing practices, you can maintain harmony in your body and mind, promoting overall well-being and preventing Vata-related disorders.</p>
</div>`
    },
    {
      id: 2,
      title: "Seasonal Eating: Ayurvedic Approach to Summer Nutrition",
      excerpt: "Discover which foods will keep you cool and balanced during the hot summer months according to Ayurvedic principles.",
      image: "/blog-seasonal.svg",
      category: "Nutrition",
      date: "May 28, 2023",
      author: "Maya Johnson",
      authorImage: "/team-member3.svg",
      readTime: "5 min read",
      featured: false,
      tag: "nutrition",      content: `<div class="blog-content prose prose-sm md:prose-base">
<p>Ayurveda teaches us to live in harmony with nature's rhythms, and one of the most powerful ways to do this is through seasonal eating. Summer, characterized by heat, brightness, and intensity, is a time when Pitta dosha naturally increases in our environment and within our bodies.</p>

<h2>Understanding Summer's Effect on the Body</h2>
<p>During summer months, the external heat can increase internal body heat, potentially leading to Pitta imbalances such as:</p>
<ul>
  <li>Skin rashes or inflammations</li>
  <li>Acid indigestion or heartburn</li>
  <li>Irritability or short temper</li>
  <li>Excessive thirst</li>
  <li>Sensitivity to heat</li>
</ul>

<p>Ayurvedic summer nutrition focuses on counterbalancing these effects by favoring foods with cooling, sweet, bitter, and astringent properties.</p>

<h2>Summer Food Guidelines</h2>

<h3>Foods to Favor</h3>
<p>Incorporate these cooling foods into your summer diet:</p>
<ul>
  <li>Sweet, juicy fruits: Watermelon, mango, pears, plums, grapes</li>
  <li>Cooling vegetables: Cucumber, zucchini, leafy greens, broccoli</li>
  <li>Fresh herbs: Mint, cilantro, dill, fennel</li>
  <li>Cooling spices: Coriander, fennel, cardamom</li>
  <li>Light proteins: White meat chicken, turkey, tofu</li>
  <li>Cooling grains: Basmati rice, quinoa, barley</li>
  <li>Dairy: Fresh yogurt, cottage cheese, milk (in moderation)</li>
</ul>

<h3>Foods to Reduce</h3>
<p>Minimize these heating foods during summer:</p>
<ul>
  <li>Spicy foods: Hot peppers, excessive garlic, and ginger</li>
  <li>Sour fruits: Unripe mangoes, sour grapes</li>
  <li>Fermented foods: Vinegar, alcohol, fermented pickles</li>
  <li>Salty foods: Excess salt increases water retention and heat</li>
  <li>Heavy proteins: Red meat, seafood</li>
  <li>Oils: Reduce overall oil consumption, especially sesame and almond oils</li>
</ul>

<h2>Summer Hydration</h2>
<p>Proper hydration is crucial during summer:</p>
<ul>
  <li>Room temperature water is best (ice-cold drinks can dampen digestion)</li>
  <li>Coconut water provides natural electrolytes</li>
  <li>Cooling herbal teas: Mint, hibiscus, chamomile, coriander</li>
  <li>Fresh lime water with a touch of raw honey</li>
  <li>Rose water or rose milk</li>
</ul>

<p>Avoid excessive caffeine and alcohol, as they can be dehydrating and heating.</p>

<h2>Summer Cooking Methods</h2>
<p>How you prepare food matters as much as what you eat:</p>
<ul>
  <li>Favor lighter cooking methods: Steaming, sautéing, or quick boiling</li>
  <li>Reduce deep-fried, grilled, or heavily roasted foods</li>
  <li>Eat more raw foods than in other seasons (if your digestion is strong)</li>
  <li>Cook with cooling oils like coconut or olive oil</li>
</ul>

<h2>Sample Summer Menu</h2>

<h3>Breakfast</h3>
<p>Fresh fruit with mint and a small amount of yogurt, or cooling grain porridge made with coconut milk.</p>

<h3>Lunch (Main meal of the day)</h3>
<p>Basmati rice or quinoa with steamed vegetables, cucumber raita, and a light protein like tofu or chicken.</p>

<h3>Dinner (Light meal)</h3>
<p>Vegetable soup or salad with cooling herbs and a small portion of grains.</p>

<h3>Snacks</h3>
<p>Fresh fruit, coconut water, or cucumber slices with mint.</p>

<h2>Special Summer Recipes</h2>

<h3>Cooling Cucumber Mint Raita</h3>
<p>This cooling condiment can accompany any meal and help balance spicier dishes.</p>
<p><strong>Ingredients:</strong> Yogurt, grated cucumber, fresh mint leaves, roasted cumin powder, and a pinch of salt.</p>
<p><strong>Method:</strong> Mix all ingredients and serve chilled.</p>

<h3>Rose-Coconut Cooling Drink</h3>
<p><strong>Ingredients:</strong> Coconut water, a few drops of rose water, and a teaspoon of raw honey (optional).</p>
<p><strong>Method:</strong> Mix and sip throughout the day.</p>

<p>By adapting your diet to summer's qualities, you can maintain balance, prevent seasonal ailments, and enjoy the abundant fresh produce that nature provides during this vibrant season.</p>
</div>`
    },
    {
      id: 3,
      title: "The Science Behind Dinacharya: Ayurvedic Daily Routines",
      excerpt: "Explore the scientific benefits of following an Ayurvedic daily routine and how it can transform your health.",
      image: "/blog-routine.svg",
      category: "Lifestyle",
      date: "April 10, 2023",
      author: "Dr. Vikram Singh",
      authorImage: "/author3.svg",
      readTime: "8 min read",
      featured: false,
      tag: "lifestyle",      content: `<div class="blog-content prose prose-sm md:prose-base">
<p>Dinacharya, the Ayurvedic concept of daily routine, is not just an ancient tradition but a practice increasingly validated by modern science. This systematic approach to organizing daily activities aligns with our natural biological rhythms, optimizing physical health, mental clarity, and emotional well-being.</p>

<h2>The Circadian Science Connection</h2>
<p>Modern research into chronobiology has confirmed what Ayurveda has taught for millennia: our bodies function optimally when we live in harmony with natural cycles. The Nobel Prize in Medicine was awarded in 2017 for discoveries of molecular mechanisms controlling circadian rhythms—the very foundation of Dinacharya practices.</p>

<p>Studies show that circadian misalignment (going against our natural rhythms) is linked to increased risks of:</p>
<ul>
  <li>Metabolic disorders including obesity and diabetes</li>
  <li>Cardiovascular disease</li>
  <li>Immune system dysfunction</li>
  <li>Mood disorders and cognitive impairment</li>
  <li>Hormonal imbalances</li>
</ul>

<h2>Key Elements of Dinacharya and Their Scientific Benefits</h2>

<h3>Early Rising (Brahmamuhurta)</h3>
<p><strong>Ayurvedic principle:</strong> Waking up before sunrise (between 4:00-6:00 AM) during "Brahmamuhurta" or the time of universal consciousness.</p>

<p><strong>Scientific validation:</strong> Research shows that early morning hours are associated with peak cortisol levels (the awakening response), which prepares the body for daily activities. Studies published in the Journal of Psychiatric Research have found that morning-type individuals report better mood states and lower levels of depression.</p>

<h3>Oral Hygiene (Dantadhavana and Jihwa Nirlekhana)</h3>
<p><strong>Ayurvedic practice:</strong> Tongue scraping and oil pulling before breakfast.</p>

<p><strong>Scientific validation:</strong> Research in the Journal of Ayurveda and Integrative Medicine shows that tongue scraping significantly reduces oral bacteria, including those responsible for bad breath. A study in the Journal of Traditional and Complementary Medicine found that oil pulling reduces plaque index and oral bacterial count comparable to chlorhexidine mouthwash but without side effects.</p>

<h3>Self-Massage (Abhyanga)</h3>
<p><strong>Ayurvedic practice:</strong> Daily self-massage with warm oil before bathing.</p>

<p><strong>Scientific validation:</strong> A 2011 study in the International Journal of Neuroscience found that massage therapy decreases cortisol levels while increasing serotonin and dopamine, explaining its stress-reduction effects. Research in the Journal of Health Psychology indicates that regular massage improves body image and promotes relaxation.</p>

<h3>Physical Exercise (Vyayama)</h3>
<p><strong>Ayurvedic guideline:</strong> Exercise in the morning to half of one's capacity, varying by constitution.</p>

<p><strong>Scientific validation:</strong> Multiple studies confirm that morning exercise improves attention, working memory, and decision-making throughout the day. Research in the International Journal of Obesity shows that morning exercise may be more effective for weight management due to metabolic advantages.</p>

<h3>Meditation (Dhyana)</h3>
<p><strong>Ayurvedic practice:</strong> Regular meditation, particularly during sunrise and sunset transitions.</p>

<p><strong>Scientific validation:</strong> Neuroimaging studies published in journals like Psychiatry Research show that regular meditation practice increases gray matter density in brain regions associated with learning, memory, and emotional regulation. A meta-analysis in JAMA Internal Medicine found meditation programs showed moderate evidence of improved anxiety, depression, and pain.</p>

<h3>Regular Mealtimes</h3>
<p><strong>Ayurvedic principle:</strong> Eating main meals at consistent times, with lunch as the largest meal.</p>

<p><strong>Scientific validation:</strong> Research in the International Journal of Obesity shows that irregular eating patterns are associated with reduced thermic effect of food and decreased insulin sensitivity. Studies in Proceedings of the Nutrition Society confirm that consistent meal timing supports optimal metabolic health and weight management.</p>

<h3>Early Dinner and Bedtime</h3>
<p><strong>Ayurvedic guideline:</strong> Eating dinner at least 3 hours before sleep and retiring early.</p>

<p><strong>Scientific validation:</strong> A 2019 study in the Journal of Clinical Endocrinology & Metabolism found that late dinner consumption increases night-time glucose levels and reduces fat oxidation. Research in Sleep Medicine Reviews shows that consistent, earlier bedtimes improve sleep quality and duration.</p>

<h2>Implementing Dinacharya in Modern Life</h2>

<p>While adhering to a complete Ayurvedic daily routine may seem challenging in today's fast-paced world, research suggests that even partial implementation offers significant benefits:</p>

<h3>Practical Starting Points:</h3>
<ul>
  <li><strong>Consistent sleep-wake cycles:</strong> Studies show that maintaining regular sleep times, even on weekends, improves overall sleep quality and daytime alertness.</li>
  <li><strong>Morning sunlight exposure:</strong> Research in the Journal of Affective Disorders shows that morning light exposure helps regulate circadian rhythms and improves mood.</li>
  <li><strong>Regular mealtimes:</strong> Clinical research demonstrates that consistent meal timing optimizes metabolic health even without changing food content.</li>
</ul>

<h2>Personalization: The Science of Individualized Routines</h2>

<p>Modern research increasingly supports Ayurveda's emphasis on personalization. Genetic studies have identified variations in circadian clock genes that affect individuals' optimal timing for activities. What works best varies based on:</p>

<ul>
  <li>Genetic chronotype (morning vs. evening preference)</li>
  <li>Age (circadian preferences shift throughout the lifespan)</li>
  <li>Season and geographical location</li>
  <li>Individual health conditions</li>
</ul>

<p>By understanding both traditional Ayurvedic principles and modern chronobiology research, we can create daily routines that honor our unique needs while aligning with natural rhythms. The science is clear: how we structure our days matters as much as what we do within them.</p>
</div>`
    },
    {
      id: 4,
      title: "Balancing Pitta Dosha Through Cooling Practices",
      excerpt: "Learn effective techniques to cool and balance Pitta dosha, especially during summer and high-stress periods.",
      image: "/blog-pitta.svg",
      category: "Dosha Education",
      date: "March 22, 2023",
      author: "Dr. Amrita Patel",
      authorImage: "/team-member1.svg",
      readTime: "6 min read",
      featured: false,
      tag: "pitta",      content: `<div class="blog-content prose prose-sm md:prose-base">
<p>Pitta dosha, the content will be added later...</p>
</div>`
    },
    {
      id: 5,
      title: "Ayurvedic Approach to Sound Sleep and Insomnia",
      excerpt: "Discover natural Ayurvedic remedies and practices to improve sleep quality and address sleep disturbances.",
      image: "/blog-sleep.svg",
      category: "Wellness",
      date: "February 18, 2023",
      author: "Maya Johnson",
      authorImage: "/team-member3.svg",
      readTime: "9 min read",
      featured: false,
      tag: "wellness",      content: `<div class="blog-content prose prose-sm md:prose-base">
<p>Sleep disorders, the content will be added later...</p>
</div>`
    },
    {
      id: 6,
      title: "Kapha-Balancing Practices for Spring Renewal",
      excerpt: "As spring arrives, learn how to clear Kapha accumulation with energizing practices and diet adjustments.",
      image: "/blog-kapha.svg",
      category: "Dosha Education",
      date: "January 30, 2023",
      author: "Dr. Vikram Singh",
      authorImage: "/author3.svg",
      readTime: "7 min read",
      featured: false,
      tag: "kapha",
      content: `<div class="blog-content">
<p>Spring season, the content will be added later...</p>
</div>`
    }
  ];

  return blogPosts.find(post => post.id.toString() === id) || null;
};

// Function to get related posts (excluding current post)
const getRelatedPosts = (currentId: string, tag: string) => {
  const allPosts = getBlogPost("1") ? [1, 2, 3, 4, 5, 6].map(id => getBlogPost(id.toString())).filter(post => post) : [];
  return allPosts
    .filter(post => post!.id.toString() !== currentId)
    .filter(post => post!.tag === tag || post!.category === "Dosha Education")
    .slice(0, 2);
};

export default function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params Promise using React.use()
  const { id } = use(params);
  const blogPost = getBlogPost(id);
  
  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Blog post not found</h1>
          <Link href="/blog" className="mt-4 inline-block text-[#815C42] hover:underline">
            Return to Blog page
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(id, blogPost.tag);
  
  return (
    <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/blog" className="inline-flex items-center text-[#815C42] hover:text-[#815C42]/80 mb-8 text-sm font-medium">
            <FaArrowLeft className="mr-2 text-xs" /> Back to Blog
          </Link>
        </motion.div>
        
        {/* Article header */}
        <motion.div
          className="mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white
              ${blogPost.tag === 'vata' ? 'bg-[#88A886]' : 
                blogPost.tag === 'pitta' ? 'bg-[#D98324]' : 
                blogPost.tag === 'kapha' ? 'bg-[#5C7F99]' : 
                'bg-[#815C42]'}`}>
              {blogPost.category}
            </span>
            <span className="inline-block bg-[#F7F5EF] text-[#334036]/70 px-3 py-1 rounded-full text-xs font-medium">
              {blogPost.tag.charAt(0).toUpperCase() + blogPost.tag.slice(1)}
            </span>
          </div>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#334036] mb-4 leading-tight">{blogPost.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-[#334036]/60 text-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                <Image 
                  src={blogPost.authorImage} 
                  alt={blogPost.author} 
                  width={32} 
                  height={32} 
                  className="object-cover"
                />
              </div>
              <span className="font-medium text-[#334036]">{blogPost.author}</span>
            </div>
            
            <span className="flex items-center">
              <FaCalendarAlt className="mr-2 text-[#815C42]" size={12} />
              {blogPost.date}
            </span>
            
            <span className="flex items-center">
              <FaClock className="mr-2 text-[#815C42]" size={12} />
              {blogPost.readTime}
            </span>
          </div>
        </motion.div>
        
        {/* Featured image */}
        <motion.div
          className="relative h-60 md:h-80 rounded-xl overflow-hidden mb-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image 
            src={blogPost.image}
            alt={blogPost.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </motion.div>
            {/* Article content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        </motion.div>
        
        {/* Tags */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-[#334036]/70 font-medium">Tags:</span>
            <span className="bg-[#F7F5EF] text-[#334036]/70 px-3 py-1 rounded-full text-xs">
              {blogPost.tag}
            </span>
            <span className="bg-[#F7F5EF] text-[#334036]/70 px-3 py-1 rounded-full text-xs">
              ayurveda
            </span>
            <span className="bg-[#F7F5EF] text-[#334036]/70 px-3 py-1 rounded-full text-xs">
              wellness
            </span>
          </div>
        </motion.div>
        
        {/* Social sharing */}
        <motion.div 
          className="mt-10 pt-6 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-sm font-medium text-[#334036] mb-4">Share this article</h3>
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 transition-colors text-sm">
              <FaFacebook size={14} />
            </button>
            <button className="bg-sky-500 text-white p-2.5 rounded-full hover:bg-sky-600 transition-colors text-sm">
              <FaTwitter size={14} />
            </button>
            <button className="bg-blue-800 text-white p-2.5 rounded-full hover:bg-blue-900 transition-colors text-sm">
              <FaLinkedin size={14} />
            </button>
          </div>
        </motion.div>
        
        {/* Related articles */}
        <motion.div 
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-xl font-bold mb-6 text-[#334036]">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((post) => (
              <Link href={`/blog/${post!.id}`} className="group" key={post!.id}>
                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 group-hover:translate-y-[-5px] h-full flex flex-col">
                  <div className="relative h-40 bg-[#F7F5EF]">
                    <Image
                      src={post!.image}
                      alt={post!.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-medium text-[#334036] text-base group-hover:text-[#815C42] transition-colors line-clamp-2">{post!.title}</h3>
                    <div className="mt-2 flex items-center text-xs text-[#334036]/60">
                      <FaCalendarAlt className="mr-1.5 text-[#815C42]" size={10} />
                      <span>{post!.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
        
        {/* Back to all articles */}
        <div className="mt-10 text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center justify-center px-5 py-2 border border-[#815C42] text-[#815C42] hover:bg-[#815C42] hover:text-white rounded-full text-sm font-medium transition-colors"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
