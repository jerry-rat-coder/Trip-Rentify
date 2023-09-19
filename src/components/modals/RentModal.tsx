'use client'

import useRentModal from "@/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import { categories } from "@/libs/categories";
import Heading from "../Heading";
import CategoryItem from "../inputs/CategoryItem";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";

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

    const [step, setStep] = useState(STEPS.CATEGORY);

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
            <div className="flex flex-col gap-8">
                <Heading
                title="Which of these best describes your place?"
                subtitle="Pick a category"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                    {
                        categories.map(item => (
                            <div className=" col-span-1">
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
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />
                <CountrySelect 
                    value={location}
                    onChange={(value) => { setCustomValue('location', value)}}
                />

            </div>
        )
    ]


    return ( 
        <Modal 
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryLabel={secondaryActionLabel}
            secondaryAction={ step === STEPS.CATEGORY ? undefined : onBack }
            title="Airbnb your home"
            body={bodyContents[step]}
        />
     );
}
 
export default RentModal;