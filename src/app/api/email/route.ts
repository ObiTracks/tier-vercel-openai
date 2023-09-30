import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";



export async function POST(req: Request, res: Response) {
  if (req.method !== 'POST') {
    console.log("Request method: ", req.method); // Log the HTTP method
    return res.status; // Method Not Allowed
  }

  try {
    const { email } = await req.json();
    console.log("Request Email", email)

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email, labs.projectx@gmail.com
        pass: process.env.EMAIL_APP_PASSWORD, // Your email password
      },
    });

    // let transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     type: 'OAuth2',
    //     user: process.env.EMAIL_USER,
    //     clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    //     clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    //     refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
    //   },
    // });

    let info = await transporter.sendMail({
      from: '<labs.projectx@gmail.com>', // sender address should match the auth user
      to: 'labs.projectx@gmail.com', // list of receivers
      subject: 'New waitlist signup', // Subject line
      text: `Just got another email waitlist signup 😎: ${email}`, // plain text body
    });
    console.log("Response", res)
    return new Response(
      JSON.stringify({ success: true, email: email })
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email', error);
    return new Response("Email sending caused the sky to light on fire", { status: 500 });
  }
}
