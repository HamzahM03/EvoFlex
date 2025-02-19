# Evo Flex Calorie Calculator

This is a simple web application built with **React** that helps users calculate their daily caloric needs based on personal information like age, gender, height, weight, and activity level. It provides an estimate for maintenance calories as well as calories needed to either gain or lose weight.

## Features

- **Calorie Calculation:** Based on the Harris-Benedict equation, it calculates the user's maintenance calories and provides an estimate for weight loss (500-calorie deficit) and weight gain (500-calorie surplus).
- **User Input:** Users can input their age, gender, weight, height, and activity level to get personalized calorie recommendations.
- **Result Page:** After form submission, the application displays the calculated calories on a results page with the option to go back and adjust inputs.
- **Styled UI:** The UI is clean, user-friendly, and responsive, providing clear feedback on the results.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **React Router**: For handling navigation and routing between the form and results page.
- **CSS Modules**: For modular and scoped styling of components.
  
## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/evo-flex-calorie-calculator.git

2. Navigate into the project directory:

   ```bash
   cd evo-flex-calorie-calculator
  
3. Install dependencies:

   ```bash
   npm install
  
4. Run the development server:

   ```bash

   npm start

5. Open your browser and navigate to:

   ```bash
   http://localhost:3000

## How It Works

### Home Page (Form)
Users input their information such as age, gender, height, weight, and activity level into the form and submit it.

### Results Page
After submission, the app calculates the daily calorie needs (maintenance, gain, or loss) and displays them in a clean and easy-to-read format. The user can also navigate back to the form to adjust their inputs if necessary.

### Navigation
A **"Go Back"** button on the results page allows users to return to the form and make any changes they wish.

## Contributing
Feel free to fork the repository and create pull requests. If you want to contribute, you can help by:

- Improving the **UI/UX**.
- Adding more features like **macronutrient breakdowns** (carbs, proteins, fats).
- Adding **unit tests** or improving code structure.
- Contributing to **documentation** and **README**.

## License
This project is open-source and available under the **MIT License**.

## Acknowledgments
- Special thanks to the creators of the **Harris-Benedict equation** for providing a simple way to calculate daily caloric needs.
- **React community** for the tools and libraries used in this project.