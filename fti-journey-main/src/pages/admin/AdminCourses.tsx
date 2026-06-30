import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface CoursePlan {
    id: string;
    category: 'IELTS' | 'PTE' | 'General';
    name: string;
    duration: string;
    price: string;
    popular: boolean;
    features: string[];
}

const AdminCourses = () => {
    const [courses, setCourses] = useState<CoursePlan[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        category: 'IELTS' as 'IELTS' | 'PTE' | 'General',
        name: '',
        duration: '',
        price: '',
        popular: false,
        features: ''
    });

    useEffect(() => {
        const savedCourses = localStorage.getItem('fti_courses');
        if (savedCourses) {
            setCourses(JSON.parse(savedCourses));
        } else {
            const defaultCourses: CoursePlan[] = [
                {
                    id: '1',
                    category: 'IELTS',
                    name: 'Basic',
                    duration: '4 Weeks',
                    price: 'PKR 15,000',
                    popular: false,
                    features: ['All 4 modules covered', '2 hours daily', 'Study materials included', '2 mock tests'],
                },
                {
                    id: '2',
                    category: 'IELTS',
                    name: 'Intensive',
                    duration: '6 Weeks',
                    price: 'PKR 25,000',
                    popular: true,
                    features: ['All 4 modules covered', '3 hours daily', 'Study materials included', '4 mock tests', 'One-on-one sessions', 'Band guarantee'],
                },
                {
                    id: '3',
                    category: 'IELTS',
                    name: 'Weekend',
                    duration: '8 Weeks',
                    price: 'PKR 20,000',
                    popular: false,
                    features: ['Saturday & Sunday only', '4 hours per day', 'Study materials included', '3 mock tests'],
                },
            ];
            setCourses(defaultCourses);
            localStorage.setItem('fti_courses', JSON.stringify(defaultCourses));
        }
    }, []);

    const saveCourses = (updatedCourses: CoursePlan[]) => {
        localStorage.setItem('fti_courses', JSON.stringify(updatedCourses));
        setCourses(updatedCourses);
    };

    const handleAdd = () => {
        if (!formData.name || !formData.duration || !formData.price || !formData.features) {
            toast.error('Please fill all fields');
            return;
        }

        const newCourse: CoursePlan = {
            id: Date.now().toString(),
            category: formData.category,
            name: formData.name,
            duration: formData.duration,
            price: formData.price,
            popular: formData.popular,
            features: formData.features.split('\n').filter(f => f.trim())
        };

        const updatedCourses = [...courses, newCourse];
        saveCourses(updatedCourses);
        toast.success('Course plan added successfully');
        resetForm();
    };

    const handleEdit = (course: CoursePlan) => {
        setIsEditing(true);
        setEditingId(course.id);
        setFormData({
            category: course.category,
            name: course.name,
            duration: course.duration,
            price: course.price,
            popular: course.popular,
            features: course.features.join('\n')
        });
    };

    const handleUpdate = () => {
        if (!formData.name || !formData.duration || !formData.price || !formData.features) {
            toast.error('Please fill all fields');
            return;
        }

        const updatedCourses = courses.map(course =>
            course.id === editingId
                ? {
                    ...course,
                    category: formData.category,
                    name: formData.name,
                    duration: formData.duration,
                    price: formData.price,
                    popular: formData.popular,
                    features: formData.features.split('\n').filter(f => f.trim())
                }
                : course
        );

        saveCourses(updatedCourses);
        toast.success('Course plan updated successfully');
        resetForm();
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this course plan?')) {
            const updatedCourses = courses.filter(course => course.id !== id);
            saveCourses(updatedCourses);
            toast.success('Course plan deleted successfully');
        }
    };

    const resetForm = () => {
        setFormData({
            category: 'IELTS',
            name: '',
            duration: '',
            price: '',
            popular: false,
            features: ''
        });
        setIsEditing(false);
        setEditingId(null);
    };

    const groupedCourses = {
        IELTS: courses.filter(c => c.category === 'IELTS'),
        PTE: courses.filter(c => c.category === 'PTE'),
        General: courses.filter(c => c.category === 'General'),
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
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
                <h2 className="text-3xl font-bold tracking-tight">Course Plans Management</h2>
                <p className="text-muted-foreground">Manage IELTS, PTE, and General course pricing & features</p>
            </motion.div>

            {/* Add/Edit Form */}
            <motion.div variants={itemVariants}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle>{isEditing ? 'Edit Course Plan' : 'Add New Course Plan'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value: 'IELTS' | 'PTE' | 'General') =>
                                        setFormData({ ...formData, category: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="IELTS">IELTS</SelectItem>
                                        <SelectItem value="PTE">PTE</SelectItem>
                                        <SelectItem value="General">General</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Plan Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g. Basic, Intensive"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration</Label>
                                <Input
                                    id="duration"
                                    placeholder="e.g. 4 Weeks"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    placeholder="e.g. PKR 15,000"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="features">Features (one per line)</Label>
                                <Textarea
                                    id="features"
                                    placeholder="All 4 modules covered&#10;2 hours daily&#10;Study materials included"
                                    rows={5}
                                    value={formData.features}
                                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="popular"
                                    checked={formData.popular}
                                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                                    className="w-4 h-4 cursor-pointer"
                                />
                                <Label htmlFor="popular" className="cursor-pointer">Mark as Popular</Label>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            {isEditing ? (
                                <>
                                    <Button onClick={handleUpdate} className="hover:scale-105 transition-transform">
                                        <Save className="w-4 h-4 mr-2" />
                                        Update Course
                                    </Button>
                                    <Button variant="outline" onClick={resetForm} className="hover:scale-105 transition-transform">
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={handleAdd} className="hover:scale-105 transition-transform">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Course
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Courses List by Category */}
            {Object.entries(groupedCourses).map(([category, categoryCourses]) => (
                <motion.div key={category} variants={itemVariants}>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle>{category} Courses ({categoryCourses.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {categoryCourses.map((course, idx) => (
                                    <motion.div
                                        key={course.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                        className={`border rounded-lg p-4 space-y-3 relative group hover:shadow-md transition-all duration-300 ${course.popular ? 'ring-2 ring-primary bg-primary/5' : 'bg-card'}`}
                                    >
                                        {course.popular && (
                                            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                                                MOST POPULAR
                                            </span>
                                        )}
                                        <div>
                                            <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{course.name}</h3>
                                            <p className="text-sm text-muted-foreground">{course.duration}</p>
                                            <p className="text-2xl font-bold text-primary mt-2">{course.price}</p>
                                        </div>
                                        <ul className="space-y-1 text-sm border-t pt-3">
                                            {course.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <span className="text-primary mt-1 text-xs">✓</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex gap-2 pt-2 border-t mt-4">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleEdit(course)}
                                                className="hover:scale-105 transition-transform"
                                            >
                                                <Edit className="w-4 h-4 mr-1" />
                                                Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(course.id)}
                                                className="hover:scale-105 transition-transform"
                                            >
                                                <Trash2 className="w-4 h-4 mr-1" />
                                                Delete
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            {categoryCourses.length === 0 && (
                                <p className="text-center text-muted-foreground py-8">
                                    No {category} courses yet. Add your first course above.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default AdminCourses;
