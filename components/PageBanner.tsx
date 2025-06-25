import { motion } from "framer-motion";

interface PageBannerProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundColors?: {
    primary: string;
    secondary: string;
    tertiary?: string;
  };
}

const PageBanner = ({ 
  title, 
  subtitle, 
  backgroundColors = { primary: '#815C42', secondary: '#334036', tertiary: '#ABB087' } 
}: PageBannerProps) => {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 md:px-8 relative overflow-hidden">      {/* Enhanced gradient mesh background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          background: `
            radial-gradient(circle at 20% 20%, ${backgroundColors.primary}40 0%, transparent 50%),
            radial-gradient(circle at 80% 30%, ${backgroundColors.secondary}30 0%, transparent 55%),
            radial-gradient(circle at 40% 80%, ${backgroundColors.tertiary || '#C4B99F'}35 0%, transparent 65%)
          `,
          filter: 'blur(65px)',
          opacity: 0.8
        }}
      />
      
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-[#334036] mb-6"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl max-w-3xl mx-auto text-[#334036] leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default PageBanner;
