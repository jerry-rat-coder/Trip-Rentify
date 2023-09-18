'use client'

import useRentModal from "@/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import { categories } from "@/libs/categories";
import Heading from "../Heading";
import CategoryItem from "../inputs/CategoryItem";

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
                                onClick={() => {}}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    ]


    return ( 
        <Modal 
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={rentModal.onClose}
            actionLabel={actionLabel}
            secondaryLabel={secondaryActionLabel}
            secondaryAction={ step === STEPS.CATEGORY ? undefined : onBack }
            title="Airbnb your home"
            body={bodyContents[step]}
        />
     );
}
 
export default RentModal;