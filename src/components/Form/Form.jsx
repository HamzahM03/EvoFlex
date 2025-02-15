import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { calculateCalories } from "../../Utils/calculations";

function Form() {
  const navigate = useNavigate();

  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [goal, setGoal] = useState("maintain");
  

  // Handle changes in form input fields
  const handleSubmit = (e) => {
    e.preventDefault();

      // Convert values to numbers to perform validation
    const numAge = parseFloat(age);
    const numWeight = parseFloat(weight);
    const numHeightFeet = parseFloat(heightFeet);
    const numHeightInches = parseFloat(heightInches);
    
    // Check if any of the fields have invalid values
    if (isNaN(numAge) || isNaN(numWeight) || isNaN(numHeightFeet) || isNaN(numHeightInches)) {
      alert("Please enter valid numbers for all fields.");
      return; // Stop the form submission if validation fails
    }
      
    const calculatedCalories = calculateCalories(
      gender,
      numAge,
      numWeight,
      numHeightFeet,
      numHeightInches,
      activityLevel
    );

    


    navigate("/results", { state: { calculatedCalories, goal, weight } });
  
 
  };
    
    
  return (
    <section className={styles.infoForm}>
      
      <form className={styles.formDiv} onSubmit={handleSubmit}>
        <h1>Welcome to Evo Flex</h1>
        <p>Enter your information below</p>

        <label htmlFor="gender">Select your gender:</label>
        <select id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}> 
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="age">Enter your age:</label>
        <input type="number" id="age" name="age" value={age} onChange={(e) => setAge(e.target.value)} min="0" max="120" />
        <label htmlFor="feet">Height:</label>
        <div className={styles.heightInputs}>
          <input
            type="number"
            id="feet"
            className={styles.heightInput}
            placeholder="Feet"
            onChange={(e) => setHeightFeet(e.target.value)}
            min="0"
          />
      
          <input
            type="number"
            id="inches"
            className={styles.heightInput}
            placeholder="Inches"
            onChange={(e) => setHeightInches(e.target.value)}
            min="0"
            max="11"
          />
        </div>
          <label htmlFor="weight">Weight:</label>
          <input type="number" placeholder="pounds" value={weight} onChange={(e) => setWeight(e.target.value)} min="1" ></input>

          <label htmlFor="activity-level">Select your activity level:</label>
          <select id="activity-level" name="activity-level" onChange={(e) => setActivityLevel(e.target.value)}>
            <option value="sedentary">Sedentary (little to no exercise)</option>
            <option value="light">Lightly active (light exercise or sports 1-3 days/week)</option>
            <option value="moderate">Moderately active (moderate exercise or sports 3-5 days/week)</option>
            <option value="active">Very active (hard exercise or sports 6-7 days a week)</option>
            <option value="extra-active">Extra active (very hard exercise, physical job, or training twice a day)</option>
          </select>

          <label htmlFor="weight-goal">Select your weight goal:</label>
          <select id="weight-goal" name="weight-goal" value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Muscle</option>
          </select>


        <button type="submit">Submit</button>
        <button type="button" className={styles.cancelBtn} onClick={()=> navigate("/")}>Cancel</button>
      </form>
     
    </section>
  );
}

export default Form;
