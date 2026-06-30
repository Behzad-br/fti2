import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Trash2, Plus, Upload, X, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export type Ad = {
    id: number;
    title: string;
    image: string;
    link: string;
    active: boolean;
    type: 'IELTS' | 'PTE' | 'General';
};

const AdminAds = () => {
    const [ads, setAds] = useState<Ad[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Load ads from local storage on mount
    useEffect(() => {
        const savedAds = localStorage.getItem('fti_ads_v2');
        if (savedAds) {
            setAds(JSON.parse(savedAds));
        } else {
            // Default initial ads
            const initialAds: Ad[] = [
                { id: 1, title: 'IELTS Intensive Crash Course', image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop', link: '/ielts', active: true, type: 'IELTS' },
                { id: 2, title: 'Study in Australia - 2026', image: 'https://images.unsplash.com/photo-1523482580638-0167791260f4?q=80&w=2070&auto=format&fit=crop', link: '/destinations/australia', active: true, type: 'General' },
                { id: 3, title: 'PTE Special Discount 50%', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop', link: '/pte', active: true, type: 'PTE' },
                { id: 4, title: 'Canada Visa Seminar', image: 'https://images.unsplash.com/photo-1533036662701-443b74e6284f?q=80&w=2070&auto=format&fit=crop', link: '/destinations/canada', active: true, type: 'General' },
                { id: 5, title: 'Grand Education Expo 2026', image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop', link: '/contact', active: true, type: 'General' }
            ];
            setAds(initialAds);
            localStorage.setItem('fti_ads_v2', JSON.stringify(initialAds));
        }
    }, []);

    // Save to local storage whenever ads change
    const saveAds = (newAds: Ad[]) => {
        setAds(newAds);
        localStorage.setItem('fti_ads_v2', JSON.stringify(newAds));
    };

    const handleDelete = (id: number) => {
        const newAds = ads.filter(ad => ad.id !== id);
        saveAds(newAds);
        toast.success("Ad removed successfully");
    };

    const handleToggle = (id: number) => {
        const newAds = ads.map(ad => ad.id === id ? { ...ad, active: !ad.active } : ad);
        saveAds(newAds);
        toast.info("Ad status updated");
    };

    // Form handling
    const { register, handleSubmit, reset, setValue } = useForm<Omit<Ad, 'id' | 'active'>>();

    const onSubmit = (data: Omit<Ad, 'id' | 'active'>) => {
        const newAd: Ad = {
            id: Date.now(),
            active: true,
            ...data
        };
        saveAds([...ads, newAd]);
        toast.success("New Advertisement Created!");
        setIsDialogOpen(false);
        reset();
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
        >
            <motion.div variants={itemVariants} className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Advertisement Manager</h2>
                    <p className="text-muted-foreground">Manage "Ishtihar" banners for IELTS, PTE, and Home pages.</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="hover:scale-105 transition-transform">
                            <Plus className="mr-2 h-4 w-4" /> Create New Ad
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Advertisement</DialogTitle>
                            <DialogDescription>
                                Add a new poster for your website. It will appear instantly.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Ad Title</Label>
                                <Input id="title" placeholder="e.g. Special PTE Class" {...register('title', { required: true })} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type">Category</Label>
                                <Select onValueChange={(val) => setValue('type', val as any)} defaultValue="General">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="IELTS">IELTS Page</SelectItem>
                                        <SelectItem value="PTE">PTE Page</SelectItem>
                                        <SelectItem value="General">Home/General</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Image URL (Poster)</Label>
                                <Input id="image" placeholder="https://..." {...register('image', { required: true })} />
                                <p className="text-xs text-muted-foreground">Paste an image link here.</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="link">Redirect Link (Optional)</Label>
                                <Input id="link" placeholder="/contact" {...register('link')} />
                            </div>

                            <DialogFooter>
                                <Button type="submit">Create Ad</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </motion.div>

            <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                    {ads.map((ad) => (
                        <motion.div
                            key={ad.id}
                            variants={itemVariants}
                            exit={{ opacity: 0, scale: 0.95 }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className={`overflow-hidden group hover:shadow-xl transition-all duration-300 border-none shadow-sm ${!ad.active ? 'opacity-60 grayscale' : ''}`}>
                                <div className="aspect-video w-full overflow-hidden relative bg-gray-100">
                                    <motion.img
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                        src={ad.image}
                                        alt={ad.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded backdrop-blur-sm font-bold shadow-sm ${ad.type === 'IELTS' ? 'bg-orange-500 text-white' :
                                        ad.type === 'PTE' ? 'bg-blue-500 text-white' :
                                            'bg-gray-800 text-white'
                                        }`}>
                                        {ad.type}
                                    </div>
                                </div>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg truncate group-hover:text-primary transition-colors">{ad.title}</CardTitle>
                                    <CardDescription className="truncate">{ad.link || 'No link'}</CardDescription>
                                </CardHeader>
                                <CardFooter className="flex justify-between border-t bg-gray-50/50 pt-4">
                                    <div className="flex items-center space-x-2">
                                        <Switch checked={ad.active} onCheckedChange={() => handleToggle(ad.id)} />
                                        <Label className="cursor-pointer">{ad.active ? 'Active' : 'Inactive'}</Label>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 hover:scale-110 transition-transform"
                                        onClick={() => handleDelete(ad.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {ads.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="col-span-full text-center py-20 text-muted-foreground"
                    >
                        <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Megaphone className="w-10 h-10 opacity-20" />
                        </div>
                        <p>No ads found. Create one to get started!</p>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default AdminAds;
