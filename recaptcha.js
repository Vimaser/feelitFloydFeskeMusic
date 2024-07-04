const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');

/**
 * Create an assessment to analyze the risk of a UI action.
 *
 * projectID: Your Google Cloud Project ID.
 * recaptchaSiteKey: The reCAPTCHA key associated with the site/app
 * token: The generated token obtained from the client.
 * recaptchaAction: Action name corresponding to the token.
 */
async function createAssessment({
  projectID = "floyd-feske-music",
  recaptchaKey = "6LeklAgqAAAAAF6TQHsWW6LhgnG0XI3Jkd6CSdOV",
  token = "action-token",
  recaptchaAction = "action-name",
}) {
  // Create the reCAPTCHA client.
  const client = new RecaptchaEnterpriseServiceClient();
  const projectPath = client.projectPath(projectID);

  // Build the assessment request.
  const request = {
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  };

  try {
    const [response] = await client.createAssessment(request);

    // Check if the token is valid.
    if (!response.tokenProperties.valid) {
      console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`);
      return null;
    }

    // Check if the expected action was executed.
    if (response.tokenProperties.action === recaptchaAction) {
      console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
      response.riskAnalysis.reasons.forEach((reason) => {
        console.log(reason);
      });

      return response.riskAnalysis.score;
    } else {
      console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
      return null;
    }
  } catch (error) {
    console.error('Error creating assessment:', error);
    return null;
  }
}

// Example usage:
createAssessment({
  token: "your-token-here",
  recaptchaAction: "your-action-here",
}).then(score => {
  console.log('Assessment score:', score);
}).catch(err => {
  console.error('Error:', err);
});
