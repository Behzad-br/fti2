import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    category: 'General' | 'IELTS' | 'PTE';
}

const AdminTeam = () => {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Omit<TeamMember, 'id'>>({
        name: '',
        role: '',
        image: '',
        category: 'General'
    });

    // Load team from localStorage
    useEffect(() => {
        const savedTeam = localStorage.getItem('fti_team');
        if (savedTeam) {
            setTeam(JSON.parse(savedTeam));
        } else {
            // Default team
            const defaultTeam: TeamMember[] = [
                {
                    id: '1',
                    name: 'Zahoor Ilahi',
                    role: 'Founder & CEO',
                    image: '/ceo.jpg',
                    category: 'General'
                },
                {
                    id: '2',
                    name: 'Sarah Khan',
                    role: 'Head of Admissions',
                    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
                    category: 'General'
                },
                {
                    id: '3',
                    name: 'Ali Hassan',
                    role: 'IELTS Expert Trainer',
                    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
                    category: 'IELTS'
                },
                {
                    id: '4',
                    name: 'Fatima Noor',
                    role: 'PTE Specialist',
                    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
                    category: 'PTE'
                },
            ];
            setTeam(defaultTeam);
            localStorage.setItem('fti_team', JSON.stringify(defaultTeam));
        }
    }, []);

    const saveTeam = (updatedTeam: TeamMember[]) => {
        localStorage.setItem('fti_team', JSON.stringify(updatedTeam));
        setTeam(updatedTeam);
    };

    const handleAdd = () => {
        if (!formData.name || !formData.role || !formData.image) {
            toast.error('Please fill all fields');
            return;
        }

        const newMember: TeamMember = {
            id: Date.now().toString(),
            ...formData
        };

        const updatedTeam = [...team, newMember];
        saveTeam(updatedTeam);
        toast.success('Team member added successfully');
        resetForm();
    };

    const handleEdit = (member: TeamMember) => {
        setIsEditing(true);
        setEditingId(member.id);
        setFormData({
            name: member.name,
            role: member.role,
            image: member.image,
            category: member.category || 'General'
        });
    };

    const handleUpdate = () => {
        if (!formData.name || !formData.role || !formData.image) {
            toast.error('Please fill all fields');
            return;
        }

        const updatedTeam = team.map(member =>
            member.id === editingId
                ? { ...member, ...formData }
                : member
        );

        saveTeam(updatedTeam);
        toast.success('Team member updated successfully');
        resetForm();
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this team member?')) {
            const updatedTeam = team.filter(member => member.id !== id);
            saveTeam(updatedTeam);
            toast.success('Team member deleted successfully');
        }
    };

    const resetForm = () => {
        setFormData({ name: '', role: '', image: '', category: 'General' });
        setIsEditing(false);
        setEditingId(null);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 500 * 1024) { // 500KB limit
                toast.error("Image size too large. Please choose an image under 500KB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
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
            <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
                <p className="text-muted-foreground">Manage your team members and assign them to departments (General, IELTS, PTE)</p>
            </motion.div>

            {/* Add/Edit Form */}
            <motion.div variants={itemVariants}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle>{isEditing ? 'Edit Team Member' : 'Add New Team Member'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g. John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role/Position</Label>
                                <Input
                                    id="role"
                                    placeholder="e.g. IELTS Trainer"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category/Department</Label>
                                <select
                                    id="category"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                >
                                    <option value="General">General (Main Team)</option>
                                    <option value="IELTS">IELTS Faculty</option>
                                    <option value="PTE">PTE Faculty</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image">Profile Image</Label>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-4">
                                        <AnimatePresence mode="wait">
                                            {formData.image && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="relative w-20 h-20 shrink-0"
                                                >
                                                    <img
                                                        src={formData.image}
                                                        alt="Preview"
                                                        className="w-full h-full rounded-lg object-cover border border-border"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                                        onClick={() => setFormData({ ...formData, image: '' })}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <Input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="cursor-pointer file:text-primary hover:file:bg-primary/10 h-10"
                                            />
                                            <p className="text-[11px] text-muted-foreground font-medium">Max size: 500KB. Recommended square image.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-6">
                            {isEditing ? (
                                <>
                                    <Button onClick={handleUpdate} className="hover:scale-105 transition-transform px-6">
                                        <Save className="w-4 h-4 mr-2" />
                                        Update Member
                                    </Button>
                                    <Button variant="outline" onClick={resetForm} className="hover:scale-105 transition-transform px-6">
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={handleAdd} className="hover:scale-105 transition-transform px-6">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Member
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Team List */}
            <motion.div variants={itemVariants}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Current Team Members ({team.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <motion.div
                            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <AnimatePresence>
                                {team.map((member, index) => (
                                    <motion.div
                                        key={member.id}
                                        variants={itemVariants}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        whileHover={{ y: -5 }}
                                        className="border rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300 bg-white shadow-sm flex flex-col"
                                    >
                                        <div className="relative aspect-square overflow-hidden bg-slate-100">
                                            <div className="absolute top-2 right-2 z-10 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-primary shadow-sm border border-primary/10">
                                                {member.category}
                                            </div>
                                            <motion.img
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.5 }}
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="secondary"
                                                        onClick={() => handleEdit(member)}
                                                        className="h-8 rounded-lg font-bold"
                                                    >
                                                        <Edit className="w-3.5 h-3.5 mr-1.5" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleDelete(member.id)}
                                                        className="h-8 rounded-lg font-bold"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 text-center">
                                            <h3 className="font-bold text-slate-800 line-clamp-1">{member.name}</h3>
                                            <p className="text-xs text-muted-foreground font-medium line-clamp-1 mt-0.5">{member.role}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                        {team.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-12 text-center"
                            >
                                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                    <Users className="w-8 h-8 text-slate-300" />
                                </div>
                                <p className="text-slate-500 font-medium">No team members yet.</p>
                                <p className="text-sm text-slate-400">Add your first team member above.</p>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default AdminTeam;
