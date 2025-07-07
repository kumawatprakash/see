import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(
        JSON.stringify({ message: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const filePath = path.join(process.cwd(), 'emails.json');

    let existingEmails = [];

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      existingEmails = JSON.parse(fileContent || '[]');
    }

    if (!existingEmails.includes(email)) {
      existingEmails.push(email);
      fs.writeFileSync(filePath, JSON.stringify(existingEmails, null, 2), 'utf8');
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error saving email:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to save email', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
