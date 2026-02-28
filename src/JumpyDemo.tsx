import { motion } from 'framer-motion';

// This container staggers the children (pops them up one by one)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // The exact delay between each cube popping up
            delayChildren: 0.1,
        }
    }
};

// Physics config for individual cubes
const itemVariants = {
    hidden: { 
        opacity: 0, 
        y: 60,            // Start 60px lower
        scale: 0.5,       // Start at half size
        rotate: -15,      // Start tilted
    },
    visible: { 
        opacity: 1, 
        y: 0,             // Snap to original position
        scale: 1,         // Snap to full size
        rotate: 0,        // Snap to upright
        transition: {
            // THIS is the secret sauce: 
            // Never use "easeOut" for playful UI. Always use "spring"!
            type: "spring" as const,
            damping: 10,       // How much resistance? (Lower = more wobble/jello)
            stiffness: 250,    // How hard does it snap into place?
            mass: 0.8          // How physically heavy is it?
        }
    }
};

export const JumpyDemo = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 w-full bg-slate-900 rounded-xl my-8">
            <h2 className="text-white text-2xl mb-12 font-bold font-sans">Physics-based "Jumpy" Sequence</h2>
            
            <motion.div 
                className="flex flex-wrap items-center justify-center gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible" // Triggers when scrolling into view
                viewport={{ once: true, margin: "-50px" }} // Triggers slightly before it enters the screen
            >
                {[1, 2, 3, 4, 5].map((item) => (
                    <motion.div
                        key={item}
                        variants={itemVariants}
                        // Add physics to interaction states too!
                        whileHover={{ 
                            scale: 1.15, 
                            rotate: (item % 2 === 0 ? 5 : -5), // Rotate differently based on odd/even
                            y: -10,
                            transition: { type: "spring", damping: 8, stiffness: 400 } 
                        }}
                        whileTap={{ 
                            scale: 0.85, 
                            rotate: 0,
                            transition: { type: "spring", damping: 15, stiffness: 500 }
                        }}
                        className="w-24 h-24 bg-gradient-to-tr from-cyan-500 to-blue-400 rounded-2xl shadow-[0_10px_30px_rgba(6,182,212,0.4)] border border-cyan-300/50 cursor-pointer flex items-center justify-center text-white font-bold text-3xl select-none"
                    >
                        {item}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};
