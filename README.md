## Workspace & Deployment Setup

### Creating the React App with VS Code

1. On your computer, create a new folder called `taskpilot-frontend` and open it in VS Code.

2. Open a VS Code terminal:  
   **Terminal > New Terminal**

3. Make sure **Node.js v16** is installed and selected (for this project).

4. In the terminal, run the following command to create your React app using the React CI template:

```bash
   npx create-react-app . --template git+https://github.com/Code-Institute-Org/react-ci-template.git --use-npm
   ```

   If prompted to install create-react-app, enter y.

	5.	Wait for the installation to complete. It may take several minutes.
	6.	Once complete, you should see a success message in the terminal.

⸻

### Creating a GitHub Repository and Linking it to VS Code

	1.	Go to GitHub and create a new repository called taskpilot-frontend.
	2.	Copy the commands shown under ”…or push an existing repository from the command line.”
	3.	Back in the VS Code terminal, paste and run the copied commands.
	4.	Go to your GitHub repository in the browser and verify that the push was successful.'


#### Starting the App and Add "Hello!"

1. In the terminal, start the app using:

```bash
   npm start
```

2.	The app should open automatically in your browser.
3.	If it doesn’t open automatically, CTRL + click (Windows) or CMD + click (macOS) on the localhost URL shown in the terminal.
4.	In VS Code, open the src folder and then App.js.
5.	Inside App.js:
	•	Delete all boilerplate code inside the App <div>.
	•	Delete the logo import at the top of the file.
6.	Replace the content of the App <div> with:

  <h1>Hello!</h1>


  7.	Save the file and check your browser. You should now see your custom heading.
	8.	To stop the server:

```bash
CTRL + C (Windows) or CMD + C (Mac)
```

### Creating the Heroku App


1. Log in to [Heroku](https://dashboard.heroku.com/) and go to your **dashboard**.

2. Click the **New** button and select **Create new app**.

3. Enter a **globally unique name** for your app.  
   > Heroku will notify you if the name is already taken.

4. Choose the **region** nearest to you.

5. Click **Create app**.

---

### Deployment (Initial)

1. In your new Heroku app’s **dashboard**, select the **Deploy** tab.

2. Under **Deployment method**, select **GitHub**.

3. In **Connect to GitHub**, type your repo name and click **Search**.

4. When it appears, click **Connect**.

5. Scroll down to **Manual deploy** and click **Deploy Branch**.

6. Click **View build log** to monitor the deployment process.

7. Once you see a message like:

https://your-app-name.herokuapp.com deployed to Heroku

click **Open app** in the top-right corner.

8. Your deployed app should now display the `Hello!` heading.

---


### Final Deployment Steps

1. Ensure all code changes are **committed** and **pushed to GitHub**.

2. Log in to [Heroku](https://dashboard.heroku.com/) and open your **React app’s dashboard**.  

3. Go to the **Deploy** tab.

4. Scroll to the bottom and click **Deploy Branch**.

5. Wait for the build to complete.  
   You can click **View build log** if you’d like to watch the process.

6. Once you see **“deployed to Heroku”**, click **Open app** at the top.

7. Check that your deployed application is working correctly.  

---