'use client'

import useRentModal from "@/hooks/useRentModal";
import Modal from "./Modal";
import Heading from "../Heading";
import CategoryItem from "../inputs/CategoryItem";
import Map from '@/components/Map'
import Counter from "../inputs/Counter";
import Input from "../inputs/Input";

import { useMemo, useState } from "react";
import { categories } from "@/libs/categories";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import ImageUpload from "../inputs/ImageUpload";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCIPTION = 4,
  PRICE = 5
}



const RentModal = () => {
    const rentModal = useRentModal();
    const router = useRouter();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
      register,
      setValue,
      watch,
      handleSubmit,
      formState: {
          errors
      },
      reset
    } = useForm<FieldValues>({
        defaultValues: {
          category: '',
          location: null,
          guestCount: 1,
          roomCount: 1,
          bathroomCount: 1,
          imageSrc: '',
          price: 1,
          title: '',
          description: ''
        }
    })

    const location = watch('location');
    const category = watch('category');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep(value => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      if(step !== STEPS.PRICE) {
        return onNext();
      }

      setIsLoading(true);

      axios.post('/api/listings', data)
      .then(() => {
        toast.success('Succeed Airbnb!')
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrond!');
      }).finally(() => {
        setIsLoading(false);
      })
    }

    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE){
            return 'Create'
        }

        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Back'
    }, [step]);

    const bodyContents = [
        (
            <div className="flex flex-col gap-8" key={'CATEGORY'}>
                <Heading
                  title="Which of these best describes your place?"
                  subtitle="Pick a category"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                    {
                        categories.map(item => (
                            <div 
                            key={item.label}
                            className=" col-span-1">
                                <CategoryItem 
                                  label={item.label}
                                  icon={item.icon}
                                  onClick={(category) => {
                                      setCustomValue('category', category);
                                  }}
                                  selected={category === item.label}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        ),
        (
            <div className="flex flex-col gap-8" key={'LOCATION'}>
                <Heading
                  title="Where is your place located?"
                  subtitle="Help guests find you!"
                />
                <CountrySelect 
                  value={location}
                  onChange={(value) => { setCustomValue('location', value)}}
                />
                <Map center={location?.latlng} />
            </div>
        ),
        (        
            <div className="flex flex-col gap-8" key={'INFO'}>
                <Heading
                  title="Share some basics about your place"
                  subtitle="What amenitis do you have?"
                />
                <Counter 
                  title="Guests" 
                  subtitle="How many guests do you allow?"
                  onChange={(value) => {setCustomValue('guestCount', value)}}
                  value={guestCount}
                />
                <hr />
                <Counter         
                  onChange={(value) => setCustomValue('roomCount', value)}
                  value={roomCount}
                  title="Rooms" 
                  subtitle="How many rooms do you have?"
                />
                <hr />      
                <Counter 
                  onChange={(value) => setCustomValue('bathroomCount', value)}
                  value={bathroomCount}
                  title="Bathrooms" 
                  subtitle="How many bathrooms do you have?"
                />
            </div>
        ),
        (
          <div className="flex flex-col gap-8" key={"IMAGES"}>
            <Heading
              title="Add a photo of your place"
              subtitle="Show guests what your place looks like!"
            />
            <ImageUpload 
              onChange={(value: string) => setCustomValue('imageSrc', value)}
              value={imageSrc}
            />
          </div>
        ),
        (
          <div className="flex flex-col gap-8" key={"DESCIPTION"}>
            <Heading
              title="How would you describe your place?"
              subtitle="Short and sweet works best!"
            />
            <Input 
              id="title"
              label="Title"
              register={register}
              disabled={isLoading}
              errors={errors}
              required
            />
            <hr />
            <Input 
              id="description"
              label="Description"
              register={register}
              disabled={isLoading}
              errors={errors}
              required
            />
          </div>
        ),
        (
          <div className="flex flex-col gap-8" key={"PRICE"}>
            <Heading
              title="Now, set your price"
              subtitle="How much do you charge per night?"
            />
            <Input 
              id="price"
              label="Price"
              type='number'
              formatPrice
              register={register}
              disabled={isLoading}
              errors={errors}
              required
            />
          </div>
        )
    ]


    return ( 
        <Modal              
          isOpen={rentModal.isOpen}
          onClose={rentModal.onClose}
          onSubmit={handleSubmit(onSubmit)}
          actionLabel={actionLabel}
          secondaryLabel={secondaryActionLabel}
          secondaryAction={ step === STEPS.CATEGORY ? undefined : onBack }
          title="Airbnb your home"
          body={bodyContents[step]}
        />
     );
}
 
export default RentModal;