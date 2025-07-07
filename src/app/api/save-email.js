import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const filePath = path.join(process.cwd(), 'emails.json');

    let existing = [];

    // Read existing emails
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      existing = JSON.parse(fileContent || '[]');
    }

    // Add only if not already present
    if (!existing.includes(email)) {
      existing.push(email);
      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to save email:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
