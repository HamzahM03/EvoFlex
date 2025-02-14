import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Form() {
  const navigate = useNavigate();

  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");

  

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


    // Convert weight to kilograms (pounds to kilograms: 1 lb = 0.453592 kg)
    const weightInKg = numWeight / 2.205;
      
    const calculatedCalories = calculateCalories(
      gender,
      numAge,
      weightInKg,
      numHeightFeet,
      numHeightInches,
      activityLevel
    );

    navigate("/results", { state: { calculatedCalories } });
  
    // Pass calculated results to the results page or show them
    console.log(calculatedCalories);
  };
    
    const calculateCalories = (gender, age, weight, heightFeet, heightInches, activityLevel) => {
      
      // Convert height from feet and inches to centimeters
      const heightToCm = ((heightFeet * 12) + heightInches) * 2.54;
      
      const genderLower = gender.toLowerCase();
      // Calculate BMR (Basal Metabolic Rate) using Harris-Benedict equation
      let bmr;
      if (genderLower === "male") {
        bmr = 66.47 + (13.75 * weight) + (5.003 * heightToCm) - (6.755 * age);
      } else if (genderLower === "female") {
        bmr = 655.1 + (9.563 * weight) + (1.850 * heightToCm) - (4.76 * age);
      } else {
        // If gender is non-binary, just use a basic average BMR calculation for now
        bmr = 500 + (11 * weight) + (4.5 * heightToCm) - (4.5 * age);
      }
    
      // Adjust the BMR based on activity level
      let activityMultiplier;
      switch (activityLevel) {
        case "sedentary":
          activityMultiplier = 1.2;
          break;
        case "light":
          activityMultiplier = 1.375;
          break;
        case "moderate":
          activityMultiplier = 1.55;
          break;
        case "active":
          activityMultiplier = 1.725;
          break;
        case "extra-active":
          activityMultiplier = 1.9;
          break;
        default:
          activityMultiplier = 1.2; // Default to sedentary if no selection is made
          break;
      }
    
      // Calculate daily caloric needs by multiplying BMR by activity level factor
      const dailyCalories = Math.round(bmr * activityMultiplier * 100) / 100;
      // Return the calculated calories
      return dailyCalories;
    };
      

  return (
    <section className={styles.infoForm}>
      
      <form className={styles.formDiv} onSubmit={handleSubmit}>
        <h1>Welcome to Evo Flex</h1>
        <p>Enter your information below</p>

        <label htmlFor="gender">Select your gender:</label>
        <select id="gender" name="gender" onChange={(e) => setGender(e.target.value)}> 
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="age">Enter your age:</label>
        <input type="number" id="age" name="age" onChange={(e) => setAge(e.target.value)} min="0" max="120" />
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
          <input type="number" placeholder="pounds" onChange={(e) => setWeight(e.target.value)} min="1" ></input>

          <label htmlFor="activity-level">Select your activity level:</label>
          <select id="activity-level" name="activity-level" onChange={(e) => setActivityLevel(e.target.value)}>
            <option value="sedentary">Sedentary (little to no exercise)</option>
            <option value="light">Lightly active (light exercise or sports 1-3 days/week)</option>
            <option value="moderate">Moderately active (moderate exercise or sports 3-5 days/week)</option>
            <option value="active">Very active (hard exercise or sports 6-7 days a week)</option>
            <option value="extra-active">Extra active (very hard exercise, physical job, or training twice a day)</option>
          </select>

        <button type="submit">Submit</button>
      </form>
     
    </section>
  );
}

export default Form;
