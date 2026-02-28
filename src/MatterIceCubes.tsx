import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion, AnimatePresence } from 'framer-motion';

export const MatterIceCubes = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef(Matter.Engine.create());
    
    // Create an array to hold all the DOM element refs so we can manually move them
    const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
    
    const [selectedItem, setSelectedItem] = useState<{label: string, bg: string, desc: string} | null>(null);

    const data = [
        { label: "React", bg: "from-blue-400 to-cyan-300", desc: "A JavaScript library for building user interfaces with components." },
        { label: "GSAP", bg: "from-emerald-400 to-teal-300", desc: "Professional-grade animation for the modern web." },
        { label: "Framer", bg: "from-pink-400 to-rose-300", desc: "Design tool and animation library for React." },
        { label: "Matter", bg: "from-indigo-400 to-violet-300", desc: "A 2D rigid body physics engine for the web." },
        { label: "Pixi", bg: "from-amber-400 to-orange-300", desc: "The HTML5 Creation Engine: Create beautiful digital content with the fastest, most flexible 2D WebGL renderer." }
    ];

    const boxSizes = [120, 90, 110, 80, 130]; // 5 boxes

    useEffect(() => {
        if (!sceneRef.current) return;

        const Engine = Matter.Engine,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            World = Matter.World,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint;

        const engine = engineRef.current;
        const world = engine.world;
        
        // Liquid physics: drastically lower gravity and add air friction
        engine.gravity.y = 0.4;
        engine.gravity.scale = 0.001;

        // Container dimensions
        const width = sceneRef.current.clientWidth;
        const height = sceneRef.current.clientHeight;

        // Boundaries to keep cubes from falling out of the div (Thickness of 50px)
        const boundaries = [
            // Floor
            Bodies.rectangle(width / 2, height + 25, width + 100, 50, { isStatic: true }),
            // Left Wall
            Bodies.rectangle(-25, height / 2, 50, height + 100, { isStatic: true }),
            // Right Wall
            Bodies.rectangle(width + 25, height / 2, 50, height + 100, { isStatic: true }),
            // Ceiling (optional, but keeps them from bouncing out)
            Bodies.rectangle(width / 2, -25, width + 100, 50, { isStatic: true })
        ];

        World.add(world, boundaries);

        // We will generate an invisible physics body for each DOM box
        const boxes: Matter.Body[] = [];

        boxSizes.forEach((size, index) => {
            const box = Bodies.rectangle(
                width / 2 + (Math.random() * 100 - 50), // Random cluster near center
                -100 * index - 100,                     // Drop sequentially from above
                size, 
                size, 
                {
                    restitution: 0.8,   // Very bouncy! (1 = perfect elasticity)
                    friction: 0.2,      // Sliding friction
                    frictionAir: 0.05,  // Drag in the air (the "liquid" feel)
                    density: 0.005,
                    chamfer: { radius: 15 } // Match CSS border-radius to perfect bounds
                }
            );
            boxes.push(box);
        });

        World.add(world, boxes);

        // -- MOUSE INTERACTION --
        // Attach the physics mouse engine directly to our React container's DOM element
        const mouse = Mouse.create(sceneRef.current);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.1, // Elastic "rubber band" feel when dragging
                render: { visible: false }
            }
        });
        World.add(world, mouseConstraint);

        // Start the engine
        const runner = Runner.create();
        Runner.run(runner, engine);

        // ── THE SECRET SYNC LOOP ──
        // Keep React DOM exact sync with where the physics engine calculates they are
        let animationFrameId: number;
        const updateDOM = () => {
            boxes.forEach((box, index) => {
                const domEl = boxRefs.current[index];
                if (domEl) {
                    // Update DOM position + rotation via vanilla CSS translation
                    // Subtract half the size to center the element exactly on the body
                    const size = boxSizes[index];
                    domEl.style.transform = `translate(
                        ${box.position.x - size / 2}px, 
                        ${box.position.y - size / 2}px
                    ) rotate(${box.angle}rad)`;
                }
            });
            animationFrameId = requestAnimationFrame(updateDOM);
        };
        updateDOM();

        return () => {
            // Cleanup engine on unmount
            cancelAnimationFrame(animationFrameId);
            Runner.stop(runner);
            Engine.clear(engine);
            World.clear(world, false);
            // Fix mouse wheel scrolling bug when mouse engine detaches
            Mouse.clearSourceEvents(mouse); 
        };
    }, []);

    // Helper to distinguish click vs drag
    const lastMousePos = useRef({ x: 0, y: 0 });
    
    const handleMouseDown = (e: React.MouseEvent) => {
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };
    
    const handleMouseUp = (e: React.MouseEvent, item: typeof data[0]) => {
        const dx = Math.abs(e.clientX - lastMousePos.current.x);
        const dy = Math.abs(e.clientY - lastMousePos.current.y);
        // If movement is very small, we consider it a click instead of a drag
        if (dx < 5 && dy < 5) {
            setSelectedItem(item);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[600px] w-full mt-12 mb-20 relative">
            <h2 className="text-3xl font-serif text-[#b08d44] mb-8">The "Bryant" Matter.js Effect</h2>
            <p className="max-w-xl text-center text-gray-600 mb-8 italic">
                Grab an ice cube and throw it. Or click one to see the highly bouncy pop-up UI!
            </p>

            {/* THE PHYSICS ARENA */}
            <div 
                ref={sceneRef} 
                className="relative w-full max-w-4xl h-[600px] bg-gradient-to-tr from-[#8abfe1] to-[#b3eaff] rounded-3xl shadow-inner border-[8px] border-white overflow-hidden cursor-crosshair"
            >
                {/* We map React elements, but CSS handles their physical placement */}
                {data.map((item, i) => (
                    <div
                        key={i}
                        ref={(el) => { boxRefs.current[i] = el; }}
                        onMouseDown={handleMouseDown}
                        onMouseUp={(e) => handleMouseUp(e, item)}
                        className={`absolute top-0 left-0 bg-gradient-to-br ${item.bg} shadow-xl flex items-center justify-center text-white font-bold select-none cursor-grab active:cursor-grabbing backdrop-blur-md bg-opacity-80 border-2 border-white/50 transition-transform active:scale-95`}
                        style={{
                            width: boxSizes[i] + 'px',
                            height: boxSizes[i] + 'px',
                            borderRadius: '15px', // Must match 'chamfer' config in physics!
                            willChange: 'transform' // Performance optimization
                        }}
                    >
                        <span className="drop-shadow-sm text-lg md:text-xl pointer-events-none">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* THE BOUNCY POP UP MODAL (FRAMER MOTION) */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
                            onClick={() => setSelectedItem(null)}
                        />
                        
                        {/* Bouncy Modal Container */}
                        <motion.div
                            initial={{ scale: 0, y: 100, rotate: -10 }}
                            animate={{ 
                                scale: 1, 
                                y: 0, 
                                rotate: 0,
                                transition: { 
                                    type: "spring", 
                                    stiffness: 260, 
                                    damping: 15,
                                    mass: 1.2,
                                    bounce: 0.6 // The "bouncy" effect
                                }
                            }}
                            exit={{ 
                                scale: 0, 
                                y: 80, 
                                rotate: 10,
                                transition: { 
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25
                                }
                            }}
                            className={`relative w-[90%] max-w-lg bg-gradient-to-br ${selectedItem.bg} rounded-[32px] p-8 shadow-2xl pointer-events-auto border-4 border-white/60 text-white`}
                        >
                            {/* Close Button */}
                            <motion.button 
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md border border-white/50 text-white hover:bg-white hover:text-black transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </motion.button>
                            
                            <motion.h3 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.1, type: "spring", stiffness: 200 } }}
                                className="text-4xl font-extrabold mb-4 drop-shadow-md"
                            >
                                {selectedItem.label}
                            </motion.h3>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.2, type: "spring", stiffness: 200 } }}
                                className="text-lg leading-relaxed text-white/90 font-medium drop-shadow-sm"
                            >
                                {selectedItem.desc}
                            </motion.p>
                            
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1, transition: { delay: 0.3, type: "spring", bounce: 0.5 } }}
                                className="mt-8"
                            >
                                <button className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                    Learn More
                                </button>
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

