import { motion } from 'framer-motion';
import { Settings, Construction } from 'lucide-react';

const AdminPlaceholder = ({ title }: { title: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12 border-2 border-dashed border-slate-200 rounded-[2rem] bg-white shadow-sm relative overflow-hidden"
    >
        {/* Animated Background Elements */}
        <motion.div
            animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
            }}
            transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
            animate={{
                rotate: -360,
                scale: [1, 1.2, 1],
            }}
            transition={{
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                scale: { duration: 7, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
        />

        <motion.div
            animate={{
                y: [0, -10, 0],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="bg-primary/10 p-6 rounded-2xl mb-8 relative z-10"
        >
            <Construction className="w-12 h-12 text-primary" />
        </motion.div>

        <h2 className="text-3xl font-bold text-slate-800 mb-4 relative z-10">{title}</h2>
        <p className="text-slate-500 mb-10 max-w-md text-lg leading-relaxed relative z-10">
            We are crafting a powerful management suite for <span className="text-primary font-semibold">{title.toLowerCase()}</span>.
            This module will be live shortly with premium features.
        </p>

        <div className="flex gap-4 relative z-10">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all"
            >
                Get Notified
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
            >
                View Roadmap
            </motion.button>
        </div>

        <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 h-1 bg-slate-100 rounded-full overflow-hidden"
        >
            <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-1/2 h-full bg-primary/40 rounded-full"
            />
        </motion.div>
    </motion.div>
);

export default AdminPlaceholder;
