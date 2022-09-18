// destructure the workout from props in parent component Home, so you dont need to use props.workout
const WorkoutDetails = ({workout}) => {
    return ( 
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load(kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
        </div>
     );
}
 
export default WorkoutDetails;