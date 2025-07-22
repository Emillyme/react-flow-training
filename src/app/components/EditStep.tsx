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
}

const EditStep = ({ data }: Props) => {
  const { color, description, order, technologies = [], time, title } = data;
  const [dataStep, setDataStep] = useState<Step[]>([])
  const [titleStep, setTitleStep] = useState<string>()
  const [descriptionStep, setDescriptionStep] = useState<string>()
  const [timeStep, setTimeStep] = useState<string>()
  const [colorStep, setColorStep] = useState<string>()

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setTitleStep(title);
    setTimeStep(time);
    setDescriptionStep(description);
    setColorStep(color);
  }, [title, time, description, color]);

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
    const data = await res.json()
    console.log(data)
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
              <Button className='rounded-none' variant="outline">Cancel</Button>
            </DialogClose>
            <Button className='rounded-none bg-blue-500 hover:bg-blue-700' onClick={handleSaveData} type="submit">Save changes</Button>
          
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditStep