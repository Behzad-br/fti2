import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download } from 'lucide-react';

const books = [
    {
        title: "Cambridge IELTS 18 Academic",
        description: "The latest authentic examination papers from Cambridge Assessment English.",
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
        category: "Practice Tests"
    },
    {
        title: "The Official Cambridge Guide",
        description: "Everything you need to prepare for IELTS Academic or General Training.",
        cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
        category: "Comprehensive Guide"
    },
    {
        title: "Vocabulary for IELTS Advanced",
        description: "Learn vocabulary at band 6.5 and above for the IELTS exam.",
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
        category: "Vocabulary"
    },
    {
        title: "Grammar for IELTS",
        description: "Clear explanations and extensive practice exercises for grammar.",
        cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop",
        category: "Grammar"
    }
];

const IELTSBooks = () => {
    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 max-w-6xl mx-auto gap-6">
                    <div>
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block py-1.5 px-4 rounded-full bg-orange-100 text-orange-600 font-bold text-sm uppercase tracking-widest mb-4"
                        >
                            Study Materials
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-slate-900"
                        >
                            Recommended <span className="text-orange-500">Books</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full hover:bg-orange-500 transition-colors font-semibold">
                            <Download className="w-4 h-4" /> Get Study Material
                        </button>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {books.map((book, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="relative aspect-[3/4] mb-6 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                                <img 
                                    src={book.cover} 
                                    alt={book.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <button className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl hover:bg-orange-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                                        <BookOpen className="w-4 h-4" /> Read More
                                    </button>
                                </div>
                                <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                    {book.category}
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                                {book.title}
                            </h3>
                            <p className="text-sm text-slate-500 line-clamp-2">
                                {book.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IELTSBooks;
