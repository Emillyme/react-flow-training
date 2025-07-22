'use client'
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getEventListeners } from 'events';
import { SquarePen, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { type Step } from '../interfaces';
import { toast } from "sonner"

type Props = {
  data: Step;
  onSave: (updatedStep: Step) => void;
}

const EditStep = ({ data, onSave }: Props) => {
  const { id, color, description, order, time, title } = data;

  const [titleStep, setTitleStep] = useState(title);
  const [descriptionStep, setDescriptionStep] = useState(description);
  const [timeStep, setTimeStep] = useState(time);
  const [colorStep, setColorStep] = useState(color);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setTitleStep(data.title);
    setDescriptionStep(data.description);
    setTimeStep(data.time);
    setColorStep(data.color);
  }, [data, isDialogOpen]);

  const handleSaveData = async () => {
    console.log('apertou')
    const res = await fetch(`/api/steps/${order}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order: order,
        title: titleStep,
        description: descriptionStep,
        time: timeStep,
        color: colorStep,
      })
    })

    if (!res.ok) {
      throw new Error('Failed to update step on the server.');
    }

    const updatedStepForState: Step = {
      ...data, 
      title: titleStep,
      description: descriptionStep,
      time: timeStep,
      color: colorStep,
    };

    onSave(updatedStepForState);
    setIsDialogOpen(false);
    toast.success("Step updated successfully!");
}



return (
  <div>
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <SquarePen className="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-800" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit Step</DialogTitle>
          <DialogDescription>
            Here you can edit the step information
          </DialogDescription>
        </DialogHeader>

        <Input type='text' value={titleStep} onChange={(e) => setTitleStep(e.target.value)} />
        <Input type='text' value={timeStep} onChange={(e) => setTimeStep(e.target.value)} />
        <Textarea value={descriptionStep} onChange={(e) => setDescriptionStep(e.target.value)} />

        <DialogFooter>
          <DialogClose asChild>
            <Button className='rounded-none cursor-pointer' variant="outline">Cancel</Button>
          </DialogClose>
          <Button className='rounded-none bg-blue-500 hover:bg-blue-700 cursor-pointer' onClick={handleSaveData} type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
)
}

export default EditStep