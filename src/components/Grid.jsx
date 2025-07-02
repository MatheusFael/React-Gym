import { workoutProgram as training_plan } from "../utils/index.js";
import React, { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard.jsx";
export default function Grid() {
    const [savedWorkouts, setSavedWorkouts] = useState(null);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const completedWorkouts = Object.keys(savedWorkouts || {}).filter((val) => {
    const entry = savedWorkouts[val]
    return entry.isComplete
})

    function handleSave(index, data) {
        const newObj = {
            ...savedWorkouts,
            [index] : {
                ...data,
                IsComplete: !!data.IsComplete || !!savedWorkouts?.[index]?.IsComplete 
            }
        }
        setSavedWorkouts(newObj)
        localStorage.setItem('brogram', JSON.stringify(newObj))
        setSelectedWorkout(null)
        //eu
    }

    function handleComplete(index, data) {
        const newObj = {
            ...data,
        }
        newObj.isComplete= true
        handleSave(index, newObj);

    }

    useEffect(()=> {
        if (!localStorage){
            return
        }
        let savedData = {}
        if (localStorage.getItem("brogram")){
            savedData = JSON.parse(localStorage.getItem("brogram"));
        }

        setSavedWorkouts(savedData);
    }, [])




    return (
        <div className="training-plan-grid">
            {Object.keys(training_plan).map((workout, index) => {
                const isLocked = index === 0? false : !completedWorkouts.includes(`${index - 1}`)
                console.log(index, isLocked)


                const type = index % 3 === 0
                    ? 'Push'
                    : index % 3 === 1
                        ? 'Pull'
                        : 'Legs';

                const trainingPlan = training_plan[index];
                const dayNum = ((index / 8) <= 1) ? '0' + (index + 1) : index + 1
                const icon = index % 3 === 0 ? (
                    <i className="fa-solid fa-dumbbell "></i>
                ) : (
                    index & 3 === 1 ? (
                        <i className="fa-solid fa-weight-hanging"></i>
                    ) : (
                        <i className="fa-solid fa-bolt"></i>
                    )
                )
                if (index == selectedWorkout) {
                    return (
                        <WorkoutCard savedWeights={savedWorkouts?.[index]?.weights}  handleSave={handleSave} handleComplete={handleComplete} key={index} trainingPlan={trainingPlan} type={type} index={index} icon={icon} dayNum={dayNum} />
                    )
                }
                return (
                    <button onClick={() => {
                        if (isLocked) {
                            return
                        }
                        setSelectedWorkout(index);
                    }} className={"card plan-card " + (isLocked ? "inactive" : "")} key={index}>
                        <div className="plan-card-header">
                            <p>Day {dayNum}</p>
                        </div>

                        {isLocked ? (
                            <i className="fa-solid fa-lock"></i>
                        ) : (icon)}
                        <div className="plan-card-header">
                            <h4><b>{type}</b></h4>

                        </div>
                    </button>
                )
            })}

        </div>
    )
}


