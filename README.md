*Zygal Backend Test*

A simple Node.js application that uses Chart.js to visualize user-submitted data in a pie chart. Users can submit numbers between 1 and 100, and the chart updates to reflect the number of submissions for each number.

*Features*

Form Submission: Users can enter a number (1-100) which is validated on the server.

Data Visualization: Displays a pie chart of the number of submissions for each number using Chart.js.

Persistent Storage: Stores submission data in a data.json file.

Dynamic Colors: Each pie chart segment is colored with a randomly generated color.

*Clone the Project:*

git clone <repository-url>

cd zygal

*Install Dependencies:*
npm install

*Start the Server:*
node index.js

*API Endpoints:*

GET /: Renders the main page with the pie chart.

GET /chart.js: Serves the Chart.js configuration file.

GET /data: Provides the JSON data for the chart.

POST /submit: Submits a number and updates the data.
