import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';

const client = new RecaptchaEnterpriseServiceClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests are allowed' });
  }

  const { token, action } = req.body;

  const projectID = 'floyd-feske-music';
  const recaptchaKey = '6LeklAgqAAAAAF6TQHsWW6LhgnG0XI3Jkd6CSdOV';

  const projectPath = client.projectPath(projectID);

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

    if (!response.tokenProperties.valid) {
      return res.status(400).json({
        success: false,
        message: `Invalid token: ${response.tokenProperties.invalidReason}`,
      });
    }

    if (response.tokenProperties.action === action) {
      const score = response.riskAnalysis.score;
      return res.status(200).json({
        success: true,
        score: score,
        reasons: response.riskAnalysis.reasons,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Action mismatch',
      });
    }
  } catch (error) {
    console.error('Error creating assessment:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
