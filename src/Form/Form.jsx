import styles from "./Form.module.css";

function Form() {
  return (
    <section className={styles.infoForm}>
      
      <form className={styles.formDiv}>
        <h1>Welcome to Evo Flex</h1>
        <p>Enter your information below</p>

        <label htmlFor="gender">Select your gender:</label>
        <select id="gender" name="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="age">Enter your age:</label>
        <input type="number" id="age" name="age" min="0" max="120" />
        <label htmlFor="feet">Height:</label>
        <div className={styles.heightInputs}>
          <input
            type="number"
            id="feet"
            className={styles.heightInput}
            placeholder="Feet"
            min="0"
          />
      
          <input
            type="number"
            id="inches"
            className={styles.heightInput}
            placeholder="Inches"
            min="0"
            max="11"
          />
        </div>
          <label htmlFor="weight">Weight:</label>
          <input type="number" placeholder="pounds" min="1"></input>

          <label htmlFor="activity-level">Select your activity level:</label>
          <select id="activity-level" name="activity-level">
            <option value="sedentary">Sedentary (little to no exercise)</option>
            <option value="light">Lightly active (light exercise or sports 1-3 days/week)</option>
            <option value="moderate">Moderately active (moderate exercise or sports 3-5 days/week)</option>
            <option value="active">Very active (hard exercise or sports 6-7 days a week)</option>
            <option value="extra-active">Extra active (very hard exercise, physical job, or training twice a day)</option>
          </select>

        <a><button>Submit</button></a>
      </form>
     
    </section>
  );
}

export default Form;
