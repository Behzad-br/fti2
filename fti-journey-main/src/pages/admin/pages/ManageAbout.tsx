import { useState } from 'react';
import { useCMS } from '@/context/CMSContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const ManageAbout = () => {
  const { cmsData, updateCMSData } = useCMS();
  const { toast } = useToast();
  
  const [heroTitle, setHeroTitle] = useState(cmsData.aboutHeroTitle);
  const [heroDescription, setHeroDescription] = useState(cmsData.aboutHeroDescription);

  const handleSave = () => {
    updateCMSData({ aboutHeroTitle: heroTitle, aboutHeroDescription: heroDescription });
    toast({ title: "Saved!", description: "Profile page updated successfully." });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manage Profile Page</h1>
          <p className="text-slate-500 mt-1">Edit the "About Us" / Profile page content.</p>
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">Hero Title</label>
            <Input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">Hero Description</label>
            <Textarea value={heroDescription} onChange={(e) => setHeroDescription(e.target.value)} rows={4} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageAbout;
