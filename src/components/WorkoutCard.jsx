import { useState } from 'react';
import React from 'react';
import Modal from './Modal.jsx';
import { exerciseDescriptions } from '../utils/index.js';


export default function WorkoutCard({ trainingPlan, type, index, dayNum, icon, savedWeights , handleSave, handleComplete }) {
    const { warmup, workout } = trainingPlan || {}
    const [showExerciseDescription, setShowExerciseDescription] = useState(null);
    const [weights, setWeights] = useState(savedWeights || {});
   

    function handleAddWeight(title, weight) {
        const newObj = {
            ...weights,
            [title]: weight
        }
        setWeights(newObj);
    }
    // const showExerciseDescription = { name: 'aaaa', description: 'aaaa' };

    return (
        <>
            <div className="workout-container">

                {showExerciseDescription && (<Modal showExerciseDescription={showExerciseDescription} handleCloseModal={() => {
                    setShowExerciseDescription(null);
                }} />)}
                <div className="workout-card card">
                    <div className="plan-card-header">
                        <p>Day {dayNum}</p>
                        {icon}

                    </div>
                    <div className="plan-card-header">
                        <h2><b>{type} Workout</b></h2>
                    </div>
                </div>


                <div className="workout-grid">
                    <div className="exercise-name">
                        <h4>Warmup</h4>
                    </div>
                    <h6>Sets</h6>
                    <h6>Reps</h6>
                    <h6 className="weight-input">Max Weight</h6>
                    {warmup.map((warmupExercise, warmupIndex) => {
                        return (
                            <React.Fragment key={warmupIndex}>
                                <div className='exercise-name'>
                                    <p>{warmupIndex + 1}. {warmupExercise.name}</p>
                                    <button onClick={() => {
                                        setShowExerciseDescription({
                                            name: warmupExercise.name,
                                            description: exerciseDescriptions[warmupExercise.name]
                                        })
                                    }} className='help-icon'>
                                        <i className='fa-regular fa-circle-question' />
                                    </button>
                                </div>

                                <p className='exercise-info'>{warmupExercise.sets}</p>
                                <p className='exercise-info'>{warmupExercise.reps}</p>
                                <input placeholder='N/A' disabled={true} className='weight-input' />

                            </React.Fragment>
                        )
                    })}

                </div>


                <div className="workout-grid">
                    <div className="exercise-name">
                        <h4>Workout</h4>
                    </div>
                    <h6>Sets</h6>
                    <h6>Reps</h6>
                    <h6 className="weight-input">Max Weight</h6>
                    {workout.map((workoutExercise, workoutIndex) => {
                        return (
                            <React.Fragment key={workoutIndex}>
                                <div className='exercise-name'>
                                    <p>{workoutIndex + 1}. {workoutExercise.name}</p>
                                    <button className='help-icon'>
                                        <i className='fa-regular fa-circle-question' />
                                    </button>
                                </div>
                                <p className='exercise-info'>{workoutExercise.sets}</p>
                                <p className='exercise-info'>{workoutExercise.reps}</p>
                                <input value={weights[workoutExercise.name] || ""} onChange={(e) => {
                                    handleAddWeight(workoutExercise.name, e.target.value);
                                }} placeholder='14' className='weight-input ' />

                            </React.Fragment>
                        )
                    })}

                </div>

                <div className='workout-buttons'>
                    <button onClick={()=>{
                        handleSave(index, {weights});
                    }}>Save & Exit</button>
                    <button onClick={()=>{
                        handleComplete(index, {weights})
                    }} disabled={Object.keys(weights).length !== workout.length}>Complete</button>

                </div>
            </div>
        </>
    );
}
